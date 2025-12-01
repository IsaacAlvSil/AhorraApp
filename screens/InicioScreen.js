import React from 'react';
import { View, Text, StyleSheet, ImageBackground, ScrollView, TouchableOpacity } from 'react-native';

export default function InicioScreen({ navigation }) { 

  const handleIrAInversion = () => {
    navigation.navigate('IngresarDinero');
  }

  const handleIrAMetas = () => {
    navigation.navigate('MetasScreen');
  }

  const handleIrATransferir = () => {
    navigation.navigate('TransferirScreen');
  }
  
  const handleIrANotificaciones = () => {
    navigation.navigate('NotificacionesScreen');
  }

  const handleCerrarSesion = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: 'InicioSesionScreen' }],
    });
  }

  return (
    <ImageBackground
      source={require('../assets/fondoregistro.jpeg')}
      style={styles.fondo}
    >
      <View style={styles.overlay}>
        
        <TouchableOpacity style={styles.botonCerrarSesion} onPress={handleCerrarSesion}>
          <Text style={styles.textoCerrarSesion}>Cerrar Sesión</Text>
        </TouchableOpacity>

        <ScrollView contentContainerStyle={styles.scrollContainer}>
          

          <Text style={styles.titulo}>Inicio</Text>
          
          <View style={styles.card}>
            <Text style={styles.cardTitulo}>Tu Saldo Actual</Text>
            <Text style={styles.saldo}>$14,892.50</Text>
            <Text style={styles.cambio}>+ $500.45 este mes</Text>
          </View>

          <View style={styles.card}>
            <Text style={styles.cardTitulo}>Metas de Ahorro</Text>
            <Text style={styles.meta}>Viaje a Japón — $5,000 / $8,000</Text>
            <Text style={styles.meta}>Apartados — $8,500 / $10,000</Text>
            <Text style={styles.meta}>Fondo Emergencia — $2,800 / $5,000</Text>
          </View>

          <View style={styles.botonesContainer}>
            <TouchableOpacity 
              style={styles.botonAccion}
              onPress={handleIrAInversion} 
            >
              <Text style={styles.botonTexto}>Invertir</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.botonAccion}
              onPress={handleIrAMetas} 
            >
              <Text style={styles.botonTexto}>Metas</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.botonAccion}
              onPress={handleIrATransferir} 
            >
              <Text style={styles.botonTexto}>Transferir</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.botonAccion}
              onPress={handleIrANotificaciones} 
            >
              <Text style={styles.botonTexto}>Notificaciones</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  fondo: {
    flex: 1,
    resizeMode: 'cover',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(21, 41, 124, 0.7)',
  },
  botonCerrarSesion: {
    position: 'absolute',
    top: 40,
    right: 20,
    backgroundColor: 'rgba(255, 0, 0, 0.6)',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
    zIndex: 10,
  },
  textoCerrarSesion: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 12,
  },
  scrollContainer: {
    alignItems: 'center',
    paddingVertical: 40,
    paddingHorizontal: 20,
    marginTop: 30, 
  },
  logoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  logo: {
    width: 130,
    height: 130,
  },
  titulo: {
    fontSize: 28,
    color: 'white',
    fontWeight: 'bold',
    marginBottom: 25,
  },
  card: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    width: '90%',
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  cardTitulo: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#15297c',
    marginBottom: 10,
  },
  saldo: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4c7c3f',
    marginBottom: 5,
  },
  cambio: {
    fontSize: 14,
    color: '#666',
  },
  meta: {
    fontSize: 16,
    color: '#333',
    marginBottom: 8,
  },
  botonesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    width: '90%',
    marginBottom: 20,
  },
  botonAccion: {
    backgroundColor: '#03A9F4',
    padding: 15,
    borderRadius: 10,
    width: '48%',
    alignItems: 'center',
    marginBottom: 10,
  },
  botonTexto: {
    color: 'white',
    fontWeight: 'bold',
  },
  botonVolver: {
    backgroundColor: '#4c7c3f',
    paddingVertical: 15,
    width: '90%',
    borderRadius: 25,
    alignItems: 'center',
    marginTop: 10,
  },
  botonVolverTexto: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});