import React, { useState } from 'react';
import { 
  SafeAreaView, View, Text, TextInput, TouchableOpacity, 
  ImageBackground, StyleSheet, Alert, ScrollView, ActivityIndicator 
} from 'react-native';
import DatabaseService from '../database/DatabaseService';

export default function RegistroScreen({ navigation }) {
  const [nombreCompleto, setNombreCompleto] = useState('');
  const [correo, setCorreo] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [cargando, setCargando] = useState(false);

  const handleRegistro = async () => {
    if (nombreCompleto.trim() === '' || correo.trim() === '' || contrasena.trim() === '') {
      Alert.alert('Error', 'Por favor, llena todos los campos.');
      return;
    }

    if (contrasena.length < 6) {
      Alert.alert('Error', 'La contraseña debe tener al menos 6 caracteres.');
      return;
    }
        
    setCargando(true);
    try {
      const existeUsuario = await DatabaseService.buscarUsuarioPorEmail(correo);
      if (existeUsuario) {
        Alert.alert('Error', 'Este correo ya está registrado. Intenta iniciar sesión.');
        setCargando(false);
        return;
      }

      const partesNombre = nombreCompleto.trim().split(' ');
      const nombreReal = partesNombre[0];
      const apellidoReal = partesNombre.length > 1 ? partesNombre.slice(1).join(' ') : 'Usuario';

      await DatabaseService.addUsuario({
        nombre: nombreReal,
        apellido: apellidoReal,
        email: correo,
        telefono: 'Sin teléfono',
        password: contrasena
      });

      Alert.alert('Registro Exitoso', `Bienvenido, ${nombreReal}. Tu cuenta ha sido creada.`, [
        {
          text: "Ir al Login",
          onPress: () => navigation.navigate('InicioSesionScreen') 
        }
      ]);
    } catch (error) {
      console.error("Error en registro:", error);
      Alert.alert('Error', 'Hubo un problema al guardar en la base de datos: ' + error.message);
    } finally {
      setCargando(false);
    }
  };

  const handleIrAInicioSesion = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ImageBackground
        source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRYif2M6fKDGvl-Mmjd5jgZ7Bnm46zWAOZJHg&s' }}
        style={styles.background}
      >
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <View style={styles.container}>
            <Text style={styles.title}>CREAR CUENTA</Text>
            
            <View style={styles.cardForm}>
                <TextInput
                  style={styles.input}
                  placeholder="Nombre completo"
                  placeholderTextColor="#888"
                  autoCapitalize="words"
                  value={nombreCompleto}
                  onChangeText={setNombreCompleto}
                />

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

                <TouchableOpacity
                  style={styles.button}
                  activeOpacity={0.8}
                  onPress={handleRegistro}
                  disabled={cargando}
                >
                  {cargando ? (
                    <ActivityIndicator color="#fff" />
                  ) : (
                    <Text style={styles.buttonText}>REGISTRARME</Text>
                  )}
                </TouchableOpacity>
            </View>

            <View style={styles.footer}>
                <Text style={styles.textoCuenta}>¿Ya tienes una cuenta?</Text>
                <TouchableOpacity onPress={handleIrAInicioSesion}>
                <Text style={styles.acceder}>INICIAR SESIÓN</Text>
                </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </ImageBackground>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  container: {
    paddingTop: 50,
    paddingBottom: 50,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: 'rgba(21, 41, 124, 0.75)',
    minHeight: '100%'
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 30,
    letterSpacing: 1,
  },
  cardForm: {
    width: '100%',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 55,
    backgroundColor: '#fff',
    borderRadius: 25,
    paddingHorizontal: 20,
    fontSize: 16,
    color: '#333',
    marginBottom: 15,
    elevation: 2,
  },
  button: {
    width: '100%',
    backgroundColor: '#4CAF50',
    borderRadius: 25,
    paddingVertical: 15,
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 10,
    elevation: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  footer: {
    alignItems: 'center',
  },
  textoCuenta: {
    color: '#eee',
    marginTop: 10,
    fontSize: 15,
  },
  acceder: {
    color: '#03A9F4',
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 5,
  },
});