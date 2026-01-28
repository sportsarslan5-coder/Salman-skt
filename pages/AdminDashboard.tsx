
import React, { useState, useEffect, useRef } from 'react';
import { 
  Package, ShoppingBag, Plus, Edit, Trash2, X, Check, Save, 
  Camera, LayoutDashboard, LogOut, Search,
  Eye, Box, User, Phone, Loader2,
  RefreshCw, Database, ArrowRight, Zap, ShieldCheck, Activity, Globe
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
    title: '', price: 0, category: "Men's Fashion", description: '', image_url: '', sizes: ["S", "M", "L", "XL"]
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
    if (confirm('Permanently remove this asset from the studio catalog?')) {
      setIsDataLoading(true);
      await dbService.deleteProduct(id);
      await refreshProducts();
      setIsDataLoading(false);
    }
  };

  const handleSave = async () => {
    if (!formData.title || !formData.image_url) return alert('Asset registration requires a Title and Visual Media.');
    setIsDataLoading(true);
    try {
        const payload = { ...formData };
        if (!editingProduct) delete payload.id;
        await dbService.saveProduct(payload);
        await refreshProducts();
        setShowAddModal(false);
        setEditingProduct(null);
    } catch (e: any) {
        alert("Studio Sync Failure: " + e.message);
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

  const filteredProducts = products.filter(p => p.title?.toLowerCase().includes(searchTerm.toLowerCase()));
  const diagnostics = getDiagnostics();

  return (
    <div className="min-h-screen bg-white flex flex-col md:flex-row">
      {/* Sidebar */}
      <div className="w-full md:w-72 bg-gray-50 border-r border-gray-100 p-8 flex flex-col">
        <div className="flex items-center gap-3 mb-12">
          <div className="bg-dark p-2 rounded-lg text-white"><LayoutDashboard size={20} /></div>
          <span className="font-display font-black text-lg tracking-tight">STUDIO<span className="text-accent">OPS</span></span>
        </div>

        <nav className="flex-grow space-y-2">
          {[
            { id: 'products', label: 'Inventory', icon: Package },
            { id: 'orders', label: 'Export Orders', icon: ShoppingBag },
            { id: 'setup', label: 'System Sync', icon: Database },
          ].map(tab => (
            <button 
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)} 
              className={`w-full flex items-center gap-3 px-5 py-3.5 rounded-xl font-bold text-xs uppercase tracking-widest transition-all ${activeTab === tab.id ? 'bg-dark text-white shadow-lg' : 'text-gray-400 hover:bg-white hover:text-dark'}`}
            >
              <tab.icon size={18} /> {tab.label}
            </button>
          ))}
        </nav>

        <button onClick={logoutAdmin} className="mt-auto flex items-center gap-3 px-5 py-4 text-gray-400 font-bold uppercase text-[10px] tracking-widest hover:text-red-500 transition-colors">
          <LogOut size={18} /> Sign Out
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 bg-white p-8 md:p-12 overflow-y-auto max-h-screen custom-scrollbar">
        {activeTab === 'products' ? (
          <div className="space-y-10">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
              <div>
                <h1 className="text-4xl font-display font-black text-dark uppercase tracking-tight">Archive <span className="text-accent">Management</span></h1>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">Direct Factory Stock Control</p>
              </div>
              <button 
                onClick={() => { 
                  setShowAddModal(true); 
                  setEditingProduct(null); 
                  setFormData({ title: '', price: 0, category: "Men's Fashion", description: '', image_url: '', sizes: ["S", "M", "L", "XL"] }); 
                }} 
                className="bg-accent text-white px-8 py-4 rounded-xl font-black text-[10px] uppercase tracking-widest flex items-center gap-2 shadow-lg hover:bg-dark transition-all"
              >
                <Plus size={18} /> Register Asset
              </button>
            </div>

            <div className="relative">
              <input 
                placeholder="Search archive..." 
                value={searchTerm} 
                onChange={(e) => setSearchTerm(e.target.value)} 
                className="w-full bg-gray-50 border border-gray-100 rounded-xl pl-12 pr-4 py-4 text-xs font-bold uppercase tracking-widest outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent" 
              />
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" size={18} />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {filteredProducts.map(p => (
                <div key={p.id} className="bg-white border border-gray-100 rounded-2xl p-4 shadow-sm hover:shadow-md transition-all group">
                  <div className="aspect-[4/5] rounded-xl overflow-hidden bg-gray-50 mb-4">
                    <img src={p.image_url} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt={p.title} />
                  </div>
                  <h3 className="font-bold text-sm text-dark truncate mb-4 uppercase tracking-tighter">{p.title}</h3>
                  <div className="flex justify-between items-center pt-4 border-t border-gray-50">
                    <span className="font-black text-dark">{convertPrice(p.price)}</span>
                    <div className="flex gap-2">
                      <button onClick={() => handleEdit(p)} className="p-2.5 text-gray-300 hover:text-dark transition-colors"><Edit size={16} /></button>
                      <button onClick={() => handleDelete(p.id)} className="p-2.5 text-gray-300 hover:text-red-500 transition-colors"><Trash2 size={16} /></button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : activeTab === 'orders' ? (
          <div className="space-y-10">
            <h1 className="text-4xl font-display font-black text-dark uppercase tracking-tight">Export <span className="text-accent">Orders</span></h1>
            <div className="space-y-4">
              {orders.length === 0 ? (
                <div className="py-20 text-center bg-gray-50 rounded-3xl border border-gray-100 border-dashed">
                  <ShoppingBag size={50} className="mx-auto text-gray-200 mb-4" strokeWidth={1.5} />
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">No active requests found</p>
                </div>
              ) : (
                orders.map(order => (
                  <div key={order.id} className="bg-white border border-gray-100 p-8 rounded-3xl flex justify-between items-center group shadow-sm hover:shadow-md transition-all">
                    <div className="flex items-center gap-6">
                      <div className="w-12 h-12 bg-gray-50 rounded-xl flex items-center justify-center text-accent"><User size={24} /></div>
                      <div>
                        <h4 className="font-bold text-lg text-dark">{order.customer_name}</h4>
                        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">{order.city} • {convertPrice(order.total)}</p>
                      </div>
                    </div>
                    <button onClick={() => setViewingOrder(order)} className="px-6 py-3 border border-gray-100 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-dark hover:text-white transition-all">Review Manifest</button>
                  </div>
                ))
              )}
            </div>
          </div>
        ) : (
          <div className="space-y-10">
            <h1 className="text-4xl font-display font-black text-dark uppercase tracking-tight">System <span className="text-accent">Diagnostics</span></h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-gray-50 p-10 rounded-3xl border border-gray-100">
                <div className="flex justify-between items-center mb-6">
                  <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">Database Sync</span>
                  {dbStatus?.success ? <ShieldCheck className="text-green-500" /> : <Activity className="text-red-500" />}
                </div>
                <p className="font-mono text-xs text-dark break-all">{diagnostics.urlValue}</p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Add/Edit Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-dark/60 backdrop-blur-sm">
          <div className="bg-white w-full max-w-4xl rounded-[2.5rem] shadow-2xl overflow-hidden animate-fade-in-up">
            <div className="p-10 border-b border-gray-50 flex justify-between items-center">
              <h2 className="text-2xl font-black uppercase tracking-tight">Register <span className="text-accent">New Asset</span></h2>
              <button onClick={() => setShowAddModal(false)} className="text-gray-300 hover:text-dark"><X size={28} /></button>
            </div>
            
            <div className="p-10 grid grid-cols-1 md:grid-cols-2 gap-12 max-h-[60vh] overflow-y-auto custom-scrollbar">
              <div 
                onClick={() => fileInputRef.current?.click()}
                className="aspect-[4/5] bg-gray-50 border-2 border-dashed border-gray-100 rounded-3xl flex flex-col items-center justify-center cursor-pointer overflow-hidden group hover:border-accent/40 transition-all"
              >
                {formData.image_url ? (
                  <img src={formData.image_url} className="w-full h-full object-cover" />
                ) : (
                  <div className="text-center">
                    <Camera size={50} className="mx-auto text-gray-200 mb-4" />
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Select Product Photo</p>
                  </div>
                )}
                <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleImageUpload} />
              </div>

              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="text-[9px] font-black uppercase text-gray-400 tracking-widest ml-1">Asset Title</label>
                  <input value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} className="w-full bg-gray-50 border border-gray-100 p-4 rounded-xl text-xs font-bold uppercase tracking-widest outline-none focus:border-accent" />
                </div>
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[9px] font-black uppercase text-gray-400 tracking-widest ml-1">Price (USD)</label>
                    <input type="number" value={formData.price} onChange={e => setFormData({...formData, price: parseFloat(e.target.value) || 0})} className="w-full bg-gray-50 border border-gray-100 p-4 rounded-xl text-xs font-bold outline-none focus:border-accent" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[9px] font-black uppercase text-gray-400 tracking-widest ml-1">Category</label>
                    <select value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} className="w-full bg-gray-50 border border-gray-100 p-4 rounded-xl text-xs font-bold outline-none focus:border-accent">
                      <option>Men's Fashion</option>
                      <option>Women's Fashion</option>
                      <option>Shoes</option>
                      <option>Accessories</option>
                    </select>
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[9px] font-black uppercase text-gray-400 tracking-widest ml-1">Description</label>
                  <textarea value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} rows={5} className="w-full bg-gray-50 border border-gray-100 p-4 rounded-xl text-xs font-medium outline-none focus:border-accent resize-none"></textarea>
                </div>
              </div>
            </div>

            <div className="p-10 bg-gray-50 border-t border-gray-100 flex justify-end">
              <button disabled={isDataLoading} onClick={handleSave} className="bg-dark text-white px-12 py-4 rounded-xl font-black uppercase text-[10px] tracking-widest shadow-lg hover:bg-accent transition-all active:scale-95 flex items-center gap-2">
                {isDataLoading ? <Loader2 className="animate-spin" size={16} /> : <Save size={16} />} Save to Archive
              </button>
            </div>
          </div>
        </div>
      )}

      {/* View Order Modal */}
      {viewingOrder && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-dark/60 backdrop-blur-sm">
          <div className="bg-white w-full max-w-2xl rounded-[2.5rem] shadow-2xl overflow-hidden animate-fade-in-up">
            <div className="p-10 border-b border-gray-50 flex justify-between items-center">
              <h2 className="text-2xl font-black uppercase tracking-tight">Order <span className="text-accent">Review</span></h2>
              <button onClick={() => setViewingOrder(null)} className="text-gray-300 hover:text-dark"><X size={28} /></button>
            </div>
            <div className="p-10 space-y-8 max-h-[60vh] overflow-y-auto custom-scrollbar">
              <div className="grid grid-cols-2 gap-8">
                <div>
                  <p className="text-[9px] font-black uppercase text-gray-400 tracking-widest mb-1">Customer</p>
                  <p className="font-bold text-lg text-dark">{viewingOrder.customer_name}</p>
                </div>
                <div>
                  <p className="text-[9px] font-black uppercase text-gray-400 tracking-widest mb-1">Phone</p>
                  <p className="font-bold text-lg text-accent">{viewingOrder.phone}</p>
                </div>
              </div>
              <div>
                <p className="text-[9px] font-black uppercase text-gray-400 tracking-widest mb-4">Items Summary</p>
                <div className="space-y-3">
                  {viewingOrder.items.map((item, i) => (
                    <div key={i} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-100">
                      <div className="flex items-center gap-4">
                        <img src={item.image} className="w-12 h-12 rounded-lg object-cover" />
                        <div>
                          <p className="font-bold text-sm text-dark uppercase tracking-tighter">{item.productName}</p>
                          <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">Qty: {item.quantity} | Size: {item.size}</p>
                        </div>
                      </div>
                      <span className="font-black text-dark">{convertPrice(item.price * item.quantity)}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="p-10 bg-gray-50 border-t border-gray-100">
              <a href={`https://wa.me/${viewingOrder.phone.replace(/[^0-9]/g, '')}`} target="_blank" className="w-full bg-dark text-white py-5 rounded-2xl font-black text-xs uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-accent transition-all shadow-lg">
                <Phone size={18} /> Contact Customer
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
