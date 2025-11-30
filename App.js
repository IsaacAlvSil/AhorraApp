import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';

// Importa todas las pantallas
import InicioScreen from './screens/InicioScreen';
import ValidacionCredencialesScreen from './screens/ValidacionCredencialesScreen';
import MenuScreen from './screens/MenuScreen'; 
import GraficasScreen from './screens/GraficasScreen';
import FiltradoScreen from './screens/FiltradoScreen';
import Transacciones from './screens/Transacciones';
import PresupuestosScreen from './screens/PresupuestosScreen';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();


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

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
      >
        <Tab.Screen name="Inicio" component={InicioScreen} /> 
        
        <Tab.Screen name="Gráficas" component={GraficasStackScreen} /> 
        
        <Tab.Screen name="Transacciones" component={Transacciones} />
        
      </Tab.Navigator>
    </NavigationContainer>
  );
}