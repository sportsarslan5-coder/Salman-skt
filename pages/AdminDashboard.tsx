import React, { useState, useEffect, useRef } from 'react';
import { 
  Package, ShoppingBag, Plus, Edit, Trash2, X, Check, Save, 
  Camera, DollarSign, LayoutDashboard, LogOut, Search,
  Eye, Box, MapPin, User, Mail, Phone, Calendar, Loader2,
  Wifi, WifiOff, AlertTriangle, RefreshCw, Settings, ExternalLink, Database, AlertCircle, Info, Copy, Terminal
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
    if (!formData.title || !formData.image_url) return alert('Please fill required fields (Title & Image)');
    if (!formData.price || formData.price <= 0) return alert('Please enter a valid price');
    
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

  const sqlCode = `-- Step 1: Create Products Table
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

-- Step 2: Create Orders Table
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
    alert("SQL Code Copied! Now paste it in Supabase SQL Editor.");
  };

  const filteredProducts = products.filter(p => 
    p.title?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-black flex flex-col md:flex-row">
      {/* Sidebar */}
      <div className="w-full md:w-64 bg-black border-r border-white/10 p-6 flex flex-col">
        <div className="flex items-center gap-3 mb-10 px-2">
          <div className="bg-accent p-2 rounded-lg"><LayoutDashboard size={20} className="text-black" /></div>
          <span className="font-black uppercase tracking-tighter text-xl text-white">SKT PANEL</span>
        </div>

        <nav className="flex-grow space-y-2">
          <button onClick={() => setActiveTab('products')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-all ${activeTab === 'products' ? 'bg-accent text-black' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}><Package size={18} /> Inventory</button>
          <button onClick={() => setActiveTab('orders')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-all ${activeTab === 'orders' ? 'bg-accent text-black' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}><ShoppingBag size={18} /> Orders</button>
          <button onClick={() => setActiveTab('setup')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-all ${activeTab === 'setup' ? 'bg-accent text-black' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}><Settings size={18} /> Global Sync Setup</button>
        </nav>

        {/* Sync Status Sidebar */}
        <div className={`mt-6 mb-6 px-4 py-3 rounded-xl border ${dbStatus?.success ? 'bg-green-500/10 border-green-500/20' : 'bg-red-500/10 border-red-500/20'}`}>
           <div className="flex items-center justify-between mb-1">
              <div className="flex items-center gap-2">
                <Database size={14} className={dbStatus?.success ? "text-green-500" : "text-red-500"} />
                <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">{dbStatus?.success ? 'Cloud Active' : 'Local Only'}</span>
              </div>
              <button onClick={checkConnection} className="text-gray-500 hover:text-white transition-colors"><RefreshCw size={12} className={isLoading ? 'animate-spin' : ''} /></button>
           </div>
           <p className={`text-[10px] leading-tight font-black uppercase tracking-tighter ${dbStatus?.success ? 'text-green-400' : 'text-red-400'}`}>
              {dbStatus ? dbStatus.message : 'CHECKING...'}
           </p>
        </div>

        <button onClick={logoutAdmin} className="mt-auto flex items-center gap-3 px-4 py-3 text-red-400 font-bold hover:bg-red-400/10 rounded-xl transition-all">
          <LogOut size={18} /> Exit Admin
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6 md:p-10 overflow-y-auto max-h-screen bg-[#050505]">
        
        {activeTab === 'setup' ? (
          <div className="max-w-4xl animate-fade-in-up">
            <h1 className="text-3xl font-black uppercase tracking-tighter text-white mb-2">Global Sync Setup</h1>
            <p className="text-gray-500 mb-10">Follow these steps to make your products visible on all mobile devices.</p>

            <div className="grid gap-8">
              {/* Step 1 */}
              <div className="bg-[#111] border border-white/10 rounded-[2rem] p-8">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-10 h-10 bg-accent rounded-full flex items-center justify-center font-black text-black">1</div>
                  <h3 className="text-xl font-black text-white uppercase tracking-tight">Create Supabase Project</h3>
                </div>
                <p className="text-gray-400 mb-4 text-sm font-urdu leading-relaxed">
                  {"سب سے پہلے supabase.com پر جائیں اور ایک فری اکاؤنٹ بنا کر نیا پروجیکٹ شروع کریں۔"}
                </p>
                <a href="https://supabase.com" target="_blank" className="inline-flex items-center gap-2 text-accent text-sm font-bold border-b border-accent pb-1 hover:text-white transition-colors">Go to Supabase Dashboard <ExternalLink size={14} /></a>
              </div>

              {/* Step 2 */}
              <div className="bg-[#111] border border-white/10 rounded-[2rem] p-8">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-10 h-10 bg-accent rounded-full flex items-center justify-center font-black text-black">2</div>
                  <h3 className="text-xl font-black text-white uppercase tracking-tight">Setup Database Tables</h3>
                </div>
                <p className="text-gray-400 mb-6 text-sm font-urdu leading-relaxed">
                  {"اپنے پروجیکٹ میں SQL Editor پر کلک کریں اور وہ کوڈ جو تصویر میں کامیاب ہوا تھا، اسے دوبارہ چیک کرنے کی ضرورت نہیں کیونکہ وہ سیٹ ہو چکا ہے۔"}
                </p>
                <div className="relative group">
                  <pre className="bg-black/50 p-6 rounded-2xl text-[11px] text-green-400 font-mono overflow-x-auto border border-white/5">
                    {sqlCode}
                  </pre>
                  <button onClick={copyToClipboard} className="absolute top-4 right-4 bg-accent text-black p-3 rounded-xl hover:bg-white transition-all shadow-xl flex items-center gap-2 text-[10px] font-black uppercase">
                    <Copy size={14} /> Copy SQL Code
                  </button>
                </div>
              </div>

              {/* Step 3 */}
              <div className="bg-[#111] border border-white/10 rounded-[2rem] p-8">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-10 h-10 bg-accent rounded-full flex items-center justify-center font-black text-black">3</div>
                  <h3 className="text-xl font-black text-white uppercase tracking-tight">Add Keys to Vercel</h3>
                </div>
                <p className="text-gray-400 mb-6 text-sm font-urdu leading-relaxed">
                  {"اب آخری کام یہ ہے کہ Supabase کی Project Settings میں جائیں، وہاں سے URL اور Anon Key کاپی کریں اور Vercel کے Environment Variables میں ڈال دیں۔"}
                </p>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-4 bg-black/50 rounded-xl border border-white/5 font-mono text-xs">
                    <span className="text-accent">VITE_SUPABASE_URL</span>
                    <span className="text-gray-500">(Copy from Supabase)</span>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-black/50 rounded-xl border border-white/5 font-mono text-xs">
                    <span className="text-accent">VITE_SUPABASE_ANON_KEY</span>
                    <span className="text-gray-500">(Copy from Supabase)</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : activeTab === 'products' ? (
          <div className="space-y-6">
            {!dbStatus?.success && (
                <div className="bg-red-500/10 border border-red-500/20 p-4 rounded-2xl flex items-start gap-4 animate-pulse">
                    <AlertTriangle className="text-red-500 shrink-0" size={24} />
                    <div className="space-y-1">
                        <h4 className="text-red-500 font-black uppercase text-xs tracking-widest">Offline Mode Active</h4>
                        <p className="text-gray-400 text-[11px] leading-relaxed font-urdu">
                            {"آپ کا ڈیٹا ابھی کلاؤڈ سے کنیکٹ نہیں ہوا۔ Keys سیٹ کرنے کے بعد یہ وارننگ ختم ہو جائے گی اور ڈیٹا ہر جگہ نظر آئے گا۔"}
                        </p>
                    </div>
                </div>
            )}

            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-3xl font-black uppercase tracking-tighter text-white">Inventory</h1>
                <p className="text-gray-500 text-sm">Managing Salman SKT Stock</p>
              </div>
              <button 
                onClick={() => { setShowAddModal(true); setEditingProduct(null); setFormData({ title: '', price: 0, category: 'Men', description: '', image_url: '', sizes: ["S", "M", "L", "XL"] }); }} 
                className="bg-accent text-black px-6 py-3 rounded-xl font-black text-xs uppercase tracking-widest flex items-center gap-2 hover:bg-white transition-all shadow-xl"
              >
                <Plus size={18} /> Add Product
              </button>
            </div>

            <div className="bg-[#111] p-4 rounded-2xl border border-white/10 flex items-center gap-3">
              <Search className="text-gray-500" size={20} />
              <input placeholder="Search current stock..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="flex-1 bg-transparent border-none focus:outline-none font-medium text-sm text-white" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map(p => (
                <div key={p.id} className="bg-[#111] rounded-3xl p-5 shadow-sm border border-white/5 group flex flex-col hover:border-accent/30 transition-all">
                  <div className="aspect-square rounded-2xl overflow-hidden bg-black mb-4 border border-white/5 relative">
                    <img src={p.image_url} className="w-full h-full object-cover opacity-80 transition-transform group-hover:scale-105" alt={p.title} />
                    <div className="absolute top-2 right-2 bg-accent text-black text-[9px] font-black px-2 py-1 rounded uppercase tracking-widest">{p.category}</div>
                  </div>
                  <h3 className="font-bold text-sm truncate pr-4 mb-4 text-white uppercase tracking-tight">{p.title}</h3>
                  <div className="flex justify-between items-center mt-auto pt-4 border-t border-white/5">
                    <span className="font-black text-black bg-accent px-3 py-1 rounded-lg text-xs">{convertPrice(p.price)}</span>
                    <div className="flex gap-2">
                      <button onClick={() => handleEdit(p)} className="p-2.5 bg-white/5 text-gray-400 rounded-xl hover:bg-accent hover:text-black transition-all"><Edit size={16} /></button>
                      <button onClick={() => handleDelete(p.id)} className="p-2.5 bg-red-500/10 text-red-400 rounded-xl hover:bg-red-500 hover:text-white transition-all"><Trash2 size={16} /></button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.length === 0 ? (
              <div className="bg-[#111] rounded-3xl p-20 text-center border border-white/10">
                <ShoppingBag size={48} className="mx-auto text-gray-700 mb-4" />
                <p className="text-gray-500 font-bold uppercase tracking-widest text-[10px]">No active orders</p>
              </div>
            ) : (
              orders.map(order => (
                <div key={order.id} className="bg-[#111] p-5 rounded-2xl border border-white/5 flex justify-between items-center hover:border-accent/30 transition-all">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center text-gray-500"><User size={20} /></div>
                    <div>
                      <h4 className="font-bold text-sm text-white">{order.customer_name}</h4>
                      <p className="text-[10px] text-accent uppercase font-black">{order.city} • {convertPrice(order.total)}</p>
                    </div>
                  </div>
                  <button onClick={() => setViewingOrder(order)} className="p-2.5 bg-accent text-black rounded-xl hover:bg-white transition-all"><Eye size={16} /></button>
                </div>
              ))
            )}
          </div>
        )}
      </div>

      {/* Product Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-[#111] w-full max-w-2xl rounded-[2.5rem] overflow-hidden shadow-2xl border border-white/10">
            <div className="p-8 border-b border-white/5 flex justify-between items-center bg-[#151515]">
              <h2 className="text-2xl font-black uppercase tracking-tighter text-white">Manage Asset</h2>
              <button onClick={() => setShowAddModal(false)} className="p-2 text-gray-500 hover:text-white transition-colors"><X size={24} /></button>
            </div>
            
            <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-10 max-h-[70vh] overflow-y-auto custom-scrollbar">
              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase text-accent tracking-widest">Image Asset</label>
                  <div onClick={() => fileInputRef.current?.click()} className="aspect-square bg-black rounded-3xl border-2 border-dashed border-white/10 flex items-center justify-center cursor-pointer overflow-hidden group hover:border-accent transition-all">
                    {formData.image_url ? <img src={formData.image_url} className="w-full h-full object-cover" alt="Preview" /> : <div className="text-center"><Camera className="text-gray-700 mx-auto" size={40} /><p className="text-[10px] font-bold text-gray-500 mt-2 uppercase">Select Photo</p></div>}
                  </div>
                  <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleImageUpload} />
                </div>
              </div>

              <div className="space-y-5">
                <div className="space-y-1">
                  <label className="text-[10px] font-black text-accent uppercase tracking-widest">Title</label>
                  <input value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} placeholder="Item Name" className="w-full bg-black border border-white/10 p-4 rounded-2xl font-bold text-sm text-white focus:border-accent outline-none" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1"><label className="text-[10px] font-black text-accent uppercase tracking-widest">Price (USD)</label><input type="number" value={formData.price} onChange={e => setFormData({...formData, price: parseFloat(e.target.value) || 0})} className="w-full bg-black border border-white/10 p-4 rounded-2xl font-bold text-sm text-white focus:border-accent outline-none" /></div>
                  <div className="space-y-1"><label className="text-[10px] font-black text-accent uppercase tracking-widest">Category</label><select value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} className="w-full bg-black border border-white/10 p-4 rounded-2xl font-bold text-sm text-white focus:border-accent outline-none"><option>Men</option><option>Women</option><option>Kids</option></select></div>
                </div>
                <div className="space-y-1"><label className="text-[10px] font-black text-accent uppercase tracking-widest">Description</label><textarea value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} rows={4} className="w-full bg-black border border-white/10 p-4 rounded-2xl text-sm text-white focus:border-accent outline-none resize-none" /></div>
              </div>
            </div>

            <div className="p-8 bg-[#151515] border-t border-white/5 flex justify-end gap-4">
              <button onClick={() => setShowAddModal(false)} className="px-8 py-4 font-black text-gray-500 uppercase text-xs tracking-widest hover:text-white transition-colors">Cancel</button>
              <button disabled={isDataLoading} onClick={handleSave} className="bg-accent text-black px-10 py-4 rounded-2xl font-black text-xs uppercase tracking-widest flex items-center gap-3 hover:bg-white transition-all shadow-xl disabled:opacity-50">
                {isDataLoading ? <Loader2 className="animate-spin" size={18} /> : <Save size={18} />} Save Asset
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;