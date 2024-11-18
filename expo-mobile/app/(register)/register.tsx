import React, { useState } from 'react';
import { View, Text, TextInput, Button, Image } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { StyleSheet } from 'react-native';
import { API_URL } from '../../constants/API';

export default function RegisterScreen() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const navigation = useNavigation();
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-z]{2,4}$/;

  useFocusEffect(
    React.useCallback(() => {
      setUsername('');
      setEmail('');
      setPassword('');
      setConfirmPassword('');
      setError('');
    }, [])
  );

  const handleRegister = async () => {
    setError('');
    if (!username.trim()) {
      setError('Tên đăng nhập không được để trống');
      return;
    }
    if (email && !emailRegex.test(email)) {
      setError('Email không hợp lệ');
      return;
    }
    if (password.trim().length < 6) {
      setError('Mật khẩu không được ít hơn 6 ký tự');
      return;
    }
    if (!confirmPassword.trim()) {
      setError('Nhập lại mật khẩu không được để trống');
      return;
    }
    if (password !== confirmPassword) {
      setError('Mật khẩu không khớp');
      return;
    }

    try {
      const response = await fetch(`${API_URL}/accounts/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          email,
          password,
        }),
      });
      console.log(response);
      if (!response.ok) {
        const data = await response.json();
        setError(data.message);
        return;
      }
      alert('Đăng ký thành công. Vui lòng đăng nhập.');
      navigation.navigate('(login)');
    } catch (error) {
      console.error('Error:', error);
      alert('Có lỗi xảy ra. Vui lòng thử lại sau.');
    }
  };

  return (
    <View style={styles.container}>
      <Image source={require('../../assets/images/app_logo.png')} style={styles.logo} />
      <Text style={styles.title}>Đăng ký</Text>
      <View>
        <Text style={styles.label}>Tên đăng nhập*</Text>
        <TextInput style={styles.input} onChangeText={setUsername} value={username} placeholder="Tên đăng nhập" />
        <Text style={styles.label}>Email</Text>
        <TextInput style={styles.input} onChangeText={setEmail} value={email} placeholder="Email" />
        <Text style={styles.label}>Mật khẩu*</Text>
        <TextInput
          style={styles.input}
          onChangeText={setPassword}
          value={password}
          placeholder="Password"
          secureTextEntry
        />
        <Text style={styles.label}>Nhập lại mật khẩu*</Text>
        <TextInput
          style={styles.input}
          onChangeText={setConfirmPassword}
          value={confirmPassword}
          placeholder="Nhập lại mật khẩu"
          secureTextEntry
        />
      </View>
      {error ? <Text style={{ color: 'red' }}>{error}</Text> : null}

      <Button title="Đăng ký" onPress={handleRegister} />
      <View style={styles.loginBox}>
        <Text style={styles.label}>Bạn đã có tài khoản?</Text>
        <Text style={styles.loginText} onPress={() => navigation.navigate('(login)')}>
          Đăng nhập ngay
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
    height: 100,
  },
  input: {
    width: 200,
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    backgroundColor: '#fff',
  },
  loginBox: {
    flexDirection: 'row',
    marginTop: 20,
  },
  loginText: {
    color: 'blue',
    marginLeft: 5,
    textDecorationLine: 'underline',
  },
});
