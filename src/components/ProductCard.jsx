"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ShoppingBag } from "lucide-react";
import { toast } from "react-hot-toast";

export default function ProductCard({ id, slug, image, tag, name, description, price, originalPrice, discount, category }) {
  const router = useRouter();
  const productSlug = slug || id; // Fallback to ID if no slug
  
  const handleAddToCart = (e) => {
    e.preventDefault(); // Prevent link navigation
    
    // Get existing cart from localStorage
    const existingCart = JSON.parse(localStorage.getItem("cart") || "[]");
    
    // Check if product already in cart
    const existingItemIndex = existingCart.findIndex(item => item.id === id);
    
    if (existingItemIndex > -1) {
      // Update quantity if already exists
      existingCart[existingItemIndex].quantity += 1;
    } else {
      // Add new item to cart
      existingCart.push({
        id,
        name,
        price,
        image,
        category,
        quantity: 1,
      });
    }
    
    // Save to localStorage
    localStorage.setItem("cart", JSON.stringify(existingCart));
    
    // Dispatch custom event to update cart count in Navbar
    window.dispatchEvent(new Event("cartUpdated"));
    
    // Show success message
    toast.success(`Added ${name} to cart!`);
    
    // Redirect to cart page
    setTimeout(() => {
      router.push("/cart");
    }, 500);
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
          
          {/* Discount Badge */}
          {discount && (
            <div className="absolute top-4 left-4 bg-[#d2714e] text-white text-xs font-bold px-3 py-1.5 rounded-full">
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
