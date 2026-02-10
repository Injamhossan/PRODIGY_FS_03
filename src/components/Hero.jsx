"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Star } from "lucide-react";
import mainImage from "../assets/main_image.jpg";
import favIcon from "../assets/Main/ariston-fav.svg";

export default function Hero() {
  return (
    <section className="relative min-h-screen pt-28 pb-16 px-8 overflow-hidden bg-[#fafafa]">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        
        {/* Left Content */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative z-10"
        >
          <div className="inline-block px-4 py-1.5 mb-6 bg-[#171717] rounded-full">
            <span className="text-[10px] font-bold tracking-widest text-white uppercase">New Season 2026</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold leading-[1.2] text-[#2b2825] mb-4">
            Elevate Your <br />
            <span className="text-[#d2714e]">Living Space</span>
          </h1>
          
          <p className="text-base text-zinc-500 max-w-sm mb-8 leading-relaxed">
            Discover artisan-crafted pieces that blend timeless elegance with modern functionality.
          </p>
          
          <div className="flex flex-wrap gap-3 mb-10">
            <Link href="/products">
              <button className="px-6 py-3 bg-[#d2714e] text-white rounded-full font-medium flex items-center gap-2 hover:bg-[#b05a3b] transition-all transform hover:scale-105 active:scale-95 shadow-lg shadow-[#d2714e]/20 text-sm">
                Explore Collection
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </Link>
            <Link href="/our-story">
              <button className="px-6 py-3 bg-white text-[#2b2825] border border-zinc-200 rounded-full font-medium hover:bg-zinc-50 transition-all text-sm">
                Our Story
              </button>
            </Link>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="flex gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-[#d2714e] text-[#d2714e]" />
              ))}
            </div>
            <div className="flex items-center gap-2 text-sm font-medium">
              <span className="text-[#2b2825]">4.9/5</span>
              <span className="text-zinc-400">|</span>
              <span className="text-zinc-500">2,400+ Reviews</span>
            </div>
          </div>
        </motion.div>

        {/* Right Content - Visuals */}
        <div className="relative">
          {/* Main Large Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="relative rounded-[40px] overflow-hidden shadow-2xl z-0"
          >
            <Image
              src={mainImage}
              alt="Artisan Sofa"
              width={800}
              height={1000}
              className="object-cover h-[450px] md:h-[500px] w-full"
              priority
            />
          </motion.div>

          {/* Floating Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="absolute -top-6 -left-6 bg-[#171717] p-4 rounded-xl shadow-xl z-20 hidden md:block"
          >
            <div className="text-xl font-bold text-white mb-0.5">500+</div>
            <div className="text-[9px] text-zinc-400 uppercase tracking-widest font-semibold">Artisan Products</div>
          </motion.div>

          {/* Floating Product Card */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.7, duration: 0.8 }}
            className="absolute -bottom-8 -left-10 bg-white p-3 rounded-xl shadow-2xl flex items-center gap-3 z-20 border border-zinc-100 hidden lg:flex"
          >
            <div className="w-12 h-12 bg-zinc-100 rounded-lg overflow-hidden">
               <div className="w-full h-full bg-[#d2714e]/10 flex items-center justify-center">
                  <Image src={favIcon} width={24} height={24} alt="icon" className="opacity-20" />
               </div>
            </div>
            <div>
              <div className="text-[10px] text-zinc-400 uppercase tracking-widest font-bold mb-1">Best Seller</div>
              <div className="text-sm font-bold text-[#2b2825]">Minimalist Oak Chair</div>
              <div className="text-sm font-bold text-[#d2714e]">$349</div>
            </div>
          </motion.div>

          {/* Floating Small Decor Clip */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.8 }}
            className="absolute -bottom-12 right-6 w-24 h-32 bg-white p-1.5 rounded-xl shadow-2xl z-20 transform rotate-6 border border-zinc-100 hidden md:block"
          >
            <div className="w-full h-full bg-zinc-50 rounded-lg overflow-hidden relative">
                <div className="absolute inset-0 flex items-center justify-center text-[9px] text-zinc-300 font-medium">Coming Soon</div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Background Decorative Element */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] border-[1px] border-zinc-200/50 rounded-full -z-10 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] border-[1px] border-zinc-200/30 rounded-full -z-10 pointer-events-none" />
    </section>
  );
}
