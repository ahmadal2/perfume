import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  TrendingUp, Package, Users, ShoppingBag, Plus, Edit3, Trash2,
  Search, LayoutDashboard, Box, Truck, Tag, Calendar, AlertCircle
} from 'lucide-react';
import { api } from '../services/apiService';
import { DashboardStats, Product, Sale } from '../types';
import { FlowButton } from '../components/ui/flow-button';
import { ProductForm } from '../components/admin/ProductForm';
import { SaleForm } from '../components/admin/SaleForm';

const AdminDashboard: React.FC = () => {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [activeView, setActiveView] = useState<'overview' | 'products' | 'orders' | 'sales'>('overview');
  const [sales, setSales] = useState<Sale[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Modal State
  const [showProductForm, setShowProductForm] = useState(false);
  const [showSaleForm, setShowSaleForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | undefined>(undefined);

  const fetchData = useCallback(async () => {
    try {
      const [statsData, salesData, productsData] = await Promise.all([
        api.getDashboardStats(),
        api.getSales(),
        api.getProducts()
      ]);
      setStats(statsData);
      setSales(salesData);
      setProducts(productsData);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleProductSuccess = () => {
    fetchData();
  };

  const handleSaleSuccess = () => {
    fetchData();
  };

  const handleDeleteSale = async (id: string) => {
    if (confirm("Terminate this campaign?")) {
      await api.deleteSale(id);
      fetchData();
    }
  };

  if (isLoading) return <div className="min-h-screen bg-[#020617] flex items-center justify-center text-white font-black tracking-[1em] uppercase text-[10px] animate-pulse">Accessing Command Center...</div>;

  return (
    <div className="min-h-screen bg-[#020617] pt-40 pb-24 text-white relative">
      <div className="max-w-7xl mx-auto px-6">

        {/* Navigation / Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-10 mb-20">
          <div className="space-y-4">
            <div className="flex items-center gap-6">
              <div className="h-px w-12 bg-blue-500" />
              <span className="text-[10px] uppercase tracking-[1em] text-blue-500 font-black">System Sovereignty</span>
            </div>
            <h1 className="text-7xl md:text-8xl serif italic tracking-tighter">Command Center.</h1>
          </div>

          <div className="flex flex-wrap gap-2 p-2 glass-panel rounded-[2rem] border border-white/5 bg-white/[0.02]">
            {[
              { id: 'overview', label: 'Overview', icon: LayoutDashboard },
              { id: 'products', label: 'Essences', icon: Box },
              { id: 'orders', label: 'Logistics', icon: Truck },
              { id: 'sales', label: 'Fiscal', icon: Tag },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveView(tab.id as any)}
                className={`flex items-center gap-3 px-8 py-3 rounded-full text-[9px] uppercase tracking-[0.3em] font-black transition-all duration-500 ${activeView === tab.id
                  ? 'bg-blue-600 text-white shadow-2xl'
                  : 'text-white/40 hover:text-white hover:bg-white/5'
                  }`}
              >
                <tab.icon size={14} />
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        <AnimatePresence mode="wait">
          {activeView === 'overview' && stats && (
            <motion.div key="overview" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-16">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                <StatCard label="Annual Revenue" value={`$${stats.totalRevenue.toLocaleString()}`} icon={TrendingUp} trend={stats.revenueTrend} />
                <StatCard label="Logistics Volume" value={stats.totalOrders} icon={ShoppingBag} trend={stats.orderTrend} />
                <StatCard label="Archived Citizens" value={stats.activeUsers} icon={Users} trend="+3.2%" />
                <StatCard label="Inventory Alerts" value={stats.lowStockItems} icon={Package} variant="warning" />
              </div>

              <div className="grid lg:grid-cols-3 gap-10">
                <div className="lg:col-span-2 glass-panel p-12 rounded-[4rem] border border-white/5">
                  <div className="flex justify-between items-center mb-10">
                    <h3 className="text-3xl serif italic">Recent Distillations</h3>
                    <button className="text-[9px] uppercase tracking-[0.4em] text-blue-400 font-black hover:text-blue-300 transition-colors">Full Ledger</button>
                  </div>
                  <div className="space-y-8">
                    {[1, 2, 3].map(i => (
                      <div key={i} className="flex items-center justify-between py-6 border-b border-white/5 last:border-none group">
                        <div className="flex items-center gap-6">
                          <div className="w-16 h-16 rounded-[1.5rem] bg-white/5 border border-white/5 flex items-center justify-center text-blue-500 group-hover:bg-blue-500/10 transition-colors">
                            <ShoppingBag size={20} />
                          </div>
                          <div>
                            <p className="text-xs font-black uppercase tracking-[0.2em]">Transaction #ORD-X{i}92</p>
                            <p className="text-[9px] text-white/30 uppercase tracking-[0.4em] mt-1">Sovereign Citizen • 3 Essences</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-lg font-black tracking-widest">$842.00</p>
                          <span className="text-[8px] px-3 py-1 rounded-full bg-green-500/10 text-green-400 font-black uppercase tracking-widest border border-green-500/20">Settled</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="glass-panel p-12 rounded-[4rem] border border-white/5 flex flex-col justify-center items-center text-center space-y-8">
                  <div className="w-24 h-24 rounded-full border border-blue-500/20 flex items-center justify-center bg-blue-500/5">
                    <AlertCircle size={32} className="text-blue-500 animate-pulse" />
                  </div>
                  <div className="space-y-4">
                    <h4 className="text-2xl serif italic">Stock Depletion</h4>
                    <p className="text-[10px] text-white/30 uppercase tracking-[0.4em] leading-loose">The following extracts require immediate replenishment to maintain boutique reserves.</p>
                  </div>
                  <div className="w-full space-y-4">
                    {products.filter(p => (p.variants?.[0]?.stock || 0) < 10).slice(0, 2).map(p => (
                      <div key={p.id} className="flex justify-between p-4 rounded-2xl bg-white/[0.02] border border-white/5">
                        <span className="text-[9px] font-black uppercase tracking-widest">{p.name}</span>
                        <span className="text-[9px] font-black uppercase tracking-widest text-red-500">{p.variants[0]?.stock || 0} Units</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeView === 'products' && (
            <motion.div key="products" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="glass-panel p-16 rounded-[4rem] border border-white/5">
              <div className="flex flex-col md:flex-row justify-between items-center gap-10 mb-16">
                <div className="relative w-full md:w-1/2">
                  <Search size={18} className="absolute left-8 top-1/2 -translate-y-1/2 text-white/20" />
                  <input
                    type="text"
                    placeholder="Archive Search..."
                    className="w-full bg-white/5 border border-white/5 rounded-full py-6 pl-18 pr-8 text-[11px] uppercase tracking-[0.3em] font-black focus:outline-none focus:border-blue-500/50"
                  />
                </div>
                <FlowButton
                  text="Register Essence"
                  variant="blue"
                  className="h-16 px-12"
                  onClick={() => {
                    setEditingProduct(undefined);
                    setShowProductForm(true);
                  }}
                />
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="border-b border-white/10 pb-8">
                      <th className="pb-8 text-[10px] uppercase tracking-[0.5em] text-white/30 font-black">Archive Identity</th>
                      <th className="pb-8 text-[10px] uppercase tracking-[0.5em] text-white/30 font-black">Category</th>
                      <th className="pb-8 text-[10px] uppercase tracking-[0.5em] text-white/30 font-black text-center">Reserves</th>
                      <th className="pb-8 text-[10px] uppercase tracking-[0.5em] text-white/30 font-black">Valuation</th>
                      <th className="pb-8 text-right text-[10px] uppercase tracking-[0.5em] text-white/30 font-black">Operations</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {products.map((p) => (
                      <tr key={p.id} className="group hover:bg-white/[0.01] transition-colors">
                        <td className="py-8">
                          <div className="flex items-center gap-6">
                            <img src={p.images[0] || 'https://images.unsplash.com/photo-1541643600914-78b084683601?q=80&w=100&auto=format&fit=crop'} className="w-14 h-14 rounded-2xl object-cover border border-white/10" alt={p.name} />
                            <span className="text-xs font-black uppercase tracking-widest">{p.name}</span>
                          </div>
                        </td>
                        <td className="py-8 text-[10px] uppercase tracking-[0.3em] text-white/40">{p.fragranceType || 'Parfume'}</td>
                        <td className="py-8 text-center">
                          <div className="flex flex-col items-center">
                            <span className={`text-[11px] font-black uppercase tracking-widest mb-2 ${!p.variants[0] || p.variants[0].stock < 10 ? 'text-red-500' : 'text-green-500'}`}>
                              {p.variants[0]?.stock || 0} Units
                            </span>
                            <div className="w-20 h-1 bg-white/5 rounded-full overflow-hidden">
                              <div className={`h-full ${!p.variants[0] || p.variants[0].stock < 10 ? 'bg-red-500' : 'bg-green-500'}`} style={{ width: `${Math.min((p.variants[0]?.stock || 0) * 2, 100)}%` }} />
                            </div>
                          </div>
                        </td>
                        <td className="py-8 font-black tracking-tighter text-lg">${p.variants[0]?.price || '0.00'}</td>
                        <td className="py-8 text-right">
                          <div className="flex justify-end gap-3">
                            <button
                              onClick={() => {
                                setEditingProduct(p);
                                setShowProductForm(true);
                              }}
                              className="w-10 h-10 rounded-xl bg-white/5 hover:bg-blue-500/10 hover:text-blue-500 transition-all flex items-center justify-center"
                            >
                              <Edit3 size={16} />
                            </button>
                            <button
                              onClick={async () => {
                                if (confirm('Are you sure you want to delete this essence?')) {
                                  await api.deleteProduct(p.id);
                                  await fetchData();
                                }
                              }}
                              className="w-10 h-10 rounded-xl bg-white/5 hover:bg-red-500/10 hover:text-red-500 transition-all flex items-center justify-center"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          )}

          {activeView === 'sales' && (
            <motion.div key="sales" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="space-y-10">
              <div className="flex justify-between items-center">
                <h2 className="text-4xl serif italic">Fiscal Orchestration</h2>
                <FlowButton
                  variant="gold"
                  className="h-16 px-10"
                  text="Establish New Sale"
                  onClick={() => setShowSaleForm(true)}
                />
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {sales.map((sale) => (
                  <div key={sale.id} className="glass-panel p-10 rounded-[3rem] border border-white/5 hover:border-gold/30 transition-all group">
                    <div className="flex justify-between items-start mb-8">
                      <div className="p-4 rounded-2xl bg-gold/10 text-gold border border-gold/20">
                        <Tag size={20} />
                      </div>
                      <div className={`px-4 py-1 rounded-full text-[8px] font-black uppercase tracking-[0.2em] border ${sale.isActive ? 'bg-green-500/10 text-green-400 border-green-500/20' : 'bg-red-500/10 text-red-400 border-red-500/20'}`}>
                        {sale.isActive ? 'Propagating' : 'Suspended'}
                      </div>
                    </div>
                    <h4 className="text-2xl serif italic mb-3">{sale.name}</h4>
                    <div className="flex items-center gap-4 mb-8">
                      <span className="text-3xl font-black text-white">{sale.discountValue}{sale.discountType === 'percentage' ? '%' : '$'}</span>
                      <span className="text-[10px] uppercase tracking-[0.3em] text-white/30 font-black">Distillation Factor</span>
                    </div>
                    <div className="space-y-4 pt-6 border-t border-white/5">
                      <div className="flex items-center gap-3 text-[10px] uppercase tracking-widest text-white/40">
                        <Calendar size={12} />
                        <span>{new Date(sale.startDate || '').toLocaleDateString()} → {sale.isPermanent ? 'Eternal' : new Date(sale.endDate || '').toLocaleDateString()}</span>
                      </div>
                      <div className="flex gap-2 pt-4">
                        <button onClick={() => handleDeleteSale(sale.id)} className="flex-1 py-3 rounded-xl bg-white/5 hover:bg-red-500/10 hover:text-red-500 transition-colors text-[9px] uppercase tracking-widest font-black">Terminate</button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Modals */}
      <AnimatePresence>
        {showProductForm && (
          <ProductForm
            initialData={editingProduct}
            onClose={() => setShowProductForm(false)}
            onSuccess={handleProductSuccess}
          />
        )}
        {showSaleForm && (
          <SaleForm
            onClose={() => setShowSaleForm(false)}
            onSuccess={handleSaleSuccess}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

const StatCard = ({ label, value, icon: Icon, trend, variant = 'default' }: any) => (
  <div className="glass-panel p-10 rounded-[3rem] border border-white/5 relative group hover:border-blue-500/30 transition-all duration-700">
    <div className={`w-14 h-14 rounded-2xl border mb-8 flex items-center justify-center transition-all ${variant === 'warning' ? 'bg-red-500/10 border-red-500/20 text-red-500 group-hover:bg-red-500/20' : 'bg-blue-500/10 border-blue-500/20 text-blue-500 group-hover:bg-blue-500/20'
      }`}>
      <Icon size={24} />
    </div>
    <div className="space-y-4">
      <p className="text-[10px] uppercase tracking-[0.5em] text-white/20 font-black">{label}</p>
      <div className="flex items-end justify-between">
        <h4 className="text-4xl font-black tracking-tighter tabular-nums">{value}</h4>
        {trend && <span className="text-[10px] font-black text-green-500 tabular-nums mb-1">{trend}</span>}
      </div>
    </div>
  </div>
);

export default AdminDashboard;
