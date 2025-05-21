"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const Register = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const router = useRouter();
    
    return (
        <div>
            <form>
                <h2 className="text-2xl p-3 flex justify-center">Register</h2>
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
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 hover:cursor-pointer">Register</button>



            </form>

            

        </div>
    )

}

export default Register;