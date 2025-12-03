
import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Upload, Sparkles, Loader2, Camera, MessageCircle, X, Image as ImageIcon, ShoppingCart, Minus, Plus, Check } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { analyzeProductImage, PricingAnalysis } from '../services/geminiService';
import { WHATSAPP_NUMBER } from '../constants';
import { Product } from '../types';

const AutoPricing: React.FC = () => {
  const { t, convertPrice, addToCart } = useAppContext();
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState<PricingAnalysis | null>(null);
  const [error, setError] = useState<string | null>(null);
  
  // Order Configuration State
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState('M');
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setError('Please upload a valid image file.');
      return;
    }

    // Convert to base64 for display and API
    const reader = new FileReader();
    reader.onloadend = async () => {
      const base64String = reader.result as string;
      setSelectedImage(base64String);
      setResult(null);
      setError(null);
      setQuantity(1); // Reset quantity
      
      // Extract pure base64 for API (remove data:image/xxx;base64,)
      const base64Data = base64String.split(',')[1];
      const mimeType = file.type;

      analyzeImage(base64Data, mimeType);
    };
    reader.readAsDataURL(file);
  };

  const analyzeImage = async (base64Data: string, mimeType: string) => {
    setAnalyzing(true);
    try {
      const data = await analyzeProductImage(base64Data, mimeType);
      setResult(data);
    } catch (err) {
      setError('Failed to analyze image. Please try again.');
    } finally {
      setAnalyzing(false);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onloadend = async () => {
          const base64String = reader.result as string;
          setSelectedImage(base64String);
          setResult(null);
          setError(null);
          setQuantity(1);
          
          const base64Data = base64String.split(',')[1];
          const mimeType = file.type;
          analyzeImage(base64Data, mimeType);
        };
        reader.readAsDataURL(file);
    }
  };

  const handleAddToCart = () => {
    if (!result || !selectedImage) return;

    // Create a temporary "Custom" product object to fit the cart structure
    const customProduct: Product = {
        id: Date.now(), // Unique ID for this custom item
        name: `${result.category} (AI Identified)`,
        category: 'Men', // Defaulting to generic
        priceUSD: result.price,
        image: selectedImage,
        description: result.reasoning,
        sizes: ['S', 'M', 'L', 'XL'],
        rating: 5.0,
        reviews: 0
    };

    addToCart(customProduct, selectedSize, quantity);
    navigate('/cart');
  };

  const handleWhatsApp = () => {
    if (!result) return;
    const priceDisplay = convertPrice(result.price);
    const message = `*INQUIRY FROM SMART PRICING*%0a----------------------------%0aI uploaded an image and found this:%0a🏷️ Category: ${result.category}%0a💰 Est. Price: ${priceDisplay}%0a📏 Size: ${selectedSize}%0a📦 Qty: ${quantity}%0a✨ Note: ${result.reasoning}%0a----------------------------%0aIs this available?`;
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${message}`, '_blank');
  };

  const clearAll = () => {
    setSelectedImage(null);
    setResult(null);
    setError(null);
    setQuantity(1);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const sizes = ['S', 'M', 'L', 'XL'];

  return (
    <div className="min-h-screen bg-secondary py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12 animate-fade-in-up">
          <div className="inline-block p-3 rounded-full bg-black mb-4 shadow-xl">
             <Sparkles className="text-accent w-8 h-8" />
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-primary mb-4">SMART PRICING SYSTEM</h1>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto">
            Upload a photo. Our AI identifies the item, gives you a price, and lets you order immediately.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          {/* Upload Section */}
          <div 
            className={`bg-white rounded-3xl p-8 shadow-xl border-2 border-dashed transition-all duration-300 relative overflow-hidden h-[500px] flex flex-col items-center justify-center ${selectedImage ? 'border-accent' : 'border-gray-300 hover:border-gray-400'}`}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
          >
            {selectedImage ? (
               <>
                 <img src={selectedImage} alt="Uploaded" className="absolute inset-0 w-full h-full object-contain p-4 bg-gray-50" />
                 <button 
                    onClick={clearAll}
                    className="absolute top-4 right-4 bg-white/80 p-2 rounded-full hover:bg-red-50 hover:text-red-500 transition-colors shadow-sm z-20"
                 >
                    <X size={20} />
                 </button>
               </>
            ) : (
                <div className="text-center space-y-4">
                    <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto text-gray-400">
                        <Camera size={40} />
                    </div>
                    <div>
                        <p className="font-bold text-lg text-gray-700">Drag & Drop your Image</p>
                        <p className="text-sm text-gray-400 mt-1">or click to browse</p>
                    </div>
                    <button 
                        onClick={() => fileInputRef.current?.click()}
                        className="bg-black text-white px-8 py-3 rounded-full font-bold hover:bg-accent hover:text-black transition-all transform hover:scale-105"
                    >
                        Upload Photo
                    </button>
                </div>
            )}
            <input 
                type="file" 
                ref={fileInputRef}
                className="hidden" 
                accept="image/*"
                onChange={handleFileChange}
            />
            
            {/* Analyzing Overlay */}
            {analyzing && (
                <div className="absolute inset-0 bg-white/90 backdrop-blur-sm z-10 flex flex-col items-center justify-center">
                    <Loader2 className="w-12 h-12 text-accent animate-spin mb-4" />
                    <p className="font-bold text-lg animate-pulse">Analyzing Product...</p>
                    <p className="text-sm text-gray-500">Identifying category & estimating price</p>
                </div>
            )}
          </div>

          {/* Results Section */}
          <div className="space-y-6">
             {result ? (
                 <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100 animate-fade-in-up">
                    <div className="flex items-center gap-2 mb-6 text-green-600 bg-green-50 w-fit px-3 py-1 rounded-full text-sm font-bold">
                        <Sparkles size={16} /> AI Analysis Complete
                    </div>
                    
                    <div className="space-y-6">
                        {/* Header Info */}
                        <div>
                            <p className="text-sm text-gray-400 uppercase tracking-widest font-bold">Identified Item</p>
                            <h2 className="text-3xl font-black text-primary leading-tight">{result.category}</h2>
                            <p className="text-sm text-gray-600 italic mt-2">"{result.reasoning}"</p>
                        </div>

                        <div className="w-full h-px bg-gray-100"></div>

                        {/* Order Configuration Panel */}
                        <div className="space-y-4">
                            <h3 className="font-bold text-lg">Configure Order</h3>
                            
                            {/* Size Selector */}
                            <div>
                                <span className="text-xs text-gray-500 font-bold uppercase mb-2 block">Select Size</span>
                                <div className="flex gap-2">
                                    {sizes.map(size => (
                                        <button
                                            key={size}
                                            onClick={() => setSelectedSize(size)}
                                            className={`flex-1 py-2 rounded-lg text-sm font-bold transition-all ${
                                                selectedSize === size 
                                                ? 'bg-black text-white shadow-md' 
                                                : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                                            }`}
                                        >
                                            {size}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Quantity Selector */}
                            <div>
                                <span className="text-xs text-gray-500 font-bold uppercase mb-2 block">Quantity</span>
                                <div className="flex items-center justify-between bg-gray-50 p-2 rounded-xl border border-gray-100">
                                    <button 
                                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                        className="w-10 h-10 flex items-center justify-center bg-white rounded-lg shadow-sm hover:text-accent"
                                    >
                                        <Minus size={18} />
                                    </button>
                                    <span className="font-bold text-xl">{quantity}</span>
                                    <button 
                                        onClick={() => setQuantity(quantity + 1)}
                                        className="w-10 h-10 flex items-center justify-center bg-white rounded-lg shadow-sm hover:text-accent"
                                    >
                                        <Plus size={18} />
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className="w-full h-px bg-gray-100"></div>

                        {/* Price Display */}
                        <div className="flex justify-between items-end">
                            <div>
                                <p className="text-sm text-gray-400 font-bold">Total Price</p>
                                <p className="text-xs text-gray-400">{quantity} item(s) x {convertPrice(result.price)}</p>
                            </div>
                            <h2 className="text-4xl font-black text-accent">
                                {convertPrice(result.price * quantity)}
                            </h2>
                        </div>

                        {/* Actions */}
                        <div className="grid grid-cols-1 gap-3 pt-2">
                             <button 
                                onClick={handleAddToCart}
                                className="w-full bg-black text-white py-4 rounded-xl font-bold text-lg hover:bg-accent hover:text-black transition-all flex items-center justify-center gap-2 shadow-lg transform hover:scale-[1.02]"
                            >
                                <ShoppingCart size={20} /> Add to Cart / Order Now
                            </button>
                            <button 
                                onClick={handleWhatsApp}
                                className="w-full bg-green-50 text-green-600 py-3 rounded-xl font-bold text-sm hover:bg-green-100 transition-all flex items-center justify-center gap-2"
                            >
                                <MessageCircle size={18} /> Chat on WhatsApp
                            </button>
                        </div>
                    </div>
                 </div>
             ) : (
                <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 h-[500px] flex flex-col items-center justify-center text-center text-gray-400 border-dashed">
                    {error ? (
                        <>
                            <div className="w-16 h-16 bg-red-50 text-red-500 rounded-full flex items-center justify-center mb-4">
                                <X size={32} />
                            </div>
                            <p className="font-bold text-red-500">{error}</p>
                            <button onClick={() => fileInputRef.current?.click()} className="mt-4 underline text-sm">Try another image</button>
                        </>
                    ) : (
                        <>
                            <ImageIcon size={48} className="mb-4 opacity-20" />
                            <p>Upload an image to identify & order.</p>
                            <div className="mt-8 text-left text-sm space-y-2 opacity-60">
                                <p className="font-bold uppercase tracking-widest text-xs mb-2">How it works:</p>
                                <ul className="list-disc pl-4 space-y-1">
                                    <li>Upload Photo</li>
                                    <li>AI Identifies Item & Price</li>
                                    <li>Select Size & Quantity</li>
                                    <li>Order Directly</li>
                                </ul>
                            </div>
                        </>
                    )}
                </div>
             )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AutoPricing;
