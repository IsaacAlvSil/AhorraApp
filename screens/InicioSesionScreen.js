import React, { useState } from 'react';
import { SafeAreaView, View, Text, TextInput, TouchableOpacity, Image, ImageBackground, StyleSheet, Alert } from 'react-native';
<<<<<<< HEAD
// Asegúrate de que esta ruta sea correcta, si no, comenta la línea de import logo
import logo from '../assets/lAhorra-logo.jpg'; 
=======
import logo from '../assets/lAhorra-logo.jpg';
import { db } from '../db';
>>>>>>> aee6b215b9806ffec8dbdd90d451adc89c422220

export default function InicioSesionScreen({ navigation }) {

  const [correo, setCorreo] = useState('');
  const [contrasena, setContrasena] = useState('');

  const handleAcceder = () => {
<<<<<<< HEAD
    // 1. Validación visual simple
    if (correo.trim() === '' || contrasena.trim() === '') {
      Alert.alert('Error', 'Por favor llena todos los campos');
      return;
    }

    // 2. SIMULACIÓN DE LOGIN (Sin base de datos)
    // Aquí simplemente dejamos pasar al usuario a la siguiente pantalla
    Alert.alert("Bienvenido", "Modo de prueba activado (Sin BD)");
    navigation.navigate('Home'); 
=======

    if (correo.trim() === '' || contrasena.trim() === '') {
      alert('Error: llena todos los campos');
      Alert.alert('Error', 'Por favor llena todos los campos');
      return;
    }

    db.transaction(tx => {
      tx.executeSql(
        "SELECT * FROM users WHERE email = ? AND password = ?",
        [correo, contrasena],
        (_, result) => {
          if (result.rows.length > 0) {
            Alert.alert("Bienvenido", "Inicio de sesión exitoso");
            navigation.navigate('Home');
          } else {
            Alert.alert("Error", "Correo o contraseña incorrectos");
          }
        },
        () => {
          Alert.alert("Error", "No se pudo iniciar sesión");
        }
      );
    });
>>>>>>> aee6b215b9806ffec8dbdd90d451adc89c422220
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ImageBackground
        source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRYif2M6fKDGvl-Mmjd5jgZ7Bnm46zWAOZJHg&s' }}
        style={styles.background}
      >
        <View style={styles.container}>

<<<<<<< HEAD
          {/* Si te da error la imagen, comenta esta línea */}
=======
>>>>>>> aee6b215b9806ffec8dbdd90d451adc89c422220
          <Image source={logo} style={styles.logo} />

          <TextInput
            style={styles.input}
            placeholder="Ingresar correo electrónico"
            placeholderTextColor="#ddd"
            value={correo}
            onChangeText={setCorreo}
            keyboardType="email-address"
          />

          <TextInput
            style={styles.input}
            placeholder="Ingresar contraseña"
            placeholderTextColor="#ddd"
            value={contrasena}
            onChangeText={setContrasena}
            secureTextEntry
          />

          <TouchableOpacity>
            <Text style={styles.linkText}>¿Olvidaste la contraseña?</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button}
            onPress={handleAcceder}
            activeOpacity={0.2}
          >
            <Text style={styles.buttonText}>ACCEDER</Text>
          </TouchableOpacity>

          <Text style={styles.textoCuenta}>¿Aún no tienes cuenta?</Text>

          <TouchableOpacity onPress={() => navigation.navigate('Registro')}>
            <Text style={styles.registrar}>REGISTRARSE</Text>
          </TouchableOpacity>

        </View>
      </ImageBackground>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
<<<<<<< HEAD
  background: { flex: 1, resizeMode: 'cover', justifyContent: 'center' },
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 20 },
  logo: { width: 250, height: 100, marginBottom: 60, resizeMode: 'contain' },
  input: { width: '90%', backgroundColor: 'rgba(255,255,255,0.2)', padding: 15, borderRadius: 25, color: '#fff', marginBottom: 15 },
  linkText: { color: '#fff', fontSize: 14, marginBottom: 20, textDecorationLine: 'underline' },
  button: { backgroundColor: '#4c7c3f', paddingVertical: 15, width: '90%', borderRadius: 25, alignItems: 'center', marginBottom: 25 },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  textoCuenta: { color: '#fff', fontSize: 14 },
  registrar: { color: '#fff', fontWeight: 'bold', marginTop: 5, fontSize: 16 },
});
=======
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
  },
  logo: {
    width: 250,
    height: 100,
    marginBottom: 60,
    resizeMode: 'contain',
  },
  input: {
    width: '90%',
    backgroundColor: 'rgba(255,255,255,0.2)',
    padding: 15,
    borderRadius: 25,
    color: '#fff',
    marginBottom: 15,
  },
  linkText: {
    color: '#fff',
    fontSize: 14,
    marginBottom: 20,
    textDecorationLine: 'underline',
  },
  button: {
    backgroundColor: '#4c7c3f',
    paddingVertical: 15,
    width: '90%',
    borderRadius: 25,
    alignItems: 'center',
    marginBottom: 25,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  textoCuenta: {
    color: '#fff',
    fontSize: 14,
  },
  registrar: {
    color: '#fff',
    fontWeight: 'bold',
    marginTop: 5,
    fontSize: 16,
  },
});
>>>>>>> aee6b215b9806ffec8dbdd90d451adc89c422220
