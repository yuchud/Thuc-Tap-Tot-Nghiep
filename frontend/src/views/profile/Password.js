import React, { useState } from 'react';
import { Box, Typography, Button, Grid } from '@mui/material';
import CustomTextField from '../../components/forms/theme-elements/CustomTextField';
import CustomSnackbar from 'src/components/snackbar/CustomSnackbar';
import { set } from 'lodash';
import { fetchUpdatePassword } from 'src/services/AccountService';
const Password = () => {
  // State variables
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [newPasswordError, setNewPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');

  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  // Handle form submission
  const isFormValid = (e) => {
    let isFormValid = true;
    // Reset all errors
    setNewPasswordError('');
    setConfirmPasswordError('');

    // Check if new password and confirm password are not empty

    if (newPassword.length < 6) {
      setNewPasswordError('Mật khẩu phải chứa ít nhất 6 ký tự');
      isFormValid = false;
    }
    if (confirmPassword === '') {
      setConfirmPasswordError('Không được để trống mật khẩu xác nhận');
      isFormValid = false;
    }

    return isFormValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isFormValid()) {
      return;
    }
    // Check if new password and confirm password match
    if (newPassword !== confirmPassword) {
      setSnackbarSeverity('error');
      setSnackbarMessage('Mật khẩu mới và mật khẩu xác nhận không khớp');
      setIsSnackbarOpen(true);
      return;
    }
    const formData = new FormData();
    formData.append('password', newPassword);
    try {
      const response = await fetchUpdatePassword(formData);
      if (response.hasOwnProperty('error')) {
        setSnackbarSeverity('error');
        setSnackbarMessage(response.error);
        setIsSnackbarOpen(true);
      }
      setSnackbarSeverity('success');
      setSnackbarMessage('Đã cập nhật mật khẩu');
      setIsSnackbarOpen(true);
      setNewPassword('');
      setConfirmPassword('');
    } catch (error) {
      setSnackbarSeverity('error');
      setSnackbarMessage('Đã xảy ra lỗi, vui lòng thử lại sau');
      setIsSnackbarOpen(true);
    }
  };

  return (
    <Box>
      <CustomSnackbar
        open={isSnackbarOpen}
        message={snackbarMessage}
        severity={snackbarSeverity}
        onClose={(e) => setIsSnackbarOpen(false)}
      />
      <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
        <Typography variant="h1" gutterBottom>
          Đổi mật khẩu
        </Typography>
        <Grid container spacing={2}>
          {/* Existing form fields */}
          {/* New Password Field */}
          <Grid item xs={12}>
            <CustomTextField
              label="Mật khẩu mới"
              type="password"
              required
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              error={newPasswordError !== ''}
              helperText={newPasswordError}
            />
          </Grid>
          {/* Confirm New Password Field */}
          <Grid item xs={12}>
            <CustomTextField
              label="Xác nhận mật khẩu"
              type="password"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              error={confirmPasswordError !== ''}
              helperText={confirmPasswordError}
            />
          </Grid>
          {/* Submit Button */}
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary">
              Đổi mật khẩu
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default Password;
