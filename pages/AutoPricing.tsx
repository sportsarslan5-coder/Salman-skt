
import React, { useState, useRef, useEffect } from 'react';
import { Sparkles, Loader2, Camera, MessageCircle, X, Image as ImageIcon, ShoppingCart, Minus, Plus, Edit2, CheckCircle, ChevronDown, Palette, AlertCircle } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { analyzeProductImage, PricingAnalysis } from '../services/geminiService';
import { WHATSAPP_NUMBER } from '../constants';
import { Product } from '../types';

const AutoPricing: React.FC = () => {
  const { convertPrice, addToCart, navigate } = useAppContext();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState<PricingAnalysis | null>(null);
  
  // UX State
  const [isConfirmed, setIsConfirmed] = useState(false); 
  const [isEditingMode, setIsEditingMode] = useState(false);

  // Data State
  const [editableName, setEditableName] = useState('');
  const [currentCategory, setCurrentCategory] = useState('');
  const [currentColors, setCurrentColors] = useState<string[]>([]);
  const [currentPrice, setCurrentPrice] = useState(0);

  // Order Configuration State
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState('');
  const [availableSizes, setAvailableSizes] = useState<string[]>(['S', 'M', 'L', 'XL']);
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  // STRICT PRICING RULES (The Single Source of Truth)
  const STANDARD_PRICES: {[key: string]: number} = {
      'Jerseys': 45.00,
      'T-Shirts': 30.00,
      'Hoodies': 50.00,
      'Jackets': 80.00,
      'Shoes': 125.00,
      'Footballs': 45.00,
      'Cricket Bat': 85.00,
      'Caps': 15.00,
      'Custom': 50.00
  };

  const CATEGORY_OPTIONS = Object.keys(STANDARD_PRICES);

  // Sync result to state when analysis finishes
  useEffect(() => {
    if (result) {
        setEditableName(result.productName);
        
        // Normalize Category
        const normalizedCat = normalizeCategory(result.category);
        setCurrentCategory(normalizedCat);
        setCurrentColors(result.dominantColors || []);
        
        // SET EXACT PRICE based on Category
        const price = STANDARD_PRICES[normalizedCat] || 50.00;
        setCurrentPrice(price);
        
        // Reset Confirmation
        setIsConfirmed(false);
        setIsEditingMode(false);
    }
  }, [result]);

  // Helper to map AI category to our dropdown list
  const normalizeCategory = (cat: string): string => {
      if (!cat) return 'Custom';
      const c = cat.toLowerCase();
      // Priority Checks
      if (c.includes('shoe') || c.includes('sneaker') || c.includes('boot') || c.includes('footwear') || c.includes('trainer')) return 'Shoes';
      if (c.includes('jersey') || c.includes('kit') || c.includes('uniform')) return 'Jerseys';
      if (c.includes('hoodie') || c.includes('sweatshirt')) return 'Hoodies';
      if (c.includes('jacket') || c.includes('coat')) return 'Jackets';
      if (c.includes('ball') || c.includes('soccer')) return 'Footballs';
      if (c.includes('bat') || c.includes('cricket')) return 'Cricket Bat';
      if (c.includes('cap') || c.includes('hat')) return 'Caps';
      if (c.includes('shirt') || c.includes('tee')) return 'T-Shirts';
      return 'Custom';
  };

  // Update Size & Price when Category Changes
  useEffect(() => {
    if (currentCategory) {
        updateSizesForCategory(currentCategory);
        
        // FORCE UPDATE PRICE based on the selected category
        const price = STANDARD_PRICES[currentCategory];
        if (price) {
            setCurrentPrice(price);
        }
    }
  }, [currentCategory]);

  const updateSizesForCategory = (cat: string) => {
        let sizes: string[] = [];
        let defaultSize = '';

        if (cat === 'Shoes') {
            sizes = ['US 7', 'US 8', 'US 9', 'US 10', 'US 11', 'US 12'];
            defaultSize = 'US 9';
        } else if (cat === 'Cricket Bat') {
            sizes = ['Harrow', 'Short Handle', 'Long Handle'];
            defaultSize = 'Short Handle';
        } else if (cat === 'Footballs') {
            sizes = ['Standard Size 5'];
            defaultSize = 'Standard Size 5';
        } else if (cat === 'Caps') {
            sizes = ['One Size'];
            defaultSize = 'One Size';
        } else {
            // Default clothing
            sizes = ['S', 'M', 'L', 'XL', 'XXL'];
            defaultSize = 'M';
        }
        setAvailableSizes(sizes);
        setSelectedSize(defaultSize);
  };

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    processFile(file);
  };

  const processFile = (file: File) => {
    if (!file.type.startsWith('image/')) {
      alert('Please upload a valid image file (JPG, PNG).');
      return;
    }

    const reader = new FileReader();
    reader.onloadend = async () => {
      const base64String = reader.result as string;
      setSelectedImage(base64String);
      setResult(null);
      setQuantity(1);
      
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
      console.error("Critical Failure:", err);
      setAnalyzing(false);
    } finally {
      setAnalyzing(false);
    }
  };

  const handleAddToCart = () => {
    if (!selectedImage) return;

    const customProduct: Product = {
        id: Date.now(),
        name: editableName,
        category: 'Men', 
        priceUSD: currentPrice,
        image: selectedImage,
        description: `Color: ${currentColors.join(', ')}. Auto-identified item.`,
        sizes: availableSizes,
        rating: 5.0,
        reviews: 0
    };

    addToCart(customProduct, selectedSize, quantity);
    navigate('/cart');
  };

  const handleWhatsApp = () => {
    const priceDisplay = convertPrice(currentPrice);
    const colorStr = currentColors.join(', ');
    
    // Detailed WhatsApp Message
    const message = `*NEW ORDER REQUEST*%0a----------------------------%0aI want to order this exact item I just uploaded:%0a%0a🛍️ *${editableName}*%0a📂 Type: ${currentCategory}%0a🎨 *Color: ${colorStr}*%0a💰 Price: ${priceDisplay}%0a📏 Size: ${selectedSize}%0a📦 Quantity: ${quantity}%0a----------------------------%0a📷 *PLEASE SEE IMAGE ATTACHED*`;
    
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${message}`, '_blank');
  };

  const clearAll = () => {
    setSelectedImage(null);
    setResult(null);
    setQuantity(1);
    setEditableName('');
    setIsConfirmed(false);
    setIsEditingMode(false);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <div className="min-h-screen bg-secondary py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12 animate-fade-in-up">
          <div className="inline-block p-3 rounded-full bg-black mb-4 shadow-xl">
             <Sparkles className="text-accent w-8 h-8" />
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-primary mb-4">SMART PRICING SYSTEM</h1>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto">
            Auto-identify your product, confirm the details, and order instantly.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          {/* Upload Section */}
          <div 
            className={`bg-white rounded-3xl p-8 shadow-xl border-2 border-dashed transition-all duration-300 relative overflow-hidden h-[500px] flex flex-col items-center justify-center ${selectedImage ? 'border-accent' : 'border-gray-300 hover:border-gray-400'}`}
          >
            {selectedImage ? (
               <>
                 <img src={selectedImage} alt="Uploaded" className="absolute inset-0 w-full h-full object-contain p-4 bg-gray-50" />
                 <button 
                    onClick={clearAll}
                    className="absolute top-4 right-4 bg-white/80 p-2 rounded-full hover:bg-red-50 hover:text-red-500 transition-colors shadow-sm z-20"
                    title="Clear Image"
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
                        <p className="font-bold text-lg text-gray-700">Drag & Drop or Click</p>
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
                    <p className="font-bold text-lg animate-pulse">AI Identifying...</p>
                    <p className="text-sm text-gray-500">Reading Brands & Colors</p>
                </div>
            )}
          </div>

          {/* Results Section - The Smart Flow */}
          <div className="space-y-6">
             {result || (isEditingMode || isConfirmed) ? (
                 <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100 animate-fade-in-up relative overflow-hidden flex flex-col h-full min-h-[500px]">
                    
                    {/* Phase 1: Confirmation */}
                    {!isConfirmed && !isEditingMode && (
                        <div className="flex-1 flex flex-col justify-center text-center space-y-6">
                            <div className="mx-auto w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center">
                                <CheckCircle size={32} />
                            </div>
                            <div>
                                <h2 className="text-2xl font-bold mb-2">Analysis Complete</h2>
                                <p className="text-gray-500">We automatically identified:</p>
                            </div>
                            
                            <div className="bg-gray-50 rounded-xl p-4 text-left space-y-3 border border-gray-200">
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-500 text-sm">Product</span>
                                    <span className="font-bold text-right line-clamp-1">{editableName}</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-500 text-sm">Type</span>
                                    <span className="font-bold text-accent bg-black px-2 rounded text-xs py-0.5">{currentCategory}</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-500 text-sm flex items-center gap-1"><Palette size={14}/> Colors</span>
                                    <span className="font-bold line-clamp-1">{currentColors.join(', ')}</span>
                                </div>
                                <div className="flex justify-between border-t pt-2 mt-2">
                                    <span className="text-gray-500 text-sm">Base Price</span>
                                    <span className="font-bold text-xl text-primary">{convertPrice(currentPrice)}</span>
                                </div>
                            </div>

                            <div className="flex gap-3 mt-auto">
                                <button 
                                    onClick={() => setIsEditingMode(true)}
                                    className="flex-1 py-3 border border-gray-300 rounded-xl font-bold hover:bg-gray-50 text-gray-700"
                                >
                                    Correct This
                                </button>
                                <button 
                                    onClick={() => setIsConfirmed(true)}
                                    className="flex-1 py-3 bg-black text-white rounded-xl font-bold hover:bg-accent hover:text-black transition-colors"
                                >
                                    Looks Good
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Phase 1.5: Editing Mode */}
                    {isEditingMode && !isConfirmed && (
                         <div className="flex-1 flex flex-col space-y-4">
                            <div className="flex justify-between items-center mb-2">
                                <h3 className="font-bold text-lg">Edit Details</h3>
                                <button onClick={() => setIsEditingMode(false)} className="text-sm underline text-gray-500">Cancel</button>
                            </div>
                            
                            <div>
                                <label className="text-xs font-bold uppercase text-gray-500">Product Name</label>
                                <input 
                                    value={editableName}
                                    onChange={(e) => setEditableName(e.target.value)}
                                    className="w-full border p-3 rounded-lg font-bold"
                                />
                            </div>

                            <div>
                                <label className="text-xs font-bold uppercase text-gray-500">Category</label>
                                <div className="relative">
                                    <select 
                                        value={currentCategory}
                                        onChange={(e) => setCurrentCategory(e.target.value)}
                                        className="w-full border p-3 rounded-lg bg-white appearance-none"
                                    >
                                        {CATEGORY_OPTIONS.map(cat => (
                                            <option key={cat} value={cat}>{cat} (${STANDARD_PRICES[cat]})</option>
                                        ))}
                                    </select>
                                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={16} />
                                </div>
                            </div>
                            
                            <div>
                                <label className="text-xs font-bold uppercase text-gray-500">Detected Colors</label>
                                <input 
                                    value={currentColors.join(', ')}
                                    onChange={(e) => setCurrentColors(e.target.value.split(',').map(s => s.trim()))}
                                    className="w-full border p-3 rounded-lg bg-white"
                                />
                            </div>

                            <button 
                                onClick={() => {
                                    setIsEditingMode(false);
                                    setIsConfirmed(true);
                                }}
                                className="w-full bg-black text-white py-3 rounded-xl font-bold mt-auto"
                            >
                                Save & Continue
                            </button>
                         </div>
                    )}

                    {/* Phase 2: Configuration & Order (Only after confirmation) */}
                    {isConfirmed && (
                        <div className="flex flex-col h-full justify-between">
                            <div className="space-y-6">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <h2 className="text-2xl font-black leading-tight line-clamp-2">{editableName}</h2>
                                        <div className="flex flex-wrap gap-2 mt-2">
                                            <span className="text-xs bg-gray-100 px-2 py-1 rounded font-bold text-gray-600 border border-gray-200">{currentCategory}</span>
                                            {currentColors.map((c, i) => (
                                                <span key={i} className="text-xs bg-gray-100 px-2 py-1 rounded font-bold text-gray-600 border border-gray-200 flex items-center gap-1"><Palette size={10}/> {c}</span>
                                            ))}
                                        </div>
                                    </div>
                                    <button onClick={() => setIsConfirmed(false)} className="text-gray-400 hover:text-black"><Edit2 size={18} /></button>
                                </div>

                                <div className="w-full h-px bg-gray-100"></div>

                                {/* Size Selector */}
                                <div>
                                    <span className="text-xs text-gray-500 font-bold uppercase mb-2 block">Select Size</span>
                                    <div className="flex flex-wrap gap-2">
                                        {availableSizes.map(size => (
                                            <button
                                                key={size}
                                                onClick={() => setSelectedSize(size)}
                                                className={`flex-1 min-w-[50px] py-2 rounded-lg text-sm font-bold transition-all border ${
                                                    selectedSize === size 
                                                    ? 'bg-black text-white border-black shadow-md' 
                                                    : 'bg-white text-gray-600 border-gray-200 hover:border-black'
                                                }`}
                                            >
                                                {size}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Quantity */}
                                <div className="flex items-center justify-between bg-gray-50 p-3 rounded-xl border border-gray-100">
                                    <span className="font-bold text-gray-600 text-sm ml-2">Quantity</span>
                                    <div className="flex items-center gap-4">
                                        <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="w-8 h-8 flex items-center justify-center bg-white rounded shadow-sm"><Minus size={14} /></button>
                                        <span className="font-bold">{quantity}</span>
                                        <button onClick={() => setQuantity(quantity + 1)} className="w-8 h-8 flex items-center justify-center bg-white rounded shadow-sm"><Plus size={14} /></button>
                                    </div>
                                </div>

                                {/* Total */}
                                <div className="flex justify-between items-end pt-2">
                                    <span className="text-sm font-bold text-gray-400">Total Estimate</span>
                                    <h2 className="text-4xl font-black text-accent">{convertPrice(currentPrice * quantity)}</h2>
                                </div>
                            </div>

                            {/* Actions */}
                            <div className="grid grid-cols-1 gap-3 mt-6">
                                 <button 
                                    onClick={handleAddToCart}
                                    className="w-full bg-black text-white py-4 rounded-xl font-bold text-lg hover:bg-accent hover:text-black transition-all flex items-center justify-center gap-2 shadow-lg"
                                >
                                    <ShoppingCart size={20} /> Add to Cart
                                </button>
                                <button 
                                    onClick={handleWhatsApp}
                                    className="w-full bg-green-50 text-green-600 py-3 rounded-xl font-bold text-sm hover:bg-green-100 transition-all flex items-center justify-center gap-2 border border-green-200"
                                >
                                    <MessageCircle size={18} /> Confirm on WhatsApp
                                </button>
                                <div className="bg-yellow-50 p-2 rounded text-center border border-yellow-200">
                                    <p className="text-[10px] font-bold text-yellow-800 flex items-center justify-center gap-1">
                                        <AlertCircle size={12} />
                                        Important: Paste the image in WhatsApp chat!
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}
                 </div>
             ) : (
                // Empty State
                <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 h-[500px] flex flex-col items-center justify-center text-center text-gray-400 border-dashed">
                    <ImageIcon size={48} className="mb-4 opacity-20" />
                    <p>Upload an image to identify & order.</p>
                </div>
             )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AutoPricing;
