import React, { useState } from "react";
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  StyleSheet, 
  ImageBackground, 
  Alert,
  ScrollView 
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
            <Text style={styles.subtitulo}>Enviar dinero a otra cuenta</Text>
            
            <Text style={styles.label}>Destinatario</Text>
            <TextInput
              style={styles.input}
              placeholder="Nombre del destinatario"
              placeholderTextColor="#777"
              value={destinatario}
              onChangeText={setDestinatario}
            />

            <Text style={styles.label}>Monto a Transferir</Text>
            <TextInput
              style={styles.input}
              placeholder="$ 0.00"
              placeholderTextColor="#777"
              value={monto}
              onChangeText={setMonto}
              keyboardType="numeric"
            />

            <Text style={styles.label}>Concepto (Opcional)</Text>
            <TextInput
              style={styles.input}
              placeholder="Ej: Pago de servicios, Préstamo..."
              placeholderTextColor="#777"
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
            <Text style={styles.botonVolverTexto}>← Volver</Text>
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
    backgroundColor: "rgba(255, 255, 255, 0.95)", 
    width: "100%", 
    borderRadius: 15, 
    padding: 25, 
    marginBottom: 20, 
    shadowColor: '#000', 
    shadowOpacity: 0.25, 
    shadowRadius: 4, 
    elevation: 5 
  },
  subtitulo: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#15297c",
    textAlign: "center",
    marginBottom: 20
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginBottom: 8,
    marginTop: 10
  },
  input: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 12,
    backgroundColor: "#fff",
    color: "#000",
    fontSize: 16,
    marginBottom: 5
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
    backgroundColor: '#03A9F4', 
    paddingVertical: 15, 
    width: '90%', 
    borderRadius: 25, 
    alignItems: 'center', 
    marginTop: 10 
  },
  botonVolverTexto: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold'
  }
});