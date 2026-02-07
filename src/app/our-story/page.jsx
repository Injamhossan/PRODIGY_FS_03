"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import Image from "next/image";

export default function OurStory() {
  return (
    <div className="min-h-screen bg-[#fafafa]">
      <Navbar />
      <main className="pt-32 pb-24">
        <div className="max-w-7xl mx-auto px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center"
          >
            <div>
              <span className="text-[10px] font-bold text-[#d2714e] tracking-[0.2em] uppercase mb-4 block">
                Since 2012
              </span>
              <h1 className="text-4xl md:text-6xl font-bold text-[#2b2825] mb-8 leading-tight">
                Our Story of <br />
                <span className="text-[#d2714e]">Artisanship</span>
              </h1>
              <p className="text-lg text-zinc-500 mb-6 leading-relaxed">
                Artisan was born out of a desire to bring soul back into contemporary living spaces. We believe that the objects we surround ourselves with should tell a story.
              </p>
              <p className="text-zinc-500 mb-8 leading-relaxed">
                Every piece in our collection is handcrafted by skilled artisans who use traditional techniques passed down through generations. We combine these age-old methods with modern design sensibilities to create furniture that is both timeless and functional.
              </p>
              <div className="grid grid-cols-2 gap-8 py-8 border-t border-zinc-100">
                <div>
                  <div className="text-3xl font-bold text-[#2b2825] mb-2">50+</div>
                  <div className="text-xs text-zinc-400 uppercase tracking-widest font-bold">Expert Artisans</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-[#2b2825] mb-2">12</div>
                  <div className="text-xs text-zinc-400 uppercase tracking-widest font-bold">Years of Heritage</div>
                </div>
              </div>
            </div>
            
            <div className="relative aspect-[4/5] rounded-[40px] overflow-hidden shadow-2xl">
              <Image 
                src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=800"
                alt="Artisan at work"
                fill
                className="object-cover"
              />
            </div>
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
