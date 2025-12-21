import React, { useState, useEffect, useRef } from 'react';
import { 
  Package, ShoppingBag, Plus, Edit, Trash2, X, Check, Save, 
  ChevronRight, Camera, DollarSign, LayoutDashboard, LogOut, Search,
  AlertCircle, Eye, Box, MapPin, User, Mail, Phone, Calendar
} from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { dbService } from '../services/dbService';
import { Product, Order } from '../types';

const AdminDashboard: React.FC = () => {
  const { products, refreshProducts, logoutAdmin, convertPrice } = useAppContext();
  const [activeTab, setActiveTab] = useState<'products' | 'orders'>('products');
  const [orders, setOrders] = useState<Order[]>([]);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [viewingOrder, setViewingOrder] = useState<Order | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  
  // Product Form State
  const [formData, setFormData] = useState<Partial<Product>>({
    name: '',
    priceUSD: 0,
    category: 'Men',
    description: '',
    image: '',
    sizes: ["S", "M", "L", "XL"],
    rating: 5.0,
    reviews: 0
  });

  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setOrders(dbService.getOrders());
  }, [activeTab]);

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setFormData(product);
    setShowAddModal(true);
  };

  const handleDelete = (id: number) => {
    if (confirm('Permanently delete this product?')) {
      dbService.deleteProduct(id);
      refreshProducts();
    }
  };

  const handleSave = () => {
    if (!formData.name || !formData.image) return alert('Please fill required fields');
    
    const productToSave: Product = {
      ...formData as Product,
      id: editingProduct ? editingProduct.id : Date.now(),
      rating: formData.rating || 5,
      reviews: formData.reviews || 0
    };

    dbService.saveProduct(productToSave);
    refreshProducts();
    setShowAddModal(false);
    setEditingProduct(null);
    setFormData({ name: '', priceUSD: 0, category: 'Men', description: '', image: '', sizes: ["S", "M", "L", "XL"] });
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      setFormData({ ...formData, image: reader.result as string });
    };
    reader.readAsDataURL(file);
  };

  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
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

        <button 
          onClick={logoutAdmin}
          className="mt-auto flex items-center gap-3 px-4 py-3 text-red-400 font-bold hover:bg-red-400/10 rounded-xl transition-all"
        >
          <LogOut size={18} /> Exit Admin
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6 md:p-10 overflow-y-auto max-h-screen custom-scrollbar">
        <div className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-3xl font-black uppercase tracking-tighter">
              {activeTab === 'products' ? 'Product Inventory' : 'Customer Orders'}
            </h1>
            <p className="text-gray-500 text-sm">Real-time Dashboard Management</p>
          </div>
          
          {activeTab === 'products' && (
            <button 
              onClick={() => { setShowAddModal(true); setEditingProduct(null); }}
              className="bg-black text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-accent hover:text-black transition-all shadow-lg"
            >
              <Plus size={18} /> Add Product
            </button>
          )}
        </div>

        {activeTab === 'products' ? (
          <div className="space-y-6">
            <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-3">
              <Search className="text-gray-300" size={20} />
              <input 
                placeholder="Search inventory..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="flex-1 focus:outline-none font-medium"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map(p => (
                <div key={p.id} className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 group relative">
                  <div className="aspect-square rounded-xl overflow-hidden bg-gray-50 mb-4">
                    <img src={p.image} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                  </div>
                  <h3 className="font-bold text-sm truncate">{p.name}</h3>
                  <div className="flex justify-between items-center mt-2">
                    <span className="font-black text-accent bg-black px-2 py-0.5 rounded text-xs">{convertPrice(p.priceUSD)}</span>
                    <span className="text-[10px] text-gray-400 uppercase font-black">{p.category}</span>
                  </div>
                  
                  <div className="absolute top-6 right-6 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button onClick={() => handleEdit(p)} className="bg-white p-2 rounded-lg shadow-md hover:text-accent"><Edit size={16} /></button>
                    <button onClick={() => handleDelete(p.id)} className="bg-white p-2 rounded-lg shadow-md hover:text-red-500"><Trash2 size={16} /></button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.length === 0 ? (
              <div className="bg-white rounded-3xl p-20 text-center border-2 border-dashed border-gray-100">
                <Box size={48} className="mx-auto text-gray-200 mb-4" />
                <p className="text-gray-400 font-bold">No orders recorded yet.</p>
              </div>
            ) : (
              <div className="overflow-hidden bg-white rounded-3xl border border-gray-100 shadow-sm">
                <table className="w-full text-left">
                  <thead className="bg-gray-50 text-gray-400 text-[10px] font-black uppercase tracking-widest border-b">
                    <tr>
                      <th className="px-6 py-4">Order ID</th>
                      <th className="px-6 py-4">Customer</th>
                      <th className="px-6 py-4">Total</th>
                      <th className="px-6 py-4">Status</th>
                      <th className="px-6 py-4">Date</th>
                      <th className="px-6 py-4">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {orders.map(order => (
                      <tr key={order.id} className="hover:bg-gray-50/50 transition-colors">
                        <td className="px-6 py-4 font-bold text-xs">#{order.id.slice(-6)}</td>
                        <td className="px-6 py-4">
                          <div className="flex flex-col">
                            <span className="font-bold text-sm">{order.customerName}</span>
                            <span className="text-xs text-gray-400">{order.phone}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 font-black">{convertPrice(order.total)}</td>
                        <td className="px-6 py-4">
                          <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase ${
                            order.status === 'Completed' ? 'bg-green-100 text-green-700' : 
                            order.status === 'Cancelled' ? 'bg-red-100 text-red-700' : 
                            'bg-yellow-100 text-yellow-700'
                          }`}>
                            {order.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-xs text-gray-500">{new Date(order.date).toLocaleDateString()}</td>
                        <td className="px-6 py-4">
                          <button 
                            onClick={() => setViewingOrder(order)}
                            className="bg-black text-white p-2 rounded-lg shadow-sm hover:bg-accent hover:text-black transition-all"
                          >
                            <Eye size={16} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Order Details Modal */}
      {viewingOrder && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setViewingOrder(null)}></div>
          <div className="relative bg-white w-full max-w-4xl rounded-3xl overflow-hidden shadow-2xl animate-fade-in-up flex flex-col max-h-[90vh]">
            <div className="p-6 border-b flex justify-between items-center bg-gray-50">
              <div className="flex items-center gap-3">
                 <ShoppingBag className="text-accent" />
                 <h2 className="text-xl font-black uppercase tracking-tighter">Order #{viewingOrder.id.slice(-6)}</h2>
              </div>
              <button onClick={() => setViewingOrder(null)}><X size={24} /></button>
            </div>
            
            <div className="p-8 overflow-y-auto custom-scrollbar flex-1">
               <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  {/* Customer Info Card */}
                  <div className="lg:col-span-1 space-y-6">
                     <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100">
                        <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                           <User size={14} /> Customer Profile
                        </h3>
                        <div className="space-y-4">
                           <div className="flex flex-col">
                              <span className="text-lg font-bold">{viewingOrder.customerName}</span>
                              <div className="flex items-center gap-2 text-gray-500 text-sm mt-1">
                                 <Mail size={14} /> {viewingOrder.email || 'N/A'}
                              </div>
                              <div className="flex items-center gap-2 text-gray-500 text-sm mt-1">
                                 <Phone size={14} /> {viewingOrder.phone}
                              </div>
                           </div>
                        </div>
                     </div>

                     <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100">
                        <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                           <MapPin size={14} /> Shipping Address
                        </h3>
                        <p className="text-sm text-gray-600 leading-relaxed font-medium">
                           {viewingOrder.address}, {viewingOrder.city}
                        </p>
                     </div>

                     <div className="bg-black text-white p-6 rounded-2xl shadow-xl">
                        <div className="flex justify-between items-center mb-2">
                           <span className="text-xs font-bold text-gray-400 uppercase">Total Amount</span>
                           <Calendar size={14} className="text-accent" />
                        </div>
                        <div className="text-3xl font-black text-accent">{convertPrice(viewingOrder.total)}</div>
                        <p className="text-[10px] text-gray-400 mt-2">Ordered on {new Date(viewingOrder.date).toLocaleString()}</p>
                     </div>
                  </div>

                  {/* Product List */}
                  <div className="lg:col-span-2 space-y-4">
                     <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-2">Items Ordered</h3>
                     <div className="space-y-3">
                        {viewingOrder.items.map((item, idx) => (
                           <div key={idx} className="flex items-center gap-4 bg-white p-4 rounded-2xl border border-gray-100 shadow-sm group hover:border-accent transition-colors">
                              <div className="w-20 h-20 rounded-xl overflow-hidden bg-gray-50 border border-gray-100 flex-shrink-0">
                                 <img src={item.image} alt={item.productName} className="w-full h-full object-cover group-hover:scale-110 transition-transform" />
                              </div>
                              <div className="flex-1">
                                 <h4 className="font-bold text-sm leading-tight">{item.productName}</h4>
                                 <div className="flex items-center gap-4 mt-2">
                                    <div className="bg-gray-100 px-2 py-0.5 rounded text-[10px] font-black text-gray-500 uppercase">Size: {item.size}</div>
                                    <div className="bg-gray-100 px-2 py-0.5 rounded text-[10px] font-black text-gray-500 uppercase">Qty: {item.quantity}</div>
                                 </div>
                              </div>
                              <div className="text-right">
                                 <div className="font-black text-sm">{convertPrice(item.price * item.quantity)}</div>
                                 <div className="text-[10px] text-gray-400 mt-1">{convertPrice(item.price)} each</div>
                              </div>
                           </div>
                        ))}
                     </div>

                     <div className="mt-8 flex gap-3">
                        <button 
                           onClick={() => {
                              const orders = dbService.getOrders().map(o => o.id === viewingOrder.id ? {...o, status: 'Completed' as const} : o);
                              localStorage.setItem('skt_shop_orders_v1', JSON.stringify(orders));
                              setViewingOrder(null);
                           }}
                           className="flex-1 bg-green-600 text-white py-3 rounded-xl font-bold hover:bg-green-700 transition-all flex items-center justify-center gap-2"
                        >
                           <Check size={18} /> Mark Completed
                        </button>
                        <button 
                           onClick={() => {
                              if(confirm('Delete this order?')) {
                                 dbService.deleteOrder(viewingOrder.id);
                                 setViewingOrder(null);
                              }
                           }}
                           className="bg-red-50 text-red-600 px-6 py-3 rounded-xl font-bold hover:bg-red-600 hover:text-white transition-all flex items-center gap-2 border border-red-100"
                        >
                           <Trash2 size={18} /> Delete Order
                        </button>
                     </div>
                  </div>
               </div>
            </div>
          </div>
        </div>
      )}

      {/* Product Edit/Add Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setShowAddModal(false)}></div>
          <div className="relative bg-white w-full max-w-2xl rounded-3xl overflow-hidden shadow-2xl animate-fade-in-up">
            <div className="p-6 border-b flex justify-between items-center bg-gray-50">
              <h2 className="text-xl font-black uppercase tracking-tighter">{editingProduct ? 'Update Product' : 'Add New Inventory'}</h2>
              <button onClick={() => setShowAddModal(false)}><X size={24} /></button>
            </div>
            
            <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-8 overflow-y-auto max-h-[70vh] custom-scrollbar">
              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase text-gray-400">Product Image</label>
                  <div 
                    onClick={() => fileInputRef.current?.click()}
                    className="aspect-square bg-gray-100 rounded-2xl border-2 border-dashed border-gray-200 flex flex-col items-center justify-center cursor-pointer hover:border-accent group overflow-hidden"
                  >
                    {formData.image ? (
                      <img src={formData.image} className="w-full h-full object-cover" />
                    ) : (
                      <>
                        <Camera className="text-gray-300 group-hover:text-accent transition-colors" size={32} />
                        <span className="text-[10px] font-bold text-gray-400 mt-2 uppercase">Upload Photo</span>
                      </>
                    )}
                  </div>
                  <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleImageUpload} />
                </div>
              </div>

              <div className="space-y-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-black text-gray-400 uppercase">Title</label>
                  <input 
                    value={formData.name}
                    onChange={e => setFormData({...formData, name: e.target.value})}
                    placeholder="E.g. Vintage Leather Jacket"
                    className="w-full border p-3 rounded-xl focus:ring-2 focus:ring-accent outline-none font-bold"
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-black text-gray-400 uppercase">Price (USD)</label>
                    <div className="relative">
                      <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={14} />
                      <input 
                        type="number"
                        value={formData.priceUSD}
                        onChange={e => setFormData({...formData, priceUSD: parseFloat(e.target.value)})}
                        className="w-full border p-3 pl-8 rounded-xl focus:ring-2 focus:ring-accent outline-none font-bold"
                      />
                    </div>
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-black text-gray-400 uppercase">Category</label>
                    <select 
                      value={formData.category}
                      onChange={e => setFormData({...formData, category: e.target.value as any})}
                      className="w-full border p-3 rounded-xl focus:ring-2 focus:ring-accent outline-none font-bold appearance-none bg-white"
                    >
                      <option>Men</option>
                      <option>Women</option>
                      <option>Kids</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-black text-gray-400 uppercase">Description</label>
                  <textarea 
                    value={formData.description}
                    onChange={e => setFormData({...formData, description: e.target.value})}
                    rows={4}
                    className="w-full border p-3 rounded-xl focus:ring-2 focus:ring-accent outline-none text-sm leading-relaxed"
                  />
                </div>
              </div>
            </div>

            <div className="p-6 bg-gray-50 border-t flex justify-end gap-3">
              <button onClick={() => setShowAddModal(false)} className="px-6 py-3 font-bold text-gray-500 hover:text-black">Cancel</button>
              <button 
                onClick={handleSave}
                className="bg-black text-white px-8 py-3 rounded-xl font-bold hover:bg-accent hover:text-black transition-all shadow-xl flex items-center gap-2"
              >
                <Save size={18} /> Save Product
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;