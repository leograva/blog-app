
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
import { ActivityIndicator, Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Index() {
  const router = useRouter();
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [query, setQuery] = useState<string>('');
  const isMountedRef = useRef(true);

  useEffect(() => {
    isMountedRef.current = true;
    const fetchPosts = async (q?: string) => {
      setLoading(true);
      setError(null);
      try {
        const host = Platform.OS === 'android' ? '10.0.2.2' : 'localhost';
        const url = q ? `http://${host}:3000/posts/search?q=${encodeURIComponent(q)}` : `http://${host}:3000/posts`;
        const res = await fetch(url);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const json = await res.json();
        if (isMountedRef.current) setPosts(json?.data?.posts || json?.posts || []);
      } catch (err: any) {
        if (isMountedRef.current) setError(err.message || 'Erro ao buscar posts');
      } finally {
        if (isMountedRef.current) setLoading(false);
      }
    };

    // initial load
    fetchPosts();

    return () => {
      isMountedRef.current = false;
    };
  }, []);

  const handleSearch = async (q?: string) => {
    // if q is undefined use current query state
    const searchQ = typeof q === 'string' ? q : query;
    // if empty, reload all posts
    try {
      setLoading(true);
      setError(null);
      const host = Platform.OS === 'android' ? '10.0.2.2' : 'localhost';
      const url = searchQ ? `http://${host}:3000/posts/search?q=${encodeURIComponent(searchQ)}` : `http://${host}:3000/posts`;
      const res = await fetch(url);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const json = await res.json();
      if (isMountedRef.current) setPosts(json?.data?.posts || json?.posts || []);
    } catch (err: any) {
      if (isMountedRef.current) setError(err.message || 'Erro ao buscar posts');
    } finally {
      if (isMountedRef.current) setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.searchContainer}>
        <Ionicons name="search-outline" size={20} color="#888" style={styles.searchIcon} />
        <TextInput
          placeholder="Buscar postagens"
          placeholderTextColor="#aaa"
          style={styles.searchInput}
          value={query}
          onChangeText={(t) => setQuery(t)}
          onEndEditing={() => handleSearch()}
          onSubmitEditing={() => handleSearch()}
          returnKeyType="search"
        />
      </View>
      <Text style={styles.sectionTitle}>Postagens</Text>
      <ScrollView contentContainerStyle={styles.postsContainer}>
        {loading && (
          <View style={{ padding: 20 }}>
            <ActivityIndicator size="small" color="#000" />
          </View>
        )}

        {error && (
          <View style={{ padding: 20 }}>
            <Text style={{ color: 'red' }}>{error}</Text>
          </View>
        )}

        {!loading && !error && posts.map((post) => (
          <TouchableOpacity
            key={post.id}
            style={styles.postCard}
            onPress={() => router.push({ pathname: '/(postagem)/[id]', params: { id: post.id, title: post.title, content: post.content } })}
          >
            <Text style={styles.postTitle}>{post.title}</Text>
            <Text style={styles.postContent}>{post.content}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#f0f0f0',
    margin: 10,
    borderRadius: 8,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    margin: 10,
  },
  postsContainer: {
    padding: 10,
  },
  postCard: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 15,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  postTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  postContent: {
    fontSize: 14,
    color: '#666',
  },
});