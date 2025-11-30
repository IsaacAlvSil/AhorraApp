import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  StyleSheet, 
  ImageBackground, 
  Alert,
  ActivityIndicator,
  SafeAreaView
} from 'react-native';


import DatabaseService from '../database/DatabaseService';

export default function RecuperarContraseña({ navigation }) {
  const [email, setEmail] = useState('');
  const [cargando, setCargando] = useState(false);

  const handleRecuperar = async () => {
    if (email.trim() === '') {
      Alert.alert('Error', 'Por favor ingresa tu correo electrónico.');
      return;
    }

    setCargando(true);
    try {
    
      const usuario = await DatabaseService.buscarUsuarioPorEmail(email);

      if (usuario) {

        Alert.alert(
          'Contraseña Recuperada',
          `Hola ${usuario.nombre}, tu contraseña es: ${usuario.password}`,
          [
            { text: "Ir a Iniciar Sesión", onPress: () => navigation.goBack() }
          ]
        );
      } else {
        Alert.alert('Error', 'No se encontró ninguna cuenta con ese correo electrónico.');
      }
    } catch (error) {
      console.log(error);
      Alert.alert('Error', 'Hubo un problema al consultar la base de datos.');
    } finally {
      setCargando(false);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ImageBackground
        source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRYif2M6fKDGvl-Mmjd5jgZ7Bnm46zWAOZJHg&s' }}
        style={styles.background}
      >
        <View style={styles.container}>
          <Text style={styles.title}>RECUPERAR CUENTA</Text>
          
          <Text style={styles.instrucciones}>
            Ingresa el correo con el que te registraste para ver tu contraseña.
          </Text>

          <TextInput
            style={styles.input}
            placeholder="Correo electrónico"
            placeholderTextColor="#fff"
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail}
          />

          <TouchableOpacity
            style={styles.button}
            activeOpacity={0.8}
            onPress={handleRecuperar}
            disabled={cargando}
          >
            {cargando ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.buttonText}>BUSCAR CONTRASEÑA</Text>
            )}
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={styles.cancelar}>Cancelar y volver</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: 'rgba(27, 40, 181, 0.4)', 
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
  },
  instrucciones: {
    color: '#fff',
    textAlign: 'center',
    marginBottom: 30,
    fontSize: 16,
  },
  input: {
    width: '100%',
    height: 50,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 25,
    paddingHorizontal: 20,
    fontSize: 16,
    color: '#fff',
    marginBottom: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.5)',
  },
  button: {
    width: '100%',
    backgroundColor: '#4CAF50',
    borderRadius: 25,
    paddingVertical: 12,
    alignItems: 'center',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  cancelar: {
    color: '#fff',
    fontSize: 16,
    textDecorationLine: 'underline',
  },
});