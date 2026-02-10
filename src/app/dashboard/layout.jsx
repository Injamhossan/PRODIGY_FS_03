"use client";

import { LayoutDashboard, ShoppingBag, Heart, User, LogOut, Search, Bell } from "lucide-react";
import Image from "next/image";
import logo from "../../assets/Main/logo.svg";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";

export default function DashboardLayout({ children }) {
  const pathname = usePathname();
  const { data: session } = useSession();

  const navItems = [
    { label: "Overview", icon: LayoutDashboard, href: "/dashboard" },
    { label: "My Orders", icon: ShoppingBag, href: "/dashboard/orders" },
    { label: "Wishlist", icon: Heart, href: "/dashboard/wishlist" },
    { label: "Profile", icon: User, href: "/dashboard/profile" },
  ];

  return (
    <div className="min-h-screen bg-[#fafafa] flex flex-col md:flex-row">
      {/* Sidebar - Mobile Header */}
      <div className="md:hidden flex items-center justify-between p-4 bg-white border-b border-zinc-100">
        <Link href="/">
          <Image src={logo} alt="Artisan Logo" width={120} height={50} className="h-8 w-auto" />
        </Link>
        <button className="p-2 bg-zinc-50 rounded-lg">
          <User className="w-5 h-5 text-zinc-500" />
        </button>
      </div>

      {/* Sidebar - Desktop */}
      <aside className="w-72 bg-white border-r border-zinc-100 p-8 hidden md:flex flex-col h-screen sticky top-0 overflow-y-auto">
        <Link href="/" className="inline-block mb-12 transform hover:scale-105 transition-transform">
          <Image src={logo} alt="Artisan Logo" width={160} height={80} className="h-10 w-auto" />
        </Link>

        <div className="flex-1">
          <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-[0.2em] mb-6 px-4">Menu</p>
          <nav className="space-y-2">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link 
                  key={item.href}
                  href={item.href}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl font-bold text-sm transition-all duration-300 ${
                    isActive 
                      ? "bg-[#d2714e] text-white shadow-lg shadow-[#d2714e]/20" 
                      : "text-zinc-400 hover:text-[#d2714e] hover:bg-[#d2714e]/5"
                  }`}
                >
                  <item.icon className={`w-5 h-5 ${isActive ? "text-white" : ""}`} />
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* User Info & Logout */}
        <div className="mt-auto pt-8 border-t border-zinc-100">
          <div className="flex items-center gap-3 mb-6 px-2">
            <div className="w-10 h-10 rounded-xl bg-zinc-100 overflow-hidden ring-2 ring-white shadow-sm">
              <Image 
                src={`https://ui-avatars.com/api/?name=${session?.user?.name || 'User'}&background=d2714e&color=fff&bold=true`} 
                alt="Avatar" 
                width={40} 
                height={40} 
              />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold text-[#2b2825] truncate">{session?.user?.name || "Artisan"}</p>
              <p className="text-[10px] text-zinc-400 font-medium truncate">{session?.user?.email}</p>
            </div>
          </div>
          <button 
            onClick={() => signOut({ callbackUrl: "/" })}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl font-bold text-sm text-red-500 hover:bg-red-50 transition-all duration-300"
          >
            <LogOut className="w-5 h-5" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Header - Desktop Only */}
        <header className="h-24 bg-white/50 backdrop-blur-md px-8 hidden md:flex justify-between items-center sticky top-0 z-10 border-b border-transparent hover:border-zinc-100 transition-colors">
          <div className="flex items-center gap-4 text-sm text-zinc-400 font-medium">
            <Link href="/" className="hover:text-[#d2714e] transition-colors">Home</Link>
            <span>/</span>
            <span className="text-[#2b2825] font-bold capitalize">{pathname.split('/').pop() || 'Dashboard'}</span>
          </div>
          
          <div className="flex items-center gap-6">
            <div className="relative group hidden lg:block">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400 group-focus-within:text-[#d2714e] transition-colors" />
              <input 
                type="text" 
                placeholder="Search orders, items..." 
                className="w-64 bg-white border border-zinc-100 rounded-2xl py-2.5 pl-12 pr-6 focus:ring-4 focus:ring-[#d2714e]/10 focus:border-[#d2714e] outline-none transition-all text-sm shadow-sm"
              />
            </div>
            <button className="p-3 bg-white border border-zinc-100 rounded-2xl text-zinc-400 hover:text-[#d2714e] hover:border-[#d2714e]/20 transition-all relative group">
              <Bell className="w-5 h-5 group-hover:scale-110 transition-transform" />
              <span className="absolute top-3 right-3 w-2 h-2 bg-[#d2714e] rounded-full ring-2 ring-white" />
            </button>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-4 md:p-12">
          {children}
        </main>
      </div>
    </div>
  );
}
