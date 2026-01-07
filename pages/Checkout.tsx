
import React, { useState } from 'react';
import { CartItem } from '../types';
import { WHATSAPP_NUMBER } from '../constants';
import { ShieldCheck, ArrowLeft, Truck, CreditCard, Loader2, MessageCircle, Plus, Minus, Trash2, Lock, Eye, Zap, ShieldAlert } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { FlowButton } from '../components/ui/flow-button';
import { generateInvoicePDF } from '../lib/invoiceGenerator';
import { supabase } from '../lib/supabase';

interface CheckoutProps {
  items: CartItem[];
  onClearCart: () => void;
  onUpdateQuantity: (productId: string, variantId: string, delta: number) => void;
  onRemoveItem: (productId: string, variantId: string) => void;
}

const Checkout: React.FC<CheckoutProps> = ({ items, onClearCart, onUpdateQuantity, onRemoveItem }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    notes: ''
  });

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) {
      alert("Please provide at least your name and phone number.");
      return;
    }

    setIsProcessing(true);
    try {
      const orderId = `ESS-${Math.floor(1000 + Math.random() * 9000)}`;
      const date = new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });

      // 1. Generate PDF Invoice
      const pdfBlob = generateInvoicePDF({
        orderId,
        customer: formData,
        items,
        total,
        notes: formData.notes,
        date
      });

      // 2. Upload to Supabase Storage
      const fileName = `${orderId}-${Date.now()}.pdf`;
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('invoices')
        .upload(fileName, pdfBlob, {
          contentType: 'application/pdf',
          cacheControl: '3600',
          upsert: false
        });

      if (uploadError) throw uploadError;

      // 3. Get Public URL
      const { data: { publicUrl } } = supabase.storage
        .from('invoices')
        .getPublicUrl(fileName);

      // 4. Construct WhatsApp Message
      const itemsText = items.map(i => `- ${i.name} (${i.size}) x${i.quantity}`).join('\n');
      const message = encodeURIComponent(
        `👑 *NEW ORDER #${orderId}*\n\n` +
        `👤 *Customer:* ${formData.name}\n` +
        `📞 *Phone:* ${formData.phone}\n` +
        `📧 *Email:* ${formData.email || 'N/A'}\n` +
        `📍 *Address:* ${formData.address || 'Pickup'}\n\n` +
        `📦 *Items:* \n${itemsText}\n\n` +
        `💰 *Total:* $${total.toFixed(2)}\n\n` +
        `📝 *Notes:* ${formData.notes || 'None'}\n\n` +
        `📄 *Official Invoice:* ${publicUrl}\n\n` +
        `_Please confirm my order and send payment instructions._`
      );

      window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${message}`, '_blank');
      onClearCart();
      navigate('/');
    } catch (error) {
      console.error('Order processing failed:', error);
      alert('There was a problem processing your invoice. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center space-y-6">
        <h2 className="text-3xl serif italic text-white">Your bag is empty</h2>
        <Link to="/products">
          <FlowButton text="Discover Our Scents" />
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 lg:py-24">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
        {/* Form */}
        <div className="space-y-16">
          <div className="flex items-center gap-6 text-white group cursor-default">
            <Link to="/products" className="text-blue-500/40 hover:text-blue-400 transition-colors p-3 rounded-full border border-blue-500/10 bg-blue-500/5 backdrop-blur-md">
              <ArrowLeft size={20} />
            </Link>
            <div className="space-y-2">
              <h4 className="text-[10px] uppercase tracking-[0.8em] font-black text-blue-500/60">Final Objective</h4>
              <h1 className="text-5xl md:text-6xl serif italic tracking-tighter text-blue-100">Finalizing Your Selection</h1>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="space-y-8">
              <h3 className="text-[10px] uppercase tracking-[0.6em] font-black text-white border-l-2 border-white pl-4 py-1">Delivery Information</h3>
              <div className="grid grid-cols-1 gap-6">
                <div className="relative group rounded-2xl overflow-hidden border border-white/20 backdrop-blur-xl bg-white/5 hover:bg-white/10 transition-all duration-500">
                  <input
                    required
                    placeholder="FULL NAME ARCHIVE *"
                    className="w-full bg-transparent p-6 text-[11px] uppercase tracking-[0.4em] focus:outline-none text-white font-black placeholder:text-white/40"
                    value={formData.name}
                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                  />
                  <div className="absolute inset-x-0 bottom-0 h-[2px] w-0 bg-white shadow-[0_0_15px_rgba(255,255,255,0.6)] transition-all duration-700 group-focus-within:w-full" />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="relative group rounded-2xl overflow-hidden border border-white/20 backdrop-blur-xl bg-white/5 hover:bg-white/10 transition-all duration-500">
                    <input
                      required
                      placeholder="PHONE FREQUENCY *"
                      className="w-full bg-transparent p-6 text-[11px] uppercase tracking-[0.4em] focus:outline-none text-white font-black placeholder:text-white/40"
                      value={formData.phone}
                      onChange={e => setFormData({ ...formData, phone: e.target.value })}
                    />
                    <div className="absolute inset-x-0 bottom-0 h-[2px] w-0 bg-white shadow-[0_0_15px_rgba(255,255,255,0.6)] transition-all duration-700 group-focus-within:w-full" />
                  </div>
                  <div className="relative group rounded-2xl overflow-hidden border border-white/20 backdrop-blur-xl bg-white/5 hover:bg-white/10 transition-all duration-500">
                    <input
                      placeholder="EMAIL ENCRYPTION (OPTIONAL)"
                      className="w-full bg-transparent p-6 text-[11px] uppercase tracking-[0.4em] focus:outline-none text-white font-black placeholder:text-white/40"
                      value={formData.email}
                      onChange={e => setFormData({ ...formData, email: e.target.value })}
                    />
                    <div className="absolute inset-x-0 bottom-0 h-[2px] w-0 bg-white shadow-[0_0_15px_rgba(255,255,255,0.6)] transition-all duration-700 group-focus-within:w-full" />
                  </div>
                </div>

                <div className="relative group rounded-[2rem] overflow-hidden border border-white/20 backdrop-blur-xl bg-white/5 hover:bg-white/10 transition-all duration-500">
                  <textarea
                    placeholder="DELIVERY COORDINATES (OPTIONAL FOR PICKUP)"
                    className="w-full bg-transparent p-8 text-[11px] uppercase tracking-[0.4em] focus:outline-none h-40 resize-none text-white font-black placeholder:text-white/40"
                    value={formData.address}
                    onChange={e => setFormData({ ...formData, address: e.target.value })}
                  />
                  <div className="absolute inset-x-0 bottom-0 h-[2px] w-0 bg-white shadow-[0_0_15px_rgba(255,255,255,0.6)] transition-all duration-700 group-focus-within:w-full" />
                </div>
              </div>
            </div>

            <div className="space-y-8">
              <h3 className="text-[10px] uppercase tracking-[0.6em] font-black text-white border-l-2 border-white pl-4 py-1">Order Notes</h3>
              <div className="relative group rounded-[2rem] overflow-hidden border border-white/20 backdrop-blur-xl bg-white/5 hover:bg-white/10 transition-all duration-500">
                <textarea
                  placeholder="SPECIAL INSTRUCTIONS OR GIFTING MESSAGES..."
                  className="w-full bg-transparent p-8 text-[11px] uppercase tracking-[0.4em] focus:outline-none h-40 resize-none text-white font-black placeholder:text-white/40"
                  value={formData.notes}
                  onChange={e => setFormData({ ...formData, notes: e.target.value })}
                />
                <div className="absolute inset-x-0 bottom-0 h-[2px] w-0 bg-white shadow-[0_0_15px_rgba(255,255,255,0.6)] transition-all duration-700 group-focus-within:w-full" />
              </div>
            </div>

            {/* Security Section Integrated */}
            <div className="space-y-8">
              <h3 className="text-[10px] uppercase tracking-[0.6em] font-black text-white border-l-2 border-white pl-4 py-1">Security & Encryption Protocol</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {[
                  { icon: <ShieldCheck size={16} />, label: "SQL Injection", status: "ORM + Validation" },
                  { icon: <Eye size={16} />, label: "XSS Protection", status: "Escaping + CSP" },
                  { icon: <Lock size={16} />, label: "CSRF Guard", status: "Dynamic Tokens" },
                  { icon: <Zap size={16} />, label: "DDoS Shield", status: "Rate Limiting" },
                  { icon: <ShieldAlert size={16} />, label: "Token Theft", status: "HttpOnly Cookies" },
                  { icon: <MessageCircle size={16} />, label: "API Integrity", status: "Usage Limits" },
                ].map((item, idx) => (
                  <div key={idx} className="p-4 rounded-2xl border border-white/5 bg-white/5 backdrop-blur-md group hover:border-blue-500/30 transition-all duration-500">
                    <div className="text-blue-500 mb-2 group-hover:scale-110 transition-transform origin-left">{item.icon}</div>
                    <div className="text-[9px] font-black text-white/40 uppercase tracking-widest">{item.label}</div>
                    <div className="text-[9px] font-black text-blue-400 mt-1 uppercase tracking-tighter">{item.status}</div>
                  </div>
                ))}
              </div>
            </div>

            <FlowButton
              type="submit"
              className="w-full py-8 border-blue-500/20 hover:border-blue-500/50 text-white group relative overflow-hidden bg-blue-600/10"
              disabled={isProcessing}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600/0 via-blue-600/10 to-blue-600/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
              {isProcessing ? (
                <Loader2 className="animate-spin text-blue-500 mr-2" size={18} />
              ) : (
                <MessageCircle className="mr-3 text-blue-500 group-hover:rotate-12 transition-transform" size={18} />
              )}
              <span className="text-[11px] uppercase tracking-[0.5em] font-black">
                {isProcessing ? "Distilling Invoice..." : "Verify Order via WhatsApp"}
              </span>
            </FlowButton>
          </form>
        </div>

        {/* Summary Redesigned */}
        <div className="bg-zinc-950/80 backdrop-blur-3xl p-8 lg:p-12 rounded-[3rem] border border-white/10 h-fit sticky top-32 shadow-[0_0_50px_rgba(0,0,0,0.5)] overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-purple-500/5 opacity-50" />

          <h2 className="text-2xl serif mb-10 border-b border-white/5 pb-6 text-white relative flex justify-between items-end">
            <span>Order Summary</span>
            <span className="text-[10px] uppercase tracking-[0.4em] font-black text-blue-500/60 pb-1">{items.length} ARCHIVES</span>
          </h2>

          <div className="space-y-8 mb-10 max-h-[32rem] overflow-y-auto pr-4 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent relative">
            {items.map((item) => (
              <div key={`${item.productId}-${item.variantId}`} className="flex gap-6 group relative">
                <div className="relative w-28 h-28 shrink-0 rounded-3xl overflow-hidden border border-white/10 group-hover:border-blue-500/40 transition-all duration-700 shadow-2xl">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 scale-110 group-hover:scale-100" />
                  <div className="absolute inset-0 bg-blue-950/20 mix-blend-overlay opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>

                <div className="flex-1 flex flex-col justify-between py-1">
                  <div>
                    <div className="flex justify-between items-start">
                      <h4 className="text-[11px] font-black uppercase tracking-[0.3em] text-blue-500 group-hover:text-blue-400 transition-colors leading-relaxed pr-8">{item.name}</h4>
                      <button
                        onClick={() => onRemoveItem(item.productId, item.variantId)}
                        className="text-white/20 hover:text-red-500/80 transition-colors p-2 -mr-2"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                    <p className="text-[9px] text-gray-500 uppercase tracking-[0.4em] mt-2 font-black">{item.brand} • {item.size}</p>
                  </div>

                  <div className="flex justify-between items-end mt-4">
                    <div className="flex items-center bg-white/5 rounded-2xl border border-white/10 overflow-hidden backdrop-blur-sm">
                      <button
                        onClick={() => onUpdateQuantity(item.productId, item.variantId, -1)}
                        className="p-2 px-3 hover:bg-white/10 transition-colors text-white/60 hover:text-white"
                      >
                        <Minus size={12} />
                      </button>
                      <span className="text-[10px] font-black text-white px-2 min-w-[2rem] text-center border-x border-white/10">{item.quantity}</span>
                      <button
                        onClick={() => onUpdateQuantity(item.productId, item.variantId, 1)}
                        className="p-2 px-3 hover:bg-white/10 transition-colors text-white/60 hover:text-white"
                      >
                        <Plus size={12} />
                      </button>
                    </div>
                    <span className="text-sm font-black text-white group-hover:text-blue-400 transition-colors tracking-widest">${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="space-y-5 pt-10 border-t border-white/5 relative">
            <div className="flex justify-between text-[11px] text-gray-500 uppercase tracking-[0.4em] font-black">
              <span>Archive Subtotal</span>
              <span className="text-white">${total.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-[11px] text-gray-500 uppercase tracking-[0.4em] font-black">
              <span className="flex items-center gap-3"><Truck size={14} className="text-blue-500" /> Transport</span>
              <span className="text-blue-400 bg-blue-500/10 px-4 py-1.5 rounded-full border border-blue-500/20 text-[10px]">Complimentary</span>
            </div>
            <div className="flex justify-between items-center pt-8">
              <div>
                <span className="text-[10px] font-black uppercase tracking-[0.6em] text-blue-500/60 block mb-1">Total Resonance</span>
                <span className="text-[8px] text-white/20 uppercase tracking-[0.4em] font-black">Inclusive of all local taxes</span>
              </div>
              <span className="text-5xl font-black text-white tracking-tighter drop-shadow-[0_0_15px_rgba(59,130,246,0.3)]">${total.toFixed(2)}</span>
            </div>
          </div>

          <div className="mt-12 flex items-center justify-center gap-8 opacity-20 grayscale hover:opacity-50 transition-opacity duration-700 text-white">
            <CreditCard size={18} />
            <div className="h-4 w-[px] bg-white/10" />
            <span className="text-[9px] uppercase tracking-widest font-black">Bank Transfer</span>
            <div className="h-4 w-[px] bg-white/10" />
            <span className="text-[9px] uppercase tracking-widest font-black">COD</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
