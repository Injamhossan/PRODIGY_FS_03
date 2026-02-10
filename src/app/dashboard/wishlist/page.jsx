"use client";

import { motion } from "framer-motion";
import { Heart, ShoppingBag, Trash2, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { useSelector, useDispatch } from "react-redux";
import { toggleWishlist } from "@/redux/slices/wishlistSlice";
import { addToCart } from "@/redux/slices/cartSlice";
import { toast } from "react-hot-toast";

export default function WishlistPage() {
  const dispatch = useDispatch();
  const wishlistItems = useSelector((state) => state.wishlist.items);

  const handleRemove = (item) => {
    dispatch(toggleWishlist(item));
    toast.success("Removed from wishlist");
  };

  const handleAddToCart = (item) => {
    dispatch(addToCart(item));
    toast.success("Added to cart");
  };

  const handleAddAllToCart = () => {
    wishlistItems.forEach(item => {
      dispatch(addToCart(item));
    });
    toast.success("All items added to cart!");
  };
  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h1 className="text-3xl font-bold text-[#2b2825] tracking-tight mb-2">My Wishlist</h1>
          <p className="text-zinc-500 text-sm">A collection of pieces that caught your eye.</p>
        </div>
        <button 
          onClick={handleAddAllToCart}
          disabled={wishlistItems.length === 0}
          className="px-6 py-3 bg-[#2b2825] text-white rounded-2xl text-sm font-bold flex items-center gap-2 hover:bg-[#3d3a37] transition-all shadow-lg active:scale-95 disabled:opacity-50"
        >
          <ShoppingBag className="w-4 h-4" />
          Add All to Cart
        </button>
      </div>

      {wishlistItems.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {wishlistItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-[2rem] border border-zinc-100 overflow-hidden group hover:shadow-xl hover:shadow-zinc-200/50 transition-all duration-500"
            >
              <div className="relative aspect-[4/5] overflow-hidden">
                <Image 
                  src={item.image} 
                  alt={item.name} 
                  fill 
                  className="object-cover transition-transform duration-700 group-hover:scale-110" 
                />
                <button 
                  onClick={() => handleRemove(item)}
                  className="absolute top-4 right-4 p-2.5 bg-white/80 backdrop-blur-md rounded-full text-zinc-400 hover:text-red-500 transition-colors shadow-sm z-10"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                  <button 
                    onClick={() => handleAddToCart(item)}
                    className="px-6 py-3 bg-white text-[#2b2825] rounded-xl font-bold text-xs transform translate-y-4 group-hover:translate-y-0 transition-all duration-500 shadow-xl active:scale-95"
                  >
                    Quick Add to Cart
                  </button>
                </div>
              </div>
              <div className="p-6">
                <p className="text-[10px] text-zinc-400 font-bold uppercase tracking-widest mb-1">{item.category}</p>
                <h3 className="text-[#2b2825] font-bold text-lg mb-2 group-hover:text-[#d2714e] transition-colors">{item.name}</h3>
                <div className="flex justify-between items-center mt-4">
                  <span className="text-xl font-bold text-[#d2714e]">${item.price}</span>
                  <Link href={`/products/${item.id}`} className="p-2 text-zinc-300 hover:text-[#d2714e] transition-colors">
                    <ArrowRight className="w-5 h-5" />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-[3rem] p-24 text-center border-2 border-dashed border-zinc-100">
          <div className="w-20 h-20 bg-zinc-50 rounded-full flex items-center justify-center mx-auto mb-6">
            <Heart className="w-8 h-8 text-zinc-300" />
          </div>
          <h2 className="text-2xl font-bold text-[#2b2825] mb-2">Your wishlist is empty</h2>
          <p className="text-zinc-400 mb-8 max-w-xs mx-auto">Explore our collection and save some pieces for later inspiration.</p>
          <Link href="/products" className="inline-flex items-center gap-2 px-8 py-4 bg-[#d2714e] text-white rounded-2xl font-bold shadow-lg shadow-[#d2714e]/20 hover:scale-105 transition-all">
            Start Exploring
          </Link>
        </div>
      )}
    </div>
  );
}
