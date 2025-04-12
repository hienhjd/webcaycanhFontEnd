<<<<<<< HEAD
import React from 'react';
=======
import React, { useState } from 'react';
>>>>>>> ca6e274e713eb024698f96f05891cb2affb9ba12
import { Box, Container, Typography, Grid, Button, TextField, IconButton, Divider } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
<<<<<<< HEAD
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const Cart = () => {
  const navigate = useNavigate();
  const { cartItems, updateQuantity, removeFromCart } = useCart();

  // Calculate total cart value
  const calculateTotal = () => {
    const totalPrice = cartItems.reduce((total, item) => {
      return total + (item.price * item.quantity);
    }, 0);

    const shippingFee = totalPrice > 500000 ? 0 : 30000; // Free shipping if total > 500.000₫
    return totalPrice + shippingFee;
  };

  // Navigate to the checkout page
  const handlePayment = () => {
    if (cartItems.length === 0) {
      alert('Giỏ hàng của bạn trống. Vui lòng thêm sản phẩm trước khi thanh toán.');
      return;
    }
    navigate('/thanh-toan');
=======
import product1 from '../assets/img/Cay anh van phong/1.jpg';

const Cart = () => {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      title: 'Cây string of heart',
      price: '90.000 ₫',
      quantity: 1,
      image: product1,
      option: 'Nhỏ'
    },
    // Add more items as needed
  ]);

  const handleQuantityChange = (id, change) => {
    setCartItems(items =>
      items.map(item =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + change) }
          : item
      )
    );
  };

  const handleRemoveItem = (id) => {
    setCartItems(items => items.filter(item => item.id !== id));
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => {
      const price = parseInt(item.price.replace(/[^0-9]/g, ''));
      return total + (price * item.quantity);
    }, 0);
>>>>>>> ca6e274e713eb024698f96f05891cb2affb9ba12
  };

  return (
    <Container maxWidth="xl">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Giỏ hàng
        </Typography>

        {cartItems.length === 0 ? (
          <Box sx={{ textAlign: 'center', py: 8 }}>
            <ShoppingCartIcon sx={{ fontSize: 64, color: 'text.secondary', mb: 2 }} />
            <Typography variant="h6" color="text.secondary" gutterBottom>
              Giỏ hàng trống
            </Typography>
            <Button variant="contained" href="/san-pham">
              Tiếp tục mua sắm
            </Button>
          </Box>
        ) : (
          <Grid container spacing={4}>
            {/* Cart Items */}
            <Grid item xs={12} md={8}>
              {cartItems.map((item) => (
                <Box key={item.id}>
                  <Grid container spacing={2} alignItems="center" sx={{ py: 2 }}>
                    <Grid item xs={3}>
                      <img
                        src={item.image}
                        alt={item.title}
                        style={{ width: '100%', height: 'auto', borderRadius: '4px' }}
                      />
                    </Grid>
                    <Grid item xs={9}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                        <Box>
                          <Typography variant="h6">{item.title}</Typography>
                          <Typography color="text.secondary">Kích thước: {item.option}</Typography>
                          <Typography color="primary" sx={{ mt: 1 }}>
<<<<<<< HEAD
                            {item.price.toLocaleString()} ₫
                          </Typography>
                        </Box>
                        <IconButton onClick={() => removeFromCart(item.id)}>
=======
                            {item.price}
                          </Typography>
                        </Box>
<IconButton onClick={() => handleRemoveItem(item.id)}>
>>>>>>> ca6e274e713eb024698f96f05891cb2affb9ba12
                          <DeleteIcon />
                        </IconButton>
                      </Box>
                      <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
<<<<<<< HEAD
                        <IconButton onClick={() => updateQuantity(item.id, item.quantity - 1)}>
=======
                        <IconButton onClick={() => handleQuantityChange(item.id, -1)}>
>>>>>>> ca6e274e713eb024698f96f05891cb2affb9ba12
                          <RemoveIcon />
                        </IconButton>
                        <TextField
                          value={item.quantity}
                          type="number"
                          inputProps={{ min: 1 }}
                          sx={{ width: 60, mx: 1 }}
                          onChange={(e) => {
                            const value = Math.max(1, parseInt(e.target.value) || 1);
<<<<<<< HEAD
                            updateQuantity(item.id, value);
                          }}
                        />
                        <IconButton onClick={() => updateQuantity(item.id, item.quantity + 1)}>
=======
                            setCartItems(items =>
                              items.map(i =>
                                i.id === item.id ? { ...i, quantity: value } : i
                              )
                            );
                          }}
                        />
                        <IconButton onClick={() => handleQuantityChange(item.id, 1)}>
>>>>>>> ca6e274e713eb024698f96f05891cb2affb9ba12
                          <AddIcon />
                        </IconButton>
                      </Box>
                    </Grid>
                  </Grid>
                  <Divider />
                </Box>
              ))}
            </Grid>

            {/* Order Summary */}
            <Grid item xs={12} md={4}>
              <Box sx={{ p: 3, bgcolor: 'background.paper', borderRadius: 1, boxShadow: 1 }}>
                <Typography variant="h6" gutterBottom>
                  Tổng đơn hàng
                </Typography>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                  <Typography>Tạm tính</Typography>
<<<<<<< HEAD
                  <Typography>{(calculateTotal() - (calculateTotal() > 500000 ? 0 : 30000)).toLocaleString()} ₫</Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                  <Typography>Phí vận chuyển</Typography>
                  <Typography>{calculateTotal() > 500000 ? 'Miễn phí' : '30.000 ₫'}</Typography>
=======
                  <Typography>{calculateTotal().toLocaleString()} ₫</Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                  <Typography>Phí vận chuyển</Typography>
                  <Typography>Miễn phí</Typography>
>>>>>>> ca6e274e713eb024698f96f05891cb2affb9ba12
                </Box>
                <Divider sx={{ my: 2 }} />
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
                  <Typography variant="h6">Tổng cộng</Typography>
                  <Typography variant="h6" color="primary">
                    {calculateTotal().toLocaleString()} ₫
                  </Typography>
                </Box>
                <Button
                  variant="contained"
                  fullWidth
                  size="large"
<<<<<<< HEAD
                  onClick={handlePayment}
                >
                  Tiến hành thanh toán
                </Button>
=======
                  onClick={() => navigate('/thanh-toan')}
>
                  Tiến hành thanh toán
                 </Button>
>>>>>>> ca6e274e713eb024698f96f05891cb2affb9ba12
              </Box>
            </Grid>
          </Grid>
        )}
      </Box>
    </Container>
  );
};

<<<<<<< HEAD
export default Cart;
=======
export default Cart;
>>>>>>> ca6e274e713eb024698f96f05891cb2affb9ba12
