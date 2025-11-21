import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

<<<<<<< HEAD
import InicioScreen from './screens/InicioScreen';
import HomeScreen from './screens/HomeScreen';
import CategoriaScreen from './screens/CategoriaScreen';
=======
import InicioSesionScreen from './screens/InicioScreen';
import Home from './screens/HomeScreen';
>>>>>>> 92b58516ec2db3e68ffa55f385cb5844d561f037

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
<<<<<<< HEAD
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
=======
      <Stack.Navigator initialRouteName='InicioScreen'>
        <Stack.Screen
          name="InicioScreen"
          component={InicioSesionScreen}
        />
        <Stack.Screen
          name="Home"
          component={Home}
>>>>>>> 92b58516ec2db3e68ffa55f385cb5844d561f037
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
<<<<<<< HEAD
}
=======
}
>>>>>>> 92b58516ec2db3e68ffa55f385cb5844d561f037
