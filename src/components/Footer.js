"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { Facebook, Instagram, Linkedin, Twitter, Mail, Phone, MapPin, ArrowUp } from 'lucide-react';
import Link from 'next/link';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#0A0A0A] text-white pt-16 pb-8 overflow-hidden font-sans border-t border-white/5">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          <div className="space-y-6">
            <Link href="/" className="flex items-center gap-4 group">
              <div className="w-16 h-16 md:w-20 md:h-20 flex-shrink-0">
                <img 
                  src="/logo.png" 
                  alt="Bandhu Logo"
                  className="w-full h-full object-contain transform group-hover:scale-110 transition-transform duration-500"
                  onError={(e) => { e.target.src = "/logo.png"; }}
                />
              </div>
              <span className="font-serif font-bold tracking-tight text-xl md:text-2xl leading-none transition-colors group-hover:text-orange-500 uppercase">
                BANDHU<br/> ENTERPRISES
              </span>
            </Link>
            
            <div className="space-y-4">
               <p className="text-orange-500 text-[12px] font-bold uppercase tracking-[0.2em] leading-relaxed italic border-l-2 border-orange-500/50 pl-4">
                Foundation of Trust, <br /> Blueprint of Excellence
              </p>
              <p className="text-gray-500 text-[14px] leading-relaxed max-w-xs">
                Leading premium structural engineering and interior solutions in Lucknow since 2010.
              </p>
            </div>

            <div className="flex gap-4 pt-2">
              {[Facebook, Instagram, Linkedin, Twitter].map((Icon, i) => (
                <motion.a 
                  key={i} 
                  href="#" 
                  whileHover={{ y: -5, backgroundColor: "#ea580c" }}
                  className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center transition-all duration-300 group"
                >
                  <Icon size={16} className="text-gray-400 group-hover:text-white" />
                </motion.a>
              ))}
            </div>
          </div>

          <div className="lg:ml-auto">
            <h4 className="text-white text-[12px] font-bold uppercase tracking-[0.3em] mb-8 flex items-center gap-2">
              <span className="w-4 h-px bg-orange-500"></span> Navigation
            </h4>
            <ul className="space-y-3">
              {['Home', 'About', 'Services', 'Projects', 'Contact'].map((item) => (
                <li key={item}>
                  <Link 
                    href={item === 'Home' ? '/' : `/${item.toLowerCase()}`} 
                    className="text-gray-500 text-[15px] hover:text-orange-500 transition-colors flex items-center gap-2 group"
                  >
                    <span className="w-0 h-px bg-orange-500 transition-all group-hover:w-3"></span>
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:ml-auto">
             <h4 className="text-white text-[12px] font-bold uppercase tracking-[0.3em] mb-8 flex items-center gap-2">
              <span className="w-4 h-px bg-orange-500"></span> Expertise
            </h4>
            <ul className="space-y-3 text-gray-500 text-[15px]">
              <li className="hover:text-gray-300 transition-colors">Architectural Design</li>
              <li className="hover:text-gray-300 transition-colors">Interior Build</li>
              <li className="hover:text-gray-300 transition-colors">RCC Infrastructure</li>
              <li className="hover:text-gray-300 transition-colors">Road Construction</li>
              <li className="hover:text-gray-300 transition-colors">Waterproofing</li>
            </ul>
          </div>

          <div className="space-y-6 lg:ml-auto">
             <h4 className="text-white text-[12px] font-bold uppercase tracking-[0.3em] mb-8 flex items-center gap-2">
              <span className="w-4 h-px bg-orange-500"></span> Contact
            </h4>
            <div className="space-y-5">
              <div className="flex gap-4 items-start group">
                <div className="w-8 h-8 rounded-lg bg-orange-500/10 flex items-center justify-center shrink-0 mt-0.5">
                  <MapPin size={14} className="text-orange-500" />
                </div>
                <p className="text-gray-500 text-[15px] leading-relaxed">
                  456/786 Sajjad Bagh Colony,<br />Daulatganj, Lucknow-226003
                </p>
              </div>
              <div className="flex gap-4 items-center group">
                <div className="w-8 h-8 rounded-lg bg-orange-500/10 flex items-center justify-center shrink-0">
                  <Phone size={14} className="text-orange-500" />
                </div>
                <a href="tel:+919807606566" className="text-gray-500 text-[15px] hover:text-white transition-colors">
                  +91 9807606566
                </a>
              </div>
              <div className="flex gap-4 items-center group">
                <div className="w-8 h-8 rounded-lg bg-orange-500/10 flex items-center justify-center shrink-0">
                  <Mail size={14} className="text-orange-500" />
                </div>
                <a href="mailto:bandhuenterprises.info@gmail.com" className="text-gray-500 text-[15px] hover:text-white transition-colors">
                  bandhuenterprises.info@gmail.com
                </a>
              </div>
            </div>
          </div>

        </div>

        <div className="border-t border-white/5 pt-5 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-gray-600 text-[9px] tracking-[0.2em] uppercase font-medium">
            © {currentYear} Bandhu Enterprises. All rights reserved.
          </p>
          
          <button 
            onClick={scrollToTop}
            className="group flex items-center gap-3 text-[9px] uppercase tracking-[0.3em] font-bold text-gray-500 hover:text-orange-500 transition-all"
          >
            <span>Back to top</span>
            <div className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center group-hover:border-orange-500 transition-all shadow-lg group-hover:shadow-orange-500/20">
              <ArrowUp size={14} className="group-hover:-translate-y-1 transition-transform" />
            </div>
          </button>
        </div>
      </div>
    </footer>
  );
}