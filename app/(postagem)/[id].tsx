import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function PostagemDetalhada() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const { title = 'Título da Postagem', content = '' } = params;

  return (
    <View style={styles.container}>
      <Stack.Screen 
        options={{
          title: 'Detalhes da Postagem',
        }} 
      />

      {/* Título */}
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{title}</Text>
      </View>

      {/* Corpo do texto */}
      <ScrollView style={styles.contentContainer}>
        <Text style={styles.content}>
          {content}
          </Text>
      </ScrollView>

      {/* Botão Voltar */}
      <TouchableOpacity 
        style={styles.button} 
        onPress={() => router.back()}
      >
        <Text style={styles.buttonText}>Voltar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  titleContainer: {
    borderBottomWidth: 1,
    borderColor: '#eee',
    paddingVertical: 16,
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
  },
  contentContainer: {
    flex: 1,
    padding: 16,
  },
  content: {
    fontSize: 16,
    color: '#333',
    lineHeight: 24,
    textAlign: 'justify',
  },
  button: {
    backgroundColor: '#000',
    margin: 16,
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
});