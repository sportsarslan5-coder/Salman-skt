
import React from 'react';
import { Home, ShoppingBag, Sparkles, MessageSquare, User } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

const BottomNav: React.FC = () => {
  const { route, navigate, cart } = useAppContext();
  
  const path = route.split('?')[0];

  const tabs = [
    { name: 'Home', icon: Home, path: '/' },
    { name: 'Shop', icon: ShoppingBag, path: '/shop' },
    { name: 'Lens', icon: Sparkles, path: '/smart-pricing' },
    { name: 'Chat', icon: MessageSquare, path: '/contact' },
    { name: 'Admin', icon: User, path: '/admin' },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-black/95 backdrop-blur-xl border-t border-white/10 z-50 md:hidden flex justify-around items-center h-20 px-2">
      {tabs.map((tab) => {
        const isActive = path === tab.path || (tab.path === '/' && (path === '' || path === '#/'));
        return (
          <button
            key={tab.name}
            onClick={() => navigate(tab.path)}
            className={`flex flex-col items-center gap-1 transition-all duration-300 ${isActive ? 'text-accent scale-110' : 'text-gray-500'}`}
          >
            <div className="relative">
              <tab.icon size={isActive ? 24 : 20} strokeWidth={isActive ? 3 : 2} />
              {tab.name === 'Shop' && cart.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-accent text-black text-[8px] font-black h-4 w-4 flex items-center justify-center rounded-full">
                  {cart.reduce((a, b) => a + b.quantity, 0)}
                </span>
              )}
            </div>
            <span className="text-[10px] font-black uppercase tracking-tighter">{tab.name}</span>
          </button>
        );
      })}
    </div>
  );
};

export default BottomNav;
