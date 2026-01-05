"use client";
import Link from 'next/link';
import React from 'react';
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
  Briefcase,
  Waves
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
  UtensilsCrossed: <UtensilsCrossed size={32} />,
  Waves: <Waves size={32} />,
  Briefcase: <Briefcase size={32} />
};

const STATIC_SERVICES = [
  {
    _id: "69592590eb5c84f4a475d0d7",
    category: "Planning & Design",
    title: "Architectural Design",
    iconName: "PencilRuler",
    description: "Comprehensive master planning and technical layouts for residential and commercial spaces.",
    items: ["2D/3D Concept Maps", "Regulatory Compliance", "Space Optimization"]
  },
  {
    _id: "69592590eb5c84f4a475d0d8",
    category: "Planning & Design",
    title: "Structural Design",
    iconName: "HardHat",
    description: "Advanced structural engineering blueprints ensuring maximum safety and integrity.",
    items: ["Load Analysis", "Reinforcement Details", "Safety Audits"]
  },
  {
    _id: "premium-office-interior",
    category: "Interior Excellence",
    title: "Premium Office Interior",
    iconName: "Briefcase",
    description: "Creating sophisticated, high-performance workspaces tailored for corporate identity and employee well-being.",
    items: ["Executive Cabins", "Lounge Area Design", "Modern Lighting Solutions"]
  },
  {
    _id: "69592590eb5c84f4a475d0d9",
    category: "Interior Excellence",
    title: "Interior Works",
    iconName: "Layout",
    description: "High-end interior execution for corporate offices and luxury residential properties.",
    items: ["Corporate Fit-outs", "Bespoke Furnishing", "Finishing Excellence"]
  },
  {
    _id: "69592590eb5c84f4a475d0db",
    category: "Interior Excellence",
    title: "Modular Workstations",
    iconName: "Component",
    description: "Ergonomic and efficient office furniture solutions optimized for modern workflows.",
    items: ["Modular Desking", "Acoustic Partitions", "Ergonomic Setup"]
  },
  {
    _id: "69592590eb5c84f4a475d0dc",
    category: "Civil Engineering",
    title: "RCC Construction",
    iconName: "Building",
    description: "Heavy-duty structural frames and reinforced concrete engineering for high-rise durability.",
    items: ["Structural Slabs", "High-Rise Frameworks", "Precision Casting"]
  },
  {
    _id: "69592590eb5c84f4a475d0dd",
    category: "Civil Engineering",
    title: "Road Construction",
    iconName: "Construction",
    description: "Industrial-grade roadway engineering designed for high load capacity and longevity.",
    items: ["Bituminous Roadwork", "Concrete Pavements", "Infrastructure Links"]
  },
  {
    _id: "69592590eb5c84f4a475d0de",
    category: "Specialized Systems",
    title: "Sewage Treatment Plants",
    iconName: "CheckCircle2",
    description: "Sustainable water management systems ensuring environmental compliance and hygiene.",
    items: ["STP/ETP Installation", "Technical Maintenance", "Eco-Friendly Systems"]
  },
  {
    _id: "69592590eb5c84f4a475d0df",
    category: "Specialized Systems",
    title: "Structural Glazing",
    iconName: "ShieldCheck",
    description: "Premium exterior glass facades and ACP cladding for modern architectural aesthetics.",
    items: ["Glass Facades", "ACP Panel Cladding", "Weather Proofing"]
  },
  {
    _id: "69592590eb5c84f4a475d0e0",
    category: "Technical & Protection",
    title: "Waterproofing Solutions",
    iconName: "Droplets",
    description: "Multi-layer chemical treatments to protect structures from water damage and seepage.",
    items: ["Roof Liquid Membranes", "Swimming Pool Lining", "Basement Protection"]
  }
];

export default function Services() {
  const { scrollYProgress } = useScroll();
  const scale = useTransform(scrollYProgress, [0, 0.3], [1, 1.1]);

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

  return (
    <main className="bg-[#FDFCF0] overflow-hidden font-sans selection:bg-orange-100 selection:text-orange-900">
      
      <section className="relative h-[60vh] min-h-[400px] flex items-center justify-center overflow-hidden bg-[#1C1612]">
        <motion.div style={{ scale }} className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-black/60 z-10" />
          <img 
            src="https://plus.unsplash.com/premium_photo-1681690860636-3d96ea7a593b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8YnVpbGRpbmclMjBjb25zdHJ1Y3Rpb258ZW58MHx8MHx8fDA%3D" 
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

        {/* Using flex flex-wrap justify-center to handle 1 or 2 items in a row properly */}
        <motion.div 
          variants={staggerContainer}
          initial="initial"
          whileInView="whileInView"
          className="flex flex-wrap justify-center gap-8"
        >
          {STATIC_SERVICES.map((service, index) => (
            <motion.div
              key={index}
              variants={fadeInUp}
              whileHover={{ y: -8 }}
              className="bg-white p-10 rounded-3xl border border-[#E5E1C9] group transition-all duration-500 hover:shadow-2xl hover:bg-[#FAF9E6] flex flex-col items-center text-center relative overflow-hidden w-full md:w-[calc(50%-16px)] lg:w-[calc(33.33%-22px)] min-w-[300px]"
            >
              <div className="absolute top-0 right-0 bg-[#D4AF37]/10 px-4 py-1 rounded-bl-xl text-[10px] font-bold uppercase tracking-widest text-[#D4AF37]">
                {service.category}
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
              <div>
                <p className="text-[#D4AF37] font-bold text-xl mb-1 uppercase tracking-tighter">Gold Standard</p>
                <p className="text-[#8B837E] text-[12px] uppercase font-bold tracking-widest">Quality Assurance</p>
              </div>
              <div>
                <p className="text-[#2D241E] font-bold text-xl mb-1 uppercase tracking-tighter">Turnkey</p>
                <p className="text-[#8B837E] text-[12px] uppercase font-bold tracking-widest">End-to-End Delivery</p>
              </div>
            </div>
          </motion.div>
          
          <div className="flex-1 w-full">
            <div className="rounded-3xl overflow-hidden shadow-2xl relative h-80 md:h-[450px] group border border-[#E5E1C9]">
              <img 
                src="/Construction of Rcc Over Head Tanks.jpeg" 
                className="w-full h-full object-cover transition-all duration-1000 group-hover:scale-110" 
                alt="Industrial Site"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 px-8 lg:px-24 text-center bg-[#FDFCF0]">
        <h2 className="text-3xl md:text-4xl font-serif mb-8 leading-tight tracking-tight text-[#2D241E] uppercase">
          Consult with our expert architects today.
        </h2>
        <p className="text-[#5C534E] mb-10 text-base md:text-lg leading-relaxed italic">
          "Foundation of Trust, Blueprint of Excellence"
        </p>
        <Link href="/contact" className="inline-block bg-[#2D241E] text-white px-10 py-4 rounded-full font-bold hover:bg-[#D4AF37] transition-all shadow-xl uppercase text-xs tracking-widest">
          Request A Consultation
        </Link>
      </section>
    </main>
  );
}