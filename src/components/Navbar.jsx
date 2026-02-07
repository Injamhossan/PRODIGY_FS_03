"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Search, User, ShoppingBag, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import logo from "../assets/Main/logo.svg";

function SearchOverlay({ isOpen, onClose }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-start justify-center pt-[10vh]"
        >
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-white/90 backdrop-blur-xl"
            onClick={onClose}
          />
          
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="relative z-10 w-full max-w-2xl px-8"
          >
            <div className="flex items-center gap-4 bg-white border-b-2 border-[#d2714e] pb-4">
              <Search className="w-6 h-6 text-zinc-400" />
              <input 
                autoFocus
                type="text" 
                placeholder="Search for artisan pieces..." 
                className="w-full text-2xl font-medium outline-none placeholder:text-zinc-300"
              />
              <button 
                onClick={onClose}
                className="p-2 hover:bg-zinc-100 rounded-full transition-colors"
              >
                <X className="w-6 h-6 text-zinc-400" />
              </button>
            </div>
            
            <div className="mt-8">
              <p className="text-xs font-bold text-zinc-400 uppercase tracking-widest mb-4">Quick Links</p>
              <div className="flex flex-wrap gap-3">
                {["Furniture", "Lighting", "Ceramics", "Textiles", "New Arrivals"].map((link) => (
                  <button key={link} className="px-4 py-2 bg-zinc-50 hover:bg-[#d2714e]/10 hover:text-[#d2714e] rounded-full text-sm font-medium transition-colors">
                    {link}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

import { useSession, signOut } from "next-auth/react";

export default function Navbar() {
  const { data: session } = useSession();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-white/80 backdrop-blur-md py-3 shadow-sm border-b border-zinc-100" : "bg-transparent py-5"
      }`}>
        <div className="max-w-7xl mx-auto flex items-center justify-between px-8">
          <Link href="/" className="flex items-center gap-2 group transition-transform hover:scale-105 active:scale-95">
            <Image
              src={logo}
              alt="Artisan Logo"
              width={120}
              height={80}
              className="h-8 w-auto object-contain"
              priority
            />
          </Link>

          <div className="hidden md:flex items-center gap-8">
            <Link href="/" className="text-sm font-medium text-[#2b2825] hover:text-[#d2714e] transition-colors">Home</Link>
            <Link href="/products" className="text-sm font-medium text-zinc-500 hover:text-[#d2714e] transition-colors">Products</Link>
            <Link href="/collections" className="text-sm font-medium text-zinc-500 hover:text-[#d2714e] transition-colors">Collections</Link>
            <Link href="/our-story" className="text-sm font-medium text-zinc-500 hover:text-[#d2714e] transition-colors">Our Story</Link>
            <Link href="/contact" className="text-sm font-medium text-zinc-500 hover:text-[#d2714e] transition-colors">Contact</Link>
          </div>

          <div className="flex items-center gap-6 text-[#2b2825]">
            <button 
              onClick={() => setIsSearchOpen(true)}
              className="p-2 hover:bg-zinc-100 rounded-full cursor-pointer transition-colors group"
              aria-label="Search"
            >
              <Search className="w-5 h-5 group-hover:text-[#d2714e] transition-colors" />
            </button>
            
            {session ? (
              <div className="flex items-center gap-4">
                <Link 
                  href={session.user.email === "admin@artisan.com" ? "/admin" : "/dashboard"}
                  className="text-xs font-bold text-[#d2714e] hover:underline uppercase tracking-widest transition-all"
                >
                  {session.user.email === "admin@artisan.com" ? "Admin" : "Dashboard"}
                </Link>
                <button 
                  onClick={() => signOut()}
                  className="text-xs font-bold text-zinc-400 hover:text-[#2b2825] transition-colors uppercase tracking-widest"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <Link href="/login" className="p-2 hover:bg-zinc-100 rounded-full cursor-pointer transition-colors group" aria-label="Account">
                <User className="w-5 h-5 group-hover:text-[#d2714e] transition-colors" />
              </Link>
            )}

            <div className="p-2 hover:bg-zinc-100 rounded-full cursor-pointer transition-colors group relative">
              <ShoppingBag className="w-5 h-5 group-hover:text-[#d2714e] transition-colors" />
              <span className="absolute top-1 right-1 w-4 h-4 bg-[#d2714e] text-white text-[10px] flex items-center justify-center rounded-full font-bold">
                0
              </span>
            </div>
          </div>
        </div>
      </nav>

      <SearchOverlay isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
}
