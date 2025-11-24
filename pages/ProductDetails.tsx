import React, { useState, useMemo, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Star, ShoppingCart, ArrowLeft, CheckCircle, MessageCircle, Shield, RefreshCcw } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { PRODUCTS, WHATSAPP_NUMBER } from '../constants';
import ProductCard from '../components/ProductCard';

const ProductDetails: React.FC = () => {
  const { id } = useParams();
  const { t, convertPrice, addToCart } = useAppContext();
  const product = PRODUCTS.find(p => p.id === Number(id));
  const [selectedSize, setSelectedSize] = useState<string>('');

  const relatedProducts = useMemo(() => {
    if (!product) return [];
    return PRODUCTS
      .filter(p => p.category === product.category && p.id !== product.id)
      .slice(0, 4);
  }, [product]);

  useEffect(() => {
    if (product) {
      document.title = `${product.name} | Salman SKT`;
      window.scrollTo(0, 0);
    }
  }, [product]);

  useEffect(() => {
    if (product && product.sizes.length > 0) setSelectedSize(product.sizes[0]);
  }, [product]);

  if (!product) {
    return <div className="min-h-screen flex items-center justify-center">Product not found</div>;
  }

  const handleOrderNow = () => {
    addToCart(product, selectedSize);
    const message = `*Hi, I want to buy this item:*%0a` +
                    `Item: ${product.name}%0a` +
                    `Price: ${convertPrice(product.priceUSD)}%0a` +
                    `Size: ${selectedSize}%0a` +
                    `------------------%0a` +
                    `Is this available?`;
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${message}`, '_blank');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8 animate-fade-in">
        <nav className="flex items-center gap-3 text-sm text-gray-500 mb-12">
            <Link to="/" className="hover:text-black transition-colors">Home</Link>
            <span className="text-gray-300">/</span>
            <Link to="/shop" className="hover:text-black transition-colors">Shop</Link>
            <span className="text-gray-300">/</span>
            <span className="text-black font-medium truncate">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-20">
            {/* Image Gallery */}
            <div className="space-y-4">
                <div className="rounded-3xl overflow-hidden bg-gray-100 aspect-square shadow-sm">
                    <img 
                      src={product.image} 
                      alt={product.name} 
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" 
                    />
                </div>
            </div>

            {/* Info */}
            <div className="flex flex-col justify-center">
                <div className="mb-6">
                   <span className="text-accent font-bold uppercase tracking-widest text-xs mb-2 block">{product.category} Series</span>
                   <h1 className="text-4xl md:text-5xl font-black text-primary mb-4 leading-tight">{product.name}</h1>
                   <div className="flex items-center gap-4">
                        <div className="flex items-center text-yellow-400">
                            <Star fill="currentColor" size={20} />
                            <Star fill="currentColor" size={20} />
                            <Star fill="currentColor" size={20} />
                            <Star fill="currentColor" size={20} />
                            <Star fill="currentColor" size={20} />
                        </div>
                        <span className="text-gray-500 text-sm font-medium">({product.reviews} verified reviews)</span>
                   </div>
                </div>

                <div className="text-3xl font-bold text-primary mb-8 flex items-center gap-4">
                    {convertPrice(product.priceUSD)}
                    <span className="text-sm font-normal text-green-600 bg-green-50 px-3 py-1 rounded-full border border-green-100">In Stock</span>
                </div>

                <p className="text-gray-600 text-lg leading-relaxed mb-10 border-l-2 border-gray-200 pl-6">
                    {product.description}
                </p>

                <div className="mb-10">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="font-bold text-sm uppercase tracking-wide">Select Size (US)</h3>
                        <button className="text-xs text-gray-500 underline">Size Guide</button>
                    </div>
                    <div className="grid grid-cols-4 sm:grid-cols-6 gap-3">
                        {product.sizes.map(size => (
                            <button
                                key={size}
                                onClick={() => setSelectedSize(size)}
                                className={`py-3 rounded-xl font-bold text-sm transition-all duration-200 ${
                                    selectedSize === size
                                        ? 'bg-black text-white shadow-lg scale-105'
                                        : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                                }`}
                            >
                                {size.replace('US ', '')}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="space-y-4">
                    <button
                        onClick={handleOrderNow}
                        className="w-full bg-green-500 text-white px-6 py-5 rounded-full font-bold text-lg hover:bg-green-600 transition-all transform hover:scale-[1.02] shadow-xl shadow-green-200 flex items-center justify-center gap-3"
                    >
                        <MessageCircle size={24} fill="currentColor" className="text-white" />
                        <span>Order via WhatsApp</span>
                    </button>
                </div>

                <div className="grid grid-cols-2 gap-4 mt-10 pt-10 border-t border-gray-100">
                    <div className="flex items-center gap-3 text-gray-600 text-sm">
                        <Shield size={20} className="text-gray-400" /> Authentic Guarantee
                    </div>
                    <div className="flex items-center gap-3 text-gray-600 text-sm">
                        <RefreshCcw size={20} className="text-gray-400" /> 30 Days Return
                    </div>
                </div>
            </div>
        </div>

        {/* Reviews & Related */}
        <div className="border-t border-gray-100 pt-16">
            <h2 className="text-2xl font-bold mb-10">Customer Reviews <span className="text-gray-400 font-normal text-lg ml-2">({product.reviews})</span></h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-20">
                 <div className="bg-gray-50 p-8 rounded-2xl">
                     <div className="flex items-center justify-between mb-4">
                         <div className="flex items-center gap-3">
                             <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center font-bold text-gray-500">SK</div>
                             <span className="font-bold">Sarah K.</span>
                         </div>
                         <span className="text-xs text-gray-400">Verified Buyer</span>
                     </div>
                     <div className="flex text-accent mb-3">
                         {[1,2,3,4,5].map(i => <Star key={i} size={14} fill="currentColor" />)}
                     </div>
                     <p className="text-gray-600 leading-relaxed">"Absolutely love the quality! The material feels premium and the fit is perfect. Delivery to Lahore was super fast."</p>
                 </div>
                 <div className="bg-gray-50 p-8 rounded-2xl">
                     <div className="flex items-center justify-between mb-4">
                         <div className="flex items-center gap-3">
                             <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center font-bold text-gray-500">AM</div>
                             <span className="font-bold">Ali M.</span>
                         </div>
                         <span className="text-xs text-gray-400">Verified Buyer</span>
                     </div>
                     <div className="flex text-accent mb-3">
                         {[1,2,3,4,5].map(i => <Star key={i} size={14} fill="currentColor" />)}
                     </div>
                     <p className="text-gray-600 leading-relaxed">"Best sneakers I've bought online. Highly recommended for anyone looking for style and comfort."</p>
                 </div>
            </div>

            {relatedProducts.length > 0 && (
              <div>
                <div className="flex justify-between items-end mb-8">
                    <h2 className="text-3xl font-bold">You May Also Like</h2>
                    <Link to="/shop" className="text-sm font-bold border-b border-black pb-1">View Store</Link>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                  {relatedProducts.map(p => (
                    <ProductCard key={p.id} product={p} />
                  ))}
                </div>
              </div>
            )}
        </div>
    </div>
  );
};

export default ProductDetails;