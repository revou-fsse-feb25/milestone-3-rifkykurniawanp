"use client";

import { createContext, useContext, useState, useEffect, useCallback } from "react";
import { useSession } from "next-auth/react";

const CartContext = createContext();

export function CartItemProvider({ children }) {
  const { data: session, status } = useSession();
  const [cartItems, setCartItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Load cart items from localStorage when session is ready
  useEffect(() => {
    if (status === "loading") return;
    
    if (status === "authenticated" && session?.user?.role === "customer") {
      try {
        const stored = localStorage.getItem(`cart_${session.user.id}`);
        if (stored) {
          const parsedItems = JSON.parse(stored);
          setCartItems(parsedItems);
        }
      } catch (error) {
        console.error("Error loading cart from localStorage:", error);
        setCartItems([]);
      }
    } else {
      setCartItems([]);
    }
    setIsLoading(false);
  }, [session, status]);

  // Save cart items to localStorage whenever cartItems change
  useEffect(() => {
    if (isLoading) return; // Don't save during initial load
    
    if (session?.user?.role === "customer") {
      try {
        localStorage.setItem(`cart_${session.user.id}`, JSON.stringify(cartItems));
      } catch (error) {
        console.error("Error saving cart to localStorage:", error);
      }
    }
  }, [cartItems, session, isLoading]);

  const toggleCart = useCallback((product) => {
    if (!product || !product.cart_id) {
      console.error("Invalid product or missing cart_id:", product);
      return;
    }

    setCartItems((prevItems) => {
      const existingIndex = prevItems.findIndex((item) => item.cart_id === product.cart_id);
      
      if (existingIndex !== -1) {
        // Remove item from cart
        const newItems = [...prevItems];
        newItems.splice(existingIndex, 1);
        return newItems;
      } else {
        // Add item to cart
        return [...prevItems, { ...product }];
      }
    });
  }, []);

  const isCartItem = useCallback((cart_id) => {
    if (!cart_id) return false;
    return cartItems.some((item) => item.cart_id === cart_id);
  }, [cartItems]);

  const removeFromCart = useCallback((cart_id) => {
    setCartItems((prevItems) => 
      prevItems.filter((item) => item.cart_id !== cart_id)
    );
  }, []);

  const clearCart = useCallback(() => {
    setCartItems([]);
  }, []);

  const value = {
    cartItems,
    toggleCart,
    isCartItem,
    removeFromCart,
    clearCart,
    isCustomer: session?.user?.role === "customer",
    numberOfCartItems: cartItems.length,
    isLoading: status === "loading" || isLoading,
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}

export function useCartItem() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCartItem must be used within a CartItemProvider");
  }
  return context;
}