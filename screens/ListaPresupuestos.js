import React from 'react';
import { View, Text, StyleSheet, ImageBackground,Button, Image, ScrollView, TouchableOpacity } from 'react-native';

export default function ListaPresupuestos({setScreen}) {
  return (
    <ImageBackground
      source={require('../assets/fondo.jpeg')}
      style={styles.fondo}
    >
      <View style={styles.overlay}>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          
          <View style={styles.logoContainer}>
            <Image
              source={require('../assets/logo_ahorraApp.png')}
              style={styles.logo}
              resizeMode="contain"
            />
          </View>

          <Text style={styles.titulo}>Lista de Presupuestos</Text>

          <Button
                  title="Siguiente Screen"
                  color="#03A9F4"
                  onPress={() => setScreen('presupuestos')}
                  />

          <View style={styles.card}>
            <Text style={styles.cardTitulo}>Presupuesto Mensual</Text>
            <Text style={styles.cardTexto}>Monto asignado: $10,000</Text>
            <Text style={styles.cardTexto}>Gasto actual: $7,500</Text>
            <TouchableOpacity style={styles.boton}>
              <Text style={styles.botonTexto}>Ver detalles</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.card}>
            <Text style={styles.cardTitulo}>Meta de Viaje</Text>
            <Text style={styles.cardTexto}>Monto objetivo: $15,000</Text>
            <Text style={styles.cardTexto}>Ahorro actual: $9,200</Text>
            <TouchableOpacity style={styles.boton}>
              <Text style={styles.botonTexto}>Ver detalles</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.card}>
            <Text style={styles.cardTitulo}>Fondo de Emergencias</Text>
            <Text style={styles.cardTexto}>Monto objetivo: $5,000</Text>
            <Text style={styles.cardTexto}>Ahorro actual: $2,800</Text>
            <TouchableOpacity style={styles.boton}>
              <Text style={styles.botonTexto}>Ver detalles</Text>
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
    fontSize: 24,
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
    marginBottom: 8,
  },
  cardTexto: {
    fontSize: 16,
    color: '#333',
    marginBottom: 5,
  },
  boton: {
    backgroundColor: '#03A9F4',
    borderRadius: 10,
    paddingVertical: 10,
    marginTop: 10,
    alignItems: 'center',
  },
  botonTexto: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
