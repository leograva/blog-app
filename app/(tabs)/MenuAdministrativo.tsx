import { Feather, Ionicons, MaterialIcons } from '@expo/vector-icons'; // Para a barra inferior (usando Expo)
import React from 'react';
import {
    SafeAreaView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

export default function AdminMenuScreen() {
  return (
    <SafeAreaView style={styles.container}>
      {/* Título */}
      <Text style={styles.headerText}>Menu Administrativo</Text>

      {/* Botões do menu */}
      <TouchableOpacity style={styles.menuButton}>
        <Text style={styles.menuTitle}>Postagens</Text>
        <Text style={styles.menuText}>
          Utilize essa opção para adicionar, editar ou excluir postagens do aplicativo
        </Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.menuButton}>
        <Text style={styles.menuTitle}>Estudantes</Text>
        <Text style={styles.menuText}>
          Utilize essa opção para adicionar, editar ou excluir estudantes do aplicativo
        </Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.menuButton}>
        <Text style={styles.menuTitle}>Professores</Text>
        <Text style={styles.menuText}>
          Utilize essa opção para adicionar, editar ou excluir professores do aplicativo
        </Text>
      </TouchableOpacity>

      {/* Barra de navegação inferior */}
      <View style={styles.bottomNav}>
        <TouchableOpacity>
          <Ionicons name="home" size={24} color="#000" />
        </TouchableOpacity>
        <TouchableOpacity>
          <Feather name="info" size={24} color="#000" />
        </TouchableOpacity>
        <TouchableOpacity>
          <Feather name="shopping-cart" size={24} color="#000" />
        </TouchableOpacity>
        <TouchableOpacity>
          <Ionicons name="notifications-outline" size={24} color="#000" />
        </TouchableOpacity>
        <TouchableOpacity>
          <MaterialIcons name="person-outline" size={24} color="#000" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 40,
    paddingHorizontal: 16,
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 24,
  },
  menuButton: {
    backgroundColor: '#e0e0e0',
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
  },
  menuTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
  },
  menuText: {
    fontSize: 14,
    textAlign: 'center',
    color: '#333',
  },
  bottomNav: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 60,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
});
