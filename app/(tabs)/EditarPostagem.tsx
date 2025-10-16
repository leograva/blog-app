import React, { useState } from "react";
import {
  Platform, ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity
} from "react-native";
  

export default function CriarPostagem() {
  const [titulo, setTitulo] = useState("");
  const [autor, setAutor] = useState("");
  const [conteudo, setConteudo] = useState("");

  const handleEnviar = () => {
    const host = Platform.OS === "android" ? "10.0.2.2" : "localhost";
    const url = `http://${host}:3000/posts`;

    fetch(url, {
      method: "POST",
      headers: {
      "Content-Type": "application/json",
      },
      body: JSON.stringify({
      title: titulo,
      content: conteudo,
      author: autor,
      }),
    })
      .then((response) => {
      if (!response.ok) {
        throw new Error("Erro ao enviar o post: " + response.status.toString());
      }
      return response.json();
      })
      .then(() => {
      alert("Post enviado com sucesso!");
      })
      .catch((error) => {
      alert(error.message);
      });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.tituloPagina}>Edição de Postagens</Text>

      <Text style={styles.label}>Título</Text>
      <TextInput
        style={styles.input}
        placeholder="Digite aqui o título da postagem"
        value={titulo}
        onChangeText={setTitulo}
      />

      <Text style={styles.label}>Autor</Text>
      <TextInput
        style={styles.input}
        placeholder="Digite aqui o nome do autor da postagem"
        value={autor}
        onChangeText={setAutor}
      />

      <Text style={styles.label}>Conteúdo</Text>
      <TextInput
        style={[styles.input, styles.textArea]}
        placeholder="Digite aqui o conteúdo da postagem"
        value={conteudo}
        onChangeText={setConteudo}
        multiline
        numberOfLines={6}
      />

      <TouchableOpacity style={styles.botao} onPress={handleEnviar}>
        <Text style={styles.textoBotao}>Salvar alterações</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    paddingTop: 60,
  },
  tituloPagina: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 40,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 8,
    color: "#000",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    marginBottom: 20,
  },
  textArea: {
    height: 150,
    textAlignVertical: "top",
  },
  botao: {
    backgroundColor: "#000",
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
  },
  textoBotao: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
