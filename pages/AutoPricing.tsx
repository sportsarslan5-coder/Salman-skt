import React, { useState, useRef, useEffect } from 'react';
import { Sparkles, Loader2, Camera, MessageCircle, X, Image as ImageIcon, ShoppingCart, Minus, Plus, Palette, Tag, Search, ArrowRight, HelpCircle, Info, CheckCircle2, Edit3 } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { analyzeProductImage, PricingAnalysis } from '../services/geminiService';
import { WHATSAPP_NUMBER, EXCHANGE_RATE_PKR } from '../constants';
import { Product } from '../types';

const AutoPricing: React.FC = () => {
  const { convertPrice, addToCart, navigate, currency } = useAppContext();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState<PricingAnalysis | null>(null);
  
  // Data State
  const [editableName, setEditableName] = useState('');
  const [currentCategory, setCurrentCategory] = useState('');
  const [currentColors, setCurrentColors] = useState<string[]>([]);
  const [currentPrice, setCurrentPrice] = useState(0);
  const [isManualPriceMode, setIsManualPriceMode] = useState(false);

  // Order Configuration State
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState('');
  const [availableSizes, setAvailableSizes] = useState<string[]>(['S', 'M', 'L', 'XL']);
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  // --- STRICT FIXED PRICES (No Guessing) ---
  const SHOP_PRICES: {[key: string]: number} = {
      'T-Shirt': 25, 'Hoodie': 40, 'Jersey': 45, 'Jacket': 60, 'Tracksuit': 70, 
      'Cap': 15, 'Beanie': 18, 'Jeans': 55, 'Shorts': 30, 'Sweatpants': 35, 
      'Polo Shirt': 28, 'Dress Shirt': 38, 'Tank Top': 22, 'Sweater': 42, 'Cardigan': 48, 
      'Vest': 32, 'Coat': 90, 'Trench Coat': 110, 'Blazer': 85, 'Leather Jacket': 120, 
      'Bomber Jacket': 95, 'Windbreaker': 65, 'Raincoat': 75, 'Pajama Set': 40, 'Nightwear': 38, 
      'Bathrobe': 50, 'Jumpsuit': 60, 'Romper': 45, 'Skirt': 30, 'Leggings': 28, 
      'Jeggings': 32, 'Yoga Pants': 35, 'Sports Bra': 30, 'Workout Top': 26, 'Compression Shirt': 34, 
      'Base Layer': 38, 'Thermal Wear': 40, 'Gloves': 20, 'Scarf': 22, 'Shawl': 28, 
      'Socks (Pack)': 15, 'Ankle Socks': 10, 'Sneakers': 120, 'Running Shoes': 95, 'Leather Boots': 130, 
      'Loafers': 85, 'Sandals': 28, 'Slippers': 20, 'Flip Flops': 18, 'Formal Shoes': 110, 
      'Sunglasses': 35, 'Belt': 25, 'Watch': 60, 'Backpack': 50, 'Crossbody Bag': 40, 
      'Duffle Bag': 60, 'Laptop Bag': 55, 'Wallet': 22, 'Tie': 15, 'Bow Tie': 18, 
      'Cufflinks': 30, 'Handkerchief': 10, 'Rain Boots': 48, 'Ski Jacket': 140, 'Winter Coat': 130, 
      'Puffer Jacket': 100, 'Down Jacket': 115, 'Graphic T-Shirt': 27, 'Ripped Jeans': 60, 'Cargo Pants': 50, 
      'Denim Jacket': 85, 'Faux Fur Coat': 125, 'Camouflage Jacket': 90, 'Oversized Hoodie': 50, 'Zipper Hoodie': 45, 
      'Half Sleeve Shirt': 30, 'Long Sleeve T-Shirt': 28, 'Linen Shirt': 40, 'Khaki Pants': 42, 'Joggers': 38, 
      'Lounge Wear': 55, 'Sleep Shorts': 20, 'Sport Shorts': 26, 'Baseball Cap': 22, 'Visor Hat': 18, 
      'Fedora Hat': 35, 'Bucket Hat': 25, 'Custom Jersey': 65, 'Team Tracksuit': 75, 'Warm Gloves': 24, 
      'Touchscreen Gloves': 28, 'Waterproof Jacket': 85, 'Cycling Shorts': 32, 'Hiking Boots': 135, 'Trail Shoes': 110, 
      'Dress Pants': 50, 'Office Shirt': 36, 'Softshell Jacket': 88, 'Winter Leggings': 40, 'Fashion Hoodie': 52
  };

  // Helper to map AI category to our dropdown list
  const normalizeCategory = (cat: string): string => {
      if (!cat) return 'Unknown';
      const input = cat.trim();
      const lowerInput = input.toLowerCase();
      
      // 1. Exact Match
      if (SHOP_PRICES[input]) return input;

      // 2. Case Insensitive Exact Match
      const keys = Object.keys(SHOP_PRICES);
      for (const key of keys) {
          if (key.toLowerCase() === lowerInput) return key;
      }

      // 3. Partial Match (Prioritize longer keys to catch specific items first, e.g., "Down Jacket" before "Jacket")
      const sortedKeys = keys.sort((a, b) => b.length - a.length);
      for (const key of sortedKeys) {
          if (lowerInput.includes(key.toLowerCase())) return key;
      }
      
      // 4. Fallback for generic terms
      if (lowerInput.includes('shoe') || lowerInput.includes('footwear')) return 'Sneakers';
      if (lowerInput.includes('bag')) return 'Backpack';
      if (lowerInput.includes('shirt') && !lowerInput.includes('t-shirt')) return 'T-Shirt';

      return 'Unknown';
  };

  const updateSizesForCategory = (cat: string) => {
        const lowerCat = cat.toLowerCase();
        let sizes: string[] = ['S', 'M', 'L', 'XL', 'XXL'];
        let defaultSize = 'M';

        // Footwear Logic
        if (['shoe', 'sneaker', 'boot', 'sandal', 'slipper', 'flip flop', 'loafer'].some(k => lowerCat.includes(k))) {
            sizes = ['US 7', 'US 8', 'US 9', 'US 10', 'US 11', 'US 12'];
            defaultSize = 'US 9';
        } 
        // Accessories (One Size)
        else if (['cap', 'hat', 'beanie', 'visor', 'bag', 'backpack', 'wallet', 'watch', 'sunglass', 'belt', 'tie', 'cufflink', 'scarf', 'shawl', 'handkerchief'].some(k => lowerCat.includes(k))) {
            sizes = ['One Size'];
            defaultSize = 'One Size';
        }
        // Small Accessories (S/M/L)
        else if (['glove', 'sock'].some(k => lowerCat.includes(k))) {
             sizes = ['S', 'M', 'L'];
             defaultSize = 'M';
        }
        
        setAvailableSizes(sizes);
        setSelectedSize(defaultSize);
  };

  // Sync result to state when analysis finishes
  useEffect(() => {
    if (result) {
        // 1. Set Name with strict "Z" suffix requirement
        let finalName = result.productName || "Custom Item";
        // Ensure we add the Z if it's not already there (though AI generates new names mostly)
        if (!finalName.endsWith(" Z")) {
            finalName = `${finalName} Z`;
        }
        setEditableName(finalName);
        
        // 2. Set Category & Colors
        const normalizedCat = normalizeCategory(result.category);
        const displayCategory = normalizedCat === 'Unknown' ? result.category : normalizedCat;
        
        setCurrentCategory(displayCategory);
        setCurrentColors(result.dominantColors || []);
        
        // 3. CALCULATE PRICE (Deterministic)
        let finalPrice = 0;

        if (normalizedCat !== 'Unknown' && SHOP_PRICES[normalizedCat]) {
            // CASE A: It's a Shop Item -> Use Fixed Shop Price EXACTLY (No rounding)
            finalPrice = SHOP_PRICES[normalizedCat];
        } else {
            // CASE B: It's Unknown -> Use Internet Price (AI Estimate)
            finalPrice = result.estimatedPriceUSD || 50; 
            // Round up the chief (Nearest 5) only for unknown items
            finalPrice = Math.ceil(finalPrice / 5) * 5;
        }

        setCurrentPrice(finalPrice);
        setIsManualPriceMode(false); // Reset manual mode on new analysis
    }
  }, [result]);

  // Update Size & Price Range when Category Changes Manually
  useEffect(() => {
    if (currentCategory) {
        updateSizesForCategory(currentCategory);
        // If user manually changes category to a known one, update price instantly IF not in manual mode
        if (SHOP_PRICES[currentCategory] && !isManualPriceMode) {
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
    
    // Ensure name includes the Z if user edited it out, or trust the user edit? 
    // The requirement says "There should also be a Z with the name", so we default to state.
    const finalName = editableName.trim() || `${currentCategory} Z`;

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
    const finalName = editableName.trim() || "Custom Product Z";
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
    setIsManualPriceMode(false);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleManualPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    if (isNaN(val) || val < 0) {
        setCurrentPrice(0);
        return;
    }
    
    // Convert input (which is in current currency) back to USD for state
    if (currency === 'PKR') {
        setCurrentPrice(val / EXCHANGE_RATE_PKR);
    } else {
        setCurrentPrice(val);
    }
  };

  const displayManualInputValue = () => {
      if (currency === 'PKR') {
          return Math.round(currentPrice * EXCHANGE_RATE_PKR);
      }
      return Math.round(currentPrice);
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
                    placeholder="E.g. Black Hoodie Z"
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
                        <div className="bg-black text-white p-8 rounded-2xl shadow-lg relative overflow-hidden text-center transition-all duration-300">
                             <div className="absolute top-0 right-0 w-32 h-32 bg-accent rounded-bl-full opacity-10"></div>
                             <div className="absolute bottom-0 left-0 w-32 h-32 bg-gray-800 rounded-tr-full opacity-10"></div>
                             
                             <div className="relative z-10 space-y-4">
                                <div>
                                    <p className="text-gray-400 text-[10px] font-bold uppercase tracking-widest mb-1">Product Identified</p>
                                    <h3 className="text-xl md:text-2xl font-bold leading-tight text-white/90 border-b border-white/20 pb-3 mx-auto max-w-[80%]">
                                        {editableName}
                                    </h3>
                                </div>
                                
                                {isManualPriceMode ? (
                                    <div className="bg-white/10 p-4 rounded-xl backdrop-blur-sm border border-white/20 animate-fade-in-up">
                                        <label className="block text-xs font-bold uppercase text-accent mb-2">Set Manual Unit Price ({currency})</label>
                                        <div className="flex items-center justify-center gap-1">
                                            <span className="text-xl font-bold text-gray-400">{currency === 'PKR' ? '₨' : '$'}</span>
                                            <input 
                                                type="number" 
                                                value={displayManualInputValue()}
                                                onChange={handleManualPriceChange}
                                                className="bg-transparent text-4xl font-black text-white w-40 text-center border-b-2 border-accent focus:outline-none placeholder-gray-500"
                                                autoFocus
                                            />
                                        </div>
                                        <p className="text-[10px] text-gray-400 mt-2">Enter price per item</p>
                                    </div>
                                ) : (
                                    <div>
                                        <p className="text-accent text-[10px] font-bold uppercase tracking-widest mb-1">Official Price</p>
                                        <h2 className="text-5xl md:text-6xl font-black text-accent tracking-tighter">
                                            {convertPrice(currentPrice * quantity)}
                                        </h2>
                                    </div>
                                )}

                                {!isManualPriceMode && (
                                    <div className="inline-flex items-center gap-2 bg-white/10 px-3 py-1 rounded-full text-xs text-gray-300">
                                        <CheckCircle2 size={12} className="text-green-400" />
                                        <span>Verified for {currentCategory}</span>
                                    </div>
                                )}
                             </div>
                        </div>
                        
                        {/* MANUAL OVERRIDE TOGGLE */}
                        <div className="text-center">
                            <button 
                                onClick={() => setIsManualPriceMode(!isManualPriceMode)}
                                className="inline-flex items-center gap-2 text-xs font-bold underline text-gray-400 hover:text-black transition-colors"
                            >
                                <Edit3 size={12} />
                                {isManualPriceMode ? 'Cancel Custom Price' : 'Set Custom Price Manually'}
                            </button>
                        </div>

                        {/* Analysis Note - "Pay from Internet" Logic Explained */}
                        {normalizeCategory(result.category) === 'Unknown' && !isManualPriceMode && (
                            <div className="bg-blue-50 p-4 rounded-xl border border-blue-100 text-blue-800 text-sm flex items-start gap-3">
                                <Search className="shrink-0 mt-0.5" size={16} />
                                <div>
                                    <p className="font-bold mb-1">Internet Price Detected</p>
                                    <p>
                                        This is a unique item. We estimated the market value. Click "Set Custom Price" above if incorrect.
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