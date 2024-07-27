// import * as React from 'react';
// import Box from '@mui/material/Box';
// import Button from '@mui/material/Button';
// import Card from '@mui/material/Card';
// import Chip from '@mui/material/Chip';
// import CardActions from '@mui/material/CardActions';
// import CardContent from '@mui/material/CardContent';
// import Container from '@mui/material/Container';
// import Divider from '@mui/material/Divider';
// import Grid from '@mui/material/Grid';
// import Typography from '@mui/material/Typography';
// import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
// import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';

// const tiers = [
//   {
//     title: 'Gói 1 tháng',
//     price: '199.000',
//     description: ['10 users included', '2 GB of storage', 'Help center access', 'Email support'],
//   },
//   {
//     title: 'Gói 1 năm',
//     subheader: 'Giá tốt nhất',
//     price: '129.000',
//     description: ['20 users included', '10 GB of storage', 'Help center access'],
//   },
//   {
//     title: 'Gói 3 tháng',
//     price: '159.000',
//     is_recommend: true,
//     description: [
//       '20 users included',
//       '10 GB of storage',
//       'Help center access',
//       'Priority email support',
//       'Dedicated team',
//       'Best deals',
//     ],
//   },
// ];

// const ProPlans = () => {
//   return (
//     <Container
//       id="pricing"
//       sx={{
//         pt: { xs: 4, sm: 12 },
//         pb: { xs: 8, sm: 16 },
//         position: 'relative',
//         display: 'flex',
//         flexDirection: 'column',
//         alignItems: 'center',
//         gap: { xs: 3, sm: 6 },
//       }}
//     >
//       <Grid container spacing={3} alignItems="center" justifyContent="center">
//         {tiers.map((tier) => (
//           <Grid item key={tier.title} xs={12} sm={tier.is_recommend ? 12 : 6} md={4}>
//             <Card
//               sx={{
//                 p: 2,
//                 display: 'flex',
//                 flexDirection: 'column',
//                 gap: 4,
//                 border: tier.is_recommend ? '1px solid' : undefined,
//                 borderColor: tier.is_recommend ? 'primary.main' : undefined,
//                 background: tier.is_recommend ? 'linear-gradient(#033363, #021F3B)' : undefined,
//               }}
//             >
//               <CardContent>
//                 <Box
//                   sx={{
//                     mb: 1,
//                     display: 'flex',
//                     justifyContent: 'space-between',
//                     alignItems: 'center',
//                     color: tier.is_recommend ? 'grey.100' : '',
//                   }}
//                 >
//                   <Typography component="h3" variant="h6">
//                     {tier.title}
//                   </Typography>
//                   {tier.is_recommend && (
//                     <Chip
//                       icon={<AutoAwesomeIcon />}
//                       label="Giá tốt nhất"
//                       size="small"
//                       sx={{
//                         background: (theme) => (theme.palette.mode === 'light' ? '' : 'none'),
//                         backgroundColor: 'primary.contrastText',
//                         '& .MuiChip-label': {
//                           color: 'primary.dark',
//                         },
//                         '& .MuiChip-icon': {
//                           color: 'primary.dark',
//                         },
//                       }}
//                     />
//                   )}
//                 </Box>
//                 <Box
//                   sx={{
//                     display: 'flex',
//                     alignItems: 'baseline',
//                     color: tier.is_recommend ? 'grey.50' : undefined,
//                   }}
//                 >
//                   <Typography component="h3" variant="h2">
//                     {tier.price}đ
//                   </Typography>
//                   <Typography component="h3" variant="h6">
//                     &nbsp; mỗi tháng
//                   </Typography>
//                 </Box>
//                 <Divider
//                   sx={{
//                     my: 2,
//                     opacity: 0.2,
//                     borderColor: 'grey.500',
//                   }}
//                 />
//                 {tier.description.map((line) => (
//                   <Box
//                     key={line}
//                     sx={{
//                       py: 1,
//                       display: 'flex',
//                       gap: 1.5,
//                       alignItems: 'center',
//                     }}
//                   >
//                     <CheckCircleRoundedIcon
//                       sx={{
//                         width: 20,
//                         color: tier.is_recommend ? 'primary.light' : 'primary.main',
//                       }}
//                     />
//                     <Typography
//                       component="text"
//                       variant="subtitle2"
//                       sx={{
//                         color: tier.is_recommend ? 'grey.200' : undefined,
//                       }}
//                     >
//                       {line}
//                     </Typography>
//                   </Box>
//                 ))}
//               </CardContent>
//               <CardActions>
//                 <Button
//                   fullWidth
//                   variant={tier.is_recommend ? 'contained' : 'outlined'}
//                   component="a"
//                   href="/material-ui/getting-started/templates/checkout/"
//                   target="_blank"
//                 >
//                   Mua ngay
//                 </Button>
//               </CardActions>
//             </Card>
//           </Grid>
//         ))}
//       </Grid>
//     </Container>
//   );
// };

// export default ProPlans;
