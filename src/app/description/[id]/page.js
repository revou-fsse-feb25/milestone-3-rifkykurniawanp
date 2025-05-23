"use client";

import { useState, useEffect } from "react";

export default function Description({ params }) {
  const { id } = params;
  const [product, setProduct] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchDataProduct = async () => {
      try {
        setLoading(true);
        const response = await fetch(`https://api.escuelajs.co/api/v1/products/${id}`);
        const data = await response.json();
        if (!response.ok) throw new Error("Failed to fetch product");
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
          <button
            className="bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-700"
            onClick={() => (window.location.href = "/payment")}
          >
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
