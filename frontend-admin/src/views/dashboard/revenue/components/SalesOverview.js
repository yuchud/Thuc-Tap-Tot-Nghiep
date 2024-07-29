import React from 'react';
import { Select, MenuItem } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import DashboardCard from '../../../../components/shared/DashboardCard';
import Chart from 'react-apexcharts';
import Box from '@mui/material/Box';
import { BEGIN_DASHBOARD_YEAR } from 'src/constants/date';
import { fetchGetDailyRevenueInMonth } from 'src/services/DashboardService';

const SalesOverview = ({ selectedYear, selectedMonth }) => {
  // select
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  // const [selectedYear, setSelectedYear] = React.useState(currentYear);
  // const [selectedMonth, setSelectedMonth] = React.useState(currentDate.getMonth() + 1);
  // const [yearList, setYearList] = React.useState([]);
  // const [monthList, setMonthList] = React.useState([]);
  const [seriesColumnChart, setSeriesColumnChart] = React.useState([]);
  const [xaxis, setXaxis] = React.useState([]);

  // chart color
  const theme = useTheme();
  const primary = theme.palette.primary.main;
  const secondary = theme.palette.secondary.main;

  // chart
  const optionscolumnchart = {
    chart: {
      type: 'bar',
      fontFamily: "'Plus Jakarta Sans', sans-serif;",
      foreColor: '#adb0bb',
      toolbar: {
        show: true,
      },
      height: 370,
    },
    colors: [primary, secondary],
    plotOptions: {
      bar: {
        horizontal: false,
        barHeight: '60%',
        columnWidth: '42%',
        borderRadius: [6],
        borderRadiusApplication: 'end',
        borderRadiusWhenStacked: 'all',
      },
    },

    stroke: {
      show: true,
      width: 5,
      lineCap: 'butt',
      colors: ['transparent'],
    },
    dataLabels: {
      enabled: false,
    },
    legend: {
      show: false,
    },
    grid: {
      borderColor: 'rgba(0,0,0,0.1)',
      strokeDashArray: 3,
      xaxis: {
        lines: {
          show: false,
        },
      },
    },
    yaxis: {
      tickAmount: 4,
    },
    xaxis: {
      categories: xaxis,
      axisBorder: {
        show: false,
      },
    },
    tooltip: {
      theme: theme.palette.mode === 'dark' ? 'dark' : 'light',
      fillSeriesColor: false,
    },
  };
  // const seriescolumnchart = [
  //   {
  //     name: 'Thu về',
  //     data: ['355.0', 390, 300, 350, 390, 180, 355, 390],
  //   },
  // ];

  const handleGetDailyRevenueInMonth = async () => {
    try {
      const response = await fetchGetDailyRevenueInMonth(selectedYear, selectedMonth);
      const dailyRevenue = response.map((item) => item.total_revenue);
      const dayList = response.map((item) => `${item.day}`);

      setSeriesColumnChart([
        {
          name: 'Thu về',
          data: dailyRevenue,
        },
      ]);
      setXaxis(dayList);
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
  // }, [selectedYear]);

  React.useEffect(() => {
    handleGetDailyRevenueInMonth();
  }, [selectedMonth, selectedYear]);

  return (
    <DashboardCard
      title={`Biểu đồ doanh thu tháng ${selectedMonth} năm ${selectedYear}`}
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
      <Chart
        options={optionscolumnchart}
        series={seriesColumnChart}
        type="bar"
        height="370px"
        barLabel="value"
      />
    </DashboardCard>
  );
};

export default SalesOverview;
