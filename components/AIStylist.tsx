
import React, { useState, useRef, useEffect } from 'react';
import { X, Send, Sparkles } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { chatWithStylist } from '../services/geminiService';

const AIStylist: React.FC = () => {
  const { t, isRTL } = useAppContext();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{role: string, text: string}[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsLoading(true);

    const history = messages.map(m => ({
      role: m.role === 'bot' ? 'model' : 'user',
      parts: [{ text: m.text }]
    }));

    const response = await chatWithStylist(userMsg, history);
    
    setMessages(prev => [...prev, { role: 'bot', text: response }]);
    setIsLoading(false);
  };

  return (
    <div className="fixed bottom-24 md:bottom-10 right-6 z-[60]">
      {!isOpen && (
        <button 
          onClick={() => setIsOpen(true)}
          className="bg-accent text-black p-5 rounded-full shadow-[0_0_30px_rgba(255,215,0,0.4)] hover:scale-110 transition-all flex items-center gap-3 animate-bounce"
        >
          <Sparkles size={24} className="animate-pulse" />
          <span className="font-black text-[10px] uppercase tracking-widest hidden md:inline">AI Expert</span>
        </button>
      )}

      {isOpen && (
        <div className="bg-black border border-white/10 rounded-[2.5rem] shadow-2xl w-80 md:w-96 h-[550px] flex flex-col overflow-hidden animate-fade-in-up backdrop-blur-3xl">
          {/* Header */}
          <div className="bg-accent text-black p-6 flex justify-between items-center">
            <div className="flex items-center gap-3">
              <Sparkles size={20} />
              <h3 className="font-black text-[10px] uppercase tracking-widest">Global Style Engine</h3>
            </div>
            <button onClick={() => setIsOpen(false)} className="hover:scale-110 transition-transform">
              <X size={20} />
            </button>
          </div>

          {/* Chat Area */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4 custom-scrollbar">
            {messages.length === 0 && (
              <div className="text-center text-gray-600 mt-20 px-4">
                <Sparkles size={40} className="mx-auto mb-6 opacity-20" />
                <p className="text-[10px] font-black uppercase tracking-widest">Identify your vibe. Ask me for recommendations or fashion advice.</p>
              </div>
            )}
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] p-4 rounded-2xl text-xs font-bold leading-relaxed ${
                  msg.role === 'user' 
                    ? 'bg-accent text-black rounded-tr-none' 
                    : 'bg-white/5 border border-white/10 text-white rounded-tl-none'
                }`}>
                  {msg.text}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white/5 border border-white/10 text-accent text-[8px] p-3 rounded-2xl animate-pulse font-black uppercase tracking-widest">
                  Analyzing Style Trends...
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-6 bg-black border-t border-white/10 flex items-center gap-4">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              placeholder="ASK FOR STYLE ADVICE..."
              className="flex-1 bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-[10px] font-black uppercase tracking-widest text-white outline-none focus:border-accent transition-all"
            />
            <button 
              onClick={handleSend}
              disabled={isLoading}
              className="bg-accent text-black p-4 rounded-xl hover:bg-white transition-all disabled:opacity-50"
            >
              <Send size={18} className={isRTL ? 'rotate-180' : ''} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AIStylist;
