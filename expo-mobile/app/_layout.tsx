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

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  // const navigation = useNavigation();
  const colorScheme = useColorScheme();
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

  // useEffect(() => {
  //   socket.on('connect', () => {
  //     console.log('connected');
  //     const userToken = localStorage.getItem('userToken');
  //     const decodedToken = jwtDecode(userToken);
  //     const { id } = decodedToken;
  //     if (userToken) {
  //       socket.emit('join', { id });
  //     }

  //     socket.on('disconnect', () => {
  //       console.log('disconnected');
  //     });

  //     socket.on('new_notification', (notification) => {
  //       setNotifications((notifications) => [notification, ...notifications]);
  //     });

  //     return () => {
  //       socket.off('connect');
  //       socket.off('disconnect');
  //       socket.off('new_notification');
  //     };
  //   });
  // }, []);

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="(login)" options={{ headerShown: false }} />
        <Stack.Screen name="(register)" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
    </ThemeProvider>
  );
}
