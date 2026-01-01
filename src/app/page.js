"use client";
import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useInView, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, ShieldCheck, Zap, Users, ChevronDown, MapPin } from 'lucide-react';
import Link from 'next/link';

function Counter({ value, duration = 2.5 }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const end = parseInt(value);
      if (start === end) return;

      let totalFrames = Math.min(end, 100);
      let frameDuration = (duration * 1000) / totalFrames;
      
      const timer = setInterval(() => {
        start += Math.ceil(end / totalFrames);
        if (start >= end) {
          setCount(end);
          clearInterval(timer);
        } else {
          setCount(start);
        }
      }, frameDuration);
      return () => clearInterval(timer);
    }
  }, [isInView, value, duration]);

  return <span ref={ref}>{count}</span>;
}

export default function Home() {
  const { scrollY } = useScroll();
  
  const y1 = useTransform(scrollY, [0, 1000], [0, 400]);
  const opacity = useTransform(scrollY, [0, 400], [1, 0]);
  const scale = useTransform(scrollY, [0, 500], [1, 1.1]);

  const fadeInUp = {
    initial: { opacity: 0, y: 40 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-100px" },
    transition: { duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98] }
  };

  const staggerContainer = {
    initial: { opacity: 0 },
    whileInView: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    },
    viewport: { once: true }
  };

  const revealImage = {
    initial: { clipPath: 'inset(0 100% 0 0)', opacity: 0 },
    whileInView: { clipPath: 'inset(0 0% 0 0)', opacity: 1 },
    transition: { duration: 1.2, ease: [0.77, 0, 0.175, 1] },
    viewport: { once: true }
  };

  return (
    <main className="bg-[#FAFAFA] font-sans selection:bg-orange-100 selection:text-orange-900">
      <section className="relative h-[95vh] flex items-center justify-center overflow-hidden bg-[#1A1A1A]">
        <div className="absolute inset-0 z-0 opacity-50">
          <motion.div style={{  y: y1, scale }} className="absolute inset-0">
            <img 
              src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070" 
              className="w-full h-full object-cover scale-105 grayscale"
              alt="Bandhu Enterprises Architecture"
            />
          </motion.div>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#1A1A1A]/80" />
        </div>
        <div className="relative z-10 text-center px-4 max-w-5xl">
          <motion.div
            style={{ opacity }}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-6xl font-serif text-white mb-2 tracking-tight uppercase">
              BANDHU ENTERPRISES
            </h1>
            <p className="text-orange-400 font-bold uppercase tracking-[0.4em] text-sm md:text-xl mb-8">
              Foundation of Trust, Blueprint of Excellence
            </p>
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 1 }}
            className="text-xl md:text-2xl text-gray-200 mb-10 max-w-2xl mx-auto leading-relaxed"
          >
            Leading in <span className="text-white font-semibold">Structural Precision</span> & <span className="text-white font-semibold">Premium Interiors.</span>
          </motion.h2 >
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link href="/projects" className="bg-orange-500 text-white px-8 py-3 rounded-md font-medium hover:bg-orange-700 transition-all flex items-center justify-center gap-2 group">
              Our Portfolio <ArrowUpRight size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </Link>
            <Link href="/contact" className="bg-white/10 backdrop-blur-md text-white border border-white/20 px-8 py-3 rounded-md font-medium hover:bg-white hover:text-black transition-all">
              Request Quote
            </Link> 
          </motion.div>
        </div>
        <motion.div 
          animate={{ y: [0, 8, 0] }} 
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/40"
        >
          <ChevronDown size={28} />
        </motion.div>
      </section>
      
      <section className="py-24 md:py-32 px-6 lg:px-24 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 md:gap-24 items-center">
            <motion.div 
              initial="initial"
              whileInView="whileInView"
              viewport={{ once: true }}
              className="order-2 lg:order-1"
            >
              <motion.span variants={fadeInUp} className="text-orange-500 font-bold tracking-widest text-xs uppercase mb-4 block">About the Company</motion.span>
              <motion.h3 variants={fadeInUp} className="text-2xl md:text-3xl font-serif mb-6 text-[#2D241E] leading-snug tracking-tight uppercase">
                Building Legacies for <br/> <span className="text-orange-600">Generations.</span>
              </motion.h3>
              <motion.p variants={fadeInUp} className="text-lg text-gray-700 leading-relaxed mb-8">
                Headquartered in Lucknow, Bandhu Enterprises stands at the intersection of traditional integrity and futuristic engineering. From massive RCC infrastructure to bespoke corporate interiors, we translate complex blueprints into enduring realities.
              </motion.p>
              
              <motion.div variants={staggerContainer} className="grid grid-cols-2 gap-10 border-t border-gray-100 pt-10">
                <motion.div variants={fadeInUp} className="group cursor-default">
                  <h4 className="font-bold text-3xl md:text-5xl text-[#2D241E] group-hover:text-orange-600 transition-colors duration-500">
                    <Counter value="24" />+
                  </h4>
                  <p className="text-gray-500 text-[12px] uppercase tracking-[0.2em] font-bold mt-2">
                    Years of Excellence
                  </p>
                </motion.div>
                <motion.div variants={fadeInUp} className="group cursor-default">
                  <h4 className="font-bold text-3xl md:text-5xl text-[#2D241E] group-hover:text-orange-600 transition-colors duration-500">
                    <Counter value="300" />+
                  </h4>
                  <p className="text-gray-500 text-[12px] uppercase tracking-[0.2em] font-bold mt-2">
                    Successful Projects
                  </p>
                </motion.div>
              </motion.div>
            </motion.div>

            <motion.div 
              {...revealImage}
              className="relative order-1 lg:order-2"
            >
              <div className="relative z-10 group overflow-hidden rounded-2xl shadow-2xl">
                <img 
                  src="https://images.pexels.com/photos/323705/pexels-photo-323705.jpeg" 
                  className="w-full aspect-[4/3] object-cover grayscale transition-all duration-1000 group-hover:grayscale-0 group-hover:scale-110"
                  alt="Modern Architecture"
                />
              </div>
              <motion.div 
                initial={{ x: 20, y: 20 }}
                whileInView={{ x: 0, y: 0 }}
                transition={{ duration: 1 }}
                className="absolute -bottom-8 -left-8 w-64 h-64 bg-orange-50 rounded-2xl -z-10 hidden md:block" 
              />
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-[#F9F7F5] px-6 lg:px-24">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h3 className="text-2xl md:text-3xl font-serif text-[#2D241E] uppercase tracking-tight">The Bandhu Enterprises Standard</h3>
            <motion.div 
              initial={{ width: 0 }}
              whileInView={{ width: "4rem" }}
              transition={{ duration: 1, delay: 0.5 }}
              className="h-1 bg-orange-500 mx-auto mt-4" 
            />
          </motion.div>

          <motion.div 
            variants={staggerContainer}
            initial="initial"
            whileInView="whileInView"
            className="grid sm:grid-cols-2 md:grid-cols-3 gap-8"
          >
            {[
              { icon: <ShieldCheck size={40}/>, title: "Structural Integrity", desc: "Our RCC designs are engineered to exceed safety benchmarks, ensuring stability that spans decades." },
              { icon: <Zap size={40}/>, title: "Swift Execution", desc: "Optimized project management flows that guarantee on-time delivery without compromising on craftsmanship." },
              { icon: <Users size={40}/>, title: "Client Focused", desc: "A collaborative approach ensuring transparent communication and designs that perfectly suit your lifestyle." }
            ].map((item, index) => (
              <motion.div 
                key={index}
                variants={fadeInUp}
                whileHover={{ y: -10 }}
                className="bg-white p-12 rounded-3xl shadow-sm hover:shadow-2xl transition-all duration-500 border border-transparent hover:border-orange-500/20 group flex flex-col items-center text-center"
              >
                <div className="mb-8 w-20 h-20 bg-orange-50 rounded-[2rem] flex items-center justify-center transition-all duration-700 group-hover:bg-orange-600 group-hover:rotate-[360deg] group-hover:rounded-2xl shadow-inner">
                  <div className="text-orange-600 transition-colors duration-500 group-hover:text-white">
                    {item.icon}
                  </div>
                </div>
                <h4 className="text-lg font-serif mb-4 text-[#2D241E] font-bold uppercase tracking-[0.2em] transition-colors duration-500 group-hover:text-orange-600">{item.title}</h4>
                <p className="text-gray-500 text-[13px] leading-relaxed hover:text-gray-700">{item.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="py-24 px-8 lg:px-24 text-center">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl mx-auto"
        > 
          <h2 className="text-3xl md:text-4xl font-serif mb-8 leading-tight tracking-tight text-[#2D241E] uppercase">
            Ready to build your next landmark?
          </h2>
          <p className="text-gray-600 mb-10 text-base md:text-lg leading-relaxed">
            Consult with our expert architects and structural engineers today for a detailed, high-performance roadmap of your project.
          </p>
          <motion.a 
            href="/contact" 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-block bg-[#1C1612] text-white px-10 py-4 rounded-full font-bold hover:bg-orange-600 transition-all shadow-xl hover:shadow-orange-900/20 uppercase text-xs tracking-widest"
          >
            Request a Consultation
          </motion.a>
        </motion.div>
      </section>

      <section className="py-24 px-6 lg:px-24 bg-[#FAFAFA] border-t border-gray-100">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-8"
          >
            <div className="flex items-start gap-6">
              <div className="bg-orange-50 p-4 rounded-2xl text-orange-600 shadow-sm">
                <MapPin size={32} />
              </div>
              <div>
                <span className="text-orange-500 font-bold tracking-widest uppercase text-[10px]">Headquarters</span>
                <h3 className="text-2xl md:text-4xl font-serif mt-2 text-[#2D241E] uppercase tracking-tight">Daulatganj, Lucknow</h3>
                <p className="text-gray-400 text-sm mt-3 max-w-xs leading-relaxed">
                  456/786 Sajjad Bagh Colony, Daulatganj, Lucknow, Uttar Pradesh 226003
                </p>
              </div>
            </div>
            <motion.div whileHover={{ x: 10 }}>
              <Link 
                href="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3558.4632832967265!2d80.8931189!3d26.8887641!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3999557f9202720b%3A0xc48398df9813589c!2s456%2F786%2C%20Sajjad%20Bagh%20Colony%2C%20Daulatganj%2C%20Lucknow%2C%20Uttar%20Pradesh%20226003!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin" 
                target="_blank" 
                className="text-orange-600 font-bold text-xs uppercase tracking-widest flex items-center gap-3 group"
              >
                Open in Google Maps <ArrowUpRight size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </Link>
            </motion.div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="h-[500px] w-full rounded-[2.5rem] overflow-hidden shadow-2xl border border-gray-100 relative group"
          >
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3558.4632832967265!2d80.8931189!3d26.8887641!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3999557f9202720b%3A0xc48398df9813589c!2s456%2F786%2C%20Sajjad%20Bagh%20Colony%2C%20Daulatganj%2C%20Lucknow%2C%20Uttar%20Pradesh%20226003!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin" 
              className="w-full h-full grayscale group-hover:grayscale-0 transition-all duration-1000 ease-in-out"
              style={{ border: 0 }} 
              loading="lazy" 
              allowFullScreen=""
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </motion.div>
        </div>
      </section>
    </main>
  );
}