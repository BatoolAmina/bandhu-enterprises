"use client";
import React, { useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle, ArrowUpRight } from 'lucide-react';
import Link from 'next/link';

export default function Contact() {
  const [status, setStatus] = useState("");
  const { scrollYProgress } = useScroll();
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 1.1]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const data = new FormData(form);
    
    const response = await fetch("https://formspree.io/f/xdaorgal", {
      method: "POST",
      body: data,
      headers: { 'Accept': 'application/json' }
    });

    if (response.ok) {
      setStatus("SUCCESS");
      form.reset();
    } else {
      setStatus("ERROR");
    }
  };

  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.8, ease: "easeOut" }
  };

  return (
    <main className="bg-white min-h-screen font-sans selection:bg-orange-100 selection:text-orange-900">
      <section className="relative h-[60vh] min-h-[400px] flex items-center justify-center overflow-hidden bg-[#1C1612]">
              <motion.div style={{ scale }} className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-black/60 z-10" />
                <img 
                  src="https://images.unsplash.com/photo-1423666639041-f56000c27a9a?q=80&w=2070" 
                  className="w-full h-full object-cover grayscale transition-all duration-1000"
                  alt="Contact Bandhu"
                />
              </motion.div>
              
              <div className="relative z-20 text-center px-6 max-w-4xl">
                <motion.div 
                  initial={{ opacity: 0, y: 30, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                >
                  <h1 className="text-3xl md:text-5xl font-serif text-white mb-6 leading-tight tracking-tight uppercase">
                    Start Your <span className="text-orange-500">Journey</span> <br /> 
                    With Us Today.
                  </h1>
                  <p className="text-xs md:text-sm text-gray-300 leading-relaxed max-w-lg mx-auto uppercase tracking-widest">
                    We are ready to bring your architectural blueprints to life.
                  </p>
                </motion.div>
              </div>
            </section>

      <section className="py-24 px-8 lg:px-24">
        <div className="grid lg:grid-cols-12 gap-16 max-w-7xl mx-auto">
          <motion.div 
            {...fadeInUp}
            className="lg:col-span-5 space-y-12"
          >
            <div>
              <h2 className="text-2xl md:text-3xl font-serif text-[#2D241E] mb-8 uppercase tracking-tight">Contact Information</h2>
              <div className="space-y-8">
                <div className="flex gap-6 group">
                  <div className="w-14 h-14 bg-[#FAFAFA] rounded-2xl flex items-center justify-center border border-gray-100 shadow-sm text-orange-600 transition-all duration-500 group-hover:bg-orange-600 group-hover:text-white group-hover:scale-110">
                    <MapPin size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm uppercase tracking-widest mb-1 text-[#2D241E]">Headquarters</h4>
                    <p className="text-gray-500 text-sm leading-relaxed">456/786 Sajjad Bagh Colony, <br/> Daulatganj, Lucknow-226003</p>
                  </div>
                </div>

                <div className="flex gap-6 group">
                  <div className="w-14 h-14 bg-[#FAFAFA] rounded-2xl flex items-center justify-center border border-gray-100 shadow-sm text-orange-600 transition-all duration-500 group-hover:bg-orange-600 group-hover:text-white group-hover:scale-110">
                    <Phone size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm uppercase tracking-widest mb-1 text-[#2D241E]">Call Us</h4>
                    <p className="text-gray-500 text-sm">+91 9807606566</p>
                    <p className="text-[10px] text-orange-500 font-bold uppercase tracking-tighter mt-1">Mon-Sat: 09:00 AM - 07:00 PM</p>
                  </div>
                </div>

                <div className="flex gap-6 group">
                  <div className="w-14 h-14 bg-[#FAFAFA] rounded-2xl flex items-center justify-center border border-gray-100 shadow-sm text-orange-600 transition-all duration-500 group-hover:bg-orange-600 group-hover:text-white group-hover:scale-110">
                    <Mail size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm uppercase tracking-widest mb-1 text-[#2D241E]">Email Us</h4>
                    <p className="text-gray-500 text-sm">bandhuenterprises.info@gmail.com</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-8 bg-[#FAFAFA] rounded-3xl border border-gray-100">
              <h4 className="font-bold text-xs uppercase tracking-[0.2em] text-[#2D241E] mb-3 flex items-center gap-2">
                <Clock className="text-orange-500" size={16} /> Professional Consultation
              </h4>
              <p className="text-gray-500 text-xs md:text-sm leading-relaxed">
                Our architects and engineers are available for on-site visits and structural consultations within Lucknow and surrounding areas.
              </p>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="lg:col-span-7"
          >
            <div className="bg-gray-50 p-8 md:p-12 rounded-[2.5rem] shadow-2xl shadow-gray-400 border border-gray-50">
              {status === "SUCCESS" ? (
                <div className="py-20 text-center space-y-6">
                  <div className="w-20 h-20 bg-orange-50 text-orange-600 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle size={40} />
                  </div>
                  <h3 className="text-2xl font-serif text-[#2D241E] uppercase tracking-tight">Message Received</h3>
                  <p className="text-gray-500 text-sm font-light">Our team will review your inquiry and contact you shortly.</p>
                  <button onClick={() => setStatus("")} className="text-orange-600 text-xs font-bold uppercase tracking-widest underline decoration-2 underline-offset-4">Send another message</button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-bold uppercase tracking-[0.2em] text-gray-700 ml-1">Full Name</label>
                      <input name="name" required type="text" className="w-full bg-[#FAFAFA] border border-gray-100 rounded-xl p-4 focus:bg-white focus:border-orange-500 transition-all outline-none text-sm" placeholder="John Doe" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold uppercase tracking-[0.2em] text-gray-700 ml-1">Email Address</label>
                      <input name="email" required type="email" className="w-full bg-[#FAFAFA] border border-gray-100 rounded-xl p-4 focus:bg-white focus:border-orange-500 transition-all outline-none text-sm" placeholder="name@email.com" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-bold uppercase tracking-[0.2em] text-gray-700 ml-1">Project Category</label>
                    <select name="category" className="w-full bg-[#FAFAFA] border border-gray-100 rounded-xl p-4 focus:bg-white focus:border-orange-500 transition-all outline-none appearance-none text-sm cursor-pointer">
                      <option>Architectural Drawing</option>
                      <option>Interior Office Construction</option>
                      <option>RCC Water Tank Construction</option>
                      <option>Sewage Treatment Plant</option>
                      <option>Waterproofing Solutions</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-bold uppercase tracking-[0.2em] text-gray-700 ml-1">Message</label>
                    <textarea name="message" required rows="4" className="w-full bg-[#FAFAFA] border border-gray-100 rounded-xl p-4 focus:bg-white focus:border-orange-500 transition-all outline-none resize-none text-sm" placeholder="Describe your project requirements..."></textarea>
                  </div>

                  <button type="submit" className="w-full bg-[#1C1612] text-white py-4 rounded-xl font-bold text-xs uppercase tracking-[0.3em] hover:bg-orange-600 transition-all shadow-xl shadow-gray-200 flex items-center justify-center gap-3 group active:scale-95">
                    Send Inquiry <Send size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </button>
                  
                  {status === "ERROR" && <p className="text-red-500 text-center text-[10px] font-bold uppercase">Submission failed. Please try again.</p>}
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-20 px-6 lg:px-24 bg-[#FAFAFA] border-t border-gray-100">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
            <div className="flex items-start gap-4">
              <div className="bg-orange-50 p-3 rounded-xl text-orange-500">
                <MapPin size={24} />
              </div>
              <div>
                <span className="text-orange-500 font-bold tracking-widest uppercase text-[10px]">Headquarters</span>
                <h3 className="text-2xl md:text-3xl font-serif mt-1 text-[#2D241E]">Daulatganj, Lucknow</h3>
                <p className="text-gray-500 text-sm mt-2 max-w-xs  leading-relaxed">
                  456/786 Sajjad Bagh Colony, Daulatganj, Lucknow, Uttar Pradesh 226003
                </p>
              </div>
            </div>
            <Link 
              href="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3558.4632832967265!2d80.8931189!3d26.8887641!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3999557f9202720b%3A0xc48398df9813589c!2s456%2F786%2C%20Sajjad%20Bagh%20Colony%2C%20Daulatganj%2C%20Lucknow%2C%20Uttar%20Pradesh%20226003!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin" 
              target="_blank" 
              className="text-orange-500 font-bold text-xs uppercase tracking-widest flex items-center gap-2 hover:underline transition-all"
            >
              Open in Google Maps <ArrowUpRight size={16} />
            </Link>
          </div>
          <div className="h-[450px] w-full rounded-2xl overflow-hidden shadow-sm border border-gray-100 relative group">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3558.4632832967265!2d80.8931189!3d26.8887641!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3999557f9202720b%3A0xc48398df9813589c!2s456%2F786%2C%20Sajjad%20Bagh%20Colony%2C%20Daulatganj%2C%20Lucknow%2C%20Uttar%20Pradesh%20226003!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin" 
              className="w-full h-full grayscale group-hover:grayscale-0 transition-all duration-700"
              style={{ border: 0 }} 
              loading="lazy" 
              allowFullScreen=""
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </section>
    </main>
  );
}