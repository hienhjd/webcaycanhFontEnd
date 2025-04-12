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

  return (
    <Container maxWidth="xl">
      <Box sx={{ my: 4 }}>
        <Grid container spacing={4}>
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
    </Container>
  );
};

export default ProductDetail;
