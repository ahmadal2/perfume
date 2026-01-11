import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, ShoppingBag, ShieldCheck, MessageCircle, ArrowLeft, Loader2 } from 'lucide-react';
import { CartItem } from '../types';
import { WHATSAPP_NUMBER } from '../constants';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { generateInvoicePDF } from '../lib/invoiceGenerator';
import { supabase } from '../lib/supabase';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (productId: string, variantId: string, delta: number) => void;
  onRemove: (productId: string, variantId: string) => void;
}

const CartDrawer: React.FC<CartDrawerProps> = ({ isOpen, onClose, items, onUpdateQuantity, onRemove }) => {
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  // Flow State
  const [step, setStep] = useState<'cart' | 'info'>('cart');
  const [isProcessing, setIsProcessing] = useState(false);
  const [lang, setLang] = useState<'en' | 'de'>('en');

  // User Form State
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    notes: ''
  });

  const t = {
    de: {
      title: "Kundenarchiv",
      count: "Essenz",
      empty: "Ihr Archiv ist leer.",
      link_home: "Destillation beginnen",
      subtotal: "Zwischensumme",
      secure: "Verschlüsselte Transaktion 2026",
      checkout_wa: "Bestellung via WhatsApp",
      checkout_btn: "Abschluss",
      taxes_note: "Steuern und Logistik im letzten Schritt",
      label_name: "Name",
      label_phone: "Telefonnummer",
      label_email: "E-Mail-Adresse",
      label_address: "Anschrift",
      label_notes: "Notizen/Anweisungen",
      placeholder_name: "Geben Sie Ihren Namen ein",
      placeholder_phone: "Geben Sie Ihre Telefonnummer ein",
      placeholder_email: "Geben Sie Ihre E-Mail ein",
      placeholder_address: "Lieferadresse oder Abholung",
      placeholder_notes: "Spezielle Wünsche...",
      btn_next: "Weiter zum Bezahlvorgang",
      btn_back: "Zurück zum Warenkorb",
      btn_finalize: "Über WhatsApp bestellen",
      step_info: "Bestellinfo",
    },
    en: {
      title: "Client Archive",
      count: "Essence",
      empty: "Your archive is empty.",
      link_home: "Begin Distillation",
      subtotal: "Subtotal Resonance",
      secure: "Encrypted Boutique Transaction 2026",
      checkout_wa: "WhatsApp Checkout",
      checkout_btn: "Finalize Distillation",
      taxes_note: "Taxes and logistics distilled at final step",
      label_name: "Name",
      label_phone: "Phone Number",
      label_email: "Email Address",
      label_address: "Delivery Coordinates",
      label_notes: "Order Notes",
      placeholder_name: "Enter your full name",
      placeholder_phone: "Enter your phone number",
      placeholder_email: "Enter your email address",
      placeholder_address: "Address or Pickup instructions",
      placeholder_notes: "Special messages...",
      btn_next: "Next: Identity & Delivery",
      btn_back: "Back to Essence",
      btn_finalize: "Finalize via WhatsApp",
      step_info: "Information",
    }
  };

  const txt = t[lang];

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] overflow-hidden flex justify-end">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/40 backdrop-blur-[2px]"
          />

          {/* Container */}
          <motion.div
            initial={{ x: '100%', opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: '100%', opacity: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="relative w-full max-w-lg h-full bg-[#05070a]/80 backdrop-blur-[60px] border-l border-white/5 flex flex-col shadow-[0_0_100px_rgba(0,0,0,0.5)]"
          >
            {/* Header */}
            <div className="px-8 py-10 flex items-center justify-between border-b border-white/5">
              <div className="flex items-center gap-4">
                {step === 'info' ? (
                  <button
                    onClick={() => setStep('cart')}
                    className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-white/40 hover:text-white hover:border-white/20 transition-all"
                  >
                    <ArrowLeft size={20} />
                  </button>
                ) : (
                  <div className="w-12 h-12 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-500">
                    <ShoppingBag size={20} />
                  </div>
                )}
                <div>
                  <h2 className="text-xl font-black uppercase tracking-[0.2em] serif italic text-white">
                    {step === 'cart' ? txt.title : txt.step_info}
                  </h2>
                  <p className="text-[8px] uppercase tracking-[0.4em] text-white/30 font-bold mt-1">
                    {items.length} {txt.count}{items.length !== 1 && lang === 'en' ? 's' : ''} Stored
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <button
                  onClick={() => setLang(l => l === 'en' ? 'de' : 'en')}
                  className="px-3 py-1 rounded-full border border-white/10 text-[9px] font-bold uppercase tracking-widest text-white/60 hover:text-white hover:border-white/30 transition-all"
                >
                  {lang === 'en' ? 'DE' : 'EN'}
                </button>

                <button
                  onClick={onClose}
                  className="w-10 h-10 rounded-full border border-white/5 flex items-center justify-center text-white/40 hover:text-white hover:border-white/20 transition-all"
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            {/* Content Area */}
            <div className="flex-1 overflow-y-auto p-8 space-y-8 scroll-smooth overflow-x-hidden">
              <AnimatePresence mode="wait">
                {step === 'cart' ? (
                  <motion.div
                    key="cart-step"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-8"
                  >
                    {items.length === 0 ? (
                      <div className="h-full py-20 flex flex-col items-center justify-center text-center space-y-6">
                        <div className="w-20 h-20 rounded-full border border-dashed border-white/10 flex items-center justify-center text-white/10">
                          <ShoppingBag size={32} />
                        </div>
                        <div className="space-y-2">
                          <p className="text-white/40 text-xs uppercase tracking-[0.3em] font-bold">{txt.empty}</p>
                          <Link
                            to="/products"
                            onClick={onClose}
                            className="inline-block text-blue-500 text-[9px] uppercase tracking-[0.5em] font-black border-b border-blue-500/20 pb-1 hover:border-blue-500 transition-all"
                          >
                            {txt.link_home}
                          </Link>
                        </div>
                      </div>
                    ) : (
                      items.map((item) => (
                        <motion.div
                          layout
                          key={`${item.productId}-${item.variantId}`}
                          className="group relative flex gap-6 p-4 rounded-3xl bg-white/[0.02] border border-white/5 hover:border-blue-500/20 transition-all duration-500"
                        >
                          <div className="w-24 h-24 shrink-0 rounded-2xl overflow-hidden border border-white/5 bg-zinc-900">
                            <img
                              src={item.image}
                              alt={item.name}
                              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                            />
                          </div>

                          <div className="flex-1 flex flex-col justify-between py-1 min-w-0">
                            <div>
                              <div className="flex justify-between items-start gap-2">
                                <h3 className="text-xs font-black text-white uppercase tracking-wider truncate">{item.name}</h3>
                                <button
                                  onClick={() => onRemove(item.productId, item.variantId)}
                                  className="text-white/10 hover:text-red-500 transition-colors shrink-0"
                                >
                                  <Trash2 size={14} />
                                </button>
                              </div>
                              <p className="text-[9px] text-white/40 uppercase tracking-[0.2em] font-bold mt-1">
                                {item.brand} • {item.size}
                              </p>
                            </div>

                            <div className="flex items-center justify-between mt-4">
                              <div className="flex items-center gap-3 bg-black/40 border border-white/5 rounded-full p-1">
                                <button
                                  onClick={() => onUpdateQuantity(item.productId, item.variantId, -1)}
                                  className="w-7 h-7 rounded-full flex items-center justify-center text-white/40 hover:bg-white/5 hover:text-white transition-all"
                                >
                                  <Minus size={10} />
                                </button>
                                <span className="text-[10px] font-black w-4 text-center tabular-nums">{item.quantity}</span>
                                <button
                                  onClick={() => onUpdateQuantity(item.productId, item.variantId, 1)}
                                  className="w-7 h-7 rounded-full flex items-center justify-center text-white/40 hover:bg-white/5 hover:text-white transition-all"
                                >
                                  <Plus size={10} />
                                </button>
                              </div>
                              <p className="text-xs font-black text-white tracking-widest tabular-nums font-mono">
                                €{(item.price * item.quantity).toFixed(2)}
                              </p>
                            </div>
                          </div>
                        </motion.div>
                      ))
                    )}
                  </motion.div>
                ) : (
                  <motion.div
                    key="info-step"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    className="space-y-8"
                  >
                    <div className="space-y-6">
                      <div className="space-y-3">
                        <label className="text-[9px] uppercase tracking-[0.2em] text-white/40 font-bold ml-2">{txt.label_name} *</label>
                        <input
                          type="text"
                          required
                          value={formData.name}
                          onChange={e => setFormData({ ...formData, name: e.target.value })}
                          placeholder={txt.placeholder_name}
                          className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-xs text-white placeholder-white/20 focus:outline-none focus:border-blue-500/50 transition-colors font-black uppercase tracking-widest"
                        />
                      </div>
                      <div className="space-y-3">
                        <label className="text-[9px] uppercase tracking-[0.2em] text-white/40 font-bold ml-2">{txt.label_phone} *</label>
                        <input
                          type="tel"
                          required
                          value={formData.phone}
                          onChange={e => setFormData({ ...formData, phone: e.target.value })}
                          placeholder={txt.placeholder_phone}
                          className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-xs text-white placeholder-white/20 focus:outline-none focus:border-blue-500/50 transition-colors font-black uppercase tracking-widest"
                        />
                      </div>
                      <div className="space-y-3">
                        <label className="text-[9px] uppercase tracking-[0.2em] text-white/40 font-bold ml-2">{txt.label_email}</label>
                        <input
                          type="email"
                          value={formData.email}
                          onChange={e => setFormData({ ...formData, email: e.target.value })}
                          placeholder={txt.placeholder_email}
                          className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-xs text-white placeholder-white/20 focus:outline-none focus:border-blue-500/50 transition-colors font-black uppercase tracking-widest"
                        />
                      </div>
                      <div className="space-y-3">
                        <label className="text-[9px] uppercase tracking-[0.2em] text-white/40 font-bold ml-2">{txt.label_address}</label>
                        <textarea
                          value={formData.address}
                          onChange={e => setFormData({ ...formData, address: e.target.value })}
                          placeholder={txt.placeholder_address}
                          className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-xs text-white placeholder-white/20 focus:outline-none focus:border-blue-500/50 transition-colors font-black uppercase tracking-widest h-24 resize-none"
                        />
                      </div>
                      <div className="space-y-3">
                        <label className="text-[9px] uppercase tracking-[0.2em] text-white/40 font-bold ml-2">{txt.label_notes}</label>
                        <textarea
                          value={formData.notes}
                          onChange={e => setFormData({ ...formData, notes: e.target.value })}
                          placeholder={txt.placeholder_notes}
                          className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-xs text-white placeholder-white/20 focus:outline-none focus:border-blue-500/50 transition-colors font-black uppercase tracking-widest h-24 resize-none"
                        />
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="p-8 border-t border-white/5 space-y-6 bg-[#0a0d14]/40 backdrop-blur-md">
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-white/30 uppercase text-[9px] tracking-[0.4em] font-bold">{txt.subtotal}</span>
                    <span className="text-2xl font-black text-white tracking-tighter tabular-nums font-mono">€{total.toFixed(2)}</span>
                  </div>
                  <div className="flex items-center gap-3 py-3 px-4 rounded-2xl bg-blue-500/5 border border-blue-500/10">
                    <ShieldCheck size={14} className="text-blue-500" />
                    <p className="text-[8px] uppercase tracking-[0.3em] text-blue-400 font-black">
                      {txt.secure}
                    </p>
                  </div>
                </div>

                {step === 'cart' ? (
                  <button
                    onClick={() => setStep('info')}
                    className="relative group block w-full text-center bg-blue-600 hover:bg-blue-500 text-white py-5 rounded-2xl uppercase font-black tracking-[0.5em] text-[10px] transition-all duration-500 shadow-[0_15px_40px_rgba(37,99,235,0.2)] overflow-hidden"
                  >
                    <span className="relative z-10">{txt.btn_next}</span>
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                  </button>
                ) : (
                  <div className="space-y-4">
                    <button
                      disabled={isProcessing}
                      onClick={async () => {
                        if (!formData.name || !formData.phone) {
                          alert(lang === 'de' ? "Bitte geben Sie Namen und Telefonnummer an." : "Please provide name and phone number.");
                          return;
                        }

                        setIsProcessing(true);
                        try {
                          const orderId = `ESS-${Math.floor(1000 + Math.random() * 9000)}`;
                          const date = new Date().toLocaleDateString(lang === 'de' ? 'de-DE' : 'en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          });

                          const pdfBlob = generateInvoicePDF({
                            orderId,
                            customer: formData,
                            items,
                            total,
                            notes: formData.notes,
                            date
                          });

                          const fileName = `${orderId}-${Date.now()}.pdf`;
                          const { error: uploadError } = await supabase.storage
                            .from('invoices')
                            .upload(fileName, pdfBlob, {
                              contentType: 'application/pdf',
                              cacheControl: '3600',
                              upsert: false
                            });

                          if (uploadError) throw uploadError;

                          const { data: { publicUrl } } = supabase.storage
                            .from('invoices')
                            .getPublicUrl(fileName);

                          const itemsText = items.map(i => `- ${i.name} (${i.size}) x${i.quantity}`).join('\n');
                          const message = encodeURIComponent(
                            `👑 *NEW ORDER #${orderId}*\n\n` +
                            `👤 *Customer:* ${formData.name}\n` +
                            `📞 *Phone:* ${formData.phone}\n` +
                            `📧 *Email:* ${formData.email || 'N/A'}\n` +
                            `📍 *Address:* ${formData.address || 'Pickup'}\n\n` +
                            `📦 *Items:* \n${itemsText}\n\n` +
                            `💰 *Total:* €${total.toFixed(2)}\n\n` +
                            `📝 *Notes:* ${formData.notes || 'None'}\n\n` +
                            `📄 *Official Invoice:* ${publicUrl}\n\n` +
                            `_Please confirm my order and send payment instructions._`
                          );

                          window.open(`https://wa.me/${WHATSAPP_NUMBER.replace('+', '')}?text=${message}`, '_blank');
                        } catch (error) {
                          console.error('Order processing failed:', error);
                          alert(lang === 'de' ? 'Problem beim Erstellen der Bestellung. Bitte erneut versuchen.' : 'Problem processing order. Please try again.');
                        } finally {
                          setIsProcessing(false);
                        }
                      }}
                      className="relative group block w-full text-center bg-[#25D366] hover:bg-[#20bd5a] text-white py-5 rounded-2xl uppercase font-black tracking-[0.3em] text-[10px] transition-all duration-500 shadow-[0_15px_40px_rgba(37,211,102,0.2)] overflow-hidden"
                    >
                      <span className="relative z-10 flex items-center justify-center gap-2">
                        {isProcessing ? <Loader2 size={16} className="animate-spin" /> : <MessageCircle size={16} />}
                        {isProcessing ? (lang === 'de' ? 'Wird erstellt...' : 'Processing...') : txt.btn_finalize}
                      </span>
                    </button>
                    <button
                      onClick={() => setStep('cart')}
                      className="w-full text-center text-white/30 hover:text-white text-[9px] uppercase tracking-[0.4em] font-black transition-colors"
                    >
                      {txt.btn_back}
                    </button>
                  </div>
                )}

                <p className="text-[7px] text-white/20 text-center uppercase tracking-[0.5em] font-medium italic">
                  {txt.taxes_note}
                </p>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default CartDrawer;
