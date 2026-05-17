importScripts('https://www.gstatic.com/firebasejs/11.0.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/11.0.0/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: 'AIzaSyAAwpp9M4pmtJE7L27QRs5BTgrWWIqoNrw',
  authDomain: 'enders-58bd3.firebaseapp.com',
  projectId: 'enders-58bd3',
  storageBucket: 'enders-58bd3.firebasestorage.app',
  messagingSenderId: '673433042167',
  appId: '1:673433042167:web:f4ec257b750a19e01467f2',
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  const title = payload.notification?.title || 'Notificacion';
  const options = {
    body: payload.notification?.body || 'Nueva notificacion recibida',
    icon: '/favicon.ico',
    data: payload.data || {},
  };

  self.registration.showNotification(title, options);
});
