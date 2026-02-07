"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send } from "lucide-react";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-[#fafafa]">
      <Navbar />
      <main className="pt-32 pb-24">
        <div className="max-w-7xl mx-auto px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <h1 className="text-4xl md:text-5xl font-bold text-[#2b2825] mb-8">Get in Touch</h1>
              <p className="text-zinc-500 mb-12 max-w-md leading-relaxed">
                Have a question about our products or want to collaborate with our artisans? We'd love to hear from you.
              </p>

              <div className="space-y-8">
                <div className="flex gap-6">
                  <div className="w-12 h-12 rounded-2xl bg-white shadow-sm flex items-center justify-center text-[#d2714e]">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-[#2b2825] mb-1">Email Us</h3>
                    <p className="text-sm text-zinc-500">hello@artisan.com</p>
                  </div>
                </div>
                <div className="flex gap-6">
                  <div className="w-12 h-12 rounded-2xl bg-white shadow-sm flex items-center justify-center text-[#d2714e]">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-[#2b2825] mb-1">Call Us</h3>
                    <p className="text-sm text-zinc-500">+1 (234) 567-890</p>
                  </div>
                </div>
                <div className="flex gap-6">
                  <div className="w-12 h-12 rounded-2xl bg-white shadow-sm flex items-center justify-center text-[#d2714e]">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-[#2b2825] mb-1">Visit Us</h3>
                    <p className="text-sm text-zinc-500">123 Artisan Street, Craft City, CC 12345</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white p-10 rounded-[40px] shadow-sm border border-zinc-100"
            >
              <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-zinc-400">Name</label>
                    <input type="text" className="w-full bg-zinc-50 border-none rounded-2xl py-4 px-6 focus:ring-2 focus:ring-[#d2714e]/20 transition-all" placeholder="John Doe" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-zinc-400">Email</label>
                    <input type="email" className="w-full bg-zinc-50 border-none rounded-2xl py-4 px-6 focus:ring-2 focus:ring-[#d2714e]/20 transition-all" placeholder="john@example.com" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-zinc-400">Subject</label>
                  <input type="text" className="w-full bg-zinc-50 border-none rounded-2xl py-4 px-6 focus:ring-2 focus:ring-[#d2714e]/20 transition-all" placeholder="How can we help?" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-zinc-400">Message</label>
                  <textarea rows={5} className="w-full bg-zinc-50 border-none rounded-2xl py-4 px-6 focus:ring-2 focus:ring-[#d2714e]/20 transition-all resize-none" placeholder="Your message here..." />
                </div>
                <button className="w-full bg-[#d2714e] text-white py-5 rounded-2xl font-bold flex items-center justify-center gap-3 hover:bg-[#b05a3b] transition-all transform hover:scale-[1.02] active:scale-95 shadow-lg shadow-[#d2714e]/20">
                  Send Message
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </motion.div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
