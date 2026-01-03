"use client";
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Phone } from 'lucide-react';
import Link from 'next/link';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Services', href: '/services' },
    { name: 'Projects', href: '/projects' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <nav className={`fixed w-full z-[100] transition-all duration-500 font-sans ${
      scrolled ? 'bg-[#FDFCF0]/95 backdrop-blur-md py-3 shadow-md' : 'bg-transparent py-6'
    }`}>
      <div className="max-w-8xl mx-auto px-6 lg:px-12 flex justify-between items-center">
        
        <Link href="/" className="flex items-center gap-4 group">
          <div className="relative w-20 h-20 md:w-20 md:h-20 flex-shrink-0">
            <img 
              src="/logo.png" 
              alt="Bandhu Logo"
              className="w-full h-full object-contain transform group-hover:scale-110 transition-transform duration-300"
              onError={(e) => {
                e.currentTarget.src = "/logo.png";
              }}
            />
          </div>
          <div className="flex flex-col">
            <span className={`font-serif font-bold tracking-tight text-xl md:text-3xl leading-none transition-colors duration-300 ${
              scrolled ? 'text-[#2D241E]' : 'text-white'
            }`}>
              BANDHU<br/>ENTERPRISES
            </span>
          </div>
        </Link>

        <div className="hidden md:flex items-center gap-10">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={`text-[13px] uppercase tracking-[0.2em] font-bold hover:text-[#D4AF37] transition-all relative group/link ${
                scrolled ? 'text-[#2D241E]' : 'text-white'
              }`}
            >
              {link.name}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#D4AF37] transition-all duration-300 group-hover/link:w-full" />
            </Link>
          ))}
          <a 
            href="tel:+919807606566" 
            className="bg-[#2D241E] text-white px-7 py-3 rounded-full text-xs font-bold uppercase tracking-widest flex items-center gap-2 hover:bg-[#D4AF37] transition-all hover:scale-105 active:scale-95 shadow-lg"
          >
            <Phone size={14} fill="currentColor" /> Call Now
          </a>
        </div>

        <button 
          className={`md:hidden p-2 focus:outline-none ${scrolled ? 'text-[#D4AF37]' : 'text-white'}`}
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={35} strokeWidth={2.5} /> : <Menu size={35} strokeWidth={2.5} />}
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="absolute top-full left-0 w-full bg-[#FDFCF0] border-t border-[#E5E1C9] shadow-2xl overflow-hidden md:hidden"
          >
            <div className="p-8 flex flex-col gap-6">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.name}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className="text-2xl font-serif font-bold text-[#2D241E] hover:text-[#D4AF37] transition-colors block uppercase"
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
              <div className="h-px bg-[#E5E1C9] w-full my-2" />
              <motion.a 
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
                href="tel:+919807606566"
                className="flex items-center gap-4 text-[#2D241E] font-bold text-xl"
              >
                <div className="bg-[#D4AF37]/20 p-3 rounded-full">
                  <Phone size={24} fill="#D4AF37" className="text-[#D4AF37]" />
                </div>
                +91 9807606566
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}