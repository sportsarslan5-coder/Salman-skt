import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Sparkles } from 'lucide-react';
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

    // Prepare history for Gemini (excluding last user message which is passed separately)
    const history = messages.map(m => ({
      role: m.role === 'bot' ? 'model' : 'user',
      parts: [{ text: m.text }]
    }));

    const response = await chatWithStylist(userMsg, history);
    
    setMessages(prev => [...prev, { role: 'bot', text: response }]);
    setIsLoading(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {!isOpen && (
        <button 
          onClick={() => setIsOpen(true)}
          className="bg-black text-white p-4 rounded-full shadow-xl hover:bg-accent transition-all hover:scale-110 flex items-center gap-2"
        >
          <Sparkles size={24} className="text-yellow-400" />
          <span className="font-bold hidden md:inline">{t('aiStylist')}</span>
        </button>
      )}

      {isOpen && (
        <div className="bg-white rounded-2xl shadow-2xl w-80 md:w-96 h-[500px] flex flex-col border border-gray-200 overflow-hidden animate-fade-in-up">
          {/* Header */}
          <div className="bg-black text-white p-4 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Sparkles size={20} className="text-yellow-400" />
              <h3 className="font-bold">{t('aiStylist')}</h3>
            </div>
            <button onClick={() => setIsOpen(false)} className="hover:text-gray-300">
              <X size={20} />
            </button>
          </div>

          {/* Chat Area */}
          <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
            {messages.length === 0 && (
              <div className="text-center text-gray-500 mt-10">
                <p>{t('stylistIntro')}</p>
              </div>
            )}
            {messages.map((msg, idx) => (
              <div key={idx} className={`mb-3 flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] p-3 rounded-xl text-sm ${
                  msg.role === 'user' 
                    ? 'bg-black text-white rounded-tr-none' 
                    : 'bg-white border border-gray-200 text-gray-800 rounded-tl-none shadow-sm'
                }`}>
                  {msg.text}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start mb-3">
                <div className="bg-gray-200 text-gray-500 text-xs p-2 rounded-lg animate-pulse">
                  {t('typing')}
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-3 bg-white border-t flex items-center gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Ask for advice..."
              className="flex-1 bg-gray-100 border-none rounded-full px-4 py-2 text-sm focus:ring-2 focus:ring-black focus:outline-none"
            />
            <button 
              onClick={handleSend}
              disabled={isLoading}
              className="bg-accent text-white p-2 rounded-full hover:bg-black transition-colors disabled:opacity-50"
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