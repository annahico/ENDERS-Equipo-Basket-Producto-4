import { Injectable } from '@angular/core';
import { getApp, getApps, initializeApp } from 'firebase/app';
import { getMessaging, getToken, isSupported, MessagePayload, onMessage } from 'firebase/messaging';
import { environment } from '../enviroments/enviroment';

@Injectable({ providedIn: 'root' })
export class NotificationsService {
  private app = getApps().length ? getApp() : initializeApp(environment.firebaseConfig);

  async init(): Promise<void> {
    const supported = await isSupported();

    if (!supported || !('serviceWorker' in navigator) || !('Notification' in window)) {
      console.log('Firebase Messaging no esta soportado en este navegador.');
      return;
    }

    this.listenForegroundMessages();
    await this.requestPermission();
  }

  private async requestPermission(): Promise<string | null> {
    const permission = await Notification.requestPermission();

    if (permission !== 'granted') {
      console.log('Permiso de notificaciones denegado.');
      return null;
    }

    try {
      await navigator.serviceWorker.register('/firebase-messaging-sw.js');
      const registration = await navigator.serviceWorker.ready;
      const messaging = getMessaging(this.app);
      const token = await getToken(messaging, {
        vapidKey: environment.firebaseVapidKey,
        serviceWorkerRegistration: registration,
      });

      if (!token) {
        console.log('Firebase no ha devuelto token FCM para este navegador.');
        return null;
      }

      console.log('Token FCM navegador:', token);
      return token;
    } catch (error) {
      console.error('Error obteniendo el token FCM:', error);
      return null;
    }
  }

  private listenForegroundMessages(): void {
    const messaging = getMessaging(this.app);

    onMessage(messaging, (payload: MessagePayload) => {
      console.log('Notificacion recibida en foreground:', payload);

      const title = payload.notification?.title || 'Notificacion';
      const body = payload.notification?.body || 'Nueva notificacion recibida';

      if (Notification.permission === 'granted') {
        new Notification(title, { body });
      }
    });
  }
}
