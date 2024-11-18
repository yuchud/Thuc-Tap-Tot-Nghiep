import React, { useEffect } from 'react';
import { View, Image, StyleSheet, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { StripeProvider } from '@stripe/stripe-react-native';

export default function IndexScreen() {
  const navigation = useNavigation();

  useEffect(() => {
    const checkLoginStatus = async () => {
      //   const userToken = await AsyncStorage.getItem('userToken');
      const userToken = 1;
      if (userToken) {
        navigation.navigate('(login)');
      } else {
        navigation.navigate('(tabs)');
      }
    };

    // Simulate a loading time for the splash screen
    setTimeout(checkLoginStatus, 1000); // Adjust the timeout duration as needed
  }, [navigation]);

  return (
      <View style={styles.container}>
        <Image source={require('../assets/images/app_logo.png')} style={styles.logo} />
        <Text style={styles.title}>App học Tiếng Anh</Text>
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff', // Adjust the background color as needed
  },
  logo: {
    width: 200,
    height: 200, // Adjust the logo size as needed
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});
