import React, { useState } from 'react';

import { fetchGetAccount } from 'src/services/AccountService';
import { Box } from '@mui/system';
import { Badge, Divider, Typography } from '@mui/material';
import { formatDate } from 'src/utilities/Date';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material';

import { fetchGetPurchaseHistories } from 'src/services/PurchaseService';
import { formatPrice } from 'src/utilities/Money';
const ProHistories = () => {
  const [account, setAccount] = useState(null);
  const [purchaseHistories, setPurchaseHistories] = useState([]);

  const handleGetAccount = async () => {
    try {
      const response = await fetchGetAccount();
      console.log(response);
      setAccount(response);
    } catch (error) {
      console.error(error);
    }
  };

  const handleGetPurchaseHistories = async () => {
    try {
      const response = await fetchGetPurchaseHistories();
      // console.log(response);
      setPurchaseHistories(response);
    } catch (error) {
      console.error(error);
    }
  };

  React.useEffect(() => {
    handleGetAccount();
    handleGetPurchaseHistories();
  }, []);
  return (
    <Box>
      <Typography variant="h1" gutterBottom>
        Lịch sử mua gói
      </Typography>
      {account && account.is_pro && (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell align="right">Tên gói</TableCell>
                <TableCell align="right">Tổng thanh toán</TableCell>
                <TableCell align="right">Thời gian mua</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {purchaseHistories.map((purchaseHistory, index) => (
                <TableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  <TableCell component="th" scope="row">
                    {purchaseHistory.id}
                  </TableCell>
                  <TableCell align="right">{purchaseHistory.pro_plan_name}</TableCell>
                  <TableCell align="right">
                    {formatPrice(purchaseHistory.purchased_amount) + ' VND'}
                  </TableCell>
                  <TableCell align="right">{formatDate(purchaseHistory.purchased_at)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
};

export default ProHistories;
