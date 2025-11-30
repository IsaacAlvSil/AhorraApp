import React from "react";
import { View, Text, FlatList, StyleSheet, ImageBackground, TouchableOpacity } from "react-native";

export default function MetasScreen({ navigation }) {
  const metas = [
    { id: "1", nombre: "Fondo de Emergencia", objetivo: 5000, ahorrado: 2500 },
    { id: "2", nombre: "Viaje a Cancún", objetivo: 8000, ahorrado: 3000 },
    { id: "3", nombre: "Nuevo Laptop", objetivo: 15000, ahorrado: 12000 },
  ];

  const renderItem = ({ item }) => {
    const progreso = item.ahorrado / item.objetivo;

    return (
      <View style={styles.card}>
        <Text style={styles.cardTitulo}>{item.nombre}</Text>
        <Text style={styles.meta}>
          Ahorrado: ${item.ahorrado} / ${item.objetivo}
        </Text>
        <View style={styles.barraFondo}>
          <View
            style={[
              styles.barraProgreso,
              { width: `${Math.min(progreso * 100, 100)}%` },
            ]}
          />
        </View>
      </View>
    );
  };

  return (
    <ImageBackground
      source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRYif2M6fKDGvl-Mmjd5jgZ7Bnm46zWAOZJHg&s' }}
      style={styles.background}
    >
      <View style={styles.overlay}>
        <Text style={styles.titulo}>Mis Metas de Ahorro</Text>
        <FlatList
          data={metas}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          contentContainerStyle={styles.listaContainer}
        />

        <TouchableOpacity 
          style={styles.botonVolver} 
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.botonVolverTexto}>Volver</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: { 
    flex: 1, 
    resizeMode: "cover" 
  },
  overlay: { 
    flex: 1, 
    backgroundColor: 'rgba(21, 41, 124, 0.7)', 
    alignItems: 'center', 
    paddingTop: 60, 
    paddingHorizontal: 20 
  },
  titulo: { 
    fontSize: 26, 
    fontWeight: "bold", 
    color: "#fff", 
    marginBottom: 25, 
    textAlign: "center" 
  },
  listaContainer: { 
    width: "100%", 
    paddingBottom: 40 
  },
  card: { 
    backgroundColor: "rgba(255, 255, 255, 0.9)", 
    width: "100%", 
    borderRadius: 15, 
    padding: 20, 
    marginBottom: 20, 
    shadowColor: '#000', 
    shadowOpacity: 0.25, 
    shadowRadius: 4, 
    elevation: 5 
  },
  cardTitulo: { 
    fontSize: 18, 
    fontWeight: 'bold', 
    color: '#15297c', 
    marginBottom: 10 
  },
  meta: { 
    fontSize: 16, 
    color: '#333', 
    marginBottom: 10 
  },
  barraFondo: { 
    width: '100%', 
    height: 15, 
    backgroundColor: 'rgba(0,0,0,0.1)', 
    borderRadius: 10, 
    overflow: 'hidden' 
  },
  barraProgreso: { 
    height: '100%', 
    backgroundColor: '#4c7c3f', 
    borderRadius: 10 
  },
  botonVolver: { 
    backgroundColor: '#03A9F4', 
    paddingVertical: 15, 
    width: '90%', 
    borderRadius: 25, 
    alignItems: 'center', 
    marginTop: 10 
  },
  botonVolver: { 
  backgroundColor: '#03A9F4', 
  paddingVertical: 15, 
  width: '90%', 
  borderRadius: 25, 
  alignItems: 'center', 
  marginTop: 10,
  marginBottom: 50,
}
});
