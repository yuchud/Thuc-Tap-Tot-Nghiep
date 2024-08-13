import React, { useEffect, useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Switch,
  Button,
  Avatar,
  Divider,
  Typography,
} from '@mui/material';
import Pagination from '@mui/material/Pagination';
import axios from 'axios';
import { fetchGetAccounts, fetchToggleAccountBannedStatus } from 'src/services/AccountService';
import CustomSnackbar from 'src/components/snackbar/CustomSnackbar';
import { Box, TextField } from '@mui/material';

import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import DirectionsIcon from '@mui/icons-material/Directions';
import InputBase from '@mui/material/InputBase';
import { formatDate } from 'src/utilities/Date';
import { useLocation, useParams } from 'react-router';
import { useNavigate } from 'react-router-dom';

import { formatDateOnly } from 'src/utilities/Date';
const Customers = () => {
  const maxCustomersPerPage = 10;
  const [accounts, setAccounts] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  const [searchQuery, setSearchQuery] = useState(useParams().search_query || '');

  const fetchAccounts = async () => {
    // console.log(searchQuery);
    const response = await fetchGetAccounts(currentPage, maxCustomersPerPage, searchQuery);
    // console.log(response);
    setAccounts(response.accounts);
    setTotalPages(response.totalPages);
  };

  const toggleBannedStatus = async (id) => {
    const response = await fetchToggleAccountBannedStatus(id);
    if (response.hasOwnProperty('error')) {
      console.log(response.error);
      setIsSnackbarOpen(true);
      setSnackbarMessage(response.error);
      setSnackbarSeverity('error');
      return;
    }
    setIsSnackbarOpen(true);
    setSnackbarMessage('Cập nhật trạng thái cấm thành công');
    setSnackbarSeverity('success');
    console.log(response);
    fetchAccounts(currentPage); // Refresh accounts list
  };
  const navigate = useNavigate();
  const handleSearchClick = () => {
    console.log(searchQuery);
    navigate(`/customers?search_query=${searchQuery}`);
  };

  React.useEffect(() => {
    if (currentPage === 0) {
      setCurrentPage(Math.min(currentPage, totalPages));
      return;
    }
    fetchAccounts();
    // console.log(1);
  }, [currentPage]);

  const location = useLocation();
  React.useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const page = searchParams.get('page');
    setCurrentPage(page ? parseInt(page) : 1);
    fetchAccounts();
  }, [location]);

  return (
    <>
      <CustomSnackbar
        open={isSnackbarOpen}
        message={snackbarMessage}
        severity={snackbarSeverity}
        onClose={() => setIsSnackbarOpen(false)}
      />
      <Typography variant="h1" gutterBottom>
        Danh sách khách hàng
      </Typography>
      <Paper
        component="form"
        sx={{
          p: '2px 4px',
          display: 'flex',
          alignItems: 'center',
          width: '100%',
          border: '1px solid #e0e0e0',
          margin: '10px 0',
        }}
      >
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder="Tìm kiếm khách hàng"
          inputProps={{ 'aria-label': 'Tìm kiếm khách hàng' }}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <IconButton
          type="button"
          sx={{ p: '10px' }}
          aria-label="search"
          onClick={handleSearchClick}
        >
          <SearchIcon />
        </IconButton>
      </Paper>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Avatar</TableCell>
              <TableCell>Tên đăng nhập</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Họ và tên đệm</TableCell>
              <TableCell>Tên</TableCell>
              <TableCell>Ngày sinh</TableCell>
              <TableCell>Tạo ngày</TableCell>
              <TableCell>Bị cấm</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {accounts.map((account) => (
              <TableRow
                key={account.id}
                sx={{
                  borderBottom: '1px solid rgba(224, 224, 224, 1)',
                }}
              >
                <TableCell>{account.id}</TableCell>
                <tableCell>
                  <Avatar alt="Avatar" src={account.avatar_url} sx={{ margin: 'auto' }} />
                </tableCell>
                <TableCell>{account.username}</TableCell>
                <TableCell>{account.email}</TableCell>
                <TableCell>{account.last_name}</TableCell>
                <TableCell>{account.first_name}</TableCell>
                <TableCell>{formatDateOnly(account.birthday)}</TableCell>
                <TableCell>{formatDate(account.created_at)}</TableCell>
                <TableCell>
                  <Switch
                    checked={account.is_banned}
                    onChange={() => toggleBannedStatus(account.id)}
                  />
                </TableCell>
                <Divider />
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Pagination
        count={totalPages}
        page={currentPage}
        onChange={(event, value) => setCurrentPage(value)}
      />
    </>
  );
};

export default Customers;
