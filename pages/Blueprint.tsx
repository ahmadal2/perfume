
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Database, Shield, CreditCard, Code, Share2, Layers, Cpu, Server } from 'lucide-react';
import { TextEffect } from '../components/ui/text-effect';
import { FlowButton } from '../components/ui/flow-button';
import { BlueprintERDiagram } from '../components/ui/blueprint-er-diagram';

const SECTIONS = [
  { id: 'er', label: 'Relational Archive', icon: Share2 },
  { id: 'schema', label: 'Schema Definitions', icon: Database },
  { id: 'security', label: 'Security Protocol', icon: Shield },
  { id: 'payments', label: 'Transaction Ledger', icon: CreditCard },
  { id: 'api', label: 'Neural Endpoints', icon: Code },
];

const Blueprint: React.FC = () => {
  const [activeTab, setActiveTab] = useState('er');

  return (
    <div className="min-h-screen bg-[#020617] pt-40 pb-20 text-white">
      {/* Background Grids */}
      <div className="fixed inset-0 pointer-events-none opacity-20">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:40px_40px]" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#020617] via-transparent to-[#020617]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="mb-20 space-y-6">
          <div className="flex items-center gap-4">
             <Cpu size={16} className="text-blue-500 animate-pulse" />
             <span className="text-[10px] uppercase tracking-[1em] text-blue-500 font-black">System Architecture</span>
          </div>
          <TextEffect per="char" preset="blur" as="h1" className="text-6xl md:text-9xl serif italic tracking-tighter text-glow">
            Technical Blueprint.
          </TextEffect>
          <p className="max-w-2xl text-white/40 text-sm leading-loose uppercase tracking-[0.2em] font-light">
            The mathematical foundation of KHAMRAH. A multi-layered neural ecosystem engineered for absolute precision in high-end olfactory commerce.
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap gap-2 mb-12 p-2 glass-panel rounded-full border border-white/5 inline-flex">
          {SECTIONS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-3 px-8 py-3 rounded-full text-[10px] uppercase tracking-[0.3em] font-black transition-all duration-500 ${
                activeTab === tab.id 
                  ? 'bg-blue-600 text-white shadow-[0_0_20px_rgba(59,130,246,0.4)]' 
                  : 'text-white/30 hover:text-white hover:bg-white/5'
              }`}
            >
              <tab.icon size={12} />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content Area */}
        <div className="min-h-[600px]">
          <AnimatePresence mode="wait">
            {activeTab === 'er' && (
              <motion.div
                key="er"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="glass-panel p-8 md:p-12 rounded-[3rem] border border-white/5 overflow-hidden"
              >
                <div className="flex flex-col md:flex-row justify-between items-start gap-8 mb-12">
                  <div className="space-y-4">
                    <h2 className="text-3xl serif italic text-blue-100">The Entity Map</h2>
                    <p className="text-xs text-white/40 uppercase tracking-[0.2em]">Visualizing the relationship between users, essences, and transactions.</p>
                  </div>
                  <div className="flex gap-4">
                    <div className="flex items-center gap-2 px-4 py-2 bg-blue-500/10 rounded-full border border-blue-500/20">
                      <div className="w-2 h-2 rounded-full bg-blue-500" />
                      <span className="text-[8px] font-black uppercase text-blue-400">Stable v2.5</span>
                    </div>
                  </div>
                </div>
                
                <BlueprintERDiagram />
              </motion.div>
            )}

            {activeTab === 'schema' && (
              <motion.div
                key="schema"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="grid md:grid-cols-2 gap-8"
              >
                <SchemaCard 
                  title="USERS" 
                  description="Identity & Role Matrix"
                  fields={[
                    { name: 'id', type: 'UUID PK', desc: 'Primary key' },
                    { name: 'email', type: 'TEXT UK', desc: 'Unique identifier' },
                    { name: 'role', type: 'ENUM', desc: 'customer | admin | owner' },
                    { name: 'is_active', type: 'BOOLEAN', desc: 'Account status' }
                  ]}
                />
                <SchemaCard 
                  title="PRODUCTS" 
                  description="The Olfactory Archive"
                  fields={[
                    { name: 'id', type: 'UUID PK', desc: 'Primary key' },
                    { name: 'slug', type: 'TEXT UK', desc: 'URL identifier' },
                    { name: 'fragrance_notes', type: 'JSONB', desc: 'Top, Heart, Base' },
                    { name: 'rating_average', type: 'DECIMAL', desc: 'User consensus' }
                  ]}
                />
                <SchemaCard 
                  title="ORDERS" 
                  description="Transaction Ledger"
                  fields={[
                    { name: 'id', type: 'UUID PK', desc: 'Primary key' },
                    { name: 'order_number', type: 'TEXT UK', desc: 'Boutique reference' },
                    { name: 'total_amount', type: 'DECIMAL', desc: 'Volume value' },
                    { name: 'status', type: 'ENUM', desc: 'pending | confirmed | shipped' }
                  ]}
                />
                <SchemaCard 
                  title="PAYMENTS" 
                  description="Financial Settlement"
                  fields={[
                    { name: 'id', type: 'UUID PK', desc: 'Primary key' },
                    { name: 'payment_intent_id', type: 'TEXT UK', desc: 'Stripe reference' },
                    { name: 'amount', type: 'DECIMAL', desc: 'Settlement volume' },
                    { name: 'payment_status', type: 'ENUM', desc: 'succeeded | failed' }
                  ]}
                />
              </motion.div>
            )}

            {activeTab === 'security' && (
              <motion.div
                key="security"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-8"
              >
                <ProtocolSection 
                  title="Row Level Security (RLS)" 
                  description="Database-level access control ensuring data isolation and sovereign privacy."
                  code={`CREATE POLICY "Users can view own profile"
  ON users FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Admins can view all users"
  ON users FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE id = auth.uid() AND role IN ('admin', 'owner')
    )
  );`}
                />
                <ProtocolSection 
                  title="Input Sanitization Protocol" 
                  description="Strict schema validation via Zod matrix for all incoming payloads."
                  code={`export const createProductSchema = z.object({
  name: z.string().min(3).max(200),
  gender: z.enum(['men', 'women', 'unisex']),
  variants: z.array(z.object({
    price: z.number().positive(),
    sku: z.string()
  })).min(1)
});`}
                />
              </motion.div>
            )}

            {activeTab === 'payments' && (
              <motion.div
                key="payments"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="glass-panel p-12 rounded-[3rem] border border-white/5"
              >
                <div className="grid md:grid-cols-2 gap-16">
                  <div className="space-y-8">
                    <h2 className="text-4xl serif italic">Settlement Flow</h2>
                    <p className="text-sm text-white/40 leading-loose uppercase tracking-widest font-light">
                      Integration with Stripe via PaymentIntents API. Transactions are verified via encrypted webhooks before stock is distilled from inventory.
                    </p>
                    <ul className="space-y-4">
                      {['Encrypted Handshake', 'Real-time Stock Reserve', '3D Secure v2 Authentication', 'Post-Settlement Ledger Update'].map((step, i) => (
                        <li key={i} className="flex items-center gap-4 text-[10px] font-black uppercase tracking-widest text-blue-400">
                          <span className="h-1 w-1 bg-blue-500 rounded-full" />
                          {step}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="bg-black/40 p-6 rounded-2xl border border-white/5 font-mono text-[10px] text-blue-300 leading-relaxed">
                    <div className="flex gap-2 mb-4">
                      <div className="w-2 h-2 rounded-full bg-red-500/40" />
                      <div className="w-2 h-2 rounded-full bg-yellow-500/40" />
                      <div className="w-2 h-2 rounded-full bg-green-500/40" />
                    </div>
                    <pre>{`// PaymentIntent Initiation
