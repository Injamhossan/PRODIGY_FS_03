"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "@/redux/slices/cartSlice";
import { toggleWishlist } from "@/redux/slices/wishlistSlice";
import { Heart, ShoppingBag } from "lucide-react";
import { toast } from "react-hot-toast";

export default function ProductCard({ id, slug, image, tag, name, description, price, originalPrice, discount, category }) {
  const router = useRouter();
  const dispatch = useDispatch();
  const productSlug = slug || id; // Fallback to ID if no slug
  
  const wishlistItems = useSelector((state) => state.wishlist.items);
  const isInWishlist = wishlistItems.some((item) => item.id === id);

  const handleAddToCart = (e) => {
    e.preventDefault(); // Prevent link navigation
    dispatch(addToCart({ id, name, price, image, category }));
    toast.success(`Added ${name} to cart!`);
    setTimeout(() => { router.push("/cart"); }, 500);
  };

  const handleToggleWishlist = (e) => {
    e.preventDefault();
    dispatch(toggleWishlist({ id, name, price, image, category }));
    toast.success(isInWishlist ? "Removed from wishlist" : "Added to wishlist");
  };
  
  return (
    <Link href={`/products/${productSlug}`}>
      <motion.div
        whileHover={{ y: -8 }}
        className="group cursor-pointer"
      >
        <div className="relative aspect-square overflow-hidden bg-zinc-100 rounded-3xl mb-4">
          <Image
            src={image}
            alt={name}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-500"
          />
          
          {/* Wishlist Button */}
          <button 
            onClick={handleToggleWishlist}
            className={`absolute top-4 right-4 p-2.5 rounded-full shadow-lg transition-all transform hover:scale-110 z-10 ${
              isInWishlist ? "bg-[#d2714e] text-white" : "bg-white/80 backdrop-blur-md text-zinc-400 hover:text-[#d2714e]"
            }`}
          >
            <Heart className={`w-4 h-4 ${isInWishlist ? "fill-current" : ""}`} />
          </button>

          {/* Discount Badge */}
          {discount && (
            <div className="absolute top-4 left-4 bg-[#d2714e] text-white text-xs font-bold px-3 py-1.5 rounded-full z-10">
              {discount}
            </div>
          )}

          {/* Add to Cart Button - Shows on Hover */}
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            whileHover={{ opacity: 1, y: 0 }}
            onClick={handleAddToCart}
            className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-white text-[#2b2825] px-6 py-3 rounded-2xl font-bold text-sm shadow-lg flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300"
          >
            <ShoppingBag className="w-4 h-4" />
            Add to Cart
          </motion.button>
        </div>

        {/* Category */}
        {category && (
          <p className="text-xs font-bold text-zinc-400 uppercase tracking-widest mb-2">
            {category}
          </p>
        )}

        {/* Product Name */}
        <h3 className="text-lg font-bold text-[#2b2825] mb-1 group-hover:text-[#d2714e] transition-colors line-clamp-1">
          {name}
        </h3>

        {/* Description */}
        {description && (
          <p className="text-sm text-zinc-500 mb-3 line-clamp-2">
            {description}
          </p>
        )}

        {/* Price */}
        <div className="flex items-center gap-2">
          <span className="text-xl font-bold text-[#2b2825]">${price}</span>
          {originalPrice && (
            <span className="text-sm text-zinc-400 line-through">${originalPrice}</span>
          )}
        </div>
      </motion.div>
    </Link>
  );
}
