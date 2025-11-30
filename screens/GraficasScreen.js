import React from 'react';
import { View, Text, TouchableOpacity, Button, StyleSheet, ImageBackground, Image, ScrollView } from 'react-native';

export default function GraficasScreen({ navigation }) {
  return (
    <ImageBackground
      source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRYif2M6fKDGvl-Mmjd5jgZ7Bnm46zWAOZJHg&s' }}
      style={styles.background}
    >
      <ScrollView contentContainerStyle={{ paddingTop: 60, paddingBottom: 40 }}>
        <View style={styles.container}>
          <Text style={styles.title}>Gráfica por Mes</Text>

          <Button
            title="Ver más detalles / Filtrar"
            color="#03A9F4"
            onPress={() => navigation.navigate('FiltradoScreen')}
          />

          <View style={styles.card}>
            <Text style={styles.cardTitle}>Ingresos totales: $5,000</Text>
            <Text style={styles.cardSubtitle}>Gastos del mes: $3,200</Text>
          </View>

          <View style={styles.graficaPlaceholder}>
            <Image
              source={require('../assets/g1.jpeg')}
              style={styles.graficaImagen}
              resizeMode="contain"
            />
          </View>

          <View style={styles.estadisticas}>
            <Text style={styles.estadistica}>Mes con más ingresos: Enero.</Text>
            <Text style={styles.estadistica}>Mes con más gastos: Septiembre.</Text>
            <Text style={styles.estadistica}>Ahorro promedio mensual: $500.</Text>
          </View>
        </View>
      </ScrollView>
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
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 30,
    textAlign: 'center',
  },
  card: {
    width: '90%',
    backgroundColor: 'rgba(255,255,255,0.2)',
    padding: 20,
    borderRadius: 25,
    marginBottom: 25,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 5,
  },
  cardSubtitle: {
    fontSize: 16,
    color: '#e0e0e0',
  },
  graficaPlaceholder: {
    width: '90%',
    height: 220,
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 25,
    overflow: 'hidden',
  },
  graficaImagen: {
    width: '100%',
    height: '100%',
  },
  estadisticas: {
    width: '90%',
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 15,
    padding: 15,
    marginBottom: 20,
  },
  estadistica: {
    fontSize: 16,
    color: 'white',
    marginBottom: 5,
  },
  button: {
    backgroundColor: '#03A9F4',
    paddingVertical: 15,
    borderRadius: 25,
    width: '90%',
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});