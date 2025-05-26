"use client";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import SearchBar from "@/components/searchbar";
import CartButton from "@/components/cartbutton";

export default function Home() {
  const { data: session, status } = useSession();
  const isLoggedIn = status === "authenticated";

  const [originalProduct, setOriginalProduct] = useState([]);
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("all");

  // Fetch products
  const fetchDataProduct = async () => {
    setLoading(true);
    try {
      const res = await fetch("https://api.escuelajs.co/api/v1/products");
      const data = await res.json();
      if (!res.ok) throw new Error("Failed to fetch products");
      setOriginalProduct(data);
      setProduct(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDataProduct();
  }, []);

  // Handle search
  const handleSearch = (query) => {
    if (!query) {
      applyFilter(selectedCategory, originalProduct); // reapply current filter
    } else {
      const filtered = originalProduct.filter((item) =>
        item.title.toLowerCase().includes(query.toLowerCase())
      );
      setProduct(filtered);
    }
  };

  // Filter by category
  const applyFilter = (category, source = originalProduct) => {
    if (category === "all") {
      setProduct(source);
    } else {
      const filtered = source.filter(
        (item) => item.category?.name?.toLowerCase() === category
      );
      setProduct(filtered);
    }
  };

  const handleCategoryChange = (e) => {
    const category = e.target.value;
    setSelectedCategory(category);
    applyFilter(category);
  };

  return (
    <div className="bg-amber-100 min-h-screen text-black">
      <br />
      <SearchBar onSearch={handleSearch} />

      {/* Category Filter */}
      <div className="flex justify-center mb-4">
        <select
          onChange={handleCategoryChange}
          value={selectedCategory}
          className="px-4 py-2 rounded border border-gray-300 shadow-sm"
        >
          <option value="all">All Categories</option>
          <option value="clothes">Clothes</option>
          <option value="electronics">Electronics</option>
          <option value="furniture">Furniture</option>
          {/* Tambahkan kategori lain jika perlu */}
        </select>
      </div>

      <main className="flex flex-wrap gap-6 justify-center p-8">
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>Error: {error}</p>
        ) : product.length === 0 ? (
          <p>No products found.</p>
        ) : (
          product.map((item) => (
            <section
              key={item.id}
              className="w-[25rem] bg-white shadow-md rounded-3xl p-5 flex flex-col"
            >
              <img
                src={item?.images?.[0]}
                alt={item?.title}
                className="rounded-xl hover:scale-105 transition-transform mb-4 cursor-pointer"
                onClick={() => (window.location.href = `/description/${item?.id}`)}
              />
              <h1 className="text-lg font-bold">{item?.title}</h1>
              <h3 className="text-xl font-bold">{item?.price}$</h3>
              <p className="my-2 text-justify">{item?.description}</p>
              <div className="flex justify-between mt-auto items-center">
                <div>
                  <h3 className="font-bold">Stock</h3>
                  <p>{item?.stock || 10}</p>
                </div>
                <div className="flex flex-col gap-2">
                  <button
                    className="bg-emerald-400 hover:bg-emerald-600 text-white px-4 py-1 rounded"
                    onClick={() => (window.location.href = `/description/${item?.id}`)}
                  >
                    Detail
                  </button>
                  {isLoggedIn && (
                    <CartButton
                      product={{
                        cart_id: item.id, // This is the key fix - using cart_id instead of id
                        id: item.id,
                        name: item.title, // CartButton expects 'name', not 'title'
                        descript: item.description, // CartButton expects 'descript'
                        price: item.price,
                        images: item.images,
                        stock: item.stock || 10,
                        category: item.category
                      }}
                    />
                  )}
                </div>
              </div>
            </section>
          ))
        )}
      </main>
    </div>
  );
}