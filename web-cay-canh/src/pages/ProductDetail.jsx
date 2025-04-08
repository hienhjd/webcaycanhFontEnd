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

  // This would typically come from an API
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

  return (
    <Container maxWidth="xl">
      <Box sx={{ my: 4 }}>
        <Grid container spacing={4}>
          {/* Product Images */}
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

          {/* Product Info */}
          <Grid item xs={12} md={6}>
            <Typography variant="h4" component="h1" gutterBottom>
              {product.title}
            </Typography>
            <Typography variant="h5" color="primary" gutterBottom>
              {product.price}
            </Typography>
            <Typography paragraph>
              {product.description}
            </Typography>

            {/* Product Options */}
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

            {/* Quantity */}
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

            {/* Action Buttons */}
            <Box sx={{ display: 'flex', gap: 2, mb: 4 }}>
              <Button
                variant="contained"
                startIcon={<ShoppingCartIcon />}
                size="large"
                fullWidth
              >
                Thêm vào giỏ hàng
              </Button>
              <Button
                variant="outlined"
                startIcon={<FavoriteIcon />}
                size="large"
              >
                Yêu thích
              </Button>
              <Button
                variant="outlined"
                startIcon={<ShareIcon />}
                size="large"
              >
                Chia sẻ
              </Button>
            </Box>

            {/* Product Details */}
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
    </Container>
  );
};

export default ProductDetail; 