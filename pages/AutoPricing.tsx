import React, { useState, useRef, useEffect, useMemo } from 'react';
import { Sparkles, Loader2, Camera, MessageCircle, X, ShoppingCart, Minus, Plus, Search, CheckCircle2, Edit3, ChevronDown, Filter } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { analyzeProductImage, PricingAnalysis } from '../services/geminiService';
import { WHATSAPP_NUMBER } from '../constants';
import { Product } from '../types';

const AutoPricing: React.FC = () => {
  const { convertPrice, addToCart, navigate } = useAppContext();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState<PricingAnalysis | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  
  // Data State
  const [editableName, setEditableName] = useState('');
  const [currentCategory, setCurrentCategory] = useState('');
  const [currentPrice, setCurrentPrice] = useState(0);

  // Order Configuration State
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState('');
  const [availableSizes, setAvailableSizes] = useState<string[]>(['S', 'M', 'L', 'XL']);
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  // --- FULL 100 PRODUCT PRICE LIST ---
  const PRICE_CATALOG: {name: string, price: number}[] = [
    { name: "T-Shirt", price: 25 }, { name: "Hoodie", price: 40 }, { name: "Jersey", price: 45 }, { name: "Jacket", price: 60 }, { name: "Tracksuit", price: 70 },
    { name: "Cap", price: 15 }, { name: "Beanie", price: 18 }, { name: "Jeans", price: 55 }, { name: "Shorts", price: 30 }, { name: "Sweatpants", price: 35 },
    { name: "Polo Shirt", price: 28 }, { name: "Dress Shirt", price: 38 }, { name: "Tank Top", price: 22 }, { name: "Sweater", price: 42 }, { name: "Cardigan", price: 48 },
    { name: "Vest", price: 32 }, { name: "Coat", price: 90 }, { name: "Trench Coat", price: 110 }, { name: "Blazer", price: 85 }, { name: "Leather Jacket", price: 120 },
    { name: "Bomber Jacket", price: 95 }, { name: "Windbreaker", price: 65 }, { name: "Raincoat", price: 75 }, { name: "Pajama Set", price: 40 }, { name: "Nightwear", price: 38 },
    { name: "Bathrobe", price: 50 }, { name: "Jumpsuit", price: 60 }, { name: "Romper", price: 45 }, { name: "Skirt", price: 30 }, { name: "Leggings", price: 28 },
    { name: "Jeggings", price: 32 }, { name: "Yoga Pants", price: 35 }, { name: "Sports Bra", price: 30 }, { name: "Workout Top", price: 26 }, { name: "Compression Shirt", price: 34 },
    { name: "Base Layer", price: 38 }, { name: "Thermal Wear", price: 40 }, { name: "Gloves", price: 20 }, { name: "Scarf", price: 22 }, { name: "Shawl", price: 28 },
    { name: "Socks (Pack)", price: 15 }, { name: "Ankle Socks", price: 10 }, { name: "Sneakers", price: 120 }, { name: "Running Shoes", price: 95 }, { name: "Leather Boots", price: 130 },
    { name: "Loafers", price: 85 }, { name: "Sandals", price: 28 }, { name: "Slippers", price: 20 }, { name: "Flip Flops", price: 18 }, { name: "Formal Shoes", price: 110 },
    { name: "Sunglasses", price: 35 }, { name: "Belt", price: 25 }, { name: "Watch", price: 60 }, { name: "Backpack", price: 50 }, { name: "Crossbody Bag", price: 40 },
    { name: "Duffle Bag", price: 60 }, { name: "Laptop Bag", price: 55 }, { name: "Wallet", price: 22 }, { name: "Tie", price: 15 }, { name: "Bow Tie", price: 18 },
    { name: "Cufflinks", price: 30 }, { name: "Handkerchief", price: 10 }, { name: "Rain Boots", price: 48 }, { name: "Ski Jacket", price: 140 }, { name: "Winter Coat", price: 130 },
    { name: "Puffer Jacket", price: 100 }, { name: "Down Jacket", price: 115 }, { name: "Graphic T-Shirt", price: 27 }, { name: "Ripped Jeans", price: 60 }, { name: "Cargo Pants", price: 50 },
    { name: "Denim Jacket", price: 85 }, { name: "Faux Fur Coat", price: 125 }, { name: "Camouflage Jacket", price: 90 }, { name: "Oversized Hoodie", price: 50 }, { name: "Zipper Hoodie", price: 45 },
    { name: "Half Sleeve Shirt", price: 30 }, { name: "Long Sleeve T-Shirt", price: 28 }, { name: "Linen Shirt", price: 40 }, { name: "Khaki Pants", price: 42 }, { name: "Joggers", price: 38 },
    { name: "Lounge Wear", price: 55 }, { name: "Sleep Shorts", price: 20 }, { name: "Sport Shorts", price: 26 }, { name: "Baseball Cap", price: 22 }, { name: "Visor Hat", price: 18 },
    { name: "Fedora Hat", price: 35 }, { name: "Bucket Hat", price: 25 }, { name: "Custom Jersey", price: 65 }, { name: "Team Tracksuit", price: 75 }, { name: "Warm Gloves", price: 24 },
    { name: "Touchscreen Gloves", price: 28 }, { name: "Waterproof Jacket", price: 85 }, { name: "Cycling Shorts", price: 32 }, { name: "Hiking Boots", price: 135 }, { name: "Trail Shoes", price: 110 },
    { name: "Dress Pants", price: 50 }, { name: "Office Shirt", price: 36 }, { name: "Softshell Jacket", price: 88 }, { name: "Winter Leggings", price: 40 }, { name: "Fashion Hoodie", price: 52 }
  ];

  // Helper dictionary for fast lookup
  const SHOP_PRICES = useMemo(() => {
    const dict: {[key: string]: number} = {};
    PRICE_CATALOG.forEach(item => { dict[item.name] = item.price; });
    return dict;
  }, []);

  const filteredCatalog = useMemo(() => {
    return PRICE_CATALOG.filter(item => 
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

  const handleProductSelect = (item: {name: string, price: number}) => {
    setEditableName(item.name);
    setCurrentCategory(item.name);
    setCurrentPrice(item.price);
    updateSizesForCategory(item.name);
    
    if (!result) {
        setResult({
            productName: item.name,
            category: item.name,
            reasoning: "Selected from official catalog.",
            dominantColors: ["Standard"],
            complexityScore: 0.5,
            estimatedPriceUSD: item.price
        });
    }
  };

  const normalizeCategory = (cat: string): string => {
      if (!cat) return 'Unknown';
      const input = cat.trim();
      const lowerInput = input.toLowerCase();
      
      if (SHOP_PRICES[input]) return input;
      const keys = Object.keys(SHOP_PRICES);
      for (const key of keys) {
          if (key.toLowerCase() === lowerInput) return key;
      }
      return 'Unknown';
  };

  const updateSizesForCategory = (cat: string) => {
        const lowerCat = cat.toLowerCase();
        let sizes: string[] = ['S', 'M', 'L', 'XL', 'XXL'];
        let defaultSize = 'M';

        if (['shoe', 'sneaker', 'boot', 'sandal', 'slipper', 'flip flop', 'loafer'].some(k => lowerCat.includes(k))) {
            sizes = ['US 7', 'US 8', 'US 9', 'US 10', 'US 11', 'US 12'];
            defaultSize = 'US 9';
        } 
        else if (['cap', 'hat', 'beanie', 'visor', 'bag', 'backpack', 'wallet', 'watch', 'sunglass', 'belt', 'tie', 'cufflink', 'scarf', 'shawl', 'handkerchief'].some(k => lowerCat.includes(k))) {
            sizes = ['One Size'];
            defaultSize = 'One Size';
        }
        
        setAvailableSizes(sizes);
        setSelectedSize(defaultSize);
  };

  useEffect(() => {
    if (result && !editableName.includes(result.productName)) {
        let finalName = result.productName || "Custom Item";
        setEditableName(finalName);
        
        const normalizedCat = normalizeCategory(result.category);
        const displayCategory = normalizedCat === 'Unknown' ? result.category : normalizedCat;
        setCurrentCategory(displayCategory);
        
        let finalPrice = 0;
        if (normalizedCat !== 'Unknown' && SHOP_PRICES[normalizedCat]) {
            finalPrice = SHOP_PRICES[normalizedCat];
        } else {
            finalPrice = result.estimatedPriceUSD || 50; 
            finalPrice = Math.ceil(finalPrice / 5) * 5;
        }
        setCurrentPrice(finalPrice);
    }
  }, [result]);

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = async () => {
      const base64String = reader.result as string;
      setSelectedImage(base64String);
      setAnalyzing(true);
      const base64Data = base64String.split(',')[1];
      try {
        const data = await analyzeProductImage(base64Data, file.type, editableName);
        setResult(data);
      } catch (err) {
        console.error(err);
      } finally {
        setAnalyzing(false);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleAddToCart = () => {
    if (!selectedImage && !result) return;
    const finalName = editableName.trim() || currentCategory;
    const customProduct: Product = {
        id: Date.now(),
        name: finalName,
        category: 'Men', 
        priceUSD: currentPrice,
        image: selectedImage || "https://images.unsplash.com/photo-1578768079052-aa76e52ff62e?w=800&q=80",
        description: `Smart Priced Order. Category: ${currentCategory}.`,
        sizes: availableSizes,
        rating: 5.0,
        reviews: 0
    };
    addToCart(customProduct, selectedSize, quantity);
    navigate('/cart');
  };

  const handleWhatsApp = () => {
    const finalName = editableName.trim();
    const priceDisplay = convertPrice(currentPrice);
    const message = `*NEW ORDER REQUEST*%0a🛍️ *${finalName}*%0a📂 Type: ${currentCategory}%0a💰 Price: ${priceDisplay}%0a📏 Size: ${selectedSize}%0a📦 Quantity: ${quantity}`;
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${message}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-secondary py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-black text-primary mb-4 uppercase tracking-tighter">
            Smart Pricing
          </h1>
          <p className="text-gray-500 max-w-xl mx-auto">Select a product or upload a photo to get the official premium price.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-4 bg-white rounded-3xl shadow-xl overflow-hidden flex flex-col h-[700px]">
              <div className="p-6 bg-black text-white">
                  <div className="flex items-center gap-2 mb-4">
                      <Filter size={18} className="text-accent" />
                      <h3 className="font-bold uppercase tracking-wider text-sm">Quick Catalog</h3>
                  </div>
                  <div className="relative">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                      <input 
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Search items..."
                        className="w-full bg-white/10 border-none rounded-xl py-3 pl-10 pr-4 text-sm focus:ring-2 focus:ring-accent outline-none text-white placeholder:text-gray-500"
                      />
                  </div>
              </div>
              <div className="flex-1 overflow-y-auto p-2 custom-scrollbar">
                  <div className="grid grid-cols-1 gap-1">
                      {filteredCatalog.map((item, idx) => (
                          <button
                            key={idx}
                            onClick={() => handleProductSelect(item)}
                            className={`flex items-center justify-between p-4 rounded-xl text-left transition-all group ${
                                currentCategory === item.name 
                                ? 'bg-accent/10 border-accent/20 border text-black' 
                                : 'hover:bg-gray-50 border border-transparent'
                            }`}
                          >
                              <div className="flex flex-col">
                                  <span className="font-bold text-sm">{item.name}</span>
                                  <span className="text-[10px] text-gray-400 uppercase tracking-widest">{idx + 1} of 100</span>
                              </div>
                              <ChevronDown size={14} className="text-gray-300 -rotate-90" />
                          </button>
                      ))}
                  </div>
              </div>
          </div>

          <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-6">
                  <div className="bg-white p-6 rounded-3xl shadow-lg border border-gray-100">
                      <label className="block text-xs font-bold uppercase text-gray-400 mb-3">Product Name</label>
                      <div className="flex items-center gap-2 bg-gray-50 border-2 border-gray-100 p-4 rounded-xl">
                          <Edit3 size={18} className="text-gray-400" />
                          <input 
                            value={editableName}
                            onChange={(e) => setEditableName(e.target.value)}
                            placeholder="E.g. T-Shirt"
                            className="w-full bg-transparent font-bold focus:outline-none"
                          />
                      </div>
                  </div>

                  <div className={`bg-white rounded-3xl p-6 shadow-xl border-2 border-dashed h-[400px] flex flex-col items-center justify-center transition-all ${selectedImage ? 'border-accent' : 'border-gray-200 hover:border-accent/50'}`}>
                      {selectedImage ? (
                          <div className="relative w-full h-full group">
                              <img src={selectedImage} alt="Preview" className="w-full h-full object-contain rounded-2xl" />
                              <button onClick={() => setSelectedImage(null)} className="absolute top-2 right-2 bg-white/80 p-2 rounded-full shadow-md text-red-500 hover:bg-white"><X size={20} /></button>
                              {analyzing && (
                                  <div className="absolute inset-0 bg-white/80 backdrop-blur-sm flex flex-col items-center justify-center rounded-2xl">
                                      <Loader2 className="w-10 h-10 text-accent animate-spin mb-2" />
                                      <span className="font-bold text-sm uppercase tracking-widest">Pricing...</span>
                                  </div>
                              )}
                          </div>
                      ) : (
                          <div className="text-center space-y-4">
                              <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto text-gray-300">
                                  <Camera size={40} />
                              </div>
                              <button onClick={() => fileInputRef.current?.click()} className="bg-black text-white px-8 py-3 rounded-full font-bold hover:bg-accent hover:text-black transition-all shadow-lg">Upload Image</button>
                          </div>
                      )}
                      <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleFileChange} />
                  </div>
              </div>

              <div className="flex flex-col h-full">
                  {result || currentPrice > 0 ? (
                      <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100 flex flex-col h-full animate-fade-in-up">
                          <div className="flex-1 space-y-8">
                              <div className="bg-black text-white p-8 rounded-3xl text-center relative overflow-hidden">
                                  <div className="relative z-10">
                                      <p className="text-accent text-[10px] font-bold uppercase tracking-widest mb-1">Official Catalog Price</p>
                                      <h2 className="text-6xl font-black text-accent">{convertPrice(currentPrice * quantity)}</h2>
                                  </div>
                              </div>
                              <div className="space-y-4">
                                  <div className="flex items-center justify-between bg-gray-50 p-4 rounded-2xl border border-gray-100">
                                      <span className="font-bold text-sm">Size: {selectedSize}</span>
                                      <div className="flex gap-1">
                                          {availableSizes.slice(0, 3).map(s => (
                                              <button key={s} onClick={() => setSelectedSize(s)} className={`w-8 h-8 rounded-lg text-[10px] font-bold border transition-all ${selectedSize === s ? 'bg-black text-white border-black' : 'bg-white border-gray-200'}`}>{s}</button>
                                          ))}
                                      </div>
                                  </div>
                                  <div className="flex items-center justify-between bg-gray-50 p-4 rounded-2xl border border-gray-100">
                                      <span className="font-bold text-sm">Quantity</span>
                                      <div className="flex items-center gap-4 bg-white px-3 py-1.5 rounded-xl border border-gray-100">
                                          <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="hover:text-accent"><Minus size={16} /></button>
                                          <span className="font-bold w-4 text-center">{quantity}</span>
                                          <button onClick={() => setQuantity(quantity + 1)} className="hover:text-accent"><Plus size={16} /></button>
                                      </div>
                                  </div>
                              </div>
                          </div>
                          <div className="space-y-3 mt-8">
                              <button onClick={handleAddToCart} className="w-full bg-black text-white py-4 rounded-2xl font-bold text-lg hover:bg-accent hover:text-black transition-all shadow-xl flex items-center justify-center gap-2">
                                  <ShoppingCart size={20} /> Checkout Now
                              </button>
                          </div>
                      </div>
                  ) : (
                      <div className="bg-white rounded-3xl p-12 shadow-sm border-2 border-dashed border-gray-100 h-full flex flex-col items-center justify-center text-center">
                          <Sparkles size={30} className="text-gray-200 mb-4" />
                          <p className="text-gray-400 font-medium">Select a product to view the premium price</p>
                      </div>
                  )}
              </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AutoPricing;