"use client";

import { Truck, ShieldCheck, Leaf } from "lucide-react";
import { motion } from "framer-motion";

const features = [
  {
    icon: <Truck className="w-5 h-5 text-[#d2714e]" />,
    title: "Free Shipping",
    desc: "On orders over $150",
  },
  {
    icon: <ShieldCheck className="w-5 h-5 text-[#d2714e]" />,
    title: "2-Year Warranty",
    desc: "Quality guaranteed",
  },
  {
    icon: <Leaf className="w-5 h-5 text-[#d2714e]" />,
    title: "Sustainable",
    desc: "Eco-friendly materials",
  },
];

export default function Features() {
  return (
    <section className="py-12 bg-white border-y border-zinc-100">
      <div className="max-w-7xl mx-auto px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center gap-4 group cursor-default"
            >
              <div className="w-12 h-12 rounded-2xl bg-[#d2714e]/5 flex items-center justify-center group-hover:bg-[#d2714e]/10 transition-colors">
                {feature.icon}
              </div>
              <div>
                <h3 className="text-sm font-bold text-[#2b2825]">{feature.title}</h3>
                <p className="text-xs text-zinc-500 mt-0.5">{feature.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
