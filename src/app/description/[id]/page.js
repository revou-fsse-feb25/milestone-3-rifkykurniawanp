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


    return <div className="bg-amber-200 bg-a h-screen flex flex-col justify-center items-center " >
        <h1 className="text-4xl font-bold">{product.title}</h1>
        {/* <image src={product.images[0]} width={100} height={100}></image> */}
        <p className="text-2xl p-5">{product.description}</p>
    </div>;
}