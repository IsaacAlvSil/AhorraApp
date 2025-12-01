import React from "react";
import { View, Text, FlatList, StyleSheet, Button, ImageBackground, TouchableOpacity } from "react-native";

export default function TransaccionesScreen({setScreen}) {
  const transacciones = [
    { id: "1", tipo: "Depósito", monto: "+$1,200.00", fecha: "01/11/2025" },
    { id: "2", tipo: "Retiro", monto: "-$350.00", fecha: "02/11/2025" },
    { id: "3", tipo: "Depósito", monto: "+$800.00", fecha: "03/11/2025" },
    { id: "4", tipo: "Transferencia recibida", monto: "+$1,500.00", fecha: "03/11/2025" },
    { id: "5", tipo: "Pago enviado", monto: "-$200.00", fecha: "04/11/2025" },
  ];

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <View>
        <Text style={styles.tipo}>{item.tipo}</Text>
        <Text style={styles.fecha}>{item.fecha}</Text>
      </View>
      <Text
        style={[
          styles.monto,
          { color: item.monto.includes("-") ? "#e53935" : "#43a047" },
        ]}
      >
        {item.monto}
      </Text>
    </View>
  );

  return (
    <ImageBackground
      source={require('../assets/fondo.png')} 
      style={styles.background}
    >
      <View style={styles.container}>
        <Text style={styles.titulo}>Historial de Transacciones</Text>
        
        

        <View style={styles.listaContainer}>
          <FlatList
            data={transacciones}
            keyExtractor={(item) => item.id}
            renderItem={renderItem}
            style={styles.lista}
            showsVerticalScrollIndicator={false}
          />
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
  container: {
    flex: 1,
    backgroundColor: 'rgba(21, 41, 124, 0.7)',
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 60,
  },
  titulo: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 20,
    textAlign: "center",
  },
  actionButton: {
      backgroundColor: '#03A9F4',
      paddingVertical: 12,
      paddingHorizontal: 25,
      borderRadius: 25,
      marginBottom: 30,
      elevation: 4,
  },
  actionButtonText: {
      color: '#fff',
      fontWeight: 'bold',
      fontSize: 16,
  },
  listaContainer: {
    width: "100%",
    flex: 1,
    marginBottom: 20,
  },
  lista: {
    width: "100%",
  },
  item: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: 'center',
    backgroundColor: "#fff",
    padding: 18,
    borderRadius: 20,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  tipo: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#15297c",
    marginBottom: 4,
  },
  fecha: {
    fontSize: 13,
    color: "#757575",
  },
  monto: {
    fontSize: 16,
    fontWeight: "bold",
  },
});