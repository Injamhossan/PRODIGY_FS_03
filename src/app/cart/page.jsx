"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight } from "lucide-react";
import { toast } from "react-hot-toast";

export default function CartPage() {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    // Load cart from localStorage
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
    }
  }, []);

  const updateCart = (newCart) => {
    setCartItems(newCart);
    localStorage.setItem("cart", JSON.stringify(newCart));
    // Dispatch custom event to update cart count in Navbar
    window.dispatchEvent(new Event("cartUpdated"));
  };

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity < 1) return;
    
    const updatedCart = cartItems.map(item =>
      item.id === productId ? { ...item, quantity: newQuantity } : item
    );
    updateCart(updatedCart);
  };

  const removeItem = (productId) => {
    const updatedCart = cartItems.filter(item => item.id !== productId);
    updateCart(updatedCart);
    toast.success("Item removed from cart");
  };

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = subtotal > 100 ? 0 : 15;
  const total = subtotal + shipping;

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-[#fafafa]">
        <Navbar />
        <main className="pt-32 pb-20">
          <div className="max-w-7xl mx-auto px-8 text-center">
            <ShoppingBag className="w-20 h-20 text-zinc-300 mx-auto mb-6" />
            <h1 className="text-3xl font-bold text-[#2b2825] mb-4">Your cart is empty</h1>
            <p className="text-zinc-500 mb-8">Add some products to get started!</p>
            <Link
              href="/products"
              className="inline-flex items-center gap-2 bg-[#d2714e] text-white px-8 py-4 rounded-2xl font-bold shadow-lg shadow-[#d2714e]/20 hover:scale-105 transition-all"
            >
              Continue Shopping
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fafafa]">
      <Navbar />
      <main className="pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-8">
          <h1 className="text-4xl font-bold text-[#2b2825] mb-12">Shopping Cart</h1>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {cartItems.map((item) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="bg-white rounded-3xl p-6 border border-zinc-100 shadow-sm"
                >
                  <div className="flex gap-6">
                    {/* Product Image */}
                    <div className="relative w-24 h-24 bg-zinc-100 rounded-2xl overflow-hidden flex-shrink-0">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover"
                      />
                    </div>

                    {/* Product Info */}
                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="text-lg font-bold text-[#2b2825] mb-1">{item.name}</h3>
                          {item.category && (
                            <p className="text-xs text-zinc-400 uppercase tracking-widest">{item.category}</p>
                          )}
                        </div>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="p-2 hover:bg-zinc-100 rounded-xl text-zinc-400 hover:text-red-500 transition-all"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="flex justify-between items-center mt-4">
                        {/* Quantity Selector */}
                        <div className="flex items-center border border-zinc-200 rounded-xl overflow-hidden">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="p-2 hover:bg-zinc-50 transition-colors"
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="px-4 font-bold text-[#2b2825]">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="p-2 hover:bg-zinc-50 transition-colors"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>

                        {/* Price */}
                        <div className="text-right">
                          <p className="text-xl font-bold text-[#2b2825]">${(item.price * item.quantity).toFixed(2)}</p>
                          <p className="text-sm text-zinc-400">${item.price} each</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-3xl p-8 border border-zinc-100 shadow-sm sticky top-32">
                <h2 className="text-2xl font-bold text-[#2b2825] mb-6">Order Summary</h2>

                <div className="space-y-4 mb-6">
                  <div className="flex justify-between text-zinc-600">
                    <span>Subtotal</span>
                    <span className="font-bold">${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-zinc-600">
                    <span>Shipping</span>
                    <span className="font-bold">
                      {shipping === 0 ? "FREE" : `$${shipping.toFixed(2)}`}
                    </span>
                  </div>
                  {subtotal < 100 && (
                    <p className="text-xs text-zinc-400">
                      Add ${(100 - subtotal).toFixed(2)} more for free shipping!
                    </p>
                  )}
                  <div className="border-t border-zinc-100 pt-4">
                    <div className="flex justify-between text-[#2b2825]">
                      <span className="text-lg font-bold">Total</span>
                      <span className="text-2xl font-bold">${total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                <Link
                  href="/checkout"
                  className="block w-full bg-[#d2714e] text-white px-8 py-4 rounded-2xl font-bold text-lg shadow-lg shadow-[#d2714e]/20 hover:scale-105 transition-all mb-4 text-center"
                >
                  Proceed to Checkout
                </Link>

                <Link
                  href="/products"
                  className="block text-center text-[#d2714e] font-bold hover:underline"
                >
                  Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
