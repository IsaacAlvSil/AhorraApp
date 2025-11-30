import React, { useEffect, useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ImageBackground, 
  Image, 
  TouchableOpacity, 
  ScrollView,
  ActivityIndicator
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';


import DatabaseService from '../database/DatabaseService';

export default function PerfilScreen({ navigation }) {
  const [usuario, setUsuario] = useState(null);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const cargarDatosSesion = () => {

      const usuarioActual = DatabaseService.obtenerSesion();
      
      if (usuarioActual) {
        setUsuario(usuarioActual);
      } else {
  
        console.log("No hay sesión activa");
      }
      setCargando(false);
    };

    cargarDatosSesion();
  }, []); 
  const handleCerrarSesion = () => {
    DatabaseService.cerrarSesion(); 
    navigation.reset({
      index: 0,
      routes: [{ name: 'InicioSesionScreen' }],
    });
  };

  if (cargando) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#4CAF50" />
      </View>
    );
  }

  return (
    <ImageBackground
      source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRYif2M6fKDGvl-Mmjd5jgZ7Bnm46zWAOZJHg&s' }}
      style={styles.background}
    >
      <View style={styles.overlay}>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          

          <View style={styles.headerCard}>
            <View style={styles.avatarContainer}>
              <Ionicons name="person-circle" size={80} color="#fff" />
            </View>
            <Text style={styles.nombre}>
              {usuario ? usuario.nombre : 'Usuario Invitado'} {usuario ? usuario.apellido : ''}
            </Text>
            <Text style={styles.fechaMiembro}>
              Miembro desde: {usuario ? new Date(usuario.fecha_creacion).toLocaleDateString() : 'Hoy'}
            </Text>
          </View>


          <View style={styles.sectionCard}>
            <Text style={styles.sectionTitle}>Información de Contacto</Text>
            
            <View style={styles.infoRow}>
              <Ionicons name="mail-outline" size={24} color="#03A9F4" />
              <View style={styles.infoTextContainer}>
                <Text style={styles.label}>Correo Electrónico</Text>
                <Text style={styles.value}>{usuario ? usuario.email : 'No disponible'}</Text>
              </View>
            </View>

            <View style={styles.divider} />

            <View style={styles.infoRow}>
              <Ionicons name="call-outline" size={24} color="#03A9F4" />
              <View style={styles.infoTextContainer}>
                <Text style={styles.label}>Teléfono</Text>
                <Text style={styles.value}>{usuario ? usuario.telefono : 'No disponible'}</Text>
              </View>
            </View>
          </View>

   
          <View style={styles.balanceCard}>
            <Text style={styles.balanceTitle}>Dinero Actual</Text>
            <Text style={styles.balanceAmount}>$14,892.50</Text>
            <View style={styles.statsRow}>
              <View style={styles.statItem}>
                <Ionicons name="arrow-up-circle" size={24} color="#8fe682" />
                <Text style={styles.statText}>Ingresos</Text>
                <Text style={styles.statValue}>+$5,200</Text>
              </View>
              <View style={styles.statItem}>
                <Ionicons name="arrow-down-circle" size={24} color="#ff6b6b" />
                <Text style={styles.statText}>Gastos</Text>
                <Text style={styles.statValue}>-$3,200</Text>
              </View>
            </View>
          </View>

          <View style={styles.sectionCard}>
            <Text style={styles.sectionTitle}>Estadísticas de Uso</Text>
            <Text style={styles.statDetail}>• Transacciones totales: 42</Text>
            <Text style={styles.statDetail}>• Metas cumplidas: 2</Text>
            <Text style={styles.statDetail}>• Categoría favorita: Comida</Text>
          </View>

          <TouchableOpacity style={styles.logoutButton} onPress={handleCerrarSesion}>
            <Text style={styles.logoutText}>Cerrar Sesión</Text>
          </TouchableOpacity>

        </ScrollView>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(21, 41, 124, 0.6)', 
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#15297c',
  },
  scrollContainer: {
    padding: 20,
    alignItems: 'center',
  },
  headerCard: {
    alignItems: 'center',
    marginBottom: 20,
  },
  avatarContainer: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 50,
    padding: 5,
    marginBottom: 10,
  },
  nombre: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#fff',
  },
  fechaMiembro: {
    fontSize: 14,
    color: '#ccc',
    marginTop: 5,
  },
  sectionCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    width: '100%',
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 4,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#15297c',
    marginBottom: 15,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  infoTextContainer: {
    marginLeft: 15,
  },
  label: {
    fontSize: 12,
    color: '#666',
  },
  value: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
  },
  divider: {
    height: 1,
    backgroundColor: '#eee',
    marginVertical: 10,
  },
  balanceCard: {
    backgroundColor: 'rgba(76, 124, 63, 0.9)',
    width: '100%',
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
    alignItems: 'center',
  },
  balanceTitle: {
    color: '#e0e0e0',
    fontSize: 16,
    marginBottom: 5,
  },
  balanceAmount: {
    color: '#fff',
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  statItem: {
    alignItems: 'center',
    width: '45%',
    backgroundColor: 'rgba(0,0,0,0.1)',
    padding: 10,
    borderRadius: 15,
  },
  statText: {
    color: '#fff',
    marginTop: 5,
    fontSize: 12,
  },
  statValue: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  statDetail: {
    fontSize: 16,
    color: '#333',
    marginBottom: 8,
  },
  logoutButton: {
    marginTop: 10,
    backgroundColor: '#ff6b6b',
    paddingVertical: 15,
    width: '100%',
    borderRadius: 25,
    alignItems: 'center',
    marginBottom: 30,
  },
  logoutText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});