
import React from 'react';
import { Mail, Phone, MapPin, MessageCircle, Globe, ShieldCheck, RefreshCcw, CreditCard } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { WHATSAPP_NUMBER } from '../constants';

const Contact: React.FC = () => {
  const { t } = useAppContext();
  return (
    <div className="max-w-7xl mx-auto px-4 py-20">
      <div className="text-center mb-16">
        <h1 className="text-5xl md:text-7xl font-black text-white uppercase italic tracking-tighter mb-4">
          Contact <span className="text-accent">Global Support</span>
        </h1>
        <p className="text-gray-500 uppercase text-[10px] font-bold tracking-[0.4em]">Direct factory bridge for USA & International inquiries</p>
      </div>

      {/* Financial Security Section */}
      <div className="mb-20 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="glass p-10 rounded-[3rem] border border-accent/20 text-center">
              <ShieldCheck size={48} className="text-accent mx-auto mb-6" />
              <h3 className="text-white font-black uppercase text-xs tracking-widest mb-4">Secure Transactions</h3>
              <p className="text-gray-500 text-[10px] uppercase font-bold tracking-tighter">
                  We never ask for bank or PayPal credentials on this site. Payments are handled via direct secure links on WhatsApp.
              </p>
          </div>
          <div className="glass p-10 rounded-[3rem] border border-accent/20 text-center">
              <RefreshCcw size={48} className="text-accent mx-auto mb-6" />
              <h3 className="text-white font-black uppercase text-xs tracking-widest mb-4">Refund Guarantee</h3>
              <p className="text-gray-500 text-[10px] uppercase font-bold tracking-tighter">
                  Full refunds are issued via PayPal for any order cancelled prior to factory dispatch.
              </p>
          </div>
          <div className="glass p-10 rounded-[3rem] border border-accent/20 text-center">
              <CreditCard size={48} className="text-accent mx-auto mb-6" />
              <h3 className="text-white font-black uppercase text-xs tracking-widest mb-4">Payment Methods</h3>
              <p className="text-gray-500 text-[10px] uppercase font-bold tracking-tighter">
                  We accept PayPal (International) and Direct Bank Transfers (IBAN) for all export orders.
              </p>
          </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        {/* Contact Information */}
        <div className="space-y-8">
            <div className="bg-[#0a0a0a] border border-white/5 p-10 rounded-[3rem] shadow-2xl relative overflow-hidden group">
                <div className="absolute -right-10 -top-10 opacity-5 group-hover:rotate-12 transition-transform duration-700">
                    <Globe size={200} />
                </div>
                <h3 className="text-2xl font-black text-white mb-10 uppercase italic tracking-tight">Export Headquarters</h3>
                
                <div className="space-y-10">
                    <div className="flex items-start gap-6 group">
                        <div className="bg-white/5 p-5 rounded-2xl border border-white/10 text-accent group-hover:bg-accent group-hover:text-black transition-all">
                          <MapPin size={24} />
                        </div>
                        <div>
                            <h4 className="font-black text-[10px] uppercase tracking-widest text-gray-500 mb-2">USA Distribution Hub</h4>
                            <p className="text-white font-bold text-sm">Industrial Estate Phase II, Sialkot, PK</p>
                        </div>
                    </div>
                    
                    <div className="flex items-start gap-6 group">
                        <div className="bg-white/5 p-5 rounded-2xl border border-white/10 text-accent group-hover:bg-accent group-hover:text-black transition-all">
                          <Phone size={24} />
                        </div>
                        <div>
                            <h4 className="font-black text-[10px] uppercase tracking-widest text-gray-500 mb-2">WhatsApp Direct</h4>
                            <p className="text-white font-bold text-sm">+92 303 9877968</p>
                        </div>
                    </div>
                    
                    <div className="flex items-start gap-6 group">
                        <div className="bg-white/5 p-5 rounded-2xl border border-white/10 text-accent group-hover:bg-accent group-hover:text-black transition-all">
                          <Mail size={24} />
                        </div>
                        <div>
                            <h4 className="font-black text-[10px] uppercase tracking-widest text-gray-500 mb-2">Email Inquiry</h4>
                            <p className="text-white font-bold text-sm">export@sialkotshop.com</p>
                        </div>
                    </div>
                </div>

                <div className="mt-16">
                    <a 
                      href={`https://wa.me/${WHATSAPP_NUMBER}`} 
                      target="_blank" 
                      rel="noreferrer" 
                      className="bg-accent text-black w-full py-6 rounded-2xl font-black text-xs uppercase tracking-[0.2em] flex items-center justify-center gap-3 hover:bg-white transition-all shadow-[0_0_40px_rgba(255,215,0,0.2)]"
                    >
                        <MessageCircle size={20} /> Start Live Consultation
                    </a>
                </div>
            </div>
        </div>

        {/* Message Form */}
        <div className="bg-[#0a0a0a] border border-white/5 p-10 rounded-[3rem] shadow-2xl">
            <h3 className="text-2xl font-black text-white mb-10 uppercase italic tracking-tight">Send Brief</h3>
            <form className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-2">
                        <label className="text-[9px] font-black text-accent uppercase tracking-widest ml-2">Full Name</label>
                        <input placeholder="JOHN DOE" className="w-full bg-white/5 border border-white/10 p-5 rounded-2xl text-white outline-none focus:border-accent transition-all font-bold text-xs uppercase tracking-widest" />
                    </div>
                    <div className="space-y-2">
                        <label className="text-[9px] font-black text-accent uppercase tracking-widest ml-2">Email Address</label>
                        <input placeholder="JD@EXAMPLE.COM" type="email" className="w-full bg-white/5 border border-white/10 p-5 rounded-2xl text-white outline-none focus:border-accent transition-all font-bold text-xs uppercase tracking-widest" />
                    </div>
                </div>
                <div className="space-y-2">
                    <label className="text-[9px] font-black text-accent uppercase tracking-widest ml-2">Subject</label>
                    <input placeholder="WHOLESALE / CUSTOM ORDER" className="w-full bg-white/5 border border-white/10 p-5 rounded-2xl text-white outline-none focus:border-accent transition-all font-bold text-xs uppercase tracking-widest" />
                </div>
                <div className="space-y-2">
                    <label className="text-[9px] font-black text-accent uppercase tracking-widest ml-2">Message</label>
                    <textarea placeholder="DESCRIBE YOUR REQUIREMENTS..." rows={5} className="w-full bg-white/5 border border-white/10 p-5 rounded-2xl text-white outline-none focus:border-accent transition-all font-bold text-xs uppercase tracking-widest resize-none"></textarea>
                </div>
                <button className="bg-white text-black w-full py-6 rounded-2xl font-black text-xs uppercase tracking-[0.3em] hover:bg-accent transition-all active:scale-95 shadow-xl">
                    Dispatch Message
                </button>
            </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
