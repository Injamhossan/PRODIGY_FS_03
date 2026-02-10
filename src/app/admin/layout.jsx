"use client";

import { Box, LayoutDashboard, ShoppingBag, Users, Bell, Search, CreditCard } from "lucide-react";
import Image from "next/image";
import logo from "../../assets/Main/logo.svg";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function AdminLayout({ children }) {
  const pathname = usePathname();

  const navItems = [
    { label: "Overview", icon: LayoutDashboard, href: "/admin" },
    { label: "Products", icon: Box, href: "/admin/products" },
    { label: "Orders", icon: ShoppingBag, href: "/admin/orders" },
    { label: "Payments", icon: CreditCard, href: "/admin/payments" },
    { label: "Customers", icon: Users, href: "/admin/customers" },
  ];

  return (
    <div className="min-h-screen bg-[#f8f9fa] flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-zinc-100 p-8 hidden lg:block h-screen sticky top-0">
        <Link href="/" className="inline-block mb-12">
          <Image src={logo} alt="Artisan Logo" width={140} height={60} className="h-8 w-auto" />
        </Link>

        <nav className="space-y-2">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link 
                key={item.href}
                href={item.href}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-sm transition-all duration-200 ${
                  isActive 
                    ? "bg-[#d2714e]/5 text-[#d2714e]" 
                    : "text-zinc-400 hover:text-[#d2714e] hover:bg-[#d2714e]/5"
                }`}
              >
                <item.icon className="w-5 h-5" />
                {item.label}
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-h-screen overflow-hidden">
        {/* Top Navbar */}
        <header className="h-20 bg-white/80 backdrop-blur-md border-b border-zinc-100 px-8 flex justify-between items-center sticky top-0 z-10">
          <div className="relative w-96 hidden md:block">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
            <input 
              type="text" 
              placeholder="Search data, reports, settings..." 
              className="w-full bg-zinc-50/50 border border-zinc-100 rounded-xl py-2.5 pl-12 pr-6 focus:ring-2 focus:ring-[#d2714e]/20 outline-none transition-all text-sm"
            />
          </div>
          
          <div className="flex items-center gap-4">
            <button className="p-2.5 bg-zinc-50 border border-zinc-100 rounded-xl text-zinc-400 hover:text-[#d2714e] relative transition-colors">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white" />
            </button>
            <div className="flex items-center gap-3 pl-4 border-l border-zinc-100">
              <div className="text-right hidden sm:block">
                <p className="text-xs font-bold text-[#2b2825]">Admin User</p>
                <p className="text-[10px] text-zinc-400 font-medium">Store Manager</p>
              </div>
              <div className="w-10 h-10 rounded-xl bg-zinc-100 overflow-hidden ring-2 ring-white shadow-sm border border-zinc-200">
                <Image src="https://ui-avatars.com/api/?name=Admin&background=d2714e&color=fff" alt="Avatar" width={40} height={40} />
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-8 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
