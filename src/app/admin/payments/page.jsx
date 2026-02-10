"use client";

import { useState, useEffect } from "react";
import { CreditCard, Search, Filter, CheckCircle2, XCircle, Clock, ExternalLink } from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "react-hot-toast";

export default function AdminPayments() {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchPayments();
  }, []);

  const fetchPayments = async () => {
    try {
      const res = await fetch("/api/orders");
      const data = await res.json();
      // Filter orders that have payment info (or all for now as a base)
      setPayments(data);
    } catch (error) {
      console.error("Failed to fetch payments:", error);
      toast.error("Failed to load payment history");
    } finally {
      setLoading(false);
    }
  };

  const filteredPayments = payments.filter((payment) => {
    const searchLower = searchTerm.toLowerCase();
    return (
      payment.id.toLowerCase().includes(searchLower) ||
      payment.user?.name?.toLowerCase().includes(searchLower) ||
      payment.transactionId?.toLowerCase().includes(searchLower)
    );
  });

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString("en-US", { 
      month: "short", 
      day: "2-digit", 
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    });
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#2b2825]">Payment Gateway</h1>
          <p className="text-zinc-500 text-sm">Monitor all transactions and gateway settlement status.</p>
        </div>
        <div className="flex gap-3">
           <div className="bg-white px-4 py-2 rounded-xl border border-zinc-100 shadow-sm flex items-center gap-3">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span className="text-xs font-bold text-[#2b2825]">Gateway Online</span>
           </div>
        </div>
      </div>

      {/* Payment Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-3xl border border-zinc-100 shadow-sm">
          <p className="text-xs font-bold text-zinc-400 uppercase tracking-widest mb-2">Total Settled</p>
          <p className="text-2xl font-bold text-[#2b2825]">${payments.reduce((acc, curr) => acc + (curr.paymentStatus === 'Paid' ? curr.total : 0), 0).toLocaleString()}</p>
        </div>
        <div className="bg-white p-6 rounded-3xl border border-zinc-100 shadow-sm">
          <p className="text-xs font-bold text-zinc-400 uppercase tracking-widest mb-2">Pending Clearance</p>
          <p className="text-2xl font-bold text-amber-500">${payments.reduce((acc, curr) => acc + (curr.paymentStatus === 'Unpaid' ? curr.total : 0), 0).toLocaleString()}</p>
        </div>
        <div className="bg-white p-6 rounded-3xl border border-zinc-100 shadow-sm">
          <p className="text-xs font-bold text-zinc-400 uppercase tracking-widest mb-2">Primary Gateway</p>
          <p className="text-2xl font-bold text-[#d2714e]">SSLCommerz</p>
        </div>
      </div>

      <div className="bg-white rounded-3xl border border-zinc-100 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-zinc-50 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="relative w-full sm:w-80">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
            <input 
              type="text" 
              placeholder="Search by Transaction ID or user..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-zinc-50/50 border border-zinc-100 rounded-xl py-2.5 pl-12 pr-6 outline-none text-sm"
            />
          </div>
          <button className="flex items-center gap-2 px-4 py-2.5 bg-zinc-50 border border-zinc-100 rounded-xl text-zinc-500 text-sm font-bold hover:bg-zinc-100 transition-colors">
            <Filter className="w-4 h-4" />
            Filter Status
          </button>
        </div>

        {loading ? (
          <div className="p-12 text-center">
            <div className="inline-block w-12 h-12 border-4 border-[#d2714e]/20 border-t-[#d2714e] rounded-full animate-spin"></div>
            <p className="mt-4 text-zinc-500 font-medium">Fetching transaction logs...</p>
          </div>
        ) : filteredPayments.length === 0 ? (
          <div className="p-12 text-center">
            <CreditCard className="w-12 h-12 text-zinc-300 mx-auto mb-4" />
            <p className="text-zinc-400 font-medium font-bold uppercase tracking-widest text-[10px]">No Transactions Found</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-zinc-50/50">
                  <th className="px-6 py-4 text-xs font-bold text-zinc-400 uppercase tracking-widest">Transaction ID</th>
                  <th className="px-6 py-4 text-xs font-bold text-zinc-400 uppercase tracking-widest">Method</th>
                  <th className="px-6 py-4 text-xs font-bold text-zinc-400 uppercase tracking-widest">Customer</th>
                  <th className="px-6 py-4 text-xs font-bold text-zinc-400 uppercase tracking-widest">Date</th>
                  <th className="px-6 py-4 text-xs font-bold text-zinc-400 uppercase tracking-widest">Amount</th>
                  <th className="px-6 py-4 text-xs font-bold text-zinc-400 uppercase tracking-widest">Status</th>
                  <th className="px-6 py-4 text-xs font-bold text-zinc-400 uppercase tracking-widest text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-50">
                {filteredPayments.map((payment) => (
                  <tr key={payment.id} className="hover:bg-zinc-50/30 transition-colors">
                    <td className="px-6 py-4">
                      <span className="text-sm font-bold text-[#d2714e]">
                        {payment.transactionId || `TXN-${payment.id.slice(0, 8).toUpperCase()}`}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div className="p-1.5 bg-zinc-100 rounded-lg">
                           <CreditCard className="w-3.5 h-3.5 text-zinc-500" />
                        </div>
                        <span className="text-xs font-bold text-[#2b2825] uppercase">{payment.paymentMethod || 'BKASH'}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div>
                        <p className="text-sm font-bold text-[#2b2825]">{payment.user?.name || "Guest"}</p>
                        <p className="text-[10px] text-zinc-400">{payment.user?.email}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-zinc-400 font-medium">{formatDate(payment.createdAt)}</span>
                    </td>
                    <td className="px-6 py-4 text-sm font-bold text-[#2b2825]">
                      ${payment.total.toFixed(2)}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1.5">
                        {payment.paymentStatus === 'Paid' ? (
                          <CheckCircle2 className="w-3.5 h-3.5 text-green-500" />
                        ) : payment.paymentStatus === 'Failed' ? (
                          <XCircle className="w-3.5 h-3.5 text-red-500" />
                        ) : (
                          <Clock className="w-3.5 h-3.5 text-amber-500" />
                        )}
                        <span className={`text-[10px] font-bold uppercase tracking-widest ${
                          payment.paymentStatus === 'Paid' ? 'text-green-500' :
                          payment.paymentStatus === 'Failed' ? 'text-red-500' :
                          'text-amber-500'
                        }`}>
                          {payment.paymentStatus}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button className="p-2 hover:bg-zinc-100 rounded-full transition-colors text-zinc-400">
                        <ExternalLink className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
