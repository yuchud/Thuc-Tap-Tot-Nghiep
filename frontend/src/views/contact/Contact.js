import { Box, Link, Typography } from '@mui/material';
const Contact = () => {
  return (
    <Box>
      <Typography variant="h1" gutterBottom>
        Liên hệ
      </Typography>
      <Box
        component="footer"
        sx={{
          py: 3,
          px: 2,
          mt: 'auto',
        }}
      >
        {/* <Typography variant="h2">Nguyễn Đức Huy</Typography> */}
        <Typography variant="h6">Telephone: 098-174-9633</Typography>
        <Typography variant="h6">Email: dhuynguyen2002@gmail.com</Typography>
        <Link href="https://www.facebook.com/HuyOoO228/" target="_blank" rel="noopener">
          Facebook
        </Link>
      </Box>
    </Box>
  );
};

export default Contact;
