
import React, { useState, useRef } from 'react';
import { Sparkles, Loader2, Camera, MessageCircle, X, ShoppingCart, Minus, Plus, Search, ChevronRight, Info, ShieldCheck } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { analyzeProductImage, PricingAnalysis } from '../services/geminiService';
import { WHATSAPP_NUMBER } from '../constants';

const AutoPricing: React.FC = () => {
  const { convertPrice, addToCart, navigate } = useAppContext();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState<PricingAnalysis | null>(null);
  
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState('M');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = async () => {
      const base64 = (reader.result as string).split(',')[1];
      setSelectedImage(reader.result as string);
      setAnalyzing(true);
      setResult(null);

      try {
        const analysis = await analyzeProductImage(base64, file.type);
        setResult(analysis);
      } catch (err) {
        console.error(err);
      } finally {
        setAnalyzing(false);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleWhatsAppInquiry = () => {
    if (!result) return;
    const message = `*AI LENS INQUIRY - SIALKOT SHOP*%0a` +
                    `*Product:* ${result.productName}%0a` +
                    `*Estimated Price:* ${convertPrice(result.estimatedPriceUSD || 0)}%0a` +
                    `*Size Required:* ${selectedSize}%0a` +
                    `*Quantity:* ${quantity}%0a` +
                    `------------------%0a` +
                    `I saw this on your AI Lens. Can you provide this quality?`;
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${message}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-black py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-accent/10 text-accent px-4 py-2 rounded-full text-xs font-black uppercase tracking-[0.2em] mb-6 border border-accent/20">
            <Sparkles size={14} /> AI Powered Lens
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-white uppercase italic tracking-tighter mb-4">
            Smart Pricing<span className="text-accent"> Tool</span>
          </h1>
          <p className="text-gray-500 max-w-xl mx-auto uppercase text-[10px] font-bold tracking-widest leading-loose">
            Upload any apparel photo. Our AI analyzes fabric density, stitching complexity, and Sialkot export standards to give you a fair price.
          </p>
        </div>

        {!selectedImage ? (
          <div 
            onClick={() => fileInputRef.current?.click()}
            className="aspect-[16/9] md:aspect-[21/9] bg-[#0a0a0a] border-2 border-dashed border-white/10 rounded-[2.5rem] flex flex-col items-center justify-center cursor-pointer hover:border-accent/50 transition-all group overflow-hidden relative"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="bg-white/5 p-6 rounded-3xl mb-4 group-hover:scale-110 transition-transform">
              <Camera size={48} className="text-gray-500 group-hover:text-accent transition-colors" />
            </div>
            <p className="text-white font-black uppercase tracking-widest text-xs">Snap or Upload Photo</p>
            <p className="text-gray-600 text-[10px] mt-2 font-bold">JPG, PNG up to 10MB</p>
            <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleImageUpload} />
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 animate-fade-in">
            {/* Image Preview Area */}
            <div className="relative rounded-[2.5rem] overflow-hidden bg-[#111] border border-white/10 aspect-square lg:aspect-auto">
              <img src={selectedImage} className="w-full h-full object-cover" alt="To be analyzed" />
              
              {analyzing && (
                <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex flex-col items-center justify-center">
                  <div className="relative">
                    <div className="w-20 h-20 border-4 border-accent/20 border-t-accent rounded-full animate-spin"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                        <Sparkles size={24} className="text-accent animate-pulse" />
                    </div>
                  </div>
                  <h3 className="mt-6 text-accent font-black uppercase tracking-[0.3em] text-[10px]">Analyzing Stitching...</h3>
                  {/* Pulse Line */}
                  <div className="absolute top-0 left-0 w-full h-1 bg-accent/50 shadow-[0_0_15px_rgba(255,215,0,0.5)] animate-scan-line"></div>
                </div>
              )}

              <button 
                onClick={() => { setSelectedImage(null); setResult(null); }}
                className="absolute top-6 right-6 p-3 bg-black/50 text-white rounded-full hover:bg-red-500 transition-all"
              >
                <X size={20} />
              </button>
            </div>

            {/* Results Area */}
            <div className="flex flex-col h-full">
              {result ? (
                <div className="bg-[#111] border border-white/10 rounded-[2.5rem] p-8 flex-grow animate-fade-in-up">
                  <div className="flex justify-between items-start mb-8">
                    <div>
                      <span className="text-accent font-black uppercase text-[10px] tracking-widest mb-2 block">AI Detection: {result.category}</span>
                      <h2 className="text-3xl font-black text-white uppercase italic tracking-tighter">{result.productName}</h2>
                    </div>
                    <div className="bg-black border border-white/5 px-4 py-2 rounded-xl text-center">
                      <div className="text-[10px] text-gray-500 font-bold uppercase mb-1">Complexity</div>
                      <div className="text-accent font-black">{(result.complexityScore * 100).toFixed(0)}%</div>
                    </div>
                  </div>

                  <p className="text-gray-400 text-sm leading-relaxed mb-8 font-medium">
                    {result.reasoning}
                  </p>

                  <div className="grid grid-cols-2 gap-4 mb-8">
                    <div className="bg-black/50 p-4 rounded-2xl border border-white/5">
                        <span className="text-[9px] text-gray-600 font-bold uppercase block mb-1">Estimated Price</span>
                        <span className="text-xl font-black text-white">{convertPrice(result.estimatedPriceUSD || 0)}</span>
                    </div>
                    <div className="bg-black/50 p-4 rounded-2xl border border-white/5">
                        <span className="text-[9px] text-gray-600 font-bold uppercase block mb-1">Colors Found</span>
                        <div className="flex gap-1 mt-1">
                            {result.dominantColors.map(c => (
                                <span key={c} className="text-[8px] font-black uppercase text-accent border border-accent/20 px-1.5 py-0.5 rounded">{c}</span>
                            ))}
                        </div>
                    </div>
                  </div>

                  {/* Ordering Options */}
                  <div className="space-y-6 mb-10">
                    <div>
                      <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-3 block">Configure Item</label>
                      <div className="flex gap-2">
                        {['S', 'M', 'L', 'XL'].map(s => (
                          <button 
                            key={s} 
                            onClick={() => setSelectedSize(s)}
                            className={`flex-1 py-3 rounded-xl font-black text-xs transition-all ${selectedSize === s ? 'bg-accent text-black' : 'bg-black text-gray-400 border border-white/5'}`}
                          >
                            {s}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center justify-between bg-black p-4 rounded-2xl border border-white/5">
                        <span className="text-xs font-black uppercase text-gray-400">Quantity</span>
                        <div className="flex items-center gap-6">
                            <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="text-white hover:text-accent"><Minus size={18} /></button>
                            <span className="text-white font-black text-lg w-4 text-center">{quantity}</span>
                            <button onClick={() => setQuantity(quantity + 1)} className="text-white hover:text-accent"><Plus size={18} /></button>
                        </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-4">
                    <button 
                      onClick={handleWhatsAppInquiry}
                      className="w-full bg-green-500 text-white py-5 rounded-2xl font-black text-sm uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-green-600 transition-all shadow-lg"
                    >
                      <MessageCircle size={20} /> Inquire via WhatsApp
                    </button>
                    <button 
                        onClick={() => {
                            addToCart({
                                id: 'custom-' + Date.now(),
                                title: result.productName,
                                category: result.category,
                                price: result.estimatedPriceUSD || 55,
                                image_url: selectedImage,
                                description: result.reasoning
                            }, selectedSize, quantity);
                            navigate('/cart');
                        }}
                        className="w-full bg-white text-black py-4 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-accent transition-all"
                    >
                      Add to Cart (Draft)
                    </button>
                  </div>
                </div>
              ) : (
                <div className="bg-[#111] border border-white/10 rounded-[2.5rem] p-12 flex flex-col items-center justify-center text-center h-full">
                  <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mb-6">
                    <Info className="text-gray-600" size={32} />
                  </div>
                  <h3 className="text-xl font-black text-white uppercase tracking-tight mb-4">Awaiting Analysis</h3>
                  <p className="text-gray-500 text-xs font-bold uppercase tracking-widest leading-relaxed">
                    Once uploaded, our proprietary Sialkot AI will provide manufacturing insights and direct factory pricing.
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
      
      <style>{`
        @keyframes scan-line {
          0% { top: 0; }
          100% { top: 100%; }
        }
        .animate-scan-line {
          animation: scan-line 2s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default AutoPricing;
