import { Stack } from 'expo-router';

const RootLayout = () => {
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: 'blue',
        },
        headerTintColor: 'white',
        headerTitleStyle: {
          fontWeight: 500,
          fontFamily: 'Arial',
        },
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="login"
        options={{
          title: 'Login',
        }}
      />

      <Stack.Screen
        name="role"
        options={{
          title: 'Select Role',
        }}
      />

      <Stack.Screen
        name="otp"
        options={{
          title: 'Verify OTP',
        }}
      />

      <Stack.Screen
        name="Dashboard"
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
};

export default RootLayout;
