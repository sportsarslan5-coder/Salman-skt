
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
    title: '', price: 0, category: 'Men', description: '', image_url: '', sizes: ["S", "M", "L", "XL"]
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
    if (activeTab === 'orders') loadOrders();
    if (activeTab === 'products') refreshProducts();
  }, [activeTab]);

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setFormData(product);
    setShowAddModal(true);
  };

  const handleDelete = async (id: string) => {
    if (confirm('Permanently delete this item?')) {
      setIsDataLoading(true);
      await dbService.deleteProduct(id);
      await refreshProducts();
      setIsDataLoading(false);
    }
  };

  const handleSave = async () => {
    if (!formData.title || !formData.image_url) return alert('Please enter Title and select an Image!');
    setIsDataLoading(true);
    try {
        const payload = { ...formData };
        if (!editingProduct) delete payload.id;
        await dbService.saveProduct(payload);
        await refreshProducts();
        setShowAddModal(false);
        setEditingProduct(null);
    } catch (e: any) {
        alert("Error saving: " + e.message);
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

  const sqlCode = `-- 1. Tables Banane Ka Code
CREATE TABLE IF NOT EXISTS products (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  title text, price numeric, category text, description text, image_url text, sizes text[], rating numeric, reviews numeric
);

CREATE TABLE IF NOT EXISTS orders (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  customer_name text, phone text, city text, address text, email text, items jsonb, total numeric, status text
);

-- 2. Database Ko Unlock Karne Ka Code
ALTER TABLE products DISABLE ROW LEVEL SECURITY;
ALTER TABLE orders DISABLE ROW LEVEL SECURITY;`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(sqlCode).then(() => {
        alert('SQL Code Copied! Now paste it in Supabase SQL Editor and click RUN.');
    });
  };

  const filteredProducts = products.filter(p => p.title?.toLowerCase().includes(searchTerm.toLowerCase()));
  const diagnostics = getDiagnostics();

  return (
    <div className="min-h-screen bg-black flex flex-col md:flex-row font-sans selection:bg-accent selection:text-black">
      {/* Sidebar */}
      <div className="w-full md:w-64 bg-black border-r border-white/10 p-6 flex flex-col">
        <div className="flex items-center gap-3 mb-10 px-2">
          <div className="bg-accent p-2 rounded-xl shadow-[0_0_20px_rgba(255,215,0,0.3)]"><LayoutDashboard size={20} className="text-black" /></div>
          <span className="font-black uppercase tracking-tighter text-xl text-white italic">SKT<span className="text-accent">OPS</span></span>
        </div>

        <nav className="flex-grow space-y-2">
          <button onClick={() => setActiveTab('products')} className={`w-full flex items-center justify-between px-4 py-4 rounded-2xl font-black text-xs uppercase tracking-widest transition-all ${activeTab === 'products' ? 'bg-accent text-black' : 'text-gray-500 hover:text-white hover:bg-white/5'}`}>
            <div className="flex items-center gap-3"><Package size={18} /> Inventory</div>
          </button>
          <button onClick={() => setActiveTab('orders')} className={`w-full flex items-center gap-3 px-4 py-4 rounded-2xl font-black text-xs uppercase tracking-widest transition-all ${activeTab === 'orders' ? 'bg-accent text-black' : 'text-gray-500 hover:text-white hover:bg-white/5'}`}><ShoppingBag size={18} /> Orders</button>
          <button onClick={() => setActiveTab('setup')} className={`w-full flex items-center gap-3 px-4 py-4 rounded-2xl font-black text-xs uppercase tracking-widest transition-all ${activeTab === 'setup' ? 'bg-accent text-black' : 'text-gray-500 hover:text-white hover:bg-white/5'}`}><Zap size={18} /> Cloud Sync</button>
        </nav>

        <div className={`mt-6 mb-6 px-4 py-4 rounded-2xl border ${dbStatus?.success ? 'bg-green-500/10 border-green-500/20' : 'bg-red-500/10 border-red-500/20'}`}>
           <div className="flex justify-between items-center mb-1">
             <span className={`text-[10px] font-black uppercase tracking-widest ${dbStatus?.success ? 'text-green-400' : 'text-red-400'}`}>
                {dbStatus ? dbStatus.message : 'CHECKING...'}
             </span>
             <RefreshCw size={12} className={`text-gray-600 cursor-pointer ${isDataLoading ? 'animate-spin' : ''}`} onClick={checkConnection} />
           </div>
           {dbStatus?.details && <p className="text-[8px] text-gray-500 uppercase truncate font-bold">{dbStatus.details}</p>}
        </div>

        <button onClick={logoutAdmin} className="mt-auto flex items-center gap-3 px-4 py-3 text-red-500 font-black uppercase text-xs hover:bg-red-500/10 rounded-xl transition-all"><LogOut size={18} /> Exit Admin</button>
      </div>

      {/* Content Area */}
      <div className="flex-1 p-6 md:p-10 overflow-y-auto max-h-screen bg-[#050505] custom-scrollbar">
        {activeTab === 'setup' ? (
          <div className="max-w-4xl animate-fade-in-up space-y-8 pb-20">
            <div className="bg-[#111] border border-white/10 rounded-[3rem] p-10 relative overflow-hidden shadow-2xl">
               <div className="absolute top-0 right-0 p-10 opacity-5 -rotate-12"><Database size={150} /></div>
               <h1 className="text-5xl font-black text-white uppercase italic tracking-tighter mb-4">Final <span className="text-accent">Setup</span></h1>
               <p className="text-gray-400 text-sm font-urdu leading-relaxed max-w-xl">
                 {"آپ کا کنکشن (Keys) اب ٹھیک ہو گیا ہے۔ بس آخری کام یہ کرنا ہے کہ ڈیٹا بیس میں ٹیبل بنانا ہے تاکہ آپ کا سامان محفوظ ہو سکے۔"}
               </p>
            </div>

            {/* DIAGNOSTICS - Should be green now based on user screenshot */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className={`p-8 rounded-[2.5rem] border ${diagnostics.urlFound ? 'bg-green-500/5 border-green-500/20' : 'bg-red-500/5 border-red-500/20'}`}>
                   <div className="flex justify-between items-center mb-4">
                      <span className="text-[10px] font-black uppercase text-accent tracking-widest">Supabase URL</span>
                      {diagnostics.urlFound ? <Check size={20} className="text-green-500" /> : <X size={20} className="text-red-500" />}
                   </div>
                   <div className="font-mono text-[10px] text-white bg-black/40 p-4 rounded-2xl truncate border border-white/5">{diagnostics.urlValue}</div>
                </div>
                <div className={`p-8 rounded-[2.5rem] border ${diagnostics.keyFound ? 'bg-green-500/5 border-green-500/20' : 'bg-red-500/5 border-red-500/20'}`}>
                   <div className="flex justify-between items-center mb-4">
                      <span className="text-[10px] font-black uppercase text-accent tracking-widest">Anon Key Status</span>
                      {diagnostics.keyFound ? <Check size={20} className="text-green-500" /> : <X size={20} className="text-red-500" />}
                   </div>
                   <div className="font-mono text-[10px] text-white bg-black/40 p-4 rounded-2xl truncate border border-white/5">{diagnostics.keyValue}</div>
                </div>
            </div>

            {/* THE FIX: SQL INSTRUCTIONS */}
            <div className="bg-[#111] border border-white/10 rounded-[3rem] p-10 shadow-2xl">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8">
                  <div>
                    <h3 className="text-2xl font-black text-white uppercase italic tracking-tight mb-2">Step 2: Initialize Tables</h3>
                    <p className="text-gray-500 text-xs font-urdu">{"نیچے دیا گیا بٹن دبا کر کوڈ کاپی کریں اور سپا بیس میں RUN کریں۔"}</p>
                  </div>
                  <button onClick={copyToClipboard} className="bg-accent text-black px-8 py-4 rounded-2xl font-black uppercase text-xs shadow-[0_0_30px_rgba(255,215,0,0.3)] flex items-center gap-3 hover:scale-105 transition-transform active:scale-95">
                    <Copy size={18} /> Copy SQL Script
                  </button>
                </div>
                
                <div className="bg-black/60 rounded-3xl p-8 border border-white/5 relative group">
                  <div className="absolute inset-0 bg-accent/5 opacity-0 group-hover:opacity-100 transition-opacity rounded-3xl"></div>
                  <pre className="text-[11px] text-green-400 font-mono overflow-x-auto leading-relaxed custom-scrollbar">
                    {sqlCode}
                  </pre>
                </div>

                <div className="mt-8 p-6 bg-accent/5 border border-accent/20 rounded-2xl flex items-start gap-4">
                  <Info size={24} className="text-accent shrink-0" />
                  <p className="text-xs text-gray-400 font-urdu leading-relaxed">
                    {"سکرین کے بائیں طرف 'SQL Editor' میں جا کر ایک نئی 'Query' بنائیں اور وہاں یہ سارا کوڈ پیسٹ کر کے نیچے 'Run' کا بٹن دبا دیں۔ آپ کا مسئلہ حل ہو جائے گا۔"}
                  </p>
                </div>
            </div>
          </div>
        ) : activeTab === 'products' ? (
          <div className="space-y-8 pb-20">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
              <div>
                <h1 className="text-5xl font-black uppercase tracking-tighter text-white italic">Global <span className="text-accent">Stock</span></h1>
                <p className="text-gray-500 text-[10px] font-black uppercase tracking-[0.3em] mt-1">{dbStatus?.message || 'Syncing Inventory...'}</p>
              </div>
              <button onClick={() => { setShowAddModal(true); setEditingProduct(null); setFormData({ title: '', price: 0, category: 'Men', description: '', image_url: '', sizes: ["S", "M", "L", "XL"] }); }} className="bg-accent text-black px-10 py-5 rounded-[1.5rem] font-black text-xs uppercase tracking-widest flex items-center gap-3 shadow-[0_0_30px_rgba(255,215,0,0.2)] hover:scale-105 transition-transform">
                <Plus size={22} /> Add New Item
              </button>
            </div>

            <div className="bg-[#111] p-6 rounded-[2rem] border border-white/10 flex items-center gap-4 focus-within:border-accent transition-all">
              <Search className="text-gray-600" size={20} />
              <input placeholder="Search products in database..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="flex-1 bg-transparent border-none focus:outline-none font-bold text-sm text-white uppercase tracking-widest" />
            </div>

            {filteredProducts.length === 0 ? (
                <div className="py-20 text-center bg-[#111] rounded-[3rem] border border-white/5 border-dashed">
                    <Box size={60} className="text-gray-800 mx-auto mb-4" />
                    <p className="text-gray-500 font-black uppercase text-xs tracking-widest">No Products Found in Cloud</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                  {filteredProducts.map(p => (
                    <div key={p.id} className="bg-[#111] rounded-[2.5rem] p-5 border border-white/5 group flex flex-col hover:border-accent/40 transition-all duration-500">
                      <div className="aspect-square rounded-[2rem] overflow-hidden bg-black mb-5 border border-white/5 relative">
                        <img src={p.image_url} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-all duration-700" alt={p.title} />
                        <div className="absolute top-4 left-4 bg-black/80 backdrop-blur-md text-accent text-[8px] font-black px-3 py-1.5 rounded-full border border-accent/20 uppercase tracking-widest">{p.category}</div>
                      </div>
                      <h3 className="font-black text-xs truncate mb-5 text-white uppercase tracking-widest">{p.title}</h3>
                      <div className="flex justify-between items-center mt-auto pt-5 border-t border-white/5">
                        <span className="font-black text-black bg-accent px-4 py-2 rounded-xl text-[10px] uppercase tracking-tighter">{convertPrice(p.price)}</span>
                        <div className="flex gap-2">
                          <button onClick={() => handleEdit(p)} className="p-3 bg-white/5 text-gray-500 rounded-xl hover:bg-accent hover:text-black transition-all"><Edit size={14} /></button>
                          <button onClick={() => handleDelete(p.id)} className="p-3 bg-red-500/10 text-red-500 rounded-xl hover:bg-red-500 hover:text-white transition-all"><Trash2 size={14} /></button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
            )}
          </div>
        ) : (
          <div className="space-y-8 pb-20">
            <h1 className="text-5xl font-black uppercase tracking-tighter text-white italic">Recent <span className="text-accent">Orders</span></h1>
            {orders.length === 0 ? (
                <div className="py-20 text-center bg-[#111] rounded-[3rem] border border-white/5">
                    <ShoppingBag size={60} className="text-gray-800 mx-auto mb-4" />
                    <p className="text-gray-500 font-black uppercase text-xs tracking-widest">Waiting for Global Orders</p>
                </div>
            ) : (
              <div className="grid gap-4">
                {orders.map(order => (
                  <div key={order.id} className="bg-[#111] p-8 rounded-[2.5rem] border border-white/5 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 group hover:border-accent/20 transition-all">
                    <div className="flex items-center gap-6">
                      <div className="w-16 h-16 bg-accent/10 border border-accent/20 rounded-[1.5rem] flex items-center justify-center text-accent group-hover:scale-110 transition-transform"><User size={28} /></div>
                      <div>
                        <h4 className="font-black text-lg text-white uppercase tracking-tight">{order.customer_name}</h4>
                        <div className="flex items-center gap-4 mt-1">
                          <span className="text-[10px] text-gray-500 uppercase font-black tracking-widest">{order.city}</span>
                          <span className="w-1 h-1 bg-gray-800 rounded-full"></span>
                          <span className="text-[10px] text-accent uppercase font-black tracking-widest">{convertPrice(order.total)}</span>
                        </div>
                      </div>
                    </div>
                    <button onClick={() => setViewingOrder(order)} className="p-4 bg-accent text-black rounded-2xl hover:bg-white transition-all shadow-xl flex items-center gap-3 text-[10px] font-black uppercase tracking-widest">
                        <Eye size={18} /> Full Details
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* View Order Modal */}
      {viewingOrder && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/95 backdrop-blur-xl">
           <div className="bg-[#111] w-full max-w-2xl rounded-[3rem] overflow-hidden border border-white/10 animate-fade-in-up">
              <div className="p-10 border-b border-white/5 flex justify-between items-center bg-[#151515]">
                <h2 className="text-3xl font-black uppercase tracking-tighter text-accent italic">Order Details</h2>
                <button onClick={() => setViewingOrder(null)} className="p-3 text-gray-500 hover:text-white hover:bg-white/5 rounded-full transition-all"><X size={28} /></button>
              </div>
              <div className="p-10 space-y-8 max-h-[60vh] overflow-y-auto custom-scrollbar">
                <div className="grid grid-cols-2 gap-10">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase text-gray-500 tracking-widest">Customer</label>
                    <p className="text-white font-black text-xl">{viewingOrder.customer_name}</p>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase text-gray-500 tracking-widest">Phone</label>
                    <p className="text-accent font-black text-xl">{viewingOrder.phone}</p>
                  </div>
                </div>
                
                <div className="space-y-6">
                  <label className="text-[10px] font-black uppercase text-gray-500 tracking-widest block">Ordered Assets</label>
                  <div className="space-y-4">
                    {viewingOrder.items.map((item, idx) => (
                      <div key={idx} className="flex items-center justify-between p-6 bg-black rounded-[1.5rem] border border-white/5">
                        <div className="flex items-center gap-5">
                          <img src={item.image} className="w-14 h-14 rounded-xl object-cover border border-white/10" />
                          <div>
                            <p className="text-sm font-black uppercase tracking-tight text-white">{item.productName}</p>
                            <p className="text-[10px] text-gray-500 uppercase font-black mt-1">Size: {item.size} • Qty: {item.quantity}</p>
                          </div>
                        </div>
                        <span className="text-sm font-black text-accent">{convertPrice(item.price * item.quantity)}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="p-10 bg-[#151515] border-t border-white/5">
                 <a href={`https://wa.me/${viewingOrder.phone.replace(/[^0-9]/g, '')}`} target="_blank" className="flex items-center justify-center gap-3 w-full bg-green-500 text-white py-6 rounded-[1.5rem] font-black text-sm uppercase tracking-widest hover:bg-green-600 transition-all shadow-xl">
                    <Phone size={20} /> Open WhatsApp Chat
                 </a>
              </div>
           </div>
        </div>
      )}

      {/* Add/Edit Product Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/95 backdrop-blur-2xl">
          <div className="bg-[#111] w-full max-w-3xl rounded-[3rem] overflow-hidden shadow-2xl border border-white/10 animate-fade-in-up">
            <div className="p-10 border-b border-white/5 flex justify-between items-center bg-[#151515]">
              <h2 className="text-3xl font-black uppercase tracking-tighter text-white italic">Publish <span className="text-accent">Global</span></h2>
              <button onClick={() => setShowAddModal(false)} className="p-3 text-gray-500 hover:text-white rounded-full transition-all"><X size={28} /></button>
            </div>
            
            <div className="p-10 grid grid-cols-1 md:grid-cols-2 gap-12 max-h-[70vh] overflow-y-auto custom-scrollbar">
              <div className="space-y-8">
                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase text-accent tracking-[0.2em]">Product Asset Image</label>
                  <div onClick={() => fileInputRef.current?.click()} className="aspect-square bg-black rounded-[2.5rem] border-2 border-dashed border-white/10 flex items-center justify-center cursor-pointer overflow-hidden group hover:border-accent transition-all relative">
                    {formData.image_url ? (
                        <img src={formData.image_url} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                    ) : (
                        <div className="text-center">
                            <Camera className="mx-auto text-gray-800 group-hover:text-accent transition-colors" size={60} />
                            <p className="text-[10px] font-black text-gray-600 mt-4 uppercase tracking-widest">Upload Photo</p>
                        </div>
                    )}
                  </div>
                  <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleImageUpload} />
                </div>
              </div>

              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-accent uppercase tracking-widest">Asset Name</label>
                  <input value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} placeholder="Premium Hoodie" className="w-full bg-black border border-white/10 p-5 rounded-2xl font-black text-xs text-white outline-none focus:border-accent uppercase tracking-tighter" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-accent uppercase tracking-widest">Base Price</label>
                    <input type="number" value={formData.price} onChange={e => setFormData({...formData, price: parseFloat(e.target.value) || 0})} className="w-full bg-black border border-white/10 p-5 rounded-2xl font-black text-xs text-white outline-none focus:border-accent" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-accent uppercase tracking-widest">Tag</label>
                    <select value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} className="w-full bg-black border border-white/10 p-5 rounded-2xl font-black text-xs text-white outline-none focus:border-accent uppercase">
                        <option>Men</option>
                        <option>Women</option>
                        <option>Kids</option>
                    </select>
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-accent uppercase tracking-widest">Technical Specs</label>
                  <textarea value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} rows={5} placeholder="Fabric details, technology used..." className="w-full bg-black border border-white/10 p-5 rounded-2xl text-[11px] text-gray-400 outline-none focus:border-accent resize-none leading-relaxed" />
                </div>
              </div>
            </div>

            <div className="p-10 bg-[#151515] border-t border-white/5 flex justify-end">
              <button disabled={isDataLoading} onClick={handleSave} className="bg-accent text-black px-16 py-6 rounded-[1.5rem] font-black uppercase text-xs tracking-[0.2em] shadow-2xl flex items-center gap-4 hover:scale-105 transition-all disabled:opacity-50">
                {isDataLoading ? <Loader2 className="animate-spin" /> : <Save size={22} />} 
                Publish to Global Sync
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
