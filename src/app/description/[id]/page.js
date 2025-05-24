"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation"; // ambil hook ini

export default function Description() {
  const params = useParams(); // ini akan mengembalikan object { id: "..." }
  const id = params?.id;

  const handleBuyNow = () => {
  const query = new URLSearchParams({
    title: product.title,
    price: product.price.toString(),
  }).toString();

  window.location.href = `/payment?${query}`;
};

  const [product, setProduct] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!id) return; // cegah fetch jika id belum ada

    const fetchDataProduct = async () => {
      try {
        setLoading(true);
        const response = await fetch(`https://api.escuelajs.co/api/v1/products/${id}`);
        if (!response.ok) throw new Error("Failed to fetch product");
        const data = await response.json();
        setProduct(data);
        setError(null);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDataProduct();
  }, [id]);

  if (loading) {
    return (
      <p className="animate-spin rounded-full h-16 w-16 border-t-4 border-green-500 absolute top-1/2 left-1/2">
        Loading...
      </p>
    );
  }

  if (error) return <p>Error: {error}</p>;
  if (!product) return null;

  return (
    <div className="bg-amber-200 flex flex-col justify-center items-center">
      <div className="flex flex-col justify-center items-center w-1/2 h-1/2 p-10 text-black">
        {product.images && (
          <img src={product.images[0]} alt={product.title} className="w-1/2 h-1/2" />
        )}
        <h1 className="text-4xl font-bold mt-4">{product.title}</h1>
        <p className="text-xl p-2">${product.price}</p>
        <p className="text-xl p-2">Stock: {product.stock}</p>
        <p className="text-xl p-2">{product.description}</p>
        <div className="flex flex-row gap-5 mt-4">
          <button className="bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-700" onClick={() => handleBuyNow()}>
            Buy Now
          </button>

          <button className="bg-green-500 text-white p-2 rounded-lg hover:bg-green-700">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
