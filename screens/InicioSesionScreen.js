// --- InicioSesionScreen.js ---
// Igual que tu estilo de registro

import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ImageBackground,
  StyleSheet,
  Alert,
  ActivityIndicator,
  ScrollView
} from 'react-native';
import { UsuarioController } from '../controllers/UsuarioController';

const controller = new UsuarioController();

export default function InicioSesionScreen({ navigation }) {

  const [correo, setCorreo] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [loading, setLoading] = useState(false);
  const [inicializando, setInicializando] = useState(true);

  useEffect(() => {
    const inicializarBD = async () => {
      try {
        await controller.initialize();
      } catch (e) {
        Alert.alert('Error', 'No se pudo inicializar la BD');
      } finally {
        setInicializando(false);
      }
    };
    inicializarBD();
  }, []);

  const handleAcceder = async () => {
    if (loading) return;

    try {
      setLoading(true);
      const usuario = await controller.login(correo, contrasena);

      Alert.alert(
        "Bienvenida",
        `Sesión iniciada correctamente`,
        [{
          text: "Continuar",
          onPress: () => navigation.replace("AppMainTabs")  // <-- LISTA LA NAVEGACIÓN
        }]
      );

    } catch (e) {
      Alert.alert("Error", e.message);
    } finally {
      setLoading(false);
    }
  };

  const handleRegistrar = () => {
    // SIEMPRE te regresa bien al registro
    navigation.navigate("RegistroScreen");
  };

  if (inicializando) {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <ImageBackground
          source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRYif2M6fKDGvl-Mmjd5jgZ7Bnm46zWAOZJHg&s' }}
          style={styles.background}
        >
          <View style={styles.container}>
            <ActivityIndicator size="large" color="#fff" />
            <Text style={styles.loadingText}>Inicializando...</Text>
          </View>
        </ImageBackground>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ImageBackground
        source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRYif2M6fKDGvl-Mmjd5jgZ7Bnm46zWAOZJHg&s' }}
        style={styles.background}
      >
        <ScrollView contentContainerStyle={styles.container}>

          <TouchableOpacity
            style={styles.skipButton}
            onPress={() => navigation.replace("AppMainTabs")}
          >
            <Text style={styles.skipButtonText}>(Saltar logueo)</Text>
          </TouchableOpacity>

          <Image
            source={require('../assets/logoSinfondo.png')}
            style={styles.logo}
          />

          <TextInput
            style={styles.input}
            placeholder="Ingresar correo electrónico"
            placeholderTextColor="#ddd"
            value={correo}
            onChangeText={setCorreo}
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <TextInput
            style={styles.input}
            placeholder="Ingresar contraseña"
            placeholderTextColor="#ddd"
            secureTextEntry
            value={contrasena}
            onChangeText={setContrasena}
          />

          <TouchableOpacity
            style={[styles.button, loading && styles.buttonDisabled]}
            onPress={handleAcceder}
            disabled={loading}
            activeOpacity={0.8}
          >
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.buttonText}>ACCEDER</Text>
            )}
          </TouchableOpacity>

          <Text style={styles.textoCuenta}>¿Aún no tienes cuenta?</Text>

          <TouchableOpacity onPress={handleRegistrar}>
            <Text style={styles.registrar}>REGISTRARSE</Text>
          </TouchableOpacity>

        </ScrollView>
      </ImageBackground>
    </SafeAreaView>
  );
}


// ESTILOS EXACTAMENTE COMO TU REGISTRO
const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: "cover",
  },
  container: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 25,
    paddingTop: 50,
    paddingBottom: 80
  },
  skipButton: {
    position: "absolute",
    top: 40,
    right: 20,
    backgroundColor: "rgba(3,169,244,0.8)",
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 15,
  },
  skipButtonText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "bold",
  },
  logo: {
    width: 250,
    height: 100,
    resizeMode: "contain",
    marginBottom: 35,
  },
  input: {
    width: "100%",
    backgroundColor: "rgba(255,255,255,0.15)",
    padding: 15,
    borderRadius: 25,
    color: "#fff",
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.3)"
  },
  button: {
    backgroundColor: "#4c7c3f",
    paddingVertical: 15,
    width: "100%",
    borderRadius: 25,
    alignItems: "center",
    marginBottom: 25,
  },
  buttonDisabled: {
    opacity: 0.6
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    letterSpacing: 1,
  },
  textoCuenta: {
    color: "#fff",
    fontSize: 14,
  },
  registrar: {
    color: "#fff",
    fontWeight: "bold",
    marginTop: 5,
    fontSize: 16,
  },
  loadingText: {
    color: "#fff",
    fontSize: 16,
    marginTop: 10,
  }
});
