import React, { useState } from 'react';
import { Box, Typography, Button, Stack } from '@mui/material';
import CustomTextField from '../../../components/forms/theme-elements/CustomTextField';
import { useNavigate } from 'react-router-dom';
import { sendOtp, resetPasswordWithOTP } from '../../../services/AuthService';

const AuthResetPassword = ({ title, subtitle, subtext }) => {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const isFormValid = () => {
    setError('');
    if (!otp.trim() || !newPassword.trim() || !confirmPassword.trim()) {
      setError('Yêu cầu điền đầy đủ thông tin');
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email.trim() && !emailRegex.test(email)) {
      setError('Email không hợp lệ');
      return false;
    }

    if (newPassword.length < 6) {
      setError('Mật khẩu phải chứa ít nhất 6 ký tự');
      return false;
    }

    if (newPassword !== confirmPassword) {
      setError('Mật khẩu không khớp');
      return false;
    }
    return true;
  };

  const handleSendOtp = async () => {
    try {
      const response = await sendOtp(email);
      setMessage(response.message);
    } catch (error) {
      console.error('Error:', error);
      setMessage('Có lỗi xảy ra. Vui lòng thử lại sau.');
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (!isFormValid()) {
      return;
    }
    try {
      const response = await resetPasswordWithOTP(email, otp, newPassword);
      console.log(response);
      if (response.error) {
        setMessage(response.error);
      } else {
        setMessage('Đặt lại mật khẩu thành công');
        navigate('/auth/login');
      }
    } catch (error) {
      console.error('Error:', error);
      setMessage('Có lỗi xảy ra. Vui lòng thử lại sau.');
    }
  };

  return (
    <form onSubmit={handleResetPassword}>
      {title && (
        <Typography fontWeight="700" variant="h2" mb={1}>
          {title}
        </Typography>
      )}
      {subtext}
      <Box>
        <Stack mb={3}>
          <Typography
            variant="subtitle1"
            fontWeight={600}
            component="label"
            htmlFor="email"
            mb="5px"
          >
            Email
          </Typography>
          <CustomTextField
            id="email"
            variant="outlined"
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Button
            onClick={handleSendOtp}
            color="primary"
            variant="contained"
            size="large"
            fullWidth
          >
            Gửi OTP
          </Button>
        </Stack>
        <Stack mb={3}>
          <Typography variant="subtitle1" fontWeight={600} component="label" htmlFor="otp" mb="5px">
            OTP
          </Typography>
          <CustomTextField
            id="otp"
            variant="outlined"
            fullWidth
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            required
          />
        </Stack>
        <Stack mb={3}>
          <Typography
            variant="subtitle1"
            fontWeight={600}
            component="label"
            htmlFor="newPassword"
            mb="5px"
          >
            Mật khẩu mới
          </Typography>
          <CustomTextField
            id="newPassword"
            type="password"
            variant="outlined"
            fullWidth
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
        </Stack>
        <Stack mb={3}>
          <Typography
            variant="subtitle1"
            fontWeight={600}
            component="label"
            htmlFor="confirmPassword"
            mb="5px"
          >
            Xác nhận mật khẩu
          </Typography>
          <CustomTextField
            id="confirmPassword"
            type="password"
            variant="outlined"
            fullWidth
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </Stack>
        {error && (
          <Typography color="error" variant="body2" mb={2}>
            {error}
          </Typography>
        )}
        {message && (
          <Typography color="success" variant="body2" mb={2}>
            {message}
          </Typography>
        )}
        <Box>
          <Button color="primary" variant="contained" size="large" fullWidth type="submit">
            Đặt lại mật khẩu
          </Button>
        </Box>
      </Box>
      {subtitle}
    </form>
  );
};

export default AuthResetPassword;
