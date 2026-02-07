"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const categories = [
  {
    name: "Furniture",
    desc: "Handcrafted pieces for modern living",
    count: "24 products",
    image: "https://images.unsplash.com/photo-1567016432779-094069958ad5?auto=format&fit=crop&q=80&w=800",
  },
  {
    name: "Lighting",
    desc: "Illuminate your space beautifully",
    count: "18 products",
    image: "https://images.unsplash.com/photo-1540932239986-30128078f3c5?auto=format&fit=crop&q=80&w=800",
  },
  {
    name: "Home Decor",
    desc: "Finishing touches that matter",
    count: "36 products",
    image: "https://images.unsplash.com/photo-1513519245088-0e12902e35ca?auto=format&fit=crop&q=80&w=800",
  },
  {
    name: "Textiles",
    desc: "Soft furnishings & fabrics",
    count: "28 products",
    image: "https://images.unsplash.com/photo-1584144173707-f591d0f7b23c?auto=format&fit=crop&q=80&w=800",
  },
];

export default function Categories() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-8">
        <div className="flex items-end justify-between mb-12">
          <div>
            <h2 className="text-3xl font-bold text-[#2b2825] mb-2">Shop by Category</h2>
            <p className="text-zinc-500">Explore our curated collections</p>
          </div>
          <button className="flex items-center gap-2 text-sm font-bold text-[#2b2825] hover:text-[#d2714e] transition-colors group">
            View All
            <ArrowUpRight className="w-4 h-4 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((cat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="relative aspect-[4/5] rounded-[32px] overflow-hidden group cursor-pointer"
            >
              <Image
                src={cat.image}
                alt={cat.name}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
              
              <div className="absolute inset-0 p-8 flex flex-col justify-end">
                <h3 className="text-xl font-bold text-white mb-2">{cat.name}</h3>
                <p className="text-sm text-zinc-300 mb-4 line-clamp-2">{cat.desc}</p>
                <div className="flex items-center gap-2 text-xs font-bold text-white uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity translate-y-2 group-hover:translate-y-0 duration-300">
                  {cat.count}
                  <ArrowUpRight className="w-3 h-3" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
