"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { motion, AnimatePresence } from "framer-motion";
import { SlidersHorizontal, X, Search } from "lucide-react";

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Filter states
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("newest");
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await fetch("/api/products");
      const data = await res.json();
      setProducts(data);
      
      // Calculate max price for slider
      if (data.length > 0) {
        const maxPrice = Math.max(...data.map(p => p.price));
        setPriceRange([0, Math.ceil(maxPrice)]);
      }
    } catch (error) {
      console.error("Failed to fetch products:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const res = await fetch("/api/categories");
      const data = await res.json();
      setCategories(data);
    } catch (error) {
      console.error("Failed to fetch categories:", error);
    }
  };

  // Filter and sort products
  const filteredProducts = products
    .filter((product) => {
      // Category filter
      if (selectedCategory !== "all" && product.categoryId !== selectedCategory) {
        return false;
      }
      
      // Price filter
      if (product.price < priceRange[0] || product.price > priceRange[1]) {
        return false;
      }
      
      // Search filter
      if (searchTerm && !product.name.toLowerCase().includes(searchTerm.toLowerCase())) {
        return false;
      }
      
      return true;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "price-low":
          return a.price - b.price;
        case "price-high":
          return b.price - a.price;
        case "name":
          return a.name.localeCompare(b.name);
        case "newest":
        default:
          return new Date(b.createdAt) - new Date(a.createdAt);
      }
    });

  const resetFilters = () => {
    setSelectedCategory("all");
    setPriceRange([0, 1000]);
    setSearchTerm("");
    setSortBy("newest");
  };

  return (
    <div className="min-h-screen bg-[#fafafa]">
      <Navbar />
      <main className="pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-[#2b2825] mb-4">All Products</h1>
            <p className="text-zinc-500 max-w-xl mx-auto">
              Explore our full collection of artisan-crafted furniture, lighting, and home decor pieces.
            </p>
          </motion.div>

          {/* Search and Filter Bar */}
          <div className="mb-8 flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Search */}
            <div className="relative w-full md:w-96">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-white border border-zinc-200 rounded-2xl py-3 pl-12 pr-6 outline-none focus:ring-2 focus:ring-[#d2714e]/20 transition-all"
              />
            </div>

            <div className="flex gap-3 w-full md:w-auto">
              {/* Sort */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="flex-1 md:flex-none bg-white border border-zinc-200 rounded-2xl px-4 py-3 outline-none focus:ring-2 focus:ring-[#d2714e]/20 font-medium text-sm"
              >
                <option value="newest">Newest First</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="name">Name: A to Z</option>
              </select>

              {/* Filter Toggle */}
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2 bg-[#d2714e] text-white px-6 py-3 rounded-2xl font-bold text-sm shadow-lg shadow-[#d2714e]/20 hover:scale-105 transition-all"
              >
                <SlidersHorizontal className="w-5 h-5" />
                Filters
              </button>
            </div>
          </div>

          {/* Filter Panel */}
          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="mb-8 bg-white rounded-3xl border border-zinc-100 overflow-hidden"
              >
                <div className="p-8">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-lg font-bold text-[#2b2825]">Filter Products</h3>
                    <button
                      onClick={resetFilters}
                      className="text-sm font-bold text-[#d2714e] hover:underline"
                    >
                      Reset All
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Category Filter */}
                    <div>
                      <label className="block text-sm font-bold text-zinc-700 mb-4">Category</label>
                      <div className="flex flex-wrap gap-2">
                        <button
                          onClick={() => setSelectedCategory("all")}
                          className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${
                            selectedCategory === "all"
                              ? "bg-[#d2714e] text-white shadow-lg shadow-[#d2714e]/20"
                              : "bg-zinc-100 text-zinc-600 hover:bg-zinc-200"
                          }`}
                        >
                          All
                        </button>
                        {categories.map((cat) => (
                          <button
                            key={cat.id}
                            onClick={() => setSelectedCategory(cat.id)}
                            className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${
                              selectedCategory === cat.id
                                ? "bg-[#d2714e] text-white shadow-lg shadow-[#d2714e]/20"
                                : "bg-zinc-100 text-zinc-600 hover:bg-zinc-200"
                            }`}
                          >
                            {cat.name}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Price Range Filter */}
                    <div>
                      <label className="block text-sm font-bold text-zinc-700 mb-4">
                        Price Range: ${priceRange[0]} - ${priceRange[1]}
                      </label>
                      <div className="space-y-4">
                        <input
                          type="range"
                          min="0"
                          max="1000"
                          step="10"
                          value={priceRange[1]}
                          onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                          className="w-full h-2 bg-zinc-200 rounded-lg appearance-none cursor-pointer accent-[#d2714e]"
                        />
                        <div className="flex gap-4">
                          <input
                            type="number"
                            value={priceRange[0]}
                            onChange={(e) => setPriceRange([parseInt(e.target.value), priceRange[1]])}
                            className="w-full border border-zinc-200 rounded-xl px-4 py-2 outline-none focus:ring-2 focus:ring-[#d2714e]/20"
                            placeholder="Min"
                          />
                          <input
                            type="number"
                            value={priceRange[1]}
                            onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                            className="w-full border border-zinc-200 rounded-xl px-4 py-2 outline-none focus:ring-2 focus:ring-[#d2714e]/20"
                            placeholder="Max"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Results Count */}
          <div className="mb-6">
            <p className="text-sm text-zinc-500 font-medium">
              Showing <span className="font-bold text-[#2b2825]">{filteredProducts.length}</span> of{" "}
              <span className="font-bold text-[#2b2825]">{products.length}</span> products
            </p>
          </div>

          {/* Products Grid */}
          {loading ? (
            <div className="text-center py-20">
              <div className="inline-block w-12 h-12 border-4 border-[#d2714e]/20 border-t-[#d2714e] rounded-full animate-spin"></div>
              <p className="mt-4 text-zinc-500 font-medium">Loading products...</p>
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-xl font-bold text-zinc-400 mb-2">No products found</p>
              <p className="text-zinc-500">Try adjusting your filters or search term</p>
              <button
                onClick={resetFilters}
                className="mt-6 px-6 py-3 bg-[#d2714e] text-white rounded-2xl font-bold shadow-lg shadow-[#d2714e]/20 hover:scale-105 transition-all"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <motion.div
              layout
              className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8"
            >
              {filteredProducts.map((product, idx) => (
                <motion.div
                  key={product.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ delay: idx * 0.05 }}
                >
                  <ProductCard
                    id={product.id}
                    slug={product.slug}
                    image={product.image}
                    tag={product.tag}
                    name={product.name}
                    description={product.description}
                    price={product.price}
                    originalPrice={product.originalPrice}
                    discount={product.discount}
                    category={product.category?.name}
                  />
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
