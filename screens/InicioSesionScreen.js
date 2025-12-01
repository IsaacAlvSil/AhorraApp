import React, { useState } from 'react';
import { 
  SafeAreaView, View, Text, TextInput, TouchableOpacity, 
  Image, ImageBackground, StyleSheet, Alert, ActivityIndicator 
} from 'react-native';
import DatabaseService from '../database/DatabaseService';

export default function InicioSesionScreen({ navigation }) { 
  const [correo, setCorreo] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [cargando, setCargando] = useState(false);

  const handleAcceder = async () => {
    if (correo.trim() === '' || contrasena.trim() === '') {
      Alert.alert('Error', 'Por favor llena todos los campos');
      return;
    }

    setCargando(true);

    try {
      const usuarioEncontrado = await DatabaseService.buscarUsuarioPorCredenciales(correo, contrasena);
      if (usuarioEncontrado) {
        DatabaseService.establecerSesion(usuarioEncontrado);
        Alert.alert('Bienvenido', `Hola de nuevo, ${usuarioEncontrado.nombre}`);
        navigation.replace('AppMainTabs');
      } else {
        Alert.alert('Error', 'Correo o contraseña incorrectos.');
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Ocurrió un problema al iniciar sesión');
    } finally {
      setCargando(false);
    }
  };

  const handleRegistrar = () => {
    navigation.navigate('RegistroScreen'); 
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ImageBackground
        source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRYif2M6fKDGvl-Mmjd5jgZ7Bnm46zWAOZJHg&s' }}
        style={styles.background}
      >
        <View style={styles.container}>
          <View style={styles.logoBg}>
            <Image
              source={require('../assets/lAhorra-logo.jpg')} 
              style={styles.logo}
              resizeMode="contain"
            />
          </View>
          
          <Text style={styles.title}>INICIAR SESIÓN</Text>

          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Correo electrónico"
              placeholderTextColor="#888" 
              keyboardType="email-address"
              autoCapitalize="none"
              value={correo}
              onChangeText={setCorreo}
            />

            <TextInput
              style={styles.input}
              placeholder="Contraseña"
              placeholderTextColor="#888"
              secureTextEntry
              value={contrasena}
              onChangeText={setContrasena}
            />
          </View>

          <TouchableOpacity
            style={styles.button}
            activeOpacity={0.8}
            onPress={handleAcceder}
            disabled={cargando}
          >
            {cargando ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.buttonText}>ACCEDER</Text>
            )}
          </TouchableOpacity>

          <TouchableOpacity 
            onPress={() => navigation.navigate('RecuperarContrasena')}
            style={{ marginBottom: 20 }}
          >
             <Text style={styles.linkText}>¿Olvidaste tu contraseña?</Text>
          </TouchableOpacity>
      
          <View style={styles.footerContainer}>
            <Text style={styles.textoCuenta}>¿Aun no tienes cuenta?</Text>
            <TouchableOpacity onPress={handleRegistrar}>
              <Text style={styles.registrar}>REGISTRARSE</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 25,
    backgroundColor: 'rgba(21, 41, 124, 0.75)', // Fondo unificado
  },
  logoBg: {
  
    padding: 10,
    borderRadius: 20,
    marginBottom: 30,
  },
  logo: {
    width: 200,
    height: 80,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 30,
    letterSpacing: 1,
  },
  inputContainer: {
    width: '100%',
    marginBottom: 10,
  },
  input: {
    width: '100%',
    height: 55,
    backgroundColor: '#fff', // Fondo blanco sólido
    borderRadius: 25,
    paddingHorizontal: 20,
    fontSize: 16,
    color: '#333', // Texto oscuro
    marginBottom: 20,
    elevation: 3,
  },
  button: {
    width: '100%',
    backgroundColor: '#4c7c3f',
    borderRadius: 25,
    paddingVertical: 15,
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
    elevation: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  linkText: {
    color: '#ddd', 
    textDecorationLine: 'underline',
    fontSize: 14,
  },
  footerContainer: {
    alignItems: 'center',
    marginTop: 10,
  },
  textoCuenta: {
    color: '#fff',
    fontSize: 15,
  },
  registrar: {
    color: '#03A9F4', // Azul cyan
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 5,
  },
});