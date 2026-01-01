"use client";
import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Target, Eye, Award, CheckCircle2 } from 'lucide-react';

export default function About() {
  const { scrollYProgress } = useScroll();
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 1.1]);

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-100px" },
    transition: { duration: 0.6, ease: "easeOut" }
  };

  const staggerContainer = {
    initial: {},
    whileInView: { transition: { staggerChildren: 0.2 } }
  };  

  return (
    <main className="bg-white overflow-hidden font-sans selection:bg-orange-100 selection:text-orange-900">
      
      <section className="relative h-[60vh] min-h-[400px] flex items-center justify-center overflow-hidden bg-[#1C1612]">
        <motion.div style={{ scale }} className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-black/60 z-10" />
          <img 
            src="https://images.unsplash.com/photo-1497366754035-f200968a6e72?q=80&w=2069" 
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
            <h1 className="text-3xl md:text-5xl font-serif text-white mb-6 leading-tight tracking-tight uppercase">
              Architecting <span className="text-orange-500">Dreams</span>, <br /> 
              Constructing Realities.
            </h1>
            <p className="text-xs md:text-sm text-gray-300 leading-relaxed max-w-lg mx-auto uppercase tracking-widest">
              A premium construction and interior design firm based in Lucknow.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-24 px-8 lg:px-24 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <motion.div {...fadeInUp} className="max-w-xl">
            <h2 className="text-2xl md:text-3xl font-serif mb-8 text-[#2D241E] leading-snug tracking-tight">
              An Approach Built on <br /> Excellence & Precision.
            </h2>
            <div className="space-y-6 text-gray-600 leading-relaxed text-[13px] md:text-[15px]">
              <p>
                From initial concept to final completion, we merge creative vision with rigorous engineering expertise to deliver environments that reflect style and purpose.
              </p>
              <p>
                Our multidisciplinary team of architects, designers, and engineers work in harmony to ensure every project meets our gold standard of structural integrity.
              </p>
              <motion.div 
                variants={staggerContainer}
                initial="initial"
                whileInView="whileInView"
                viewport={{ once: true }}
                className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-8 pt-6"
              >
                {["Precision Quality", "Expert Engineering", "Timely Execution", "Transparent Process"].map((item, i) => (
                  <motion.div 
                    key={i} 
                    variants={fadeInUp}
                    whileHover={{ x: 5 }}
                    className="flex items-center gap-3"
                  >
                    <div className="w-5 h-5 rounded-full bg-orange-50 flex items-center justify-center">
                      <CheckCircle2 className="text-orange-500" size={14} />
                    </div>
                    <span className="font-semibold text-[#2D241E] text-[10px] md:text-xs uppercase tracking-wider">{item}</span>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative flex gap-4"
          >
            <motion.div 
              whileHover={{ y: -10 }}
              className="w-3/5 overflow-hidden rounded-2xl shadow-2xl"
            >
              <img 
                src="interior 2.png" 
                alt="Engineering" 
                className="h-80 w-full object-cover grayscale hover:grayscale-0 transition-all duration-700" 
              />
            </motion.div>
            <motion.div 
              whileHover={{ y: 10 }}
              className="w-2/5 mt-12 overflow-hidden rounded-2xl shadow-2xl"
            >
              <img 
                src="interior.png " 
                alt="Interior" 
                className="h-80 w-full object-cover grayscale hover:grayscale-0 transition-all duration-700" 
              />
            </motion.div>
          </motion.div>
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
            { 
              icon: <Target size={36} />, 
              title: "Our Mission", 
              desc: "To transform visions into landmark realities through professional management and engineering excellence." 
            },
            { 
              icon: <Eye size={36} />, 
              title: "Our Vision", 
              desc: "To be most trusted partner, setting new benchmarks in sustainable and innovative building." 
            },
            { 
              icon: <Award size={36} />, 
              title: "Commitment", 
              desc: "A focus on absolute transparency and ensuring every project reflects our signature quality." 
            }
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
            Ready to build the future with us?
          </h2>
          <p className="text-gray-600 mb-10 text-base md:text-lg leading-relaxed">
            Whether it's a structural project or a turnkey interior solution, let’s transform your ideas into an enduring reality.
          </p>
          <motion.a 
            href="/contact" 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-block bg-[#1C1612] text-white px-10 py-4 rounded-full font-bold hover:bg-orange-600 transition-all shadow-xl hover:shadow-orange-900/20 uppercase text-xs tracking-widest"
          >
            Start A Project
          </motion.a>
        </motion.div>
      </section>
    </main>
  );
}