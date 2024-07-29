import React from 'react';
import Chart from 'react-apexcharts';
import { useTheme } from '@mui/material/styles';
import { Grid, Stack, Typography, Avatar } from '@mui/material';
import { IconArrowUpLeft } from '@tabler/icons';

import Box from '@mui/material/Box';
import DashboardCard from '../../../../components/shared/DashboardCard';
import { fetchGetRevenueInYear } from 'src/services/DashboardService';
import { formatDate } from 'src/utilities/Date';
import { formatPrice } from 'src/utilities/Money';
import { set } from 'lodash';
import { IconArrowDownRight, IconCurrencyDollar } from '@tabler/icons';
import { MenuItem, Select } from '@mui/material';
import { BEGIN_DASHBOARD_YEAR } from 'src/constants/date';
import { fetchGetRevenueInMonth } from 'src/services/DashboardService';
const MonthlyEarnings = ({ selectedYear, selectedMonth }) => {
  // chart color
  const theme = useTheme();
  const primary = theme.palette.primary.main;
  const primarylight = '#ecf2ff';
  const successlight = theme.palette.success.light;
  const secondarylight = '#f5fcff';
  const errorlight = '#fdede8';
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const [revenueInMonth, setRevenueInMonth] = React.useState(0);
  const [revenueInLastMonth, setRevenueInLastMonth] = React.useState(0);
  const [differenceFromPreviousMonth, setDifferenceFromPreviousMonth] = React.useState(0);
  const [seriescolumnchart, setSeriesColumnChart] = React.useState([0, 0]);
  // const [selectedYear, setSelectedYear] = React.useState(currentYear);
  // const [selectedMonth, setSelectedMonth] = React.useState(currentDate.getMonth() + 1);
  // const [yearList, setYearList] = React.useState([]);
  // const [monthList, setMonthList] = React.useState([]);
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

  const handleGetRevenueInMonth = async () => {
    try {
      const response = await fetchGetRevenueInMonth(selectedYear, selectedMonth);
      setRevenueInMonth(response[0].total_revenue);
      setRevenueInLastMonth(response[0].total_revenue_previous_month);
      setDifferenceFromPreviousMonth(response[0].difference_from_previous_month);
      setSeriesColumnChart([
        response[0].percent_of_total_revenue,
        response[0].percent_of_total_revenue_previous_month,
      ]);
    } catch (error) {
      console.log(error);
    }
  };

  // const handleChangeYear = (event) => {
  //   setSelectedYear(event.target.value);
  // };
  // const handleChangeMonth = (event) => {
  //   setSelectedMonth(event.target.value);
  // };
  // const handleGetYearList = async () => {
  //   const yearList = [];
  //   for (let year = BEGIN_DASHBOARD_YEAR; year <= currentYear; year++) {
  //     yearList.push(year);
  //   }
  //   setYearList(yearList);
  // };

  // const handleGetMonthList = async () => {
  //   const monthList = [];
  //   const maxMonth = selectedYear === currentYear ? currentDate.getMonth() + 1 : 12;
  //   for (let month = 1; month <= maxMonth; month++) {
  //     monthList.push(month);
  //   }
  //   setMonthList(monthList);
  // };

  // React.useEffect(() => {
  //   handleGetYearList();
  //   handleGetMonthList();
  //   if (selectedYear === currentYear) {
  //     setSelectedMonth(currentDate.getMonth() + 1);
  //   } else {
  //     setSelectedMonth(12);
  //   }
  // }, [selectedYear]);

  React.useEffect(() => {
    handleGetRevenueInMonth();
  }, [selectedMonth, selectedYear]);

  return (
    <DashboardCard
      title={`Doanh thu tháng ${selectedMonth} năm ${selectedYear}`}
      // action={
      //   <Box>
      //     <Select
      //       labelId="month"
      //       id="month"
      //       value={selectedMonth}
      //       size="small"
      //       onChange={handleChangeMonth}
      //     >
      //       {monthList.map((month) => (
      //         <MenuItem key={month} value={month}>
      //           {month}
      //         </MenuItem>
      //       ))}
      //     </Select>
      //     <Select
      //       labelId="year"
      //       id="year"
      //       value={selectedYear}
      //       size="small"
      //       onChange={handleChangeYear}
      //     >
      //       {yearList.map((year) => (
      //         <MenuItem key={year} value={year}>
      //           {year}
      //         </MenuItem>
      //       ))}
      //     </Select>
      //   </Box>
      // }
    >
      <Grid container spacing={3}>
        {/* column */}
        <Grid item xs={7} sm={7}>
          <Typography variant="h3" fontWeight="700">
            {formatPrice(revenueInMonth)}đ
          </Typography>
          <Stack direction="row" spacing={1} mt={1} alignItems="center">
            {differenceFromPreviousMonth > 0 ? (
              <Avatar sx={{ bgcolor: successlight, width: 27, height: 27 }}>
                <IconArrowUpLeft width={20} color="#39B69A" />
              </Avatar>
            ) : (
              <Avatar sx={{ bgcolor: errorlight, width: 27, height: 27 }}>
                <IconArrowDownRight width={20} color="#FA896B" />
              </Avatar>
            )}

            <Typography variant="subtitle2" fontWeight="600">
              {formatPrice(differenceFromPreviousMonth)}đ
            </Typography>
            <Typography variant="subtitle2" color="textSecondary">
              Tháng {selectedMonth !== 1 ? selectedMonth - 1 : 12} năm{' '}
              {selectedMonth !== 1 ? selectedYear : selectedYear - 1}
            </Typography>
          </Stack>
          <Stack spacing={3} mt={5} direction="row">
            <Stack direction="row" spacing={1} alignItems="center">
              <Avatar
                sx={{ width: 9, height: 9, bgcolor: primary, svg: { display: 'none' } }}
              ></Avatar>
              <Typography variant="subtitle2" color="textSecondary">
                Tháng {selectedMonth} năm {selectedYear}
              </Typography>
            </Stack>
            <Stack direction="row" spacing={1} alignItems="center">
              <Avatar
                sx={{ width: 9, height: 9, bgcolor: primarylight, svg: { display: 'none' } }}
              ></Avatar>
              <Typography variant="subtitle2" color="textSecondary">
                Tháng {selectedMonth !== 1 ? selectedMonth - 1 : 12} năm{' '}
                {selectedMonth !== 1 ? selectedYear : selectedYear - 1}
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

export default MonthlyEarnings;
