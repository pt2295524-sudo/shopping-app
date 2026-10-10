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
        name="signup"
        options={{
          title: 'Sign Up',
        }}
      />

      <Stack.Screen
        name="Dashboard"
        options={{
          headerShown: false,
        }}
      />
       <Stack.Screen
        name="role"
        options={{
        title: 'Role',
      }}
      />
       <Stack.Screen
        name="otp"
        options={{
        title: 'OTP',
      }}
      />
    </Stack>
    
  );
};

export default RootLayout;
