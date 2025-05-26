"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useCartItem } from "@/context/cartcontext";

export default function PaymentPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { data: session, status } = useSession();
  const { cartItems, clearCart, numberOfCartItems } = useCartItem();

  const [paymentType, setPaymentType] = useState("single"); // "single" or "cart"
  const [singleProduct, setSingleProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    // Check if user is authenticated
    if (status === "unauthenticated") {
      router.push("/api/auth/signin");
      return;
    }

    if (status === "loading") return;

    // Check URL parameters for single product purchase
    const titleParam = searchParams.get("title");
    const priceParam = searchParams.get("price");
    const sourceParam = searchParams.get("source"); // "cart" or "single"

    if (sourceParam === "cart") {
      // Payment from cart
      setPaymentType("cart");
    } else if (titleParam && priceParam) {
      // Single product purchase
      setPaymentType("single");
      setSingleProduct({
        title: titleParam,
        price: Number(priceParam),
        quantity: 1
      });
    } else if (numberOfCartItems > 0) {
      // Default to cart if no specific product but cart has items
      setPaymentType("cart");
    } else {
      // No items to pay for, redirect to home
      router.push("/");
      return;
    }

    setLoading(false);
  }, [searchParams, status, numberOfCartItems, router]);

  const handlePayment = async () => {
    setProcessing(true);
    
    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // If paying for cart items, clear the cart
      if (paymentType === "cart") {
        clearCart();
      }
      
      // Show success message and redirect
      alert("Payment successful! Thank you for your purchase.");
      router.push("/");
      
    } catch (error) {
      alert("Payment failed. Please try again.");
    } finally {
      setProcessing(false);
    }
  };

  const calculateTotal = () => {
    if (paymentType === "single" && singleProduct) {
      return singleProduct.price * singleProduct.quantity;
    } else if (paymentType === "cart") {
      return cartItems.reduce((total, item) => total + (item.price || 0), 0);
    }
    return 0;
  };

  const getItemsCount = () => {
    if (paymentType === "single") return 1;
    return numberOfCartItems;
  };

  if (loading || status === "loading") {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading payment details...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white text-center mb-2">
            Payment Summary
          </h1>
          <p className="text-center text-gray-600 dark:text-gray-400">
            {paymentType === "cart" ? `Checkout ${numberOfCartItems} items from your cart` : "Single item purchase"}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Order Details */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Order Details
            </h2>
            
            <div className="space-y-4">
              {paymentType === "single" && singleProduct ? (
                // Single product display
                <div className="border-b pb-4">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900 dark:text-white">
                        {singleProduct.title}
                      </h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Quantity: {singleProduct.quantity}
                      </p>
                    </div>
                    <span className="font-semibold text-gray-900 dark:text-white">
                      ${singleProduct.price.toFixed(2)}
                    </span>
                  </div>
                </div>
              ) : (
                // Cart items display
                <div className="space-y-3">
                  {cartItems.map((item) => (
                    <div key={item.cart_id} className="flex justify-between items-start border-b pb-3">
                      <div className="flex-1">
                        <h3 className="font-medium text-gray-900 dark:text-white">
                          {item.name}
                        </h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {item.descript?.substring(0, 60)}...
                        </p>
                      </div>
                      <span className="font-semibold text-gray-900 dark:text-white ml-4">
                        ${item.price?.toFixed(2) || '0.00'}
                      </span>
                    </div>
                  ))}
                </div>
              )}

              {/* Total Section */}
              <div className="border-t pt-4 space-y-2">
                <div className="flex justify-between text-gray-600 dark:text-gray-400">
                  <span>Items ({getItemsCount()})</span>
                  <span>${calculateTotal().toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600 dark:text-gray-400">
                  <span>Shipping</span>
                  <span>Free</span>
                </div>
                <div className="flex justify-between text-gray-600 dark:text-gray-400">
                  <span>Tax</span>
                  <span>${(calculateTotal() * 0.1).toFixed(2)}</span>
                </div>
                <hr className="border-gray-300 dark:border-gray-600" />
                <div className="flex justify-between text-xl font-bold text-gray-900 dark:text-white">
                  <span>Total</span>
                  <span>${(calculateTotal() + calculateTotal() * 0.1).toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Payment Method */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Payment Method
            </h2>
            
            <div className="space-y-4">
              {/* Mock payment methods */}
              <div className="space-y-3">
                <label className="flex items-center space-x-3">
                  <input type="radio" name="payment" defaultChecked className="text-blue-600" />
                  <span className="text-gray-700 dark:text-gray-300">Credit/Debit Card</span>
                </label>
                <label className="flex items-center space-x-3">
                  <input type="radio" name="payment" className="text-blue-600" />
                  <span className="text-gray-700 dark:text-gray-300">PayPal</span>
                </label>
                <label className="flex items-center space-x-3">
                  <input type="radio" name="payment" className="text-blue-600" />
                  <span className="text-gray-700 dark:text-gray-300">Bank Transfer</span>
                </label>
              </div>

              {/* Mock card form */}
              <div className="space-y-3 mt-6">
                <input
                  type="text"
                  placeholder="Card Number"
                  className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white"
                />
                <div className="grid grid-cols-2 gap-3">
                  <input
                    type="text"
                    placeholder="MM/YY"
                    className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white"
                  />
                  <input
                    type="text"
                    placeholder="CVV"
                    className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white"
                  />
                </div>
                <input
                  type="text"
                  placeholder="Cardholder Name"
                  className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mt-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={() => router.back()}
              className="flex-1 bg-gray-500 hover:bg-gray-600 text-white font-medium py-3 px-6 rounded-lg transition-colors"
              disabled={processing}
            >
              Back
            </button>
            <button
              onClick={handlePayment}
              disabled={processing}
              className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-medium py-3 px-6 rounded-lg transition-colors flex items-center justify-center"
            >
              {processing ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Processing...
                </>
              ) : (
                `Pay $${(calculateTotal() + calculateTotal() * 0.1).toFixed(2)}`
              )}
            </button>
          </div>
          
          <p className="text-sm text-gray-500 dark:text-gray-400 text-center mt-4">
            By proceeding, you agree to our Terms of Service and Privacy Policy.
          </p>
        </div>
      </div>
    </div>
  );
}