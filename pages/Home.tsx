import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ShieldCheck, Truck, Star, TrendingUp, Award } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { PRODUCTS } from '../constants';
import ProductCard from '../components/ProductCard';

const Home: React.FC = () => {
  const { t } = useAppContext();
  const featuredProducts = PRODUCTS.slice(0, 4); // Show 4 products for better grid balance

  return (
    <div className="overflow-x-hidden">
      {/* Hero Section */}
      <div className="relative h-[90vh] w-full bg-black overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent z-10"></div>
        <img 
          src="https://images.unsplash.com/photo-1552346154-21d32810aba3?q=80&w=2070&auto=format&fit=crop" 
          alt="Hero Sneaker" 
          className="w-full h-full object-cover object-center animate-scale-slow"
          style={{ animation: 'float 20s ease-in-out infinite alternate' }}
        />
        
        <div className="absolute inset-0 z-20 flex items-center px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto w-full">
            <div className="max-w-3xl space-y-8">
              <div className="inline-block bg-accent/20 backdrop-blur-sm border border-accent/30 text-accent px-4 py-1.5 rounded-full text-sm font-bold tracking-widest uppercase animate-fade-in-up">
                New Season 2025-2026
              </div>
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white tracking-tight leading-[1.1] animate-fade-in-up delay-100 drop-shadow-2xl">
                WALK ON <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-yellow-200">AIR & STYLE</span>
              </h1>
              <p className="text-lg md:text-2xl text-gray-300 font-light max-w-2xl animate-fade-in-up delay-200 border-l-4 border-accent pl-6">
                {t('heroSubtitle')}
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 pt-4 animate-fade-in-up delay-300">
                <Link 
                  to="/shop" 
                  className="inline-flex items-center justify-center bg-accent text-black px-10 py-4 rounded-full font-bold text-lg hover:bg-white transition-all transform hover:scale-105 shadow-[0_0_20px_rgba(255,215,0,0.4)]"
                >
                  {t('buyNow')} <ArrowRight className="ml-2" size={20} />
                </Link>
                <Link 
                  to="/shop?category=Men" 
                  className="inline-flex items-center justify-center bg-white/10 backdrop-blur-md border border-white/30 text-white px-10 py-4 rounded-full font-bold text-lg hover:bg-white hover:text-black transition-all"
                >
                  View Men's Collection
                </Link>
              </div>
            </div>
          </div>
        </div>
        
        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-20 text-white/50 animate-bounce">
           <div className="w-[1px] h-12 bg-gradient-to-b from-accent to-transparent mx-auto"></div>
        </div>
      </div>

      {/* Marquee Brands (Decorative) */}
      <div className="bg-accent py-4 overflow-hidden whitespace-nowrap relative">
        <div className="inline-block animate-marquee text-black font-bold text-lg tracking-widest uppercase">
           • Premium Quality • Free Shipping • 30 Day Returns • Secure Payment • 24/7 Support • Premium Quality • Free Shipping • 30 Day Returns • Secure Payment • 24/7 Support
        </div>
      </div>

      {/* Categories Section */}
      <div className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 space-y-4 animate-fade-in-up">
            <span className="text-accent font-bold tracking-widest uppercase text-sm">Find Your Style</span>
            <h2 className="text-4xl md:text-5xl font-black text-primary">SHOP BY CATEGORY</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 h-[600px] md:h-[500px]">
            {['Men', 'Women', 'Kids'].map((cat, index) => (
              <Link 
                to={`/shop?category=${cat}`} 
                key={cat} 
                className={`group relative overflow-hidden rounded-3xl cursor-pointer shadow-2xl h-full ${index === 1 ? 'md:-mt-8 md:mb-8' : ''}`}
              >
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors z-10"></div>
                <img 
                  src={
                    cat === 'Men' ? "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=800&q=80" :
                    cat === 'Women' ? "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&q=80" :
                    "https://images.unsplash.com/photo-1514989940723-78e071f5b771?w=800&q=80"
                  }
                  alt={cat}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute bottom-0 left-0 w-full p-8 z-20 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  <h2 className="text-4xl font-black text-white uppercase italic">{t(cat.toLowerCase())}</h2>
                  <div className="h-1 w-12 bg-accent mt-4 transition-all duration-500 group-hover:w-full"></div>
                  <p className="text-white/80 mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 text-sm">
                    Explore the latest collection
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Featured Products */}
      <div className="bg-secondary py-24 relative overflow-hidden">
        {/* Decorative Background Blobs */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
            <div>
                <div className="flex items-center gap-2 text-accent mb-2">
                    <TrendingUp size={20} />
                    <span className="font-bold uppercase tracking-wider text-sm">Hot Right Now</span>
                </div>
                <h2 className="text-4xl md:text-5xl font-black text-primary">{t('dealOfTheDay')}</h2>
            </div>
            <Link to="/shop" className="group flex items-center gap-2 font-bold text-primary hover:text-accent transition-colors border-b-2 border-transparent hover:border-accent pb-1">
              View All Products <ArrowRight size={20} className="transform group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredProducts.map((product, idx) => (
              <div key={product.id} className="animate-fade-in-up" style={{ animationDelay: `${idx * 100}ms` }}>
                 <ProductCard product={product} />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Trust Features - Modernized */}
      <div className="py-24 bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
            <div className="group p-8 rounded-3xl hover:bg-gray-50 transition-colors duration-500">
              <div className="w-20 h-20 bg-gray-100 group-hover:bg-accent/20 text-gray-800 group-hover:text-accent rounded-[2rem] flex items-center justify-center mb-6 mx-auto transition-colors duration-500">
                <Truck size={36} strokeWidth={1.5} />
              </div>
              <h3 className="font-bold text-xl mb-3">Global Express Delivery</h3>
              <p className="text-gray-500 leading-relaxed">From Sialkot to the world. We ensure your kicks arrive fresh and fast, tracked every step of the way.</p>
            </div>
            <div className="group p-8 rounded-3xl hover:bg-gray-50 transition-colors duration-500">
              <div className="w-20 h-20 bg-gray-100 group-hover:bg-accent/20 text-gray-800 group-hover:text-accent rounded-[2rem] flex items-center justify-center mb-6 mx-auto transition-colors duration-500">
                <Award size={36} strokeWidth={1.5} />
              </div>
              <h3 className="font-bold text-xl mb-3">Authentic Premium Quality</h3>
              <p className="text-gray-500 leading-relaxed">Hand-picked materials and superior craftsmanship. We guarantee authenticity on every pair.</p>
            </div>
            <div className="group p-8 rounded-3xl hover:bg-gray-50 transition-colors duration-500">
              <div className="w-20 h-20 bg-gray-100 group-hover:bg-accent/20 text-gray-800 group-hover:text-accent rounded-[2rem] flex items-center justify-center mb-6 mx-auto transition-colors duration-500">
                <ShieldCheck size={36} strokeWidth={1.5} />
              </div>
              <h3 className="font-bold text-xl mb-3">Secure Checkout</h3>
              <p className="text-gray-500 leading-relaxed">Shop with confidence. Your data is protected, and we offer hassle-free returns if you aren't 100% satisfied.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;