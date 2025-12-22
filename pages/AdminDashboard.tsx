import React, { useState, useEffect, useRef } from 'react';
import { 
  Package, ShoppingBag, Plus, Edit, Trash2, X, Check, Save, 
  Camera, DollarSign, LayoutDashboard, LogOut, Search,
  Eye, Box, MapPin, User, Mail, Phone, Calendar, Loader2,
  Wifi, WifiOff, AlertTriangle, RefreshCw, Settings, ExternalLink
} from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { dbService } from '../services/dbService';
import { Product, Order } from '../types';

const AdminDashboard: React.FC = () => {
  const { products, refreshProducts, isLoading, logoutAdmin, convertPrice } = useAppContext();
  const [activeTab, setActiveTab] = useState<'products' | 'orders'>('products');
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
    if (!dbService.isConfigured()) return;
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
    if (confirm('Permanently delete this product from cloud?')) {
      setIsDataLoading(true);
      try {
        await dbService.deleteProduct(id);
        await refreshProducts();
      } catch (e: any) {
        alert(`Delete failed: ${e.message}`);
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
      if (e.message === "DATABASE_NOT_CONFIGURED") {
          alert("Connection Error: Your database keys are missing. Please follow the instructions in the 'Connection Guide' on the dashboard.");
      } else {
          alert(`Database Error: ${e.message}`);
      }
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

  const filteredProducts = products.filter(p => 
    p.title?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row">
      {/* Sidebar */}
      <div className="w-full md:w-64 bg-black text-white p-6 flex flex-col">
        <div className="flex items-center gap-3 mb-10 px-2">
          <div className="bg-accent p-2 rounded-lg"><LayoutDashboard size={20} className="text-black" /></div>
          <span className="font-black uppercase tracking-tighter text-xl">SKT PANEL</span>
        </div>

        <nav className="flex-grow space-y-2">
          <button onClick={() => setActiveTab('products')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-all ${activeTab === 'products' ? 'bg-accent text-black' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}><Package size={18} /> Inventory</button>
          <button onClick={() => setActiveTab('orders')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-all ${activeTab === 'orders' ? 'bg-accent text-black' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}><ShoppingBag size={18} /> Orders</button>
        </nav>

        {/* Cloud Status */}
        <div className={`mt-6 mb-6 px-4 py-3 rounded-xl border ${dbStatus?.success ? 'bg-green-500/10 border-green-500/20' : 'bg-red-500/10 border-red-500/20'}`}>
           <div className="flex items-center justify-between mb-1">
              <div className="flex items-center gap-2">
                {dbStatus?.success ? <Wifi size={14} className="text-green-500" /> : <WifiOff size={14} className="text-red-500" />}
                <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Database</span>
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
      <div className="flex-1 p-6 md:p-10 overflow-y-auto max-h-screen custom-scrollbar">
        
        {/* Connection Setup Guide (Visible only if not success) */}
        {!dbStatus?.success && (
            <div className="mb-10 bg-white border-l-4 border-red-500 rounded-3xl p-8 shadow-xl animate-fade-in">
                <div className="flex items-start gap-6">
                    <div className="p-4 bg-red-50 rounded-2xl text-red-500"><Settings size={32} /></div>
                    <div className="flex-1">
                        <h2 className="text-2xl font-black uppercase tracking-tighter text-gray-900 mb-2">Cloud Connection Guide</h2>
                        <p className="text-gray-500 text-sm mb-6 max-w-2xl leading-relaxed">
                            To publish your own products, you must link this app to your Supabase project. 
                            Your database is currently <strong>Disconnected</strong>.
                        </p>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                            <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100">
                                <h4 className="text-[10px] font-black uppercase text-gray-400 tracking-widest mb-2">Step 1: Get Keys</h4>
                                <p className="text-xs font-medium">Go to <strong>Supabase Dashboard</strong> > Settings > API. Copy the Project URL and <code>anon</code> key.</p>
                            </div>
                            <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100">
                                <h4 className="text-[10px] font-black uppercase text-gray-400 tracking-widest mb-2">Step 2: Add to Vercel</h4>
                                <p className="text-xs font-medium">In <strong>Vercel Settings</strong>, add <code>VITE_SUPABASE_URL</code> and <code>VITE_SUPABASE_ANON_KEY</code>.</p>
                            </div>
                        </div>

                        <div className="flex gap-4">
                            <a href="https://vercel.com/dashboard" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 bg-black text-white px-6 py-3 rounded-xl font-bold text-sm hover:bg-accent hover:text-black transition-all">
                                Go to Vercel <ExternalLink size={16} />
                            </a>
                            <button onClick={checkConnection} className="inline-flex items-center gap-2 bg-gray-100 text-black px-6 py-3 rounded-xl font-bold text-sm hover:bg-gray-200 transition-all">
                                <RefreshCw size={16} /> Check Again
                            </button>
                        </div>
                    </div>
                </div>
                {dbStatus?.details && (
                    <div className="mt-6 pt-6 border-t border-gray-100 text-[11px] font-mono text-red-400 bg-red-50/50 p-4 rounded-xl">
                        <strong>Error Log:</strong> {dbStatus.details}
                    </div>
                )}
            </div>
        )}

        <div className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-3xl font-black uppercase tracking-tighter">{activeTab === 'products' ? 'Inventory' : 'Orders'}</h1>
            <p className="text-gray-500 text-sm">Managing Salman SKT Cloud Assets</p>
          </div>
          
          {activeTab === 'products' && (
            <button 
              disabled={isLoading || isDataLoading || !dbStatus?.success} 
              onClick={() => { setShowAddModal(true); setEditingProduct(null); setFormData({ title: '', price: 0, category: 'Men', description: '', image_url: '', sizes: ["S", "M", "L", "XL"] }); }} 
              className={`bg-black text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-accent hover:text-black transition-all shadow-lg ${!dbStatus?.success ? 'opacity-30 cursor-not-allowed' : ''}`}
            >
              <Plus size={18} /> Add Product
            </button>
          )}
        </div>

        {activeTab === 'products' ? (
          <div className="space-y-6">
            <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-3">
              <Search className="text-gray-300" size={20} />
              <input placeholder="Search current stock..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="flex-1 focus:outline-none font-medium text-sm" />
            </div>

            {products.length === 0 && !isLoading ? (
               <div className="bg-white rounded-3xl p-20 text-center border-2 border-dashed border-gray-100 flex flex-col items-center">
                  <Box size={60} className="text-gray-200 mb-6" />
                  <h3 className="text-xl font-bold mb-2">No Products Published</h3>
                  <p className="text-gray-400 max-w-sm mx-auto mb-8 text-sm">Once connected, your custom products will appear here for global shoppers.</p>
               </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map(p => (
                  <div key={p.id} className="bg-white rounded-3xl p-5 shadow-sm border border-gray-100 group flex flex-col">
                    <div className="aspect-square rounded-2xl overflow-hidden bg-gray-50 mb-4 border border-gray-100 relative">
                      <img src={p.image_url} className="w-full h-full object-cover transition-transform group-hover:scale-105" alt={p.title} />
                      <div className="absolute top-2 right-2 bg-black text-accent text-[9px] font-black px-2 py-1 rounded uppercase tracking-widest">{p.category}</div>
                    </div>
                    <h3 className="font-bold text-sm truncate pr-4 mb-4">{p.title}</h3>
                    <div className="flex justify-between items-center mt-auto pt-4 border-t border-gray-50">
                      <span className="font-black text-black bg-accent px-3 py-1 rounded-lg text-xs">{convertPrice(p.price)}</span>
                      <div className="flex gap-2">
                        <button onClick={() => handleEdit(p)} className="p-2.5 bg-gray-50 text-gray-400 rounded-xl hover:bg-black hover:text-white transition-all"><Edit size={16} /></button>
                        <button onClick={() => handleDelete(p.id)} className="p-2.5 bg-red-50 text-red-400 rounded-xl hover:bg-red-500 hover:text-white transition-all"><Trash2 size={16} /></button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ) : (
          <div className="space-y-4">
            {orders.length === 0 && !isDataLoading ? (
              <div className="bg-white rounded-3xl p-20 text-center border-2 border-dashed border-gray-100">
                <ShoppingBag size={48} className="mx-auto text-gray-200 mb-4" />
                <p className="text-gray-400 font-bold uppercase tracking-widest text-xs">No active orders</p>
              </div>
            ) : (
              orders.map(order => (
                <div key={order.id} className="bg-white p-5 rounded-2xl border flex justify-between items-center shadow-sm hover:border-accent transition-all group">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center text-gray-400 group-hover:bg-accent group-hover:text-black transition-colors"><User size={20} /></div>
                    <div>
                      <h4 className="font-bold text-sm">{order.customer_name}</h4>
                      <p className="text-[10px] text-gray-500 uppercase font-bold">{order.city} • {convertPrice(order.total)}</p>
                    </div>
                  </div>
                  <button onClick={() => setViewingOrder(order)} className="p-2.5 bg-black text-white rounded-xl hover:bg-accent hover:text-black transition-all"><Eye size={16} /></button>
                </div>
              ))
            )}
          </div>
        )}
      </div>

      {/* Product Edit/Add Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white w-full max-w-2xl rounded-[2.5rem] overflow-hidden shadow-2xl animate-fade-in-up">
            <div className="p-8 border-b flex justify-between items-center">
              <h2 className="text-2xl font-black uppercase tracking-tighter">{editingProduct ? 'Update Cloud Item' : 'Publish New Item'}</h2>
              <button onClick={() => setShowAddModal(false)} className="p-2 hover:bg-gray-100 rounded-full transition-colors"><X size={24} /></button>
            </div>
            
            <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-10 max-h-[70vh] overflow-y-auto custom-scrollbar">
              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest">Image Asset</label>
                  <div onClick={() => fileInputRef.current?.click()} className="aspect-square bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200 flex items-center justify-center cursor-pointer overflow-hidden group hover:border-accent transition-all">
                    {formData.image_url ? <img src={formData.image_url} className="w-full h-full object-cover" alt="Preview" /> : <div className="text-center"><Camera className="text-gray-300 mx-auto" size={40} /><p className="text-[10px] font-bold text-gray-400 mt-2 uppercase">Select Photo</p></div>}
                  </div>
                  <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleImageUpload} />
                </div>
              </div>

              <div className="space-y-5">
                <div className="space-y-1">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Title</label>
                  <input value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} placeholder="Premium Product Name" className="w-full border-2 border-gray-100 p-4 rounded-2xl font-bold text-sm focus:border-accent outline-none" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1"><label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Price (USD)</label><input type="number" value={formData.price} onChange={e => setFormData({...formData, price: parseFloat(e.target.value) || 0})} className="w-full border-2 border-gray-100 p-4 rounded-2xl font-bold text-sm focus:border-accent outline-none" /></div>
                  <div className="space-y-1"><label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Category</label><select value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} className="w-full border-2 border-gray-100 p-4 rounded-2xl font-bold text-sm focus:border-accent outline-none bg-white"><option>Men</option><option>Women</option><option>Kids</option></select></div>
                </div>
                <div className="space-y-1"><label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Description</label><textarea value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} rows={4} className="w-full border-2 border-gray-100 p-4 rounded-2xl text-sm focus:border-accent outline-none resize-none" /></div>
              </div>
            </div>

            <div className="p-8 bg-gray-50 border-t flex justify-end gap-4">
              <button onClick={() => setShowAddModal(false)} className="px-8 py-4 font-bold text-gray-400 hover:text-black transition-colors">Cancel</button>
              <button disabled={isDataLoading} onClick={handleSave} className="bg-black text-white px-10 py-4 rounded-2xl font-bold flex items-center gap-3 hover:bg-accent hover:text-black transition-all shadow-xl disabled:opacity-50">
                {isDataLoading ? <Loader2 className="animate-spin" size={18} /> : <Save size={18} />} Publish to Cloud
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;