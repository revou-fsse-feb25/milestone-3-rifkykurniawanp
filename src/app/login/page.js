// pages/login.tsx
"use client"
import React from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";



const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = () => {
    // e.preventDefault();



    if (email && password) {
    localStorage.setItem("isLoggedIn", "true");
      router.push("/dashboard"); // Replace with your page
    } else {
      setError("Invalid email or password");
    }
  };

  return (
    <div className="bg-pink-200 text-black w-screen h-screen flex flex-col justify-center items-center " >


      <form onSubmit={handleLogin} style={{ width: "300px" }}>
        <h2 style={{ textAlign: "center" }}>Login</h2>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <div style={{ marginBottom: "10px" }}>
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
        <div style={{ marginBottom: "10px" }}>
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
    </div>
  );
};

export default LoginPage;
