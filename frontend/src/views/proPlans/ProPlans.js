import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import Chip from '@mui/material/Chip';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import { fetchGetAllProPlans, fetchPurchaseProPlan } from 'src/services/ProPlanService';
import { formatPrice } from 'src/utilities/Money';
import { useNavigate } from 'react-router-dom';

const ProPlans = () => {
  const [proPlans, setProPlans] = React.useState([]);
  const isLoggedIn = localStorage.getItem('token') !== null;
  const handleGetAllProPlans = async () => {
    try {
      const fetchedProPlans = await fetchGetAllProPlans();

      if (fetchedProPlans.hasOwnProperty('error')) {
        return;
      }
      fetchedProPlans.forEach((proPlan) => {
        proPlan.description = proPlan.description.split('.').map((line) => line.trim());
        if (proPlan.description[proPlan.description.length - 1] === '') {
          proPlan.description.pop();
        }
      });

      setProPlans(fetchedProPlans);
    } catch (error) {
      console.error('handleGetAllProPlans', error);
    }
  };
  const navigate = useNavigate();
  const handleClickPurchase = (proPlanId) => async () => {
    if (!isLoggedIn) {
      navigate('/auth/login');
      return;
    }
    try {
      const response = await fetchPurchaseProPlan(proPlanId);
      if (response.hasOwnProperty('error')) {
        console.log(response.error);
        return;
      }
      alert('Mua thành công');
    } catch (error) {
      console.error('handleClickPurchase', error);
    }
  };

  React.useEffect(() => {
    handleGetAllProPlans();
  }, []);
  return (
    <Container
      id="pricing"
      sx={{
        pt: { xs: 4, sm: 12 },
        pb: { xs: 8, sm: 16 },
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: { xs: 3, sm: 6 },
      }}
    >
      <Box
        sx={{
          width: { sm: '100%', md: '60%' },
          textAlign: { sm: 'left', md: 'center' },
        }}
      >
        <Typography component="h2" variant="h4" color="text.primary">
          Nâng cấp tài khoản Pro
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Tăng cường trải nghiệm học tập của bạn với các gói tài khoản Pro của chúng tôi.
        </Typography>
      </Box>
      <Grid container spacing={3} alignItems="center" justifyContent="center">
        {proPlans.map((proPlan) => (
          <Grid item key={proPlan.name} xs={12} sm={proPlan.is_recommend ? 12 : 6} md={4}>
            <Card
              sx={{
                p: 2,
                display: 'flex',
                flexDirection: 'column',
                gap: 4,
                border: proPlan.is_recommend ? '1px solid' : undefined,
                borderColor: proPlan.is_recommend ? 'primary.main' : undefined,
                background: proPlan.is_recommend ? 'linear-gradient(#033363, #021F3B)' : undefined,
              }}
            >
              <CardContent>
                <Box
                  sx={{
                    mb: 1,
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    color: proPlan.is_recommend ? 'grey.100' : '',
                  }}
                >
                  <Typography component="h3" variant="h6">
                    {proPlan.name}
                  </Typography>
                  {proPlan.is_recommend && (
                    <Chip
                      icon={<AutoAwesomeIcon />}
                      label="Giá tốt nhất"
                      size="small"
                      sx={{
                        background: (theme) => (theme.palette.mode === 'light' ? '' : 'none'),
                        backgroundColor: 'primary.contrastText',
                        '& .MuiChip-label': {
                          color: 'primary.dark',
                        },
                        '& .MuiChip-icon': {
                          color: 'primary.dark',
                        },
                      }}
                    />
                  )}
                </Box>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'baseline',
                    color: proPlan.is_recommend ? 'grey.50' : undefined,
                  }}
                >
                  <Typography component="h3" variant="h2">
                    {formatPrice(proPlan.price_per_month)}đ
                  </Typography>
                  <Typography component="h3" variant="h6">
                    &nbsp; mỗi tháng
                  </Typography>
                </Box>
                <Divider
                  sx={{
                    my: 2,
                    opacity: 0.2,
                    borderColor: 'grey.500',
                  }}
                />
                {proPlan.description.map((line) => (
                  <Box
                    key={line}
                    sx={{
                      py: 1,
                      display: 'flex',
                      gap: 1.5,
                      alignItems: 'center',
                    }}
                  >
                    <CheckCircleRoundedIcon
                      sx={{
                        width: 20,
                        color: proPlan.is_recommend ? 'primary.light' : 'primary.main',
                      }}
                    />
                    <Typography
                      component="text"
                      variant="subtitle2"
                      sx={{
                        color: proPlan.is_recommend ? 'grey.200' : undefined,
                      }}
                    >
                      {line}
                    </Typography>
                  </Box>
                ))}
              </CardContent>
              <CardActions>
                <Button
                  fullWidth
                  variant={proPlan.is_recommend ? 'contained' : 'outlined'}
                  component="a"
                  onClick={handleClickPurchase(proPlan.id)}
                  target="_blank"
                >
                  Mua ngay
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default ProPlans;
