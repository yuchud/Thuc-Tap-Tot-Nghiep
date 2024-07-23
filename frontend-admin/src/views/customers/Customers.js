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

const Customers = () => {
  const [accounts, setAccounts] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  const fetchAccounts = async (page) => {
    const response = await fetchGetAccounts(page);
    console.log(response);
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
    fetchAccounts(page); // Refresh accounts list
  };

  useEffect(() => {
    fetchAccounts(page);
  }, [page]);

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
                <TableCell>{account.created_at}</TableCell>
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
      <Pagination count={totalPages} page={page} onChange={(event, value) => setPage(value)} />
    </>
  );
};

export default Customers;
