"use client";

import { useSession } from "next-auth/react";
import { motion } from "framer-motion";
import { Package, Heart, CreditCard, ArrowRight, Zap, TrendingUp, Loader2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function UserDashboard() {
  const { data: session } = useSession();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch("/api/dashboard/stats");
        if (res.ok) {
          const statsData = await res.json();
          setData(statsData);
        }
      } catch (error) {
        console.error("Failed to fetch dashboard stats:", error);
      } finally {
        setLoading(false);
      }
    };

    if (session) {
      fetchStats();
    }
  }, [session]);

  const iconMap = {
    Package,
    Heart,
    CreditCard
  };

  if (loading) {
    return (
      <div className="flex h-[60vh] items-center justify-center">
        <Loader2 className="w-8 h-8 text-[#d2714e] animate-spin" />
      </div>
    );
  }

  // Use fetched data or fallbacks
  const dashboardStats = data?.stats || [
    { label: "Total Orders", value: "00", icon: "Package" },
    { label: "Wishlist", value: "00", icon: "Heart" },
    { label: "Total Spent", value: "$0.00", icon: "CreditCard" },
  ];
  const recentOrders = data?.recentOrders || [];
  const wishlist = data?.wishlist || [];

  return (
    <div className="space-y-12">
      {/* Welcome Banner */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden bg-[#2b2825] rounded-[2.5rem] p-12 text-white"
      >
        <div className="relative z-10 md:max-w-xl">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full text-xs font-bold mb-6 backdrop-blur-sm border border-white/10">
            <Zap className="w-3 h-3 text-[#d2714e]" />
            PRO MEMBER
          </div>
          <div className="flex items-center gap-6 mb-8">
            <div className="relative w-24 h-24 rounded-[2rem] overflow-hidden ring-4 ring-[#d2714e]/20 group">
              <Image 
                src={session?.user?.image || `https://ui-avatars.com/api/?name=${session?.user?.name || 'User'}&background=d2714e&color=fff&bold=true&size=200`}
                alt="Profile"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
            </div>
            <div>
              <h1 className="text-3xl md:text-5xl font-bold tracking-tight">
                Welcome back, <br />
                <span className="text-[#d2714e]">{session?.user?.name?.split(' ')[0] || "Artisan"}!</span>
              </h1>
            </div>
          </div>
          <p className="text-zinc-400 text-lg mb-8 leading-relaxed">
            Your collection is growing beautifully. You have {recentOrders.filter(o => o.status === 'In Transit').length} items arriving soon and {wishlist.length} pieces in your wishlist.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link href="/dashboard/orders" className="px-8 py-4 bg-[#d2714e] hover:bg-[#c1613d] rounded-2xl font-bold transition-all shadow-lg shadow-[#d2714e]/20 active:scale-95 text-center">
              Track Recent Order
            </Link>
            <Link href="/dashboard/profile" className="px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl font-bold transition-all backdrop-blur-sm active:scale-95 text-center">
              Edit Profile
            </Link>
          </div>
        </div>
        
        {/* Background Decorative Element */}
        <div className="absolute top-0 right-0 w-1/2 h-full hidden lg:block">
          <div className="absolute inset-0 bg-gradient-to-l from-[#2b2825] to-transparent z-10" />
          <img 
            src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&q=80&w=800"
            alt="Interior"
            className="w-full h-full object-cover opacity-50"
          />
        </div>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {dashboardStats.map((stat, index) => {
          const Icon = iconMap[stat.icon] || Package;
          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white p-8 rounded-[2rem] border border-zinc-100 shadow-sm group hover:shadow-xl hover:shadow-zinc-200/50 transition-all duration-500"
            >
              <div className={`w-14 h-14 rounded-2xl bg-zinc-50 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500`}>
                <Icon className="w-6 h-6 text-[#d2714e]" />
              </div>
              <div className="flex items-end justify-between">
                <div>
                  <p className="text-[10px] text-zinc-400 uppercase tracking-widest font-bold mb-1">{stat.label}</p>
                  <h3 className="text-3xl font-bold text-[#2b2825] tracking-tight">{stat.value}</h3>
                </div>
                <div className="p-2 bg-green-50 text-green-600 rounded-lg text-xs font-bold flex items-center gap-1">
                  <TrendingUp className="w-3 h-3" />
                  +12%
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Recent Orders */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-[#2b2825] tracking-tight">Recent Orders</h2>
            <Link href="/dashboard/orders" className="text-sm font-bold text-[#d2714e] hover:bg-[#d2714e]/5 px-4 py-2 rounded-xl transition-colors">View History</Link>
          </div>
          <div className="space-y-4">
            {recentOrders.length > 0 ? (
              recentOrders.map((order, index) => (
                <motion.div 
                  key={order.id} 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 + (index * 0.1) }}
                  className="bg-white p-6 rounded-[2rem] border border-zinc-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 group hover:border-[#d2714e]/20 transition-all"
                >
                  <div className="flex items-center gap-6">
                    <div className="relative w-16 h-16 rounded-2xl overflow-hidden shadow-sm bg-zinc-50 flex items-center justify-center">
                      {order.image ? (
                        <Image src={order.image} alt="Order item" fill className="object-cover" />
                      ) : (
                        <Package className="w-6 h-6 text-zinc-300" />
                      )}
                    </div>
                    <div>
                      <div className="font-bold text-[#2b2825] text-lg">{order.id}</div>
                      <div className="text-sm text-zinc-400 font-medium">{order.date} • {order.items} Items</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-12 w-full sm:w-auto justify-between sm:justify-end">
                    <div className="text-right">
                      <div className="font-bold text-[#2b2825] text-lg">${order.total}</div>
                      <div className={`inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full ${order.status === 'Delivered' ? 'bg-green-50 text-green-600' : 'bg-amber-50 text-amber-600'}`}>
                        <div className={`w-1 h-1 rounded-full ${order.status === 'Delivered' ? 'bg-green-600' : 'bg-amber-600'}`} />
                        {order.status}
                      </div>
                    </div>
                    <Link href="/dashboard/orders" className="p-3 bg-zinc-50 group-hover:bg-[#d2714e] rounded-2xl transition-all duration-300">
                      <ArrowRight className="w-5 h-5 text-zinc-400 group-hover:text-white transition-colors" />
                    </Link>
                  </div>
                </motion.div>
              ))
            ) : (
              <div className="bg-white p-12 rounded-[2rem] border border-zinc-100 text-center">
                <p className="text-zinc-400 font-medium">No orders yet. Start shopping to see them here!</p>
                <Link href="/products" className="inline-block mt-4 text-[#d2714e] font-bold hover:underline underline-offset-4">Explore Products</Link>
              </div>
            )}
          </div>
        </div>

        {/* Wishlist Sidebar */}
        <div className="space-y-8">
          <div className="bg-white p-8 rounded-[2.5rem] border border-zinc-100 shadow-sm">
            <h2 className="text-xl font-bold text-[#2b2825] mb-6 flex items-center gap-3">
              <Heart className="w-5 h-5 text-[#d2714e]" />
              Wishlist
            </h2>
            <div className="space-y-6">
              {wishlist.length > 0 ? (
                wishlist.map((item) => (
                  <div key={item.name} className="flex gap-4 group cursor-pointer">
                    <div className="relative w-20 h-20 rounded-2xl overflow-hidden shadow-sm border border-zinc-50">
                      <Image src={item.image} alt={item.name} fill className="object-cover transition-transform group-hover:scale-110 duration-700" />
                    </div>
                    <div className="flex flex-col justify-center flex-1 min-w-0">
                      <h3 className="text-sm font-bold text-[#2b2825] group-hover:text-[#d2714e] transition-colors truncate">{item.name}</h3>
                      <p className="text-sm font-bold text-[#d2714e] mt-1">${item.price}</p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-6">
                  <p className="text-zinc-400 text-xs mb-4">Your wishlist is empty.</p>
                </div>
              )}
              <Link href="/dashboard/wishlist" className="block w-full py-4 text-center border-2 border-dashed border-zinc-100 rounded-[1.5rem] text-zinc-400 text-sm font-bold hover:border-[#d2714e]/20 hover:text-[#d2714e] transition-all mt-4">
                View All Pieces
              </Link>
            </div>
          </div>

          <div className="bg-gradient-to-br from-[#d2714e] to-[#b15a3a] p-8 rounded-[2.5rem] text-white shadow-lg shadow-[#d2714e]/20">
            <h3 className="font-bold text-lg mb-2">Need advice?</h3>
            <p className="text-white/80 text-sm mb-6 leading-relaxed">Our interior designers are here to help you style your space.</p>
            <button className="w-full py-4 bg-white text-[#d2714e] rounded-2xl font-bold text-sm hover:scale-[1.02] transition-transform active:scale-95 shadow-lg">
              Chat with Designer
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
