"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { Mail, Lock, ArrowRight, Github } from "lucide-react";
import logo from "../../assets/Main/logo.svg";
import Image from "next/image";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (res?.error) {
        setError("Invalid email or password");
      } else {
        router.push("/");
        router.refresh();
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
          <h1 className="text-2xl font-bold text-[#2b2825]">Welcome Back</h1>
          <p className="text-sm text-zinc-500 mt-2">Sign in to your account</p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 text-red-600 text-sm rounded-2xl font-medium border border-red-100">
            {error}
          </div>
        )}

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
                placeholder="admin@artisan.com"
              />
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label className="text-xs font-bold uppercase tracking-widest text-zinc-400">Password</label>
              <a href="#" className="text-xs font-bold text-[#d2714e] hover:underline">Forgot?</a>
            </div>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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
            {isLoading ? "Signing In..." : "Sign In"}
            {!isLoading && <ArrowRight className="w-4 h-4" />}
          </button>
        </form>

        <div className="mt-8 flex items-center gap-4">
          <div className="flex-1 h-[1px] bg-zinc-100"></div>
          <span className="text-xs text-zinc-400 font-bold uppercase tracking-widest">Or continue with</span>
          <div className="flex-1 h-[1px] bg-zinc-100"></div>
        </div>

        <div className="mt-8 grid grid-cols-2 gap-4">
          <button 
            onClick={() => signIn("google")}
            className="flex items-center justify-center gap-2 py-4 border border-zinc-100 rounded-2xl hover:bg-zinc-50 transition-colors font-medium text-sm text-[#2b2825]"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            Google
          </button>
          <button 
            onClick={() => signIn("github")}
            className="flex items-center justify-center gap-2 py-4 border border-zinc-100 rounded-2xl hover:bg-zinc-50 transition-colors font-medium text-sm text-[#2b2825]"
          >
            <Github className="w-4 h-4" />
            Github
          </button>
        </div>

        <p className="text-center mt-10 text-sm text-zinc-500">
          Don't have an account? <Link href="/signup" className="text-[#d2714e] font-bold hover:underline">Sign Up</Link>
        </p>
      </motion.div>
    </div>
  );
}

