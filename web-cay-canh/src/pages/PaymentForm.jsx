import React, { useState } from 'react';
import { Box, Container, Typography, Grid, TextField, Paper } from '@mui/material';

const PaymentForm = () => {
  const [rows, setRows] = useState([
    { stt: '', productName: '', quantity: '', price: '' },
    { stt: '', productName: '', quantity: '', price: '' },
    { stt: '', productName: '', quantity: '', price: '' },
    { stt: '', productName: '', quantity: '', price: '' },
  ]);

  const handleInputChange = (index, field, value) => {
    const updatedRows = [...rows];
    updatedRows[index][field] = value;
    setRows(updatedRows);
  };

  const calculateTotal = () => {
    return rows.reduce((total, row) => {
      const price = parseInt(row.price) || 0;
      const quantity = parseInt(row.quantity) || 0;
      return total + price * quantity;
    }, 0);
  };

  return (
    <Container maxWidth="lg" sx={{ my: 6 }}>
      <Paper elevation={6} sx={{ p: 5, borderRadius: 3, boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)' }}>
        <Typography variant="h5" align="center" gutterBottom sx={{ fontWeight: 'bold', color: '#1976D2' }}>
          Thanh toán thành công
        </Typography>

        {/* Table Header */}
        <Grid container spacing={2} sx={{ mb: 3, textAlign: 'center', fontWeight: 'bold' }}>
          <Grid item xs={2}>
            <Typography>STT</Typography>
          </Grid>
          <Grid item xs={3}>
            <Typography>Tên sản phẩm</Typography>
          </Grid>
          <Grid item xs={2}>
            <Typography>Số lượng</Typography>
          </Grid>
          <Grid item xs={3}>
            <Typography>Giá</Typography>
          </Grid>
        </Grid>

        {/* Product rows */}
        {rows.map((row, index) => (
          <Grid container spacing={2} key={index} sx={{ mb: 2, textAlign: 'center', borderBottom: '1px solid #ddd' }}>
            <Grid item xs={2}>
              <TextField
                fullWidth
                variant="outlined"
                value={row.stt}
                onChange={(e) => handleInputChange(index, 'stt', e.target.value)}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '10px',
                  },
                  '& .MuiInputBase-input': {
                    fontSize: '14px',
                    textAlign: 'center',
                  },
                }}
              />
            </Grid>
            <Grid item xs={3}>
              <TextField
                fullWidth
                variant="outlined"
                value={row.productName}
                onChange={(e) => handleInputChange(index, 'productName', e.target.value)}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '10px',
                  },
                  '& .MuiInputBase-input': {
                    fontSize: '14px',
                  },
                }}
              />
            </Grid>
            <Grid item xs={2}>
              <TextField
                fullWidth
                variant="outlined"
                value={row.quantity}
                onChange={(e) => handleInputChange(index, 'quantity', e.target.value)}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '10px',
                  },
                  '& .MuiInputBase-input': {
                    fontSize: '14px',
                    textAlign: 'center',
                  },
                }}
              />
            </Grid>
            <Grid item xs={3}>
              <TextField
                fullWidth
                variant="outlined"
                value={row.price}
                onChange={(e) => handleInputChange(index, 'price', e.target.value)}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '10px',
                  },
                  '& .MuiInputBase-input': {
                    fontSize: '14px',
                    textAlign: 'center',
                  },
                }}
              />
            </Grid>
          </Grid>
        ))}

        {/* Total Calculation */}
        <Grid container spacing={2} sx={{ mt: 2 }}>
          <Grid item xs={6}>
            <Typography variant="h6" align="right" sx={{ fontWeight: 'bold' }}>
              Tổng tiền:
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="h6" align="center" sx={{ fontWeight: 'bold', color: '#1976D2' }}>
              {calculateTotal().toLocaleString()} VND
            </Typography>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default PaymentForm;
