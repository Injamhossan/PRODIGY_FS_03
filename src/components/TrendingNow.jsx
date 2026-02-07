"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight, ShoppingBag } from "lucide-react";

const products = [
  {
    id: 1,
    name: "Minimalist Oak Chair",
    category: "FURNITURE",
    price: 349,
    originalPrice: 429,
    discount: "-19%",
    image: "https://images.unsplash.com/photo-1592078615290-033ee584e267?auto=format&fit=crop&q=80&w=800",
    desc: "Elegant Scandinavian-inspired design",
  },
  {
    id: 2,
    name: "Ceramic Table Lamp",
    category: "LIGHTING",
    price: 189,
    tag: "New",
    image: "https://images.unsplash.com/photo-1534073828943-f801091bb18c?auto=format&fit=crop&q=80&w=800",
    desc: "Hand-thrown with linen shade",
  },
  {
    id: 3,
    name: "Woven Cotton Throw",
    category: "TEXTILES",
    price: 129,
    image: "https://images.unsplash.com/photo-1584144173707-f591d0f7b23c?auto=format&fit=crop&q=80&w=800",
    desc: "Soft, breathable comfort",
  },
  {
    id: 4,
    name: "Sculptural Vase",
    category: "DECOR",
    price: 85,
    tag: "New",
    image: "https://images.unsplash.com/photo-1581781870027-04212e231e96?auto=format&fit=crop&q=80&w=800",
    desc: "Modern ceramic statement piece",
  },
  {
    id: 5,
    name: "Walnut Coffee Table",
    category: "FURNITURE",
    price: 899,
    originalPrice: 1099,
    discount: "-18%",
    image: "https://images.unsplash.com/photo-1533090161767-e6ffed986c88?auto=format&fit=crop&q=80&w=800",
    desc: "Live edge natural beauty",
  },
  {
    id: 6,
    name: "Minimalist Pendant",
    category: "LIGHTING",
    price: 249,
    image: "https://images.unsplash.com/photo-1513506496266-aa6e37949ef4?auto=format&fit=crop&q=80&w=800",
    desc: "Industrial aesthetic for modern spaces",
  },
  {
    id: 7,
    name: "Linen Cushion Set",
    category: "TEXTILES",
    price: 75,
    image: "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?auto=format&fit=crop&q=80&w=800",
    desc: "Plush comfort in neutral tones",
  },
  {
    id: 8,
    name: "Oak Bookshelf",
    category: "FURNITURE",
    price: 1249,
    image: "https://images.unsplash.com/photo-1594620302200-9a7621ef6ef7?auto=format&fit=crop&q=80&w=800",
    desc: "Timeless storage solution",
  },
];

export default function TrendingNow() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-8">
        <div className="flex items-end justify-between mb-12">
          <div>
            <h2 className="text-3xl font-bold text-[#2b2825] mb-2">Trending Now</h2>
            <p className="text-zinc-500">What our customers love</p>
          </div>
          <button className="flex items-center gap-2 text-sm font-bold text-[#2b2825] hover:text-[#d2714e] transition-colors group">
            View All
            <ArrowUpRight className="w-4 h-4 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-y-12 gap-x-8">
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: (index % 4) * 0.1 }}
              className="group cursor-pointer"
            >
              <div className="relative aspect-square rounded-[24px] overflow-hidden bg-zinc-100 mb-6">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                
                <div className="absolute top-4 left-4 flex flex-col gap-2">
                  {product.discount && (
                    <span className="bg-[#d2714e] text-white text-[10px] font-bold px-2 py-1 rounded-full">
                      {product.discount}
                    </span>
                  )}
                  {product.tag && (
                    <span className="bg-[#2b2825] text-white text-[10px] font-bold px-2 py-1 rounded-full">
                      {product.tag}
                    </span>
                  )}
                </div>

                <div className="absolute inset-0 bg-black/5 flex items-center justify-center translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <button className="bg-white/90 backdrop-blur-md text-[#2b2825] px-6 py-3 rounded-xl flex items-center gap-2 font-bold text-sm hover:bg-white transition-colors shadow-sm">
                    <ShoppingBag className="w-4 h-4" />
                    Add to Cart
                  </button>
                </div>
              </div>

              <div>
                <span className="text-[10px] font-bold text-zinc-400 tracking-wider mb-1 block uppercase">
                  {product.category}
                </span>
                <h3 className="text-base font-bold text-[#2b2825] mb-1 group-hover:text-[#d2714e] transition-colors">
                  {product.name}
                </h3>
                <p className="text-sm text-zinc-500 mb-3 line-clamp-1">{product.desc}</p>
                <div className="flex items-center gap-2">
                  <span className="text-base font-bold text-[#2b2825]">${product.price}</span>
                  {product.originalPrice && (
                    <span className="text-sm text-zinc-400 line-through">${product.originalPrice}</span>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
