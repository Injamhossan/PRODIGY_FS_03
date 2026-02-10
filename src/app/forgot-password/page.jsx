"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Mail, ArrowRight, ArrowLeft, CheckCircle2 } from "lucide-react";
import logo from "../../assets/Main/logo.svg";
import Image from "next/image";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (res.ok) {
        setIsSent(true);
      } else {
        setError(data.error || "Something went wrong. Please try again.");
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
          
          {isSent ? (
            <>
              <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 className="w-10 h-10 text-green-500" />
              </div>
              <h1 className="text-2xl font-bold text-[#2b2825]">Check your email</h1>
              <p className="text-sm text-zinc-500 mt-2">
                We've sent a password reset link to <br />
                <span className="font-bold text-[#2b2825]">{email}</span>
              </p>
            </>
          ) : (
            <>
              <h1 className="text-2xl font-bold text-[#2b2825]">Forgot Password?</h1>
              <p className="text-sm text-zinc-500 mt-2">No worries, we'll send you reset instructions.</p>
            </>
          )}
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 text-red-600 text-sm rounded-2xl font-medium border border-red-100 text-center">
            {error}
          </div>
        )}

        {!isSent ? (
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-zinc-400">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-zinc-50 border-none rounded-2xl py-4 pl-12 pr-6 focus:ring-2 focus:ring-[#d2714e]/20 transition-all font-medium text-sm"
                  placeholder="Enter your email"
                />
              </div>
            </div>

            <button 
              type="submit"
              disabled={isLoading}
              className={`w-full bg-[#d2714e] text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 transition-all transform active:scale-95 shadow-lg shadow-[#d2714e]/20 ${isLoading ? 'opacity-70 cursor-not-allowed' : 'hover:bg-[#b05a3b]'}`}
            >
              {isLoading ? "Sending..." : "Reset Password"}
              {!isLoading && <ArrowRight className="w-4 h-4" />}
            </button>
          </form>
        ) : (
          <button 
            onClick={() => setIsSent(false)}
            className="w-full py-4 text-zinc-400 font-bold text-sm hover:text-[#2b2825] transition-colors"
          >
            Didn't receive email? Try again
          </button>
        )}

        <div className="mt-10 pt-8 border-t border-zinc-50">
          <Link href="/login" className="flex items-center justify-center gap-2 text-sm font-bold text-zinc-400 hover:text-[#2b2825] transition-colors group">
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back to Sign In
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
