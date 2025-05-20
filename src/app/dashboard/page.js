"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';


export default function Dashboard({ isLoggedIn }) {
  const router = useRouter();

  useEffect(() => {
    if (!isLoggedIn) {
      alert('Anda belum login');
      router.push('/login'); // Redirect ke halaman login
    }
  }, [isLoggedIn, router]);

  if (!isLoggedIn) return null; // Jangan render isi dashboard jika belum login

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Dashboard</h1>
      <p>Selamat datang!</p>
    </div>
  );
}