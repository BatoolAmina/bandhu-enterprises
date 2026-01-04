"use client";
import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { Target, Eye, Award, CheckCircle2, Quote } from 'lucide-react';

function Counter({ value, duration = 2 }) {
  const [count, setCount] = React.useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  React.useEffect(() => {
    if (isInView) {
      let start = 0;
      const end = parseInt(value) || 0;
      let totalFrames = 60;
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

export default function About() {
  const { scrollYProgress } = useScroll();
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 1.1]);

  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-100px" },
    transition: { duration: 0.8, ease: "easeOut" }
  };

  const staggerContainer = {
    initial: {},
    whileInView: { transition: { staggerChildren: 0.2 } }
  };  

  return (
    <main className="bg-[#FDFCF0] overflow-hidden font-sans selection:bg-orange-100 selection:text-orange-900">
      
      <section className="relative h-[60vh] min-h-[400px] flex items-center justify-center overflow-hidden bg-[#1C1612]">
        <motion.div style={{ scale }} className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-black/60 z-10" />
          <img 
            src="https://images.unsplash.com/photo-1497366754035-f200968a6e72?q=80&w=2069" 
            className="w-full h-full object-cover"
            alt="Engineering Background"
          />
        </motion.div>
        
        <div className="relative z-20 text-center px-6 max-w-4xl">
          <motion.div 
            initial={{ opacity: 0, y: 30, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <span className="text-[#D4AF37] font-bold tracking-[0.4em] uppercase text-[10px] mb-6 block">Our Story</span>
            <h1 className="text-3xl md:text-5xl font-serif text-white mb-6 leading-tight tracking-tight uppercase">
              Architecting <span className="text-[#D4AF37]">Dreams</span>, <br /> 
              Constructing Realities.
            </h1>
            <p className="text-xs md:text-sm text-gray-300 leading-relaxed max-w-lg mx-auto uppercase tracking-widest">
              Lucknow's premier choice for structural precision and luxury interiors.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-24 px-8 lg:px-24 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <motion.div {...fadeInUp} className="max-w-xl">
            <h2 className="text-2xl md:text-3xl font-serif mb-8 text-[#2D241E] leading-snug tracking-tight uppercase">
              An Approach Built on <br /> <span className="text-[#D4AF37]">Excellence & Precision.</span>
            </h2>
            <div className="space-y-6 text-[#5C534E] leading-relaxed text-[13px] md:text-[15px]">
              <p>
                From initial concept to final completion, we merge creative vision with rigorous engineering expertise to deliver environments that reflect style and purpose.
              </p>
              <motion.div 
                variants={staggerContainer}
                initial="initial"
                whileInView="whileInView"
                viewport={{ once: true }}
                className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-8 pt-6"
              >
                {["Precision Quality", "Expert Engineering", "Timely Execution", "Transparent Process"].map((item, i) => (
                  <motion.div key={i} variants={fadeInUp} whileHover={{ x: 5 }} className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full bg-[#D4AF37]/10 flex items-center justify-center">
                      <CheckCircle2 className="text-[#D4AF37]" size={14} />
                    </div>
                    <span className="font-semibold text-[#2D241E] text-[10px] md:text-xs uppercase tracking-wider">{item}</span>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </motion.div>

          <div className="relative flex gap-4">
            <motion.div whileHover={{ y: -10 }} className="w-3/5 overflow-hidden rounded-2xl shadow-2xl border border-[#E5E1C9]">
              <img src="/interior 2.png" alt="Engineering" className="h-80 w-full object-cover" />
            </motion.div>
            <motion.div whileHover={{ y: 10 }} className="w-2/5 mt-12 overflow-hidden rounded-2xl shadow-2xl border border-[#E5E1C9]">
              <img src="/interior.png" alt="Interior" className="h-80 w-full object-cover" />
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-24 px-8 lg:px-24 bg-[#FDFCF0]">
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-7xl mx-auto bg-white rounded-[3rem] border border-[#E5E1C9] overflow-hidden shadow-2xl"
        >
          <div className="flex flex-col lg:flex-row items-stretch">
            <div className="lg:w-2/5 relative min-h-[400px]">
              <img 
                src="/head-photo.jpg" 
                alt="Syed Mohd Mehndi"
                className="absolute inset-0 w-full h-full object-cover"
                onError={(e) => { e.currentTarget.src = "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1974"; }}
              />
            </div>

            <div className="lg:w-3/5 p-10 md:p-16 flex flex-col justify-center relative">
              <Quote className="absolute top-10 right-10 text-[#D4AF37]/20 w-20 h-20" />
              <motion.span variants={fadeInUp} className="text-[#D4AF37] font-bold tracking-[0.3em] uppercase text-[10px] mb-4 block">Meet Our Leader</motion.span>
              <h2 className="text-3xl md:text-4xl font-serif text-[#2D241E] mb-2 uppercase tracking-tight">Syed Mohd Mehndi</h2>
              <p className="text-[#D4AF37] font-bold text-sm tracking-widest uppercase mb-8">Founder & Managing Director</p>
              
              <div className="space-y-6 text-[#5C534E] leading-relaxed italic text-base md:text-lg border-l-4 border-[#D4AF37] pl-8">
                <p>
                  "Our journey at Bandhu Enterprises began with a vision to redefine Lucknow's landscape through structural precision and premium design. We don't just build structures; we build trust."
                </p>
              </div>

              <div className="mt-10 flex gap-10">
                <div className="group">
                  <p className="text-[#2D241E] font-bold text-2xl md:text-4xl group-hover:text-[#D4AF37] transition-colors">
                    <Counter value="15" />+
                  </p>
                  <p className="text-[#8B837E] text-[10px] md:text-xs uppercase tracking-widest font-bold">Years Exp.</p>
                </div>
                <div className="group">
                  <p className="text-[#2D241E] font-bold text-2xl md:text-4xl group-hover:text-[#D4AF37] transition-colors">
                    <Counter value="300" />+
                  </p>
                  <p className="text-[#8B837E] text-[10px] md:text-xs uppercase tracking-widest font-bold">Projects Led</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      <section className="py-24 bg-[#FAF9E6] px-6 lg:px-24 border-y border-[#E5E1C9]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h3 className="text-2xl md:text-3xl font-serif text-[#2D241E] uppercase tracking-tight">The Bandhu Standard</h3>
            <div className="h-1 bg-[#D4AF37] w-16 mx-auto mt-4" />
          </div>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8">
            {[
              { icon: <Target size={36} />, title: "Our Mission", desc: "To transform visions into landmark realities through professional management and engineering excellence." },
              { icon: <Eye size={36} />, title: "Our Vision", desc: "To be the most trusted partner, setting new benchmarks in sustainable and innovative building." },
              { icon: <Award size={36} />, title: "Commitment", desc: "A focus on absolute transparency and ensuring every project reflects our signature quality." }
            ].map((item, index) => (
              <motion.div 
                key={index}
                variants={fadeInUp}
                whileHover={{ y: -10 }}
                className="bg-white p-12 rounded-3xl border border-[#E5E1C9] hover:border-[#D4AF37]/50 group text-center flex flex-col items-center shadow-sm"
              >
                <div className="mb-8 w-20 h-20 bg-[#FDFCF0] rounded-[2rem] flex items-center justify-center transition-all duration-700 group-hover:bg-[#D4AF37] group-hover:rotate-[360deg]">
                  <div className="text-[#D4AF37] group-hover:text-white">{item.icon}</div>
                </div>
                <h4 className="text-lg font-serif mb-4 text-[#2D241E] font-bold uppercase tracking-[0.2em] group-hover:text-[#D4AF37] transition-colors">{item.title}</h4>
                <p className="text-[#5C534E] text-[13px] leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 px-8 lg:px-24 text-center bg-[#FDFCF0]">
        <h2 className="text-3xl md:text-4xl font-serif mb-8 leading-tight tracking-tight text-[#2D241E] uppercase">
          Ready to build the future with us?
        </h2>
        <p className="text-[#5C534E] mb-10 text-base md:text-lg leading-relaxed italic">
          "Foundation of Trust, Blueprint of Excellence"
        </p>
        <a href="/contact" className="inline-block bg-[#2D241E] text-white px-12 py-5 rounded-full font-bold hover:bg-[#D4AF37] transition-all shadow-xl uppercase text-[10px] tracking-[0.3em]">
          Start A Project
        </a>
      </section>
    </main>
  );
}