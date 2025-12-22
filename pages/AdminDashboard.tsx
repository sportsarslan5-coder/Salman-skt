import React, { useState, useEffect, useRef } from 'react';
import { 
  Package, ShoppingBag, Plus, Edit, Trash2, X, Check, Save, 
  Camera, DollarSign, LayoutDashboard, LogOut, Search,
  Eye, Box, MapPin, User, Mail, Phone, Calendar, Loader2,
  Wifi, WifiOff, AlertTriangle, RefreshCw
} from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { dbService } from '../services/dbService';
import { Product, Order } from '../types';

const AdminDashboard: React.FC = () => {
  const { products, refreshProducts, isLoading, logoutAdmin, convertPrice } = useAppContext();
  const [activeTab, setActiveTab] = useState<'products' | 'orders'>('products');
  const [orders, setOrders] = useState<Order[]>([]);
  const [isDataLoading, setIsDataLoading] = useState(false);
  const [dbStatus, setDbStatus] = useState<{success: boolean, message: string} | null>(null);
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
    setDbStatus(null);
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
      console.error(e);
      alert(`Error saving to Supabase: ${e.message}`);
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
          <button 
            onClick={() => setActiveTab('products')} 
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-all ${activeTab === 'products' ? 'bg-accent text-black' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
          >
            <Package size={18} /> Inventory
          </button>
          <button 
            onClick={() => setActiveTab('orders')} 
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-all ${activeTab === 'orders' ? 'bg-accent text-black' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
          >
            <ShoppingBag size={18} /> Orders
          </button>
        </nav>

        {/* Cloud Status */}
        <div className={`mt-6 mb-6 px-4 py-3 rounded-xl border ${dbStatus?.success ? 'bg-green-500/10 border-green-500/20' : 'bg-red-500/10 border-red-500/20'}`}>
           <div className="flex items-center justify-between mb-1">
              <div className="flex items-center gap-2">
                {dbStatus?.success ? <Wifi size={14} className="text-green-500" /> : <WifiOff size={14} className="text-red-500" />}
                <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Cloud Status</span>
              </div>
              <button onClick={checkConnection} className="text-gray-500 hover:text-white transition-colors">
                <RefreshCw size={12} className={isLoading ? 'animate-spin' : ''} />
              </button>
           </div>
           <p className={`text-[10px] leading-tight font-medium ${dbStatus?.success ? 'text-green-400' : 'text-red-400'}`}>
              {dbStatus ? dbStatus.message : 'Checking...'}
           </p>
        </div>

        <button onClick={logoutAdmin} className="mt-auto flex items-center gap-3 px-4 py-3 text-red-400 font-bold hover:bg-red-400/10 rounded-xl transition-all">
          <LogOut size={18} /> Exit Admin
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6 md:p-10 overflow-y-auto max-h-screen custom-scrollbar">
        {!dbStatus?.success && dbStatus && (
            <div className="mb-8 p-6 bg-red-50 border border-red-100 rounded-3xl flex items-start gap-4">
                <AlertTriangle className="text-red-500 shrink-0" size={24} />
                <div>
                    <h3 className="font-bold text-red-800 uppercase tracking-tighter">Connection Failed</h3>
                    <p className="text-red-600 text-sm mt-1 leading-relaxed">
                        Database connection is required to publish products. Check your Vercel Environment Variables.
                    </p>
                </div>
            </div>
        )}

        <div className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-3xl font-black uppercase tracking-tighter">{activeTab === 'products' ? 'Inventory' : 'Orders'}</h1>
            <p className="text-gray-500 text-sm">Real-time Cloud Synchronization</p>
          </div>
          
          <div className="flex items-center gap-4">
            <button 
              onClick={() => activeTab === 'products' ? refreshProducts() : loadOrders()}
              className="p-3 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors"
              title="Refresh Data"
            >
              <RefreshCw size={20} className={(isLoading || isDataLoading) ? 'animate-spin' : ''} />
            </button>
            
            {activeTab === 'products' && (
              <button 
                disabled={isLoading || isDataLoading} 
                onClick={() => { setShowAddModal(true); setEditingProduct(null); setFormData({ title: '', price: 0, category: 'Men', description: '', image_url: '', sizes: ["S", "M", "L", "XL"] }); }} 
                className="bg-black text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-accent hover:text-black transition-all shadow-lg disabled:opacity-50"
              >
                <Plus size={18} /> Add Product
              </button>
            )}
          </div>
        </div>

        {activeTab === 'products' ? (
          <div className="space-y-6">
            <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-3">
              <Search className="text-gray-300" size={20} />
              <input 
                placeholder="Search cloud inventory..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="flex-1 focus:outline-none font-medium text-sm"
              />
            </div>

            {products.length === 0 && !isLoading ? (
               <div className="bg-white rounded-3xl p-20 text-center border-2 border-dashed border-gray-100 flex flex-col items-center">
                  <Box size={60} className="text-gray-200 mb-6" />
                  <h3 className="text-xl font-bold mb-2">Inventory is Empty</h3>
                  <p className="text-gray-400 max-w-sm mx-auto mb-8 text-sm">Start by adding your own high-quality products to the cloud database.</p>
                  <button 
                    onClick={() => { setShowAddModal(true); setEditingProduct(null); }}
                    className="bg-black text-white px-8 py-3 rounded-xl font-bold hover:bg-accent hover:text-black transition-all"
                  >
                    Add First Product
                  </button>
               </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map(p => (
                  <div key={p.id} className="bg-white rounded-3xl p-5 shadow-sm border border-gray-100 group relative flex flex-col">
                    <div className="aspect-square rounded-2xl overflow-hidden bg-gray-50 mb-4 border border-gray-100">
                      <img src={p.image_url} className="w-full h-full object-cover transition-transform group-hover:scale-105 duration-500" alt={p.title} />
                    </div>
                    <div className="flex justify-between items-start mb-2">
                        <h3 className="font-bold text-sm truncate pr-4">{p.title}</h3>
                        <span className="text-[10px] font-black uppercase text-gray-400 bg-gray-50 px-2 py-0.5 rounded">{p.category}</span>
                    </div>
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
                <p className="text-gray-400 font-bold uppercase tracking-widest text-xs">No orders recorded yet</p>
              </div>
            ) : (
              orders.map(order => (
                <div key={order.id} className="bg-white p-5 rounded-2xl border flex justify-between items-center shadow-sm hover:border-accent transition-all group">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center text-gray-400 group-hover:bg-accent group-hover:text-black transition-colors">
                        <User size={20} />
                    </div>
                    <div>
                      <h4 className="font-bold text-sm">{order.customer_name}</h4>
                      <p className="text-[10px] text-gray-500 uppercase font-bold">{order.city} • {convertPrice(order.total)} • {new Date(order.created_at).toLocaleDateString()}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase ${
                        order.status === 'Completed' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                    }`}>
                        {order.status}
                    </span>
                    <button onClick={() => setViewingOrder(order)} className="p-2.5 bg-black text-white rounded-xl hover:bg-accent hover:text-black transition-all shadow-md"><Eye size={16} /></button>
                  </div>
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
              <h2 className="text-2xl font-black uppercase tracking-tighter">{editingProduct ? 'Edit Product' : 'Add to Cloud'}</h2>
              <button onClick={() => setShowAddModal(false)} className="p-2 hover:bg-gray-100 rounded-full transition-colors"><X size={24} /></button>
            </div>
            
            <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-10 max-h-[70vh] overflow-y-auto custom-scrollbar">
              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest">Visual Asset</label>
                  <div 
                    onClick={() => fileInputRef.current?.click()} 
                    className="aspect-square bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200 flex items-center justify-center cursor-pointer overflow-hidden group hover:border-accent transition-all"
                  >
                    {formData.image_url ? (
                        <img src={formData.image_url} className="w-full h-full object-cover" alt="Preview" />
                    ) : (
                        <div className="text-center">
                            <Camera className="text-gray-300 mx-auto group-hover:text-accent transition-colors" size={40} />
                            <p className="text-[10px] font-bold text-gray-400 mt-2 uppercase">Upload Image</p>
                        </div>
                    )}
                  </div>
                  <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleImageUpload} />
                </div>
              </div>

              <div className="space-y-5">
                <div className="space-y-1">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Title</label>
                  <input 
                    value={formData.title} 
                    onChange={e => setFormData({...formData, title: e.target.value})} 
                    placeholder="Premium Jersey..." 
                    className="w-full border-2 border-gray-100 p-4 rounded-2xl font-bold text-sm focus:border-accent outline-none" 
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Price (USD)</label>
                    <div className="relative">
                      <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={14} />
                      <input 
                        type="number" 
                        value={formData.price} 
                        onChange={e => setFormData({...formData, price: parseFloat(e.target.value) || 0})} 
                        className="w-full border-2 border-gray-100 p-4 pl-10 rounded-2xl font-bold text-sm focus:border-accent outline-none" 
                      />
                    </div>
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Category</label>
                    <select 
                        value={formData.category} 
                        onChange={e => setFormData({...formData, category: e.target.value})} 
                        className="w-full border-2 border-gray-100 p-4 rounded-2xl font-bold text-sm focus:border-accent outline-none bg-white appearance-none"
                    >
                      <option>Men</option><option>Women</option><option>Kids</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Description</label>
                  <textarea 
                    value={formData.description} 
                    onChange={e => setFormData({...formData, description: e.target.value})} 
                    placeholder="Detail the product craftsmanship..." 
                    rows={4} 
                    className="w-full border-2 border-gray-100 p-4 rounded-2xl text-sm focus:border-accent outline-none resize-none" 
                  />
                </div>
              </div>
            </div>

            <div className="p-8 bg-gray-50 border-t flex justify-end gap-4">
              <button onClick={() => setShowAddModal(false)} className="px-8 py-4 font-bold text-gray-400 hover:text-black transition-colors">Discard</button>
              <button 
                disabled={isDataLoading} 
                onClick={handleSave} 
                className="bg-black text-white px-10 py-4 rounded-2xl font-bold flex items-center gap-3 hover:bg-accent hover:text-black transition-all shadow-xl disabled:opacity-50"
              >
                {isDataLoading ? <Loader2 className="animate-spin" size={18} /> : <Save size={18} />} Commit Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Order Viewer Modal */}
      {viewingOrder && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
             <div className="bg-white w-full max-w-lg rounded-[2.5rem] overflow-hidden shadow-2xl animate-fade-in-up">
                <div className="p-8 border-b flex justify-between items-center">
                    <h2 className="text-xl font-black uppercase">Order Details</h2>
                    <button onClick={() => setViewingOrder(null)} className="p-2 hover:bg-gray-100 rounded-full"><X size={20} /></button>
                </div>
                <div className="p-8 space-y-6">
                    <div className="flex gap-4">
                        <div className="w-16 h-16 bg-gray-50 rounded-2xl flex items-center justify-center"><User className="text-gray-300" /></div>
                        <div>
                            <h3 className="font-bold">{viewingOrder.customer_name}</h3>
                            <p className="text-xs text-gray-500">{viewingOrder.email}</p>
                            <p className="text-xs text-gray-500">{viewingOrder.phone}</p>
                        </div>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100">
                        <label className="text-[10px] font-black uppercase text-gray-400 mb-2 block tracking-widest">Shipping Address</label>
                        <p className="text-sm font-medium">{viewingOrder.address}, {viewingOrder.city}</p>
                    </div>
                    <div className="space-y-3">
                        <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest">Items ({viewingOrder.items.length})</label>
                        <div className="max-h-40 overflow-y-auto pr-2 custom-scrollbar space-y-3">
                            {viewingOrder.items.map((item, i) => (
                                <div key={i} className="flex justify-between items-center text-sm border-b border-gray-50 pb-2">
                                    <div className="flex flex-col">
                                        <span className="font-bold">{item.productName}</span>
                                        <span className="text-[10px] text-gray-400 uppercase font-black">Size: {item.size} • Qty: {item.quantity}</span>
                                    </div>
                                    <span className="font-black text-black">{convertPrice(item.price * item.quantity)}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="pt-4 border-t flex justify-between items-center">
                        <span className="font-black text-lg">Total</span>
                        <span className="font-black text-xl text-accent bg-black px-4 py-1 rounded-xl">{convertPrice(viewingOrder.total)}</span>
                    </div>
                </div>
                <div className="p-8 pt-0 flex gap-4">
                   <button 
                     onClick={async () => {
                       if(confirm('Delete order?')) {
                          await dbService.deleteOrder(viewingOrder.id);
                          loadOrders();
                          setViewingOrder(null);
                       }
                     }}
                     className="flex-1 bg-red-50 text-red-500 py-4 rounded-2xl font-bold hover:bg-red-500 hover:text-white transition-all border border-red-100"
                   >
                     Delete
                   </button>
                   <button 
                     onClick={() => setViewingOrder(null)}
                     className="flex-1 bg-black text-white py-4 rounded-2xl font-bold"
                   >
                     Close
                   </button>
                </div>
             </div>
          </div>
      )}
    </div>
  );
};

export default AdminDashboard;