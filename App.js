import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import InicioScreen from './screens/InicioScreen';
import HomeScreen from './screens/HomeScreen';
import CategoriaScreen from './screens/CategoriaScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator 
        initialRouteName='InicioScreen'
        screenOptions={{
          headerStyle: {
            backgroundColor: '#4CAF50',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      >
        <Stack.Screen
          name="InicioScreen"
          component={InicioScreen}
          options={{ title: 'Ahorra+ App' }}
        />
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: 'Inicio' }}
        />
        <Stack.Screen
          name="Categoria"
          component={CategoriaScreen}
          options={{ title: 'Gráficas por Categoría' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}