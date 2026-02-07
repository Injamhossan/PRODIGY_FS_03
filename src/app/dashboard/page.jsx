"use client";

import { useSession } from "next-auth/react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { Package, Heart, Settings, User, ArrowRight, CreditCard } from "lucide-react";
import Image from "next/image";

const recentOrders = [
  { id: "#ART-1234", date: "Feb 12, 2026", status: "Delivered", total: 459, items: 2 },
  { id: "#ART-1235", date: "Jan 28, 2026", status: "In Transit", total: 189, items: 1 },
];

const wishlist = [
  { name: "Minimalist Oak Chair", price: 349, image: "https://images.unsplash.com/photo-1592078615290-033ee584e267?auto=format&fit=crop&q=80&w=400" },
  { name: "Ceramic Table Lamp", price: 189, image: "https://images.unsplash.com/photo-1534073828943-f801091bb18c?auto=format&fit=crop&q=80&w=400" },
];

export default function UserDashboard() {
  const { data: session } = useSession();

  return (
    <div className="min-h-screen bg-[#fafafa]">
      <Navbar />
      <main className="pt-32 pb-24">
        <div className="max-w-7xl mx-auto px-8">
          {/* Header */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12"
          >
            <div>
              <h1 className="text-3xl font-bold text-[#2b2825] mb-2">Hello, {session?.user?.name || "Artisan"}</h1>
              <p className="text-zinc-500">Manage your orders and account settings.</p>
            </div>
            <button className="px-6 py-3 bg-white border border-zinc-100 rounded-2xl text-sm font-bold text-[#2b2825] flex items-center gap-2 hover:bg-zinc-50 transition-colors shadow-sm">
              <Settings className="w-4 h-4" />
              Account Settings
            </button>
          </motion.div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div className="bg-white p-8 rounded-[32px] border border-zinc-100 shadow-sm">
              <div className="w-12 h-12 rounded-2xl bg-[#d2714e]/10 flex items-center justify-center text-[#d2714e] mb-6">
                <Package className="w-6 h-6" />
              </div>
              <div className="text-2xl font-bold text-[#2b2825] mb-1">12</div>
              <div className="text-xs text-zinc-400 uppercase tracking-widest font-bold">Total Orders</div>
            </div>
            <div className="bg-white p-8 rounded-[32px] border border-zinc-100 shadow-sm">
              <div className="w-12 h-12 rounded-2xl bg-[#d2714e]/10 flex items-center justify-center text-[#d2714e] mb-6">
                <Heart className="w-6 h-6" />
              </div>
              <div className="text-2xl font-bold text-[#2b2825] mb-1">8</div>
              <div className="text-xs text-zinc-400 uppercase tracking-widest font-bold">Wishlist Items</div>
            </div>
            <div className="bg-white p-8 rounded-[32px] border border-zinc-100 shadow-sm">
              <div className="w-12 h-12 rounded-2xl bg-[#d2714e]/10 flex items-center justify-center text-[#d2714e] mb-6">
                <CreditCard className="w-6 h-6" />
              </div>
              <div className="text-2xl font-bold text-[#2b2825] mb-1">$2.4k</div>
              <div className="text-xs text-zinc-400 uppercase tracking-widest font-bold">Total Spent</div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Recent Orders */}
            <div className="lg:col-span-2">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-[#2b2825]">Recent Orders</h2>
                <button className="text-sm font-bold text-[#d2714e] hover:underline">View All</button>
              </div>
              <div className="space-y-4">
                {recentOrders.map((order) => (
                  <div key={order.id} className="bg-white p-6 rounded-[24px] border border-zinc-100 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-zinc-50 flex items-center justify-center text-zinc-400">
                        <Package className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="font-bold text-[#2b2825]">{order.id}</div>
                        <div className="text-xs text-zinc-400">{order.date} • {order.items} items</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-8 w-full md:w-auto justify-between">
                      <div className="text-right">
                        <div className="font-bold text-[#2b2825]">${order.total}</div>
                        <div className={`text-[10px] font-bold uppercase tracking-widest ${order.status === 'Delivered' ? 'text-green-500' : 'text-[#d2714e]'}`}>{order.status}</div>
                      </div>
                      <button className="p-2 hover:bg-zinc-50 rounded-full transition-colors">
                        <ArrowRight className="w-4 h-4 text-zinc-300" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Wishlist Sidebar */}
            <div>
              <h2 className="text-xl font-bold text-[#2b2825] mb-6">Saved Pieces</h2>
              <div className="space-y-6">
                {wishlist.map((item) => (
                  <div key={item.name} className="flex gap-4 group cursor-pointer">
                    <div className="relative w-20 h-20 rounded-2xl overflow-hidden shadow-sm">
                      <Image src={item.image} alt={item.name} fill className="object-cover transition-transform group-hover:scale-110" />
                    </div>
                    <div className="flex flex-col justify-center">
                      <h3 className="text-sm font-bold text-[#2b2825] group-hover:text-[#d2714e] transition-colors">{item.name}</h3>
                      <p className="text-sm font-bold text-[#d2714e] mt-1">${item.price}</p>
                    </div>
                  </div>
                ))}
                <button className="w-full py-4 border-2 border-dashed border-zinc-100 rounded-[24px] text-zinc-400 text-sm font-bold hover:border-[#d2714e]/20 hover:text-[#d2714e] transition-all">
                  Go to Wishlist
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
