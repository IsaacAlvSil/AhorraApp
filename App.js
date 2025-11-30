import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';


import InicioSesionScreen from './screens/InicioSesionScreen';
import RegistroScreen from './screens/RegistroScreen';

import InicioScreen from './screens/InicioScreen';
import ValidacionCredencialesScreen from './screens/ValidacionCredencialesScreen';
import MenuScreen from './screens/MenuScreen'; 
import GraficasScreen from './screens/GraficasScreen';
import FiltradoScreen from './screens/FiltradoScreen';
import Transacciones from './screens/Transacciones';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function HomeStackScreen() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="InicioMain" component={InicioScreen} />
      <Stack.Screen name="ValidarCredenciales" component={ValidacionCredencialesScreen} />
      <Stack.Screen name="Menu" component={MenuScreen} />
    </Stack.Navigator>
  );
}

function GraficasStackScreen() {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="GraficasMain" 
        component={GraficasScreen} 
        options={{ headerShown: false }} 
      /> 
      <Stack.Screen 
        name="FiltradoScreen" 
        component={FiltradoScreen} 
        options={{ title: 'Filtros y Detalle' }}
      />
    </Stack.Navigator>
  );
}
function AppMainTabs() {
  return (
    <Tab.Navigator
        initialRouteName="Inicio"
        screenOptions={({ route }) => ({
          headerShown: false, 
          tabBarIcon: ({ color, size }) => {
            let iconName;

            if (route.name === 'Inicio') {
              iconName = 'home-outline';
            } else if (route.name === 'Gráficas') {
              iconName = 'stats-chart-outline';
            } else if (route.name === 'Transacciones') {
              iconName = 'swap-horizontal-outline';
            }
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: '#15297c',
          tabBarInactiveTintColor: 'gray',
          tabBarStyle: { paddingBottom: 5, height: 60 },
        })}
      >
        <Tab.Screen name="Inicio" component={HomeStackScreen} /> 
        <Tab.Screen name="Gráficas" component={GraficasStackScreen} /> 
        <Tab.Screen name="Transacciones" component={Transacciones} />
    </Tab.Navigator>
  );
}

function AuthStackScreen() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen 
                name="InicioSesion" 
                component={InicioSesionScreen} 
            />
            <Stack.Screen 
                name="RegistroScreen" 
                component={RegistroScreen} 
            />
        </Stack.Navigator>
    );
}
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen 
          name="AuthStack" 
          component={AuthStackScreen} 
        />
        
        <Stack.Screen 
          name="AppMainTabs" 
          component={AppMainTabs} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}