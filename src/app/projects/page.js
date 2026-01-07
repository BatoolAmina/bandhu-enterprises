"use client";
import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { 
  MapPin, Construction, Droplets, Waves, FlaskConical, 
  UtensilsCrossed, Briefcase, Home, Building, HardHat, 
  PencilRuler, Layout, PanelTop, Monitor
} from 'lucide-react';

const iconMap = {
  PencilRuler: <PencilRuler size={20} />,
  Layout: <Layout size={20} />,
  PanelTop: <PanelTop size={20} />,
  Monitor: <Monitor size={20} />,
  Droplets: <Droplets size={20} />,
  HardHat: <HardHat size={20} />,
  Building: <Building size={20} />,
  Home: <Home size={20} />,
  Briefcase: <Briefcase size={20} />,
  UtensilsCrossed: <UtensilsCrossed size={20} />,
  FlaskConical: <FlaskConical size={20} />,
  Waves: <Waves size={20} />,
  Construction: <Construction size={20} />
};

const STATIC_PROJECTS = [
  {
    _id: "695924fcd7fe9ca9cf8dc790",
    title: "Architectural and Structural Drawings",
    category: "Design & Planning",
    location: "Regional Sites",
    image: "/Architectural and Structural Drawings for Construction Projects.jpeg",
    iconName: "PencilRuler",
    description: "Providing the exact technical blueprints and maps needed for safe and precise construction."
  },
  {
    _id: "695924fcd7fe9ca9cf8dc791",
    title: "Interior Architectural Drawings",
    category: "Design & Planning",
    location: "Lucknow",
    image: "/Interior Architectural Drawings & Planning.jpeg",
    iconName: "Layout",
    description: "Smart planning for office space to fit more desks and cabins comfortably in a small area."
  },
  {
    _id: "695924fcd7fe9ca9cf8dc792",
    title: "Aluminium Structural Glazing",
    category: "Specialized Finishing",
    location: "Aliganj, Lucknow",
    image: "/Acp glazing structures and almunium works.jpg",
    iconName: "PanelTop",
    description: "Installing modern glass fronts and aluminum structures for a sleek, corporate building look."
  },
  {
    _id: "695924fcd7fe9ca9cf8dc793",
    title: "Custom 3D Led Glow Sign Board",
    category: "Branding & Signage",
    location: "Gomti Nagar, Lucknow",
    image: "/Digital Glow Sign Board.png",
    iconName: "Monitor",
    description: "Installation of premium illuminated digital signboards for high visibility branding."
  },
  {
    _id: "695924fcd7fe9ca9cf8dc78f",
    title: "Waterproofing of swimming pools",
    category: "Structural Protection",
    location: "K.D. Singh Babu Stadium",
    image: "/Waterproofing of swimming pools.jpeg",
    iconName: "Droplets",
    description: "Special chemical coating inside the pool walls to stop water leakage and keep the structure strong."
  },
  {
    _id: "695924fcd7fe9ca9cf8dc78e",
    title: "Waterproofing of Roof",
    category: "Structural Protection",
    location: "Hazratganj, Lucknow",
    image: "/Waterproofing of Roof.jpeg",
    iconName: "HardHat",
    description: "Applying advanced protective layers on roofs to prevent water seepage and damage."
  },
  {
    _id: "695924fcd7fe9ca9cf8dc78d",
    title: "Interior Office Construction",
    category: "Turnkey Projects",
    location: "Gomti Nagar, Lucknow",
    image: "/Interior Office Construction for a Multinational Company.jpeg",
    iconName: "Building",
    description: "Designing and building high-end workspaces for international companies with modern furniture."
  },
  {
    _id: "695924fcd7fe9ca9cf8dc78c",
    title: "Construction and interior of Buildings",
    category: "Turnkey Projects",
    location: "Aliganj, Lucknow",
    image: "/interior.png",
    iconName: "Home",
    description: "Taking care of everything from the initial brickwork to the final beautiful interior finishes."
  },
  {
    _id: "695924fcd7fe9ca9cf8dc78b",
    title: "Modular Workstation",
    category: "Interior Solutions",
    location: "Aliganj, Lucknow",
    image: "/modular-workstation.jpg",
    iconName: "Briefcase",
    description: "Smart, ergonomic modular desk systems designed for maximum productivity and space optimization."
  },
  {
    _id: "695924fcd7fe9ca9cf8dc78a",
    title: "Premium Modular Kitchen",
    category: "Interior Solutions",
    location: "Residential Sites",
    image: "/Modular kitchen.jpg",
    iconName: "UtensilsCrossed",
    description: "Customized high-end modular kitchens with optimized storage and modern aesthetics."
  },
  {
    _id: "695924fcd7fe9ca9cf8dc789",
    title: "Scientific Soil Testing",
    category: "Technical Services",
    location: "Various Sites",
    image: "/soil testing.jpg",
    iconName: "FlaskConical",
    description: "Comprehensive geological analysis to determine load-bearing capacity for structural safety."
  },
  {
    _id: "695924fcd7fe9ca9cf8dc788",
    title: "Construction of Sewage treatment Plants",
    category: "Environmental Engineering",
    location: "Indira Nagar, Lucknow",
    image: "/Construction of Sewage treatment Plants.jpeg",
    iconName: "Waves",
    description: "Advanced systems built to clean and treat waste water safely for the environment."
  },
  {
    _id: "695924fcd7fe9ca9cf8dc787",
    title: "Construction of Rcc Over Head Tanks",
    category: "Civil Infrastructure",
    location: "Tanda",
    image: "/Construction of Rcc Over Head Tanks.jpeg",
    iconName: "Droplets",
    description: "A very strong and high cement water tank built to supply water to the entire local area."
  },
  {
    _id: "695924fcd7fe9ca9cf8dc786",
    title: "Construction of Roads",
    category: "Civil Infrastructure",
    location: "Robertsganj, Uttar Pradesh",
    image: "/Construction of Roads.jpeg",
    iconName: "Construction",
    description: "Professional road construction designed to handle heavy traffic and long-term use."
  }
];

