// "use client";
import { useSession } from "next-auth/react";
import { useCartItem } from "@/context/cartcontext"; // Adjust the import path as necessary
import { ShoppingCart } from "lucide-react"; // Ensure you have lucide-react installed
import React from "react";

const CartButton = ({ product }) => {
  const { toggleCart, isCartItem, isCustomer } = useCartItem();
  const { data: session, status } = useSession();
  const isInCart = product ? isCartItem(product.cart_id) : false;

  const handleToggleCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!session || !isCustomer || !product) return;
    toggleCart(product);
  };

  if (status === "loading") {
    return (
      <button
        disabled
        className="flex items-center gap-2 p-2 rounded-full bg-white/80 dark:bg-zinc-800/80 opacity-50"
      >
        <ShoppingCart className="w-6 h-6 stroke-gray-400" />
        <span className="text-gray-500">Loading...</span>
      </button>
    );
  }

  if (!session || !isCustomer) {
    return (
      <button
        disabled
        className="flex items-center gap-2 p-2 rounded-full bg-white/80 dark:bg-zinc-800/80 cursor-not-allowed opacity-70"
      >
        <ShoppingCart className="w-6 h-6 stroke-gray-400 dark:stroke-gray-500" />
        <span className="text-gray-500 dark:text-gray-400 font-medium">
          {!session ? "Login to add cart" : "Customers only"}
        </span>
      </button>
    );
  }

  return (
    <button
      onClick={handleToggleCart}
      className={`flex items-center gap-2 p-2 rounded-full transition-all duration-200 ${
        isInCart
          ? "bg-green-50 dark:bg-green-900/20"
          : "bg-white/80 dark:bg-zinc-800/80 hover:bg-gray-100 dark:hover:bg-zinc-700"
      }`}
      aria-label={isInCart ? "Remove from cart" : "Add to cart"}
    >
      <ShoppingCart
        className={`w-6 h-6 transition-colors duration-200 ${
          isInCart
            ? "fill-green-500 stroke-green-500"
            : "stroke-gray-600 dark:stroke-gray-300"
        }`}
      />
      <span
        className={`font-medium transition-colors duration-200 ${
          isInCart
            ? "text-green-500 dark:text-green-400"
            : "text-gray-700 dark:text-gray-200"
        }`}
      >
        {isInCart ? "In Cart!" : "Add to Cart"}
      </span>
    </button>
  );
};

export default CartButton;
