import React from 'react';
import { View, Text, Button, StyleSheet, ImageBackground, ScrollView } from 'react-native';
import { PieChart } from 'react-native-gifted-charts';

export default function GraficasScreen({ navigation }) {
  
  const data = [
    { value: 5000, color: '#4CAF50', text: 'Ingresos' },
    { value: 3200, color: '#F44336', text: 'Gastos' }
  ];

  const total = data.reduce((acc, item) => acc + item.value, 0);

  // Porcentajes para los labels flotantes ingresosPorcentaje
  const ingresosPorcentaje = ((5000 / total) * 100).toFixed(1);
  const gastosPorcentaje = ((3200 / total) * 100).toFixed(1);

  return (
    <ImageBackground
      source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRYif2M6fKDGvl-Mmjd5jgZ7Bnm46zWAOZJHg&s' }}
      style={styles.background}
    >
      <ScrollView contentContainerStyle={{ paddingTop: 60, paddingBottom: 40 }}>
        <View style={styles.container}>

          <Text style={styles.title}>Gráfica por Mes</Text>

          

          <View style={styles.card}>
            <Text style={styles.cardTitle}>Ingresos totales: $5,000</Text>
            <Text style={styles.cardSubtitle}>Gastos del mes: $3,200</Text>
          </View>

          {/* === Gráfica + porcentajes flotantes === */}
          <View style={styles.graficaContainer}>
            <PieChart
              data={data}
              radius={90}
              showText={false}
            />

            {/* Porcentaje Ingresos */}
            <Text style={[styles.porcentaje, { top: 40, left: 15, color: '#f1918aff' }]}>
              Gastos {gastosPorcentaje}%
            </Text>

            {/* Porcentaje Gastos */} 
            <Text style={[styles.porcentaje, { bottom: 40, right: 15, color: '#8aef8fff' }]}>
              Ingresos {ingresosPorcentaje}%
            </Text>
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

  graficaContainer: {
    width: '90%',
    height: 260,
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 25,
    overflow: 'hidden',
    paddingVertical: 10,
    position: 'relative',
  },

  porcentaje: {
    position: 'absolute',
    fontSize: 15,
    fontWeight: 'bold',
    backgroundColor: 'rgba(0,0,0,0.4)',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 10,
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
});
