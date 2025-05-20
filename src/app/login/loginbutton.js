// import LoginPage from "";
"use client";
import React from "react";
import { useRouter } from "next/navigation";
export default function LoginButton () {

    const router = useRouter();
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    const handleClick = () => {
        if (isLoggedIn) {
            router.push("/dashboard");
            alert("You are already logged in");
        } else {
            router.push("/login");
            alert("You are not logged in");
        }
    }

    return (

        <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 hover:cursor-pointer" onClick={handleClick}>Login</button>


        //  <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 hover:cursor-pointer" onClick={() => {isLoggedIn ? router.push("/dashboard") : router.push("/login")}}>Login</button>
    );
};