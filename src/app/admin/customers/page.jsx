"use client";

import { useState, useEffect } from "react";
import { Users, Mail, Phone, MapPin, Search, Filter, MoreVertical } from "lucide-react";
import Image from "next/image";

export default function AdminCustomers() {
  const [customers, setCustomers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    try {
      const res = await fetch("/api/users");
      const data = await res.json();
      setCustomers(data);
    } catch (error) {
      console.error("Failed to fetch customers:", error);
    } finally {
      setLoading(false);
    }
  };

  const filteredCustomers = customers.filter((customer) =>
    customer.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalOrders = 0;
  const totalRevenue = 0;

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#2b2825]">Customer Management</h1>
          <p className="text-zinc-500 text-sm">View and manage your customer database.</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 bg-white border border-zinc-100 px-6 py-3 rounded-2xl font-bold text-sm text-[#2b2825] shadow-sm hover:bg-zinc-50 transition-all">
            <Users className="w-5 h-5" />
            {customers.length} Total
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-3xl border border-zinc-100 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-blue-50 rounded-2xl text-blue-500">
              <Users className="w-6 h-6" />
            </div>
            <div>
              <p className="text-2xl font-bold text-[#2b2825]">{customers.length}</p>
              <p className="text-xs text-zinc-400 uppercase tracking-widest font-bold">Total Customers</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-3xl border border-zinc-100 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-green-50 rounded-2xl text-green-500">
              <Mail className="w-6 h-6" />
            </div>
            <div>
              <p className="text-2xl font-bold text-[#2b2825]">{totalOrders}</p>
              <p className="text-xs text-zinc-400 uppercase tracking-widest font-bold">Total Orders</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-3xl border border-zinc-100 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-purple-50 rounded-2xl text-purple-500">
              <Phone className="w-6 h-6" />
            </div>
            <div>
              <p className="text-2xl font-bold text-[#2b2825]">${totalRevenue}</p>
              <p className="text-xs text-zinc-400 uppercase tracking-widest font-bold">Total Revenue</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-3xl border border-zinc-100 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-zinc-50 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="relative w-full sm:w-80">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
            <input 
              type="text" 
              placeholder="Search customers..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-zinc-50/50 border border-zinc-100 rounded-xl py-2.5 pl-12 pr-6 outline-none text-sm"
            />
          </div>
          <button className="flex items-center gap-2 px-4 py-2.5 bg-zinc-50 border border-zinc-100 rounded-xl text-zinc-500 text-sm font-bold hover:bg-zinc-100 transition-colors">
            <Filter className="w-4 h-4" />
            Filter
          </button>
        </div>

        {filteredCustomers.length === 0 ? (
          <div className="p-12 text-center">
            <Users className="w-12 h-12 text-zinc-300 mx-auto mb-4" />
            <p className="text-zinc-400 font-medium">No customers yet</p>
            <p className="text-xs text-zinc-300 mt-1">Customer accounts will appear here once users register</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-zinc-50/50">
                  <th className="px-6 py-4 text-xs font-bold text-zinc-400 uppercase tracking-widest">Customer</th>
                  <th className="px-6 py-4 text-xs font-bold text-zinc-400 uppercase tracking-widest">Email</th>
                  <th className="px-6 py-4 text-xs font-bold text-zinc-400 uppercase tracking-widest">Role</th>
                  <th className="px-6 py-4 text-xs font-bold text-zinc-400 uppercase tracking-widest">Joined</th>
                  <th className="px-6 py-4 text-xs font-bold text-zinc-400 uppercase tracking-widest text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-50">
                {filteredCustomers.map((customer) => (
                  <tr key={customer.id} className="hover:bg-zinc-50/30 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-xl bg-zinc-100 overflow-hidden relative">
                          <Image 
                            src={`https://ui-avatars.com/api/?name=${encodeURIComponent(customer.name || 'User')}&background=d2714e&color=fff`} 
                            alt={customer.name || 'User'} 
                            fill 
                            className="object-cover" 
                          />
                        </div>
                        <div>
                          <p className="text-sm font-bold text-[#2b2825]">{customer.name || 'Unknown'}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-sm text-zinc-500 font-medium">{customer.email}</p>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`text-xs font-bold px-2.5 py-1 rounded-full uppercase tracking-widest ${
                        customer.role === 'ADMIN' ? 'bg-purple-50 text-purple-500' : 'bg-blue-50 text-blue-500'
                      }`}>
                        {customer.role}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-sm text-zinc-400 font-medium">
                        {new Date(customer.createdAt).toLocaleDateString()}
                      </p>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button className="p-2 hover:bg-zinc-100 rounded-xl text-zinc-400 hover:text-[#d2714e] transition-all">
                        <MoreVertical className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        
        <div className="p-6 border-t border-zinc-50 flex items-center justify-between">
          <p className="text-xs text-zinc-400 font-bold uppercase tracking-widest">Showing {filteredCustomers.length} customers</p>
          <div className="flex gap-2">
            <button className="px-4 py-2 text-xs font-bold bg-zinc-50 text-zinc-400 rounded-lg cursor-not-allowed">Previous</button>
            <button className="px-4 py-2 text-xs font-bold bg-[#d2714e] text-white rounded-lg shadow-sm">1</button>
            <button className="px-4 py-2 text-xs font-bold bg-zinc-50 text-zinc-500 rounded-lg hover:bg-zinc-100">Next</button>
          </div>
        </div>
      </div>
    </div>
  );
}
