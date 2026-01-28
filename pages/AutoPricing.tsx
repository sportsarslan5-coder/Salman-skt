
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
                    `*Asset Detected:* ${result.productName}%0a` +
                    `*AI Valuation:* ${convertPrice(result.estimatedPriceUSD || 0)}%0a` +
                    `------------------%0a` +
                    `I analyzed this garment using your AI Lens. I'd like to discuss export options.`;
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${message}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-white py-20 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-24">
          <div className="inline-flex items-center gap-2 bg-gray-50 text-accent px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.4em] mb-8 border border-gray-100">
            <Zap size={14} /> SKT STUDIO INTELLIGENCE
          </div>
          <h1 className="text-6xl md:text-8xl font-display font-black text-dark uppercase mb-6 tracking-tighter">
            STUDIO <span className="text-accent italic">LENS</span>
          </h1>
          <p className="text-gray-400 max-w-xl mx-auto uppercase text-[10px] font-bold tracking-[0.3em] leading-loose opacity-80">
            A proprietary AI model trained on Sialkot's technical apparel standards. Identify fabric, stitching, and export-grade pricing via computer vision.
          </p>
        </div>

        {!selectedImage ? (
          <div 
            onClick={() => fileInputRef.current?.click()}
            className="aspect-[21/9] bg-gray-50 border-2 border-dashed border-gray-200 rounded-[3rem] flex flex-col items-center justify-center cursor-pointer hover:border-accent/40 transition-all group overflow-hidden relative shadow-sm"
          >
            <div className="p-10 bg-white rounded-3xl mb-8 shadow-sm group-hover:scale-105 transition-transform border border-gray-100">
              <Camera size={50} strokeWidth={1.5} className="text-gray-300 group-hover:text-accent transition-colors" />
            </div>
            <p className="text-dark font-black uppercase tracking-widest text-xs">Initialize Visual Scan</p>
            <p className="text-gray-400 text-[9px] mt-4 font-bold uppercase tracking-widest">Supports JPG, PNG, WEBP Assets</p>
            <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleImageUpload} />
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 animate-fade-in-up">
            {/* Visual Scan Area */}
            <div className="lg:col-span-6 relative rounded-[3rem] overflow-hidden bg-gray-50 border border-gray-100 aspect-square shadow-lg">
              <img src={selectedImage} className="w-full h-full object-cover" alt="Subject" />
              
              {analyzing && (
                <div className="absolute inset-0 bg-white/90 backdrop-blur-md flex flex-col items-center justify-center">
                  <div className="relative">
                    <div className="w-24 h-24 border-2 border-gray-100 border-t-accent rounded-full animate-spin"></div>
                    <div className="absolute inset-0 flex items-center justify-center text-accent">
                        <Activity size={32} className="animate-pulse" />
                    </div>
                  </div>
                  <h3 className="mt-10 text-dark font-black uppercase tracking-[0.4em] text-[10px]">Analyzing Stitch Topology...</h3>
                </div>
              )}

              <button 
                onClick={() => { setSelectedImage(null); setResult(null); }}
                className="absolute top-8 right-8 p-4 bg-white text-gray-400 rounded-full hover:text-red-500 transition-all border border-gray-100 shadow-lg"
              >
                <X size={20} />
              </button>
            </div>

            {/* Results Area */}
            <div className="lg:col-span-6 flex flex-col justify-center">
              {result ? (
                <div className="bg-white rounded-[3rem] p-12 animate-fade-in-up shadow-xl border border-gray-100 relative overflow-hidden">
                  <div className="absolute top-[-20px] right-[-20px] text-gray-50 opacity-10"><Zap size={150} /></div>
                  
                  <div className="mb-10 border-b border-gray-50 pb-8">
                    <span className="text-accent font-black uppercase text-[10px] tracking-widest mb-2 block">Detection Result</span>
                    <h2 className="text-4xl font-display font-black text-dark uppercase tracking-tight">{result.productName}</h2>
                  </div>

                  <div className="mb-10 bg-gray-50 p-8 rounded-2xl border border-gray-100">
                    <p className="text-gray-500 text-xs leading-relaxed font-bold uppercase tracking-tight italic">
                      {result.reasoning}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-6 mb-12">
                    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                        <span className="text-[9px] text-gray-400 font-black uppercase tracking-widest block mb-2">Export Valuation</span>
                        <span className="text-3xl font-display font-black text-dark">{convertPrice(result.estimatedPriceUSD || 0)}</span>
                    </div>
                    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                        <span className="text-[9px] text-gray-400 font-black uppercase tracking-widest block mb-2">Tech Complexity</span>
                        <span className="text-2xl font-black text-accent">{(result.complexityScore * 100).toFixed(0)}%</span>
                    </div>
                  </div>

                  <div className="flex flex-col gap-4">
                    <button 
                      onClick={handleWhatsAppInquiry}
                      className="w-full bg-dark text-white py-5 rounded-2xl font-black text-[10px] uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-accent transition-all shadow-lg"
                    >
                      <MessageCircle size={18} /> Request Studio Quote
                    </button>
                    <button 
                        onClick={() => {
                            addToCart({
                                id: 'ai-' + Date.now(),
                                title: result.productName,
                                category: result.category,
                                price: result.estimatedPriceUSD || 0,
                                image_url: selectedImage || '',
                                description: result.reasoning
                            }, 'M');
                            navigate('/cart');
                        }}
                        className="w-full bg-gray-50 text-dark py-5 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-gray-100 transition-all border border-gray-100"
                    >
                      Add Custom Draft to Bag
                    </button>
                  </div>
                </div>
              ) : !analyzing && (
                <div className="bg-gray-50 border border-gray-100 rounded-[3rem] p-16 text-center flex flex-col items-center justify-center h-full">
                  <Activity className="text-gray-200 mb-8" size={60} strokeWidth={1} />
                  <h3 className="text-2xl font-display font-black text-dark uppercase tracking-tight mb-4">Diagnostics Pending</h3>
                  <p className="text-gray-400 text-[10px] font-bold uppercase tracking-widest leading-loose max-w-xs opacity-60">
                    Upload an asset to trigger visual heuristics and studio data sync.
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
