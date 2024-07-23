import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { Edit, Navigation } from '@mui/icons-material';
import Password from './Password';

import { useNavigate } from 'react-router-dom';
import EditProfile from './Profile';
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

export default function VerticalTabs() {
  const [value, setValue] = React.useState(0);
  console.log(value);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const navigate = useNavigate();
  return (
    <Box sx={{ flexGrow: 1, bgcolor: 'background.paper', display: 'flex', height: 224 }}>
      <Tabs
        orientation="vertical"
        //variant="scrollable"
        value={0}
        onChange={handleChange}
        aria-label="Vertical tabs example"
        sx={{ borderRight: 1, borderColor: 'divider', width: '20%' }}
      >
        <Tab label="Thông tin cá nhân" onClick={() => navigate('/profile')} />
        <Tab label="Đổi mật khẩu" onClick={() => navigate('/password')} />
      </Tabs>
      {/* <Password /> */}
      {/* <EditProfile /> */}
      {/* <TabPanel value={value} index={0}>
        <EditProfile />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Password />
      </TabPanel> */}
    </Box>
  );
}
