"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { Hammer, Clock } from 'lucide-react';

export default function Maintenance() {
  return (
    <main className="min-h-screen bg-[#1C1612] flex items-center justify-center p-6 text-center">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-2xl"
      >
        <div className="w-20 h-20 bg-[#D4AF37]/10 rounded-3xl flex items-center justify-center mx-auto mb-8 border border-[#D4AF37]/20">
          <Hammer className="text-[#D4AF37]" size={40} />
        </div>
        
        <h1 className="text-4xl md:text-5xl font-serif text-white uppercase tracking-tighter mb-6">
          Refining Our <span className="text-[#D4AF37]">Digital Blueprint</span>
        </h1>
        
        <p className="text-gray-400 text-lg mb-10 leading-relaxed italic">
          "Bandhu Enterprises is currently updating our portal to better serve your architectural and structural needs. We will be back online shortly."
        </p>
        
        <div className="flex items-center justify-center gap-3 text-[#D4AF37] font-bold uppercase tracking-[0.3em] text-xs">
          <Clock size={16} />
          <span>Estimated uptime: 2 Hours</span>
        </div>
      </motion.div>
    </main>
  );
}