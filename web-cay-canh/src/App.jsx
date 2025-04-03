import React from 'react';
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
  return (
    <ThemeProvider theme={theme}>
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
          </Routes>
          <Footer />
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
