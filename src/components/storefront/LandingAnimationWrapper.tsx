"use client";

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ProductCard } from '@/components/storefront/ProductCard';
import { CheckCircle2, ShieldCheck, Ruler, Truck } from 'lucide-react';

export function LandingAnimationWrapper({ featuredProducts }: { featuredProducts: any[] }) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } }
  };

  return (
    <div className="flex flex-col pb-0 overflow-hidden bg-cream">
      {/* Premium Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center">
        <div className="absolute inset-0 bg-charcoal/50 z-10" />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img 
          src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1600&q=80" 
          alt="Premium Interior Design" 
          className="absolute inset-0 w-full h-full object-cover scale-105 animate-[pulse_10s_ease-in-out_infinite]"
        />
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="relative z-20 text-center text-white px-4 max-w-4xl"
        >
          <span className="mb-4 inline-block tracking-[0.2em] uppercase text-sm font-medium text-copper border border-copper/50 px-4 py-1 rounded-full backdrop-blur-sm">
            Luxury Materials
          </span>
          <h1 className="font-playfair text-white text-5xl md:text-7xl lg:text-8xl font-bold mb-6 tracking-tight leading-tight drop-shadow-lg">
            Elevate Your <br className="hidden md:block"/> Living Space
          </h1>
          <p className="opacity-70 text-lg md:text-xl font-inter md:leading-relaxed mx-auto mb-10 font-light opacity-90 max-w-2xl drop-shadow-md">
            Discover our curated collection of premium PVC panels, elegant wall cladding, and modern false ceilings designed for the sophisticated interior.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/products">
              <Button size="lg" className="bg-copper hover:bg-copper-light text-white font-inter font-medium px-8 h-14 text-lg w-full sm:w-auto shadow-sm transition-all hover:shadow-lg rounded-full">
                Explore Collection
              </Button>
            </Link>
            <Link href="/contact">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-charcoal font-inter font-medium px-8 h-14 text-lg w-full sm:w-auto backdrop-blur-sm transition-all shadow-sm hover:shadow-lg rounded-full">
                Book Consultation
              </Button>
            </Link>
          </div>
        </motion.div>
        
        {/* Scroll indicator */}
        <motion.div 
          animate={{ y: [0, 10, 0] }} 
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-10 z-20 left-1/2 -translate-x-1/2 flex flex-col items-center opacity-70"
        >
          <span className="text-white text-xs tracking-[0.2em] uppercase mb-2 font-inter">Scroll</span>
          <div className="w-px h-12 bg-gradient-to-b from-white to-transparent" />
        </motion.div>
      </section>

      {/* Trust Badges */}
      <section className="border-b border-stone-300 bg-white shadow-sm relative z-30 -mt-2">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-12">
          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={containerVariants}
            className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center"
          >
            {[
               { icon: ShieldCheck, title: "10 Year Warranty" },
               { icon: Truck, title: "Nationwide Delivery" },
               { icon: Ruler, title: "Custom Sizing" },
               { icon: CheckCircle2, title: "Premium Quality" }
            ].map((feature, i) => (
              <motion.div key={i} variants={itemVariants} className="flex flex-col items-center justify-center space-y-3">
                <div className="w-12 h-12 bg-warm-50 rounded-full flex items-center justify-center text-copper shadow-sm">
                  <feature.icon className="w-6 h-6" />
                </div>
                <span className="font-inter font-medium text-sm md:text-base text-charcoal">{feature.title}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 py-20 md:py-28">
        <motion.div 
          initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, ease: 'easeOut' }}
          className="text-center mb-12"
        >
          <p className="text-sm font-inter uppercase tracking-[0.2em] text-copper mb-3">Our Bestsellers</p>
          <h2 className="font-playfair text-4xl font-semibold text-charcoal">Featured Materials</h2>
          <div className="w-16 h-0.5 bg-copper mx-auto mt-4 mb-6" />
          <p className="text-stone-500 font-inter text-lg max-w-2xl mx-auto mb-6">Handpicked premium panels and claddings favored by top interior designers.</p>
          <Link href="/products" className="inline-flex items-center text-copper font-inter font-medium hover:underline transition-transform hover:translate-x-1">
            View full collection <span className="ml-2">→</span>
          </Link>
        </motion.div>
        
        {featuredProducts.length > 0 ? (
          <motion.div 
            variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8"
          >
            {featuredProducts.map((p: any) => (
              <motion.div key={p._id} variants={itemVariants}>
                <ProductCard product={p} />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <div className="text-center py-20 text-stone-500 bg-white rounded-2xl border border-stone-300 border-dashed shadow-sm">
            No featured products yet. Add products from the admin dashboard or run the database seed endpoint.
          </div>
        )}
      </section>

      {/* Immersive Detail Section */}
      <section className="bg-charcoal text-white py-20 md:py-28 overflow-hidden relative">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-copper/10 to-transparent pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <motion.div 
              initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
              className="lg:w-1/2 space-y-8"
            >
              <span className="text-copper font-inter font-medium tracking-[0.2em] uppercase text-sm mb-2 block">Our Design Philosophy</span>
              <h2 className="text-white font-playfair text-4xl md:text-5xl xl:text-6xl leading-tight font-semibold">Crafting Environments That Inspire</h2>
              <p className="text-white/80 font-inter text-lg leading-relaxed max-w-xl">
                Interio isn't just about selling materials; it's about providing the foundational elements for your masterpiece. Our PVC panels and claddings offer unmatched durability combined with breathtaking aesthetics.
              </p>
              <ul className="space-y-4 pt-4">
                {['Termite & Moisture Resistant Profiles', 'Eco-Friendly Sourced Materials', 'Zero Maintenance Needed Design'].map((item, i) => (
                  <motion.li 
                    key={i} 
                    initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: 0.2 + (i * 0.1) }}
                    className="flex items-center space-x-4 text-white bg-white/5 p-4 rounded-lg backdrop-blur-sm border border-white/10"
                  >
                    <CheckCircle2 className="w-6 h-6 text-copper shrink-0" />
                    <span className="font-inter font-medium">{item}</span>
                  </motion.li>
                ))}
              </ul>
              <div className="pt-6">
                <Link href="/about">
                  <Button variant="outline" className="border-copper text-copper hover:bg-copper hover:text-white px-8 h-12 text-lg rounded-full shadow-[0_0_15px_rgba(184,115,51,0.2)] transition-all font-inter">
                    Discover Our Story
                  </Button>
                </Link>
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.96 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
              className="lg:w-1/2 relative w-full max-w-lg mx-auto"
            >
              <div className="aspect-[4/5] rounded-t-full rounded-bl-full overflow-hidden relative shadow-2xl border-4 border-white/10">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80" alt="Beautiful Interior" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/90 via-transparent to-transparent" />
              </div>
              
              <motion.div 
                initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: 0.4 }}
                className="absolute -bottom-10 -left-4 md:-left-12 bg-white p-6 rounded-2xl shadow-2xl max-w-xs text-charcoal hidden sm:block border-l-4 border-copper"
              >
                <p className="font-playfair text-lg font-medium mb-3 italic">"Transformed my living room entirely. The wood texture feels incredibly authentic and premium."</p>
                <div className="flex items-center space-x-3 mt-4 pt-4 border-t border-stone-300">
                  <div className="w-12 h-12 bg-warm-100 rounded-full overflow-hidden ring-2 ring-cream shadow-sm">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100" alt="Customer" className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <p className="font-inter font-semibold text-sm text-charcoal">Sarah Jenkins</p>
                    <p className="font-inter text-xs text-copper tracking-wide uppercase">Interior Designer</p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-copper py-20 md:py-28 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 md:px-8 text-center relative z-10">
          <h2 className="font-playfair font-semibold text-4xl md:text-5xl text-white mb-6">Ready to upgrade your space?</h2>
          <p className="text-white/90 font-inter text-xl max-w-2xl mx-auto mb-10 leading-relaxed">Reach out to our experts and get a customized quote for your requirement today.</p>
          <Link href="/contact">
            <Button size="lg" className="bg-white text-copper hover:bg-stone-50 font-inter font-medium rounded-full px-10 h-14 text-lg shadow-lg">
              Contact Us Now
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
