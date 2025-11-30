import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import InicioSesionScreen from './screens/InicioSesionScreen';
import RegistroScreen from './screens/RegistroScreen';

import InicioScreen from './screens/InicioScreen';
import TransaccionesScreen from './screens/Transacciones';
import GraficasScreen from './screens/GraficasScreen';
import PresupuestosScreen from './screens/PresupuestosScreen'; 

import ValidacionCredencialesScreen from './screens/ValidacionCredencialesScreen';

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
    </Tab.Navigator>
  );
}

export default function App() {
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
        
      </Stack.Navigator>
    </NavigationContainer>
  );
}