
import React, { useState, useRef } from 'react';
import { Sparkles, Loader2, Camera, MessageCircle, X, ShoppingCart, Minus, Plus, Search, ChevronRight, Info, ShieldCheck, Zap } from 'lucide-react';
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
    const message = `*AI LENS REPORT - SIALKOT SHOP*%0a` +
                    `*Product:* ${result.productName}%0a` +
                    `*AI Price:* ${convertPrice(result.estimatedPriceUSD || 0)}%0a` +
                    `*Req. Size:* ${selectedSize}%0a` +
                    `*Qty:* ${quantity}%0a` +
                    `------------------%0a` +
                    `Bhai, I want to manufacture this item. Can you match this export quality?`;
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${message}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-black py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Futuristic Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 bg-accent/10 text-accent px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.4em] mb-10 border border-accent/20">
            <Zap size={14} /> Sialkot AI Hub
          </div>
          <h1 className="text-6xl md:text-8xl font-black text-white uppercase italic tracking-tighter mb-6 leading-none">
            SMART <span className="text-accent">LENS</span>
          </h1>
          <p className="text-gray-500 max-w-2xl mx-auto uppercase text-[10px] font-bold tracking-[0.3em] leading-loose opacity-70">
            Proprietary manufacturing analysis. Snap a photo of any garment to detect fabric GSM, stitching patterns, and export-grade pricing instantly.
          </p>
        </div>

        {!selectedImage ? (
          <div 
            onClick={() => fileInputRef.current?.click()}
            className="aspect-[21/9] bg-[#0a0a0a] border-2 border-dashed border-white/10 rounded-[4rem] flex flex-col items-center justify-center cursor-pointer hover:border-accent/50 transition-all group overflow-hidden relative shadow-2xl"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="bg-white/5 p-8 rounded-[2rem] mb-6 group-hover:scale-110 transition-transform">
              <Camera size={48} className="text-gray-600 group-hover:text-accent transition-colors" />
            </div>
            <p className="text-white font-black uppercase tracking-[0.4em] text-xs">Initialize Visual Scan</p>
            <p className="text-gray-700 text-[10px] mt-4 font-bold uppercase tracking-widest">Supports Global Apparel Formats</p>
            <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleImageUpload} />
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 animate-fade-in">
            {/* Visual Scan Area */}
            <div className="relative rounded-[3rem] overflow-hidden bg-[#0a0a0a] border border-white/10 aspect-square">
              <img src={selectedImage} className="w-full h-full object-cover opacity-60" alt="To be analyzed" />
              
              {analyzing && (
                <div className="absolute inset-0 bg-black/70 backdrop-blur-md flex flex-col items-center justify-center">
                  <div className="relative">
                    <div className="w-24 h-24 border-2 border-accent/10 border-t-accent rounded-full animate-spin"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                        <Sparkles size={32} className="text-accent animate-pulse" />
                    </div>
                  </div>
                  <h3 className="mt-8 text-accent font-black uppercase tracking-[0.5em] text-[10px]">Processing Fabric Data...</h3>
                  {/* Cyber Line */}
                  <div className="absolute top-0 left-0 w-full h-2 bg-accent shadow-[0_0_30px_rgba(255,215,0,1)] animate-scan-line z-30"></div>
                </div>
              )}

              <button 
                onClick={() => { setSelectedImage(null); setResult(null); }}
                className="absolute top-8 right-8 p-4 bg-black/80 text-white rounded-full hover:bg-red-500 transition-all backdrop-blur-md border border-white/10"
              >
                <X size={20} />
              </button>
            </div>

            {/* Analysis Results */}
            <div className="flex flex-col h-full">
              {result ? (
                <div className="bg-[#0a0a0a] border border-white/10 rounded-[3.5rem] p-10 flex-grow animate-fade-in-up shadow-2xl">
                  <div className="flex justify-between items-start mb-10">
                    <div>
                      <span className="text-accent font-black uppercase text-[10px] tracking-[0.4em] mb-4 block">Audit Result</span>
                      <h2 className="text-4xl font-black text-white uppercase italic tracking-tighter">{result.productName}</h2>
                    </div>
                    <div className="bg-white/5 border border-white/10 px-5 py-3 rounded-2xl text-center">
                      <div className="text-[9px] text-gray-500 font-bold uppercase mb-1">Stitch Intensity</div>
                      <div className="text-accent font-black text-lg">{(result.complexityScore * 100).toFixed(0)}%</div>
                    </div>
                  </div>

                  <div className="bg-white/5 rounded-3xl p-6 border border-white/10 mb-10">
                    <p className="text-gray-400 text-sm leading-relaxed font-medium">
                      {result.reasoning}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-6 mb-10">
                    <div className="bg-black/50 p-6 rounded-3xl border border-white/10">
                        <span className="text-[9px] text-gray-600 font-black uppercase tracking-widest block mb-2">Export Estimation</span>
                        <span className="text-3xl font-black text-white italic">{convertPrice(result.estimatedPriceUSD || 0)}</span>
                    </div>
                    <div className="bg-black/50 p-6 rounded-3xl border border-white/10">
                        <span className="text-[9px] text-gray-600 font-black uppercase tracking-widest block mb-2">Color Palette</span>
                        <div className="flex flex-wrap gap-2 mt-2">
                            {result.dominantColors.map(c => (
                                <span key={c} className="text-[8px] font-black uppercase text-accent bg-accent/10 border border-accent/20 px-2 py-1 rounded-full">{c}</span>
                            ))}
                        </div>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <button 
                      onClick={handleWhatsAppInquiry}
                      className="w-full bg-accent text-black py-6 rounded-2xl font-black text-xs uppercase tracking-[0.3em] flex items-center justify-center gap-4 hover:bg-white transition-all shadow-xl"
                    >
                      <MessageCircle size={20} /> Request Custom Quote
                    </button>
                    <button 
                        onClick={() => {
                            addToCart({
                                id: 'ai-gen-' + Date.now(),
                                title: result.productName,
                                category: result.category,
                                price: result.estimatedPriceUSD || 60,
                                image_url: selectedImage,
                                description: result.reasoning
                            }, selectedSize, quantity);
                            navigate('/cart');
                        }}
                        className="w-full bg-white/5 border border-white/10 text-white py-5 rounded-2xl font-black text-xs uppercase tracking-[0.3em] hover:bg-white/10 transition-all"
                    >
                      Add to Collection Draft
                    </button>
                  </div>
                </div>
              ) : (
                <div className="bg-[#050505] border border-white/5 rounded-[3.5rem] p-16 flex flex-col items-center justify-center text-center h-full border-dashed">
                  <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mb-10">
                    <Zap className="text-gray-800" size={40} />
                  </div>
                  <h3 className="text-2xl font-black text-white uppercase tracking-tighter mb-6">Initialize Hardware Scan</h3>
                  <p className="text-gray-600 text-[10px] font-bold uppercase tracking-[0.4em] leading-loose max-w-xs">
                    Upload an asset image to trigger real-time manufacturing heuristics.
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
          animation: scan-line 3s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default AutoPricing;
