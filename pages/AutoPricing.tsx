
import React, { useState, useRef, useEffect } from 'react';
import { Upload, Sparkles, Loader2, Camera, MessageCircle, X, Image as ImageIcon, ShoppingCart, Minus, Plus, Edit2, Check, ChevronDown } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { analyzeProductImage, PricingAnalysis } from '../services/geminiService';
import { WHATSAPP_NUMBER } from '../constants';
import { Product } from '../types';

const AutoPricing: React.FC = () => {
  const { t, convertPrice, addToCart, navigate } = useAppContext();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState<PricingAnalysis | null>(null);
  
  // Editable State
  const [editableName, setEditableName] = useState('');
  const [isEditingName, setIsEditingName] = useState(false);
  
  // Category & Price State
  const [currentCategory, setCurrentCategory] = useState('');
  const [currentPrice, setCurrentPrice] = useState(0);

  // Order Configuration State
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState('');
  const [availableSizes, setAvailableSizes] = useState<string[]>(['S', 'M', 'L', 'XL']); // Default
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Standard Pricing Rules (Fallback/Manual Correction)
  const STANDARD_PRICES: {[key: string]: number} = {
      'Jerseys': 45.00,
      'T-Shirts': 30.00,
      'Hoodies': 50.00,
      'Jackets': 80.00,
      'Shoes': 125.00,
      'Footballs': 45.00,
      'Cricket Bat': 85.00,
      'Custom': 50.00
  };

  const CATEGORY_OPTIONS = Object.keys(STANDARD_PRICES);

  // Sync result to editable state when result changes
  useEffect(() => {
    if (result) {
        setEditableName(result.productName);
        setCurrentCategory(normalizeCategory(result.category));
        setCurrentPrice(result.price);
    }
  }, [result]);

  // Helper to map AI category to our dropdown list
  const normalizeCategory = (cat: string): string => {
      const c = cat.toLowerCase();
      if (c.includes('jersey')) return 'Jerseys';
      if (c.includes('hoodie')) return 'Hoodies';
      if (c.includes('jacket')) return 'Jackets';
      if (c.includes('shoe') || c.includes('sneaker')) return 'Shoes';
      if (c.includes('ball')) return 'Footballs';
      if (c.includes('bat')) return 'Cricket Bat';
      if (c.includes('shirt') || c.includes('tee')) return 'T-Shirts';
      return 'Custom';
  };

  // Update Size & Price when Category Changes
  useEffect(() => {
    if (currentCategory) {
        updateSizesForCategory(currentCategory);
        // Ensure price matches the category rule if it deviates significantly or was manually changed
        const standardPrice = STANDARD_PRICES[currentCategory];
        if (standardPrice) {
            setCurrentPrice(standardPrice);
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
        } else {
            // Default clothing
            sizes = ['S', 'M', 'L', 'XL', 'XXL'];
            defaultSize = 'M';
        }
        setAvailableSizes(sizes);
        setSelectedSize(defaultSize);
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
      const newCat = e.target.value;
      setCurrentCategory(newCat);
      // Auto-fix price based on category rule
      if (STANDARD_PRICES[newCat]) {
          setCurrentPrice(STANDARD_PRICES[newCat]);
      }
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

    // Convert to base64 for display and API
    const reader = new FileReader();
    reader.onloadend = async () => {
      const base64String = reader.result as string;
      setSelectedImage(base64String);
      setResult(null);
      setQuantity(1); // Reset quantity
      setIsEditingName(false);
      
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
      console.error("Critical Failure:", err);
      setAnalyzing(false);
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
    if (file) {
        processFile(file);
    }
  };

  const handleAddToCart = () => {
    if (!result || !selectedImage) return;

    const customProduct: Product = {
        id: Date.now(),
        name: editableName,
        category: 'Men', 
        priceUSD: currentPrice,
        image: selectedImage,
        description: result.reasoning,
        sizes: availableSizes,
        rating: 5.0,
        reviews: 0
    };

    addToCart(customProduct, selectedSize, quantity);
    navigate('/cart');
  };

  const handleWhatsApp = () => {
    if (!result) return;
    const priceDisplay = convertPrice(currentPrice);
    
    // Detailed message to compensate for lack of auto-image
    const message = `*NEW ORDER INQUIRY*%0a----------------------------%0aI want to buy this item:%0a👟 *${editableName}*%0a📂 Category: ${currentCategory}%0a💰 Price: ${priceDisplay}%0a📏 Size: ${selectedSize}%0a📦 Quantity: ${quantity}%0a----------------------------%0a👉 *I AM SENDING THE IMAGE NOW...*`;
    
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${message}`, '_blank');
  };

  const clearAll = () => {
    setSelectedImage(null);
    setResult(null);
    setQuantity(1);
    setEditableName('');
    setIsEditingName(false);
    setCurrentCategory('');
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
            Upload a photo. Our AI identifies the exact model, gives you a price, and lets you order immediately.
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
                    <p className="font-bold text-lg animate-pulse">Scanning Product...</p>
                    <p className="text-sm text-gray-500">Reading text & identifying model</p>
                </div>
            )}
          </div>

          {/* Results Section */}
          <div className="space-y-6">
             {result ? (
                 <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100 animate-fade-in-up relative overflow-hidden">
                    <div className="flex items-center gap-2 mb-6 text-green-600 bg-green-50 w-fit px-3 py-1 rounded-full text-sm font-bold">
                        <Sparkles size={16} /> Analysis Complete
                    </div>
                    
                    <div className="space-y-6">
                        {/* Header Info */}
                        <div>
                            <p className="text-sm text-gray-400 uppercase tracking-widest font-bold">Identified Model</p>
                            
                            <div className="flex items-start gap-2">
                                {isEditingName ? (
                                    <div className="flex-1 flex gap-2">
                                        <input 
                                            value={editableName}
                                            onChange={(e) => setEditableName(e.target.value)}
                                            className="w-full text-2xl font-bold border-b-2 border-black focus:outline-none bg-transparent"
                                            autoFocus
                                        />
                                        <button 
                                            onClick={() => setIsEditingName(false)}
                                            className="bg-black text-white p-2 rounded-full hover:bg-accent hover:text-black"
                                        >
                                            <Check size={18} />
                                        </button>
                                    </div>
                                ) : (
                                    <h2 className="text-3xl font-black text-primary leading-tight flex-1 group relative">
                                        {editableName}
                                        <button 
                                            onClick={() => setIsEditingName(true)}
                                            className="ml-3 inline-block opacity-20 group-hover:opacity-100 transition-opacity text-gray-500 hover:text-black align-middle"
                                            title="Edit Name"
                                        >
                                            <Edit2 size={20} />
                                        </button>
                                    </h2>
                                )}
                            </div>

                            {/* Category Dropdown (Fix for wrong category/price) */}
                            <div className="flex items-center gap-2 mt-4">
                                <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Category:</span>
                                <div className="relative">
                                    <select 
                                        value={currentCategory}
                                        onChange={handleCategoryChange}
                                        className="appearance-none bg-gray-100 font-bold text-sm px-4 py-2 pr-8 rounded-lg cursor-pointer focus:outline-none focus:ring-2 focus:ring-black"
                                    >
                                        {CATEGORY_OPTIONS.map(cat => (
                                            <option key={cat} value={cat}>{cat}</option>
                                        ))}
                                    </select>
                                    <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500" />
                                </div>
                            </div>
                            
                            <p className="text-sm text-gray-500 italic mt-3 border-l-2 border-accent pl-3">
                                "{result.reasoning}"
                            </p>
                        </div>

                        <div className="w-full h-px bg-gray-100"></div>

                        {/* Order Configuration Panel */}
                        <div className="space-y-4">
                            <h3 className="font-bold text-lg">Configure Order</h3>
                            
                            {/* Size Selector */}
                            <div>
                                <span className="text-xs text-gray-500 font-bold uppercase mb-2 block">Select Size ({currentCategory})</span>
                                <div className="flex flex-wrap gap-2">
                                    {availableSizes.map(size => (
                                        <button
                                            key={size}
                                            onClick={() => setSelectedSize(size)}
                                            className={`flex-1 min-w-[60px] py-2 rounded-lg text-sm font-bold transition-all border ${
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
                                <p className="text-sm text-gray-400 font-bold">Estimated Price</p>
                                <p className="text-xs text-gray-400">{quantity} item(s) x {convertPrice(currentPrice)}</p>
                            </div>
                            <h2 className="text-4xl font-black text-accent">
                                {convertPrice(currentPrice * quantity)}
                            </h2>
                        </div>

                        {/* Actions */}
                        <div className="grid grid-cols-1 gap-3 pt-2">
                             <button 
                                onClick={handleAddToCart}
                                className="w-full bg-black text-white py-4 rounded-xl font-bold text-lg hover:bg-accent hover:text-black transition-all flex items-center justify-center gap-2 shadow-lg transform hover:scale-[1.02]"
                            >
                                <ShoppingCart size={20} /> Add to Cart
                            </button>
                            <div className="relative group">
                                <button 
                                    onClick={handleWhatsApp}
                                    className="w-full bg-green-50 text-green-600 py-3 rounded-xl font-bold text-sm hover:bg-green-100 transition-all flex items-center justify-center gap-2 border border-green-200"
                                >
                                    <MessageCircle size={18} /> Order on WhatsApp
                                </button>
                                <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-xs px-3 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                                    Don't forget to paste the image in the chat!
                                </div>
                            </div>
                        </div>
                    </div>
                 </div>
             ) : (
                <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 h-[500px] flex flex-col items-center justify-center text-center text-gray-400 border-dashed">
                    <ImageIcon size={48} className="mb-4 opacity-20" />
                    <p>Upload an image to identify & order.</p>
                    <div className="mt-8 text-left text-sm space-y-2 opacity-60">
                        <p className="font-bold uppercase tracking-widest text-xs mb-2">How it works:</p>
                        <ul className="list-disc pl-4 space-y-1">
                            <li>Upload Photo</li>
                            <li>AI Identifies the <strong>Exact Model</strong> (Or you can edit it!)</li>
                            <li>Confirm <strong>Category</strong> if needed (Price updates automatically!)</li>
                            <li>Select Size & Order</li>
                        </ul>
                    </div>
                </div>
             )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AutoPricing;
