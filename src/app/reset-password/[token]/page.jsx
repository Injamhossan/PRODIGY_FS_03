"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { Lock, ArrowRight, CheckCircle2 } from "lucide-react";
import logo from "../../../assets/Main/logo.svg";
import Image from "next/image";

export default function ResetPasswordPage() {
  const { token } = useParams();
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, password }),
      });

      const data = await res.json();

      if (res.ok) {
        setIsSuccess(true);
        setTimeout(() => {
          router.push("/login");
        }, 3000);
      } else {
        setError(data.error || "Failed to reset password. Link may be expired.");
      }
    } catch (err) {
      setError("An unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#fafafa] flex items-center justify-center p-8">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md bg-white rounded-[40px] shadow-sm border border-zinc-100 p-10"
      >
        <div className="text-center mb-10">
          <Link href="/" className="inline-block mb-8">
            <Image src={logo} alt="Artisan Logo" width={180} height={60} className="h-12 w-auto mx-auto" aria-hidden="true" />
          </Link>
          
          {isSuccess ? (
            <>
              <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 className="w-10 h-10 text-green-500" />
              </div>
              <h1 className="text-2xl font-bold text-[#2b2825]">Password updated</h1>
              <p className="text-sm text-zinc-500 mt-2">Your password has been successfully reset. Redirecting to login...</p>
            </>
          ) : (
            <>
              <h1 className="text-2xl font-bold text-[#2b2825]">Set new password</h1>
              <p className="text-sm text-zinc-500 mt-2">Must be at least 8 characters.</p>
            </>
          )}
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 text-red-600 text-sm rounded-2xl font-medium border border-red-100 text-center">
            {error}
          </div>
        )}

        {!isSuccess && (
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-zinc-400">New Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
                <input
                  type="password"
                  required
                  autoFocus
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-zinc-50 border-none rounded-2xl py-4 pl-12 pr-6 focus:ring-2 focus:ring-[#d2714e]/20 transition-all font-medium text-sm"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-zinc-400">Confirm Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
                <input
                  type="password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full bg-zinc-50 border-none rounded-2xl py-4 pl-12 pr-6 focus:ring-2 focus:ring-[#d2714e]/20 transition-all font-medium text-sm"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <button 
              type="submit"
              disabled={isLoading}
              className={`w-full bg-[#d2714e] text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 transition-all transform active:scale-95 shadow-lg shadow-[#d2714e]/20 ${isLoading ? 'opacity-70 cursor-not-allowed' : 'hover:bg-[#b05a3b]'}`}
            >
              {isLoading ? "Updating..." : "Reset Password"}
              {!isLoading && <ArrowRight className="w-4 h-4" />}
            </button>
          </form>
        )}
      </motion.div>
    </div>
  );
}
