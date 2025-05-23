"use client";

import { useEffect, useState } from "react";

const dummyProducts = [
  { id: 1, name: "Kaos Polos", price: 75000 },
  { id: 2, name: "Celana Jeans", price: 150000 },
  { id: 3, name: "Jaket Hoodie", price: 200000 },
];

export default function ShoppingPaymentPage() {
  const [username, setUsername] = useState("Pengguna");
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const storedName = localStorage.getItem("username");
    if (storedName) setUsername(storedName);
  }, []);

  useEffect(() => {
    const totalHarga = cart.reduce((sum, item) => sum + item.price, 0);
    setTotal(totalHarga);
  }, [cart]);

  const handleAddToCart = (product) => {
    setCart([...cart, product]);
    setMessage("");
  };

  const handlePayment = (e) => {
    e.preventDefault();

    if (cart.length === 0) {
      setMessage("Keranjang belanja masih kosong.");
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setMessage(`Pembayaran berhasil! Terima kasih, ${username}.`);
      setCart([]);
      setLoading(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-10 flex flex-col items-center">
      <h1 className="text-3xl font-bold text-blue-600 mb-6">Pembayaran Belanja</h1>

      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-2xl mb-6">
        <h2 className="text-xl font-semibold mb-4">Halo, {username}</h2>
        <p className="mb-2">Silakan pilih produk:</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          {dummyProducts.map((product) => (
            <div key={product.id} className="border p-4 rounded shadow-sm">
              <h3 className="font-bold">{product.name}</h3>
              <p className="text-gray-600">Rp{product.price.toLocaleString()}</p>
              <button
                onClick={() => handleAddToCart(product)}
                className="mt-2 w-full bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-700"
              >
                Tambah ke Keranjang
              </button>
            </div>
          ))}
        </div>

        <h3 className="text-lg font-medium mb-2">Keranjang:</h3>
        {cart.length === 0 ? (
          <p className="text-gray-500">Belum ada produk dalam keranjang.</p>
        ) : (
          <ul className="mb-4 list-disc list-inside text-gray-800">
            {cart.map((item, index) => (
              <li key={index}>{item.name} - Rp{item.price.toLocaleString()}</li>
            ))}
          </ul>
        )}

        <p className="font-bold">Total: Rp{total.toLocaleString()}</p>

        <button
          onClick={handlePayment}
          disabled={loading}
          className="mt-4 w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
        >
          {loading ? "Memproses Pembayaran..." : "Bayar Sekarang"}
        </button>

        {message && (
          <div className="mt-4 bg-yellow-100 text-yellow-800 p-2 rounded text-center">
            {message}
          </div>
        )}
      </div>
    </div>
  );
}
