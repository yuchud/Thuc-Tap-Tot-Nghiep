import React from 'react';
import Chart from 'react-apexcharts';
import { useTheme } from '@mui/material/styles';
import { Grid, Stack, Typography, Avatar } from '@mui/material';
import { IconArrowUpLeft } from '@tabler/icons';

import DashboardCard from '../../../../components/shared/DashboardCard';
import { fetchGetRevenueInYear } from 'src/services/DashboardService';
import { formatDate } from 'src/utilities/Date';
import { formatPrice } from 'src/utilities/Money';
import { set } from 'lodash';
import { IconArrowDownRight, IconCurrencyDollar } from '@tabler/icons';
import { MenuItem, Select } from '@mui/material';
import { BEGIN_DASHBOARD_YEAR } from 'src/constants/date';
const YearlyBreakup = ({ selectedYear }) => {
  // chart color
  const theme = useTheme();
  const primary = theme.palette.primary.main;
  const primarylight = '#ecf2ff';
  const successlight = theme.palette.success.light;
  const secondarylight = '#f5fcff';
  const errorlight = '#fdede8';
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const [revenueInYear, setRevenueInYear] = React.useState(0);
  const [revenueInLastYear, setRevenueInLastYear] = React.useState(0);
  const [differenceFromPreviousYear, setDifferenceFromPreviousYear] = React.useState(0);
  const [seriescolumnchart, setSeriesColumnChart] = React.useState([0, 0]);
  // const [year, setYear] = React.useState(currentYear);
  // const [yearList, setYearList] = React.useState([]);
  // chart
  const optionscolumnchart = {
    chart: {
      type: 'donut',
      fontFamily: "'Plus Jakarta Sans', sans-serif;",
      foreColor: '#adb0bb',
      toolbar: {
        show: false,
      },
      height: 155,
    },
    colors: [primary, primarylight, '#F9F9FD'],
    plotOptions: {
      pie: {
        startAngle: 0,
        endAngle: 360,
        donut: {
          size: '75%',
          background: 'transparent',
        },
      },
    },
    tooltip: {
      theme: theme.palette.mode === 'dark' ? 'dark' : 'light',
      fillSeriesColor: false,
    },
    stroke: {
      show: false,
    },
    dataLabels: {
      enabled: false,
    },
    legend: {
      show: false,
    },
    responsive: [
      {
        breakpoint: 991,
        options: {
          chart: {
            width: 120,
          },
        },
      },
    ],
  };
  // const seriescolumnchart = [38, 40, 25];

  const handleGetRevenueInYear = async () => {
    try {
      const revenueInYear = await fetchGetRevenueInYear(selectedYear);
      // console.log(revenueInYear);
      setRevenueInYear(revenueInYear[0].total_revenue);
      setRevenueInLastYear(revenueInYear[0].total_revenue_previous_year);
      setDifferenceFromPreviousYear(revenueInYear[0].difference_from_previous_year);
      setSeriesColumnChart([
        revenueInYear[0].percent_of_total_revenue,
        revenueInYear[0].percent_of_total_revenue_previous_year,
      ]);
    } catch (error) {
      console.log(error);
    }
  };

  // const handleChange = (event) => {
  //   setYear(event.target.value);
  // };
  // const handleGetYearList = async () => {
  //   const yearList = [];
  //   for (let year = BEGIN_DASHBOARD_YEAR; year <= currentYear; year++) {
  //     yearList.push(year);
  //   }
  //   setYearList(yearList);
  // };

  React.useEffect(() => {
    // handleGetYearList();
    handleGetRevenueInYear();
  }, [selectedYear]);

  return (
    <DashboardCard
      title={`Doanh thu năm ${selectedYear}`}
      // action={
      //   <Select labelId="month-dd" id="month-dd" value={year} size="small" onChange={handleChange}>
      //     {yearList.map((year) => (
      //       <MenuItem key={year} value={year}>
      //         {year}
      //       </MenuItem>
      //     ))}
      //   </Select>
      // }
    >
      <Grid container spacing={3}>
        {/* column */}
        <Grid item xs={7} sm={7}>
          <Typography variant="h3" fontWeight="700">
            {formatPrice(revenueInYear)}đ
          </Typography>
          <Stack direction="row" spacing={1} mt={1} alignItems="center">
            {differenceFromPreviousYear > 0 ? (
              <Avatar sx={{ bgcolor: successlight, width: 27, height: 27 }}>
                <IconArrowUpLeft width={20} color="#39B69A" />
              </Avatar>
            ) : (
              <Avatar sx={{ bgcolor: errorlight, width: 27, height: 27 }}>
                <IconArrowDownRight width={20} color="#FA896B" />
              </Avatar>
            )}

            <Typography variant="subtitle2" fontWeight="600">
              {formatPrice(differenceFromPreviousYear)}đ
            </Typography>
            <Typography variant="subtitle2" color="textSecondary">
              {`năm ${selectedYear - 1}`}
            </Typography>
          </Stack>
          <Stack spacing={3} mt={5} direction="row">
            <Stack direction="row" spacing={1} alignItems="center">
              <Avatar
                sx={{ width: 9, height: 9, bgcolor: primary, svg: { display: 'none' } }}
              ></Avatar>
              <Typography variant="subtitle2" color="textSecondary">
                {selectedYear}
              </Typography>
            </Stack>
            <Stack direction="row" spacing={1} alignItems="center">
              <Avatar
                sx={{ width: 9, height: 9, bgcolor: primarylight, svg: { display: 'none' } }}
              ></Avatar>
              <Typography variant="subtitle2" color="textSecondary">
                {selectedYear - 1}
              </Typography>
            </Stack>
          </Stack>
        </Grid>
        {/* column */}
        <Grid item xs={5} sm={5}>
          <Chart
            options={optionscolumnchart}
            series={seriescolumnchart}
            type="donut"
            height="150px"
          />
        </Grid>
      </Grid>
    </DashboardCard>
  );
};

export default YearlyBreakup;
