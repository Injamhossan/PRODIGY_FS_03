"use client";

import { motion } from "framer-motion";
import { Package, Search, Filter, ChevronRight, Loader2 } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

export default function OrdersPage() {
  const { data: session } = useSession();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await fetch("/api/user/orders");
        if (res.ok) {
          const data = await res.json();
          setOrders(data);
        }
      } catch (error) {
        console.error("Failed to fetch orders:", error);
      } finally {
        setLoading(false);
      }
    };

    if (session) {
      fetchOrders();
    }
  }, [session]);

  if (loading) {
    return (
      <div className="flex h-[60vh] items-center justify-center">
        <Loader2 className="w-8 h-8 text-[#d2714e] animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h1 className="text-3xl font-bold text-[#2b2825] tracking-tight mb-2">My Orders</h1>
          <p className="text-zinc-500 text-sm">Track, manage and download invoices for your purchases.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
            <input 
              type="text" 
              placeholder="Search orders..." 
              className="pl-10 pr-4 py-2 bg-white border border-zinc-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#d2714e]/20 w-64"
            />
          </div>
          <button className="p-2 bg-white border border-zinc-100 rounded-xl text-zinc-500 hover:text-[#d2714e] transition-colors">
            <Filter className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="space-y-6">
        {orders.length > 0 ? (
          orders.map((order, index) => (
            <motion.div
              key={order.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-[2rem] border border-zinc-100 overflow-hidden hover:border-[#d2714e]/20 transition-all shadow-sm"
            >
              {/* Order Header */}
              <div className="p-6 border-b border-zinc-50 flex flex-wrap justify-between items-center gap-4 bg-zinc-50/50">
                <div className="flex items-center gap-8">
                  <div>
                    <p className="text-[10px] text-zinc-400 font-bold uppercase tracking-widest mb-1">Order ID</p>
                    <p className="text-sm font-bold text-[#2b2825]">{order.id}</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-zinc-400 font-bold uppercase tracking-widest mb-1">Date Placed</p>
                    <p className="text-sm font-bold text-[#2b2825]">{order.date}</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-zinc-400 font-bold uppercase tracking-widest mb-1">Total Amount</p>
                    <p className="text-sm font-bold text-[#d2714e]">${order.total}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right mr-4">
                    <p className="text-[10px] text-zinc-400 font-bold uppercase tracking-widest mb-1">Payment</p>
                    <p className="text-xs font-bold text-[#2b2825]">{order.paymentMethod}</p>
                  </div>
                  <span className={`px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest ${
                    order.paymentStatus === 'Paid' ? 'bg-green-100 text-green-700' : 
                    order.paymentStatus === 'Failed' ? 'bg-red-100 text-red-700' :
                    'bg-amber-100 text-amber-700'
                  }`}>
                    {order.paymentStatus}
                  </span>
                  <span className={`px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest ${
                    order.status === 'Delivered' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'
                  }`}>
                    {order.status}
                  </span>
                </div>
              </div>

              {/* Order Items */}
              <div className="p-6 space-y-4">
                {order.items.map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="relative w-16 h-16 rounded-xl overflow-hidden border border-zinc-100 bg-zinc-50 flex items-center justify-center">
                        {item.image ? (
                          <Image src={item.image} alt={item.name} fill className="object-cover" />
                        ) : (
                          <Package className="w-6 h-6 text-zinc-200" />
                        )}
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-[#2b2825]">{item.name}</h4>
                        <p className="text-xs text-zinc-400">Handcrafted Artisan Piece</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-bold text-[#2b2825]">${item.price}</p>
                      <p className="text-[10px] text-zinc-400 uppercase tracking-widest">Qty: {item.quantity}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Order Footer */}
              <div className="p-4 bg-zinc-50/30 border-t border-zinc-50 flex justify-end">
                <button className="flex items-center gap-2 text-xs font-bold text-[#d2714e] hover:underline uppercase tracking-widest">
                  Order Details
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          ))
        ) : (
          <div className="bg-white p-24 rounded-[3rem] border-2 border-dashed border-zinc-100 text-center">
            <Package className="w-12 h-12 text-zinc-200 mx-auto mb-4" />
            <h2 className="text-xl font-bold text-[#2b2825] mb-2">No orders found</h2>
            <p className="text-zinc-400 text-sm max-w-xs mx-auto">You haven't placed any orders yet. Start exploring our collection!</p>
          </div>
        )}
      </div>
    </div>
  );
}
