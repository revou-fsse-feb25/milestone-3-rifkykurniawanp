// import LoginPage from "";
"use client";
import React from "react";
import { useEffect } from "react";


const LogoutButton = () => {
    useEffect(() => {
    if ( localStorage.getItem("isLoggedIn") === "true")
        localStorage.setItem("isLoggedIn", "false");
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("isLoggedIn");
        window.location.href = "/";
    }

    return (
        <a onClick={handleLogout} href={"/"} type="button" className=" bg-green-500 hover:bg-green-700 hover:cursor-pointer text-white font-bold py-2 px-4 rounded">Logout</a>
    );
};

export default LogoutButton;