"use client";

import { motion } from "framer-motion";
import { 
  BarChart3, 
  Box, 
  Users, 
  ShoppingBag, 
  LayoutDashboard, 
  Plus, 
  Search, 
  Bell,
  MoreVertical,
  CheckCircle2,
  Clock,
  ArrowUpRight
} from "lucide-react";
import Image from "next/image";
import logo from "../../assets/Main/logo.svg";
import Link from "next/link";

const stats = [
  { label: "Total Revenue", value: "$45,231.89", trend: "+12.5%", icon: BarChart3 },
  { label: "Total Orders", value: "356", trend: "+8.2%", icon: ShoppingBag },
  { label: "Total Customers", value: "1,200", trend: "+4.1%", icon: Users },
  { label: "Active Products", value: "48", trend: "0%", icon: Box },
];

const recentOrders = [
  { id: "#2451", customer: "Liam Neeson", status: "Completed", amount: "$350.00", date: "Today, 12:45 PM" },
  { id: "#2452", customer: "Emma Watson", status: "Pending", amount: "$1,200.00", date: "Today, 11:20 AM" },
  { id: "#2453", customer: "Robert Downey", status: "Processing", amount: "$45.00", date: "Yesterday, 04:15 PM" },
];

export default function AdminDashboard() {
  return (
    <div className="min-h-screen bg-[#f8f9fa] flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-zinc-100 p-8 hidden lg:block">
        <Link href="/" className="inline-block mb-12">
          <Image src={logo} alt="Artisan Logo" width={100} height={40} className="h-6 w-auto" />
        </Link>

        <nav className="space-y-2">
          <button className="w-full flex items-center gap-3 px-4 py-3 bg-[#d2714e]/5 text-[#d2714e] rounded-xl font-bold text-sm">
            <LayoutDashboard className="w-5 h-5" />
            Overview
          </button>
          <button className="w-full flex items-center gap-3 px-4 py-3 text-zinc-400 hover:text-[#d2714e] hover:bg-[#d2714e]/5 rounded-xl font-bold text-sm transition-all text-left">
            <Box className="w-5 h-5" />
            Products
          </button>
          <button className="w-full flex items-center gap-3 px-4 py-3 text-zinc-400 hover:text-[#d2714e] hover:bg-[#d2714e]/5 rounded-xl font-bold text-sm transition-all text-left">
            <ShoppingBag className="w-5 h-5" />
            Orders
          </button>
          <button className="w-full flex items-center gap-3 px-4 py-3 text-zinc-400 hover:text-[#d2714e] hover:bg-[#d2714e]/5 rounded-xl font-bold text-sm transition-all text-left">
            <Users className="w-5 h-5" />
            Customers
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        {/* Top Navbar */}
        <header className="flex justify-between items-center mb-12">
          <div className="relative w-96 hidden md:block">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
            <input 
              type="text" 
              placeholder="Search data, reports, settings..." 
              className="w-full bg-white border border-zinc-100 rounded-xl py-3 pl-12 pr-6 focus:ring-2 focus:ring-[#d2714e]/20 outline-none transition-all text-sm"
            />
          </div>
          <div className="flex items-center gap-4">
            <button className="p-3 bg-white border border-zinc-100 rounded-xl text-zinc-400 hover:text-[#d2714e] relative">
              <Bell className="w-5 h-5" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white" />
            </button>
            <div className="w-10 h-10 rounded-xl bg-zinc-200 overflow-hidden ring-2 ring-white">
              <Image src="https://ui-avatars.com/api/?name=Admin&background=d2714e&color=fff" alt="Avatar" width={40} height={40} />
            </div>
          </div>
        </header>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="bg-white p-6 rounded-3xl border border-zinc-100 shadow-sm"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="p-3 bg-[#d2714e]/5 rounded-2xl text-[#d2714e]">
                  <stat.icon className="w-5 h-5" />
                </div>
                {stat.trend !== "0%" && (
                  <span className="text-[10px] font-bold text-green-500 bg-green-50 px-2 py-1 rounded-full">{stat.trend}</span>
                )}
              </div>
              <div className="text-2xl font-bold text-[#2b2825] mb-1">{stat.value}</div>
              <div className="text-xs text-zinc-400 uppercase tracking-widest font-bold">{stat.label}</div>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Orders Table */}
          <div className="lg:col-span-2 bg-white rounded-3xl border border-zinc-100 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-zinc-50 flex justify-between items-center">
              <h2 className="text-lg font-bold text-[#2b2825]">Recent Orders</h2>
              <button className="text-sm font-bold text-[#d2714e] hover:underline">View Report</button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-zinc-50/50">
                    <th className="px-6 py-4 text-xs font-bold text-zinc-400 uppercase tracking-widest">Order ID</th>
                    <th className="px-6 py-4 text-xs font-bold text-zinc-400 uppercase tracking-widest">Customer</th>
                    <th className="px-6 py-4 text-xs font-bold text-zinc-400 uppercase tracking-widest">Status</th>
                    <th className="px-6 py-4 text-xs font-bold text-zinc-400 uppercase tracking-widest">Amount</th>
                    <th className="px-6 py-4 text-xs font-bold text-zinc-400 uppercase tracking-widest"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-50">
                  {recentOrders.map((order) => (
                    <tr key={order.id} className="hover:bg-zinc-50/30 transition-colors">
                      <td className="px-6 py-4 text-sm font-bold text-[#2b2825]">{order.id}</td>
                      <td className="px-6 py-4 text-sm font-medium text-zinc-500">{order.customer}</td>
                      <td className="px-6 py-4">
                        <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-widest ${
                          order.status === 'Completed' ? 'bg-green-50 text-green-500' :
                          order.status === 'Pending' ? 'bg-orange-50 text-orange-500' :
                          'bg-blue-50 text-blue-500'
                        }`}>
                          {order.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm font-bold text-[#2b2825]">{order.amount}</td>
                      <td className="px-6 py-4 text-right">
                        <button className="p-2 hover:bg-zinc-100 rounded-full transition-colors text-zinc-400">
                          <MoreVertical className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Activity Log */}
          <div className="bg-white rounded-3xl border border-zinc-100 shadow-sm p-6">
            <h2 className="text-lg font-bold text-[#2b2825] mb-6">Live Activity</h2>
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center text-green-500 flex-shrink-0">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-sm font-bold text-[#2b2825]">New Subscriber</div>
                  <div className="text-[10px] text-zinc-400">sarah@example.com joined the newsletter</div>
                  <div className="text-[10px] text-zinc-300 mt-1 uppercase tracking-widest font-bold">2 mins ago</div>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-500 flex-shrink-0">
                  <Plus className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-sm font-bold text-[#2b2825]">Inventory Update</div>
                  <div className="text-[10px] text-zinc-400">+5 Minimalist Oak Chairs added</div>
                  <div className="text-[10px] text-zinc-300 mt-1 uppercase tracking-widest font-bold">12 mins ago</div>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-orange-50 flex items-center justify-center text-orange-500 flex-shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-sm font-bold text-[#2b2825]">Stock Alert</div>
                  <div className="text-[10px] text-zinc-400">Ceramic Lamps running low (2 left)</div>
                  <div className="text-[10px] text-zinc-300 mt-1 uppercase tracking-widest font-bold">1 hour ago</div>
                </div>
              </div>
            </div>
            <button className="w-full mt-8 py-4 bg-zinc-50 rounded-2xl text-[10px] font-bold text-zinc-400 uppercase tracking-[0.2em] hover:bg-zinc-100 transition-colors">
              View All Activity
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
