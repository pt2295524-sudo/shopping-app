import { Drawer } from 'expo-router/drawer';
import { useRouter } from 'expo-router';
import { TouchableOpacity, Text } from 'react-native';

export default function AdminDashboardLayout() {
  const router = useRouter();

  return (
    <Drawer
      screenOptions={{
        headerStyle: { backgroundColor: '#dc2626' },
        headerTintColor: '#fff',
        drawerActiveTintColor: '#dc2626',
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
          title: 'Admin Dashboard',
          drawerLabel: 'Admin Dashboard',
        }}
      />

      <Drawer.Screen
        name="attendance"
        options={{
          title: 'Attendance',
          drawerLabel: 'Attendance',
        }}
      />
    </Drawer>
  );
}
