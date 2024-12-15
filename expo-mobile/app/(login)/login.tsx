import React, { useState } from 'react';
import { View, Text, TextInput, Button, Image } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_URL } from '../../constants/API';
import { router } from 'expo-router';

export default function LoginScreen() {
  const [usernameOrEmail, setUsernameOrEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigation = useNavigation();

  useFocusEffect(
    React.useCallback(() => {
      setUsernameOrEmail('');
      setPassword('');
      setError('');
    }, [])
  );
  AsyncStorage.removeItem('userToken');

  const handleLogin = async () => {
    try {
      setError('');
      if (!usernameOrEmail.trim()) {
        setError('Tên đăng nhập hoặc email không được để trống');
        return;
      }
      if (password.trim().length < 6) {
        setError('Mật khẩu không được ít hơn 6 ký tự');
        return;
      }

      const response = await fetch(`${API_URL}/accounts/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          usernameOrEmail: usernameOrEmail,
          password,
        }),
      });
      // console.log(response);
      const data = await response.json();

      if (!response.ok) {
        alert('Tên đăng nhập/email hoặc mật khẩu không đúng. Vui lòng thử lại.');
        return;
      }

      // console.log(data.token);
      await AsyncStorage.setItem('userToken', data.token);
      navigation.navigate('(tabs)');
    } catch (error) {
      console.error('Error:', error);
      alert('Có lỗi xảy ra. Vui lòng thử lại sau.');
    }
  };

  return (
    <View style={styles.container}>
      <Image source={require('../../assets/images/app_logo.png')} style={styles.logo} />
      <Text style={styles.title}>Đăng nhập</Text>

      <View>
        <Text style={styles.label}>Tên đăng nhập / Email</Text>
        <TextInput
          style={styles.input}
          onChangeText={setUsernameOrEmail}
          value={usernameOrEmail}
          placeholder="Tên đăng nhập / Email"
        />
        <Text style={styles.label}>Mật khẩu</Text>
        <TextInput
          style={styles.input}
          onChangeText={setPassword}
          value={password}
          placeholder="Mật khẩu"
          secureTextEntry
        />
      </View>
      {error ? <Text style={{ color: 'red' }}>{error}</Text> : null}
      <View style={styles.row}>
        <Button title="Đăng nhập" onPress={handleLogin} />
        <Text style={styles.forgotPasswordText} onPress={() => navigation.navigate('(reset_password)')}>
          Quên mật khẩu?
        </Text>
      </View>
      <View style={styles.registerBox}>
        <Text>Bạn chưa có tài khoản?</Text>
        <Text style={styles.registerText} onPress={() => navigation.navigate('(register)')}>
          Đăng ký ngay
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#eff',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  label: {
    alignSelf: 'flex-start',
    paddingLeft: 10,
    fontSize: 16,
  },
  logo: {
    width: 100,
    height: 100, // Adjust the logo size as needed
  },
  input: {
    width: 200,
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    backgroundColor: '#fff',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 200,
    marginTop: 5,
  },
  forgotPasswordText: {
    marginTop: 10,
    marginLeft: 20,
    color: 'blue',
    textDecorationLine: 'underline',
  },
  registerText: {
    color: 'blue',
    textDecorationLine: 'underline',
    marginLeft: 2,
  },
  registerBox: {
    flexDirection: 'row',
    marginTop: 10,
  },
});
