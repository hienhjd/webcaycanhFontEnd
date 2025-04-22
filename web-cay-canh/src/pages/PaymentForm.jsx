import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { Box, Container, Typography, Grid, TextField, Paper } from '@mui/material';

const GHN_API = "https://nhom11t4sangca1dotnet.onrender.com/api/GHN"; // Thay bằng API thật

const PaymentForm = () => {
  const location = useLocation();
  const [rows, setRows] = useState([
    { stt: '', productName: '', quantity: '', price: '' },
    { stt: '', productName: '', quantity: '', price: '' },
    { stt: '', productName: '', quantity: '', price: '' },
    { stt: '', productName: '', quantity: '', price: '' },
  ]);
  const [detail, setDetail] = useState(null);

  const queryParams = new URLSearchParams(location.search);
  const orderCode = queryParams.get('order_id');

  useEffect(() => {
    if (orderCode) {
      axios
        .post(`${GHN_API}/order-info`, { orderCode })
        .then((res) => {
          if (res.data && res.data.data) {
            setDetail(res.data.data);
          }
        })
        .catch((err) => console.error("Lỗi gọi API chi tiết:", err));
    }
  }, [orderCode]);

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
      <Paper elevation={6} sx={{ p: 5, borderRadius: 3 }}>
        <Typography variant="h5" align="center" gutterBottom sx={{ fontWeight: 'bold', color: '#1976D2' }}>
          Thanh toán thành công
        </Typography>

        {/* Thông tin đơn hàng từ API */}
        {detail && (
          <Box sx={{ mb: 3 }}>
            <Typography variant="body1"><strong>Mã đơn hàng:</strong> {orderCode}</Typography>
            <Typography variant="body1"><strong>Tiền thu hộ (COD):</strong> {detail.cod_amount?.toLocaleString()} VND</Typography>
            {/* Bạn có thể hiển thị thêm thông tin khác nếu cần */}
          </Box>
        )}

        {/* Table Header */}
        <Grid container spacing={2} sx={{ mb: 3, textAlign: 'center', fontWeight: 'bold' }}>
          <Grid item xs={2}><Typography>STT</Typography></Grid>
          <Grid item xs={3}><Typography>Tên sản phẩm</Typography></Grid>
          <Grid item xs={2}><Typography>Số lượng</Typography></Grid>
          <Grid item xs={3}><Typography>Giá</Typography></Grid>
        </Grid>

        {/* Product rows */}
        {rows.map((row, index) => (
          <Grid container spacing={2} key={index} sx={{ mb: 2, textAlign: 'center' }}>
            <Grid item xs={2}>
              <TextField
                fullWidth variant="outlined" value={row.stt}
                onChange={(e) => handleInputChange(index, 'stt', e.target.value)}
              />
            </Grid>
            <Grid item xs={3}>
              <TextField
                fullWidth variant="outlined" value={row.productName}
                onChange={(e) => handleInputChange(index, 'productName', e.target.value)}
              />
            </Grid>
            <Grid item xs={2}>
              <TextField
                fullWidth variant="outlined" value={row.quantity}
                onChange={(e) => handleInputChange(index, 'quantity', e.target.value)}
              />
            </Grid>
            <Grid item xs={3}>
              <TextField
                fullWidth variant="outlined" value={row.price}
                onChange={(e) => handleInputChange(index, 'price', e.target.value)}
              />
            </Grid>
          </Grid>
        ))}

        {/* Tổng tiền */}
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
