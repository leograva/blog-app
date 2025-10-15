import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

type Post = {
  id: number;
  title: string;
  content: string;
  author?: string;
  created_at?: string;
};

export default function PostagemDetalhadaScreen() {
  const params = useLocalSearchParams();
  const router = useRouter();
  const idParam = params?.id;
  const initialTitle = params?.title as string | undefined;
  const initialContent = params?.content as string | undefined;

  const [post, setPost] = useState<Post | null>(
    idParam ? { id: Number(idParam), title: initialTitle || 'Carregando...', content: initialContent || '' } : null
  );
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    const fetchPost = async () => {
      if (!idParam) return;
      setLoading(true);
      setError(null);
      try {
        const host = Platform.OS === 'android' ? '10.0.2.2' : 'localhost';
        // Try single-post endpoint first
        try {
          const res = await fetch(`http://${host}:3000/posts/${idParam}`);
          if (res.ok) {
            const json = await res.json();
            if (isMounted) setPost(json?.data || json?.post || json || null);
            return;
          }
        } catch (err) {
          // ignore and try list fallback
        }

        // Fallback: fetch all posts and find by id
        const resAll = await fetch(`http://${host}:3000/posts`);
        if (!resAll.ok) throw new Error(`HTTP ${resAll.status}`);
        const jsonAll = await resAll.json();
        const found = (jsonAll?.data?.posts || []).find((p: any) => String(p.id) === String(idParam));
        if (isMounted) setPost(found || null);
      } catch (err: any) {
        if (isMounted) setError(err.message || 'Erro ao carregar postagem');
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchPost();
    return () => {
      isMounted = false;
    };
  }, [idParam]);

  return (
    <View style={styles.container}>
      {/* Cabeçalho */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={styles.backArrow}>‹</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{post?.title || 'Postagem Detalhada'}</Text>
        <View style={{ width: 24 }} /> {/* Espaço para centralizar o título */}
      </View>

      {/* Título e meta */}
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{post?.title || initialTitle || 'Sem título'}</Text>
        {post?.author && <Text style={{ fontSize: 12, color: '#666' }}>Por {post.author}</Text>}
        {post?.created_at && <Text style={{ fontSize: 12, color: '#666' }}>{new Date(post.created_at).toLocaleString()}</Text>}
      </View>

      {/* Corpo do texto */}
      <ScrollView style={styles.contentContainer}>
        {loading && <ActivityIndicator size="small" color="#000" />}
        {error && <Text style={{ color: 'red' }}>{error}</Text>}
        {!loading && !error && (
          <Text style={styles.content}>{post?.content || initialContent || 'Sem conteúdo disponível.'}</Text>
        )}
      </ScrollView>

      {/* Botão Voltar */}
      <TouchableOpacity style={styles.button} onPress={() => router.back()}>
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
  header: {
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderColor: '#ddd',
  },
  backArrow: {
    fontSize: 28,
    color: '#000',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  titleContainer: {
    borderBottomWidth: 1,
    borderColor: '#eee',
    paddingVertical: 12,
    alignItems: 'center',
  },
  title: {
    fontSize: 16,
    fontWeight: '500',
  },
  contentContainer: {
    flex: 1,
    padding: 16,
  },
  content: {
    fontSize: 14,
    color: '#000',
    lineHeight: 22,
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
