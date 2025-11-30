import React, { useState } from 'react';
import { 
  SafeAreaView, 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  ImageBackground, 
  StyleSheet, 
  Alert,
  ScrollView,
  ActivityIndicator 
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

      await DatabaseService.addUsuario({
        nombre: nombreCompleto,
        email: correo,
        password: contrasena
      });


      Alert.alert('Registro Exitoso', `Bienvenido, ${nombreCompleto}. Tu cuenta ha sido creada.`, [
        {
          text: "Ir al Login",
          onPress: () => navigation.navigate('InicioSesionScreen') 
        }
      ]);

    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Hubo un problema al guardar tus datos en la base de datos.');
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

            <TextInput
              style={styles.input}
              placeholder="Nombre completo"
              placeholderTextColor="#fff"
              autoCapitalize="words"
              value={nombreCompleto}
              onChangeText={setNombreCompleto}
            />

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
              onPress={handleRegistro}
              disabled={cargando}
            >
              {cargando ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text style={styles.buttonText}>REGISTRARME</Text>
              )}
            </TouchableOpacity>

            <Text style={styles.textoCuenta}>¿Ya tienes una cuenta?</Text>
            <TouchableOpacity onPress={handleIrAInicioSesion}>
              <Text style={styles.acceder}>INICIAR SESIÓN</Text>
            </TouchableOpacity>
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
    justifyContent: 'center',
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
    backgroundColor: 'rgba(27, 40, 181, 0.4)',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 40,
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
    paddingVertical: 15,
    alignItems: 'center',
    marginTop: 20,
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
  acceder: {
    color: '#03A9F4',
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 5,
    textDecorationLine: 'underline',
  },
});