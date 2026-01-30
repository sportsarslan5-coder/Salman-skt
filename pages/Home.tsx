
import React from 'react';
import { ArrowRight, ChevronRight, Zap, Star, ShieldCheck, Box, TrendingUp, Sparkles } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import ProductCard from '../components/ProductCard';

const Home: React.FC = () => {
  const { products, isLoading, convertPrice } = useAppContext();
  
  // Amazon-style filtered lists
  const stickJackets = products.filter(p => p.title.toLowerCase().includes('stick jacket')).slice(0, 5);
  const trendingShoes = products.filter(p => p.category === 'Elite Shoes').slice(0, 4);
  const featured = products.slice(0, 8);

  if (isLoading) {
    return (
      <div className="h-screen bg-white flex flex-col items-center justify-center">
        <div className="loader mb-4"></div>
        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">SYNCING STUDIO INVENTORY...</p>
      </div>
    );
  }

  return (
    <div className="animate-fade-in pb-20">
      {/* Dynamic Marketplace Hero */}
      <div className="relative bg-[#e3e6e6] overflow-hidden">
        <div className="max-w-[1600px] mx-auto relative h-[400px] md:h-[600px]">
          <img 
            src="https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=1600&q=80" 
            alt="Studio Collection" 
            className="w-full h-full object-cover grayscale opacity-80"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#e3e6e6] via-transparent to-black/30"></div>
          
          <div className="absolute top-10 left-4 md:top-24 md:left-12 max-w-lg z-10 animate-fade-in-right">
             <div className="bg-black/80 backdrop-blur-md p-8 md:p-12 border-l-4 border-accent shadow-2xl rounded-sm">
                <span className="text-accent font-black uppercase tracking-[0.4em] text-[10px] mb-2 block">Studio Exclusive Drop</span>
                <h1 className="text-4xl md:text-7xl font-display font-black text-white leading-[0.9] italic uppercase tracking-tighter mb-6">
                  Price &<br/><span className="text-accent italic">Depression</span>
                </h1>
                <p className="text-gray-300 text-[10px] md:text-xs font-bold uppercase tracking-widest mb-8 opacity-80 leading-relaxed">
                  The definitive technical stick jacket collection. Export-grade manufacturing meets urban industrial aesthetics.
                </p>
                <a 
                  href="#/shop?category=Active & Casual" 
                  className="inline-flex items-center gap-4 bg-accent text-black px-10 py-4 rounded-sm font-black uppercase text-[10px] tracking-widest hover:bg-white transition-all shadow-xl"
                >
                  Shop the Drop <ArrowRight size={16} />
                </a>
             </div>
          </div>
        </div>
      </div>

      {/* Amazon-Style Category Bubbles (Floating Over Hero) */}
      <div className="max-w-[1600px] mx-auto px-4 -mt-20 md:-mt-40 relative z-20">
         <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {[
              { name: "Stick Jackets", img: "https://res.cloudinary.com/dc0ytviey/image/upload/v1769747603/IMG_20241109_212720_166_tqlcub.jpg", link: "/shop?category=Active & Casual" },
              { name: "Team Gear", img: "https://images.unsplash.com/photo-1551854838-212c20b8c184?w=600&q=80", link: "/shop?category=Team Uniforms" },
              { name: "Archive Shoes", img: "https://res.cloudinary.com/dc0ytviey/image/upload/v1769492135/untitled-1769491073282_tjzjlc.jpg", link: "/shop?category=Elite Shoes" },
              { name: "Studio AI", img: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600&q=80", link: "/smart-pricing" }
            ].map((box, i) => (
              <div key={i} className="bg-white p-6 shadow-xl flex flex-col h-full group transition-all hover:-translate-y-1">
                 <h3 className="text-lg font-black uppercase tracking-tight text-dark mb-4 group-hover:text-accent transition-colors">{box.name}</h3>
                 <div className="aspect-square bg-gray-50 mb-6 overflow-hidden">
                    <img src={box.img} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                 </div>
                 <a href={`#${box.link}`} className="mt-auto text-[10px] font-black uppercase tracking-widest text-accent hover:text-dark">Explore Collection</a>
              </div>
            ))}
         </div>

         {/* Marketplace Sections */}
         
         {/* Carousel: Price & Depression Series */}
         <div className="mt-16 bg-white p-8 shadow-sm">
            <div className="flex items-center justify-between mb-8">
               <div className="flex items-center gap-3">
                  <TrendingUp className="text-accent" />
                  <h2 className="text-xl md:text-2xl font-black uppercase tracking-tighter">Trending: Price & Depression</h2>
               </div>
               <a href="#/shop" className="text-xs font-bold text-accent hover:underline uppercase tracking-widest">See all deals</a>
            </div>
            
            <div className="flex gap-6 overflow-x-auto no-scrollbar pb-4">
               {stickJackets.map(product => (
                 <div key={product.id} className="min-w-[240px] md:min-w-[300px] group">
                    <ProductCard product={product} />
                 </div>
               ))}
            </div>
         </div>

         {/* Grid: Recommended for USA Market */}
         <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-8 shadow-sm col-span-1 md:col-span-2">
               <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-black uppercase tracking-tighter">Inspired by your browsing</h2>
                  <Sparkles size={20} className="text-accent" />
               </div>
               <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {featured.slice(0, 4).map(p => (
                    <a key={p.id} href={`#/product/${p.id}`} className="block group">
                       <div className="aspect-square bg-gray-50 overflow-hidden mb-2">
                          <img src={p.image_url} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                       </div>
                       <p className="text-[10px] font-bold truncate opacity-60 uppercase">{p.title}</p>
                    </a>
                  ))}
               </div>
               <a href="#/shop" className="mt-8 block text-[10px] font-black uppercase text-accent tracking-widest">See more recommendations</a>
            </div>

            <div className="bg-accent p-8 shadow-xl flex flex-col justify-center text-black">
               <Zap size={40} className="mb-6" />
               <h3 className="text-2xl font-black uppercase tracking-tighter mb-4 italic leading-none">Studio Choice:<br/>Price 50$ Fixed</h3>
               <p className="text-xs font-bold uppercase tracking-widest mb-8 opacity-70">The most popular technical jackets globally exported.</p>
               <a href="#/shop?category=Active & Casual" className="bg-black text-white px-6 py-3 rounded-sm text-[10px] font-black uppercase tracking-widest hover:bg-white hover:text-black transition-all text-center">Get the Deal</a>
            </div>

            <div className="bg-[#131921] p-8 shadow-xl flex flex-col text-white">
               <ShieldCheck size={40} className="mb-6 text-accent" />
               <h3 className="text-2xl font-black uppercase tracking-tighter mb-4 italic leading-none">Global Studio<br/>Quality</h3>
               <p className="text-xs font-bold uppercase tracking-widest mb-8 opacity-70">100% Top Quality Sialkot manufacturing standards.</p>
               <a href="#/contact" className="mt-auto border-2 border-accent text-accent px-6 py-3 rounded-sm text-[10px] font-black uppercase tracking-widest hover:bg-accent hover:text-black transition-all text-center">Contact Factory</a>
            </div>
         </div>

         {/* High-End Catalog Row */}
         <div className="mt-12 bg-white p-8 shadow-sm">
            <div className="flex items-center justify-between mb-8">
               <h2 className="text-xl md:text-2xl font-black uppercase tracking-tighter">More from the Archive</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
               {featured.slice(4, 8).map(product => (
                 <ProductCard key={product.id} product={product} />
               ))}
            </div>
         </div>

      </div>

      {/* Trust Badges */}
      <div className="bg-gray-100/50 py-20 mt-20 border-t border-gray-200">
         <div className="max-w-[1200px] mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
            <div>
               <Box size={32} className="mx-auto mb-4 text-accent" />
               <h4 className="text-[10px] font-black uppercase tracking-widest mb-2">Global Shipping</h4>
               <p className="text-[9px] font-bold text-gray-500 uppercase">USA & Worldwide Delivery</p>
            </div>
            <div>
               <Star size={32} className="mx-auto mb-4 text-accent" />
               <h4 className="text-[10px] font-black uppercase tracking-widest mb-2">5-Star Standards</h4>
               <p className="text-[9px] font-bold text-gray-500 uppercase">Trusted by Semi-Pro Teams</p>
            </div>
            <div>
               <ShieldCheck size={32} className="mx-auto mb-4 text-accent" />
               <h4 className="text-[10px] font-black uppercase tracking-widest mb-2">Secure Link</h4>
               <p className="text-[9px] font-bold text-gray-500 uppercase">Direct Secure Finalization</p>
            </div>
            <div>
               <TrendingUp size={32} className="mx-auto mb-4 text-accent" />
               <h4 className="text-[10px] font-black uppercase tracking-widest mb-2">Sialkot Price</h4>
               <p className="text-[9px] font-bold text-gray-500 uppercase">Best Factory Evaluation</p>
            </div>
         </div>
      </div>
    </div>
  );
};

export default Home;
