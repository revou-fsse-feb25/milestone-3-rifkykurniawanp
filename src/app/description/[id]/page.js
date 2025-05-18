"use client";
import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "next/navigation";


export default function Description({params}) {
    const { id } = useParams();
    const [product, setProduct] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

     const fetchDataProduct = async () => {
        try {
          setLoading(true)
          const response = await fetch(`https://api.escuelajs.co/api/v1/products/${id}`);
          const data = await response.json();
          if (!response.ok) {
            throw new Error("Failed to fetch posts")
          }
          setProduct(data );
          setError(null)
          setLoading(false)
        } catch (err) {
          setError(err.message);
          console.log(error);
        }
      }
      useEffect(() => {
        fetchDataProduct();
      }, [])

       if (loading) {
    return <p className="animate-spin rounded-full h-16 w-16 border-t-4 border-green-500 absolute top-1/2 left-1/2">Loading...</p>;
  }


    return <div className="bg-amber-200 flex flex-col bg-a justify-center items-center " >
        <div className="flex flex-col justify-center items-center w-1/2 h-1/2 p-10 text-black">
          <img src={product.images} alt={product.title} className="w-1/2 h-1/2" />
          <br />
          <h1 className="text-4xl font-bold">{product.title}</h1>
          <p className="text-xl p-5">${product.price}</p>
          <p className="text-xl p-5">{product.stock}</p>
          {/* <image src={product.images[0]} width={100} height={100}></image> */}
          <p className="text-xl p-5">{product.description}</p>
          <div className="flex flex-row gap-5">
            <button className="bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-700 hover:cursor-pointer" onClick={() => window.location.href = "/payment"}>Buy Now</button>
            <button className="bg-green-500 text-white p-2 rounded-lg hover:bg-green-700 hover:cursor-pointer">Add to Cart</button>
          </div>
          </div>
    </div>;
}