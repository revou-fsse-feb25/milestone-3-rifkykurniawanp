'use client'
import React ,{ useState, useEffect } from "react";
import Link from "next/link";
import Header from "@/components/header/header";
import LoginPage from "./login/page";
import { Faculty_Glyphic } from "next/font/google";


export default function Home() {
  const [product, setProduct] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [count, setCount] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  // const [isRouterReady, setIsRouterReady] = useState(false);  

  const getLocalStorage = () => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    console.log(isLoggedIn);
    if (isLoggedIn === "true") {
      setIsLoggedIn(true);
      console.log("sudah login");
    }
  };

  const fetchDataProduct = async () => {
    try {
      setLoading(true)
      const response = await fetch('https://api.escuelajs.co/api/v1/products');
      const data = await response.json();
      if (!response.ok) {
        throw new Error("Failed to fetch posts")
      }
      setProduct(data);
      setError(null)
      setLoading(false)
    } catch (err) {
      setError(err.message);
      console.log(error);
    }
  }
  useEffect(() => {
    getLocalStorage();
    fetchDataProduct();
  }, [])

  // useEffect(() => {
  //   if (Router.isReady) { setIsRouterReady(true); } 
  // }, []);


  console.log(product)
  if (loading) {
    return <p className="animate-spin rounded-full h-16 w-16 border-t-4 border-green-500 absolute top-1/2 left-1/2">Loading...</p>;
  }

  return (
    <div className="bg-amber-100">
         <Header isLogin={isLoggedIn}/>

          <main className="flex flex-row flex-wrap gap-2 justify-center items-center min-h-screen p-[8rem] ">
            {product.map ((item, index) => (
                          <section key={index} className="flex flex-col w-[25rem] bg-white shadow-50 rounded-3xl min-h-[50rem] text-black">
                          <img src = {item?.images?.[0]} className="rounded-t-3xl hover:scale-105 hover:cursor-pointer transform ease-in-out duration-500" onClick={() => window.location.href = `/description/${item?.id}`}/>
                          <div className="p-5">
                              <h1 className="text-lg font-bold">{item?.title}</h1>
                              <h3 className="text-xl font-bold">{item?.price}$</h3>
                              <p className="my-3 text-justify">{item?.description}</p>
                              <div className="flex flex-row justify-between">
                                  <div>
                                      <h3 className="text-lg font-bold">Stock</h3>
                                      <p className="text-lg">{item?.stock}</p>

                                  </div>
                                  <button className="flex flex-col justify-center items-center p-1 rounded-lg text-center w-[4rem] bg-emerald-400 hover:bg-emerald-600 hover:cursor-pointer hover:scale-105" onClick={() => setCount(count + 1, alert("Item added to cart, you have " + count + " items"))}>Buy</button>
                              </div>
                          </div>





                          {/* tambahan bungg */}
                      </section>
            ))}
          </main>
    </div>
  );
}
