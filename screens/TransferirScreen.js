import React, { useState } from "react";
import { 
  View, Text, TextInput, TouchableOpacity, StyleSheet, 
  ImageBackground, Alert, ScrollView 
} from "react-native";

export default function TransferirScreen({ navigation }) {
  const [monto, setMonto] = useState("");
  const [destinatario, setDestinatario] = useState("");
  const [concepto, setConcepto] = useState("");

  const handleTransferir = () => {
    if (!monto.trim() || isNaN(parseFloat(monto)) || parseFloat(monto) <= 0) {
      Alert.alert("Error", "Por favor ingresa un monto válido mayor a cero");
      return;
    }

    if (!destinatario.trim()) {
      Alert.alert("Error", "Por favor ingresa el nombre del destinatario");
      return;
    }

    const cantidad = parseFloat(monto);
    
    Alert.alert(
      "¡Transferencia Exitosa!",
      `Has transferido $${cantidad.toFixed(2)} a ${destinatario}${concepto ? `\nConcepto: ${concepto}` : ''}`,
      [
        { 
          text: "Aceptar", 
          onPress: () => {
            setMonto("");
            setDestinatario("");
            setConcepto("");
            navigation.goBack();
          } 
        }
      ]
    );
  };

  return (
    <ImageBackground
      source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRYif2M6fKDGvl-Mmjd5jgZ7Bnm46zWAOZJHg&s' }}
      style={styles.background}
    >
      <View style={styles.overlay}>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <Text style={styles.titulo}>Transferir Dinero</Text>

          <View style={styles.card}>
            <Text style={styles.subtitulo}>Datos del envío</Text>
            
            <Text style={styles.label}>Destinatario</Text>
            <TextInput
              style={styles.input}
              placeholder="Nombre completo"
              placeholderTextColor="#999"
              value={destinatario}
              onChangeText={setDestinatario}
            />

            <Text style={styles.label}>Monto a Transferir</Text>
            <TextInput
              style={styles.input}
              placeholder="$ 0.00"
              placeholderTextColor="#999"
              value={monto}
              onChangeText={setMonto}
              keyboardType="numeric"
            />

            <Text style={styles.label}>Concepto (Opcional)</Text>
            <TextInput
              style={styles.input}
              placeholder="Ej: Pago de servicios..."
              placeholderTextColor="#999"
              value={concepto}
              onChangeText={setConcepto}
            />

            <TouchableOpacity 
              style={styles.botonPrincipal}
              onPress={handleTransferir}
            >
              <Text style={styles.botonTexto}>Realizar Transferencia</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity 
            style={styles.botonVolver} 
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.botonVolverTexto}>← Cancelar</Text>
          </TouchableOpacity>
        </ScrollView>
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
  },
  scrollContainer: {
    alignItems: 'center',
    paddingTop: 60,
    paddingBottom: 40,
    paddingHorizontal: 20
  },
  titulo: { 
    fontSize: 26, 
    fontWeight: "bold", 
    color: "#fff", 
    marginBottom: 25, 
    textAlign: "center" 
  },
  card: { 
    backgroundColor: "#fff", // Tarjeta blanca
    width: "100%", 
    borderRadius: 25, 
    padding: 25, 
    marginBottom: 20, 
    shadowColor: '#000', 
    shadowOpacity: 0.2, 
    shadowRadius: 5, 
    elevation: 5 
  },
  subtitulo: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#15297c",
    marginBottom: 20,
    textAlign: 'center'
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: "#555",
    marginBottom: 8,
    marginTop: 5
  },
  input: {
    width: "100%",
    backgroundColor: '#f5f5f5', // Gris muy claro para el input
    borderRadius: 15,
    paddingHorizontal: 15,
    paddingVertical: 12,
    color: "#333",
    fontSize: 16,
    marginBottom: 15
  },
  botonPrincipal: {
    backgroundColor: "#4c7c3f",
    paddingVertical: 15,
    borderRadius: 25,
    alignItems: "center",
    marginTop: 20,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3
  },
  botonTexto: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold"
  },
  botonVolver: { 
    paddingVertical: 15, 
    width: '90%', 
    alignItems: 'center', 
    marginTop: 0 
  },
  botonVolverTexto: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textDecorationLine: 'underline'
  }
});