import React from 'react';
import { View, Text, StyleSheet, ImageBackground, ScrollView, TouchableOpacity, SafeAreaView } from 'react-native';
// 1. Importamos los iconos
import { Ionicons } from '@expo/vector-icons'; 

export default function InicioScreen({ navigation }) { 

  const handleIrAInversion = () => navigation.navigate('IngresarDinero');
  const handleIrAMetas = () => navigation.navigate('MetasScreen');
  const handleIrATransferir = () => navigation.navigate('TransferirScreen');
  const handleIrANotificaciones = () => navigation.navigate('NotificacionesScreen');

  // Función para ir a la nueva pantalla de Ajustes
  const handleIrAAjustes = () => {
    navigation.navigate('Ajustes'); // Asegúrate de registrar esta pantalla en App.js
  }

  return (
    <ImageBackground
      source={require('../assets/fondo.png')}
      style={styles.fondo}
    >
      <View style={styles.overlay}>
        
        {/* 2. Botón de Ajustes en la esquina superior derecha */}
        <SafeAreaView style={styles.topBar}>
            <TouchableOpacity style={styles.btnAjustes} onPress={handleIrAAjustes}>
                <Ionicons name="settings-outline" size={28} color="white" />
            </TouchableOpacity>
        </SafeAreaView>

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
            <TouchableOpacity style={styles.botonAccion} onPress={handleIrAInversion}>
              <Text style={styles.botonTexto}>Invertir</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.botonAccion} onPress={handleIrAMetas}>
              <Text style={styles.botonTexto}>Metas</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.botonAccion} onPress={handleIrATransferir}>
              <Text style={styles.botonTexto}>Transferir</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.botonAccion} onPress={handleIrANotificaciones}>
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
  // Estilos nuevos para el botón superior
  topBar: {
    width: '100%',
    alignItems: 'flex-end',
    paddingRight: 20,
    marginTop: 10, 
  },
  btnAjustes: {
    padding: 10,
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 50,
  },
  scrollContainer: {
    alignItems: 'center',
    paddingBottom: 40,
    paddingHorizontal: 20,
    // marginTop quitado para usar SafeAreaView y topBar
  },
  titulo: {
    fontSize: 28,
    color: 'white',
    fontWeight: 'bold',
    marginBottom: 25,
    marginTop: 10,
  },
  card: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)', // Un poco más sólido para legibilidad
    width: '100%',
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
    width: '100%',
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
});