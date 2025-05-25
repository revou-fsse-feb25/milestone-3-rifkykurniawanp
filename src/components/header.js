"use client";

import Link from "next/link";
import Image from "next/image";
import Navigation from "./navigation";

const Header = () => {
  return (
    <header className="sticky top-0 z-50 bg-white dark:bg-gray-900 shadow-md px-6 py-3 flex items-center justify-between">
      {/* Logo */}
      <Link href="/" className="flex items-center space-x-2">
        <Image
          src="/logo.png"
          alt="Logo"
          width={40}
          height={40}
          className="rounded-full object-contain"
        />
        <span className="text-lg font-semibold text-gray-800 dark:text-white hidden sm:inline">
          Revo Shop
        </span>
      </Link>

      {/* Navigation */}
      <Navigation />
    </header>
  );
};

export default Header;
