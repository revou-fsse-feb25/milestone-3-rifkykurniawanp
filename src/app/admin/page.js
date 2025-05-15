"use client";
import React, { useState } from "react";
import Link from "next/link";
// import { useRouter } from "next/navigation";
// import  useRouter from "next/router";

export  default function AdminPage() {

    return (
        <div>
            <header>Admin Page</header>
            <main>
                <h1>This is admin page</h1>
                <Link href="/">Home</Link>
                <Link href="/login">Login</Link>
                <Link href="/dashboard">Dashboard</Link>
                <Link href="/setting">setting</Link>
            </main>
        </div>
    );
}