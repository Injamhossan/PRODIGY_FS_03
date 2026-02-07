"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import Image from "next/image";
import { motion } from "framer-motion";
import { ShoppingBag, Heart, Share2, Minus, Plus, Star, Check } from "lucide-react";
import { toast } from "react-hot-toast";

export default function ProductDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (params.id) {
      fetchProduct();
    }
  }, [params.id]);

  const fetchProduct = async () => {
    try {
      const res = await fetch(`/api/products/${params.id}`);
      const data = await res.json();
      setProduct(data);

      // Fetch related products from same category
      if (data.categoryId) {
        const relatedRes = await fetch(`/api/products?categoryId=${data.categoryId}`);
        const relatedData = await relatedRes.json();
        setRelatedProducts(relatedData.filter(p => p.id !== data.id).slice(0, 4));
      }
    } catch (error) {
      console.error("Failed to fetch product:", error);
      toast.error("Failed to load product");
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = () => {
    // Get existing cart from localStorage
    const existingCart = JSON.parse(localStorage.getItem("cart") || "[]");
    
    // Check if product already in cart
    const existingItemIndex = existingCart.findIndex(item => item.id === product.id);
    
    if (existingItemIndex > -1) {
      // Update quantity if already exists
      existingCart[existingItemIndex].quantity += quantity;
    } else {
      // Add new item to cart
      existingCart.push({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        category: product.category?.name,
        quantity: quantity,
      });
    }
    
    // Save to localStorage
    localStorage.setItem("cart", JSON.stringify(existingCart));
    
    // Dispatch custom event to update cart count in Navbar
    window.dispatchEvent(new Event("cartUpdated"));
    
    // Show success message
    toast.success(`Added ${quantity} ${product.name} to cart!`);
    
    // Redirect to cart page
    setTimeout(() => {
      router.push("/cart");
    }, 500);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#fafafa] flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-[#d2714e]/20 border-t-[#d2714e] rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-[#fafafa]">
        <Navbar />
        <div className="pt-32 pb-20 text-center">
          <h1 className="text-2xl font-bold text-zinc-400">Product not found</h1>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fafafa]">
      <Navbar />
      <main className="pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-8">
          {/* Product Details Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
            {/* Product Image */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="relative aspect-square bg-zinc-100 rounded-3xl overflow-hidden"
            >
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover"
                priority
              />
              {product.discount && (
                <div className="absolute top-6 left-6 bg-[#d2714e] text-white text-sm font-bold px-4 py-2 rounded-full">
                  {product.discount}
                </div>
              )}
              {product.tag && (
                <div className="absolute top-6 right-6 bg-white text-[#2b2825] text-xs font-bold px-4 py-2 rounded-full uppercase tracking-widest">
                  {product.tag}
                </div>
              )}
            </motion.div>

            {/* Product Info */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex flex-col"
            >
              {/* Category */}
              {product.category && (
                <p className="text-xs font-bold text-zinc-400 uppercase tracking-widest mb-3">
                  {product.category.name}
                </p>
              )}

              {/* Product Name */}
              <h1 className="text-4xl font-bold text-[#2b2825] mb-4">
                {product.name}
              </h1>

              {/* Rating */}
              <div className="flex items-center gap-2 mb-6">
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-[#d2714e] text-[#d2714e]" />
                  ))}
                </div>
                <span className="text-sm text-zinc-500 font-medium">(128 reviews)</span>
              </div>

              {/* Price */}
              <div className="flex items-center gap-4 mb-6">
                <span className="text-4xl font-bold text-[#2b2825]">${product.price}</span>
                {product.originalPrice && (
                  <span className="text-2xl text-zinc-400 line-through">${product.originalPrice}</span>
                )}
              </div>

              {/* Description */}
              <p className="text-zinc-600 leading-relaxed mb-8">
                {product.description || "Elegant Scandinavian-inspired design that combines form and function. Crafted with premium materials for lasting quality and comfort."}
              </p>

              {/* Stock Status */}
              <div className="flex items-center gap-2 mb-6">
                <Check className="w-5 h-5 text-green-500" />
                <span className="text-sm font-bold text-green-500">
                  {product.stock > 0 ? `In Stock (${product.stock} available)` : "Out of Stock"}
                </span>
              </div>

              {/* Quantity Selector */}
              <div className="mb-8">
                <label className="block text-sm font-bold text-[#2b2825] mb-3">Quantity</label>
                <div className="flex items-center gap-4">
                  <div className="flex items-center border border-zinc-200 rounded-2xl overflow-hidden">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="p-4 hover:bg-zinc-50 transition-colors"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="px-6 font-bold text-[#2b2825]">{quantity}</span>
                    <button
                      onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                      className="p-4 hover:bg-zinc-50 transition-colors"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4 mb-8">
                <button
                  onClick={handleAddToCart}
                  disabled={product.stock === 0}
                  className="flex-1 bg-[#d2714e] text-white px-8 py-4 rounded-2xl font-bold text-lg shadow-lg shadow-[#d2714e]/20 hover:scale-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
                >
                  <ShoppingBag className="w-5 h-5" />
                  Add to Cart
                </button>
                <button className="p-4 border border-zinc-200 rounded-2xl hover:bg-zinc-50 transition-colors">
                  <Heart className="w-6 h-6 text-zinc-400" />
                </button>
                <button className="p-4 border border-zinc-200 rounded-2xl hover:bg-zinc-50 transition-colors">
                  <Share2 className="w-6 h-6 text-zinc-400" />
                </button>
              </div>

              {/* Features */}
              <div className="bg-white rounded-3xl p-6 border border-zinc-100">
                <h3 className="text-sm font-bold text-[#2b2825] uppercase tracking-widest mb-4">Features</h3>
                <ul className="space-y-3">
                  <li className="flex items-center gap-3 text-sm text-zinc-600">
                    <Check className="w-4 h-4 text-[#d2714e]" />
                    Premium quality materials
                  </li>
                  <li className="flex items-center gap-3 text-sm text-zinc-600">
                    <Check className="w-4 h-4 text-[#d2714e]" />
                    Handcrafted with attention to detail
                  </li>
                  <li className="flex items-center gap-3 text-sm text-zinc-600">
                    <Check className="w-4 h-4 text-[#d2714e]" />
                    Sustainable and eco-friendly
                  </li>
                  <li className="flex items-center gap-3 text-sm text-zinc-600">
                    <Check className="w-4 h-4 text-[#d2714e]" />
                    Free shipping on orders over $100
                  </li>
                </ul>
              </div>
            </motion.div>
          </div>

          {/* Related Products */}
          {relatedProducts.length > 0 && (
            <div>
              <h2 className="text-3xl font-bold text-[#2b2825] mb-8">You May Also Like</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {relatedProducts.map((relatedProduct) => (
                  <ProductCard
                    key={relatedProduct.id}
                    id={relatedProduct.id}
                    image={relatedProduct.image}
                    tag={relatedProduct.tag}
                    name={relatedProduct.name}
                    description={relatedProduct.description}
                    price={relatedProduct.price}
                    originalPrice={relatedProduct.originalPrice}
                    discount={relatedProduct.discount}
                    category={relatedProduct.category?.name}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
