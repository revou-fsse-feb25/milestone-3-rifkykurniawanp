"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { useEffect, useState } from "react";

const Navigation = () => {
  const { data: session, status } = useSession();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [userData, setUserData] = useState(null);

  const toggleDropdown = () => setDropdownOpen((prev) => !prev);

  // Fetch user data berdasarkan email session
  useEffect(() => {
    const fetchUserData = async () => {
      if (session?.user?.email) {
        try {
          const res = await fetch("https://api.escuelajs.co/api/v1/users");
          const users = await res.json();
          const foundUser = users.find(
            (user) => user.email === session.user.email
          );
          setUserData(foundUser);
        } catch (error) {
          console.error("Failed to fetch user data:", error);
        }
      }
    };

    fetchUserData();
  }, [session]);

  const isAdmin = userData?.role === "admin";

  return (
    <nav className="bg-white dark:bg-gray-900 shadow-md p-4 rounded-xl mx-4 mt-4 border dark:border-gray-800 ">
      <div className="max-w-screen-xl mx-auto flex flex-wrap justify-between items-center gap-4">
        {/* Navigation Links */}
        <div className="flex items-center space-x-4">
          <NavLink href="/" label="Home" />
          <NavLink href="/about" label="About" />
          {status === "authenticated" && <NavLink href="/Cart" label="Cart" />}
        </div>

        {/* Auth Controls */}
        <div className="relative flex items-center space-x-4">
          {status === "authenticated" ? (
            <>
              {/* Avatar */}
              <button
                onClick={toggleDropdown}
                className="w-9 h-9 rounded-full border-2 border-amber-400 hover:scale-105 transition-transform"
              >
                <img
                  src={userData?.avatar || session.user.avatar}
                  alt="Avatar"
                  className="w-full h-full object-cover rounded-full"
                />
              </button>

              {/* Dropdown */}
              {dropdownOpen && (
                <div className="absolute top-12 right-0 bg-white dark:bg-gray-800 shadow-xl rounded-md w-48 py-2 border dark:border-gray-700">
                  <div className="px-4 py-2 text-sm text-gray-800 dark:text-gray-200">
                    <p className="font-semibold">
                      {userData?.name || session.user.name}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                      {session.user.email}
                    </p>
                  </div>
                  <hr className="my-1 border-gray-300 dark:border-gray-600" />
                  <LinkItem
                    href={isAdmin ? "/dashboard" : "/profile"}
                    label={isAdmin ? "Dashboard" : "Profile"}
                  />
                  <LinkItem href="/settings" label="Settings" />
                  <button
                    onClick={() => signOut()}
                    className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900"
                  >
                    Sign Out
                  </button>
                </div>
              )}
            </>
          ) : (
            <NavLink href="/login" label="Login" />
          )}
        </div>
      </div>
    </nav>
  );
};

// Reusable NavLink Button
const NavLink = ({ href, label }) => (
  <Link href={href}>
    <span className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 hover:text-amber-600 dark:hover:text-amber-400 transition-colors cursor-pointer">
      {label}
    </span>
  </Link>
);

// Reusable Dropdown Item
const LinkItem = ({ href, label }) => (
  <Link href={href}>
    <span className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer">
      {label}
    </span>
  </Link>
);

export default Navigation;
