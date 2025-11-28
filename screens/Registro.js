import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, ImageBackground, TouchableOpacity, Alert } from 'react-native';
<<<<<<< HEAD

export default function Registro({ navigation }) {
  return (
    <ImageBackground source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRYif2M6fKDGvl-Mmjd5jgZ7Bnm46zWAOZJHg&s' }} style={styles.background}>
      <View style={styles.container}>
        <Text style={styles.title}>Crear Cuenta</Text>
        <TextInput placeholder="Correo" placeholderTextColor="#ccc" style={styles.input} />
        <TextInput placeholder="Contraseña" placeholderTextColor="#ccc" secureTextEntry style={styles.input} />
        <TouchableOpacity style={styles.startButton} onPress={() => {
            Alert.alert("Éxito", "Usuario registrado");
            navigation.navigate('Login');
        }}>
          <Text style={styles.startText}>Registrarme</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Login')} style={{ marginTop: 15 }}>
          <Text style={{ color: '#e0e0e0' }}>Ya tengo cuenta</Text>
        </TouchableOpacity>
=======
import { db } from '../db';

export default function Registro({ navigation }) {


  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

 
  const handleRegister = () => {

    if (!email || !password) {
      Alert.alert("Error", "Llena todos los campos");
      return;
    }

    db.transaction(tx => {
      tx.executeSql(
        "INSERT INTO users (email, password) VALUES (?, ?);",
        [email, password],
        () => {
          Alert.alert("Éxito", "Cuenta creada correctamente");
          navigation.navigate('InicioSesionScreen');
        },
        (txObj, error) => {
          
          if (error.message.includes("UNIQUE constraint failed")) {
            Alert.alert("Error", "Este correo ya está registrado");
          } else {
            Alert.alert("Error", "No se pudo registrar");
          }
        }
      );
    });
  };

  return (
    <ImageBackground
      source={{
        uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRYif2M6fKDGvl-Mmjd5jgZ7Bnm46zWAOZJHg&s',
      }}
      style={styles.background}
    >
      <View style={styles.overlay}>
        <View style={styles.container}>

          <Text style={styles.title}>Crear Cuenta</Text>

          <TextInput
            placeholder="Correo electrónico"
            placeholderTextColor="#ccc"
            style={styles.input}
            value={email}
            onChangeText={setEmail}
          />

          <TextInput
            placeholder="Contraseña"
            placeholderTextColor="#ccc"
            secureTextEntry
            style={styles.input}
            value={password}
            onChangeText={setPassword}
          />

          <TouchableOpacity
            style={styles.startButton}
            activeOpacity={0.8}
            onPress={handleRegister}
          >
            <Text style={styles.startText}>Registrarme</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate('Login')}
            style={{ marginTop: 15 }}
          >
            <Text style={{ color: '#e0e0e0' }}>
              Ya tengo una cuenta
            </Text>
          </TouchableOpacity>

        </View>
>>>>>>> aee6b215b9806ffec8dbdd90d451adc89c422220
      </View>
    </ImageBackground>
  );
}
<<<<<<< HEAD
const styles = StyleSheet.create({
  background: { flex: 1, resizeMode: 'cover', justifyContent: 'center', alignItems:'center' },
  container: { width: '85%', backgroundColor: 'rgba(255,255,255,0.15)', borderRadius: 25, padding: 25, alignItems: 'center' },
  title: { fontSize: 26, fontWeight: 'bold', color: '#fff', marginBottom: 20 },
  input: { width: '100%', backgroundColor: 'rgba(255,255,255,0.2)', borderRadius: 15, padding: 12, marginBottom: 15, color: '#fff' },
  startButton: { backgroundColor: '#4CAF50', borderRadius: 25, paddingVertical: 15, width: '80%', alignItems: 'center', marginTop: 10 },
  startText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
});
=======

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    width: '85%',
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderRadius: 25,
    padding: 25,
    alignItems: 'center',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 15,
    padding: 12,
    marginBottom: 15,
    color: '#fff',
  },
  startButton: {
    backgroundColor: '#4CAF50',
    borderRadius: 25,
    paddingVertical: 15,
    width: '80%',
    alignItems: 'center',
    marginTop: 10,
  },
  startText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
>>>>>>> aee6b215b9806ffec8dbdd90d451adc89c422220
