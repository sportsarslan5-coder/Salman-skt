
import React, { useState, useEffect, useRef } from 'react';
import { 
  Package, ShoppingBag, Plus, Edit, Trash2, X, Check, Save, 
  Camera, DollarSign, LayoutDashboard, LogOut, Search,
  Eye, Box, MapPin, User, Mail, Phone, Calendar, Loader2,
  Wifi, WifiOff, AlertTriangle, RefreshCw, Settings, ExternalLink, Database, AlertCircle, Info, Copy, Terminal, Zap, ShieldCheck, Activity, ArrowRight
} from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { dbService, getDiagnostics } from '../services/dbService';
import { Product, Order } from '../types';

const AdminDashboard: React.FC = () => {
  const { products, refreshProducts, isLoading, logoutAdmin, convertPrice } = useAppContext();
  const [activeTab, setActiveTab] = useState<'products' | 'orders' | 'setup'>('products');
  const [orders, setOrders] = useState<Order[]>([]);
  const [isDataLoading, setIsDataLoading] = useState(false);
  const [dbStatus, setDbStatus] = useState<{success: boolean, message: string, details?: string} | null>(null);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [viewingOrder, setViewingOrder] = useState<Order | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  
  const [formData, setFormData] = useState<Partial<Product>>({
    title: '',
    price: 0,
    category: 'Men',
    description: '',
    image_url: '',
    sizes: ["S", "M", "L", "XL"],
    rating: 5.0,
    reviews: 0
  });

  const fileInputRef = useRef<HTMLInputElement>(null);

  const checkConnection = async () => {
    setIsDataLoading(true);
    const status = await dbService.checkConnection();
    setDbStatus(status);
    setIsDataLoading(false);
  };

  const loadOrders = async () => {
    setIsDataLoading(true);
    const data = await dbService.getOrders();
    setOrders(data);
    setIsDataLoading(false);
  };

  useEffect(() => {
    checkConnection();
    if (activeTab === 'orders') {
      loadOrders();
    }
  }, [activeTab]);

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setFormData(product);
    setShowAddModal(true);
  };

  const handleDelete = async (id: string) => {
    if (confirm('Permanently delete this product?')) {
      setIsDataLoading(true);
      try {
        await dbService.deleteProduct(id);
        await refreshProducts();
      } catch (e: any) {
        console.error(e);
      } finally {
        setIsDataLoading(false);
      }
    }
  };

  const handleSave = async () => {
    if (!formData.title || !formData.image_url) return alert('Title and Image required!');
    setIsDataLoading(true);
    try {
      const payload = { ...formData };
      if (!editingProduct) delete payload.id;
      await dbService.saveProduct(payload);
      await refreshProducts();
      setShowAddModal(false);
      setEditingProduct(null);
    } catch (e: any) {
      alert('Save failed');
    } finally {
      setIsDataLoading(false);
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => setFormData({ ...formData, image_url: reader.result as string });
    reader.readAsDataURL(file);
  };

  const sqlCode = `CREATE TABLE IF NOT EXISTS products (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  title text, price numeric, category text, description text, image_url text, sizes text[], rating numeric, reviews numeric
);

CREATE TABLE IF NOT EXISTS orders (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  customer_name text, phone text, city text, address text, email text, items jsonb, total numeric, status text
);`;

  // Fix: Added copyToClipboard function to handle database schema export
  const copyToClipboard = () => {
    navigator.clipboard.writeText(sqlCode).then(() => {
      alert('SQL script copied to clipboard!');
    }).catch(err => {
      console.error('Failed to copy: ', err);
    });
  };

  const filteredProducts = products.filter(p => p.title?.toLowerCase().includes(searchTerm.toLowerCase()));
  const diagnostics = getDiagnostics();

  return (
    <div className="min-h-screen bg-black flex flex-col md:flex-row font-sans">
      {/* Sidebar */}
      <div className="w-full md:w-64 bg-black border-r border-white/10 p-6 flex flex-col">
        <div className="flex items-center gap-3 mb-10 px-2">
          <div className="bg-accent p-2 rounded-lg shadow-lg"><LayoutDashboard size={20} className="text-black" /></div>
          <span className="font-black uppercase tracking-tighter text-xl text-white">SKT<span className="text-accent italic">OPS</span></span>
        </div>

        <nav className="flex-grow space-y-2">
          <button onClick={() => setActiveTab('products')} className={`w-full flex items-center justify-between px-4 py-3 rounded-xl font-bold transition-all ${activeTab === 'products' ? 'bg-accent text-black' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}>
            <div className="flex items-center gap-3"><Package size={18} /> Products</div>
            {dbStatus?.success && <Zap size={10} className="text-black animate-pulse" />}
          </button>
          <button onClick={() => setActiveTab('orders')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-all ${activeTab === 'orders' ? 'bg-accent text-black' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}><ShoppingBag size={18} /> Orders</button>
          <button onClick={() => setActiveTab('setup')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-all ${activeTab === 'setup' ? 'bg-accent text-black' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}><Settings size={18} /> Cloud Sync</button>
        </nav>

        <div className={`mt-6 mb-6 px-4 py-4 rounded-2xl border ${dbStatus?.success ? 'bg-green-500/10 border-green-500/20' : 'bg-red-500/10 border-red-500/20'}`}>
           <p className={`text-[10px] leading-tight font-black uppercase tracking-widest ${dbStatus?.success ? 'text-green-400' : 'text-red-400'}`}>
              {dbStatus ? dbStatus.message : 'SYNCING...'}
           </p>
           {dbStatus?.details && <p className="text-[8px] text-gray-500 mt-1 uppercase truncate">{dbStatus.details}</p>}
        </div>

        <button onClick={logoutAdmin} className="mt-auto flex items-center gap-3 px-4 py-3 text-red-400 font-bold hover:bg-red-400/10 rounded-xl transition-all">
          <LogOut size={18} /> Log Out
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6 md:p-10 overflow-y-auto max-h-screen bg-[#050505] custom-scrollbar">
        
        {activeTab === 'setup' ? (
          <div className="max-w-4xl animate-fade-in-up space-y-8">
            <div className="bg-[#111] border border-white/10 rounded-[2.5rem] p-10 relative overflow-hidden">
               <div className="absolute top-0 right-0 p-10 opacity-10"><Database size={120} /></div>
               <h1 className="text-4xl font-black text-white uppercase italic tracking-tighter mb-4">Cloud <span className="text-accent">Assistant</span></h1>
               <p className="text-gray-400 text-sm font-urdu leading-relaxed max-w-xl">
                 {"اگر آپ کے پروڈکٹس دوسرے موبائل پر شو نہیں ہو رہے، تو اس کا مطلب ہے کہ کلاؤڈ کنکشن میں کوئی غلطی ہے۔ نیچے دی گئی ہدایات پر عمل کریں۔"}
               </p>
            </div>

            {/* ERROR ALERT BOX */}
            {diagnostics.isNameError && (
              <div className="bg-red-500 border-4 border-white rounded-[2rem] p-8 animate-bounce shadow-[0_0_50px_rgba(239,68,68,0.4)]">
                <div className="flex items-start gap-4 text-white">
                    <AlertTriangle size={48} className="shrink-0" />
                    <div>
                        <h3 className="text-2xl font-black uppercase tracking-tighter mb-2 italic">Urgent: Paste Error Detected!</h3>
                        <p className="text-sm font-urdu font-bold leading-relaxed">
                            {"آپ نے ورسل (Vercel) میں غلطی سے 'VITE_SUPABASE_ANON_KEY' کا نام ہی کاپی کر دیا ہے۔ وہاں وہ لمبا سا کوڈ (Key) ڈالنا تھا جو سپا بیس سے ملتا ہے۔"}
                        </p>
                        <div className="mt-4 bg-black/20 p-4 rounded-xl font-mono text-xs">
                            Correct format looks like: <span className="bg-white/20 px-2 py-0.5 rounded">eyJhbGciOiJIUzI1...</span>
                        </div>
                    </div>
                </div>
              </div>
            )}

            {/* DIAGNOSTICS */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className={`p-8 rounded-[2rem] border transition-all ${diagnostics.urlFound ? 'bg-green-500/5 border-green-500/20' : 'bg-[#111] border-white/5'}`}>
                   <div className="flex justify-between items-center mb-6">
                      <span className="text-[10px] font-black uppercase text-accent tracking-[0.2em]">Supabase URL</span>
                      {diagnostics.urlFound ? <Check size={20} className="text-green-500" /> : <X size={20} className="text-red-500" />}
                   </div>
                   <div className="font-mono text-xs text-white bg-black/40 p-4 rounded-xl truncate border border-white/5">
                      {diagnostics.urlValue}
                   </div>
                   {!diagnostics.urlFound && <p className="text-[9px] text-red-500 mt-4 font-black uppercase animate-pulse">Missing in Vercel Dash</p>}
                </div>

                <div className={`p-8 rounded-[2rem] border transition-all ${diagnostics.keyFound ? 'bg-green-500/5 border-green-500/20' : 'bg-[#111] border-white/5'}`}>
                   <div className="flex justify-between items-center mb-6">
                      <span className="text-[10px] font-black uppercase text-accent tracking-[0.2em]">Anon Public Key</span>
                      {diagnostics.keyFound ? <Check size={20} className="text-green-500" /> : <X size={20} className="text-red-500" />}
                   </div>
                   <div className="font-mono text-xs text-white bg-black/40 p-4 rounded-xl truncate border border-white/5">
                      {diagnostics.keyValue}
                   </div>
                   {!diagnostics.keyFound && <p className="text-[9px] text-red-500 mt-4 font-black uppercase animate-pulse">Missing or Invalid Key</p>}
                </div>
            </div>

            {/* STEP BY STEP FIX */}
            <div className="bg-[#0a0a0a] border border-white/10 rounded-[2.5rem] p-10">
                <h3 className="text-xl font-black text-white uppercase italic mb-10 flex items-center gap-3">
                   <Activity size={24} className="text-accent" /> Quick Fix Steps
                </h3>
                
                <div className="space-y-12">
                   <div className="flex gap-6">
                      <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center font-black text-accent text-xl border border-white/10">1</div>
                      <div className="flex-1">
                         <h4 className="text-white font-black uppercase text-sm mb-2">Visit Supabase Settings</h4>
                         <p className="text-gray-500 text-xs font-urdu">{"سپا بیس ڈیش بورڈ میں جا کر بائیں طرف نیچے سیٹنگ (Settings) کے آئیکون پر کلک کریں، پھر 'API' پر جائیں۔"}</p>
                         <a href="https://supabase.com/dashboard" target="_blank" className="mt-4 inline-flex items-center gap-2 text-accent text-[10px] font-black uppercase tracking-widest hover:underline">Open Dashboard <ExternalLink size={12} /></a>
                      </div>
                   </div>

                   <div className="flex gap-6">
                      <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center font-black text-accent text-xl border border-white/10">2</div>
                      <div className="flex-1">
                         <h4 className="text-white font-black uppercase text-sm mb-2">Copy 'Anon Public' Key</h4>
                         <p className="text-gray-500 text-xs font-urdu">{"وہاں سے 'anon' اور 'public' لکھا ہوا کوڈ کاپی کریں۔ یہ لمبا سا کوڈ ہوتا ہے جو 'eyJ' سے شروع ہوتا ہے۔"}</p>
                         <div className="mt-4 bg-[#111] p-3 rounded-lg border border-white/5 inline-block font-mono text-[10px] text-green-500">anon / public key [Copy this]</div>
                      </div>
                   </div>

                   <div className="flex gap-6">
                      <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center font-black text-accent text-xl border border-white/10">3</div>
                      <div className="flex-1">
                         <h4 className="text-white font-black uppercase text-sm mb-2">Update Vercel & Redeploy</h4>
                         <p className="text-gray-500 text-xs font-urdu">{"ورسل میں جا کر پرانی کی (Key) کو ڈیلیٹ کر کے نئی والی ڈالیں اور پھر ویب سائٹ کو دوبارہ ڈپلائے (Redeploy) کریں۔"}</p>
                         <div className="mt-4 flex flex-wrap gap-3">
                            <span className="bg-white/5 px-3 py-1.5 rounded-lg border border-white/10 text-[9px] font-black text-gray-400">Settings</span>
                            <ArrowRight size={12} className="text-gray-700 mt-1" />
                            <span className="bg-white/5 px-3 py-1.5 rounded-lg border border-white/10 text-[9px] font-black text-gray-400">Environment Variables</span>
                         </div>
                      </div>
                   </div>
                </div>
            </div>

            {/* SQL TOOL */}
            <div className="bg-[#111] border border-white/10 rounded-[2.5rem] p-10">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl font-black text-white uppercase italic tracking-tight">Database Schema</h3>
                  <button onClick={copyToClipboard} className="bg-accent text-black p-3 rounded-xl hover:bg-white transition-all shadow-xl flex items-center gap-2 text-[10px] font-black uppercase">
                    <Copy size={14} /> Copy Script
                  </button>
                </div>
                <pre className="bg-black/80 p-6 rounded-2xl text-[10px] text-green-400 font-mono overflow-x-auto border border-white/5 custom-scrollbar">
                  {sqlCode}
                </pre>
            </div>
          </div>
        ) : activeTab === 'products' ? (
          <div className="space-y-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
              <div>
                <h1 className="text-4xl font-black uppercase tracking-tighter text-white italic">Global <span className="text-accent">Stock</span></h1>
                <p className="text-gray-500 text-xs font-black uppercase tracking-widest mt-1">
                  {dbStatus?.success ? 'Live Cloud Database Active' : 'Offline / Local Mode Only'}
                </p>
              </div>
              <button 
                onClick={() => { setShowAddModal(true); setEditingProduct(null); setFormData({ title: '', price: 0, category: 'Men', description: '', image_url: '', sizes: ["S", "M", "L", "XL"] }); }} 
                className="bg-accent text-black px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest flex items-center gap-3 hover:bg-white transition-all shadow-[0_0_30px_rgba(255,215,0,0.3)]"
              >
                <Plus size={20} /> Add Product
              </button>
            </div>

            <div className="bg-[#111] p-5 rounded-[2rem] border border-white/10 flex items-center gap-4 focus-within:border-accent/50 transition-all">
              <Search className="text-gray-600" size={20} />
              <input placeholder="Search global database..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="flex-1 bg-transparent border-none focus:outline-none font-bold text-sm text-white uppercase tracking-widest" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {filteredProducts.map(p => (
                <div key={p.id} className="bg-[#111] rounded-[2.5rem] p-5 border border-white/5 group flex flex-col hover:border-accent/40 transition-all duration-500">
                  <div className="aspect-square rounded-3xl overflow-hidden bg-black mb-5 border border-white/5 relative">
                    <img src={p.image_url} className="w-full h-full object-cover opacity-80 transition-transform duration-700 group-hover:scale-110" alt={p.title} />
                    <div className="absolute top-4 left-4 bg-black/80 backdrop-blur-md text-accent text-[8px] font-black px-3 py-1.5 rounded-full border border-accent/20 uppercase tracking-widest">{p.category}</div>
                  </div>
                  <h3 className="font-black text-xs truncate mb-5 text-white uppercase tracking-widest">{p.title}</h3>
                  <div className="flex justify-between items-center mt-auto pt-5 border-t border-white/5">
                    <span className="font-black text-black bg-accent px-4 py-1.5 rounded-xl text-[10px] uppercase">{convertPrice(p.price)}</span>
                    <div className="flex gap-2">
                      <button onClick={() => handleEdit(p)} className="p-3 bg-white/5 text-gray-400 rounded-xl hover:bg-accent hover:text-black transition-all"><Edit size={14} /></button>
                      <button onClick={() => handleDelete(p.id)} className="p-3 bg-red-500/10 text-red-500 rounded-xl hover:bg-red-500 hover:text-white transition-all"><Trash2 size={14} /></button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="space-y-6">
             <div className="flex justify-between items-center mb-6">
                <h1 className="text-4xl font-black uppercase tracking-tighter text-white italic">Recent <span className="text-accent">Orders</span></h1>
             </div>
            {orders.length === 0 ? (
              <div className="bg-[#111] rounded-[3rem] p-24 text-center border border-white/10">
                <ShoppingBag size={40} className="text-gray-700 mx-auto mb-6" />
                <p className="text-gray-500 font-black uppercase tracking-[0.3em] text-[10px]">No Orders Found</p>
              </div>
            ) : (
              <div className="grid gap-4">
                {orders.map(order => (
                  <div key={order.id} className="bg-[#111] p-6 rounded-[2rem] border border-white/5 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 group">
                    <div className="flex items-center gap-5">
                      <div className="w-14 h-14 bg-accent/10 border border-accent/20 rounded-2xl flex items-center justify-center text-accent"><User size={24} /></div>
                      <div>
                        <h4 className="font-black text-white uppercase tracking-tight">{order.customer_name}</h4>
                        <div className="flex items-center gap-3 mt-1">
                          <span className="text-[9px] text-gray-500 uppercase font-black tracking-widest">{order.city}</span>
                          <span className="text-[9px] text-accent uppercase font-black tracking-widest">{convertPrice(order.total)}</span>
                        </div>
                      </div>
                    </div>
                    <button onClick={() => setViewingOrder(order)} className="p-3 bg-accent text-black rounded-xl hover:bg-white transition-all shadow-lg flex items-center gap-2 text-[10px] font-black uppercase">
                        <Eye size={16} /> View
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Viewing Order Modal */}
      {viewingOrder && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/90 backdrop-blur-md">
           <div className="bg-[#111] w-full max-w-2xl rounded-[3rem] overflow-hidden border border-white/10 animate-fade-in-up">
              <div className="p-8 border-b border-white/5 flex justify-between items-center bg-[#151515]">
                <h2 className="text-2xl font-black uppercase tracking-tighter text-accent">Order Details</h2>
                <button onClick={() => setViewingOrder(null)} className="p-2 text-gray-500 hover:text-white transition-colors"><X size={24} /></button>
              </div>
              <div className="p-8 space-y-8 max-h-[70vh] overflow-y-auto custom-scrollbar">
                <div className="grid grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase text-gray-500 tracking-widest">Customer</label>
                    <p className="text-white font-bold">{viewingOrder.customer_name}</p>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase text-gray-500 tracking-widest">Phone</label>
                    <p className="text-white font-bold">{viewingOrder.phone}</p>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <label className="text-[10px] font-black uppercase text-gray-500 tracking-widest">Purchased Assets</label>
                  <div className="space-y-3">
                    {viewingOrder.items.map((item, idx) => (
                      <div key={idx} className="flex items-center justify-between p-4 bg-black rounded-2xl border border-white/5">
                        <div className="flex items-center gap-4">
                          <img src={item.image} className="w-10 h-10 rounded-lg object-cover" />
                          <div>
                            <p className="text-xs font-black uppercase tracking-tight text-white">{item.productName}</p>
                            <p className="text-[9px] text-gray-500 uppercase font-black">Qty: {item.quantity}</p>
                          </div>
                        </div>
                        <span className="text-[10px] font-black text-white">{convertPrice(item.price * item.quantity)}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="p-8 bg-[#151515] border-t border-white/5">
                 <a href={`https://wa.me/${viewingOrder.phone.replace(/[^0-9]/g, '')}`} target="_blank" className="block w-full bg-green-500 text-white py-4 rounded-2xl font-black text-xs uppercase tracking-widest text-center hover:bg-green-600 transition-all">
                    Contact WhatsApp
                 </a>
              </div>
           </div>
        </div>
      )}

      {/* Product Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/95 backdrop-blur-md">
          <div className="bg-[#111] w-full max-w-2xl rounded-[3rem] overflow-hidden shadow-2xl border border-white/10 animate-fade-in-up">
            <div className="p-8 border-b border-white/5 flex justify-between items-center bg-[#151515]">
              <h2 className="text-2xl font-black uppercase tracking-tighter text-white italic">Publish <span className="text-accent">Global</span></h2>
              <button onClick={() => { setShowAddModal(false); setEditingProduct(null); }} className="p-2 text-gray-500 hover:text-white transition-colors"><X size={24} /></button>
            </div>
            
            <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-10 max-h-[70vh] overflow-y-auto custom-scrollbar">
              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase text-accent tracking-widest">Image</label>
                  <div onClick={() => fileInputRef.current?.click()} className="aspect-square bg-black rounded-[2.5rem] border-2 border-dashed border-white/10 flex items-center justify-center cursor-pointer overflow-hidden group hover:border-accent transition-all relative">
                    {formData.image_url ? (
                        <>
                            <img src={formData.image_url} className="w-full h-full object-cover group-hover:scale-105 transition-transform" alt="Preview" />
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"><Camera className="text-white" size={32} /></div>
                        </>
                    ) : (
                        <div className="text-center group-hover:scale-110 transition-transform">
                            <Camera className="text-gray-700 mx-auto" size={48} />
                            <p className="text-[10px] font-black text-gray-500 mt-3 uppercase tracking-widest">Upload Image</p>
                        </div>
                    )}
                  </div>
                  <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleImageUpload} />
                </div>
              </div>

              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-accent uppercase tracking-widest">Title</label>
                  <input value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} className="w-full bg-black border border-white/5 p-4 rounded-2xl font-black text-xs text-white focus:border-accent outline-none uppercase tracking-tighter" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-accent uppercase tracking-widest">Price (USD)</label>
                    <input type="number" value={formData.price} onChange={e => setFormData({...formData, price: parseFloat(e.target.value) || 0})} className="w-full bg-black border border-white/5 p-4 rounded-2xl font-black text-xs text-white focus:border-accent outline-none" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-accent uppercase tracking-widest">Category</label>
                    <select value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} className="w-full bg-black border border-white/5 p-4 rounded-2xl font-black text-xs text-white focus:border-accent outline-none uppercase tracking-widest">
                        <option>Men</option>
                        <option>Women</option>
                        <option>Kids</option>
                    </select>
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-accent uppercase tracking-widest">Description</label>
                  <textarea value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} rows={4} className="w-full bg-black border border-white/5 p-4 rounded-2xl text-[11px] text-gray-300 focus:border-accent outline-none resize-none leading-relaxed" />
                </div>
              </div>
            </div>

            <div className="p-8 bg-[#151515] border-t border-white/5 flex justify-end gap-4">
              <button disabled={isDataLoading} onClick={handleSave} className="bg-accent text-black px-12 py-4 rounded-2xl font-black text-xs uppercase tracking-widest flex items-center gap-3 hover:bg-white transition-all shadow-xl disabled:opacity-50">
                {isDataLoading ? <Loader2 className="animate-spin" size={20} /> : <Save size={20} />} 
                Publish to Global Database
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
