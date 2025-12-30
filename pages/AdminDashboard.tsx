
import React, { useState, useEffect, useRef } from 'react';
import { 
  Package, ShoppingBag, Plus, Edit, Trash2, X, Check, Save, 
  Camera, DollarSign, LayoutDashboard, LogOut, Search,
  Eye, Box, MapPin, User, Mail, Phone, Calendar, Loader2,
  Wifi, WifiOff, AlertTriangle, RefreshCw, Settings, ExternalLink, Database, AlertCircle, Info, Copy, Terminal, Zap
} from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { dbService } from '../services/dbService';
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
    const status = await dbService.checkConnection();
    setDbStatus(status);
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
    if (confirm('Permanently delete this product from global database?')) {
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
    if (!formData.title || !formData.image_url) return alert('Title and Image are mandatory!');
    if (!formData.price || formData.price <= 0) return alert('Valid price required');
    
    setIsDataLoading(true);
    try {
      const payload = { ...formData };
      if (!editingProduct) delete payload.id;

      await dbService.saveProduct(payload);
      await refreshProducts();
      setShowAddModal(false);
      setEditingProduct(null);
      setFormData({ title: '', price: 0, category: 'Men', description: '', image_url: '', sizes: ["S", "M", "L", "XL"] });
    } catch (e: any) {
      console.error(e);
      alert('Save failed: ' + e.message);
    } finally {
      setIsDataLoading(false);
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      setFormData({ ...formData, image_url: reader.result as string });
    };
    reader.readAsDataURL(file);
  };

  const sqlCode = `-- Global Database Setup
CREATE TABLE products (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  title text,
  price numeric,
  category text,
  description text,
  image_url text,
  sizes text[],
  rating numeric,
  reviews numeric
);

CREATE TABLE orders (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  customer_name text,
  phone text,
  city text,
  address text,
  email text,
  items jsonb,
  total numeric,
  status text
);`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(sqlCode);
    alert("SQL Code Copied! Now run this in Supabase SQL Editor.");
  };

  const filteredProducts = products.filter(p => 
    p.title?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-black flex flex-col md:flex-row">
      {/* Sidebar */}
      <div className="w-full md:w-64 bg-black border-r border-white/10 p-6 flex flex-col">
        <div className="flex items-center gap-3 mb-10 px-2">
          <div className="bg-accent p-2 rounded-lg shadow-[0_0_15px_rgba(255,215,0,0.4)]"><LayoutDashboard size={20} className="text-black" /></div>
          <span className="font-black uppercase tracking-tighter text-xl text-white">SKT<span className="text-accent italic">OPS</span></span>
        </div>

        <nav className="flex-grow space-y-2">
          <button onClick={() => setActiveTab('products')} className={`w-full flex items-center justify-between px-4 py-3 rounded-xl font-bold transition-all ${activeTab === 'products' ? 'bg-accent text-black' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}>
            <div className="flex items-center gap-3"><Package size={18} /> Inventory</div>
            {dbStatus?.success && <Zap size={12} className="text-black animate-pulse" />}
          </button>
          <button onClick={() => setActiveTab('orders')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-all ${activeTab === 'orders' ? 'bg-accent text-black' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}><ShoppingBag size={18} /> Orders</button>
          <button onClick={() => setActiveTab('setup')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-all ${activeTab === 'setup' ? 'bg-accent text-black' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}><Settings size={18} /> Cloud Sync</button>
        </nav>

        {/* Sync Status Sidebar */}
        <div className={`mt-6 mb-6 px-4 py-4 rounded-2xl border ${dbStatus?.success ? 'bg-green-500/10 border-green-500/20' : 'bg-red-500/10 border-red-500/20'}`}>
           <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Database size={14} className={dbStatus?.success ? "text-green-500" : "text-red-500"} />
                <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">{dbStatus?.success ? 'Global Sync' : 'Offline'}</span>
              </div>
              <button onClick={checkConnection} className="text-gray-500 hover:text-white transition-colors"><RefreshCw size={12} className={isLoading ? 'animate-spin' : ''} /></button>
           </div>
           <p className={`text-[10px] leading-tight font-black uppercase tracking-tighter ${dbStatus?.success ? 'text-green-400' : 'text-red-400'}`}>
              {dbStatus ? dbStatus.message : 'SYNCING...'}
           </p>
           {dbStatus?.success && (
              <div className="mt-2 flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-ping"></div>
                <span className="text-[8px] text-green-500 font-black uppercase tracking-widest">Connected to Cloud</span>
              </div>
           )}
        </div>

        <button onClick={logoutAdmin} className="mt-auto flex items-center gap-3 px-4 py-3 text-red-400 font-bold hover:bg-red-400/10 rounded-xl transition-all">
          <LogOut size={18} /> Log Out
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6 md:p-10 overflow-y-auto max-h-screen bg-[#050505]">
        
        {activeTab === 'setup' ? (
          <div className="max-w-4xl animate-fade-in-up">
            <h1 className="text-3xl font-black uppercase tracking-tighter text-white mb-2 italic">Global Cloud Setup</h1>
            <p className="text-gray-500 mb-10 text-xs font-black uppercase tracking-[0.2em]">Sync your products to every device in the world.</p>

            <div className="grid gap-8">
              <div className="bg-[#111] border border-white/10 rounded-[2rem] p-8 hover:border-accent/30 transition-all">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-accent rounded-2xl flex items-center justify-center font-black text-black text-xl shadow-lg">1</div>
                  <div>
                    <h3 className="text-xl font-black text-white uppercase tracking-tight italic">Provision Database</h3>
                    <p className="text-gray-500 text-[10px] font-black uppercase tracking-widest">Create a project on Supabase.com</p>
                  </div>
                </div>
                <p className="text-gray-400 mb-6 text-sm font-urdu leading-relaxed">
                  {"سپا بیس (Supabase) پر جا کر ایک نیا پروجیکٹ بنائیں تاکہ آپ کا ڈیٹا کلاؤڈ پر محفوظ ہو سکے۔"}
                </p>
                <a href="https://supabase.com" target="_blank" className="inline-flex items-center gap-2 bg-white/5 border border-white/10 px-6 py-3 rounded-xl text-white text-xs font-black uppercase tracking-widest hover:bg-accent hover:text-black transition-all">Supabase Dashboard <ExternalLink size={14} /></a>
              </div>

              <div className="bg-[#111] border border-white/10 rounded-[2rem] p-8 hover:border-accent/30 transition-all">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-accent rounded-2xl flex items-center justify-center font-black text-black text-xl shadow-lg">2</div>
                  <div>
                    <h3 className="text-xl font-black text-white uppercase tracking-tight italic">SQL Schema Initialization</h3>
                    <p className="text-gray-500 text-[10px] font-black uppercase tracking-widest">Execute code in SQL Editor</p>
                  </div>
                </div>
                <div className="relative group">
                  <pre className="bg-black/80 p-6 rounded-2xl text-[11px] text-green-400 font-mono overflow-x-auto border border-white/5 custom-scrollbar">
                    {sqlCode}
                  </pre>
                  <button onClick={copyToClipboard} className="absolute top-4 right-4 bg-accent text-black p-3 rounded-xl hover:bg-white transition-all shadow-xl flex items-center gap-2 text-[10px] font-black uppercase">
                    <Copy size={14} /> Copy Script
                  </button>
                </div>
              </div>

              <div className="bg-[#111] border border-white/10 rounded-[2rem] p-8 hover:border-accent/30 transition-all">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-accent rounded-2xl flex items-center justify-center font-black text-black text-xl shadow-lg">3</div>
                  <div>
                    <h3 className="text-xl font-black text-white uppercase tracking-tight italic">Environment Sync</h3>
                    <p className="text-gray-500 text-[10px] font-black uppercase tracking-widest">Configure Vercel Variables</p>
                  </div>
                </div>
                <p className="text-gray-400 mb-6 text-sm font-urdu leading-relaxed">
                  {"ورسل (Vercel) میں جا کر نیچے دی گئی دو کیز (Keys) شامل کریں اور ویب سائٹ کو دوبارہ ڈپلائے (Redeploy) کریں۔"}
                </p>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-5 bg-black rounded-2xl border border-white/5 font-mono text-xs">
                    <span className="text-accent font-black">VITE_SUPABASE_URL</span>
                    <Terminal size={14} className="text-gray-700" />
                  </div>
                  <div className="flex items-center justify-between p-5 bg-black rounded-2xl border border-white/5 font-mono text-xs">
                    <span className="text-accent font-black">VITE_SUPABASE_ANON_KEY</span>
                    <Terminal size={14} className="text-gray-700" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : activeTab === 'products' ? (
          <div className="space-y-8">
            {!dbStatus?.success && (
                <div className="bg-red-500/10 border border-red-500/20 p-6 rounded-3xl flex items-start gap-4 animate-fade-in-up">
                    <div className="bg-red-500 p-2 rounded-lg text-white"><AlertTriangle size={24} /></div>
                    <div className="space-y-1">
                        <h4 className="text-red-500 font-black uppercase text-sm tracking-widest italic">Local Development Active</h4>
                        <p className="text-gray-400 text-[11px] leading-relaxed font-urdu">
                            {"آپ کا ڈیٹا ابھی صرف اسی فون/کمپیوٹر میں سیو ہوگا۔ اسے پوری دنیا کو دکھانے کے لیے 'Cloud Sync' ٹیب استعمال کریں۔"}
                        </p>
                    </div>
                </div>
            )}

            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
              <div>
                <h1 className="text-4xl font-black uppercase tracking-tighter text-white italic">Inventory <span className="text-accent">Stock</span></h1>
                <p className="text-gray-500 text-xs font-black uppercase tracking-widest mt-1">Found {filteredProducts.length} Items in Database</p>
              </div>
              <button 
                onClick={() => { setShowAddModal(true); setEditingProduct(null); setFormData({ title: '', price: 0, category: 'Men', description: '', image_url: '', sizes: ["S", "M", "L", "XL"] }); }} 
                className="bg-accent text-black px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest flex items-center gap-3 hover:bg-white transition-all shadow-[0_0_30px_rgba(255,215,0,0.3)]"
              >
                <Plus size={20} /> Add New Asset
              </button>
            </div>

            <div className="bg-[#111] p-5 rounded-[2rem] border border-white/10 flex items-center gap-4 focus-within:border-accent/50 transition-all">
              <Search className="text-gray-600" size={20} />
              <input placeholder="Filter global inventory..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="flex-1 bg-transparent border-none focus:outline-none font-bold text-sm text-white uppercase tracking-widest" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {filteredProducts.map(p => (
                <div key={p.id} className="bg-[#111] rounded-[2.5rem] p-5 shadow-sm border border-white/5 group flex flex-col hover:border-accent/40 transition-all duration-500">
                  <div className="aspect-square rounded-3xl overflow-hidden bg-black mb-5 border border-white/5 relative">
                    <img src={p.image_url} className="w-full h-full object-cover opacity-80 transition-transform duration-700 group-hover:scale-110" alt={p.title} />
                    <div className="absolute top-4 left-4 bg-black/80 backdrop-blur-md text-accent text-[8px] font-black px-3 py-1.5 rounded-full border border-accent/20 uppercase tracking-widest">{p.category}</div>
                    {dbStatus?.success && (
                      <div className="absolute top-4 right-4 bg-green-500/20 text-green-400 text-[8px] font-black px-3 py-1.5 rounded-full border border-green-500/20 uppercase tracking-widest flex items-center gap-1">
                        <Zap size={8} fill="currentColor" /> Cloud
                      </div>
                    )}
                  </div>
                  <h3 className="font-black text-xs truncate pr-4 mb-5 text-white uppercase tracking-widest">{p.title}</h3>
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
                <h1 className="text-4xl font-black uppercase tracking-tighter text-white italic">Sales <span className="text-accent">Orders</span></h1>
                <div className="flex items-center gap-3 bg-white/5 px-4 py-2 rounded-xl">
                    <Box size={16} className="text-accent" />
                    <span className="text-[10px] font-black uppercase text-gray-400">Syncing with Live Feed</span>
                </div>
             </div>
            {orders.length === 0 ? (
              <div className="bg-[#111] rounded-[3rem] p-24 text-center border border-white/10 animate-fade-in">
                <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6">
                   <ShoppingBag size={40} className="text-gray-700" />
                </div>
                <p className="text-gray-500 font-black uppercase tracking-[0.3em] text-[10px]">Awaiting Global Customers</p>
              </div>
            ) : (
              <div className="grid gap-4">
                {orders.map(order => (
                  <div key={order.id} className="bg-[#111] p-6 rounded-[2rem] border border-white/5 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 hover:border-accent/30 transition-all group">
                    <div className="flex items-center gap-5">
                      <div className="w-14 h-14 bg-accent/10 border border-accent/20 rounded-2xl flex items-center justify-center text-accent group-hover:scale-110 transition-transform"><User size={24} /></div>
                      <div>
                        <h4 className="font-black text-white uppercase tracking-tight">{order.customer_name}</h4>
                        <div className="flex items-center gap-3 mt-1">
                          <span className="text-[9px] text-gray-500 uppercase font-black tracking-widest">{order.city}</span>
                          <span className="w-1 h-1 bg-gray-700 rounded-full"></span>
                          <span className="text-[9px] text-accent uppercase font-black tracking-widest">{convertPrice(order.total)}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 w-full md:w-auto">
                        <div className="px-4 py-2 bg-black border border-white/5 rounded-xl text-[10px] font-black uppercase tracking-widest text-gray-500 flex-grow text-center">
                            {new Date(order.created_at).toLocaleDateString()}
                        </div>
                        <button onClick={() => setViewingOrder(order)} className="p-3 bg-accent text-black rounded-xl hover:bg-white transition-all shadow-lg flex items-center gap-2 text-[10px] font-black uppercase">
                            <Eye size={16} /> View
                        </button>
                    </div>
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
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase text-gray-500 tracking-widest">Address</label>
                    <p className="text-white text-xs leading-relaxed">{viewingOrder.address}, {viewingOrder.city}</p>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase text-gray-500 tracking-widest">Total Value</label>
                    <p className="text-accent font-black text-xl tracking-tighter">{convertPrice(viewingOrder.total)}</p>
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
                            <p className="text-[9px] text-gray-500 uppercase font-black">Size: {item.size} • Qty: {item.quantity}</p>
                          </div>
                        </div>
                        <span className="text-[10px] font-black text-white">{convertPrice(item.price * item.quantity)}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="p-8 bg-[#151515] border-t border-white/5 flex gap-4">
                 <a href={`https://wa.me/${viewingOrder.phone.replace(/[^0-9]/g, '')}`} target="_blank" className="flex-1 bg-green-500 text-white py-4 rounded-2xl font-black text-xs uppercase tracking-widest text-center hover:bg-green-600 transition-all flex items-center justify-center gap-2">
                    <Phone size={16} /> Contact Customer
                 </a>
                 <button onClick={() => setViewingOrder(null)} className="px-10 py-4 bg-white/5 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-white/10 transition-all">Close</button>
              </div>
           </div>
        </div>
      )}

      {/* Product Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/95 backdrop-blur-md">
          <div className="bg-[#111] w-full max-w-2xl rounded-[3rem] overflow-hidden shadow-2xl border border-white/10 animate-fade-in-up">
            <div className="p-8 border-b border-white/5 flex justify-between items-center bg-[#151515]">
              <h2 className="text-2xl font-black uppercase tracking-tighter text-white italic">Asset <span className="text-accent">Manager</span></h2>
              <button onClick={() => { setShowAddModal(false); setEditingProduct(null); }} className="p-2 text-gray-500 hover:text-white transition-colors"><X size={24} /></button>
            </div>
            
            <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-10 max-h-[70vh] overflow-y-auto custom-scrollbar">
              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase text-accent tracking-widest">Image Asset</label>
                  <div onClick={() => fileInputRef.current?.click()} className="aspect-square bg-black rounded-[2.5rem] border-2 border-dashed border-white/10 flex items-center justify-center cursor-pointer overflow-hidden group hover:border-accent transition-all relative">
                    {formData.image_url ? (
                        <>
                            <img src={formData.image_url} className="w-full h-full object-cover group-hover:scale-105 transition-transform" alt="Preview" />
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"><Camera className="text-white" size={32} /></div>
                        </>
                    ) : (
                        <div className="text-center group-hover:scale-110 transition-transform">
                            <Camera className="text-gray-700 mx-auto" size={48} />
                            <p className="text-[10px] font-black text-gray-500 mt-3 uppercase tracking-widest">Upload Stock Image</p>
                        </div>
                    )}
                  </div>
                  <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleImageUpload} />
                </div>
              </div>

              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-accent uppercase tracking-widest">Asset Title</label>
                  <input value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} placeholder="e.g. Premium Protex Jacket" className="w-full bg-black border border-white/5 p-4 rounded-2xl font-black text-xs text-white focus:border-accent outline-none uppercase tracking-tighter" />
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
                  <label className="text-[10px] font-black text-accent uppercase tracking-widest">Technical Description</label>
                  <textarea value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} rows={4} placeholder="Mention fabric technology, fit, and origin..." className="w-full bg-black border border-white/5 p-4 rounded-2xl text-[11px] text-gray-300 focus:border-accent outline-none resize-none leading-relaxed" />
                </div>
              </div>
            </div>

            <div className="p-8 bg-[#151515] border-t border-white/5 flex justify-end gap-4">
              <button onClick={() => { setShowAddModal(false); setEditingProduct(null); }} className="px-8 py-4 font-black text-gray-500 uppercase text-[10px] tracking-widest hover:text-white transition-colors">Discard</button>
              <button disabled={isDataLoading} onClick={handleSave} className="bg-accent text-black px-12 py-4 rounded-2xl font-black text-xs uppercase tracking-widest flex items-center gap-3 hover:bg-white transition-all shadow-[0_0_25px_rgba(255,215,0,0.2)] disabled:opacity-50">
                {isDataLoading ? <Loader2 className="animate-spin" size={20} /> : <Save size={20} />} 
                {editingProduct ? 'Update Global Asset' : 'Publish to Cloud'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