export default function Projects() {
  const [filteredProjects, setFilteredProjects] = useState(STATIC_PROJECTS);
  const [activeCategory, setActiveCategory] = useState("All");

  const categories = [
    "All", 
    "Civil Infrastructure", 
    "Turnkey Projects", 
    "Interior Solutions", 
    "Structural Protection", 
    "Design & Planning"
  ];

  const { scrollYProgress } = useScroll();
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 1.1]);
  const opacityHeader = useTransform(scrollYProgress, [0, 0.3], [1, 0]);

  useEffect(() => {
    if (activeCategory === "All") {
      setFilteredProjects(STATIC_PROJECTS);
    } else {
      setFilteredProjects(STATIC_PROJECTS.filter(p => p.category === activeCategory));
    }
  }, [activeCategory]);

  return (
    <main className="bg-[#FDFCF0] overflow-hidden font-sans selection:bg-orange-100 selection:text-orange-900">
      
      <section className="relative h-[60vh] min-h-[400px] flex items-center justify-center overflow-hidden bg-[#1C1612]">
        <motion.div style={{ scale, opacity: opacityHeader }} className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-black/60 z-10" />
          <img 
            src="https://images.unsplash.com/photo-1678575326996-a1bf09b86158?q=80&w=2070" 
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
            <span className="text-[#D4AF37] font-bold tracking-[0.4em] uppercase text-[10px] mb-6 block">Our Works</span>
            <h1 className="text-4xl md:text-6xl font-serif text-white mb-6 leading-tight tracking-tight uppercase">
              The <span className="text-[#D4AF37]">Portfolio.</span>
            </h1>
            <p className="text-xs md:text-sm text-gray-300 leading-relaxed max-w-lg mx-auto uppercase tracking-widest italic">
              "Visualizing Structural Mastery and Architectural Excellence"
            </p>
          </motion.div>
        </div>
      </section>

      <section className="pt-20 px-8">
        <div className="flex flex-wrap justify-center gap-3">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-6 py-2.5 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all border ${
                activeCategory === cat 
                ? 'bg-[#1C1612] text-[#D4AF37] border-[#1C1612] shadow-xl' 
                : 'bg-white text-gray-400 border-gray-100 hover:border-[#D4AF37]/30'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      <section className="py-20 px-8 lg:px-24 max-w-[1400px] mx-auto min-h-[600px]">
        <motion.div layout className="flex flex-wrap justify-center gap-x-12 gap-y-24">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <motion.div 
                key={project._id} 
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.5 }}
                className="group cursor-default w-full md:w-[calc(50%-24px)] lg:w-[calc(33.333%-32px)]"
              >
                <div className="relative overflow-hidden rounded-[2.5rem] aspect-[4/5] bg-[#1C1612] mb-8 shadow-2xl border border-[#E5E1C9]">
                  {project.image ? (
                    <>
                      <img 
                        src={project.image} 
                        alt={project.title}
                        className="w-full h-full object-cover transition-transform duration-[2s] ease-out group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#1C1612] via-transparent to-transparent opacity-60 group-hover:opacity-30 transition-opacity duration-700" />
                    </>
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gray-900">
                       <Building size={48} className="text-gray-700" />
                    </div>
                  )}
                  
                  <div className="absolute bottom-10 left-10 right-10 flex justify-between items-end transform translate-y-4 group-hover:translate-y-0 transition-all duration-700">
                    <div className="bg-white/10 backdrop-blur-xl p-4 rounded-2xl border border-white/20 text-white shadow-xl">
                      {iconMap[project.iconName] || <Building size={20} />}
                    </div>
                    <div className="flex items-center gap-2 text-white font-bold text-[9px] uppercase tracking-widest bg-[#D4AF37] px-5 py-2.5 rounded-full shadow-lg">
                      <MapPin size={12} />
                      {project.location}
                    </div>
                  </div>
                </div>

                <div className="px-4 text-center sm:text-left">
                  <span className="text-[#D4AF37] text-[10px] font-bold uppercase tracking-[0.4em] block mb-4">
                    {project.category}
                  </span>
                  <h3 className="text-2xl font-serif text-[#2D241E] group-hover:text-[#D4AF37] transition-colors leading-tight uppercase tracking-tight mb-4">
                    {project.title}
                  </h3>
                  <p className="text-[#5C534E] text-[14px] leading-relaxed border-l-2 border-[#D4AF37]/30 pl-5 italic">
                    {project.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </section>

      <section className="py-32 px-8 bg-[#FAF9E6] border-t border-[#E5E1C9]">
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="max-w-7xl mx-auto bg-[#1C1612] rounded-[4rem] p-12 md:p-20 flex flex-col lg:flex-row items-center gap-20 relative overflow-hidden"
        >
          <div className="flex-1 relative z-10 text-center lg:text-left">
            <h2 className="text-3xl md:text-4xl font-serif mb-8 leading-tight tracking-tight text-white uppercase">
              Ready to build the <span className="text-[#D4AF37]">future</span> with us?
            </h2>
            <p className="text-gray-400 mb-10 text-lg leading-relaxed font-light italic">
              "Foundation of Trust, Blueprint of Excellence"
            </p>
            <Link href="/contact" className="inline-flex items-center bg-[#D4AF37] text-white px-12 py-5 rounded-full font-bold text-xs uppercase tracking-[0.3em] hover:bg-white hover:text-black transition-all shadow-2xl">
              Let's Build
            </Link>
          </div>
          <div className="flex-1 grid grid-cols-2 gap-6 w-full relative z-10 opacity-20 hidden md:grid">
            <div className="space-y-6">
              <div className="bg-[#D4AF37]/20 h-24 rounded-[2.5rem] border border-[#D4AF37]/20" />
              <div className="bg-white/15 h-44 rounded-[2.5rem] border border-white/10" />
            </div>
            <div className="space-y-6 pt-16">
              <div className="bg-white/15 h-44 rounded-[2.5rem] border border-white/10" />
              <div className="bg-[#D4AF37]/20 h-24 rounded-[2.5rem] border border-[#D4AF37]/20" />
            </div>
          </div>
        </motion.div>
      </section>
    </main>
  );
}