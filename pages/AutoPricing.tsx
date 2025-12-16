import React, { useState, useRef, useEffect } from 'react';
import { Sparkles, Loader2, Camera, MessageCircle, X, Image as ImageIcon, ShoppingCart, Minus, Plus, Palette, Tag, Search, ArrowRight, HelpCircle, Info, CheckCircle2 } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { analyzeProductImage, PricingAnalysis } from '../services/geminiService';
import { WHATSAPP_NUMBER } from '../constants';
import { Product } from '../types';

const AutoPricing: React.FC = () => {
  const { convertPrice, addToCart, navigate } = useAppContext();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState<PricingAnalysis | null>(null);
  
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

  // --- STRICT FIXED PRICES (No Guessing) ---
  // If the product matches these categories, use THIS exact price.
  const SHOP_PRICES: {[key: string]: number} = {
      // Clothing
      'T-Shirts': 35,
      'Hoodies': 55,
      'Jerseys': 40,
      'Jackets': 85,
      'Tote Bags': 25,
      'Caps': 20,
      'Shoes': 125,
      
      // Sports Equipment
      'Footballs': 45,
      'Volleyball': 35,
      'Basketball': 55,
      'Cricket Bat': 95,
      'Gloves & Sports Gear': 40,
  };

  // Helper to map AI category to our dropdown list
  const normalizeCategory = (cat: string): string => {
      if (!cat) return 'Unknown';
      const c = cat.toLowerCase();
      
      // Exact Matches First
      for (const key of Object.keys(SHOP_PRICES)) {
          if (c === key.toLowerCase()) return key;
      }

      // Fuzzy Matches
      if (c.includes('shoe') || c.includes('sneaker') || c.includes('boot')) return 'Shoes';
      if (c.includes('jersey') || c.includes('kit') || c.includes('uniform')) return 'Jerseys';
      if (c.includes('hoodie') || c.includes('sweat')) return 'Hoodies';
      if (c.includes('jacket') || c.includes('coat') || c.includes('upper')) return 'Jackets';
      if (c.includes('bag') || c.includes('tote')) return 'Tote Bags';
      if (c.includes('cap') || c.includes('hat')) return 'Caps';
      if (c.includes('soccer') || c.includes('footballs')) return 'Footballs';
      if (c.includes('volley')) return 'Volleyball';
      if (c.includes('basket')) return 'Basketball';
      if (c.includes('cricket') || c.includes('bat')) return 'Cricket Bat';
      if (c.includes('glove') || c.includes('gear')) return 'Gloves & Sports Gear';
      if (c.includes('shirt') || c.includes('tee')) return 'T-Shirts';
      
      return 'Unknown';
  };

  const updateSizesForCategory = (cat: string) => {
        let sizes: string[] = [];
        let defaultSize = '';

        if (cat === 'Shoes') {
            sizes = ['US 7', 'US 8', 'US 9', 'US 10', 'US 11', 'US 12'];
            defaultSize = 'US 9';
        } else if (cat === 'Cricket Bat') {
            sizes = ['Harrow', 'Short Handle', 'Long Handle'];
            defaultSize = 'Short Handle';
        } else if (['Footballs', 'Volleyball', 'Basketball'].includes(cat)) {
            sizes = ['Standard Size'];
            defaultSize = 'Standard Size';
        } else if (cat === 'Caps' || cat === 'Tote Bags') {
            sizes = ['One Size'];
            defaultSize = 'One Size';
        } else if (cat === 'Gloves & Sports Gear') {
             sizes = ['S', 'M', 'L'];
             defaultSize = 'M';
        } else {
            // Default clothing
            sizes = ['S', 'M', 'L', 'XL', 'XXL'];
            defaultSize = 'M';
        }
        setAvailableSizes(sizes);
        setSelectedSize(defaultSize);
  };

  // Sync result to state when analysis finishes
  useEffect(() => {
    if (result) {
        // 1. Set Name
        if (result.productName && result.productName.length > editableName.length) {
             setEditableName(result.productName);
        }
        
        // 2. Set Category & Colors
        const normalizedCat = normalizeCategory(result.category);
        const displayCategory = normalizedCat === 'Unknown' ? result.category : normalizedCat;
        
        setCurrentCategory(displayCategory);
        setCurrentColors(result.dominantColors || []);
        
        // 3. CALCULATE PRICE (Deterministic)
        let finalPrice = 0;

        if (normalizedCat !== 'Unknown' && SHOP_PRICES[normalizedCat]) {
            // CASE A: It's a Shop Item -> Use Fixed Shop Price
            finalPrice = SHOP_PRICES[normalizedCat];
        } else {
            // CASE B: It's Unknown -> Use Internet Price (AI Estimate)
            finalPrice = result.estimatedPriceUSD || 50; 
        }

        // 4. Round up the chief (Nearest 5)
        finalPrice = Math.ceil(finalPrice / 5) * 5;
        
        setCurrentPrice(finalPrice);
    }
  }, [result]);

  // Update Size & Price Range when Category Changes Manually
  useEffect(() => {
    if (currentCategory) {
        updateSizesForCategory(currentCategory);
        // If user manually changes category to a known one, update price instantly
        if (SHOP_PRICES[currentCategory]) {
             setCurrentPrice(SHOP_PRICES[currentCategory]);
        }
    }
  }, [currentCategory]);

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

      // Pass the name context to AI
      analyzeImage(base64Data, mimeType, editableName);
    };
    reader.readAsDataURL(file);
  };

  const analyzeImage = async (base64Data: string, mimeType: string, nameContext: string) => {
    setAnalyzing(true);
    try {
      const data = await analyzeProductImage(base64Data, mimeType, nameContext);
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
    
    const finalName = editableName.trim() || `${currentCategory} (Custom)`;

    const customProduct: Product = {
        id: Date.now(),
        name: finalName,
        category: 'Men', 
        priceUSD: currentPrice,
        image: selectedImage,
        description: `Custom Auto-Priced Order. Category: ${currentCategory}. Colors: ${currentColors.join(', ')}.`,
        sizes: availableSizes,
        rating: 5.0,
        reviews: 0
    };

    addToCart(customProduct, selectedSize, quantity);
    navigate('/cart');
  };

  const handleWhatsApp = () => {
    const finalName = editableName.trim() || "Custom Product";
    const priceDisplay = convertPrice(currentPrice);
    const colorStr = currentColors.join(', ');
    
    // Detailed WhatsApp Message
    const message = `*NEW ORDER REQUEST*%0a----------------------------%0aI want to order this exact item I just uploaded:%0a%0a🛍️ *${finalName}*%0a📂 Type: ${currentCategory}%0a🎨 *Color: ${colorStr}*%0a💰 Price: ${priceDisplay}%0a📏 Size: ${selectedSize}%0a📦 Quantity: ${quantity}%0a----------------------------%0a📷 *PLEASE SEE IMAGE ATTACHED*`;
    
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${message}`, '_blank');
  };

  const clearAll = () => {
    setSelectedImage(null);
    setResult(null);
    setQuantity(1);
    setEditableName('');
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
             Upload your product, and we will set the correct price.
          </p>
          
          <div className="mt-8 flex flex-wrap justify-center gap-4 text-sm font-medium text-gray-600">
             <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm">
                 <span className="w-6 h-6 bg-black text-white rounded-full flex items-center justify-center text-xs">1</span>
                 Type Name
             </div>
             <ArrowRight size={16} className="text-gray-400" />
             <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm">
                 <span className="w-6 h-6 bg-black text-white rounded-full flex items-center justify-center text-xs">2</span>
                 Upload Image
             </div>
             <ArrowRight size={16} className="text-gray-400" />
             <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm">
                 <span className="w-6 h-6 bg-accent text-black rounded-full flex items-center justify-center text-xs font-bold">3</span>
                 See Price
             </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          
          {/* LEFT SIDE: INPUTS & UPLOAD */}
          <div className="space-y-6">
              {/* Step 1: Name Input */}
              <div className="bg-white p-6 rounded-3xl shadow-lg border border-gray-100 relative overflow-hidden group">
                  <div className="absolute top-0 left-0 w-1 h-full bg-accent"></div>
                  <label className="block text-sm font-bold uppercase text-gray-500 mb-2">
                    Step 1: Write Product Name
                  </label>
                  <input 
                    value={editableName}
                    onChange={(e) => setEditableName(e.target.value)}
                    placeholder="E.g. Black Hoodie"
                    className="w-full bg-gray-50 border-2 border-gray-100 p-4 rounded-xl font-bold focus:border-black focus:ring-0 outline-none transition-colors"
                  />
                  <p className="text-xs text-gray-400 mt-2 flex items-center gap-1">
                      <HelpCircle size={12} /> Write the name so we know what to price.
                  </p>
              </div>

              {/* Step 2: Upload */}
              <div 
                className={`bg-white rounded-3xl p-8 shadow-xl border-2 border-dashed transition-all duration-300 relative overflow-hidden h-[350px] flex flex-col items-center justify-center ${selectedImage ? 'border-accent' : 'border-gray-300 hover:border-gray-400'}`}
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
                    {/* Analyzing Overlay */}
                    {analyzing && (
                        <div className="absolute inset-0 bg-white/90 backdrop-blur-sm z-10 flex flex-col items-center justify-center text-center p-4">
                            <Loader2 className="w-12 h-12 text-accent animate-spin mb-4" />
                            <p className="font-bold text-lg animate-pulse">Scanning...</p>
                            <p className="text-sm text-gray-500">Matching name to price...</p>
                        </div>
                    )}
                </>
                ) : (
                    <div className="text-center space-y-4">
                        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto text-gray-400">
                            <Camera size={32} />
                        </div>
                        <div>
                            <p className="font-bold text-lg text-gray-700">Step 2: Upload Photo</p>
                            <p className="text-xs text-gray-400">Drag & Drop or Click</p>
                        </div>
                        <button 
                            onClick={() => fileInputRef.current?.click()}
                            className="bg-black text-white px-6 py-2 rounded-full font-bold hover:bg-accent hover:text-black transition-all"
                        >
                            Select Image
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
              </div>
          </div>

          {/* RIGHT SIDE: RESULTS */}
          <div className="h-full">
             {result ? (
                 <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100 animate-fade-in-up flex flex-col h-full">
                    <div className="flex-1 space-y-6">
                        
                        {/* RESULT CARD - COMPARISON UI */}
                        <div className="bg-black text-white p-8 rounded-2xl shadow-lg relative overflow-hidden text-center">
                             <div className="absolute top-0 right-0 w-32 h-32 bg-accent rounded-bl-full opacity-10"></div>
                             <div className="absolute bottom-0 left-0 w-32 h-32 bg-gray-800 rounded-tr-full opacity-10"></div>
                             
                             {/* VISUAL COMPARISON: NAME -> PRICE */}
                             <div className="relative z-10 space-y-4">
                                <div>
                                    <p className="text-gray-400 text-[10px] font-bold uppercase tracking-widest mb-1">Product Identified</p>
                                    <h3 className="text-xl md:text-2xl font-bold leading-tight text-white/90 border-b border-white/20 pb-3 mx-auto max-w-[80%]">
                                        {editableName || result.productName}
                                    </h3>
                                </div>
                                
                                <div>
                                    <p className="text-accent text-[10px] font-bold uppercase tracking-widest mb-1">Official Price</p>
                                    <h2 className="text-5xl md:text-6xl font-black text-accent tracking-tighter">
                                        {convertPrice(currentPrice * quantity)}
                                    </h2>
                                </div>

                                <div className="inline-flex items-center gap-2 bg-white/10 px-3 py-1 rounded-full text-xs text-gray-300">
                                    <CheckCircle2 size={12} className="text-green-400" />
                                    <span>Verified for {currentCategory}</span>
                                </div>
                             </div>
                        </div>

                        {/* Analysis Note - "Pay from Internet" Logic Explained */}
                        {normalizeCategory(result.category) === 'Unknown' && (
                            <div className="bg-blue-50 p-4 rounded-xl border border-blue-100 text-blue-800 text-sm flex items-start gap-3">
                                <Search className="shrink-0 mt-0.5" size={16} />
                                <div>
                                    <p className="font-bold mb-1">Internet Price Detected</p>
                                    <p>
                                        This is a unique item not in our standard list. We found this price from the market internet value.
                                    </p>
                                </div>
                            </div>
                        )}

                        {/* Size Selector */}
                        <div>
                            <span className="block text-xs font-bold uppercase text-gray-500 mb-2">Select Size</span>
                            <div className="flex flex-wrap gap-2">
                                {availableSizes.map(size => (
                                    <button
                                        key={size}
                                        onClick={() => setSelectedSize(size)}
                                        className={`flex-1 min-w-[60px] py-3 rounded-xl text-sm font-bold transition-all border-2 ${
                                            selectedSize === size 
                                            ? 'bg-black text-white border-black shadow-md' 
                                            : 'bg-white text-gray-600 border-gray-100 hover:border-black'
                                        }`}
                                    >
                                        {size}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Quantity */}
                        <div className="flex items-center justify-between border-t border-gray-100 pt-4">
                            <span className="font-bold text-gray-500 text-sm">Quantity</span>
                            <div className="flex items-center gap-4 bg-gray-50 p-2 rounded-xl border border-gray-100">
                                <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="w-8 h-8 flex items-center justify-center bg-white rounded-lg shadow-sm hover:text-accent"><Minus size={16} /></button>
                                <span className="font-bold w-4 text-center">{quantity}</span>
                                <button onClick={() => setQuantity(quantity + 1)} className="w-8 h-8 flex items-center justify-center bg-white rounded-lg shadow-sm hover:text-accent"><Plus size={16} /></button>
                            </div>
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="space-y-3 mt-6 pt-6 border-t border-gray-100">
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
                    </div>
                 </div>
             ) : (
                // Empty State
                <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 h-full min-h-[350px] flex flex-col items-center justify-center text-center text-gray-300 border-dashed">
                    <Sparkles size={48} className="mb-4 opacity-20" />
                    <p className="font-medium text-gray-400">Price result will appear here.</p>
                </div>
             )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AutoPricing;