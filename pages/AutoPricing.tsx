
import React, { useState, useRef } from 'react';
import { Sparkles, Loader2, Camera, MessageCircle, X, ShoppingCart, Zap, ArrowUpRight, ShieldCheck, Activity } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { analyzeProductImage, PricingAnalysis } from '../services/geminiService';
import { WHATSAPP_NUMBER } from '../constants';

const AutoPricing: React.FC = () => {
  const { convertPrice, addToCart, navigate } = useAppContext();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState<PricingAnalysis | null>(null);
  
  const [quantity, setQuantity] = useState(1);
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
    const message = `*AI LENS REPORT - SALMAN SKT*%0a` +
                    `*Product:* ${result.productName}%0a` +
                    `*AI Evaluation:* ${convertPrice(result.estimatedPriceUSD || 0)}%0a` +
                    `------------------%0a` +
                    `Greetings Salman SKT Team, I've used your AI Lens and wish to discuss manufacturing this garment.`;
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${message}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-black py-32 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Futuristic Header */}
        <div className="text-center mb-32 relative">
          <div className="absolute inset-0 bg-accent/5 blur-[120px] rounded-full pointer-events-none"></div>
          <div className="inline-flex items-center gap-3 glass text-accent px-8 py-3 rounded-full text-[10px] font-black uppercase tracking-[0.5em] mb-12 border border-accent/20 relative z-10">
            <Zap size={14} className="animate-pulse" /> SALMAN SKT_AI_LOGIC
          </div>
          <h1 className="text-7xl md:text-[10rem] font-display font-black text-white uppercase italic tracking-tighter mb-10 leading-[0.8] relative z-10">
            SMART <span className="text-accent shimmer-text">LENS</span>
          </h1>
          <p className="text-gray-500 max-w-2xl mx-auto uppercase text-[11px] font-bold tracking-[0.4em] leading-loose opacity-70 relative z-10">
            Proprietary heuristic analysis. Snap a photo of any garment to detect fabric GSM, technical stitching patterns, and export-grade pricing instantly.
          </p>
        </div>

        {!selectedImage ? (
          <div 
            onClick={() => fileInputRef.current?.click()}
            className="aspect-[21/9] bg-secondary/30 border-2 border-dashed border-white/5 rounded-[4rem] flex flex-col items-center justify-center cursor-pointer hover:border-accent/40 transition-all group overflow-hidden relative shadow-2xl"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="glass p-12 rounded-[3rem] mb-10 group-hover:scale-110 transition-transform group-hover:border-accent/20">
              <Camera size={60} strokeWidth={1} className="text-gray-600 group-hover:text-accent transition-colors" />
            </div>
            <p className="text-white font-black uppercase tracking-[0.5em] text-xs">Initialize Visual Scan</p>
            <p className="text-gray-700 text-[9px] mt-6 font-bold uppercase tracking-[0.5em]">Supports Raw & Rendered Apparel Assets</p>
            <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleImageUpload} />
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 animate-fade-in-up">
            {/* Visual Scan Area */}
            <div className="lg:col-span-7 relative rounded-[4rem] overflow-hidden bg-black border border-white/10 aspect-square lg:aspect-auto h-[600px]">
              <img src={selectedImage} className="w-full h-full object-cover opacity-60 grayscale-[0.5]" alt="To be analyzed" />
              
              {analyzing && (
                <div className="absolute inset-0 bg-black/80 backdrop-blur-xl flex flex-col items-center justify-center">
                  <div className="relative">
                    <div className="w-32 h-32 border-2 border-white/5 border-t-accent rounded-full animate-spin"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                        <Activity size={40} className="text-accent animate-pulse" />
                    </div>
                  </div>
                  <h3 className="mt-12 text-accent font-black uppercase tracking-[0.6em] text-[10px] shimmer-text">DECODING TEXTILE SIGNATURE...</h3>
                  {/* Cyber Line */}
                  <div className="absolute top-0 left-0 w-full h-4 bg-accent/40 shadow-[0_0_50px_rgba(255,215,0,0.8)] animate-scan-line z-30 blur-[2px]"></div>
                </div>
              )}

              <button 
                onClick={() => { setSelectedImage(null); setResult(null); }}
                className="absolute top-12 right-12 p-6 glass text-white rounded-full hover:bg-red-500/20 hover:text-red-500 transition-all border border-white/10"
              >
                <X size={24} />
              </button>
            </div>

            {/* Analysis Results */}
            <div className="lg:col-span-5 flex flex-col h-full">
              {result ? (
                <div className="glass rounded-[4rem] p-12 flex-grow animate-fade-in-up shadow-2xl border border-white/10 relative overflow-hidden">
                  <div className="absolute -top-10 -right-10 opacity-5 pointer-events-none"><Zap size={200} /></div>
                  
                  <div className="flex justify-between items-start mb-12 relative z-10">
                    <div>
                      <span className="text-accent font-black uppercase text-[10px] tracking-[0.5em] mb-4 block">Analysis Complete</span>
                      <h2 className="text-5xl font-display font-black text-white uppercase italic tracking-tighter">{result.productName}</h2>
                    </div>
                  </div>

                  <div className="bg-black/40 rounded-3xl p-8 border border-white/5 mb-10 relative z-10">
                    <p className="text-gray-400 text-sm leading-relaxed font-medium uppercase tracking-tighter">
                      {result.reasoning}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-12 relative z-10">
                    <div className="glass p-8 rounded-3xl border border-white/5">
                        <span className="text-[10px] text-gray-500 font-black uppercase tracking-widest block mb-4">Export Estimate</span>
                        <span className="text-4xl font-display font-black text-white italic tracking-tighter">{convertPrice(result.estimatedPriceUSD || 0)}</span>
                    </div>
                    <div className="glass p-8 rounded-3xl border border-white/5">
                        <span className="text-[10px] text-gray-500 font-black uppercase tracking-widest block mb-4">Tech Metrics</span>
                        <div className="flex items-center justify-between">
                            <span className="text-xs font-black text-accent">COMPLEXITY</span>
                            <span className="text-lg font-black text-white">{(result.complexityScore * 100).toFixed(0)}%</span>
                        </div>
                    </div>
                  </div>

                  <div className="space-y-6 relative z-10">
                    <button 
                      onClick={handleWhatsAppInquiry}
                      className="w-full bg-accent text-black py-7 rounded-[2rem] font-black text-[11px] uppercase tracking-[0.4em] flex items-center justify-center gap-4 hover:bg-white transition-all shadow-[0_20px_60px_rgba(255,215,0,0.2)]"
                    >
                      <MessageCircle size={22} /> Request Studio Quote
                    </button>
                    <button 
                        onClick={() => {
                            addToCart({
                                id: 'ai-gen-' + Date.now(),
                                title: result.productName,
                                category: result.category,
                                price: result.estimatedPriceUSD || 60,
                                image_url: selectedImage || '',
                                description: result.reasoning,
                                isProtex: true
                            }, 'M', quantity);
                            navigate('/cart');
                        }}
                        className="w-full glass text-white py-7 rounded-[2rem] font-black text-[11px] uppercase tracking-[0.4em] hover:bg-white/10 transition-all flex items-center justify-center gap-3"
                    >
                      Deploy Draft To Cart <ArrowUpRight size={18} />
                    </button>
                  </div>
                </div>
              ) : (
                <div className="bg-secondary/20 border border-white/5 border-dashed rounded-[4rem] p-16 flex flex-col items-center justify-center text-center h-full">
                  <div className="w-24 h-24 glass rounded-full flex items-center justify-center mb-12 border border-white/10">
                    <Activity className="text-gray-800" size={40} strokeWidth={1} />
                  </div>
                  <h3 className="text-2xl font-display font-black text-white uppercase tracking-tighter mb-8 italic">Ready For Diagnosis</h3>
                  <p className="text-gray-600 text-[10px] font-bold uppercase tracking-[0.6em] leading-loose max-w-xs opacity-50">
                    Upload a technical garment asset to trigger Salman SKT studio heuristics.
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AutoPricing;
