"use client";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import SearchBar from "@/components/searchbar";
import CartButton from "@/components/cartbutton"; // Adjust the import path as necessary

export default function Home() {
  const { data: session, status } = useSession(); // ⬅️ gunakan session
  const isLoggedIn = status === "authenticated";

  const [originalProduct, setOriginalProduct] = useState([]);
  const [product, setProduct] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchDataProduct = async () => {
    try {
      setLoading(true);
      const response = await fetch("https://api.escuelajs.co/api/v1/products");
      const data = await response.json();
      if (!response.ok) {
        throw new Error("Failed to fetch products");
      }
      setOriginalProduct(data);
      setProduct(data);
      setError(null);
    } catch (err) {
      setError(err.message);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDataProduct();
  }, []);

  const handleSearch = (query) => {
    if (!query) {
      setProduct(originalProduct);
    } else {
      const filtered = originalProduct.filter((item) =>
        item.title.toLowerCase().includes(query.toLowerCase())
      );
      setProduct(filtered);
    }
  };

  return (
<<<<<<< Updated upstream
<<<<<<< HEAD
    <div className="bg-amber-100">
      <br />
      <SearchBar onSearch={handleSearch} />
=======
    <div className="bg-brown-600 color-scheme: dark">
>>>>>>> main

      <main className="flex flex-row flex-wrap gap-2 justify-center items-center min-h-screen p-[8rem]">
        {loading ? (
          <p className="text-center">Loading...</p>
        ) : (
          product.map((item, index) => (
            <section
              key={index}
              className="flex flex-col w-[25rem] bg-white shadow-50 rounded-3xl min-h-[50rem] text-black"
            >
              <img
                src={item?.images?.[0]}
                className="rounded-t-3xl hover:scale-105 hover:cursor-pointer transform ease-in-out duration-500"
                onClick={() =>
                  (window.location.href = `/description/${item?.id}`)
                }
              />
              <div className="p-5">
                <h1 className="text-lg font-bold">{item?.title}</h1>
                <h3 className="text-xl font-bold">{item?.price}$</h3>
                <p className="my-3 text-justify">{item?.description}</p>
                <div className="flex flex-row justify-between">
                  <div>
                    <h3 className="text-lg font-bold">Stock</h3>
                    <p className="text-lg">{item?.stock || 10}</p>
                  </div>

                  <div className="flex flex-col gap-2">
                  <button
                    className="p-1 rounded-lg bg-emerald-400 hover:bg-emerald-600 hover:cursor-pointer hover:scale-105 w-[4rem]"
                    onClick={() =>
                      (window.location.href = `/description/${item?.id}`)
                    }
                  >
                    Detail
                  </button>

                  {/* ✅ Tampilkan tombol Add to Cart hanya jika user login */}
                {isLoggedIn && (
                  <CartButton
                    product={{
                      id: item.id,
                      price: item.price
                    }}
                  />
                )}

                  </div>
                </div>

                
              </div>
            </section>
          ))
        )}
      </main>
=======
    <div className="text-black bg-yellow-50 color-scheme: dark">

          <main className="flex flex-row flex-wrap gap-2 justify-center items-center min-h-screen p-[8rem] ">
            {product.map ((item, index) => (
                          <section key={index} className="flex flex-col w-[25rem] bg-amber-50 rounded-3xl min-h-[50rem]">
                          <img src = {item?.images?.[0]} className="rounded-t-3xl hover:scale-105 hover:cursor-pointer transform ease-in-out duration-500" onClick={() => window.location.href = `/description/${item?.id}`}/>
                          <div className="p-5">
                              <h1 className="text-lg font-bold">{item?.title}</h1>
                              <h3 className="text-xl font-bold">{item?.price}$</h3>
                              <p className="my-3 text-justify">{item?.description}</p>
                              <div className="flex flex-row justify-between">
                                  <div>
                                      <h3 className="text-sm font-bold">Stock</h3>
                                      <p className="text-sm">{item?.stock}</p>

                                  </div>
                                  <button className="flex flex-col justify-center items-center p-1 rounded-lg text-center w-[4rem] bg-emerald-400 hover:bg-emerald-600 hover:cursor-pointer hover:scale-105" onClick={() => setCount(count + 1, alert("Item added to cart, you have " + count + " items"))}>Buy</button>
                              </div>
                          </div>
                      </section>
            ))}
          </main>
>>>>>>> Stashed changes
    </div>
  );
}
