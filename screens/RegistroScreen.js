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
  ScrollView 
} from 'react-native';

export default function RegistroScreen({ setScreen }) {
  const [nombre, setNombre] = useState('');
  const [correo, setCorreo] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [confirmarContrasena, setConfirmarContrasena] = useState('');

  const handleRegistro = () => {
    if (!nombre.trim() || !correo.trim() || !contrasena.trim() || !confirmarContrasena.trim()) {
      Alert.alert('Error', 'Por favor llena todos los campos');
      return;
    }

    if (contrasena !== confirmarContrasena) {
      Alert.alert('Error', 'Las contraseñas no coinciden');
      return;
    }

    if (contrasena.length < 6) {
      Alert.alert('Error', 'La contraseña debe tener al menos 6 caracteres');
      return;
    }

    // Simulación de registro exitoso
    Alert.alert(
      'Registro Exitoso',
      `Bienvenido ${nombre}, tu cuenta ha sido creada correctamente`,
      [
        {
          text: 'Aceptar',
          onPress: () => setScreen('inicio sesion')
        }
      ]
    );
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ImageBackground
        source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRYif2M6fKDGvl-Mmjd5jgZ7Bnm46zWAOZJHg&s' }}
        style={styles.background}
      >
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <View style={styles.container}>
            <Text style={styles.titulo}>Crear Cuenta</Text>

            <TextInput
              style={styles.input}
              placeholder="Nombre completo"
              placeholderTextColor="#ddd"
              value={nombre}
              onChangeText={setNombre}
            />

            <TextInput
              style={styles.input}
              placeholder="Correo electrónico"
              placeholderTextColor="#ddd"
              value={correo}
              onChangeText={setCorreo}
              keyboardType="email-address"
              autoCapitalize="none"
            />

            <TextInput
              style={styles.input}
              placeholder="Contraseña"
              placeholderTextColor="#ddd"
              value={contrasena}
              onChangeText={setContrasena}
              secureTextEntry
            />

            <TextInput
              style={styles.input}
              placeholder="Confirmar contraseña"
              placeholderTextColor="#ddd"
              value={confirmarContrasena}
              onChangeText={setConfirmarContrasena}
              secureTextEntry
            />

            <TouchableOpacity 
              style={styles.button}
              onPress={handleRegistro}
            >
              <Text style={styles.buttonText}>REGISTRARSE</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => setScreen('inicio sesion')}>
              <Text style={styles.linkText}>
                ¿Ya tienes cuenta? <Text style={styles.linkBold}>Iniciar Sesión</Text>
              </Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.buttonSecondary}
              onPress={() => setScreen('bienvenida')}
            >
              <Text style={styles.buttonSecondaryText}>← Volver</Text>
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
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: 'rgba(21, 41, 124, 0.7)',
  },
  titulo: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 30,
    textAlign: 'center',
  },
  input: {
    width: '90%',
    backgroundColor: 'rgba(255,255,255,0.2)',
    padding: 15,
    borderRadius: 25,
    color: '#fff',
    marginBottom: 15,
    fontSize: 16,
  },
  button: {
    backgroundColor: '#4c7c3f',
    paddingVertical: 15,
    width: '90%',
    borderRadius: 25,
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  linkText: {
    color: '#fff',
    fontSize: 14,
    marginBottom: 20,
  },
  linkBold: {
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
  buttonSecondary: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingVertical: 12,
    width: '90%',
    borderRadius: 25,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.3)',
  },
  buttonSecondaryText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
});