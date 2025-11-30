import React, { useState } from 'react';
import { SafeAreaView, View, Text, TextInput, TouchableOpacity, Image, ImageBackground, StyleSheet, Alert } from 'react-native';

export default function InicioSesionScreen({ navigation }) { 
  const [correo, setCorreo] = useState('');
  const [contrasena, setContrasena] = useState('');

  const handleAcceder = () => {
    if (correo.trim() === '' || contrasena.trim() === '') {
      Alert.alert('Error', 'Por favor llena todos los campos');
    } else {
      Alert.alert('Éxito', `Bienvenido, Has iniciado sesión como: ${correo}`);
      
      navigation.replace('AppMainTabs'); 
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
          <Image
            source={require('../assets/logo_ahorraApp.png')} 
            style={styles.logo}
            resizeMode="contain"
          />
          <Text style={styles.title}>INICIAR SESIÓN</Text>

          <TextInput
            style={styles.input}
            placeholder="Correo electrónico"
            placeholderTextColor="#fff"
            keyboardType="email-address"
            autoCapitalize="none"
            value={correo}
            onChangeText={setCorreo}
          />

          <TextInput
            style={styles.input}
            placeholder="Contraseña"
            placeholderTextColor="#fff"
            secureTextEntry
            value={contrasena}
            onChangeText={setContrasena}
          />

          <TouchableOpacity
            style={styles.button}
            activeOpacity={0.8}
            onPress={handleAcceder}
          >
            <Text style={styles.buttonText}>ACCEDER</Text>
          </TouchableOpacity>
        
          <TouchableOpacity 
            onPress={() => navigation.navigate('RecuperarContrasena')}
            style={{ marginBottom: 20 }}
          >
            <Text style={{ color: '#fff', textDecorationLine: 'underline' }}>
              ¿Olvidaste tu contraseña?
            </Text>
          </TouchableOpacity>
    

          <Text style={styles.textoCuenta}>¿Aun no tienes cuenta?</Text>
          <TouchableOpacity onPress={handleRegistrar}>
            <Text style={styles.registrar}>REGISTRARSE</Text>
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
  logo: {
    width: 250,
    height: 100,
    marginBottom: 50,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 30,
  },
  input: {
    width: '100%',
    height: 50,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 25,
    paddingHorizontal: 20,
    fontSize: 16,
    color: '#fff',
    marginBottom: 15,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.5)',
  },
  button: {
    width: '100%',
    backgroundColor: '#4CAF50',
    borderRadius: 25,
    paddingVertical: 12,
    alignItems: 'center',
    marginTop: 10,
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
  textoCuenta: {
    color: '#fff',
    marginTop: 10,
    fontSize: 14,
  },
  registrar: {
    color: '#03A9F4',
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 5,
    textDecorationLine: 'underline',
  },
});