import React, { useState } from 'react';
import { View, Text, TextInput, Button, Image } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_URL } from '../../constants/API';
import { router } from 'expo-router';

export default function ResetPassword() {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [otpNotification, setOtpNotification] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const navigation = useNavigation();
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  useFocusEffect(
    React.useCallback(() => {
      setEmail('');
      setOtp('');
      setOtpNotification('');
      setPassword('');
      setConfirmPassword('');
    }, [])
  );

  const handleGetOtp = async () => {
    try {
      setError('');
      setOtpNotification('');
      if (!email.trim()) {
        setError('Tên đăng nhập hoặc email không được để trống');
        return;
      }

      if (!emailRegex.test(email)) {
        setError('Email không hợp lệ');
        return;
      }
      if (email.trim().length < 6) {
        setError('Mật khẩu không được ít hơn 6 ký tự');
        return;
      }

      if (password !== confirmPassword) {
        setError('Mật khẩu không trùng khớp');
        return;
      }

      const response = await fetch(`${API_URL}/accounts/send-otp`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
        }),
      });

      const data = await response.json();
      if (!data.success) {
        setError('Email không tồn tại. Vui lòng thử lại.');
        return;
      }
      setOtpNotification('Mã OTP đã được gửi đến email của bạn');
    } catch (error) {
      console.error('Error:', error);
      alert('Có lỗi xảy ra. Vui lòng thử lại sau.');
    }
  };

  const handleResetPassword = async () => {
    try {
      setError('');
      if (!email.trim()) {
        setError('Tên đăng nhập hoặc email không được để trống');
        return;
      }
      if (!emailRegex.test(email)) {
        setError('Mật khẩu không được ít hơn 6 ký tự');
        return;
      }
      if (password.trim().length < 6) {
        setError('Mật khẩu không được ít hơn 6 ký tự');
        return;
      }

      if (password !== confirmPassword) {
        setError('Mật khẩu không trùng khớp');
        return;
      }

      const response = await fetch(`${API_URL}/accounts/reset-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          otp: otp,
          new_password: password,
        }),
      });
      // console.log(response);
      const data = await response.json();

      if (!response.ok) {
        alert('Tên đăng nhập/email hoặc mật khẩu không đúng. Vui lòng thử lại.');
        return;
      }

      alert('Đặt lại mật khẩu thành công. Vui lòng đăng nhập lại.');
      // console.log(data.token);
      navigation.navigate('(login)');
    } catch (error) {
      console.error('Error:', error);
      alert('Có lỗi xảy ra. Vui lòng thử lại sau.');
    }
  };

  return (
    <View style={styles.container}>
      <Image source={require('../../assets/images/app_logo.png')} style={styles.logo} />
      <Text style={styles.title}>Đặt lại mật khẩu</Text>
      {error ? <Text style={{ color: 'red' }}>{error}</Text> : null}

      <View>
        <Text style={styles.label}>Email</Text>
        <TextInput style={styles.input} onChangeText={setEmail} value={email} placeholder="Email" />

        <Text style={styles.label}>MÃ OTP</Text>
        <View style={styles.otpContainer}>
          <TextInput style={styles.input} onChangeText={setOtp} value={otp} placeholder="OTP" />
          <Button title="Lấy mã" onPress={handleGetOtp} />
        </View>
        {otpNotification && <Text style={styles.otpText}>{otpNotification}</Text>}
        <Text style={styles.label}>Mật khẩu</Text>
        <TextInput
          style={styles.input}
          onChangeText={setPassword}
          value={password}
          placeholder="Mật khẩu"
          secureTextEntry
        />
        <Text style={styles.label}>Nhập lại mật khẩu</Text>
        <TextInput
          style={styles.input}
          onChangeText={setConfirmPassword}
          value={confirmPassword}
          placeholder="Nhập lại mật khẩu"
          secureTextEntry
        />
      </View>
      <Button title="Đặt lại mật khẩu" onPress={handleResetPassword} />
      <View style={styles.loginBox}>
        <Text> Đã có tài khoản?</Text>
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
  otpContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  loginText: {
    color: 'blue',
    textDecorationLine: 'underline',
    marginLeft: 2,
  },
  loginBox: {
    flexDirection: 'row',
    marginTop: 10,
  },
  otpText: {
    color: 'green',
  },
});
