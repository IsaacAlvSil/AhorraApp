import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import DatabaseService from './database/DatabaseService';
import InicioSesionScreen from './screens/InicioSesionScreen';
import RegistroScreen from './screens/RegistroScreen';
import RecuperarContrasena from './screens/RecuperarContraseña'; 
import InicioScreen from './screens/InicioScreen'; 
import TransaccionesScreen from './screens/Transacciones';
import GraficasScreen from './screens/GraficasScreen';
import PresupuestosScreen from './screens/PresupuestosScreen'; 
import TransferirScreen from './screens/TransferirScreen';
import NotificacionesScreen from './screens/NotificacionesScreen';
import PerfilScreen from './screens/PerfilScreen';
import MetasScreen from './screens/MetasScreen';
import ValidacionCredencialesScreen from './screens/ValidacionCredencialesScreen';
import AjustesScreen from './screens/AjustesScreen'; // <--- 1. IMPORTAR LA PANTALLA

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function AppMainTabs() {
  return (
    <Tab.Navigator
      initialRouteName="Inicio"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          let rn = route.name;

          if (rn === 'Inicio') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (rn === 'Transacciones') {
            iconName = focused ? 'swap-horizontal' : 'swap-horizontal-outline';
          } else if (rn === 'Gráficas') {
            iconName = focused ? 'stats-chart' : 'stats-chart-outline';
          } else if (rn === 'Presupuestos') {
            iconName = focused ? 'wallet' : 'wallet-outline';
          } else if (rn === 'Perfil') { // Agregué el icono para perfil que faltaba en tu lógica visual
             iconName = focused ? 'person' : 'person-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#03A9F4',
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: { 
          backgroundColor: '#15297c',
          borderTopWidth: 0,
        },
        headerShown: false,
      })}
    >
      <Tab.Screen name="Inicio" component={InicioScreen} />
      <Tab.Screen name="Transacciones" component={TransaccionesScreen} />
      <Tab.Screen name="Gráficas" component={GraficasScreen} />
      <Tab.Screen name="Presupuestos" component={PresupuestosScreen} />
      <Tab.Screen name="Perfil" component={PerfilScreen} />
    </Tab.Navigator>
  );
}

export default function App() {
  useEffect(() => {
    const initDB = async () => {
      try {
        await DatabaseService.initialize();
        console.log('Base de datos inicializada correctamente');
      } catch (error) {
        console.error('Error al inicializar la base de datos:', error);
      }
    };
    
    initDB();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="InicioSesionScreen">
        
        <Stack.Screen 
          name="InicioSesionScreen" 
          component={InicioSesionScreen} 
          options={{ headerShown: false }} 
        />
        
        <Stack.Screen 
          name="RegistroScreen" 
          component={RegistroScreen} 
          options={{ headerShown: false }} 
        />
        
        <Stack.Screen 
          name="RecuperarContrasena" 
          component={RecuperarContrasena} 
          options={{ headerShown: false }} 
        />
        
        <Stack.Screen 
          name="AppMainTabs" 
          component={AppMainTabs} 
          options={{ headerShown: false }} 
        />

        <Stack.Screen 
          name="IngresarDinero" 
          component={PresupuestosScreen}
          options={{ title: 'Ingresar Dinero' }} 
        />
        
        <Stack.Screen 
          name="ValidacionCredenciales" 
          component={ValidacionCredencialesScreen} 
          options={{ title: 'Validación' }} 
        />
        
        <Stack.Screen 
          name="MetasScreen" 
          component={MetasScreen} 
          options={{ title: 'Mis Metas' }} 
        />

        <Stack.Screen 
          name="TransferirScreen" 
          component={TransferirScreen} 
          options={{ title: 'Transferir Dinero' }} 
        />
        
        <Stack.Screen 
          name="NotificacionesScreen" 
          component={NotificacionesScreen} 
          options={{ title: 'Notificaciones' }} 
        />

        {/* 2. AGREGAR LA PANTALLA AL STACK */}
        {/* Usamos headerShown: false porque AjustesScreen ya tiene su propio Header personalizado */}
        <Stack.Screen 
          name="Ajustes" 
          component={AjustesScreen} 
          options={{ headerShown: false }} 
        />

      </Stack.Navigator>
    </NavigationContainer>
  );
}