"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function CartPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    if (status === "authenticated") {
      const storedCart = localStorage.getItem("cart");
      if (storedCart) {
        setCartItems(JSON.parse(storedCart));
      }
    }
  }, [status]);

  const handlePay = (item) => {
    router.push(`/payment?title=${encodeURIComponent(item.title)}&price=${item.price}`);
  };

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  if (status === "unauthenticated") {
    return <p className="text-center mt-10">You must be logged in to view your cart.</p>;
  }

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-6 text-center">Your Cart</h1>
      {cartItems.length === 0 ? (
        <p className="text-center">Your cart is empty.</p>
      ) : (
        <div className="flex flex-col gap-4 max-w-2xl mx-auto">
          {cartItems.map((item, index) => (
            <div key={index} className="bg-white p-4 rounded shadow flex justify-between items-center">
              <div>
                <h2 className="font-semibold">{item.title}</h2>
                <p>${item.price.toFixed(2)}</p>
              </div>
              <button
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
                onClick={() => handlePay(item)}
              >
                Go to Payment
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
