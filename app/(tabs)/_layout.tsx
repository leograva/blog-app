import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';

export default function Layout() {
  return (
    <Tabs
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: '#000000ff',
        tabBarInactiveTintColor: '#cec9c9ff',
        tabBarShowLabel: true,
        tabBarStyle: { 
          height: 60,
          paddingBottom: 5,
          backgroundColor: '#fff',
          borderTopWidth: 1,
          borderTopColor: '#eee'
        },
        tabBarIcon: ({ focused, color, size }) => {
          if (route.name === 'index') {
            return <Ionicons name="phone-portrait-outline" size={size} color={color} />;
          } else if (route.name === 'cart') {
            return <Ionicons name="cart-outline" size={size} color={color} />;
          } else if (route.name === 'notifications') {
            return <Ionicons name="notifications-outline" size={size} color={color} />;
          } else if (route.name === 'Login') {
            return <Ionicons name="person-circle-outline" size={size} color={color} />;
          }
          //return <Ionicons name="alert-circle-outline" size={size} color={color} />;
        }
      })}
    >
      
      <Tabs.Screen
        name="CriarPostagem"
        options={{
          title: 'Criação de Postagem',
          tabBarLabel: 'Criação de Postagem'
        }}
      />
      <Tabs.Screen
        name="index"
        options={{
          title: 'Postagens',
          tabBarLabel: 'Postagens'
        }}
      />
    </Tabs>
  );
}
