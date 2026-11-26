import { Stack } from 'expo-router';

const RootLayout = () => {
  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: '#ffffff' },
        headerTintColor: '#172033',
        headerTitleStyle: { fontWeight: '800', fontSize: 16 },
        headerShadowVisible: false,
        contentStyle: { backgroundColor: '#f7f8fa' },
      }}
    >
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="login" options={{ title: 'Sign in', headerBackTitle: 'Back' }} />
      <Stack.Screen name="otp" options={{ title: 'Verify account', headerBackTitle: 'Back' }} />
      <Stack.Screen name="Dashboard" options={{ headerShown: false }} />
    </Stack>
  );
};

export default RootLayout;
