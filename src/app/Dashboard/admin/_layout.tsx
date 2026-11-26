import { useRouter } from 'expo-router';
import { Drawer } from 'expo-router/drawer';
import { Text, TouchableOpacity } from 'react-native';

export default function AdminDashboardLayout() {
  const router = useRouter();

  return (
    <Drawer
      screenOptions={{
        headerStyle: { backgroundColor: '#172033' },
        headerTintColor: '#fff',
        headerTitleStyle: { fontWeight: '800' },
        headerShadowVisible: false,
        drawerStyle: { backgroundColor: '#fff' },
        drawerActiveBackgroundColor: '#eef1f5',
        drawerActiveTintColor: '#172033',
        drawerInactiveTintColor: '#718096',
        drawerLabelStyle: { fontWeight: '700' },
        headerRight: () => (
          <TouchableOpacity
            onPress={() => router.replace('/')}
            style={{
              marginRight: 16,
              borderWidth: 1,
              borderColor: '#4a5366',
              borderRadius: 8,
              paddingHorizontal: 10,
              paddingVertical: 7,
            }}
          >
            <Text style={{ color: '#fff', fontWeight: '700', fontSize: 12 }}>Logout</Text>
          </TouchableOpacity>
        ),
      }}
    >
      <Drawer.Screen
        name="index"
        options={{ title: 'Admin Dashboard', drawerLabel: 'Overview' }}
      />
      <Drawer.Screen
        name="attendance"
        options={{ title: 'Attendance', drawerLabel: 'Attendance' }}
      />
      <Drawer.Screen
        name="edit-student"
        options={{ title: 'Edit Student', drawerItemStyle: { display: 'none' } }}
      />
    </Drawer>
  );
}
