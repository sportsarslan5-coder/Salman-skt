import React from 'react';
import { AppProvider, useAppContext } from './context/AppContext';
import Layout from './components/Layout';
import Home from './pages/Home';
import Shop from './pages/Shop';
import ProductDetails from './pages/ProductDetails';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Blog from './pages/Blog';
import Contact from './pages/Contact';
import AutoPricing from './pages/AutoPricing';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import AIStylist from './components/AIStylist';

const AppContent: React.FC = () => {
  const { route, isAdmin } = useAppContext();
  const path = route.split('?')[0];

  // Admin Routes
  if (path === '/admin/login') return <AdminLogin />;
  if (path === '/admin') {
    return isAdmin ? <AdminDashboard /> : <AdminLogin />;
  }

  // Common Layout wrapping for public routes
  return (
    <Layout>
      {(() => {
        if (path === '/' || path === '') return <Home />;
        if (path === '/shop') return <Shop />;
        if (path === '/smart-pricing') return <AutoPricing />;
        if (path === '/cart') return <Cart />;
        if (path === '/checkout') return <Checkout />;
        if (path === '/blog') return <Blog />;
        if (path === '/contact') return <Contact />;
        if (path.startsWith('/product/')) return <ProductDetails />;
        return <Home />;
      })()}
    </Layout>
  );
};

const App: React.FC = () => {
  return (
    <AppProvider>
      <AppContent />
      <AIStylist />
    </AppProvider>
  );
};

export default App;