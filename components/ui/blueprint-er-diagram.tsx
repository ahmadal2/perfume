
'use client';

import React from 'react';
import { motion } from 'framer-motion';

const ENTITIES = [
  { id: 'users', label: 'USERS', x: 100, y: 100 },
  { id: 'orders', label: 'ORDERS', x: 400, y: 100 },
  { id: 'payments', label: 'PAYMENTS', x: 700, y: 100 },
  { id: 'items', label: 'ORDER_ITEMS', x: 400, y: 300 },
  { id: 'products', label: 'PRODUCTS', x: 400, y: 500 },
  { id: 'variants', label: 'VARIANTS', x: 700, y: 500 },
  { id: 'reviews', label: 'REVIEWS', x: 100, y: 300 },
  { id: 'cart', label: 'CART_ITEMS', x: 100, y: 500 },
];

const CONNECTIONS = [
  { from: 'users', to: 'orders', label: 'places' },
  { from: 'orders', to: 'payments', label: 'settles' },
  { from: 'orders', to: 'items', label: 'contains' },
  { from: 'items', to: 'products', label: 'references' },
  { from: 'products', to: 'variants', label: 'has' },
  { from: 'users', to: 'reviews', label: 'writes' },
  { from: 'users', to: 'cart', label: 'has' },
  { from: 'products', to: 'reviews', label: 'receives' },
];

export const BlueprintERDiagram: React.FC = () => {
  return (
    <div className="relative w-full aspect-[16/9] bg-black/20 rounded-2xl border border-white/5 overflow-hidden p-8 cursor-crosshair">
      <svg className="absolute inset-0 w-full h-full pointer-events-none">
        <defs>
          <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="0" refY="3.5" orient="auto">
            <polygon points="0 0, 10 3.5, 0 7" fill="#3b82f6" opacity="0.5" />
          </marker>
        </defs>
        
        {/* Connection Lines */}
        {CONNECTIONS.map((conn, i) => {
          const from = ENTITIES.find(e => e.id === conn.from)!;
          const to = ENTITIES.find(e => e.id === conn.to)!;
          return (
            <motion.g key={i}>
              <motion.path
                d={`M ${from.x + 100} ${from.y + 40} L ${to.x} ${to.y + 40}`}
                stroke="#3b82f6"
                strokeWidth="1"
                strokeDasharray="5,5"
                fill="none"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 0.3 }}
                transition={{ duration: 2, delay: i * 0.2 }}
              />
              <motion.text
                x={(from.x + 100 + to.x) / 2}
                y={(from.y + 40 + to.y + 40) / 2 - 10}
                fill="#3b82f6"
                fontSize="8"
                textAnchor="middle"
                className="uppercase tracking-[0.2em] font-black"
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.4 }}
              >
                {conn.label}
              </motion.text>
            </motion.g>
          );
        })}
      </svg>

      {/* Nodes */}
      {ENTITIES.map((entity, i) => (
        <motion.div
          key={entity.id}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, delay: i * 0.1 }}
          style={{ left: entity.x, top: entity.y }}
          className="absolute w-48 p-4 glass-panel border border-white/10 rounded-xl hover:border-blue-500/50 transition-all group z-20"
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
            <span className="text-[10px] font-black tracking-widest text-white group-hover:text-blue-400">{entity.label}</span>
          </div>
          <div className="space-y-1">
             <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                <div className="h-full w-1/3 bg-blue-500/20" />
             </div>
             <div className="flex justify-between text-[6px] uppercase tracking-widest text-white/20 font-black">
                <span>PK_UUID</span>
                <span>Active</span>
             </div>
          </div>
        </motion.div>
      ))}

      {/* Grid Overlay */}
      <div className="absolute inset-0 pointer-events-none border border-blue-500/10" />
    </div>
  );
};
