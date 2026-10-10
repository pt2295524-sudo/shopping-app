// ...existing code...
import { Drawer } from 'expo-router/drawer';
import { useRouter } from 'expo-router';
import { TouchableOpacity, Text } from 'react-native';

export default function StudentDashboardLayout() {
  const router = useRouter();

  return (
    <Drawer
      screenOptions={{
        headerStyle: { backgroundColor: '#2563eb' },
        headerTintColor: '#fff',
        drawerActiveTintColor: '#2563eb',
        drawerInactiveTintColor: '#334155',
        headerRight: () => (
          <TouchableOpacity
            onPress={() => router.replace('/')}
            style={{ marginRight: 16 }}
          >
            <Text style={{ color: '#fff', fontWeight: '600', fontSize: 14 }}>Logout</Text>
          </TouchableOpacity>
        ),
      }}
    >
      <Drawer.Screen
        name="index"
        options={{
          title: 'Student Dashboard',
          drawerLabel: 'Student Dashboard',
        }}
      />
    </Drawer>
  );
}