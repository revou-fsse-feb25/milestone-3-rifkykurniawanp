"use client";

import { createContext, useState, useContext, useEffect } from "react";
import { useSession } from "next-auth/react";


// Create context
const CartContext = createContext();

// Create provider component
export function CartItemProvider({ children }) {
  const { data: session, status } = useSession();
  const [cartItems, setCartItems] = useState([]);
  const [numberOfCartItems, setNumberOfCartItems] = useState(0);

  // Load liked anime from localStorage on initial render
  useEffect(() => {
    if (status === "authenticated" && session?.user?.role === 'customer') {
      const storedCartItem = localStorage.getItem(`cartItems_${session.user.id}`);
      if (storedCartItem) {
        try {
          const parsed = JSON.parse(cart);
          setCartItems(parsed);
          setNumberOfCartItems(parsed.length);
        } catch (error) {
          console.error('Error parsing stored cart:', error);
          setCartItems([]);
        }
      }
    } else {
        setCartItems([]);
        setNumberOfCartItems(0);
    }
  }, [session, status]);

    // Save to localStorage whenever cartItems changes
    useEffect(() => {
      if (session?.user?.id && session?.user?.role === 'customer') {
        try {
          localStorage.setItem(`cartItems_${session.user.id}`, JSON.stringify(cartItems));
          setNumberOfCartItems(cartItems.length);
        } catch (error) {
          console.error('Error saving cart:', error);
        }
      }
    }, [cartItems, session]);

  // Toggle like status for an anime
  const toggleCart = (product) => {
    if (!session?.user?.id || session?.user?.role !== 'customer') {
      console.log('Only logged-in customers can like products');
      return;
    }

    setCartItems((prevcartItems) => {
      const isCarted = prevcartItems.some(
        (item) => item.cart_id === product.cart_id
      );

      if (isCarted) {
        return prevcartItems.filter((item) => item.cart_id !== item.cart_id);
      } else {
        return [...prevcartItems, cartItem];
      }
    });
  };

  // Check if an anime is liked
  const isCartItem = (cartId) => {
    if (!session?.user?.id || session?.user?.role !== 'customer') return false;
    return cartItems.some((cart) => cart.cart_id === cartId);
  };

  // Get all liked anime
  const getAllCartItems = () => {
    if (!session?.user?.id || session?.user?.role !== 'customer') return [];
    return cartItems;
  };

  // Context value
  const value = {
    cartItems,
    numberOfCartItems,
    toggleCart,
    isCartItem,
    getAllCartItems,
    numberOfCartItems: cartItems.length,
    isCustomer: session?.user?.role === 'customer',
    userId: session?.user?.id
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}

// Custom hook to use the context
export function useCartItem() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCartItem must be used within a CartProvider");
  }
  return context;
}
