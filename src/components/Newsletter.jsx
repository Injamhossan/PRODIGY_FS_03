"use client";

import { motion } from "framer-motion";
import { ArrowRight, Send } from "lucide-react";

export default function Newsletter() {
  return (
    <section className="py-24 px-8">
      <div className="max-w-7xl mx-auto">
        <div className="relative rounded-[40px] bg-[#d2714e] overflow-hidden p-12 md:p-20">
          {/* Decorative background circle */}
          <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-white/5 rounded-full translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-black/5 rounded-full -translate-x-1/2 translate-y-1/2" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <motion.span 
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                className="text-white/80 text-[10px] font-bold tracking-[0.2em] uppercase mb-4 block"
              >
                Join the Club
              </motion.span>
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-3xl md:text-5xl font-bold text-white leading-tight"
              >
                Subscribe to our <br />
                Newsletter
              </motion.h2>
            </div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <p className="text-white/80 text-lg mb-8 max-w-md">
                Get the latest news on products, offers and events. Join our community today.
              </p>
              <form className="relative max-w-md" onSubmit={(e) => e.preventDefault()}>
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full bg-white/10 border border-white/20 rounded-2xl py-5 px-6 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-white/30 transition-all backdrop-blur-sm"
                />
                <button className="absolute right-2 top-2 bottom-2 bg-white text-[#d2714e] px-6 rounded-xl font-bold text-sm flex items-center gap-2 hover:bg-white/90 transition-colors">
                  Subscribe
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
