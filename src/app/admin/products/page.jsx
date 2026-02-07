"use client";

import { useState, useEffect } from "react";
import { Plus, Search, Filter, Edit, Trash2, X, FolderPlus } from "lucide-react";
import Image from "next/image";
import { toast } from "react-hot-toast";

export default function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    originalPrice: "",
    discount: "",
    image: "",
    categoryId: "",
    stock: "",
    tag: "",
  });

  const [categoryFormData, setCategoryFormData] = useState({
    name: "",
    image: "",
  });

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await fetch("/api/products");
      const data = await res.json();
      setProducts(data);
    } catch (error) {
      toast.error("Failed to fetch products");
    }
  };

  const fetchCategories = async () => {
    try {
      const res = await fetch("/api/categories");
      const data = await res.json();
      setCategories(data);
    } catch (error) {
      toast.error("Failed to fetch categories");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const url = editingProduct ? `/api/products/${editingProduct.id}` : "/api/products";
      const method = editingProduct ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        toast.success(editingProduct ? "Product updated!" : "Product created!");
        setIsModalOpen(false);
        resetForm();
        fetchProducts();
      } else {
        toast.error("Failed to save product");
      }
    } catch (error) {
      toast.error("An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this product?")) return;

    try {
      const res = await fetch(`/api/products/${id}`, { method: "DELETE" });
      if (res.ok) {
        toast.success("Product deleted!");
        fetchProducts();
      } else {
        toast.error("Failed to delete product");
      }
    } catch (error) {
      toast.error("An error occurred");
    }
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      description: product.description || "",
      price: product.price.toString(),
      originalPrice: product.originalPrice?.toString() || "",
      discount: product.discount || "",
      image: product.image,
      categoryId: product.categoryId,
      stock: product.stock.toString(),
      tag: product.tag || "",
    });
    setIsModalOpen(true);
  };

  const resetForm = () => {
    setFormData({
      name: "",
      description: "",
      price: "",
      originalPrice: "",
      discount: "",
      image: "",
      categoryId: "",
      stock: "",
      tag: "",
    });
    setEditingProduct(null);
  };

  const handleCategorySubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/categories", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(categoryFormData),
      });

      if (res.ok) {
        toast.success("Category created!");
        setIsCategoryModalOpen(false);
        setCategoryFormData({ name: "", image: "" });
        fetchCategories();
      } else {
        toast.error("Failed to create category");
      }
    } catch (error) {
      toast.error("An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#2b2825]">Product Management</h1>
          <p className="text-zinc-500 text-sm">Add, edit, or remove products from your store catalogue.</p>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={() => setIsCategoryModalOpen(true)}
            className="flex items-center gap-2 bg-white border border-[#d2714e] text-[#d2714e] px-6 py-3 rounded-2xl font-bold text-sm hover:bg-[#d2714e]/5 transition-all"
          >
            <FolderPlus className="w-5 h-5" />
            Add Category
          </button>
          <button 
            onClick={() => {
              resetForm();
              setIsModalOpen(true);
            }}
            className="flex items-center gap-2 bg-[#d2714e] text-white px-6 py-3 rounded-2xl font-bold text-sm shadow-lg shadow-[#d2714e]/20 hover:scale-105 transition-all"
          >
            <Plus className="w-5 h-5" />
            Add New Product
          </button>
        </div>
      </div>

      <div className="bg-white rounded-3xl border border-zinc-100 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-zinc-50 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="relative w-full sm:w-80">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
            <input 
              type="text" 
              placeholder="Search products..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-zinc-50/50 border border-zinc-100 rounded-xl py-2.5 pl-12 pr-6 outline-none text-sm"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-zinc-50/50">
                <th className="px-6 py-4 text-xs font-bold text-zinc-400 uppercase tracking-widest">Product</th>
                <th className="px-6 py-4 text-xs font-bold text-zinc-400 uppercase tracking-widest">Category</th>
                <th className="px-6 py-4 text-xs font-bold text-zinc-400 uppercase tracking-widest">Price</th>
                <th className="px-6 py-4 text-xs font-bold text-zinc-400 uppercase tracking-widest">Stock</th>
                <th className="px-6 py-4 text-xs font-bold text-zinc-400 uppercase tracking-widest text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-50">
              {filteredProducts.map((product) => (
                <tr key={product.id} className="hover:bg-zinc-50/30 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-zinc-100 overflow-hidden relative">
                        <Image src={product.image} alt={product.name} fill className="object-cover" />
                      </div>
                      <span className="text-sm font-bold text-[#2b2825]">{product.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-xs font-bold bg-zinc-100 text-zinc-500 px-2.5 py-1 rounded-full uppercase tracking-widest">
                      {product.category?.name}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm font-bold text-[#2b2825]">${product.price}</td>
                  <td className="px-6 py-4 text-sm font-medium text-zinc-500">{product.stock} units</td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2">
                      <button 
                        onClick={() => handleEdit(product)}
                        className="p-2 hover:bg-zinc-100 rounded-xl text-zinc-400 hover:text-blue-500 transition-all"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => handleDelete(product.id)}
                        className="p-2 hover:bg-zinc-100 rounded-xl text-zinc-400 hover:text-red-500 transition-all"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div className="p-6 border-t border-zinc-50 flex items-center justify-between">
          <p className="text-xs text-zinc-400 font-bold">Showing {filteredProducts.length} products</p>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-[#2b2825]">
                {editingProduct ? "Edit Product" : "Add New Product"}
              </h2>
              <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-zinc-100 rounded-xl">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-bold text-zinc-700 mb-2">Product Name</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full border border-zinc-200 rounded-xl px-4 py-2.5 outline-none focus:ring-2 focus:ring-[#d2714e]/20"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-zinc-700 mb-2">Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full border border-zinc-200 rounded-xl px-4 py-2.5 outline-none focus:ring-2 focus:ring-[#d2714e]/20 min-h-[100px]"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-zinc-700 mb-2">Price</label>
                  <input
                    type="number"
                    step="0.01"
                    required
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    className="w-full border border-zinc-200 rounded-xl px-4 py-2.5 outline-none focus:ring-2 focus:ring-[#d2714e]/20"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-zinc-700 mb-2">Original Price</label>
                  <input
                    type="number"
                    step="0.01"
                    value={formData.originalPrice}
                    onChange={(e) => setFormData({ ...formData, originalPrice: e.target.value })}
                    className="w-full border border-zinc-200 rounded-xl px-4 py-2.5 outline-none focus:ring-2 focus:ring-[#d2714e]/20"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-zinc-700 mb-2">Stock</label>
                  <input
                    type="number"
                    required
                    value={formData.stock}
                    onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                    className="w-full border border-zinc-200 rounded-xl px-4 py-2.5 outline-none focus:ring-2 focus:ring-[#d2714e]/20"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-zinc-700 mb-2">Category</label>
                  <select
                    required
                    value={formData.categoryId}
                    onChange={(e) => setFormData({ ...formData, categoryId: e.target.value })}
                    className="w-full border border-zinc-200 rounded-xl px-4 py-2.5 outline-none focus:ring-2 focus:ring-[#d2714e]/20"
                  >
                    <option value="">Select Category</option>
                    {categories.map((cat) => (
                      <option key={cat.id} value={cat.id}>{cat.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-zinc-700 mb-2">Image URL</label>
                <input
                  type="url"
                  required
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  className="w-full border border-zinc-200 rounded-xl px-4 py-2.5 outline-none focus:ring-2 focus:ring-[#d2714e]/20"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-zinc-700 mb-2">Discount</label>
                  <input
                    type="text"
                    value={formData.discount}
                    onChange={(e) => setFormData({ ...formData, discount: e.target.value })}
                    className="w-full border border-zinc-200 rounded-xl px-4 py-2.5 outline-none focus:ring-2 focus:ring-[#d2714e]/20"
                    placeholder="e.g., 20% OFF"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-zinc-700 mb-2">Tag</label>
                  <input
                    type="text"
                    value={formData.tag}
                    onChange={(e) => setFormData({ ...formData, tag: e.target.value })}
                    className="w-full border border-zinc-200 rounded-xl px-4 py-2.5 outline-none focus:ring-2 focus:ring-[#d2714e]/20"
                    placeholder="e.g., New, Hot"
                  />
                </div>
              </div>

              <div className="flex gap-4 pt-4">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 px-6 py-3 border border-zinc-200 rounded-2xl font-bold text-zinc-600 hover:bg-zinc-50 transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 px-6 py-3 bg-[#d2714e] text-white rounded-2xl font-bold shadow-lg shadow-[#d2714e]/20 hover:scale-105 transition-all disabled:opacity-50"
                >
                  {loading ? "Saving..." : editingProduct ? "Update Product" : "Create Product"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Category Modal */}
      {isCategoryModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-[#2b2825]">Add New Category</h2>
              <button onClick={() => setIsCategoryModalOpen(false)} className="p-2 hover:bg-zinc-100 rounded-xl">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCategorySubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-bold text-zinc-700 mb-2">Category Name</label>
                <input
                  type="text"
                  required
                  value={categoryFormData.name}
                  onChange={(e) => setCategoryFormData({ ...categoryFormData, name: e.target.value })}
                  className="w-full border border-zinc-200 rounded-xl px-4 py-2.5 outline-none focus:ring-2 focus:ring-[#d2714e]/20"
                  placeholder="e.g., Furniture, Lighting"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-zinc-700 mb-2">Category Image URL (Optional)</label>
                <input
                  type="url"
                  value={categoryFormData.image}
                  onChange={(e) => setCategoryFormData({ ...categoryFormData, image: e.target.value })}
                  className="w-full border border-zinc-200 rounded-xl px-4 py-2.5 outline-none focus:ring-2 focus:ring-[#d2714e]/20"
                  placeholder="https://example.com/image.jpg"
                />
              </div>

              <div className="flex gap-4 pt-4">
                <button
                  type="button"
                  onClick={() => setIsCategoryModalOpen(false)}
                  className="flex-1 px-6 py-3 border border-zinc-200 rounded-2xl font-bold text-zinc-600 hover:bg-zinc-50 transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 px-6 py-3 bg-[#d2714e] text-white rounded-2xl font-bold shadow-lg shadow-[#d2714e]/20 hover:scale-105 transition-all disabled:opacity-50"
                >
                  {loading ? "Creating..." : "Create Category"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
