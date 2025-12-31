
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
  }, [activeTab]);

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setFormData(product);
    setShowAddModal(true);
  };

  const handleDelete = async (id: string) => {
    if (confirm('Delete permanently?')) {
      setIsDataLoading(true);
      await dbService.deleteProduct(id);
      await refreshProducts();
      setIsDataLoading(false);
    }
  };

  const handleSave = async () => {
    if (!formData.title || !formData.image_url) return alert('Title and Image required!');
    setIsDataLoading(true);
    const payload = { ...formData };
    if (!editingProduct) delete payload.id;
    await dbService.saveProduct(payload);
    await refreshProducts();
    setShowAddModal(false);
    setEditingProduct(null);
    setIsDataLoading(false);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => setFormData({ ...formData, image_url: reader.result as string });
    reader.readAsDataURL(file);
  };

  // UPDATED SQL: Includes Disable RLS for easier setup
  const sqlCode = `-- 1. Create Tables
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

-- 2. DISABLE RLS (Mandatory for simple web apps)
ALTER TABLE products DISABLE ROW LEVEL SECURITY;
ALTER TABLE orders DISABLE ROW LEVEL SECURITY;`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(sqlCode).then(() => alert('SQL Script Copied! Run it in Supabase SQL Editor.'));
  };

  const filteredProducts = products.filter(p => p.title?.toLowerCase().includes(searchTerm.toLowerCase()));
  const diagnostics = getDiagnostics();

  return (
    <div className="min-h-screen bg-black flex flex-col md:flex-row font-sans">
      <div className="w-full md:w-64 bg-black border-r border-white/10 p-6 flex flex-col">
        <div className="flex items-center gap-3 mb-10 px-2">
          <div className="bg-accent p-2 rounded-lg shadow-lg"><LayoutDashboard size={20} className="text-black" /></div>
          <span className="font-black uppercase tracking-tighter text-xl text-white">SKT<span className="text-accent italic">OPS</span></span>
        </div>
        <nav className="flex-grow space-y-2">
          <button onClick={() => setActiveTab('products')} className={`w-full flex items-center justify-between px-4 py-3 rounded-xl font-bold transition-all ${activeTab === 'products' ? 'bg-accent text-black' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}>
            <div className="flex items-center gap-3"><Package size={18} /> Products</div>
          </button>
          <button onClick={() => setActiveTab('orders')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-all ${activeTab === 'orders' ? 'bg-accent text-black' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}><ShoppingBag size={18} /> Orders</button>
          <button onClick={() => setActiveTab('setup')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-all ${activeTab === 'setup' ? 'bg-accent text-black' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}><Settings size={18} /> Global Sync</button>
        </nav>
        <div className={`mt-6 mb-6 px-4 py-4 rounded-2xl border ${dbStatus?.success ? 'bg-green-500/10 border-green-500/20' : 'bg-red-500/10 border-red-500/20'}`}>
           <p className={`text-[10px] leading-tight font-black uppercase tracking-widest ${dbStatus?.success ? 'text-green-400' : 'text-red-400'}`}>
              {dbStatus ? dbStatus.message : 'SYNCING...'}
           </p>
           {dbStatus?.details && <p className="text-[8px] text-gray-500 mt-1 uppercase truncate">{dbStatus.details}</p>}
        </div>
        <button onClick={logoutAdmin} className="mt-auto flex items-center gap-3 px-4 py-3 text-red-400 font-bold hover:bg-red-400/10 rounded-xl transition-all"><LogOut size={18} /> Log Out</button>
      </div>

      <div className="flex-1 p-6 md:p-10 overflow-y-auto max-h-screen bg-[#050505] custom-scrollbar">
        {activeTab === 'setup' ? (
          <div className="max-w-4xl animate-fade-in-up space-y-8">
            <div className="bg-[#111] border border-white/10 rounded-[2.5rem] p-10 relative overflow-hidden">
               <div className="absolute top-0 right-0 p-10 opacity-10"><Database size={120} /></div>
               <h1 className="text-4xl font-black text-white uppercase italic tracking-tighter mb-4">Cloud <span className="text-accent">Assistant</span></h1>
               <p className="text-gray-400 text-sm font-urdu leading-relaxed max-w-xl">{"کلاؤڈ کنکشن کو مکمل کرنے کے لیے نیچے دی گئی ہدایات پر عمل کریں۔"}</p>
            </div>

            {/* ERROR ALERTS */}
            {(diagnostics.isNameError || diagnostics.isSecretKeyError) && (
              <div className="bg-red-500 border-4 border-white rounded-[2rem] p-8 shadow-xl">
                <div className="flex items-start gap-4 text-white">
                    <AlertTriangle size={48} className="shrink-0" />
                    <div>
                        <h3 className="text-2xl font-black uppercase italic mb-2">CRITICAL: Incorrect Key Used!</h3>
                        <p className="text-sm font-urdu font-bold leading-relaxed">
                            {diagnostics.isSecretKeyError 
                                ? "آپ نے 'Secret' کی (Key) استعمال کی ہے۔ براہ کرم سپا بیس سے 'Anon Public' کی کاپی کریں جو 'eyJ' سے شروع ہوتی ہے۔"
                                : "آپ نے ورسل میں ویری ایبل کا نام ہی کاپی کر دیا ہے۔ وہاں وہ لمبی Key ڈالنی ہے۔"}
                        </p>
                    </div>
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className={`p-8 rounded-[2rem] border ${diagnostics.urlFound ? 'bg-green-500/5 border-green-500/20' : 'bg-[#111] border-white/5'}`}>
                   <span className="text-[10px] font-black uppercase text-accent tracking-[0.2em] block mb-4">Supabase URL</span>
                   <div className="font-mono text-xs text-white bg-black/40 p-4 rounded-xl truncate">{diagnostics.urlValue}</div>
                </div>
                <div className={`p-8 rounded-[2rem] border ${diagnostics.keyFound ? 'bg-green-500/5 border-green-500/20' : 'bg-[#111] border-white/5'}`}>
                   <span className="text-[10px] font-black uppercase text-accent tracking-[0.2em] block mb-4">Anon Public Key</span>
                   <div className="font-mono text-xs text-white bg-black/40 p-4 rounded-xl truncate">{diagnostics.keyValue}</div>
                   {!diagnostics.keyFound && <p className="text-[9px] text-red-500 mt-2 uppercase font-black italic">Must start with 'eyJ'</p>}
                </div>
            </div>

            <div className="bg-[#111] border border-white/10 rounded-[2.5rem] p-10">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl font-black text-white uppercase italic tracking-tight">Database Schema (Step 2)</h3>
                  <button onClick={copyToClipboard} className="bg-accent text-black px-6 py-3 rounded-xl font-black uppercase text-xs shadow-xl flex items-center gap-2">
                    <Copy size={14} /> Copy New Script
                  </button>
                </div>
                <p className="text-gray-500 text-xs font-urdu mb-4 italic">{"اگر آپ کو 'Database Error' آ رہا ہے، تو یہ والا نیا کوڈ دوبارہ سپا بیس میں چلا کر 'Run' کریں تاکہ ٹیبل ان لاک ہو جائیں۔"}</p>
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
                <p className="text-gray-500 text-xs font-black uppercase tracking-widest mt-1">{dbStatus?.message}</p>
              </div>
              <button onClick={() => { setShowAddModal(true); setEditingProduct(null); setFormData({ title: '', price: 0, category: 'Men', description: '', image_url: '', sizes: ["S", "M", "L", "XL"] }); }} className="bg-accent text-black px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest flex items-center gap-3 shadow-lg">
                <Plus size={20} /> Add Product
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {filteredProducts.map(p => (
                <div key={p.id} className="bg-[#111] rounded-[2.5rem] p-5 border border-white/5 group flex flex-col hover:border-accent/40 transition-all">
                  <div className="aspect-square rounded-3xl overflow-hidden bg-black mb-5 border border-white/5 relative">
                    <img src={p.image_url} className="w-full h-full object-cover opacity-80" alt={p.title} />
                  </div>
                  <h3 className="font-black text-xs truncate mb-5 text-white uppercase tracking-widest">{p.title}</h3>
                  <div className="flex justify-between items-center mt-auto pt-5 border-t border-white/5">
                    <span className="font-black text-black bg-accent px-4 py-1.5 rounded-xl text-[10px] uppercase">{convertPrice(p.price)}</span>
                    <div className="flex gap-2">
                      <button onClick={() => handleEdit(p)} className="p-3 bg-white/5 text-gray-400 rounded-xl hover:bg-accent transition-all"><Edit size={14} /></button>
                      <button onClick={() => handleDelete(p.id)} className="p-3 bg-red-500/10 text-red-500 rounded-xl hover:bg-red-500 transition-all"><Trash2 size={14} /></button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <h1 className="text-4xl font-black uppercase tracking-tighter text-white italic">Recent <span className="text-accent">Orders</span></h1>
            {orders.length === 0 ? <div className="p-24 text-center text-gray-500">No orders found.</div> : 
              <div className="grid gap-4">
                {orders.map(order => (
                  <div key={order.id} className="bg-[#111] p-6 rounded-[2rem] border border-white/5 flex justify-between items-center group">
                    <div className="flex items-center gap-5">
                      <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center text-accent"><User size={20} /></div>
                      <div>
                        <h4 className="font-black text-white uppercase tracking-tight">{order.customer_name}</h4>
                        <p className="text-[9px] text-gray-500 uppercase font-black">{order.city} | {convertPrice(order.total)}</p>
                      </div>
                    </div>
                    <button onClick={() => setViewingOrder(order)} className="p-3 bg-accent text-black rounded-xl hover:bg-white transition-all shadow-lg flex items-center gap-2 text-[10px] font-black uppercase"><Eye size={16} /> View</button>
                  </div>
                ))}
              </div>
            }
          </div>
        )}
      </div>

      {/* Viewing Order Modal */}
      {viewingOrder && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/90 backdrop-blur-md">
           <div className="bg-[#111] w-full max-w-2xl rounded-[3rem] overflow-hidden border border-white/10">
              <div className="p-8 border-b border-white/5 flex justify-between items-center bg-[#151515]">
                <h2 className="text-2xl font-black uppercase tracking-tighter text-accent">Order Details</h2>
                <button onClick={() => setViewingOrder(null)} className="p-2 text-gray-500 hover:text-white transition-colors"><X size={24} /></button>
              </div>
              <div className="p-8 space-y-8 max-h-[70vh] overflow-y-auto custom-scrollbar">
                <div className="grid grid-cols-2 gap-8 text-white">
                  <div><p className="text-[10px] text-gray-500 font-black uppercase">Customer</p><p className="font-bold">{viewingOrder.customer_name}</p></div>
                  <div><p className="text-[10px] text-gray-500 font-black uppercase">Phone</p><p className="font-bold">{viewingOrder.phone}</p></div>
                </div>
                <div className="space-y-4">
                  <p className="text-[10px] text-gray-500 font-black uppercase">Items</p>
                  {viewingOrder.items.map((item, idx) => (
                    <div key={idx} className="flex justify-between items-center bg-black p-4 rounded-xl border border-white/5">
                        <p className="text-xs font-black uppercase text-white">{item.productName} (x{item.quantity})</p>
                        <p className="text-xs font-black text-accent">{convertPrice(item.price * item.quantity)}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="p-8 bg-[#151515]"><a href={`https://wa.me/${viewingOrder.phone.replace(/[^0-9]/g, '')}`} target="_blank" className="block w-full bg-green-500 text-white py-4 rounded-2xl font-black text-xs uppercase text-center">Contact WhatsApp</a></div>
           </div>
        </div>
      )}

      {/* Product Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/95 backdrop-blur-md">
          <div className="bg-[#111] w-full max-w-2xl rounded-[3rem] overflow-hidden shadow-2xl border border-white/10">
            <div className="p-8 border-b border-white/5 flex justify-between items-center bg-[#151515]">
              <h2 className="text-2xl font-black uppercase tracking-tighter text-white italic">Publish <span className="text-accent">Global</span></h2>
              <button onClick={() => setShowAddModal(false)} className="p-2 text-gray-500 hover:text-white transition-colors"><X size={24} /></button>
            </div>
            <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-10 max-h-[70vh] overflow-y-auto custom-scrollbar">
              <div className="space-y-6">
                <div onClick={() => fileInputRef.current?.click()} className="aspect-square bg-black rounded-[2.5rem] border-2 border-dashed border-white/10 flex items-center justify-center cursor-pointer overflow-hidden relative">
                    {formData.image_url ? <img src={formData.image_url} className="w-full h-full object-cover" /> : <div className="text-center"><Camera className="mx-auto text-gray-700" size={48} /><p className="text-[10px] text-gray-500 font-black mt-3 uppercase">Upload Image</p></div>}
                </div>
                <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleImageUpload} />
              </div>
              <div className="space-y-6">
                <input value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} placeholder="Product Title" className="w-full bg-black border border-white/5 p-4 rounded-xl text-white outline-none" />
                <input type="number" value={formData.price} onChange={e => setFormData({...formData, price: parseFloat(e.target.value) || 0})} placeholder="Price" className="w-full bg-black border border-white/5 p-4 rounded-xl text-white outline-none" />
                <textarea value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} rows={4} placeholder="Description" className="w-full bg-black border border-white/5 p-4 rounded-xl text-white outline-none" />
              </div>
            </div>
            <div className="p-8 bg-[#151515] flex justify-end gap-4">
              <button disabled={isDataLoading} onClick={handleSave} className="bg-accent text-black px-12 py-4 rounded-xl font-black uppercase text-xs flex items-center gap-3 shadow-xl">
                {isDataLoading ? <Loader2 className="animate-spin" /> : <Save size={20} />} Publish to Global
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
