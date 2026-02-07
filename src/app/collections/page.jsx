"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const collections = [
  {
    title: "Summer Solstice",
    desc: "Light woods and airy textiles for the warm season.",
    image: "https://images.unsplash.com/photo-1540518614846-7eded433c457?auto=format&fit=crop&q=80&w=800",
  },
  {
    title: "Midnight Artisan",
    desc: "Dark walnuts and moody lighting for intimate spaces.",
    image: "https://images.unsplash.com/photo-1517705008128-361805f42e86?auto=format&fit=crop&q=80&w=800",
  },
  {
    title: "Raw & Refined",
    desc: "Unfinished textures meeting polished metal accents.",
    image: "https://images.unsplash.com/photo-1519710164239-da123dc03ef4?auto=format&fit=crop&q=80&w=800",
  },
];

export default function CollectionsPage() {
  return (
    <div className="min-h-screen bg-[#fafafa]">
      <Navbar />
      <main className="pt-32 pb-24">
        <div className="max-w-7xl mx-auto px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-20"
          >
            <h1 className="text-4xl md:text-6xl font-bold text-[#2b2825] mb-6">Curated Collections</h1>
            <p className="text-zinc-500 max-w-2xl mx-auto text-lg">
              Each collection is a story told through textures, colors, and materials. Handpicked to harmonize your living space.
            </p>
          </motion.div>

          <div className="space-y-24">
            {collections.map((col, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className={`flex flex-col ${idx % 2 === 1 ? 'lg:flex-row-reverse' : 'lg:flex-row'} gap-12 items-center`}
              >
                <div className="flex-1 relative aspect-[16/9] w-full rounded-[40px] overflow-hidden shadow-2xl group">
                  <Image src={col.image} alt={col.title} fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
                </div>
                <div className="flex-1 max-w-md">
                  <h2 className="text-3xl font-bold text-[#2b2825] mb-4">{col.title}</h2>
                  <p className="text-zinc-500 mb-8 leading-relaxed">{col.desc}</p>
                  <button className="flex items-center gap-2 text-[#d2714e] font-bold group">
                    Explore Collection
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
