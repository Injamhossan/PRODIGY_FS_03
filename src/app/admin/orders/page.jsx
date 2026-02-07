"use client";

import { useState, useEffect } from "react";
import { ShoppingBag, Eye, Download, Search, Filter } from "lucide-react";
import { toast } from "react-hot-toast";

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await fetch("/api/orders");
      const data = await res.json();
      setOrders(data);
    } catch (error) {
      console.error("Failed to fetch orders:", error);
      toast.error("Failed to load orders");
    } finally {
      setLoading(false);
    }
  };

  const filteredOrders = orders.filter((order) => {
    const searchLower = searchTerm.toLowerCase();
    return (
      order.id.toLowerCase().includes(searchLower) ||
      order.user?.name?.toLowerCase().includes(searchLower) ||
      order.user?.email?.toLowerCase().includes(searchLower)
    );
  });

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", { 
      month: "short", 
      day: "2-digit", 
      year: "numeric" 
    });
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#2b2825]">Order Management</h1>
          <p className="text-zinc-500 text-sm">Track and manage all customer orders in real-time.</p>
        </div>
        <button className="flex items-center gap-2 bg-white border border-zinc-100 px-6 py-3 rounded-2xl font-bold text-sm text-[#2b2825] shadow-sm hover:bg-zinc-50 transition-all">
          <Download className="w-5 h-5" />
          Export CSV
        </button>
      </div>

      <div className="bg-white rounded-3xl border border-zinc-100 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-zinc-50 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="relative w-full sm:w-80">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
            <input 
              type="text" 
              placeholder="Search by Order ID or name..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-zinc-50/50 border border-zinc-100 rounded-xl py-2.5 pl-12 pr-6 outline-none text-sm"
            />
          </div>
          <div className="flex gap-2 w-full sm:w-auto">
            <button className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2.5 bg-zinc-50 border border-zinc-100 rounded-xl text-zinc-500 text-sm font-bold hover:bg-zinc-100 transition-colors">
              <Filter className="w-4 h-4" />
              Filter
            </button>
          </div>
        </div>

        {loading ? (
          <div className="p-12 text-center">
            <div className="inline-block w-12 h-12 border-4 border-[#d2714e]/20 border-t-[#d2714e] rounded-full animate-spin"></div>
            <p className="mt-4 text-zinc-500 font-medium">Loading orders...</p>
          </div>
        ) : filteredOrders.length === 0 ? (
          <div className="p-12 text-center">
            <ShoppingBag className="w-12 h-12 text-zinc-300 mx-auto mb-4" />
            <p className="text-zinc-400 font-medium">
              {searchTerm ? "No orders found" : "No orders yet"}
            </p>
            <p className="text-xs text-zinc-300 mt-1">
              {searchTerm ? "Try a different search term" : "Orders will appear here once customers start purchasing"}
            </p>
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-zinc-50/50">
                    <th className="px-6 py-4 text-xs font-bold text-zinc-400 uppercase tracking-widest">Order ID</th>
                    <th className="px-6 py-4 text-xs font-bold text-zinc-400 uppercase tracking-widest">Customer</th>
                    <th className="px-6 py-4 text-xs font-bold text-zinc-400 uppercase tracking-widest">Date</th>
                    <th className="px-6 py-4 text-xs font-bold text-zinc-400 uppercase tracking-widest">Items</th>
                    <th className="px-6 py-4 text-xs font-bold text-zinc-400 uppercase tracking-widest">Status</th>
                    <th className="px-6 py-4 text-xs font-bold text-zinc-400 uppercase tracking-widest">Amount</th>
                    <th className="px-6 py-4 text-xs font-bold text-zinc-400 uppercase tracking-widest text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-50">
                  {filteredOrders.map((order) => (
                    <tr key={order.id} className="hover:bg-zinc-50/30 transition-colors">
                      <td className="px-6 py-4">
                        <span className="text-sm font-bold text-[#2b2825]">#{order.id.slice(0, 8)}</span>
                      </td>
                      <td className="px-6 py-4">
                        <div>
                          <p className="text-sm font-medium text-zinc-700">
                            {order.user?.name || "Guest"}
                          </p>
                          <p className="text-xs text-zinc-400">{order.user?.email}</p>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-sm text-zinc-400 font-medium">{formatDate(order.createdAt)}</span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-sm text-zinc-500 font-medium">{order.items?.length || 0} items</span>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-widest ${
                          order.status === 'Delivered' ? 'bg-green-50 text-green-500' :
                          order.status === 'Pending' ? 'bg-orange-50 text-orange-500' :
                          order.status === 'Shipped' ? 'bg-purple-50 text-purple-500' :
                          order.status === 'Cancelled' ? 'bg-red-50 text-red-500' :
                          'bg-blue-50 text-blue-500'
                        }`}>
                          {order.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm font-bold text-[#2b2825]">${order.total.toFixed(2)}</td>
                      <td className="px-6 py-4 text-right">
                        <button className="p-2 hover:bg-zinc-100 rounded-xl text-zinc-400 hover:text-[#d2714e] transition-all">
                          <Eye className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            <div className="p-6 border-t border-zinc-50 flex items-center justify-between">
              <p className="text-xs text-zinc-400 font-bold uppercase tracking-widest">
                {filteredOrders.length} {filteredOrders.length === 1 ? "Order" : "Orders"} total
              </p>
              <div className="flex gap-2">
                <button className="px-4 py-2 text-xs font-bold text-zinc-400">Page 1 of 1</button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
