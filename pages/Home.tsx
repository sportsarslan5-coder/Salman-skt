
import React from 'react';
import { ArrowRight, ChevronRight, ShieldCheck, Zap, Package, Globe, Award, Settings } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import ProductCard from '../components/ProductCard';

const Home: React.FC = () => {
  const { products, isLoading, convertPrice } = useAppContext();
  const featuredProducts = products.slice(0, 4);

  if (isLoading) {
    return (
      <div className="h-screen bg-white flex flex-col items-center justify-center">
        <div className="loader mb-4"></div>
        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Calibrating Manufacturing Archive...</p>
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
                alt="Manufacturing Hub" 
                className="w-full h-full object-cover grayscale opacity-90 group-hover:grayscale-0 transition-all duration-1000"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent flex items-center px-10 md:px-24">
                <div className="max-w-xl animate-fade-in-right">
                    <span className="text-accent font-black uppercase tracking-[0.5em] text-[10px] mb-4 block">Professional Manufacturing_2025</span>
                    <h1 className="text-5xl md:text-8xl font-display font-black text-white leading-none mb-6 italic tracking-tighter uppercase">
                        Salman<br/><span className="text-accent">SKT</span>
                    </h1>
                    <p className="text-gray-300 text-xs md:text-sm mb-10 max-w-sm font-bold uppercase tracking-tight opacity-80">
                        Top quality manufacturer of team uniforms, activewear, and technical gear. From High School to Semi-Pro.
                    </p>
                    <a 
                      href="#/shop" 
                      className="inline-flex items-center gap-4 bg-accent text-white px-10 py-4 rounded-full font-black uppercase text-[10px] tracking-widest hover:bg-white hover:text-black transition-all shadow-[0_0_30px_rgba(255,215,0,0.3)] active:scale-95"
                    >
                      Browse Stock <ArrowRight size={16} />
                    </a>
                </div>
            </div>
            <div className="absolute top-8 right-8 flex flex-col gap-4">
               <div className="glass px-5 py-2 rounded-full border border-white/10 flex items-center gap-2">
                  <Award size={12} className="text-accent" />
                  <span className="text-[8px] font-black text-white uppercase tracking-widest">100% Quality Assurance</span>
               </div>
               <div className="glass px-5 py-2 rounded-full border border-white/10 flex items-center gap-2">
                  <Settings size={12} className="text-accent" />
                  <span className="text-[8px] font-black text-white uppercase tracking-widest">Custom Team Sublimation</span>
               </div>
            </div>
        </div>
      </div>

      {/* Grid Categories */}
      <div className="max-w-7xl mx-auto px-6 md:px-8 pb-24">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                  { name: "Team Uniforms", img: "https://images.unsplash.com/photo-1551854838-212c20b8c184?w=600&q=80", link: "/shop?category=Team Uniforms" },
                  { name: "Activewear", img: "https://images.unsplash.com/photo-1483721310020-03333e577078?w=600&q=80", link: "/shop?category=Active & Casual" },
                  { name: "Elite Shoes", img: "https://res.cloudinary.com/dc0ytviey/image/upload/v1769492135/untitled-1769491073282_tjzjlc.jpg", link: "/shop?category=Elite Shoes" },
                  { name: "Gear & Bags", img: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&q=80", link: "/shop?category=Gear & Bags" }
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
                    <span className="text-accent font-black uppercase tracking-[0.5em] text-[10px] mb-3 block">Export Grade Manufacturing</span>
                    <h2 className="text-4xl md:text-5xl font-display font-black text-gray-900 leading-none uppercase italic tracking-tighter">Current <span className="text-accent">Stock</span></h2>
                  </div>
                  <a href="#/shop" className="group text-gray-900 text-[10px] font-black uppercase tracking-[0.2em] flex items-center gap-3 border-b-2 border-transparent hover:border-accent pb-1 transition-all">
                    View Full Catalog <ChevronRight size={16} />
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
                      <Zap size={24} className="text-accent" />
                  </div>
                  <h4 className="font-display font-bold text-lg mb-3 uppercase tracking-tight">Technical Mastery</h4>
                  <p className="text-gray-400 text-[10px] font-bold uppercase tracking-widest leading-loose">Specializing in Sublimation, Tackle Twill, and Screen Printing for professional uniforms.</p>
              </div>
              <div className="flex flex-col items-center text-center">
                  <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center mb-6 shadow-sm border border-gray-200">
                      <Award size={24} className="text-accent" />
                  </div>
                  <h4 className="font-display font-bold text-lg mb-3 uppercase tracking-tight">100% Top Quality</h4>
                  <p className="text-gray-400 text-[10px] font-bold uppercase tracking-widest leading-loose">We manufacture every piece with industrial-grade precision and elite materials.</p>
              </div>
              <div className="flex flex-col items-center text-center">
                  <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center mb-6 shadow-sm border border-gray-200">
                      <Package size={24} className="text-accent" />
                  </div>
                  <h4 className="font-display font-bold text-lg mb-3 uppercase tracking-tight">Semi-Pro Certified</h4>
                  <p className="text-gray-400 text-[10px] font-bold uppercase tracking-widest leading-loose">Our gear meets the rigorous standards required for Youth, High School, and Semi-Pro athletics.</p>
              </div>
          </div>
      </div>
    </div>
  );
};

export default Home;
