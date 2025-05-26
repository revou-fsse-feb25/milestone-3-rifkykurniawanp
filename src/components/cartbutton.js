"use client";

import { useSession } from "next-auth/react";
import { useCartItem } from "@/context/cartcontext";
import { ShoppingCart } from "lucide-react";
import React, { useMemo } from "react";

const CartButton = ({ product }) => {
  const { toggleCart, isCartItem, isCustomer, isLoading } = useCartItem();
  const { data: session, status } = useSession();

  // Memoize the cart status to prevent unnecessary re-renders
  const isInCart = useMemo(() => {
    return product?.cart_id ? isCartItem(product.cart_id) : false;
  }, [product?.cart_id, isCartItem]);

  // Show loading state
  if (status === "loading" || isLoading) {
    return (
      <div className="flex items-center gap-2 p-2 rounded-full bg-gray-100 dark:bg-zinc-800 animate-pulse">
        <div className="w-6 h-6 bg-gray-300 dark:bg-zinc-600 rounded"></div>
        <div className="w-20 h-4 bg-gray-300 dark:bg-zinc-600 rounded"></div>
      </div>
    );
  }

  // Don't show button if not logged in or not a customer
  if (!session || !isCustomer) {
    return null;
  }

  // Don't show button if product is invalid
  if (!product || !product.cart_id) {
    console.warn("CartButton: Invalid product or missing cart_id:", product);
    return null;
  }

  const handleToggleCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    // Validate session and product before proceeding
    if (!session || !isCustomer || !product?.cart_id) {
      console.warn("Cannot toggle cart: missing requirements");
      return;
    }
    
    toggleCart(product);
  };

  return (
    <button
      onClick={handleToggleCart}
      disabled={isLoading}
      className={`flex items-center gap-2 p-2 rounded-full transition-all duration-200 hover:cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed ${
        isInCart
          ? "bg-green-50 dark:bg-green-900/20 hover:bg-green-100 dark:hover:bg-green-900/30"
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