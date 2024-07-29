import React from 'react';
import {
  Typography,
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Chip,
} from '@mui/material';
import DashboardCard from '../../../../components/shared/DashboardCard';
import { fetchGetTopProPlansInYear } from '../../../../services/DashboardService';
import { formatPrice } from 'src/utilities/Money';

const products = [
  {
    id: '1',
    name: 'Sunil Joshi',
    post: 'Web Designer',
    pname: 'Elite Admin',
    priority: 'Low',
    pbg: 'primary.main',
    budget: '3.9',
  },
  {
    id: '2',
    name: 'Andrew McDownland',
    post: 'Project Manager',
    pname: 'Real Homes WP Theme',
    priority: 'Medium',
    pbg: 'secondary.main',
    budget: '24.5',
  },
  {
    id: '3',
    name: 'Christopher Jamil',
    post: 'Project Manager',
    pname: 'MedicalPro WP Theme',
    priority: 'High',
    pbg: 'error.main',
    budget: '12.8',
  },
  {
    id: '4',
    name: 'Nirav Joshi',
    post: 'Frontend Engineer',
    pname: 'Hosting Press HTML',
    priority: 'Critical',
    pbg: 'success.main',
    budget: '2.4',
  },
];

const TopProPlanInYear = ({ selectedYear }) => {
  const [topProPlans, setTopProPlans] = React.useState([]);
  const getTopProPlans = async () => {
    try {
      const response = await fetchGetTopProPlansInYear(selectedYear);
      console.log(response);
      setTopProPlans(response);
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    getTopProPlans();
  }, [selectedYear]);
  return (
    <DashboardCard title={`Top doanh thu gói Pro năm ${selectedYear}`}>
      <Box sx={{ overflow: 'auto', width: { xs: '280px', sm: 'auto' } }}>
        <Table
          aria-label="simple table"
          sx={{
            whiteSpace: 'nowrap',
            mt: 2,
          }}
        >
          <TableHead>
            <TableRow>
              <TableCell>
                <Typography variant="subtitle2" fontWeight={600}>
                  Id
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="subtitle2" fontWeight={600}>
                  Tên gói
                </Typography>
              </TableCell>
              <TableCell align="right">
                <Typography variant="subtitle2" fontWeight={600}>
                  Tổng số lần mua
                </Typography>
              </TableCell>
              <TableCell align="right">
                <Typography variant="subtitle2" fontWeight={600}>
                  Doanh thu
                </Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {topProPlans.map((proPlan) => (
              <TableRow key={proPlan.pro_plan_id}>
                <TableCell>
                  <Typography
                    sx={{
                      fontSize: '15px',
                      fontWeight: '500',
                    }}
                  >
                    {proPlan.pro_plan_id}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="subtitle2" fontWeight={600}>
                    {proPlan.pro_plan_name}
                  </Typography>
                </TableCell>
                <TableCell align="right">
                  <Typography variant="subtitle2" fontWeight={600}>
                    {proPlan.total_purchase}
                  </Typography>
                </TableCell>
                <TableCell align="right">
                  <Typography variant="h6">{formatPrice(proPlan.total_revenue)}đ</Typography>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>
    </DashboardCard>
  );
};

export default TopProPlanInYear;
