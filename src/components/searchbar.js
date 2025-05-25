"use client";

import { useState, useEffect } from "react";

export default function SearchBar({ onSearch, filters = [] }) {
  const [query, setQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("");

  useEffect(() => {
    // Kalau input dikosongkan, kirim "" ke parent agar bisa load data default
    if (query.trim() === "") {
      onSearch("", selectedFilter);
    }
  }, [query, selectedFilter]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(query.trim(), selectedFilter);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-3xl mx-auto mb-8">
      <div className="flex flex-col md:flex-row items-stretch md:items-center gap-3">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search products, users, etc."
          className="flex-grow py-3 px-4 border rounded-full outline-none bg-white text-black dark:bg-gray-800 dark:text-white"
        />

        {filters.length > 0 && (
          <select
            value={selectedFilter}
            onChange={(e) => setSelectedFilter(e.target.value)}
            className="py-3 px-4 border rounded-full bg-white dark:bg-gray-800 text-black dark:text-white"
          >
            <option value="">All</option>
            {filters.map((filter) => (
              <option key={filter.value} value={filter.value}>
                {filter.label}
              </option>
            ))}
          </select>
        )}

        <button
          type="submit"
          className="bg-yellow-400 text-black py-3 px-6 rounded-full font-medium hover:bg-orange-400 transition"
        >
          Search
        </button>
      </div>
    </form>
  );
}
