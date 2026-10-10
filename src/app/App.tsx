import { useEffect } from 'react';
import { View, Text } from 'react-native';

export default function App() {
  useEffect(() => {
    getUserData();
  }, []);

  async function getUserData() {
    const url = 'http://13.50.238.160:8000/docs#/';
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);
  }

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>My App</Text>
    </View>
  );
}
