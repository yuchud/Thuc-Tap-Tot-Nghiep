import React, { useState } from 'react';
import { Box, Button, Grid, TextField, Typography } from '@mui/material';
import CustomTextField from 'src/components/forms/theme-elements/CustomTextField';
import InputFileUpload from 'src/components/forms/theme-elements/InputFileUpload';
import { useNavigate } from 'react-router-dom';
import { MenuItem } from '@mui/material';
import { ListItemIcon } from '@mui/material';
import { ListItemText } from '@mui/material';
import { IconListCheck, IconMail } from '@tabler/icons';
import { IconUser } from '@tabler/icons';
import { fetchGetAccount, fetchUpdateAccount } from 'src/services/AccountService';
import { set } from 'lodash';

import CustomSnackbar from 'src/components/snackbar/CustomSnackbar';
const Profile = () => {
  const [avatar, setAvatar] = useState(null);
  const [previewAvatar, setPreviewAvatar] = useState(null);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [birthday, setBirthday] = useState('');
  const [profile, setProfile] = useState(null);

  const [usernameError, setUsernameError] = useState('');

  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  const handleGetProfile = async () => {
    const fetchedProfile = await fetchGetAccount();
    console.log('fadff', profile);
    setProfile(fetchedProfile);
  };

  const handleAvatarChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setAvatar(e.target.files[0]);
      setPreviewAvatar(URL.createObjectURL(e.target.files[0]));
    }
  };

  const IsFormValid = () => {
    let IsFormValid = true;

    if (username === '') {
      setUsernameError('Tên đăng nhập không được để trống');
      IsFormValid = false;
    }
    return IsFormValid;
  };

  const handleChangeProfile = async (e) => {
    e.preventDefault();

    if (!IsFormValid()) {
      return;
    }
    // console.log(avatar, username, email, firstName, lastName, birthday);

    const formData = new FormData();
    formData.append('file', avatar);
    formData.append('username', username);
    formData.append('email', email);
    formData.append('first_name', firstName);
    formData.append('last_name', lastName);
    formData.append('birthday', birthday);
    try {
      const response = await fetchUpdateAccount(formData);
      if (response.hasOwnProperty('error')) {
        setSnackbarSeverity('error');
        setSnackbarMessage(response.error);
        setIsSnackbarOpen(true);
        return;
      }
      setSnackbarSeverity('success');
      setSnackbarMessage('Đã cập nhật thông tin cá nhân');
      setIsSnackbarOpen(true);
      setProfile(response.account);
    } catch (error) {
      setSnackbarSeverity('error');
      setSnackbarMessage('Đã xảy ra lỗi, vui lòng thử lại sau');
      setIsSnackbarOpen(true);
      console.error('Error:', error);
    }
  };

  React.useEffect(() => {
    handleGetProfile();
  }, []);

  React.useEffect(() => {
    if (profile) {
      setPreviewAvatar(profile.avatar_url);
      setUsername(profile.username);
      setEmail(profile.email);
      setFirstName(profile.first_name);
      setLastName(profile.last_name);
      setBirthday(profile.birthday);
      setUsernameError('');
    }
  }, [profile]);
  return (
    <Box>
      <CustomSnackbar
        open={isSnackbarOpen}
        message={snackbarMessage}
        severity={snackbarSeverity}
        onClose={(e) => setIsSnackbarOpen(false)}
      />
      <Typography variant="h1" gutterBottom>
        Thông tin cá nhân
      </Typography>
      <Box component="form" onSubmit={handleChangeProfile} noValidate sx={{ mt: 1 }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <img
              src={previewAvatar}
              alt="Avatar Preview"
              style={{ width: '100px', height: '100px', borderRadius: '50%', marginRight: '10px' }}
            />

            <InputFileUpload title="Chọn Avatar" label="Avatar" onChange={handleAvatarChange} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <CustomTextField
              required
              fullWidth
              label="Tên đăng nhập"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              error={usernameError !== ''}
              helperText={usernameError}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <CustomTextField
              fullWidth
              label="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <CustomTextField
              fullWidth
              label="Họ và tên đệm"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <CustomTextField
              fullWidth
              label="Tên"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <CustomTextField
              fullWidth
              label="Ngày sinh"
              type="date"
              InputLabelProps={{
                shrink: true,
              }}
              value={birthday}
              onChange={(e) => setBirthday(e.target.value)}
            />
          </Grid>
        </Grid>
        <Button type="submit" variant="contained" sx={{ mt: 3, mb: 2 }}>
          Xác nhận
        </Button>
      </Box>
    </Box>
  );
};

export default Profile;
