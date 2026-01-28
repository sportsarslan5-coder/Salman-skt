
import React from 'react';
import { ArrowRight, ChevronRight, ShieldCheck, Zap, Package, Globe } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import ProductCard from '../components/ProductCard';

const Home: React.FC = () => {
  const { products, isLoading, convertPrice } = useAppContext();
  const featuredProducts = products.slice(0, 4);

  if (isLoading) {
    return (
      <div className="h-screen bg-white flex flex-col items-center justify-center">
        <div className="loader mb-4"></div>
        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Calibrating Studio Archive...</p>
      </div>
    );
  }

  return (
    <div className="animate-fade-in-up">
      {/* High-End Amazon Style Hero */}
      <div className="relative bg-white pt-6 pb-20 px-4 md:px-8">
        <div className="max-w-7xl mx-auto rounded-[2.5rem] overflow-hidden relative aspect-[21/9] md:aspect-[25/9] shadow-2xl group">
            <img 
                src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1600&q=80" 
                alt="Studio Banner" 
                className="w-full h-full object-cover grayscale opacity-90 group-hover:grayscale-0 transition-all duration-1000"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent flex items-center px-10 md:px-24">
                <div className="max-w-xl animate-fade-in-right">
                    <span className="text-accent font-black uppercase tracking-[0.5em] text-[10px] mb-4 block">New Protocol Drop_2025</span>
                    <h1 className="text-5xl md:text-8xl font-display font-black text-white leading-none mb-6 italic tracking-tighter uppercase">
                        Salman<br/><span className="text-accent">SKT</span>
                    </h1>
                    <p className="text-gray-300 text-xs md:text-sm mb-10 max-w-sm font-bold uppercase tracking-tight opacity-80">
                        Technical mastery meets global fashion. Sialkot's premiere export studio is now live.
                    </p>
                    <a 
                      href="#/shop" 
                      className="inline-flex items-center gap-4 bg-accent text-white px-10 py-4 rounded-full font-black uppercase text-[10px] tracking-widest hover:bg-white hover:text-black transition-all shadow-[0_0_30px_rgba(255,215,0,0.3)] active:scale-95"
                    >
                      Enter Catalog <ArrowRight size={16} />
                    </a>
                </div>
            </div>
            <div className="absolute top-8 right-8 flex gap-4">
               <div className="glass px-5 py-2 rounded-full border border-white/10 flex items-center gap-2">
                  <Globe size={12} className="text-accent" />
                  <span className="text-[8px] font-black text-white uppercase tracking-widest">Direct Global Export</span>
               </div>
            </div>
        </div>
      </div>

      {/* Grid Categories */}
      <div className="max-w-7xl mx-auto px-6 md:px-8 pb-24">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                  { name: "Men's Apparel", img: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=600&q=80", link: "/shop?category=Men's Fashion" },
                  { name: "Women's Apparel", img: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=600&q=80", link: "/shop?category=Women's Fashion" },
                  { name: "Technical Shoes", img: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&q=80", link: "/shop?category=Shoes" },
                  { name: "Studio Bags", img: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&q=80", link: "/shop?category=Accessories" }
              ].map((cat, i) => (
                  <a key={i} href={`#${cat.link}`} className="group relative aspect-square rounded-[2rem] overflow-hidden shadow-lg hover:shadow-2xl transition-all">
                      <img src={cat.img} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 grayscale-[0.2] group-hover:grayscale-0" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-8">
                          <h3 className="text-xl font-display font-black text-white uppercase italic tracking-tighter">{cat.name}</h3>
                      </div>
                  </a>
              ))}
          </div>

          {/* Section: Trending Assets */}
          <div className="mt-32">
              <div className="flex justify-between items-end mb-16 px-2">
                  <div>
                    <span className="text-accent font-black uppercase tracking-[0.5em] text-[10px] mb-3 block">Export Grade Inventory</span>
                    <h2 className="text-4xl md:text-5xl font-display font-black text-gray-900 leading-none uppercase italic tracking-tighter">Current <span className="text-accent">Favorites</span></h2>
                  </div>
                  <a href="#/shop" className="group text-gray-900 text-[10px] font-black uppercase tracking-[0.2em] flex items-center gap-3 border-b-2 border-transparent hover:border-accent pb-1 transition-all">
                    All Assets <ChevronRight size={16} />
                  </a>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {featuredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
          </div>
      </div>

      {/* Trust Metrics */}
      <div className="bg-gray-50 border-y border-gray-100 py-24">
          <div className="max-w-7xl mx-auto px-8 grid grid-cols-1 md:grid-cols-3 gap-16">
              <div className="flex flex-col items-center text-center">
                  <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center mb-6 shadow-sm border border-gray-200">
                      <ShieldCheck size={24} className="text-accent" />
                  </div>
                  <h4 className="font-display font-bold text-lg mb-3 uppercase tracking-tight">Export Authenticity</h4>
                  <p className="text-gray-400 text-[10px] font-bold uppercase tracking-widest leading-loose">All garments undergo a 12-point quality check before dispatch.</p>
              </div>
              <div className="flex flex-col items-center text-center">
                  <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center mb-6 shadow-sm border border-gray-200">
                      <Zap size={24} className="text-accent" />
                  </div>
                  <h4 className="font-display font-bold text-lg mb-3 uppercase tracking-tight">Sialkot Speed</h4>
                  <p className="text-gray-400 text-[10px] font-bold uppercase tracking-widest leading-loose">Direct factory logistics ensuring the fastest possible global delivery.</p>
              </div>
              <div className="flex flex-col items-center text-center">
                  <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center mb-6 shadow-sm border border-gray-200">
                      <Package size={24} className="text-accent" />
                  </div>
                  <h4 className="font-display font-bold text-lg mb-3 uppercase tracking-tight">Secure Finalization</h4>
                  <p className="text-gray-400 text-[10px] font-bold uppercase tracking-widest leading-loose">WhatsApp integration for personalized secure payment links.</p>
              </div>
          </div>
      </div>
    </div>
  );
};

export default Home;
