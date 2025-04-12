<<<<<<< HEAD
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Container, Typography, Grid, Snackbar, Alert, Button } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { GetApi } from '../Util/ApiConfig';
import { useCart } from '../context/CartContext';

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [showNotification, setShowNotification] = useState(false);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const data = await GetApi({ path: "/product/getAll" });
        if (data) {
          const foundProduct = data.find(item => item.idProduct === id);
          if (foundProduct) {
            setProduct(foundProduct);
          }
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    if (!product) return;

    const cartItem = {
      id: product.idProduct,
      productId: product.idProduct,
      title: product.productName,
      price: product.price,
      quantity: quantity,
      image: product.url,
    };

    addToCart(cartItem);
    setShowNotification(true);
  };

  const handleIncreaseQuantity = () => {
    setQuantity(prev => prev + 1);
  };

  const handleDecreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };

  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value > 0) {
      setQuantity(value);
    }
  };

  if (loading) {
    return (
      <Container>
        <Typography>Loading...</Typography>
      </Container>
    );
  }

  if (!product) {
    return (
      <Container maxWidth="xl">
        <Typography variant="h6" align="center" sx={{ my: 4 }}>
          Sản phẩm không tồn tại. Vui lòng kiểm tra lại ID: {id}
        </Typography>
      </Container>
    );
  }

=======
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Container, Typography, Grid, Button, TextField, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import product1 from '../assets/img/Cay anh van phong/1.jpg';
import product2 from '../assets/img/Cay anh van phong/2.jpg';
import product3 from '../assets/img/Cay anh van phong/3.jpg';

