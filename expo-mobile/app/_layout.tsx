import { DarkTheme, DefaultTheme, NavigationContainer, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useState } from 'react';
import 'react-native-reanimated';
// import { StripeProvider } from '@stripe/stripe-react-native';
import { useColorScheme } from '@/hooks/useColorScheme';
import { io } from 'socket.io-client';
// import HomeScreen from './(tabs)/index';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { jwtDecode } from 'jwt-decode';
// const socket = io('http://localhost:3000');
import { StripeProvider } from '@stripe/stripe-react-native';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const publishableKey =
    'pk_test_51QJ91mGM0vTUWuMmjrkAH7FXcX2CdIB7qyfZN9zPJsMqzGWbKIgU6GLoxMjSa9dheQNs27J2CNsgJhkwE9besXMg00cSQ34N1N';
  const [notifications, setNotifications] = useState<any[]>([]);
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });
  const a = 1;
  const [userToken, setUserToken] = useState<string | null>(null);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <StripeProvider publishableKey={publishableKey}>
        <Stack>
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen name="(login)" options={{ headerShown: false }} />
          <Stack.Screen name="(register)" options={{ headerShown: false }} />
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="(reset_password)" options={{ headerShown: false }} />
        </Stack>
      </StripeProvider>
    </ThemeProvider>
  );
}
