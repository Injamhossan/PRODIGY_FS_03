"use client";

import { useState, useEffect } from "react";
import { User, Mail, Phone, MapPin, Camera, Save, ArrowLeft, Loader2 } from "lucide-react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { toast } from "react-hot-toast";

export default function ProfilePage() {
  const { data: session, update } = useSession();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    location: "",
  });

  useEffect(() => {
    fetchProfile();
  }, [session]);

  const fetchProfile = async () => {
    try {
      const res = await fetch("/api/user/profile");
      const data = await res.json();
      if (res.ok) {
        setFormData({
          name: data.name || "",
          phone: data.phone || "",
          location: data.location || "",
        });
      }
    } catch (error) {
      console.error("Fetch profile error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const res = await fetch("/api/user/profile", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        toast.success("Profile updated successfully!");
        // Update session to reflect name change if needed
        await update({ ...session, user: { ...session.user, name: formData.name } });
      } else {
        toast.error("Failed to update profile");
      }
    } catch (error) {
      toast.error("An error occurred");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="w-8 h-8 text-[#d2714e] animate-spin" />
      </div>
    );
  }

  return (
    <div className="max-w-4xl">
      <div className="mb-12">
        <h1 className="text-3xl font-bold text-[#2b2825] tracking-tight mb-2">Profile Settings</h1>
        <p className="text-zinc-500 text-sm">Update your personal information and communication preferences.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Profile Info Sidebar */}
        <div className="space-y-8">
          <div className="bg-white p-8 rounded-[2.5rem] border border-zinc-100 shadow-sm text-center">
            <div className="relative w-32 h-32 mx-auto mb-6">
              <div className="w-full h-full rounded-[2.5rem] bg-zinc-100 overflow-hidden ring-4 ring-white shadow-lg">
                <Image 
                  src={`https://ui-avatars.com/api/?name=${formData.name || 'User'}&background=d2714e&color=fff&bold=true&size=200`} 
                  alt="Avatar" 
                  width={128} 
                  height={128} 
                />
              </div>
              <button className="absolute bottom-0 right-0 p-3 bg-[#d2714e] text-white rounded-2xl shadow-xl hover:scale-110 active:scale-90 transition-all border-4 border-white">
                <Camera className="w-4 h-4" />
              </button>
            </div>
            <h2 className="text-xl font-bold text-[#2b2825] truncate">{formData.name || "Artisan"}</h2>
            <p className="text-sm text-zinc-400 font-medium mb-6 truncate">{session?.user?.email}</p>
            <div className="pt-6 border-t border-zinc-50 flex justify-center gap-4">
              <div className="text-center">
                <p className="text-lg font-bold text-[#2b2825]">12</p>
                <p className="text-[10px] text-zinc-400 uppercase font-bold tracking-widest">Orders</p>
              </div>
              <div className="w-px h-8 bg-zinc-100" />
              <div className="text-center">
                <p className="text-lg font-bold text-[#2b2825]">8</p>
                <p className="text-[10px] text-zinc-400 uppercase font-bold tracking-widest">Saved</p>
              </div>
            </div>
          </div>

          <div className="bg-[#2b2825] p-8 rounded-[2.5rem] text-white overflow-hidden relative">
            <div className="relative z-10">
              <h3 className="font-bold text-lg mb-4">Security</h3>
              <p className="text-zinc-400 text-xs mb-6 leading-relaxed">Keep your account safe by updating your password regularly.</p>
              <button className="w-full py-3 bg-white/10 hover:bg-white/20 border border-white/10 rounded-xl font-bold text-xs transition-colors">
                Change Password
              </button>
            </div>
            <div className="absolute top-0 right-0 p-4 opacity-10">
              <User className="w-24 h-24" />
            </div>
          </div>
        </div>

        {/* Edit Form */}
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-white p-10 rounded-[3rem] border border-zinc-100 shadow-sm">
            <h3 className="text-xl font-bold text-[#2b2825] mb-8">Personal Information</h3>
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest ml-1">Full Name</label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-300" />
                    <input 
                      type="text" 
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Enter your name"
                      className="w-full bg-zinc-50 border border-zinc-100 rounded-2xl py-3.5 pl-12 pr-6 focus:bg-white focus:ring-4 focus:ring-[#d2714e]/10 focus:border-[#d2714e] outline-none transition-all text-sm font-medium"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest ml-1">Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-300" />
                    <input 
                      type="email" 
                      defaultValue={session?.user?.email}
                      disabled
                      className="w-full bg-zinc-100 border border-zinc-100 rounded-2xl py-3.5 pl-12 pr-6 text-zinc-400 cursor-not-allowed outline-none text-sm font-medium"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest ml-1">Phone Number</label>
                  <div className="relative">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-300" />
                    <input 
                      type="tel" 
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+1 (555) 000-0000"
                      className="w-full bg-zinc-50 border border-zinc-100 rounded-2xl py-3.5 pl-12 pr-6 focus:bg-white focus:ring-4 focus:ring-[#d2714e]/10 focus:border-[#d2714e] outline-none transition-all text-sm font-medium"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest ml-1">Location</label>
                  <div className="relative">
                    <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-300" />
                    <input 
                      type="text" 
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      placeholder="City, Country"
                      className="w-full bg-zinc-50 border border-zinc-100 rounded-2xl py-3.5 pl-12 pr-6 focus:bg-white focus:ring-4 focus:ring-[#d2714e]/10 focus:border-[#d2714e] outline-none transition-all text-sm font-medium"
                    />
                  </div>
                </div>
              </div>

              <div className="pt-8">
                <button 
                  onClick={handleSave}
                  disabled={saving}
                  className="flex items-center gap-3 px-10 py-4 bg-[#2b2825] text-white rounded-2xl font-bold hover:bg-[#d2714e] hover:shadow-xl transition-all active:scale-95 group disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {saving ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Save className="w-4 h-4 group-hover:scale-110 transition-transform" />
                  )}
                  {saving ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </div>
          </div>

          <div className="bg-white p-10 rounded-[3rem] border border-zinc-100 shadow-sm">
            <h3 className="text-xl font-bold text-[#2b2825] mb-8">Newsletter Preferences</h3>
            <div className="space-y-4">
              {[
                "Receive updates about new arrivals",
                "Product restock notifications",
                "Personalized offers and discounts",
                "Designer stories and inspiration"
              ].map((pref, i) => (
                <label key={i} className="flex items-center gap-4 p-4 bg-zinc-50 rounded-2xl cursor-pointer hover:bg-[#d2714e]/5 transition-colors group">
                  <div className="relative flex items-center">
                    <input type="checkbox" defaultChecked={i < 2} className="peer w-6 h-6 rounded-lg border-2 border-zinc-200 checked:bg-[#d2714e] checked:border-[#d2714e] appearance-none transition-all" />
                    <div className="absolute inset-0 flex items-center justify-center text-white opacity-0 peer-checked:opacity-100 pointer-events-none">
                      <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20"><path d="M0 11l2-2 5 5L18 3l2 2L7 18z"/></svg>
                    </div>
                  </div>
                  <span className="text-sm font-bold text-zinc-600 group-hover:text-[#2b2825] transition-colors">{pref}</span>
                </label>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