const ProductDetail = () => {
  const { id } = useParams();
  const [quantity, setQuantity] = useState(1);
  const [selectedOption, setSelectedOption] = useState('');

  // Thông tin sản phẩm (giả lập API)
  const product = {
    id: 1,
    title: 'Cây string of heart',
    price: '90.000 ₫ - 550.000 ₫',
    description: 'Cây string of heart với dáng nhỏ xinh, mọc rủ và rất dễ sống nên rất được ưa chuộng trong việc trang trí.',
    images: [
      product1,
      product2,
      product3
    ],
    options: [
      { id: 1, name: 'Nhỏ', price: '90.000 ₫' },
      { id: 2, name: 'Vừa', price: '250.000 ₫' },
      { id: 3, name: 'Lớn', price: '550.000 ₫' }
    ],
    details: {
      care: 'Dễ chăm sóc',
      light: 'Ánh sáng gián tiếp',
      water: 'Tưới nước 1-2 lần/tuần',
      temperature: '20-30°C'
    }
  };

  // 👉 Hàm thêm vào localStorage
  const handleAddToCart = () => {
    if (!selectedOption) {
      alert('Vui lòng chọn kích thước!');
      return;
    }

    const selected = product.options.find(opt => opt.id === selectedOption);
    const price = parseInt(selected.price.replace(/\D/g, ''));

    const cartItem = {
      id: `${product.id}-${selectedOption}`,
      productId: product.id,
      title: product.title,
      option: selected.name,
      price: price,
      quantity: quantity,
      image: product.images[0]
    };

    const existingCart = JSON.parse(localStorage.getItem('cart')) || [];
    const existingIndex = existingCart.findIndex(item => item.id === cartItem.id);

    if (existingIndex >= 0) {
      existingCart[existingIndex].quantity += quantity;
    } else {
      existingCart.push(cartItem);
    }

    localStorage.setItem('cart', JSON.stringify(existingCart));
    alert('Đã thêm vào giỏ hàng!');
  };

>>>>>>> ca6e274e713eb024698f96f05891cb2affb9ba12
  return (
    <Container maxWidth="xl">
      <Box sx={{ my: 4 }}>
        <Grid container spacing={4}>
<<<<<<< HEAD
          <Grid item xs={12} md={6}>
            <Box sx={{ position: 'relative' }}>
              <img
                src={product.url}
                alt={product.productName}
                style={{ width: '100%', height: 'auto', borderRadius: '8px' }}
              />
            </Box>
          </Grid>

          <Grid item xs={12} md={6}>
            <Typography variant="h4" gutterBottom>
              {product.productName}
            </Typography>
            <Typography variant="h5" color="primary" gutterBottom>
              {product.price.toLocaleString('vi-VN')} VNĐ
            </Typography>
            <Typography paragraph>{product.description}</Typography>

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 4 }}>
              <Typography>Số lượng:</Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', border: '1px solid #ccc', borderRadius: '4px' }}>
                <Button
                  onClick={handleDecreaseQuantity}
                  sx={{ minWidth: '40px', height: '40px' }}
                  disabled={quantity <= 1}
                >
                  <RemoveIcon />
                </Button>
                <input
                  type="number"
                  value={quantity}
                  onChange={handleQuantityChange}
                  min="1"
                  style={{
                    width: '60px',
                    height: '40px',
                    textAlign: 'center',
                    border: 'none',
                    outline: 'none',
                    fontSize: '16px'
                  }}
                />
                <Button
                  onClick={handleIncreaseQuantity}
                  sx={{ minWidth: '40px', height: '40px' }}
                >
                  <AddIcon />
                </Button>
              </Box>
            </Box>

            <Button
              variant="contained"
              startIcon={<ShoppingCartIcon />}
              size="large"
              fullWidth
              onClick={handleAddToCart}
              sx={{ mb: 4 }}
            >
              Thêm vào giỏ hàng
            </Button>
          </Grid>
        </Grid>
      </Box>

      <Snackbar
        open={showNotification}
        autoHideDuration={3000}
        onClose={() => setShowNotification(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert onClose={() => setShowNotification(false)} severity="success" sx={{ width: '100%' }}>
          Đã thêm sản phẩm vào giỏ hàng!
        </Alert>
      </Snackbar>
=======
          {/* Hình ảnh sản phẩm */}
          <Grid item xs={12} md={6}>
            <Box sx={{ position: 'relative' }}>
              <img
                src={product.images[0]}
                alt={product.title}
                style={{ width: '100%', height: 'auto', borderRadius: '8px' }}
              />
              <Box sx={{ display: 'flex', gap: 1, mt: 2 }}>
                {product.images.map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt={`${product.title} ${index + 1}`}
                    style={{ width: '80px', height: '80px', objectFit: 'cover', borderRadius: '4px', cursor: 'pointer' }}
                  />
                ))}
              </Box>
            </Box>
          </Grid>

          {/* Thông tin sản phẩm */}
          <Grid item xs={12} md={6}>
            <Typography variant="h4" gutterBottom>
              {product.title}
            </Typography>
            <Typography variant="h5" color="primary" gutterBottom>
              {product.price}
            </Typography>
            <Typography paragraph>
              {product.description}
            </Typography>

            {/* Lựa chọn kích thước */}
            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel>Chọn kích thước</InputLabel>
              <Select
                value={selectedOption}
                onChange={(e) => setSelectedOption(e.target.value)}
                label="Chọn kích thước"
              >
                {product.options.map((option) => (
                  <MenuItem key={option.id} value={option.id}>
                    {option.name} - {option.price}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            {/* Số lượng */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
              <Typography>Số lượng:</Typography>
              <TextField
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                inputProps={{ min: 1 }}
                sx={{ width: 100 }}
              />
            </Box>

            {/* Nút hành động */}
            <Box sx={{ display: 'flex', gap: 2, mb: 4 }}>
              <Button
                variant="contained"
                startIcon={<ShoppingCartIcon />}
                size="large"
                fullWidth
                onClick={handleAddToCart}
              >
                Thêm vào giỏ hàng
              </Button>
              <Button variant="outlined" startIcon={<FavoriteIcon />} size="large">
                Yêu thích
              </Button>
              <Button variant="outlined" startIcon={<ShareIcon />} size="large">
                Chia sẻ
              </Button>
            </Box>

            {/* Chi tiết thêm */}
            <Box sx={{ mt: 4 }}>
              <Typography variant="h6" gutterBottom>
                Thông tin sản phẩm
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Typography><strong>Chăm sóc:</strong> {product.details.care}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography><strong>Ánh sáng:</strong> {product.details.light}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography><strong>Tưới nước:</strong> {product.details.water}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography><strong>Nhiệt độ:</strong> {product.details.temperature}</Typography>
                </Grid>
              </Grid>
            </Box>
          </Grid>
        </Grid>
      </Box>
>>>>>>> ca6e274e713eb024698f96f05891cb2affb9ba12
    </Container>
  );
};

export default ProductDetail;
