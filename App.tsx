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
import AIStylist from './components/AIStylist';

const AppContent: React.FC = () => {
  const { route } = useAppContext();
  const path = route.split('?')[0];

  if (path === '/' || path === '') return <Home />;
  if (path === '/shop') return <Shop />;
  if (path === '/smart-pricing') return <AutoPricing />;
  if (path === '/cart') return <Cart />;
  if (path === '/checkout') return <Checkout />;
  if (path === '/blog') return <Blog />;
  if (path === '/contact') return <Contact />;
  if (path.startsWith('/product/')) return <ProductDetails />;
  
  return <Home />;
};

const App: React.FC = () => {
  return (
    <AppProvider>
      <Layout>
        <AppContent />
      </Layout>
      <AIStylist />
    </AppProvider>
  );
};

export default App;