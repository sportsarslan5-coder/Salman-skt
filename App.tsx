import React from 'react';
import * as ReactRouterDOM from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import Layout from './components/Layout';
import Home from './pages/Home';
import Shop from './pages/Shop';
import ProductDetails from './pages/ProductDetails';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Blog from './pages/Blog';
import Contact from './pages/Contact';
import AIStylist from './components/AIStylist';

// Bypass type checking for react-router-dom exports if they are missing in the environment's type definitions
const { HashRouter: Router, Routes, Route } = ReactRouterDOM as any;

const App: React.FC = () => {
  return (
    <AppProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </Layout>
        <AIStylist />
      </Router>
    </AppProvider>
  );
};

export default App;