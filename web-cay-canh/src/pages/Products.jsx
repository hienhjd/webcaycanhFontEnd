import React, { useState } from 'react';
import { Box, Container, Typography, Grid, Card, CardMedia, CardContent, Button, TextField, MenuItem, Pagination } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { Link } from 'react-router-dom';
import product1 from '../assets/img/Cay anh van phong/1.jpg';
import product2 from '../assets/img/Cay anh van phong/2.jpg';
import product3 from '../assets/img/Cay anh van phong/3.jpg';
import product4 from '../assets/img/Cay anh van phong/4.jpg';

const Products = () => {
  const [sortBy, setSortBy] = useState('newest');
  const [page, setPage] = useState(1);

  const products = [
    {
      id: 1,
      image: product1,
      title: 'Cây string of heart',
      price: '90.000 ₫ - 550.000 ₫',
      description: 'Cây string of heart với dáng nhỏ xinh, mọc rủ và rất dễ sống nên rất được ưa chuộng trong việc trang trí.'
    },
    {
      id: 2,
      image: product2,
      title: 'Cây đuôi chồn',
      price: '120.000 ₫ - 600.000 ₫',
      description: 'Cây đuôi chồn với hình dáng độc đáo, thích hợp trang trí văn phòng và nhà ở.'
    },
    {
      id: 3,
      image: product3,
      title: 'Cây thường xuân',
      price: '80.000 ₫ - 400.000 ₫',
      description: 'Cây thường xuân là loại cây leo đẹp, dễ chăm sóc và có khả năng lọc không khí tốt.'
    },
    {
      id: 4,
      image: product4,
      title: 'Cây đa búp đỏ',
      price: '150.000 ₫ - 800.000 ₫',
      description: 'Cây đa búp đỏ với màu sắc đặc trưng, mang lại may mắn và tài lộc cho gia chủ.'
    }
  ];

  const categories = [
    'Tất cả sản phẩm',
    'Cây văn phòng',
    'Tiểu cảnh terrarium',
    'Chậu cây cảnh',
    'Sen đá',
    'Xương rồng',
    'Quà tặng doanh nghiệp',
    'Cây nội thất'
  ];

  return (
    <Container maxWidth="xl">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          SẢN PHẨM
        </Typography>

        {/* Filters */}
        <Box sx={{ display: 'flex', gap: 2, mb: 4 }}>
          <TextField
            select
            label="Sắp xếp theo"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            sx={{ minWidth: 200 }}
          >
            <MenuItem value="newest">Mới nhất</MenuItem>
            <MenuItem value="price_asc">Giá tăng dần</MenuItem>
            <MenuItem value="price_desc">Giá giảm dần</MenuItem>
          </TextField>

          <TextField
            select
            label="Danh mục"
            defaultValue="all"
            sx={{ minWidth: 200 }}
          >
            {categories.map((category) => (
              <MenuItem key={category} value={category.toLowerCase()}>
                {category}
              </MenuItem>
            ))}
          </TextField>
        </Box>

        {/* Products Grid */}
        <Grid container spacing={4}>
          {products.map((product) => (
            <Grid item xs={12} sm={6} md={3} key={product.id}>
              <Card 
                component={Link} 
                to={`/product/${product.id}`}
                sx={{ 
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  textDecoration: 'none',
                  '&:hover': {
                    boxShadow: 6
                  }
                }}
              >
                <CardMedia
                  component="img"
                  height="200"
                  image={product.image}
                  alt={product.title}
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography gutterBottom variant="h6" component="h3">
                    {product.title}
                  </Typography>
                  {product.description && (
                    <Typography variant="body2" color="text.secondary" paragraph>
                      {product.description}
                    </Typography>
                  )}
                  {product.price && (
                    <Typography variant="h6" color="primary">
                      {product.price}
                    </Typography>
                  )}
                </CardContent>
                <Box sx={{ p: 2 }}>
                  <Button 
                    variant="contained" 
                    fullWidth
                    endIcon={<ArrowForwardIcon />}
                  >
                    {product.price ? 'LỰA CHỌN CÁC TUỲ CHỌN' : 'ĐỌC TIẾP'}
                  </Button>
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Pagination */}
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <Pagination 
            count={10} 
            page={page} 
            onChange={(e, value) => setPage(value)}
            color="primary"
          />
        </Box>
      </Box>
    </Container>
  );
};

export default Products; 