
import React, { useState } from 'react';
import { CartItem } from '../types';
import { WHATSAPP_NUMBER } from '../constants';
import { ShieldCheck, ArrowLeft, Truck, CreditCard, Loader2, MessageCircle } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { FlowButton } from '../components/ui/flow-button';
import { generateInvoicePDF } from '../lib/invoiceGenerator';
import { supabase } from '../lib/supabase';

interface CheckoutProps {
  items: CartItem[];
  onClearCart: () => void;
}

const Checkout: React.FC<CheckoutProps> = ({ items, onClearCart }) => {
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
        <Link to="/catalog">
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
            <Link to="/catalog" className="text-blue-500/40 hover:text-blue-400 transition-colors p-3 rounded-full border border-blue-500/10 bg-blue-500/5 backdrop-blur-md">
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

            <div className="p-8 bg-blue-500/5 border border-blue-500/20 rounded-3xl space-y-4 backdrop-blur-md">
              <div className="flex items-start gap-5">
                <div className="w-12 h-12 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center shrink-0 shadow-[0_0_20px_rgba(59,130,246,0.1)]">
                  <ShieldCheck className="text-blue-500" size={24} />
                </div>
                <div>
                  <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-white">Encrypted Verification</h4>
                  <p className="text-[10px] text-blue-300/40 mt-2 leading-relaxed uppercase tracking-[0.2em] font-black">
                    Your archive request will be verified by a specialist who will confirm stock and provide secure payment instructions.
                  </p>
                </div>
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

        {/* Summary */}
        <div className="bg-zinc-950 p-8 lg:p-12 rounded-[2rem] border border-white/5 h-fit sticky top-32">
          <h2 className="text-2xl serif mb-8 border-b border-white/10 pb-4 text-white">Order Summary</h2>
          <div className="space-y-6 mb-8 max-h-96 overflow-y-auto pr-4">
            {items.map((item) => (
              <div key={`${item.productId}-${item.variantId}`} className="flex gap-6 group">
                <div className="relative w-24 h-24 shrink-0 rounded-2xl overflow-hidden border border-white/10 group-hover:border-blue-500/40 transition-colors">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" />
                  <div className="absolute inset-0 bg-blue-950/20 mix-blend-overlay opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <div className="flex-1 py-1">
                  <h4 className="text-xs font-black uppercase tracking-[0.3em] text-blue-100 group-hover:text-blue-400 transition-colors">{item.name}</h4>
                  <p className="text-[9px] text-gray-500 uppercase tracking-[0.4em] mt-2 font-black">{item.brand} • {item.size}</p>
                  <div className="flex justify-between items-center mt-4">
                    <span className="text-[10px] text-gray-500 uppercase tracking-[0.2em] font-black">ARCHIVE QTY: {item.quantity}</span>
                    <span className="text-sm font-black text-blue-400 group-hover:text-blue-300 transition-colors tracking-widest">${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="space-y-4 pt-8 border-t border-white/10">
            <div className="flex justify-between text-[11px] text-gray-500 uppercase tracking-[0.4em] font-black">
              <span>Archive Subtotal</span>
              <span className="text-white">${total.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-[11px] text-gray-500 uppercase tracking-[0.4em] font-black">
              <span className="flex items-center gap-3"><Truck size={14} className="text-blue-500" /> Transport</span>
              <span className="text-blue-400 shadow-[0_0_10px_rgba(59,130,246,0.3)] px-3 py-1 bg-blue-500/10 rounded-full border border-blue-500/20">Complimentary</span>
            </div>
            <div className="flex justify-between items-baseline pt-8">
              <span className="text-xs font-black uppercase tracking-[0.6em] text-blue-500">Total Resonance</span>
              <span className="text-4xl font-black text-white tracking-widest shadow-[0_0_30px_rgba(59,130,246,0.2)] pb-1">${total.toFixed(2)}</span>
            </div>
          </div>

          <div className="mt-8 flex items-center justify-center gap-6 opacity-40 grayscale text-white">
            <CreditCard size={20} />
            <div className="h-4 w-[1px] bg-white/20" />
            <span className="text-[10px] uppercase tracking-widest">Bank Transfer</span>
            <div className="h-4 w-[1px] bg-white/20" />
            <span className="text-[10px] uppercase tracking-widest">COD</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
