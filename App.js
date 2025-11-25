import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


import InicioScreen from './screens/PantallaBienvenida';
import HomeScreen from './screens/HomeScreen';
import CategoriaScreen from './screens/CategoriaScreen';
import Registro from './screens/Registro'; 
import InicioSesionScreen from './screens/InicioSesionScreen';
import { initDB } from './db';


const Stack = createNativeStackNavigator();

export default function App() {
  React.useEffect(() => {
  initDB()
    .then(() => console.log("Base de datos lista"))
    .catch(err => console.log("Error BD:", err));
}, []);

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="InicioScreen"
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
          name="Registro"
          component={Registro}
          options={{ title: 'Crear Cuenta' }}
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

        <Stack.Screen
          name="InicioSesionScreen"
          component={InicioSesionScreen}
          options={{ title: 'Iniciar Sesión' }}
        />

      </Stack.Navigator>
    </NavigationContainer>
  );
}
