"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function PaymentPage() {
  const searchParams = useSearchParams();

  const [title, setTitle] = useState("");
  const [price, setPrice] = useState(0);
  const quantity = 1;

  useEffect(() => {
    const titleParam = searchParams.get("title");
    const priceParam = searchParams.get("price");

    if (titleParam && priceParam) {
      setTitle(titleParam);
      setPrice(Number(priceParam));
    }
  }, [searchParams]);

  const total = price * quantity;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 space-y-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white text-center">
          Payment Summary
        </h2>
        <div className="space-y-4">
          <div className="flex justify-between text-gray-700 dark:text-gray-300">
            <span>Product</span>
            <span>{title}</span>
          </div>
          <div className="flex justify-between text-gray-700 dark:text-gray-300">
            <span>Price</span>
            <span>${price.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-gray-700 dark:text-gray-300">
            <span>Quantity</span>
            <span>{quantity}</span>
          </div>
          <hr className="border-gray-300 dark:border-gray-600" />
          <div className="flex justify-between font-semibold text-gray-900 dark:text-white">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>
        </div>
        <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded">
          Pay Now
        </button>
        <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
          By proceeding, you agree to our Terms of Service and Privacy Policy.
        </p>
        <div className="text-center">
          <a href="/" className="text-blue-600 hover:underline">
            Back to Home
          </a>  
        </div>

      </div>

      
    </div>
  );
}
