import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material';
import Navbar from './components/Navbar';
import MenuComponent from './components/Menu.jsx';
import Banner from './components/Banner';
import Footer from './components/Footer';
import Home from './pages/Home';
import Products from './pages/Products';
import Knowledge from './pages/Knowledge';
import About from './pages/About';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Register from './pages/Register';
import Cart from './pages/Cart';
import ProductDetail from './pages/ProductDetail';
<<<<<<< HEAD
import Payment from './pages/Payment';
import AddressInput from './pages/AddressInput';
import ThankYouPage from './pages/ThankYouPage';
import UserInfo from './pages/UserInfo';
import { CartProvider } from './context/CartContext';

=======

import AddressInput from './pages/AddressInput';

import Checkout from './pages/CheckoutPage';
import CheckoutPage from './pages/CheckoutPage';
>>>>>>> ca6e274e713eb024698f96f05891cb2affb9ba12
const theme = createTheme({
  palette: {
    primary: {
      main: '#436d4d',
    },
    secondary: {
      main: '#f50057',
    },
  },
});

function App() {
    // useEffect(()=>{
    //   const fetchData = async () => {
    //     try {
    //       await ApiGetDat();
    //     } catch (error) {
    //       console.error('Error:', error.message);
    //     }
    //   };
  
    //   fetchData();
    // },[])
  return (
    <ThemeProvider theme={theme}>
<<<<<<< HEAD
      <CartProvider>
        <Router>
          <div className="App">
            <Navbar />
            <MenuComponent />
            <Banner />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/san-pham" element={<Products />} />
              <Route path="/kien-thuc" element={<Knowledge />} />
              <Route path="/gioi-thieu" element={<About />} />
              <Route path="/lien-he" element={<Contact />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/product/:id" element={<ProductDetail />} />
              <Route path="/userinfo" element={<UserInfo />} />
              <Route path="/nhapdiachi" element={<AddressInput />} />
              <Route path="/thanh-toan" element={<Payment />} />
              <Route path="/thanh-cong" element={<ThankYouPage />} />
            </Routes>
            <Footer />
          </div>
        </Router>
      </CartProvider>
=======
      <Router>
        <div className="App">
          <Navbar />
          <MenuComponent />
          <Banner />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/san-pham" element={<Products />} />
            <Route path="/kien-thuc" element={<Knowledge />} />
            <Route path="/gioi-thieu" element={<About />} />
            <Route path="/lien-he" element={<Contact />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/product/:id" element={<ProductDetail />} />

            <Route path="/nhapdiachi" element={<AddressInput />} />

            <Route path="/thanhtoan" element={<CheckoutPage />} />

          </Routes>
          <Footer />
        </div>
      </Router>
>>>>>>> ca6e274e713eb024698f96f05891cb2affb9ba12
    </ThemeProvider>
  );
}

export default App;
