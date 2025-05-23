// pages/login.tsx
"use client"
import React from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";




const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  


  const handleLogin = (e) => {
    e.preventDefault();
    // Simulate a login process
    // In a real application, you would send a request to your server here
    // For demonstration, we'll just check if the email and password are not empty
    setEmail("");
    setPassword("");



    if (email && password) {
    localStorage.setItem("isLoggedIn", "true");
      router.push("/dashboard"); // Replace with your page
    } else {
      setError("Invalid email or password");
    }
  };

  return (
    <div className="bg-pink-200 text-black w-screen h-screen flex flex-col justify-center items-center " >


      <form className="text-black" onSubmit={handleLogin}>
        <h2 className="text-2xl p-3 flex justify-center">Login</h2>
        {error && <p className="text-red-500 ">{error}</p>}
        <div className="mb-4 p-1 ">
          <label>Email:</label>
          <input
            className="bg-white text-black rounded-lg shadow-sm placeholder-gray-500"
            placeholder="Enter your email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{ width: "100%", padding: "8px" }}
          />
        </div>
        <div className="mb-4 p-1 ">
          <label>Password:</label>
          <input
          className="bg-white text-black rounded-lg shadow-sm placeholder-gray-500"
            placeholder="Enter your password"

            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{ width: "100%", padding: "8px" }}
          />
        </div>
        <button
          type="submit"
          style={{
            width: "100%",
            padding: "10px",
            backgroundColor: "#0070f3",
            color: "white",
            border: "none",
            cursor: "pointer",
          }}
        >
          Login
        </button>
      </form>
      <div className="flex flex-row justify-center items-center mt-4">
        <p className="text-black">Don't have an account?</p>
        <button
          onClick={() => router.push("/registrasi")}
          type="button"
          className="text-blue-500 ml-2 hover:underline hover:cursor-pointer"
        >
          Register
        </button>
      </div>
    </div>
  );
};

export default LoginPage;

