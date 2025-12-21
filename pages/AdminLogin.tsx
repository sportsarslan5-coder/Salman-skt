import React, { useState } from 'react';
import { Lock, LogIn, AlertCircle } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

const AdminLogin: React.FC = () => {
  const { loginAsAdmin, navigate } = useAppContext();
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (loginAsAdmin(password)) {
      navigate('/admin');
    } else {
      setError(true);
      setTimeout(() => setError(false), 3000);
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-3xl p-10 shadow-2xl animate-fade-in-up">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-accent rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Lock className="text-black" size={32} />
          </div>
          <h1 className="text-2xl font-black uppercase tracking-tighter">Admin Access</h1>
          <p className="text-gray-500 text-sm mt-1">Authorized Personnel Only</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase text-gray-400">Security Password</label>
            <input 
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className={`w-full bg-gray-50 border-2 rounded-xl py-4 px-5 focus:outline-none focus:ring-2 transition-all ${error ? 'border-red-500 ring-red-100' : 'border-gray-100 focus:ring-accent'}`}
            />
          </div>

          {error && (
            <div className="flex items-center gap-2 text-red-500 text-sm font-bold bg-red-50 p-3 rounded-lg border border-red-100 animate-pulse">
              <AlertCircle size={16} /> Access Denied. Invalid Password.
            </div>
          )}

          <button 
            type="submit"
            className="w-full bg-black text-white py-4 rounded-xl font-bold flex items-center justify-center gap-3 hover:bg-accent hover:text-black transition-all shadow-xl active:scale-95"
          >
            <LogIn size={20} /> Authenticate
          </button>
        </form>
        
        <button 
          onClick={() => navigate('/')}
          className="w-full mt-6 text-gray-400 text-sm hover:text-black font-medium transition-colors"
        >
          Return to Shop
        </button>
      </div>
    </div>
  );
};

export default AdminLogin;