"use client";

import { useEffect, useState } from "react";
import { useSession, signOut } from "next-auth/react";

export default function ProfilePage() {
  const { data: session, status } = useSession();
  const [user, setUser] = useState(null);
  const [form, setForm] = useState({
    name: "",
    avatar: "",
    password: "",
  });

  const email = session?.user?.email;

  // Fetch user by email
  useEffect(() => {
    const fetchUser = async () => {
      if (!email) return;
      try {
        const res = await fetch("https://api.escuelajs.co/api/v1/users");
        const users = await res.json();
        const foundUser = users.find((u) => u.email === email);
        setUser(foundUser);
        setForm({
          name: foundUser?.name || "",
          avatar: foundUser?.avatar || "",
          password: "", // kosongkan agar tidak terisi otomatis
        });
      } catch (err) {
        console.error("Failed to load user:", err);
      }
    };

    fetchUser();
  }, [email]);

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleUpdate = async () => {
    if (!user) return;
    try {
      const res = await fetch(`https://api.escuelajs.co/api/v1/users/${user.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: form.name,
          avatar: form.avatar,
          password: form.password,
        }),
      });

      const updatedUser = await res.json();
      alert("User updated!");
      setUser(updatedUser);
    } catch (err) {
      console.error("Failed to update user:", err);
    }
  };

  const handleDelete = async () => {
    if (!user) return;
    const confirmDelete = confirm("Are you sure you want to delete your account?");
    if (!confirmDelete) return;

    try {
      await fetch(`https://api.escuelajs.co/api/v1/users/${user.id}`, {
        method: "DELETE",
      });

      alert("User deleted.");
      signOut(); // Logout user setelah akun dihapus
    } catch (err) {
      console.error("Failed to delete user:", err);
    }
  };

  if (status === "loading") return <p>Loading...</p>;
  if (!session) return <p>You must be logged in to view this page.</p>;
  if (!user) return <p>Fetching user data...</p>;

  return (
    <div className="max-w-xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Settings Page</h1>

      <div className="mb-4">
        <label className="block mb-1">Name</label>
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
        />
      </div>

      <div className="mb-4">
        <label className="block mb-1">Avatar URL</label>
        <input
          name="avatar"
          value={form.avatar}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
        />
        {form.avatar && <img src={form.avatar} alt="avatar" className="w-20 h-20 rounded-full mt-2" />}
      </div>

      <div className="mb-4">
        <label className="block mb-1">New Password</label>
        <input
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
        />
      </div>

      <div className="flex space-x-4">
        <button
          onClick={handleUpdate}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Update
        </button>
        <button
          onClick={handleDelete}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Delete Account
        </button>
      </div>
    </div>
  );
}
