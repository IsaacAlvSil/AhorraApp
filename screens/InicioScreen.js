import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet, ImageBackground, ScrollView, TouchableOpacity } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { PresupuestoController } from '../controllers/PresupuestoController';

export default function InicioScreen({ navigation }) { 
  const [saldoTotal, setSaldoTotal] = useState(0);

  useFocusEffect(
    useCallback(() => {
      console.log("🔄 Pantalla Inicio enfocada: Recargando saldo...");
      cargarSaldo();
    }, [])
  );

  const cargarSaldo = async () => {
    try {
      const total = await PresupuestoController.calcularSaldoTotal();
      console.log("Saldo recibido de la BD:", total);
      setSaldoTotal(total);
    } catch (error) {
      console.error("Error al cargar el saldo:", error);
    }
  };

  const handleIrAInversion = () => {
    navigation.navigate('PresupuestosScreen'); 
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

  const formatoMoneda = (cantidad) => {
    if (!cantidad) return '$0.00';
    return '$' + parseFloat(cantidad).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
  };

  return (
    <ImageBackground
      source={require('../assets/fondo.jpeg')} 
      style={styles.fondo}
    >
      <View style={styles.overlay}>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          
          <Text style={styles.titulo}>Inicio</Text>
          
          <View style={styles.card}>
            <Text style={styles.cardTitulo}>Tu Saldo Actual</Text>
            <Text style={styles.saldo}>{formatoMoneda(saldoTotal)}</Text>
            <Text style={styles.cambio}>Total acumulado disponible</Text>
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
              <Text style={styles.botonTexto}>Invertir / Ingresar</Text>
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
  scrollContainer: {
    alignItems: 'center',
    paddingVertical: 40,
    paddingHorizontal: 20,
    marginTop: 30, 
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
    fontSize: 32,
    fontWeight: 'bold',
    color: '#4c7c3f',
    marginBottom: 5,
  },
  cambio: {
    fontSize: 14,
    color: '#666',
    fontStyle: 'italic'
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
});