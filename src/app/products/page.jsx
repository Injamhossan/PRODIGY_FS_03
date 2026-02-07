"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import TrendingNow from "@/components/TrendingNow";
import { motion } from "framer-motion";

export default function ProductsPage() {
  return (
    <div className="min-h-screen bg-[#fafafa]">
      <Navbar />
      <main className="pt-32">
        <div className="max-w-7xl mx-auto px-8 mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-[#2b2825] mb-4">All Products</h1>
            <p className="text-zinc-500 max-w-xl mx-auto">
              Explore our full collection of artisan-crafted furniture, lighting, and home decor pieces.
            </p>
          </motion.div>
        </div>

        {/* Reusing TrendingNow as a product grid for now */}
        <TrendingNow />
      </main>
      <Footer />
    </div>
  );
}
