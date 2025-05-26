"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { useSession } from "next-auth/react";
import CartButton from "@/components/cartbutton";

export default function Description() {
  const params = useParams();
  const id = params?.id;
  const { data: session, status } = useSession();
  const isLoggedIn = status === "authenticated";

  const [product, setProduct] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleBuyNow = () => {
    if (!product) return;
    
    const query = new URLSearchParams({
      title: product.title,
      price: product.price.toString(),
      source: 'single'
    }).toString();

    window.location.href = `/payment?${query}`;
  };

  useEffect(() => {
    if (!id) return;

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
        setProduct(null);
      } finally {
        setLoading(false);
      }
    };

    fetchDataProduct();
  }, [id]);

  // Loading state with proper centering
  if (loading) {
    return (
      <div className="bg-amber-200 min-h-screen flex justify-center items-center">
        <div className="flex flex-col items-center gap-4">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-green-500"></div>
          <p className="text-lg font-medium text-gray-700">Loading product details...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="bg-amber-200 min-h-screen flex justify-center items-center">
        <div className="bg-white p-8 rounded-lg shadow-md text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Error</h2>
          <p className="text-gray-700 mb-4">{error}</p>
          <button 
            onClick={() => window.history.back()}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  // No product found
  if (!product) {
    return (
      <div className="bg-amber-200 min-h-screen flex justify-center items-center">
        <div className="bg-white p-8 rounded-lg shadow-md text-center">
          <h2 className="text-2xl font-bold text-gray-700 mb-4">Product Not Found</h2>
          <p className="text-gray-600 mb-4">The product you're looking for doesn't exist.</p>
          <button 
            onClick={() => window.history.back()}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  // Format the product data for CartButton
  const cartProduct = {
    cart_id: product.id,
    id: product.id,
    name: product.title,
    descript: product.description,
    price: product.price,
    images: product.images,
    stock: product.stock || 10,
    category: product.category
  };

  return (
    <div className="bg-amber-200 min-h-screen py-8">
      <div className="container mx-auto px-4">
        {/* Back button */}
        <button 
          onClick={() => window.history.back()}
          className="mb-6 bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition-colors"
        >
          ← Back
        </button>

        <div className="bg-white rounded-lg shadow-lg overflow-hidden max-w-4xl mx-auto">
          <div className="md:flex">
            {/* Product Image */}
            <div className="md:w-1/2">
              {product.images && product.images.length > 0 ? (
                <img 
                  src={product.images[0]} 
                  alt={product.title}
                  className="w-full h-96 md:h-full object-cover"
                  onError={(e) => {
                    e.target.src = '/placeholder-image.jpg'; // Fallback image
                  }}
                />
              ) : (
                <div className="w-full h-96 md:h-full bg-gray-200 flex items-center justify-center">
                  <span className="text-gray-500 text-lg">No image available</span>
                </div>
              )}
            </div>

            {/* Product Details */}
            <div className="md:w-1/2 p-8">
              <div className="space-y-4">
                <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
                  {product.title}
                </h1>
                
                <div className="flex items-center space-x-4">
                  <span className="text-3xl font-bold text-green-600">
                    ${product.price}
                  </span>
                  {product.category && (
                    <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                      {product.category.name}
                    </span>
                  )}
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600 font-medium">Stock Available:</span>
                    <span className={`font-bold ${(product.stock || 10) > 5 ? 'text-green-600' : 'text-orange-600'}`}>
                      {product.stock || 10} units
                    </span>
                  </div>
                </div>

                <div className="border-t pt-4">
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">Description</h3>
                  <p className="text-gray-600 leading-relaxed">
                    {product.description || 'No description available.'}
                  </p>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 pt-6">
                  <button 
                    onClick={handleBuyNow}
                    className="flex-1 bg-blue-500 text-white py-3 px-6 rounded-lg hover:bg-blue-600 transition-colors font-medium"
                  >
                    Buy Now
                  </button>
                  
                  {isLoggedIn && (
                    <div className="flex-1">
                      <CartButton product={cartProduct} />
                    </div>
                  )}
                  
                  {!isLoggedIn && (
                    <div className="flex-1">
                      <button 
                        onClick={() => window.location.href = '/api/auth/signin'}
                        className="w-full bg-gray-500 text-white py-3 px-6 rounded-lg hover:bg-gray-600 transition-colors font-medium"
                      >
                        Login to Add to Cart
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}