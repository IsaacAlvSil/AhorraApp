import React from "react";
import { View, Text, FlatList, StyleSheet, ImageBackground, TouchableOpacity } from "react-native";

export default function NotificacionesScreen({ navigation }) {
  const notificaciones = [
    { 
      id: "1", 
      titulo: "Meta de ahorro alcanzada", 
      mensaje: "¡Felicidades! Has alcanzado tu meta de Viaje a Japón", 
      fecha: "Hace 2 horas",
      leida: false
    },
    { 
      id: "2", 
      titulo: "Recordatorio de pago", 
      mensaje: "Tu pago de renta vence en 3 días", 
      fecha: "Hace 1 día",
      leida: true
    },
    { 
      id: "3", 
      titulo: "Transferencia recibida", 
      mensaje: "Has recibido $1,500.00 de Juan Pérez", 
      fecha: "Hace 2 días",
      leida: true
    },
    { 
      id: "4", 
      titulo: "Límite de presupuesto", 
      mensaje: "Estás cerca de alcanzar tu límite de gastos en 'Comida'", 
      fecha: "Hace 3 días",
      leida: true
    },
    { 
      id: "5", 
      titulo: "Nueva funcionalidad", 
      mensaje: "Ya puedes usar las gráficas de análisis mensual", 
      fecha: "Hace 1 semana",
      leida: true
    },
  ];

  const renderItem = ({ item }) => (
    <View style={[styles.card, !item.leida && styles.cardNoLeida]}>
      <View style={styles.notificacionHeader}>
        <Text style={styles.tituloNotificacion}>{item.titulo}</Text>
        {!item.leida && <View style={styles.puntoNoLeido} />}
      </View>
      <Text style={styles.mensajeNotificacion}>{item.mensaje}</Text>
      <Text style={styles.fechaNotificacion}>{item.fecha}</Text>
    </View>
  );

  return (
    <ImageBackground
      source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRYif2M6fKDGvl-Mmjd5jgZ7Bnm46zWAOZJHg&s' }}
      style={styles.background}
    >
      <View style={styles.overlay}>
        <Text style={styles.titulo}>Notificaciones</Text>
        
        <FlatList
          data={notificaciones}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          contentContainerStyle={styles.listaContainer}
          showsVerticalScrollIndicator={false}
        />

        <TouchableOpacity 
          style={styles.botonVolver} 
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.botonVolverTexto}>← Volver</Text>
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
    backgroundColor: "#fff", // Blanco sólido
    width: "100%", 
    borderRadius: 20, 
    padding: 20, 
    marginBottom: 15, 
    shadowColor: '#000', 
    shadowOpacity: 0.1, 
    shadowRadius: 4, 
    elevation: 3 
  },
  cardNoLeida: {
    backgroundColor: "#f9fcf9", // Un verde muy muy clarito
    borderLeftWidth: 5,
    borderLeftColor: "#4c7c3f"
  },
  notificacionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8
  },
  tituloNotificacion: { 
    fontSize: 16, 
    fontWeight: 'bold', 
    color: '#15297c', 
    flex: 1 
  },
  puntoNoLeido: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#4c7c3f"
  },
  mensajeNotificacion: { 
    fontSize: 14, 
    color: '#555', 
    marginBottom: 8,
    lineHeight: 20
  },
  fechaNotificacion: {
    fontSize: 12,
    color: '#999',
    fontStyle: 'italic',
    alignSelf: 'flex-end'
  },
  botonVolver: { 
    backgroundColor: 'rgba(255,255,255,0.2)', 
    paddingVertical: 15, 
    width: '90%', 
    borderRadius: 25, 
    alignItems: 'center', 
    marginTop: 10,
    marginBottom: 30,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.3)'
  },
  botonVolverTexto: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold'
  }
});