import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ImageBackground, 
  ScrollView, 
  TouchableOpacity, 
  SafeAreaView, 
  Dimensions 
} from 'react-native';
import { Ionicons } from '@expo/vector-icons'; 

const { width } = Dimensions.get('window');

export default function InicioScreen({ navigation }) { 

  const handleIrAInversion = () => navigation.navigate('IngresarDinero');
  const handleIrAMetas = () => navigation.navigate('MetasScreen');
  const handleIrATransferir = () => navigation.navigate('TransferirScreen');
  const handleIrANotificaciones = () => navigation.navigate('NotificacionesScreen');

  const handleIrAAjustes = () => {
    navigation.navigate('Ajustes');
  }

  return (
    <View style={styles.mainContainer}>
      <ImageBackground
        source={require('../assets/fondo.png')}
        style={styles.fondo}
      >
        {/* Capa oscura simple para que las letras blancas se lean bien */}
        <View style={styles.overlay}>
            <SafeAreaView style={styles.safeArea}>
            
            {/* 1. Encabezado Simple */}
            <View style={styles.header}>
                <View>
                    <Text style={styles.saludo}>Hola, Usuario</Text>
                </View>
                <TouchableOpacity onPress={handleIrAAjustes} style={styles.botonAjustes}>
                    <Ionicons name="settings-outline" size={26} color="#fff" />
                </TouchableOpacity>
            </View>

            <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
                
                {/* 2. Tarjeta de Saldo (Limpia y Blanca) */}
                <View style={styles.cardSaldo}>
                    <Text style={styles.tituloSaldo}>Saldo Disponible</Text>
                    <Text style={styles.montoSaldo}>$14,892.50</Text>
                    
                    <View style={styles.indicadorCambio}>
                        <Ionicons name="arrow-up" size={16} color="#4c7c3f" />
                        <Text style={styles.textoCambio}> +$500.45 este mes</Text>
                    </View>
                </View>

                {/* 3. Botones (Sencillos y directos) */}
                <Text style={styles.seccionTitulo}>Acciones</Text>
                <View style={styles.gridBotones}>
                    <BotonSimple 
                        icon="trending-up" 
                        text="Invertir" 
                        onPress={handleIrAInversion} 
                    />
                    <BotonSimple 
                        icon="flag" 
                        text="Metas" 
                        onPress={handleIrAMetas} 
                    />
                    <BotonSimple 
                        icon="swap-horizontal" 
                        text="Transferir" 
                        onPress={handleIrATransferir} 
                    />
                    <BotonSimple 
                        icon="notifications" 
                        text="Avisos" 
                        onPress={handleIrANotificaciones} 
                    />
                </View>

                {/* 4. Lista de Metas (Estilo Lista Clásica) */}
                <Text style={styles.seccionTitulo}>Mis Metas</Text>
                <View style={styles.listaMetas}>
                    <FilaMeta titulo="Viaje a Japón" monto="$5,000 / $8,000" color="#FF5252" />
                    <View style={styles.separador} />
                    <FilaMeta titulo="Apartados" monto="$8,500 / $10,000" color="#448AFF" />
                    <View style={styles.separador} />
                    <FilaMeta titulo="Fondo Emergencia" monto="$2,800 / $5,000" color="#4CAF50" />
                </View>

                <View style={{height: 50}} /> 
            </ScrollView>
            </SafeAreaView>
        </View>
      </ImageBackground>
    </View>
  );
}

// Componente pequeño para los botones cuadrados
const BotonSimple = ({ icon, text, onPress }) => (
    <TouchableOpacity style={styles.botonCaja} onPress={onPress} activeOpacity={0.7}>
        <View style={styles.circuloIcono}>
            <Ionicons name={icon} size={24} color="#15297c" />
        </View>
        <Text style={styles.textoBoton}>{text}</Text>
    </TouchableOpacity>
);

// Componente pequeño para las filas de metas
const FilaMeta = ({ titulo, monto, color }) => (
    <View style={styles.filaMeta}>
        <View style={[styles.puntoColor, { backgroundColor: color }]} />
        <View style={{flex: 1}}>
            <Text style={styles.tituloMeta}>{titulo}</Text>
            <Text style={styles.montoMeta}>{monto}</Text>
        </View>
    </View>
);

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  fondo: {
    flex: 1,
    resizeMode: 'cover',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(21, 41, 124, 0.8)', // Azul oscuro simple, sin degradados
  },
  safeArea: {
    flex: 1,
  },
  scrollContainer: {
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  
  // Header
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginTop: 15,
    marginBottom: 20,
  },
  saludo: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
  },
  botonAjustes: {
    padding: 5,
  },

  // Tarjeta Saldo (Diseño limpio)
  cardSaldo: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 20,
    width: '100%',
    marginBottom: 25,
    // Sombra muy sutil, casi imperceptible
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  tituloSaldo: {
    color: '#666',
    fontSize: 14,
    marginBottom: 5,
    fontWeight: '500',
  },
  montoSaldo: {
    color: '#15297c', // Tu color azul corporativo
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  indicadorCambio: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f9f0', // Verde muy clarito de fondo
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  textoCambio: {
    color: '#4c7c3f',
    fontSize: 13,
    fontWeight: 'bold',
  },

  // Títulos
  seccionTitulo: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  },

  // Grid de Botones
  gridBotones: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  botonCaja: {
    backgroundColor: 'rgba(255,255,255,0.15)', // Transparente sutil
    width: (width - 60) / 4,
    height: 80,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
  },
  circuloIcono: {
    backgroundColor: '#fff',
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 5,
  },
  textoBoton: {
    color: '#fff',
    fontSize: 11,
    fontWeight: '600',
  },

  // Lista Metas
  listaMetas: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 5,
    paddingVertical: 10,
  },
  filaMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 12,
  },
  puntoColor: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 15,
  },
  tituloMeta: {
    color: '#333',
    fontSize: 15,
    fontWeight: 'bold',
  },
  montoMeta: {
    color: '#666',
    fontSize: 13,
  },
  separador: {
    height: 1,
    backgroundColor: '#f0f0f0',
    marginLeft: 40, 
    marginRight: 15,
  },
});