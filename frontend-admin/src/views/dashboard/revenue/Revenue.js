import React from 'react';
import { Grid, Box } from '@mui/material';
import PageContainer from 'src/components/container/PageContainer';

// components
import SalesOverview from './components/SalesOverview';
import YearlyBreakup from './components/YearlyBreakup';
import RecentTransactions from './components/RecentTransactions';
import TopProPlanInYear from './components/TopProPlanInYear';
import TopProPlanInMonth from './components/TopProPlanInMonth';
import Blog from './components/Blog';
import MonthlyEarnings from './components/MonthlyEarnings';
import { BEGIN_DASHBOARD_YEAR } from 'src/constants/date';
import { Select, MenuItem } from '@mui/material';

const Dashboard = () => {
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth() + 1;
  const [selectedYear, setSelectedYear] = React.useState(currentYear);
  const [selectedMonth, setSelectedMonth] = React.useState(currentMonth);
  const [yearList, setYearList] = React.useState([]);
  const [monthList, setMonthList] = React.useState([]);

  const handleChangeYear = (event) => {
    setSelectedYear(event.target.value);
    if (event.target.value === currentYear) {
      setSelectedMonth(currentDate.getMonth() + 1);
    } else {
      setSelectedMonth(12);
    }
  };
  const handleChangeMonth = (event) => {
    setSelectedMonth(event.target.value);
  };

  const handleGetYearList = async () => {
    const yearList = [];
    for (let year = BEGIN_DASHBOARD_YEAR; year <= currentYear; year++) {
      yearList.push(year);
    }
    setYearList(yearList);
  };

  const handleGetMonthList = async () => {
    const monthList = [];
    const maxMonth = selectedYear === currentYear ? currentDate.getMonth() + 1 : 12;
    for (let month = 1; month <= maxMonth; month++) {
      monthList.push(month);
    }
    setMonthList(monthList);
  };

  React.useEffect(() => {
    handleGetYearList();
    handleGetMonthList();
  }, [selectedYear]);

  return (
    <PageContainer title="Dashboard" description="this is Dashboard">
      <Box>
        Tháng:
        <Select
          labelId="month"
          id="month"
          value={selectedMonth}
          size="small"
          onChange={handleChangeMonth}
          sx={{ marginRight: '10px' }}
        >
          {monthList.map((month) => (
            <MenuItem key={month} value={month}>
              {month}
            </MenuItem>
          ))}
        </Select>
        Năm:
        <Select
          labelId="year"
          id="year"
          value={selectedYear}
          size="small"
          onChange={handleChangeYear}
        >
          {yearList.map((year) => (
            <MenuItem key={year} value={year}>
              {year}
            </MenuItem>
          ))}
        </Select>
      </Box>
      <Box>
        <Grid container spacing={3}>
          <Grid item xs={12} lg={8}>
            <SalesOverview selectedYear={selectedYear} selectedMonth={selectedMonth} />
          </Grid>
          <Grid item xs={12} lg={4}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <YearlyBreakup selectedYear={selectedYear} />
              </Grid>
              <Grid item xs={12}>
                <MonthlyEarnings selectedYear={selectedYear} selectedMonth={selectedMonth} />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} lg={6}>
            <TopProPlanInMonth selectedYear={selectedYear} selectedMonth={selectedMonth} />
          </Grid>
          <Grid item xs={12} lg={6}>
            <TopProPlanInYear selectedYear={selectedYear} />
          </Grid>

          {/* <Grid item xs={12}>
            <Blog />
          </Grid> */}
        </Grid>
      </Box>
    </PageContainer>
  );
};

export default Dashboard;
