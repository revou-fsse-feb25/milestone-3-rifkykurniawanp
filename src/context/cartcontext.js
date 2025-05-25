"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { useSession } from "next-auth/react";

const CartContext = createContext();

export function CartItemProvider({ children }) {
  const { data: session, status } = useSession();
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    if (status === "authenticated" && session?.user?.role === "customer") {
      const stored = localStorage.getItem(`cart_${session.user.id}`);
      if (stored) {
        setCartItems(JSON.parse(stored));
      }
    } else {
      setCartItems([]);
    }
  }, [session, status]);

  useEffect(() => {
    if (session?.user?.role === "customer") {
      localStorage.setItem(`cart_${session.user.id}`, JSON.stringify(cartItems));
    }
  }, [cartItems, session]);

  const toggleCart = (product) => {
  setCartItems((prev) => {
    const exists = prev.some((item) => item.cart_id === product.cart_id);
    if (exists) {
      return prev.filter((item) => item.cart_id !== product.cart_id);
    } else {
      return [...prev, product];
    }
  });
};

  const isCartItem = (cart_id) => {
    return cartItems.some((item) => item.cart_id === cart_id);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        toggleCart,
        isCartItem,
        isCustomer: session?.user?.role === "customer",
        numberOfCartItems: cartItems.length,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCartItem() {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCartItem must be used within a CartItemProvider");
  return context;
}
