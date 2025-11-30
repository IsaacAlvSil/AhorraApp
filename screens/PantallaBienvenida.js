import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ImageBackground, Image } from 'react-native';

export default function PantallaBienvenida({ setScreen }) {
  return (
    <ImageBackground
      source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRYif2M6fKDGvl-Mmjd5jgZ7Bnm46zWAOZJHg&s' }}
      style={styles.background}
    >
      <View style={styles.container}>
   
        <View style={styles.logoContainer}>
          <Image
            source={require('../assets/logo_ahorraApp.png')}
            style={styles.logo}
            resizeMode="contain"
          />
        </View>

        <Text style={styles.titulo}>Bienvenido a AhorraAPP</Text>
        <Text style={styles.subtitulo}>
          Gestiona tus finanzas de manera inteligente y alcanza tus metas de ahorro
        </Text>

       
        <TouchableOpacity 
          style={styles.buttonPrimary}
          onPress={() => setScreen('inicio sesion')}
        >
          <Text style={styles.buttonText}>Iniciar Sesión</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.buttonSecondary}
          onPress={() => setScreen('registro')}
        >
          <Text style={styles.buttonText}>Crear Cuenta</Text>
        </TouchableOpacity>

        <Text style={styles.textoInfo}>
          Únete a miles de usuarios que ya controlan sus finanzas con nosotros
        </Text>
      </View>
    </ImageBackground>
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
    paddingHorizontal: 30,
    backgroundColor: 'rgba(21, 41, 124, 0.7)',
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  logo: {
    width: 200,
    height: 200,
  },
  titulo: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 15,
  },
  subtitulo: {
    fontSize: 16,
    color: '#e0e0e0',
    textAlign: 'center',
    marginBottom: 50,
    lineHeight: 22,
  },
  buttonPrimary: {
    backgroundColor: '#4c7c3f',
    paddingVertical: 15,
    width: '100%',
    borderRadius: 25,
    alignItems: 'center',
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  buttonSecondary: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingVertical: 15,
    width: '100%',
    borderRadius: 25,
    alignItems: 'center',
    marginBottom: 30,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.3)',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  textoInfo: {
    color: '#ccc',
    fontSize: 14,
    textAlign: 'center',
    marginTop: 20,
  },
});