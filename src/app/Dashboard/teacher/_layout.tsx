import { Drawer } from 'expo-router/drawer';
import { useRouter } from 'expo-router';
import { TouchableOpacity, Text } from 'react-native';

export default function TeacherDashboardLayout() {
  const router = useRouter();

  return (
    <Drawer
      screenOptions={{
        headerStyle: { backgroundColor: '#9333ea' },
        headerTintColor: '#fff',
        drawerActiveTintColor: '#9333ea',
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
          title: 'Teacher Dashboard',
          drawerLabel: 'Teacher Dashboard',
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
