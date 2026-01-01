"use client";
import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Link from 'next/link';
import { 
  HardHat, 
  Home, 
  Droplets, 
  MapPin, 
  PencilRuler, 
  Building, 
  Construction, 
  Waves,
  Layout,
  Monitor,
  Briefcase,
  PanelTop
} from 'lucide-react';

export default function Projects() {
  const { scrollYProgress } = useScroll();
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 1.1]);
  const opacityHeader = useTransform(scrollYProgress, [0, 0.3], [1, 0]);

  // To add a new project later, just add a new object {} to this list
  const projectList = [
    {
      title: "Construction of Roads",
      category: "Infrastructure",
      location: "Robertsganj, Uttar Pradesh",
      image: "/Construction of Roads.jpeg",
      icon: <Construction size={20} />,
      description: "Professional road construction designed to handle heavy traffic and long-term use."
    },
    {
      title: "Waterproofing of Roof",
      category: "Roof Protection",
      location: "Commercial Sites",
      image: "/Waterproofing of Roof.jpeg",
      icon: <HardHat size={20} />,
      description: "Applying advanced protective layers on roofs to prevent water seepage and damage."
    },
    {
      title: "Modular Workstation",
      category: "Corporate Interiors",
      location: "MNC Offices",
      image: "/modular-workstation.jpg",
      icon: <Briefcase size={20} />,
      description: "Smart, ergonomic modular desk systems designed for maximum productivity and space optimization."
    },
    {
      title: "Waterproofing of swimming pools",
      category: "Waterproofing",
      location: "K.D. Singh Babu Stadium",
      image: "/Waterproofing of swimming pools.jpeg",
      icon: <Droplets size={20} />,
      description: "Special chemical coating inside the pool walls to stop water leakage and keep the structure strong."
    },
    {
      title: "Construction and interior of Buildings",
      category: "Full Project",
      location: "Lucknow",
      image: "/interior.png",
      icon: <Home size={20} />,
      description: "Taking care of everything from the initial brickwork to the final beautiful interior finishes."
    },  
    {
      title: "Construction of Sewage treatment Plants",
      category: "Engineering",
      location: "Indira Nagar, Lucknow",
      image: "/Construction of Sewage treatment Plants.jpeg",
      icon: <Waves size={20} />,
      description: "Advanced systems built to clean and treat waste water safely for the environment."
    },
    {
      title: "Construction of Rcc Over Head Tanks",
      category: "Infrastructure",
      location: "Tanda",
      image: "/Construction of Rcc Over Head Tanks.jpeg",
      icon: <Droplets size={20} />,
      description: "A very strong and high cement water tank built to supply water to the entire local area."
    },
    {
      title: "Architectural and Structural Drawings",
      category: "Technical Planning",
      location: "Regional Sites",
      image: "/Architectural and Structural Drawings for Construction Projects.jpeg",
      icon: <PencilRuler size={20} />,
      description: "Providing the exact technical blueprints and maps needed for safe and precise construction."
    },
    {
      title: "Interior Architectural Drawings & Planning",
      category: "Design",
      location: "Lucknow",
      image: "/Interior Architectural Drawings & Planning.jpeg",
      icon: <Layout size={20} />,
      description: "Smart planning for office space to fit more desks and cabins comfortably in a small area."
    },
    {
      title: "Aluminium structural glazing and Aluminium works",
      category: "External Finishing",
      location: "Project Sites",
      image: "/Acp glazing structures and almunium works.jpg",
      icon: <PanelTop size={20} />,
      description: "Installing modern glass fronts and aluminum structures for a sleek, corporate building look."
    },
    {
      title: "Interior Office Construction for a Multinational Company",
      category: "Office Work",
      location: "Gomti Nagar, Lucknow",
      image: "/Interior Office Construction for a Multinational Company.jpeg",
      icon: <Building size={20} />,
      description: "Designing and building high-end workspaces for international companies with modern furniture."
    },
    {
      title: "Custom 3D Frosted Acralic Round Business Led board",
      category: "Branding & Signage",
      location: "Lucknow",
      image: "/Digital Glow Sign Board.png",
      icon: <Monitor size={20} />,
      description: "Installation of premium illuminated digital signboards for high visibility branding."
    },
  ];

  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-50px" },
    transition: { duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98] }
  };

  const staggerContainer = {
    initial: { opacity: 0 },
    whileInView: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  return (
    <main className="bg-white overflow-hidden font-sans selection:bg-orange-100 selection:text-orange-900">
      <section className="relative h-[60vh] min-h-[400px] flex items-center justify-center overflow-hidden bg-[#1C1612]">
        <motion.div style={{ scale, opacity: opacityHeader }} className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-black/60 z-10" />
          <img 
            src="https://images.unsplash.com/photo-1678575326996-a1bf09b86158?q=80&w=2070" 
            className="w-full h-full object-cover grayscale transition-all duration-1000"
            alt="Engineering Background"
          />
        </motion.div>
        
        <div className="relative z-20 text-center px-6 max-w-4xl">
          <motion.div 
            initial={{ opacity: 0, y: 30, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <span className="text-orange-500 font-bold tracking-[0.4em] uppercase text-[10px] mb-6 block">Our Projects</span>
            <h1 className="text-4xl md:text-6xl font-serif text-white mb-6 leading-tight tracking-tight uppercase">
              The <span className="text-orange-500 ">Portfolio.</span>
            </h1>
            <p className="text-xs md:text-sm text-gray-300 leading-relaxed max-w-lg mx-auto uppercase tracking-widest">
              Showcasing engineering landmarks built with absolute structural precision.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-32 px-8 lg:px-24 max-w-[1400px] mx-auto">
        <motion.div 
          variants={staggerContainer}
          initial="initial"
          whileInView="whileInView"
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-x-12 gap-y-24"
        >
          {projectList.map((project, index) => (
            <motion.div 
              key={index} 
              variants={fadeInUp}
              className="group cursor-default w-full md:w-[calc(50%-24px)] lg:w-[calc(33.333%-32px)]"
            >
              <div className="relative overflow-hidden rounded-[2.5rem] aspect-[4/5] bg-[#FAFAFA] mb-8 shadow-2xl transition-all duration-500 group-hover:shadow-orange-900/10">
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-[2s] ease-out group-hover:scale-110 grayscale group-hover:grayscale-0"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1C1612] via-transparent to-transparent opacity-80 group-hover:opacity-40 transition-opacity duration-700" />
                
                <div className="absolute bottom-10 left-10 right-10 flex justify-between items-end transform translate-y-4 group-hover:translate-y-0 transition-all duration-700">
                  <motion.div 
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    className="bg-white/10 backdrop-blur-xl p-4 rounded-2xl border border-white/20 text-white shadow-xl"
                  >
                    {project.icon}
                  </motion.div>
                  <div className="flex items-center gap-2 text-white font-bold text-[9px] uppercase tracking-widest bg-orange-600 px-5 py-2.5 rounded-full shadow-lg">
                    <MapPin size={12} />
                    {project.location}
                  </div>
                </div>
              </div>

              <div className="px-4 text-center sm:text-left">
                <motion.span 
                  className="text-orange-500 text-[10px] font-bold uppercase tracking-[0.4em] block mb-4"
                >
                  {project.category}
                </motion.span>
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-2xl font-serif text-[#2D241E] group-hover:text-orange-600 transition-colors leading-tight uppercase tracking-tight">
                    {project.title}
                  </h3>
                </div>
                <p className="text-gray-600 text-[15px] leading-relaxed border-l-2 border-orange-500/20 pl-5 italic mx-auto sm:mx-0">
                  {project.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>
      
      <section className="py-32 px-8 bg-[#FAFAFA] border-t border-gray-100">
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="max-w-7xl mx-auto bg-[#1C1612] rounded-[4rem] p-12 md:p-10 flex flex-col lg:flex-row items-center gap-20 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-96 h-96 bg-orange-500/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2" />
          
          <div className="flex-1 relative z-10 text-center lg:text-left">
            <h2 className="text-3xl md:text-4xl font-serif mb-8 leading-tight tracking-tight text-white uppercase">
              Ready to build the future with us?
            </h2>
            <p className="text-gray-300 mb-10 text-base md:text-lg leading-relaxed font-light">
              Whether it's a road, a water tank, or a modern office, we bring your structural ideas to life.
            </p>
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Link href="/contact" className="inline-flex items-center gap-8 bg-orange-600 text-white px-12 py-5 rounded-full font-bold text-xs uppercase tracking-[0.3em] hover:bg-white hover:text-black transition-all shadow-2xl">
                Let's Build
              </Link>
            </motion.div>
          </div>

          <div className="flex-1 grid grid-cols-2 gap-6 w-full relative z-10 opacity-40 group hidden md:grid">
            <motion.div 
              animate={{ y: [0, -30, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="space-y-6"
            >
              <div className="bg-orange-500/20 h-20 rounded-[2.5rem] border border-orange-500/20 shadow-inner" />
              <div className="bg-white/15 h-44 rounded-[2.5rem] border border-white/10 shadow-inner" />
            </motion.div>
            <motion.div 
              animate={{ y: [0, 30, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="space-y-6 pt-16"
            >
              <div className="bg-white/15 h-44 rounded-[2.5rem] border border-white/10 shadow-inner" />
              <div className="bg-orange-500/20 h-20 rounded-[2.5rem] border border-orange-500/20 shadow-inner" />
            </motion.div>
          </div>
        </motion.div>
      </section>
    </main>
  );
}