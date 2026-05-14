import { useEffect, useRef } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { TouchableOpacity, Text, StyleSheet, View, Platform, Alert } from 'react-native';

import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';

import HomeScreen from './screens/HomeScreen';
import ListadoScreen from './screens/ListadoScreen';
import DetalleScreen from './screens/DetalleScreen';
import MultimediaScreen from './screens/MultimediaScreen';

const Stack = createStackNavigator();

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

export default function App() {
  const notificationListener = useRef();
  const responseListener = useRef();

  useEffect(() => {
    configurarNotificaciones();

    notificationListener.current =
      Notifications.addNotificationReceivedListener(notification => {
        console.log('Notificación recibida en foreground:', notification);

        const title = notification.request.content.title;
        const body = notification.request.content.body;

        if (Platform.OS !== 'web') {
          Alert.alert(title || 'Notificación', body || 'Nueva notificación recibida');
        }
      });

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener(response => {
        console.log('Usuario ha pulsado la notificación:', response);
      });

    return () => {
      if (notificationListener.current) {
        Notifications.removeNotificationSubscription(notificationListener.current);
      }

      if (responseListener.current) {
        Notifications.removeNotificationSubscription(responseListener.current);
      }
    };
  }, []);

  async function configurarNotificaciones() {
    console.log('Iniciando configuración de notificaciones...');

    console.log('Device.isDevice:', Device.isDevice);
    console.log('Platform:', Platform.OS);

    if (!Device.isDevice) {
      console.log('Las notificaciones push necesitan un dispositivo físico.');
      return;
    }

    const permisosActuales = await Notifications.getPermissionsAsync();
    console.log('Permisos actuales:', permisosActuales);

    let finalStatus = permisosActuales.status;

    if (finalStatus !== 'granted') {
      const nuevosPermisos = await Notifications.requestPermissionsAsync();
      console.log('Nuevos permisos:', nuevosPermisos);
      finalStatus = nuevosPermisos.status;
    }

    console.log('Estado final permisos:', finalStatus);

    if (finalStatus !== 'granted') {
      console.log('Permiso de notificaciones denegado.');
      return;
    }

   try {
      const token = await Notifications.getDevicePushTokenAsync();
      console.log('Device Push Token:', token);
    } catch (error) {
      console.log('Error obteniendo Device Push Token:', error);
    }
  }

  return (
    <View style={[styles.appRoot, Platform.OS === 'web' && styles.webRoot]}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Home"
          screenOptions={({ navigation }) => ({
            title: 'ENDERS Basket',
            headerStyle: { backgroundColor: '#2B2D42' },
            headerTintColor: '#EDF2F4',
            headerTitleStyle: { fontWeight: '900' },
            headerBackTitleVisible: false,
            headerRight: () => (
              <TouchableOpacity
                style={styles.botonInicio}
                onPress={() => navigation.navigate('Home')}
              >
                <Text style={styles.textoBotonInicio}>Inicio</Text>
              </TouchableOpacity>
            ),
          })}
        >
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Listado" component={ListadoScreen} />
          <Stack.Screen name="Detalle" component={DetalleScreen} />
          <Stack.Screen name="Multimedia" component={MultimediaScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
}

const styles = StyleSheet.create({
  appRoot: {
    flex: 1,
  },
  webRoot: {
    height: '100vh',
    maxHeight: '100vh',
    overflow: 'hidden',
  },
  botonInicio: {
    marginRight: 14,
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 8,
    backgroundColor: '#D90429',
  },
  textoBotonInicio: {
    color: '#EDF2F4',
    fontWeight: '800',
  },
});