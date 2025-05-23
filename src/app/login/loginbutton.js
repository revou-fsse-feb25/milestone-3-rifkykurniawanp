// import LoginPage from "";
"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";


const LoginButton = () => {
    const router = useRouter();
    const [isLoggedIn, setIsLoggedIn] = useState(false);



    // useEffect(() => {
    //     const isLoggedIn = localStorage.getItem("isLoggedIn");
    //     console.log(isLoggedIn);
    //     if (isLoggedIn === "true") {
    //         setIsLoggedIn(true);
    //         alert("sudah login");
    //         console.log("sudah login");
    //     }
    // }, []);   

    const handleClick = () => {
        if (isLoggedIn === "true") {
            router.push("/dashboard");
        } else {
            router.push("/login");
        }
    };
       

    return (

        <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 hover:cursor-pointer" onClick={handleClick}>Login</button>
            
        //  <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 hover:cursor-pointer" onClick={() => {isLoggedIn ? router.push("/dashboard") : router.push("/login")}}>Login</button>
    );
};

export default LoginButton;