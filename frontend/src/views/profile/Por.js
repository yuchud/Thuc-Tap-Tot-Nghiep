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

const Profile = () => {
  const [avatar, setAvatar] = useState(null);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [birthday, setBirthday] = useState('');

  const handleAvatarChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setAvatar(URL.createObjectURL(e.target.files[0]));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log({ avatar, username, email, firstName, lastName, birthday });
  };
  const navigation = useNavigate();
  return (
    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
      <MenuItem>
        <ListItemIcon>
          <IconListCheck width={20} />
        </ListItemIcon>
        <ListItemText>My Tasks</ListItemText>
      </MenuItem>
      <MenuItem onClick={() => navigation('/change-password')}>
        <ListItemIcon>
          <IconMail width={20} /> {/* You might want to use a different icon here */}
        </ListItemIcon>
        <ListItemText>Change Password</ListItemText>
      </MenuItem>
      <Box mt={1} py={1} px={2}></Box>
      <Typography variant="h1" gutterBottom>
        Profile
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <img
            src={'https://www.w3schools.com/howto/img_avatar.png'}
            alt="Avatar Preview"
            style={{ width: '100px', height: '100px', borderRadius: '50%', marginRight: '10px' }}
          />

          <InputFileUpload label="Avatar" onChange={handleAvatarChange} />
        </Grid>
        <Grid item xs={12} sm={6}>
          <CustomTextField
            required
            fullWidth
            label="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <CustomTextField
            required
            fullWidth
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <CustomTextField
            required
            fullWidth
            label="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <CustomTextField
            required
            fullWidth
            label="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <CustomTextField
            required
            fullWidth
            label="Birthday"
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
        Submit
      </Button>
    </Box>
  );
};

export default Profile;
