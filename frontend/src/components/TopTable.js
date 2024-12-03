import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
export default function TopTable({ data, table_name, value_name }) {
  console.log(data);
  return (
    <Box sx={{ mt: 10 }}>
      <Typography sx={{ flex: '1 1 100%' }} variant="h1" id="tableTitle" component="div">
        {table_name}
      </Typography>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Rank</TableCell>
              <TableCell>Tài Khoản</TableCell>
              <TableCell>{value_name}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row) => (
              <TableRow key={row.rank} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell>{row.rank}</TableCell>
                <TableCell component="th" scope="row">
                  {row.full_name}
                </TableCell>
                <TableCell>{row.value}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
