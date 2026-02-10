"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { CreditCard, Lock, ArrowLeft, Check } from "lucide-react";
import { toast } from "react-hot-toast";

import { useSelector, useDispatch } from "react-redux";
import { clearCart } from "@/redux/slices/cartSlice";

export default function CheckoutPage() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { data: session } = useSession();
  const [loading, setLoading] = useState(false);
  
  // Redux Cart State
  const cartItems = useSelector((state) => state.cart.items);

  const [formData, setFormData] = useState({
    // Contact Information
    email: "",
    phone: "",
    
    // Shipping Address
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    country: "Bangladesh",
    
    // Payment
    cardNumber: "",
    cardName: "",
    expiryDate: "",
    cvv: "",
  });

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = subtotal > 100 ? 0 : 15;
  const tax = subtotal * 0.1; // 10% tax
  const total = subtotal + shipping + tax;

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!session) {
      toast.error("Please login to place an order");
      router.push("/login");
      return;
    }
    
    setLoading(true);

    try {
      // Create order in database
      const orderData = {
        userId: session.user.id,
        items: cartItems.map(item => ({
          productId: item.id,
          quantity: item.quantity,
          price: item.price,
        })),
        total: total,
        shippingAddress: {
          firstName: formData.firstName,
          lastName: formData.lastName,
          address: formData.address,
          city: formData.city,
          state: formData.state,
          zipCode: formData.zipCode,
          country: formData.country,
        },
        contactInfo: {
          email: formData.email,
          phone: formData.phone,
        },
        paymentMethod: "SSLCommerz",
        transactionId: `SSL-${Math.random().toString(36).substring(2, 9).toUpperCase()}`,
      };

      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderData),
      });

      if (res.ok) {
        // Clear cart using Redux
        dispatch(clearCart());
        
        toast.success("Order placed successfully!");
        
        // Redirect to home or orders page
        setTimeout(() => {
          router.push("/");
        }, 1000);
      } else {
        toast.error("Failed to place order");
      }
    } catch (error) {
      console.error("Error placing order:", error);
      toast.error("An error occurred");
    } finally {
      setLoading(false);
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-[#fafafa]">
        <Navbar />
        <main className="pt-32 pb-20">
          <div className="max-w-7xl mx-auto px-8 text-center">
            <h1 className="text-3xl font-bold text-[#2b2825] mb-4">Your cart is empty</h1>
            <p className="text-zinc-500 mb-8">Add some products before checking out!</p>
            <button
              onClick={() => router.push("/products")}
              className="inline-flex items-center gap-2 bg-[#d2714e] text-white px-8 py-4 rounded-2xl font-bold shadow-lg shadow-[#d2714e]/20 hover:scale-105 transition-all"
            >
              <ArrowLeft className="w-5 h-5" />
              Continue Shopping
            </button>
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
          <div className="mb-8">
            <button
              onClick={() => router.back()}
              className="flex items-center gap-2 text-zinc-500 hover:text-[#d2714e] transition-colors font-medium"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Cart
            </button>
          </div>

          <h1 className="text-4xl font-bold text-[#2b2825] mb-12">Checkout</h1>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Checkout Form */}
            <div className="lg:col-span-2">
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Contact Information */}
                <div className="bg-white rounded-3xl p-8 border border-zinc-100 shadow-sm">
                  <h2 className="text-2xl font-bold text-[#2b2825] mb-6">Contact Information</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-bold text-zinc-700 mb-2">Email</label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full border border-zinc-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-[#d2714e]/20"
                        placeholder="you@example.com"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-zinc-700 mb-2">Phone</label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full border border-zinc-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-[#d2714e]/20"
                        placeholder="+880 1234-567890"
                      />
                    </div>
                  </div>
                </div>

                {/* Shipping Address */}
                <div className="bg-white rounded-3xl p-8 border border-zinc-100 shadow-sm">
                  <h2 className="text-2xl font-bold text-[#2b2825] mb-6">Shipping Address</h2>
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-bold text-zinc-700 mb-2">First Name</label>
                        <input
                          type="text"
                          required
                          value={formData.firstName}
                          onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                          className="w-full border border-zinc-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-[#d2714e]/20"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-bold text-zinc-700 mb-2">Last Name</label>
                        <input
                          type="text"
                          required
                          value={formData.lastName}
                          onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                          className="w-full border border-zinc-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-[#d2714e]/20"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-zinc-700 mb-2">Address</label>
                      <input
                        type="text"
                        required
                        value={formData.address}
                        onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                        className="w-full border border-zinc-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-[#d2714e]/20"
                        placeholder="Street address"
                      />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-bold text-zinc-700 mb-2">City</label>
                        <input
                          type="text"
                          required
                          value={formData.city}
                          onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                          className="w-full border border-zinc-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-[#d2714e]/20"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-bold text-zinc-700 mb-2">State</label>
                        <input
                          type="text"
                          required
                          value={formData.state}
                          onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                          className="w-full border border-zinc-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-[#d2714e]/20"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-bold text-zinc-700 mb-2">ZIP Code</label>
                        <input
                          type="text"
                          required
                          value={formData.zipCode}
                          onChange={(e) => setFormData({ ...formData, zipCode: e.target.value })}
                          className="w-full border border-zinc-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-[#d2714e]/20"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Payment Information */}
                <div className="bg-white rounded-3xl p-8 border border-zinc-100 shadow-sm">
                  <div className="flex items-center gap-2 mb-6">
                    <Lock className="w-5 h-5 text-green-500" />
                    <h2 className="text-2xl font-bold text-[#2b2825]">Payment Information</h2>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-bold text-zinc-700 mb-2">Card Number</label>
                      <div className="relative">
                        <input
                          type="text"
                          required
                          value={formData.cardNumber}
                          onChange={(e) => setFormData({ ...formData, cardNumber: e.target.value })}
                          className="w-full border border-zinc-200 rounded-xl px-4 py-3 pl-12 outline-none focus:ring-2 focus:ring-[#d2714e]/20"
                          placeholder="1234 5678 9012 3456"
                          maxLength="19"
                        />
                        <CreditCard className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-zinc-700 mb-2">Cardholder Name</label>
                      <input
                        type="text"
                        required
                        value={formData.cardName}
                        onChange={(e) => setFormData({ ...formData, cardName: e.target.value })}
                        className="w-full border border-zinc-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-[#d2714e]/20"
                        placeholder="John Doe"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-bold text-zinc-700 mb-2">Expiry Date</label>
                        <input
                          type="text"
                          required
                          value={formData.expiryDate}
                          onChange={(e) => setFormData({ ...formData, expiryDate: e.target.value })}
                          className="w-full border border-zinc-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-[#d2714e]/20"
                          placeholder="MM/YY"
                          maxLength="5"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-bold text-zinc-700 mb-2">CVV</label>
                        <input
                          type="text"
                          required
                          value={formData.cvv}
                          onChange={(e) => setFormData({ ...formData, cvv: e.target.value })}
                          className="w-full border border-zinc-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-[#d2714e]/20"
                          placeholder="123"
                          maxLength="4"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-[#d2714e] text-white px-8 py-4 rounded-2xl font-bold text-lg shadow-lg shadow-[#d2714e]/20 hover:scale-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
                >
                  {loading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      Processing...
                    </>
                  ) : (
                    <>
                      <Check className="w-5 h-5" />
                      Place Order - ${total.toFixed(2)}
                    </>
                  )}
                </button>
              </form>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-3xl p-8 border border-zinc-100 shadow-sm sticky top-32">
                <h2 className="text-2xl font-bold text-[#2b2825] mb-6">Order Summary</h2>

                <div className="space-y-4 mb-6 max-h-60 overflow-y-auto">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex gap-3 pb-4 border-b border-zinc-100 last:border-0">
                      <div className="text-sm">
                        <p className="font-bold text-[#2b2825]">{item.name}</p>
                        <p className="text-zinc-400">Qty: {item.quantity}</p>
                      </div>
                      <p className="ml-auto font-bold text-[#2b2825]">${(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                  ))}
                </div>

                <div className="space-y-3 mb-6">
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
                  <div className="flex justify-between text-zinc-600">
                    <span>Tax (10%)</span>
                    <span className="font-bold">${tax.toFixed(2)}</span>
                  </div>
                  <div className="border-t border-zinc-100 pt-3">
                    <div className="flex justify-between text-[#2b2825]">
                      <span className="text-lg font-bold">Total</span>
                      <span className="text-2xl font-bold">${total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                <div className="bg-green-50 rounded-2xl p-4 flex items-start gap-3">
                  <Lock className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-bold text-green-700">Secure Checkout</p>
                    <p className="text-xs text-green-600 mt-1">Your payment information is encrypted and secure</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
