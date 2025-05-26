"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useCartItem } from "@/context/cartcontext";
import CartButton from "@/components/cartbutton";

const CartPage = () => {
  const { cartItems, numberOfCartItems, isLoading, isCustomer } = useCartItem();
  const router = useRouter();

  const handleCheckout = () => {
    if (numberOfCartItems === 0) return;
    
    const query = new URLSearchParams({
      source: 'cart'
    }).toString();
    
    router.push(`/payment?${query}`);
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + (item.price || 0), 0);
  };

  if (isLoading) {
    return (
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">Your Cart</h1>
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="border p-4 rounded animate-pulse">
              <div className="flex justify-between items-center">
                <div className="space-y-2">
                  <div className="h-4 bg-gray-300 rounded w-32"></div>
                  <div className="h-3 bg-gray-200 rounded w-48"></div>
                  <div className="h-4 bg-gray-300 rounded w-16"></div>
                </div>
                <div className="h-10 bg-gray-200 rounded w-24"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (!isCustomer) {
    return (
      <div className="p-6 text-center">
        <h1 className="text-2xl font-bold mb-4">Your Cart</h1>
        <p className="text-gray-500">Please log in as a customer to view your cart.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Your Cart</h1>
            <button
              onClick={() => router.push("/")}
              className="text-blue-600 hover:text-blue-800 dark:text-blue-400"
            >
              Continue Shopping
            </button>
          </div>

          {numberOfCartItems === 0 ? (
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-12 text-center">
              <div className="mb-6">
                <svg className="mx-auto h-24 w-24 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
              </div>
              <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Your cart is empty
              </h2>
              <p className="text-gray-500 dark:text-gray-400 mb-6">
                Add some products to get started!
              </p>
              <button
                onClick={() => router.push("/")}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
              >
                Start Shopping
              </button>
            </div>
          ) : (
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Cart Items */}
              <div className="lg:col-span-2 space-y-4">
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md">
                  <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                      Cart Items ({numberOfCartItems})
                    </h2>
                  </div>
                  
                  <div className="divide-y divide-gray-200 dark:divide-gray-700">
                    {cartItems.map((item) => (
                      <div key={item.cart_id} className="p-6">
                        <div className="flex items-start space-x-4">
                          {/* Product Image */}
                          <div className="flex-shrink-0">
                            {item.images && item.images[0] ? (
                              <img
                                src={item.images[0]}
                                alt={item.name}
                                className="w-20 h-20 rounded-lg object-cover"
                                onError={(e) => {
                                  e.target.src = '/placeholder-image.jpg';
                                }}
                              />
                            ) : (
                              <div className="w-20 h-20 bg-gray-200 dark:bg-gray-700 rounded-lg flex items-center justify-center">
                                <span className="text-gray-400 text-xs">No image</span>
                              </div>
                            )}
                          </div>

                          {/* Product Details */}
                          <div className="flex-1 min-w-0">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                              {item.name}
                            </h3>
                            <p className="text-sm text-gray-500 dark:text-gray-400 mb-2 line-clamp-2">
                              {item.descript}
                            </p>
                            <div className="flex items-center justify-between">
                              <span className="text-xl font-bold text-green-600 dark:text-green-400">
                                ${item.price?.toFixed(2) || '0.00'}
                              </span>
                              <CartButton product={item} />
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Order Summary */}
              <div className="lg:col-span-1">
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 sticky top-6">
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
                    Order Summary
                  </h2>
                  
                  <div className="space-y-4">
                    <div className="flex justify-between text-gray-600 dark:text-gray-400">
                      <span>Subtotal ({numberOfCartItems} items)</span>
                      <span>${calculateTotal().toFixed(2)}</span>
                    </div>
                    
                    <div className="flex justify-between text-gray-600 dark:text-gray-400">
                      <span>Shipping</span>
                      <span className="text-green-600 dark:text-green-400">Free</span>
                    </div>
                    
                    <div className="flex justify-between text-gray-600 dark:text-gray-400">
                      <span>Tax (estimated)</span>
                      <span>${(calculateTotal() * 0.1).toFixed(2)}</span>
                    </div>
                    
                    <hr className="border-gray-300 dark:border-gray-600" />
                    
                    <div className="flex justify-between text-xl font-bold text-gray-900 dark:text-white">
                      <span>Total</span>
                      <span>${(calculateTotal() + calculateTotal() * 0.1).toFixed(2)}</span>
                    </div>
                  </div>
                  
                  <button
                    onClick={handleCheckout}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg mt-6 transition-colors"
                  >
                    Proceed to Checkout
                  </button>
                  
                  <p className="text-xs text-gray-500 dark:text-gray-400 text-center mt-4">
                    Free shipping on all orders
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CartPage;