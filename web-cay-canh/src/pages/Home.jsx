import React, { useState } from 'react';
import { Box, Container, Typography, Grid, Button, Card, CardMedia, CardContent } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { Link } from 'react-router-dom';
import banner4 from '../assets/img/banner/4.jpg';
import product1 from '../assets/img/product-new/1.jpg';
import product2 from '../assets/img/product-new/2.jpg';
import product3 from '../assets/img/product-new/3.jpg';
import product5 from '../assets/img/product-new/5.jpg';
import ExcelLikeTable from './ExcelLikeTable'; // Import Excel-like table component

const Home = () => {
  const newProducts = [
    {
      id: 1,
      image: product1,
      title: 'Cây string of heart(cây dây tim tím, vảy ốc tím, chuỗi tím,...)',
      description: ''
    },
    {
      id: 2,
      image: product2,
      title: 'Cây đuôi chồn (trúc đuôi chồn,...)',
      description: 'Lí do chúng có cái tên đặc biệt như vậy là bởi hình dáng cây. Các nhánh cây mọc dài vươn thẳng và có nhiều lá nhỏ hình kim, mọc dày, bông xù như đuôi của những con chồn.'
    },
    {
      id: 3,
      image: product3,
      title: 'Cây thường xuân',
      description: ''
    },
    {
      id: 4,
      image: product5,
      title: 'Cây đa búp đỏ',
      description: 'Cây đa từ xưa đến nay luôn là biểu tượng tốt đẹp tượng trưng cho làng quê Việt Nam. Nhưng đó là những cây cổ thụ, rất to lớn nên không tiện trồng trong nhà. Nhiều năm trở lại nhờ tiến bộ kỹ thuật các nhà khoa học đã cho ra những giống đa mới kích thước nhỏ với màu sắc sặc sỡ có tên là đa búp đỏ. Loại cây này đã được dưỡng nên rất dễ chăm sóc và có tính thẩm mỹ cao.'
    }
  ];

  const [isTableVisible, setIsTableVisible] = useState(false); // State to toggle Excel table visibility

  return (
    <Container maxWidth="xl">
      {/* Nút Hiển Thị Bảng Excel */}
      <Box sx={{ textAlign: 'center', my: 4 }}>
        <Button 
          variant="contained" 
          color="secondary" 
          onClick={() => setIsTableVisible(!isTableVisible)} 
          sx={{
            padding: '10px 20px',
            fontSize: '16px',
            fontWeight: 'bold',
            borderRadius: '8px',
            '&:hover': {
              backgroundColor: '#0d47a1',
            },
          }}
        >
          {isTableVisible ? 'Ẩn Bảng Excel' : 'Hiển Thị Bảng Excel'}
        </Button>
      </Box>

      {/* Hiển Thị Bảng Excel */}
      {isTableVisible && <ExcelLikeTable />}

      {/* About Section */}
      <Box sx={{ my: 8 }}>
        <Typography variant="h4" component="h2" align="center" gutterBottom sx={{ fontWeight: 700, color: '#1A73E8' }}>
          CHÚNG TÔI LÀ TOTORO GARDEN
        </Typography>
        <Box sx={{ display: 'flex', gap: 4, alignItems: 'center', flexDirection: { xs: 'column', md: 'row' } }}>
          <Box sx={{ flex: 1 }}>
            <img 
              src={banner4}
              alt="Totoro Garden" 
              style={{ width: '100%', height: 'auto', borderRadius: '12px', boxShadow: '0 6px 18px rgba(0, 0, 0, 0.1)' }}
            />
          </Box>
          <Box sx={{ flex: 1 }}>
            <Typography paragraph>
              <strong>Totoro Garden</strong> – Uy tín vươn xa là thương hiệu trong lĩnh vực cây cảnh mini, sen đá – xương rồng, cây nội thất tại Hà Nội. Ra đời từ năm 2017, tới nay <strong>Totoro Garden</strong> đã phục vụ 30.000+ khách hàng. Triết lý kinh doanh của chúng tôi là "Lan tỏa sức sống" và "Là bạn đồng hành" với khách hàng. Chúng tôi coi công việc của mình luôn mang lại màu xanh tươi cho cuộc sống và kiến tạo giá trị, sức sống cho mọi không gian mà chúng tôi bước tới. Sự tin tưởng của Quý khách hàng trong suốt thời gian qua là niềm tự hào và là động lực để <strong>Totoro Garden</strong> tiếp tục lớn mạnh và phát triển.
            </Typography>
            <Button 
              variant="contained" 
              endIcon={<ArrowForwardIcon />}
              component={Link}
              to="/gioi-thieu"
              sx={{ textTransform: 'none', backgroundColor: '#1A73E8', '&:hover': { backgroundColor: '#1c56b8' }, padding: '10px 20px', fontWeight: 'bold' }}
            >
              XEM CHI TIẾT
            </Button>
          </Box>
        </Box>
      </Box>

      {/* New Products Section */}
      <Box sx={{ my: 8 }}>
        <Typography variant="h4" component="h2" align="center" gutterBottom sx={{ fontWeight: 700, color: '#1A73E8' }}>
          SẢN PHẨM MỚI
        </Typography>
        <Grid container spacing={4}>
          {newProducts.map((product) => (
            <Grid item xs={12} sm={6} md={3} key={product.id}>
              <Card 
                component={Link} 
                to={`/product/${product.id}`}
                sx={{ 
                  height: '100%', 
                  display: 'flex', 
                  flexDirection: 'column', 
                  textDecoration: 'none', 
                  '&:hover': { boxShadow: '0px 12px 24px rgba(0, 0, 0, 0.2)', transform: 'scale(1.05)', transition: '0.3s' } 
                }}
              >
                <CardMedia
                  component="img"
                  height="200"
                  image={product.image}
                  alt={product.title}
                  sx={{ borderRadius: '8px' }}
                />
                <CardContent sx={{ flexGrow: 1, padding: '16px' }}>
                  <Typography gutterBottom variant="h6" component="h3" sx={{ fontWeight: 'bold' }}>
                    {product.title}
                  </Typography>
                  {product.description && (
                    <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.875rem' }}>
                      {product.description}
                    </Typography>
                  )}
                </CardContent>
                <Box sx={{ p: 2 }}>
                  <Button 
                    variant="contained" 
                    fullWidth
                    endIcon={<ArrowForwardIcon />}
                    sx={{ backgroundColor: '#1A73E8', '&:hover': { backgroundColor: '#1c56b8' } }}
                  >
                    ĐỌC TIẾP
                  </Button>
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>
        <Box sx={{ textAlign: 'center', mt: 4 }}>
          <Button 
            variant="outlined" 
            endIcon={<ArrowForwardIcon />}
            component={Link}
            to="/san-pham"
            sx={{ textTransform: 'none', color: '#1A73E8', borderColor: '#1A73E8', '&:hover': { borderColor: '#1c56b8', color: '#1c56b8' }, fontWeight: 'bold' }}
          >
            XEM TẤT CẢ
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default Home;
