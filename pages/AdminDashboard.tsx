
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
    if (confirm('Permanently delete this item from the studio archive?')) {
      setIsDataLoading(true);
      await dbService.deleteProduct(id);
      await refreshProducts();
      setIsDataLoading(false);
    }
  };

  const handleSave = async () => {
    if (!formData.title || !formData.image_url) return alert('Data Validation Failed: Title and Asset Photo are required.');
    setIsDataLoading(true);
    try {
        const payload = { ...formData };
        if (!editingProduct) delete payload.id;
        await dbService.saveProduct(payload);
        await refreshProducts();
        setShowAddModal(false);
        setEditingProduct(null);
    } catch (e: any) {
        alert("Studio Sync Error: " + e.message);
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
    <div className="min-h-screen bg-black flex flex-col md:flex-row font-sans selection:bg-accent selection:text-black">
      {/* Sidebar - Studio Ops Navigation */}
      <div className="w-full md:w-80 bg-black border-r border-white/5 p-8 flex flex-col">
        <div className="flex items-center gap-4 mb-16 px-2">
          <div className="bg-accent p-3 rounded-2xl shadow-[0_0_30px_rgba(255,215,0,0.3)]"><LayoutDashboard size={24} className="text-black" /></div>
          <div className="flex flex-col">
            <span className="font-black uppercase tracking-tighter text-2xl text-white italic leading-none">STUDIO<span className="text-accent">OPS</span></span>
            <span className="text-[8px] font-black text-gray-600 uppercase tracking-[0.4em] mt-1">Salman SKT Command</span>
          </div>
        </div>

        <nav className="flex-grow space-y-4">
          <button onClick={() => setActiveTab('products')} className={`w-full flex items-center justify-between px-6 py-5 rounded-3xl font-black text-[10px] uppercase tracking-widest transition-all ${activeTab === 'products' ? 'bg-accent text-black shadow-2xl' : 'text-gray-500 hover:text-white hover:bg-white/5 border border-transparent hover:border-white/5'}`}>
            <div className="flex items-center gap-4"><Package size={20} /> Archive Inventory</div>
            <ArrowRight size={14} className={activeTab === 'products' ? 'opacity-100' : 'opacity-0'} />
          </button>
          <button onClick={() => setActiveTab('orders')} className={`w-full flex items-center justify-between px-6 py-5 rounded-3xl font-black text-[10px] uppercase tracking-widest transition-all ${activeTab === 'orders' ? 'bg-accent text-black shadow-2xl' : 'text-gray-500 hover:text-white hover:bg-white/5 border border-transparent hover:border-white/5'}`}>
            <div className="flex items-center gap-4"><ShoppingBag size={20} /> Export Orders</div>
            <ArrowRight size={14} className={activeTab === 'orders' ? 'opacity-100' : 'opacity-0'} />
          </button>
          <button onClick={() => setActiveTab('setup')} className={`w-full flex items-center justify-between px-6 py-5 rounded-3xl font-black text-[10px] uppercase tracking-widest transition-all ${activeTab === 'setup' ? 'bg-accent text-black shadow-2xl' : 'text-gray-500 hover:text-white hover:bg-white/5 border border-transparent hover:border-white/5'}`}>
            <div className="flex items-center gap-4"><Zap size={20} /> Cloud Sync</div>
            <ArrowRight size={14} className={activeTab === 'setup' ? 'opacity-100' : 'opacity-0'} />
          </button>
        </nav>

        <div className={`mt-10 mb-10 px-6 py-6 rounded-[2rem] border transition-all ${dbStatus?.success ? 'bg-green-500/5 border-green-500/20' : 'bg-red-500/5 border-red-500/20'}`}>
           <div className="flex justify-between items-center mb-2">
             <span className={`text-[9px] font-black uppercase tracking-widest ${dbStatus?.success ? 'text-green-400' : 'text-red-400'}`}>
                {dbStatus ? dbStatus.message : 'SYNC STATUS'}
             </span>
             <RefreshCw size={14} className={`text-gray-600 cursor-pointer ${isDataLoading ? 'animate-spin' : ''}`} onClick={checkConnection} />
           </div>
           {dbStatus?.details && <p className="text-[8px] text-gray-500 uppercase truncate font-black">{dbStatus.details}</p>}
        </div>

        <button onClick={logoutAdmin} className="mt-auto flex items-center gap-4 px-6 py-5 text-gray-500 font-black uppercase text-[10px] tracking-widest hover:text-red-500 hover:bg-red-500/5 rounded-2xl transition-all border border-transparent hover:border-red-500/10"><LogOut size={20} /> Exit Studio Ops</button>
      </div>

      {/* Content Area */}
      <div className="flex-1 p-8 md:p-16 overflow-y-auto max-h-screen bg-[#050505] custom-scrollbar">
        {activeTab === 'setup' ? (
          <div className="max-w-4xl animate-fade-in-up space-y-12 pb-32">
            <div className="bg-[#0a0a0a] border border-white/10 rounded-[4rem] p-16 relative overflow-hidden shadow-2xl">
               <div className="absolute top-[-20%] right-[-10%] p-10 opacity-5 -rotate-12"><Database size={300} /></div>
               <h1 className="text-6xl font-black text-white uppercase italic tracking-tighter mb-6 leading-none">System <span className="text-accent">Diagnostics</span></h1>
               <p className="text-gray-500 text-sm font-urdu leading-relaxed max-w-2xl opacity-80 uppercase tracking-tighter">
                 Ensure your studio backend is fully synced with global export standards. Verify your Supabase configuration.
               </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className={`p-10 rounded-[3rem] border shadow-xl ${diagnostics.urlFound ? 'bg-green-500/5 border-green-500/10' : 'bg-red-500/5 border-red-500/10'}`}>
                   <div className="flex justify-between items-center mb-6">
                      <span className="text-[10px] font-black uppercase text-accent tracking-[0.4em]">Asset Host URL</span>
                      {diagnostics.urlFound ? <ShieldCheck size={24} className="text-green-500" /> : <Activity size={24} className="text-red-500" />}
                   </div>
                   <div className="font-mono text-[11px] text-white/60 bg-black/60 p-5 rounded-2xl truncate border border-white/5">{diagnostics.urlValue}</div>
                </div>
                <div className={`p-10 rounded-[3rem] border shadow-xl ${diagnostics.keyFound ? 'bg-green-500/5 border-green-500/10' : 'bg-red-500/5 border-red-500/10'}`}>
                   <div className="flex justify-between items-center mb-6">
                      <span className="text-[10px] font-black uppercase text-accent tracking-[0.4em]">Encryption Key</span>
                      {diagnostics.keyFound ? <ShieldCheck size={24} className="text-green-500" /> : <Activity size={24} className="text-red-500" />}
                   </div>
                   <div className="font-mono text-[11px] text-white/60 bg-black/60 p-5 rounded-2xl truncate border border-white/5">{diagnostics.keyValue}</div>
                </div>
            </div>
          </div>
        ) : activeTab === 'products' ? (
          <div className="space-y-12 pb-32">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
              <div>
                <h1 className="text-7xl font-black uppercase tracking-tighter text-white italic leading-none">Studio <span className="text-accent">Stock</span></h1>
                <div className="flex items-center gap-4 mt-4">
                  <div className={`w-2 h-2 rounded-full ${dbStatus?.success ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`}></div>
                  <span className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-500">Live Database Sync active</span>
                </div>
              </div>
              <button onClick={() => { setShowAddModal(true); setEditingProduct(null); setFormData({ title: '', price: 0, category: 'Men', description: '', image_url: '', sizes: ["S", "M", "L", "XL"] }); }} className="bg-white text-black px-12 py-6 rounded-[2rem] font-black text-[11px] uppercase tracking-[0.4em] flex items-center gap-4 shadow-2xl hover:bg-accent transition-all hover:scale-105">
                <Plus size={22} /> Register Asset
              </button>
            </div>

            <div className="glass p-8 rounded-[2.5rem] border border-white/5 flex items-center gap-6 focus-within:border-accent transition-all shadow-xl">
              <Search className="text-gray-700" size={24} />
              <input placeholder="SEARCH ARCHIVE BY NAME OR ID..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="flex-1 bg-transparent border-none focus:outline-none font-black text-[11px] text-white uppercase tracking-[0.4em] placeholder:text-gray-800" />
            </div>

            {filteredProducts.length === 0 ? (
                <div className="py-32 text-center glass rounded-[4rem] border border-white/5 border-dashed">
                    <Box size={80} strokeWidth={1} className="text-gray-900 mx-auto mb-8" />
                    <p className="text-gray-600 font-black uppercase text-[10px] tracking-[0.5em]">No assets detected in archive</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
                  {filteredProducts.map((p, idx) => (
                    <div key={p.id} className="glass rounded-[3rem] p-6 border border-white/5 group flex flex-col hover:border-accent/30 transition-all duration-700 shadow-xl" style={{ animationDelay: `${idx * 0.05}s` }}>
                      <div className="aspect-[4/5] rounded-[2.5rem] overflow-hidden bg-black mb-6 border border-white/5 relative shadow-2xl">
                        <img src={p.image_url} className="w-full h-full object-cover opacity-60 grayscale group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-1000 scale-105 group-hover:scale-100" alt={p.title} />
                        <div className="absolute bottom-6 left-6 glass backdrop-blur-3xl text-accent text-[8px] font-black px-4 py-2 rounded-full border border-accent/20 uppercase tracking-[0.2em]">{p.category}</div>
                      </div>
                      <h3 className="font-black text-xs truncate mb-8 text-white uppercase tracking-[0.2em] italic">{p.title}</h3>
                      <div className="flex justify-between items-center mt-auto pt-6 border-t border-white/5">
                        <span className="font-black text-white text-lg tracking-tighter italic">{convertPrice(p.price)}</span>
                        <div className="flex gap-3">
                          <button onClick={() => handleEdit(p)} className="p-4 glass text-gray-500 rounded-2xl hover:bg-accent hover:text-black transition-all border border-white/5"><Edit size={16} /></button>
                          <button onClick={() => handleDelete(p.id)} className="p-4 glass text-red-500/40 rounded-2xl hover:bg-red-500 hover:text-white transition-all border border-red-500/5"><Trash2 size={16} /></button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
            )}
          </div>
        ) : (
          <div className="space-y-12 pb-32">
            <h1 className="text-7xl font-black uppercase tracking-tighter text-white italic leading-none">Export <span className="text-accent">Manifests</span></h1>
            {orders.length === 0 ? (
                <div className="py-32 text-center glass rounded-[4rem] border border-white/5">
                    <ShoppingBag size={80} strokeWidth={1} className="text-gray-900 mx-auto mb-8" />
                    <p className="text-gray-600 font-black uppercase text-[10px] tracking-[0.5em]">Waiting for international requests</p>
                </div>
            ) : (
              <div className="grid gap-6">
                {orders.map(order => (
                  <div key={order.id} className="glass p-10 rounded-[3rem] border border-white/5 flex flex-col md:flex-row justify-between items-start md:items-center gap-10 group hover:border-accent/20 transition-all shadow-xl">
                    <div className="flex items-center gap-8">
                      <div className="w-20 h-20 glass border border-accent/20 rounded-[2rem] flex items-center justify-center text-accent group-hover:scale-110 transition-all duration-500 shadow-2xl"><User size={32} /></div>
                      <div>
                        <h4 className="font-black text-2xl text-white uppercase tracking-tighter italic">{order.customer_name}</h4>
                        <div className="flex items-center gap-6 mt-3">
                          {/* Fixed: Globe icon added to imports to resolve Cannot find name 'Globe' */}
                          <span className="text-[10px] text-gray-500 uppercase font-black tracking-[0.3em] flex items-center gap-2"><Globe size={12}/> {order.city}</span>
                          <span className="text-[10px] text-accent uppercase font-black tracking-[0.3em] glass px-4 py-1.5 rounded-full border border-accent/10">{convertPrice(order.total)}</span>
                        </div>
                      </div>
                    </div>
                    <button onClick={() => setViewingOrder(order)} className="px-10 py-5 bg-white text-black rounded-2xl hover:bg-accent transition-all shadow-2xl flex items-center gap-4 text-[10px] font-black uppercase tracking-widest group-hover:scale-105">
                        <Eye size={20} /> Inspect Manifest
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* View Order Modal - Futuristic Review */}
      {viewingOrder && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/95 backdrop-blur-3xl">
           <div className="glass w-full max-w-2xl rounded-[4rem] overflow-hidden border border-white/10 animate-fade-in-up shadow-[0_0_100px_rgba(0,0,0,1)]">
              <div className="p-12 border-b border-white/5 flex justify-between items-center bg-white/[0.02]">
                <h2 className="text-4xl font-black uppercase tracking-tighter text-accent italic leading-none">Order_Audit</h2>
                <button onClick={() => setViewingOrder(null)} className="p-4 text-gray-500 hover:text-white glass rounded-full transition-all border border-white/5"><X size={32} /></button>
              </div>
              <div className="p-12 space-y-12 max-h-[60vh] overflow-y-auto custom-scrollbar">
                <div className="grid grid-cols-2 gap-12">
                  <div className="space-y-3">
                    <label className="text-[10px] font-black uppercase text-gray-700 tracking-[0.4em]">Client Entity</label>
                    <p className="text-white font-black text-2xl tracking-tighter uppercase italic">{viewingOrder.customer_name}</p>
                  </div>
                  <div className="space-y-3">
                    <label className="text-[10px] font-black uppercase text-gray-700 tracking-[0.4em]">Direct Communication</label>
                    <p className="text-accent font-black text-2xl tracking-tighter">{viewingOrder.phone}</p>
                  </div>
                </div>
                
                <div className="space-y-8">
                  <label className="text-[10px] font-black uppercase text-gray-700 tracking-[0.4em] block">Asset Manifest</label>
                  <div className="space-y-5">
                    {viewingOrder.items.map((item, idx) => (
                      <div key={idx} className="flex items-center justify-between p-8 bg-white/5 rounded-[2.5rem] border border-white/5 hover:border-accent/20 transition-all shadow-lg">
                        <div className="flex items-center gap-6">
                          <img src={item.image} className="w-20 h-20 rounded-[1.5rem] object-cover border border-white/10 shadow-2xl" />
                          <div>
                            <p className="text-lg font-black uppercase tracking-tighter text-white italic">{item.productName}</p>
                            <p className="text-[10px] text-gray-500 uppercase font-black mt-2 tracking-[0.2em]">Size: {item.size} • Qty: {item.quantity}</p>
                          </div>
                        </div>
                        <span className="text-xl font-black text-accent italic">{convertPrice(item.price * item.quantity)}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="p-12 bg-white/[0.02] border-t border-white/5">
                 <a href={`https://wa.me/${viewingOrder.phone.replace(/[^0-9]/g, '')}`} target="_blank" className="flex items-center justify-center gap-4 w-full bg-accent text-black py-7 rounded-[2.5rem] font-black text-xs uppercase tracking-[0.4em] hover:bg-white transition-all shadow-2xl">
                    <Phone size={22} /> Initiate Factory Link
                 </a>
              </div>
           </div>
        </div>
      )}

      {/* Add/Edit Product Modal - Asset Registration */}
      {showAddModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/95 backdrop-blur-3xl">
          <div className="glass w-full max-w-4xl rounded-[5rem] overflow-hidden shadow-[0_0_100px_rgba(0,0,0,1)] border border-white/10 animate-fade-in-up">
            <div className="p-16 border-b border-white/5 flex justify-between items-center bg-white/[0.02]">
              <h2 className="text-5xl font-black uppercase tracking-tighter text-white italic leading-none">Register <span className="text-accent">Global Asset</span></h2>
              <button onClick={() => setShowAddModal(false)} className="p-5 text-gray-600 hover:text-white glass rounded-full transition-all border border-white/5"><X size={32} /></button>
            </div>
            
            <div className="p-16 grid grid-cols-1 lg:grid-cols-2 gap-20 max-h-[70vh] overflow-y-auto custom-scrollbar">
              <div className="space-y-10">
                <div className="space-y-4">
                  <label className="text-[10px] font-black uppercase text-accent tracking-[0.6em] ml-2">Visual Asset Data</label>
                  <div onClick={() => fileInputRef.current?.click()} className="aspect-[4/5] glass rounded-[3rem] border-2 border-dashed border-white/10 flex items-center justify-center cursor-pointer overflow-hidden group hover:border-accent/40 transition-all relative shadow-2xl">
                    {formData.image_url ? (
                        <img src={formData.image_url} className="w-full h-full object-cover group-hover:scale-110 transition-all duration-1000 opacity-70 group-hover:opacity-100" />
                    ) : (
                        <div className="text-center p-10">
                            <Camera className="mx-auto text-gray-900 group-hover:text-accent transition-colors mb-6" size={80} strokeWidth={1} />
                            <p className="text-[10px] font-black text-gray-700 uppercase tracking-[0.5em] leading-loose">Upload RAW Production Photo</p>
                        </div>
                    )}
                  </div>
                  <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleImageUpload} />
                </div>
              </div>

              <div className="space-y-8 py-4">
                <div className="space-y-4">
                  <label className="text-[10px] font-black text-accent uppercase tracking-[0.6em] ml-2">Designation</label>
                  <input value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} placeholder="E.G. ALPHA SOUP JACKET" className="w-full glass border border-white/5 p-6 rounded-[2rem] font-black text-sm text-white outline-none focus:border-accent uppercase tracking-tighter shadow-xl" />
                </div>
                <div className="grid grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <label className="text-[10px] font-black text-accent uppercase tracking-[0.6em] ml-2">Asset Value</label>
                    <input type="number" value={formData.price} onChange={e => setFormData({...formData, price: parseFloat(e.target.value) || 0})} className="w-full glass border border-white/5 p-6 rounded-[2rem] font-black text-sm text-white outline-none focus:border-accent shadow-xl" />
                  </div>
                  <div className="space-y-4">
                    <label className="text-[10px] font-black text-accent uppercase tracking-[0.6em] ml-2">Classification</label>
                    <select value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} className="w-full glass border border-white/5 p-6 rounded-[2rem] font-black text-sm text-white outline-none focus:border-accent uppercase tracking-widest shadow-xl appearance-none">
                        <option>Men</option>
                        <option>Women</option>
                        <option>Kids</option>
                        <option>Accessories</option>
                    </select>
                  </div>
                </div>
                <div className="space-y-4">
                  <label className="text-[10px] font-black text-accent uppercase tracking-[0.6em] ml-2">Technical Brief</label>
                  <textarea value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} rows={6} placeholder="SPECIFY FABRIC GSM, STITCHING DENSITY, AND EXPORT DURABILITY..." className="w-full glass border border-white/5 p-6 rounded-[2rem] text-xs text-gray-500 font-medium outline-none focus:border-accent resize-none leading-relaxed shadow-xl uppercase tracking-tighter" />
                </div>
              </div>
            </div>

            <div className="p-16 bg-white/[0.02] border-t border-white/5 flex justify-end">
              <button disabled={isDataLoading} onClick={handleSave} className="bg-white text-black px-20 py-8 rounded-[3rem] font-black uppercase text-xs tracking-[0.5em] shadow-[0_0_50px_rgba(255,255,255,0.1)] flex items-center gap-6 hover:bg-accent hover:scale-105 transition-all active:scale-95 disabled:opacity-50">
                {isDataLoading ? <Loader2 className="animate-spin" /> : <Save size={24} />} 
                Commit Asset To Archive
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
