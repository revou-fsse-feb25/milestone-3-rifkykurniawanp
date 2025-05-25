// /context/cartcontext.js
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
  if (!context) throw new Error("useCartItem must be used within a CartProvider");
  return context;
}







// "use client";

// import { createContext, useState, useContext, useEffect } from "react";
// import { useSession } from "next-auth/react";


// // Create context
// const CartContext = createContext();

// // Create provider component
// export function CartItemProvider({ children }) {
//   const { data: session, status } = useSession();
//   const [cartItems, setCartItems] = useState([]);
//   const [numberOfCartItems, setNumberOfCartItems] = useState(0);

//   // Load liked anime from localStorage on initial render
//   useEffect(() => {
//     if (status === "authenticated" && session?.user?.role === 'customer') {
//       const storedCartItem = localStorage.getItem(`cartItems_${session.user.id}`);
//       if (storedCartItem) {
//         try {
//           const parsed = JSON.parse(cart);
//           setCartItems(parsed);
//           setNumberOfCartItems(parsed.length);
//         } catch (error) {
//           console.error('Error parsing stored cart:', error);
//           setCartItems([]);
//         }
//       }
//     } else {
//         setCartItems([]);
//         setNumberOfCartItems(0);
//     }
//   }, [session, status]);

//     // Save to localStorage whenever cartItems changes
//     useEffect(() => {
//       if (session?.user?.id && session?.user?.role === 'customer') {
//         try {
//           localStorage.setItem(`cartItems_${session.user.id}`, JSON.stringify(cartItems));
//           setNumberOfCartItems(cartItems.length);
//         } catch (error) {
//           console.error('Error saving cart:', error);
//         }
//       }
//     }, [cartItems, session]);

//   // Toggle like status for an anime
//   const toggleCart = (product) => {
//     if (!session?.user?.id || session?.user?.role !== 'customer') {
//       console.log('Only logged-in customers can like products');
//       return;
//     }

//     setCartItems((prevcartItems) => {
//       const isCarted = prevcartItems.some(
//         (item) => item.cart_id === product.cart_id
//       );

//       if (isCarted) {
//         return prevcartItems.filter((item) => item.cart_id !== item.cart_id);
//       } else {
//         return [...prevcartItems, cartItem];
//       }
//     });
//   };

//   // Check if an anime is liked
//   const isCartItem = (cartId) => {
//     if (!session?.user?.id || session?.user?.role !== 'customer') return false;
//     return cartItems.some((cart) => cart.cart_id === cartId);
//   };

//   // Get all liked anime
//   const getAllCartItems = () => {
//     if (!session?.user?.id || session?.user?.role !== 'customer') return [];
//     return cartItems;
//   };

//   // Context value
//   const value = {
//     cartItems,
//     numberOfCartItems,
//     toggleCart,
//     isCartItem,
//     getAllCartItems,
//     numberOfCartItems: cartItems.length,
//     isCustomer: session?.user?.role === 'customer',
//     userId: session?.user?.id
//   };

//   return (
//     <CartContext.Provider value={value}>
//       {children}
//     </CartContext.Provider>
//   );
// }

// // Custom hook to use the context
// export function useCartItem() {
//   const context = useContext(CartContext);
//   if (context === undefined) {
//     throw new Error("useCartItem must be used within a CartProvider");
//   }
//   return context;
// }