const paymentIntent = await stripe.paymentIntents.create({
  amount: Math.round(order.total_amount * 100),
  currency: 'usd',
  metadata: { orderId: order.id },
  automatic_payment_methods: { enabled: true },
});`}</pre>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'api' && (
              <motion.div
                key="api"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="grid gap-4"
              >
                {[
                  { method: 'POST', path: '/auth/login', desc: 'Identity verification' },
                  { method: 'GET', path: '/products', desc: 'Archive query' },
                  { method: 'POST', path: '/orders', desc: 'Transaction initiation' },
                  { method: 'PATCH', path: '/orders/:id/status', desc: 'Logistics update' }
                ].map((route, i) => (
                  <div key={i} className="glass-panel p-6 rounded-2xl border border-white/5 flex items-center justify-between group hover:border-blue-500/30 transition-all">
                    <div className="flex items-center gap-6">
                      <span className={`px-3 py-1 rounded text-[8px] font-black tracking-widest ${
                        route.method === 'GET' ? 'bg-green-500/20 text-green-400' : 'bg-blue-500/20 text-blue-400'
                      }`}>{route.method}</span>
                      <span className="font-mono text-xs text-white/80">{route.path}</span>
                    </div>
                    <span className="text-[10px] text-white/20 uppercase tracking-[0.2em]">{route.desc}</span>
                  </div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

// --- Helper Components ---

const SchemaCard = ({ title, description, fields }: any) => (
  <div className="glass-panel p-8 rounded-[2.5rem] border border-white/5 hover:border-blue-500/20 transition-all group">
    <div className="flex items-center justify-between mb-6">
      <div className="space-y-1">
        <h3 className="text-xl serif italic text-white group-hover:text-blue-400 transition-colors">{title}</h3>
        <p className="text-[9px] uppercase tracking-widest text-white/30">{description}</p>
      </div>
      <Server size={14} className="text-white/10 group-hover:text-blue-500 transition-all" />
    </div>
    <div className="space-y-3">
      {fields.map((f: any, i: number) => (
        <div key={i} className="flex items-center justify-between py-2 border-b border-white/5 last:border-none">
          <span className="font-mono text-[11px] text-white/70">{f.name}</span>
          <div className="text-right">
            <span className="text-[9px] font-black text-blue-500 tracking-widest block uppercase">{f.type}</span>
            <span className="text-[8px] text-white/20 tracking-wider block uppercase">{f.desc}</span>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const ProtocolSection = ({ title, description, code }: any) => (
  <div className="glass-panel p-10 rounded-[3rem] border border-white/5">
    <div className="grid md:grid-cols-3 gap-10">
      <div className="md:col-span-1 space-y-4">
        <h3 className="text-2xl serif italic text-blue-100">{title}</h3>
        <p className="text-xs text-white/40 leading-loose uppercase tracking-widest font-light">{description}</p>
      </div>
      <div className="md:col-span-2 bg-black/60 p-6 rounded-2xl border border-white/5 font-mono text-[11px] text-green-400 overflow-x-auto">
        <pre>{code}</pre>
      </div>
    </div>
  </div>
);

export default Blueprint;
