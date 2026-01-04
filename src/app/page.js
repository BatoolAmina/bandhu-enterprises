"use client";
import React, { useState, useRef } from 'react';
import { motion, useScroll, useTransform, useInView, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, ShieldCheck, Zap, Users, ChevronDown, MapPin, Play, X } from 'lucide-react';
import Link from 'next/link';

function Counter({ value, duration = 2.5 }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  React.useEffect(() => {
    if (isInView) {
      let start = 0;
      const end = parseInt(value);
      if (start === end || isNaN(end)) return;
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
  const [selectedVideo, setSelectedVideo] = useState(null);
  
  const backgroundVideos = ["/Appasomy Associates.mp4"];
  const [currentVideoIdx, setCurrentVideoIdx] = useState(0);

  const handleVideoEnd = () => {
    setCurrentVideoIdx((prev) => (prev + 1) % backgroundVideos.length);
  };

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
      transition: { staggerChildren: 0.2, delayChildren: 0.1 }
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
    <main className="bg-[#FDFCF0] font-sans selection:bg-orange-100 selection:text-orange-900">
    
      <section className="relative h-[95vh] flex items-center justify-center overflow-hidden bg-[#1A1A1A]">
        <div className="absolute inset-0 z-0">
          <motion.div style={{ y: y1, scale }} className="absolute inset-0">
            <video 
              key={backgroundVideos[currentVideoIdx]}
              autoPlay 
              muted 
              playsInline 
              onEnded={handleVideoEnd}
              className="w-full h-full object-cover opacity-100"
            >
              <source src={backgroundVideos[currentVideoIdx]} type="video/mp4" />
            </video>
          </motion.div>
          <div className="absolute inset-0 bg-black/40 bg-gradient-to-b from-transparent to-[#1A1A1A]/90" />
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
            <p className="text-[#D4AF37] font-bold uppercase tracking-[0.4em] text-sm md:text-xl mb-8">
              Foundation of Trust, Blueprint of Excellence
            </p>
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 1 }}
            className="text-xl md:text-2xl text-gray-100 mb-10 max-w-2xl mx-auto leading-relaxed"
          >
            Leading in <span className="text-white font-semibold decoration-[#D4AF37]">Structural Precision</span> & <span className="text-white font-semibold decoration-[#D4AF37]">Premium Interiors.</span>
          </motion.h2 >
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex flex-row gap-4 justify-center"
          >
            <Link href="/projects" className="bg-[#D4AF37] text-white px-6 md:px-8 py-4 rounded-md font-bold hover:bg-[#B8962E] transition-all flex items-center justify-center gap-2 group shadow-lg">
              Our Portfolio <ArrowUpRight size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </Link>
            <Link href="/contact" className="bg-white/10 backdrop-blur-md text-white border border-white/20 px-6 md:px-8 py-4 rounded-md font-bold hover:bg-white hover:text-black transition-all">
              Request Quote
            </Link> 
          </motion.div>
        </div>
        <motion.div 
          animate={{ y: [0, 8, 0] }} 
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-[#D4AF37]"
        >
          <ChevronDown size={32} />
        </motion.div>
      </section>
      
      <section className="py-24 md:py-32 px-6 lg:px-24 bg-[#FDFCF0] overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 md:gap-24 items-center">
            <motion.div initial="initial" whileInView="whileInView" viewport={{ once: true }} className="order-2 lg:order-1">
              <motion.span variants={fadeInUp} className="text-[#D4AF37] font-bold tracking-widest text-xs uppercase mb-4 block">About the Company</motion.span>
              <motion.h3 variants={fadeInUp} className="text-2xl md:text-3xl font-serif mb-6 text-[#2D241E] leading-snug tracking-tight uppercase">
                Building Legacies for <br/> <span className="text-[#D4AF37]">Generations.</span>
              </motion.h3>
              <p className="text-lg text-[#5C534E] leading-relaxed mb-8">
                Headquartered in Lucknow, Bandhu Enterprises stands at the intersection of traditional integrity and futuristic engineering. From massive RCC infrastructure to bespoke corporate interiors.
              </p>
              
              <motion.div variants={staggerContainer} className="grid grid-cols-2 gap-10 border-t border-[#E5E1C9] pt-10">
                <motion.div variants={fadeInUp}>
                  <h4 className="font-bold text-3xl md:text-5xl text-[#2D241E]">
                    <Counter value="15" />+
                  </h4>
                  <p className="text-[#8B837E] text-[12px] uppercase tracking-[0.2em] font-bold mt-2">Years of Excellence</p>
                </motion.div>
                <motion.div variants={fadeInUp}>
                  <h4 className="font-bold text-3xl md:text-5xl text-[#2D241E]">
                    <Counter value="300" />+
                  </h4>
                  <p className="text-[#8B837E] text-[12px] uppercase tracking-[0.2em] font-bold mt-2">Successful Projects</p>
                </motion.div>
              </motion.div>
            </motion.div>

            <motion.div {...revealImage} className="relative order-1 lg:order-2">
              <div className="relative z-10 group overflow-hidden rounded-2xl shadow-2xl">
                <img src="https://images.pexels.com/photos/323705/pexels-photo-323705.jpeg" className="w-full aspect-[4/3] object-cover transition-all duration-1000 group-hover:scale-110" alt="Work" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-[#1C1612] px-6 lg:px-24">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div>
              <span className="text-[#D4AF37] font-bold tracking-widest text-xs uppercase mb-2 block">Cinematic View</span>
              <h3 className="text-3xl md:text-4xl font-serif text-white uppercase tracking-tight">Experience Our <br/><span className="text-[#D4AF37]">Excellence</span></h3>
            </div>
            <Link href="/projects" className="text-gray-400 hover:text-[#D4AF37] transition-colors font-bold text-[10px] uppercase tracking-widest flex items-center gap-2">
              View All Works <ArrowUpRight size={14}/>
            </Link>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            {[
              {
                id: 1,
                title: "Premium Gomti Nagar Residence",
                category: "Turnkey Interiors",
                url: "/Gomti Nagar Residential.mp4",
                location: "Gomti Nagar, Lucknow",
                description: "A luxury turnkey interior overhaul featuring architectural back-lit marble feature walls and custom geometric wooden paneling."
              },
              {
                id: 2,
                title: "Contemporary Dual-Tone Modular Kitchen",
                category: "Interior Solutions",
                url: "/Modular Kitchen.mp4",
                location: "Lucknow, Uttar Pradesh",
                description: "A high-end modular kitchen featuring gloss seafoam and obsidian cabinetry with integrated LED glass displays."
              }
            ].map((video) => (
              <motion.div 
                key={video.id}
                whileHover={{ y: -10 }}
                className="group relative cursor-pointer"
                onClick={() => setSelectedVideo(video)}
              >
                <div className="relative aspect-video rounded-[2rem] overflow-hidden shadow-2xl border border-white/10">
                  <video autoPlay loop muted playsInline className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-700">
                    <source src={video.url} type="video/mp4" />
                  </video>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent opacity-60 group-hover:opacity-40" />
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#D4AF37] p-5 rounded-full text-[#1C1612] shadow-2xl scale-90 group-hover:scale-100 transition-transform duration-500">
                    <Play size={24} fill="currentColor" />
                  </div>
                  <div className="absolute bottom-8 left-8">
                    <span className="text-[#D4AF37] text-[10px] font-bold uppercase mb-2 block tracking-widest">{video.category}</span>
                    <h4 className="text-xl font-serif text-white uppercase tracking-tight">{video.title}</h4>
                    <div className="flex items-center gap-2 text-gray-400 text-[10px] mt-2 font-bold uppercase">
                      <MapPin size={12} className="text-[#D4AF37]"/> {video.location}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <AnimatePresence>
        {selectedVideo && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[10000] bg-black/95 flex items-center justify-center p-4 md:p-12"
          >
            <button 
              onClick={() => setSelectedVideo(null)}
              className="absolute top-8 right-8 text-white/50 hover:text-white transition-colors"
            >
              <X size={40} />
            </button>
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              className="w-full max-w-6xl aspect-video rounded-3xl overflow-hidden bg-[#1C1612] shadow-2xl relative"
            >
              <video controls autoPlay className="w-full h-full object-contain">
                <source src={selectedVideo.url} type="video/mp4" />
              </video>
              <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black/80 to-transparent">
                  <h3 className="text-white font-serif text-2xl uppercase tracking-widest">{selectedVideo.title}</h3>
                  <p className="text-[#D4AF37] text-[10px] font-bold uppercase mt-2">{selectedVideo.category} • {selectedVideo.location}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <section className="py-24 bg-[#FAF9E6] px-6 lg:px-24">
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
              className="h-1 bg-[#D4AF37] mx-auto mt-4" 
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
                className="bg-white p-12 rounded-3xl shadow-sm hover:shadow-2xl transition-all duration-500 border border-[#E5E1C9] group flex flex-col items-center text-center"
              >
                <div className="mb-8 w-20 h-20 bg-[#FDFCF0] rounded-[2rem] flex items-center justify-center transition-all duration-700 group-hover:bg-[#D4AF37] group-hover:rotate-[360deg] group-hover:rounded-2xl shadow-inner">
                  <div className="text-[#D4AF37] transition-colors duration-500 group-hover:text-white">
                    {item.icon}
                  </div>
                </div>
                <h4 className="text-lg font-serif mb-4 text-[#2D241E] font-bold uppercase tracking-[0.2em] transition-colors duration-500 group-hover:text-[#D4AF37]">{item.title}</h4>
                <p className="text-[#5C534E] text-[13px] leading-relaxed group-hover:text-[#2D241E]">{item.desc}</p>
              </motion.div>
            ))}
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
            Ready to build your next <span className="text-[#D4AF37]">landmark?</span>
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
            Request a Consultation
          </motion.a>
        </motion.div>
      </section>

      <section className="py-24 px-6 lg:px-24 bg-[#FDFCF0] border-t border-[#E5E1C9]">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-8"
          >
            <div className="flex items-start gap-6">
              <div className="bg-[#D4AF37]/10 p-4 rounded-2xl text-[#D4AF37] shadow-sm">
                <MapPin size={32} />
              </div>
              <div>
                <span className="text-[#D4AF37] font-bold tracking-widest uppercase text-[10px]">Headquarters</span>
                <h3 className="text-2xl md:text-4xl font-serif mt-2 text-[#2D241E] uppercase tracking-tight">Daulatganj, Lucknow</h3>
                <p className="text-[#5C534E] text-sm mt-3 max-w-xs leading-relaxed">
                  456/786 Sajjad Bagh Colony, Daulatganj, Lucknow, Uttar Pradesh 226003
                </p>
              </div>
            </div>
            <motion.div whileHover={{ x: 10 }}>
              <Link 
                href="https://maps.google.com/?q=Bandhu+Enterprises+Lucknow" 
                target="_blank" 
                className="text-[#D4AF37] font-bold text-xs uppercase tracking-widest flex items-center gap-3 group"
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
            className="h-[500px] w-full rounded-[2.5rem] overflow-hidden shadow-2xl border border-[#E5E1C9] relative group"
          >
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3558.4632832967265!2d80.8931189!3d26.8887641!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3999557f9202720b%3A0xc48398df9813589c!2s456%2F786%2C%20Sajjad%20Bagh%20Colony%2C%20Daulatganj%2C%20Lucknow%2C%20Uttar%20Pradesh%20226003!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin" 
              className="w-full h-full transition-all duration-1000 ease-in-out"
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