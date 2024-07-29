import React from 'react';
import { Select, MenuItem } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import DashboardCard from '../../../../components/shared/DashboardCard';
import Chart from 'react-apexcharts';
import Box from '@mui/material/Box';
import { BEGIN_DASHBOARD_YEAR } from 'src/constants/date';
import { fetchGetCreatedAccountsDailyInMonth } from 'src/services/DashboardService';

const SalesOverview = ({ selectedYear, selectedMonth }) => {
  // select
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

  const handleGetCreatedAccountDailyInMonth = async () => {
    try {
      const response = await fetchGetCreatedAccountsDailyInMonth(selectedYear, selectedMonth);
      const dailyAccounts = response.map((item) => item.total_created_accounts);
      const dayList = response.map((item) => `${item.day}`);

      setSeriesColumnChart([
        {
          name: 'Số tài khoản: ',
          data: dailyAccounts,
        },
      ]);
      setXaxis(dayList);
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    handleGetCreatedAccountDailyInMonth();
  }, [selectedMonth, selectedYear]);

  return (
    <DashboardCard title={`Biểu đồ tài khoản đăng ký tháng ${selectedMonth} năm ${selectedYear}`}>
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
