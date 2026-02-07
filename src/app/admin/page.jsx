"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  BarChart3, 
  Box, 
  Users, 
  ShoppingBag, 
  MoreVertical,
  CheckCircle2,
  Plus,
  Clock
} from "lucide-react";

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalUsers: 0,
    totalCategories: 0,
  });
  const [recentOrders, setRecentOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      // Fetch products
      const productsRes = await fetch("/api/products");
      const products = await productsRes.json();

      // Fetch users
      const usersRes = await fetch("/api/users");
      const users = await usersRes.json();

      // Fetch categories
      const categoriesRes = await fetch("/api/categories");
      const categories = await categoriesRes.json();

      // Fetch orders
      const ordersRes = await fetch("/api/orders");
      const orders = await ordersRes.json();

      setStats({
        totalProducts: products.length || 0,
        totalUsers: users.length || 0,
        totalCategories: categories.length || 0,
      });

      // Set recent orders (last 5)
      setRecentOrders(orders.slice(0, 5));
    } catch (error) {
      console.error("Failed to fetch dashboard data:", error);
    } finally {
      setLoading(false);
    }
  };

  const statsData = [
    { label: "Total Revenue", value: "$0.00", trend: "0%", icon: BarChart3 },
    { label: "Total Orders", value: "0", trend: "0%", icon: ShoppingBag },
    { label: "Total Customers", value: stats.totalUsers.toString(), trend: "0%", icon: Users },
    { label: "Active Products", value: stats.totalProducts.toString(), trend: "0%", icon: Box },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-[#2b2825]">Dashboard Overview</h1>
        <p className="text-zinc-500 text-sm">Welcome back, here's what's happening with your store today.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {statsData.map((stat, idx) => (
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
          
          {recentOrders.length === 0 ? (
            <div className="p-12 text-center">
              <ShoppingBag className="w-12 h-12 text-zinc-300 mx-auto mb-4" />
              <p className="text-zinc-400 font-medium">No orders yet</p>
              <p className="text-xs text-zinc-300 mt-1">Orders will appear here once customers start purchasing</p>
            </div>
          ) : (
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
                      <td className="px-6 py-4 text-sm font-bold text-[#2b2825]">#{order.id.slice(0, 8)}</td>
                      <td className="px-6 py-4 text-sm font-medium text-zinc-500">
                        {order.user?.name || order.user?.email || "Guest"}
                      </td>
                      <td className="px-6 py-4">
                        <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-widest ${
                          order.status === 'Delivered' ? 'bg-green-50 text-green-500' :
                          order.status === 'Pending' ? 'bg-orange-50 text-orange-500' :
                          order.status === 'Processing' ? 'bg-blue-50 text-blue-500' :
                          order.status === 'Shipped' ? 'bg-purple-50 text-purple-500' :
                          'bg-red-50 text-red-500'
                        }`}>
                          {order.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm font-bold text-[#2b2825]">${order.total.toFixed(2)}</td>
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
          )}
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
                <div className="text-sm font-bold text-[#2b2825]">System Ready</div>
                <div className="text-[10px] text-zinc-400">Your store is ready to accept orders</div>
                <div className="text-[10px] text-zinc-300 mt-1 uppercase tracking-widest font-bold">Just now</div>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-500 flex-shrink-0">
                <Plus className="w-5 h-5" />
              </div>
              <div>
                <div className="text-sm font-bold text-[#2b2825]">Products Added</div>
                <div className="text-[10px] text-zinc-400">{stats.totalProducts} products in your catalog</div>
                <div className="text-[10px] text-zinc-300 mt-1 uppercase tracking-widest font-bold">Today</div>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-full bg-purple-50 flex items-center justify-center text-purple-500 flex-shrink-0">
                <Users className="w-5 h-5" />
              </div>
              <div>
                <div className="text-sm font-bold text-[#2b2825]">User Accounts</div>
                <div className="text-[10px] text-zinc-400">{stats.totalUsers} registered users</div>
                <div className="text-[10px] text-zinc-300 mt-1 uppercase tracking-widest font-bold">Total</div>
              </div>
            </div>
          </div>
          <button className="w-full mt-8 py-4 bg-zinc-50 rounded-2xl text-[10px] font-bold text-zinc-400 uppercase tracking-[0.2em] hover:bg-zinc-100 transition-colors">
            View All Activity
          </button>
        </div>
      </div>
    </div>
  );
}
