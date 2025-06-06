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
        // Add item to cart with default quantity of 1
        return [...prevItems, { ...product, quantity: 1 }];
      }
    });
  }, []);

  const addToCart = useCallback((product, quantity = 1) => {
    if (!product || !product.cart_id) {
      console.error("Invalid product or missing cart_id:", product);
      return;
    }
    
    setCartItems((prevItems) => {
      const existingIndex = prevItems.findIndex((item) => item.cart_id === product.cart_id);
      
      if (existingIndex !== -1) {
        // Update existing item quantity
        const newItems = [...prevItems];
        const currentQuantity = newItems[existingIndex].quantity || 1;
        const newQuantity = currentQuantity + quantity;
        const maxStock = product.stock || 999;
        
        newItems[existingIndex] = {
          ...newItems[existingIndex],
          quantity: Math.min(newQuantity, maxStock)
        };
        return newItems;
      } else {
        // Add new item to cart
        return [...prevItems, { ...product, quantity: Math.max(1, quantity) }];
      }
    });
  }, []);

  const updateCartQuantity = useCallback((cart_id, newQuantity) => {
    if (!cart_id || newQuantity < 0) {
      console.error("Invalid cart_id or quantity:", cart_id, newQuantity);
      return;
    }

    setCartItems((prevItems) => {
      return prevItems.map((item) => {
        if (item.cart_id === cart_id) {
          const maxStock = item.stock || 999;
          const validQuantity = Math.min(Math.max(1, newQuantity), maxStock);
          return {
            ...item,
            quantity: validQuantity
          };
        }
        return item;
      });
    });
  }, []);

  const incrementQuantity = useCallback((cart_id) => {
    setCartItems((prevItems) => {
      return prevItems.map((item) => {
        if (item.cart_id === cart_id) {
          const currentQuantity = item.quantity || 1;
          const maxStock = item.stock || 999;
          const newQuantity = Math.min(currentQuantity + 1, maxStock);
          return {
            ...item,
            quantity: newQuantity
          };
        }
        return item;
      });
    });
  }, []);

  const decrementQuantity = useCallback((cart_id) => {
    setCartItems((prevItems) => {
      return prevItems.map((item) => {
        if (item.cart_id === cart_id) {
          const currentQuantity = item.quantity || 1;
          const newQuantity = Math.max(currentQuantity - 1, 1);
          return {
            ...item,
            quantity: newQuantity
          };
        }
        return item;
      });
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

  const getCartItemQuantity = useCallback((cart_id) => {
    const item = cartItems.find((item) => item.cart_id === cart_id);
    return item ? (item.quantity || 1) : 0;
  }, [cartItems]);

  const getTotalItems = useCallback(() => {
    return cartItems.reduce((total, item) => total + (item.quantity || 1), 0);
  }, [cartItems]);

  const getTotalPrice = useCallback(() => {
    return cartItems.reduce((total, item) => {
      const price = item.price || 0;
      const quantity = item.quantity || 1;
      return total + (price * quantity);
    }, 0);
  }, [cartItems]);

  const value = {
    cartItems,
    toggleCart,
    addToCart,
    updateCartQuantity,
    incrementQuantity,
    decrementQuantity,
    isCartItem,
    removeFromCart,
    clearCart,
    getCartItemQuantity,
    getTotalItems,
    getTotalPrice,
    isCustomer: session?.user?.role === "customer",
    numberOfCartItems: getTotalItems(),
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