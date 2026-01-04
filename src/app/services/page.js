"use client";
import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { 
  PencilRuler, 
  ShieldCheck, 
  HardHat,
  CheckCircle2,
  Droplets,
  Construction,
  Layout,
  Building,
  Monitor,
  Component,
  FlaskConical,
  UtensilsCrossed,
  Briefcase
} from 'lucide-react';

const iconMap = {
  PencilRuler: <PencilRuler size={32} />,
  ShieldCheck: <ShieldCheck size={32} />,
  HardHat: <HardHat size={32} />,
  CheckCircle2: <CheckCircle2 size={32} />,
  Droplets: <Droplets size={32} />,
  Construction: <Construction size={32} />,
  Layout: <Layout size={32} />,
  Building: <Building size={32} />,
  Monitor: <Monitor size={32} />,
  Component: <Component size={32} />,
  FlaskConical: <FlaskConical size={32} />,
  UtensilsCrossed: <UtensilsCrossed size={32} />
};

export default function Services() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const { scrollYProgress } = useScroll();
  const scale = useTransform(scrollYProgress, [0, 0.3], [1, 1.1]);

  useEffect(() => {
    async function fetchServices() {
      try {
        const res = await fetch('/api/services');
        if (res.ok) {
          const data = await res.json();
          setServices(data);
        }
      } catch (error) {
        console.error("Error loading dynamic services:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchServices();
  }, []);

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
      transition: { staggerChildren: 0.1, delayChildren: 0.1 }
    },
    viewport: { once: true }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FDFCF0] flex items-center justify-center">
        <div className="text-[#D4AF37] font-serif uppercase tracking-[0.3em] animate-pulse text-xs font-bold">
          Synchronizing Capabilities...
        </div>
      </div>
    );
  }

  return (
    <main className="bg-[#FDFCF0] overflow-hidden font-sans selection:bg-orange-100 selection:text-orange-900">
      <section className="relative h-[60vh] min-h-[400px] flex items-center justify-center overflow-hidden bg-[#1C1612]">
        <motion.div style={{ scale }} className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-black/60 z-10" />
          <img 
            src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070" 
            className="w-full h-full object-cover transition-all duration-1000"
            alt="Engineering Background"
          />
        </motion.div>
        
        <div className="relative z-20 text-center px-6 max-w-4xl">
          <motion.div 
            initial={{ opacity: 0, y: 30, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h1 className="text-3xl md:text-5xl font-serif text-white mb-6 leading-tight tracking-tight uppercase">
              Building <span className="text-[#D4AF37]">Excellence</span>, <br /> 
              Engineering Precision.
            </h1>
            <p className="text-xs md:text-sm text-gray-300 leading-relaxed max-w-lg mx-auto uppercase tracking-widest">
              From architectural blueprints to industrial infrastructure.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-24 px-8 lg:px-24 max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-2xl md:text-3xl font-serif text-[#2D241E] mb-4 uppercase tracking-tight">
            Our Core Capabilities
          </h2>
          <motion.div 
            initial={{ width: 0 }}
            whileInView={{ width: "4rem" }}
            transition={{ duration: 1, delay: 0.3 }}
            className="h-1 bg-[#D4AF37] mx-auto" 
          />
        </motion.div>

        <motion.div 
          variants={staggerContainer}
          initial="initial"
          whileInView="whileInView"
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {services.map((service, index) => (
            <motion.div
              key={service._id || index}
              variants={fadeInUp}
              whileHover={{ y: -8 }}
              className="bg-white p-10 rounded-3xl border border-[#E5E1C9] group transition-all duration-500 hover:shadow-2xl hover:bg-[#FAF9E6] flex flex-col items-center text-center relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 bg-[#D4AF37]/10 px-4 py-1 rounded-bl-xl text-[10px] font-bold uppercase tracking-widest text-[#D4AF37]">
                {service.category || "Professional Service"}
              </div>
              
              <motion.div 
                whileHover={{ rotate: 360, scale: 1.1 }}
                transition={{ duration: 0.6 }}
                className="mb-6 w-16 h-16 bg-[#FDFCF0] rounded-2xl flex items-center justify-center shadow-sm text-[#D4AF37] group-hover:bg-[#D4AF37] group-hover:text-white transition-all duration-500 border border-[#E5E1C9]/50"
              >
                {iconMap[service.iconName] || <Briefcase size={32} />}
              </motion.div>

              <h3 className="text-lg font-serif mb-3 text-[#2D241E] font-bold uppercase tracking-widest leading-tight">
                {service.title}
              </h3>
              
              <p className="text-[#5C534E] text-sm mb-8 leading-relaxed max-w-xs group-hover:text-[#2D241E]">
                {service.description}
              </p>
              
              {service.items && service.items.length > 0 && (
                <div className="w-full space-y-3 pt-6 border-t border-[#E5E1C9]">
                  {service.items.map((item, idx) => (
                    <motion.div 
                      key={idx} 
                      whileHover={{ x: 5, color: "#D4AF37" }}
                      className="flex items-center justify-center gap-3 text-[#2D241E] text-[12px] font-medium transition-colors"
                    >
                      <CheckCircle2 size={12} className="text-[#D4AF37]" />
                      <span>{item}</span>
                    </motion.div>
                  ))}
                </div>
              )}
            </motion.div>
          ))}
        </motion.div>
      </section>

      <section className="py-24 bg-[#FAF9E6] px-8 lg:px-24 border-y border-[#E5E1C9]">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16">
          <motion.div 
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="flex-1"
          >
            <h2 className="text-2xl md:text-3xl font-serif text-[#2D241E] mb-6 tracking-tight uppercase">
              Industrial <span className="text-[#D4AF37]">Infrastructure</span> & Large Scale Systems
            </h2>
            <p className="text-[#5C534E] text-sm md:text-base leading-relaxed mb-8">
              We specialize in the complex construction of RCC Over Head Tanks and Sewage Treatment Plants (STP). 
              Our engineering team ensures structural longevity and compliance with the highest environmental standards.
            </p>
            <div className="grid grid-cols-2 gap-6 pt-4 border-t border-[#E5E1C9]">
              <div className="cursor-default">
                <p className="text-[#D4AF37] font-bold text-xl mb-1 uppercase tracking-tighter">Gold Standard</p>
                <p className="text-[#8B837E] text-[12px] uppercase font-bold tracking-widest">Quality Assurance</p>
              </div>
              <div className="cursor-default">
                <p className="text-[#2D241E] font-bold text-xl mb-1 uppercase tracking-tighter">Turnkey</p>
                <p className="text-[#8B837E] text-[12px] uppercase font-bold tracking-widest">End-to-End Delivery</p>
              </div>
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, x: 60 }}
            whileInView={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="flex-1 w-full"
          >
            <div className="rounded-3xl overflow-hidden shadow-2xl relative h-80 md:h-[450px] group border border-[#E5E1C9]">
              <img 
                src="/Construction of Rcc Over Head Tanks.jpeg" 
                className="w-full h-full object-cover transition-all duration-1000 group-hover:scale-110"
                alt="Industrial Site"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-24 px-8 lg:px-24 text-center bg-[#FDFCF0]">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl mx-auto"
        >
          <h2 className="text-3xl md:text-4xl font-serif mb-8 leading-tight tracking-tight text-[#2D241E] uppercase">
            Consult with our expert architects and structural engineers today.
          </h2>
          <p className="text-[#5C534E] mb-10 text-base md:text-lg leading-relaxed italic">
            "Foundation of Trust, Blueprint of Excellence"
          </p>
          <motion.a 
            href="/contact" 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-block bg-[#2D241E] text-white px-10 py-4 rounded-full font-bold hover:bg-[#D4AF37] transition-all shadow-xl uppercase text-xs tracking-widest"
          >
            Request A Consultation
          </motion.a>
        </motion.div>
      </section>
    </main>
  );
}