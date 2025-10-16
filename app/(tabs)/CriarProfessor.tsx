import React, { useState } from "react";
import {
  Platform, ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity
} from "react-native";
  

export default function EditarProfessor() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [observacao, setObservacao] = useState("");

  const handleEnviar = () => {
    const host = Platform.OS === "android" ? "10.0.2.2" : "localhost";
    const url = `http://${host}:3000/posts`;

    fetch(url, {
      method: "POST",
      headers: {
      "Content-Type": "application/json",
      },
      body: JSON.stringify({
      name: nome,
      mail: email,
      observation: observacao,
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
      <Text style={styles.tituloPagina}>Cadastro de Professores</Text>

      <Text style={styles.label}>Nome</Text>
      <TextInput
        style={styles.input}
        placeholder="Digite aqui o nome do professor"
        value={nome}
        onChangeText={setNome}
      />

      <Text style={styles.label}>E-mail</Text>
      <TextInput
        style={styles.input}
        placeholder="Digite aqui o e-mail do professor"
        value={email}
        onChangeText={setEmail}
      />

      <Text style={styles.label}>Observações</Text>
      <TextInput
        style={styles.input}
        placeholder="Digite aqui as observações do professor"
        value={observacao}
        onChangeText={setObservacao}
      />

      <TouchableOpacity style={styles.botao} onPress={handleEnviar}>
        <Text style={styles.textoBotao}>Enviar</Text>
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
