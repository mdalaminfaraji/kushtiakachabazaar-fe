"use client";

import { Search } from "lucide-react";
import { useState } from "react";

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Implement search functionality here
    console.log("Searching for:", searchQuery);
  };

  return (
    <form
      onSubmit={handleSearch}
      className="relative w-full max-w-[500px] lg:max-w-[600px]"
    >
      <div className="relative">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search for products..."
          className="w-full h-10 pl-4 pr-12 rounded-full border border-input bg-background text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        />
        <button
          type="submit"
          className="absolute right-0 top-0 h-full px-4 flex items-center justify-center text-muted-foreground hover:text-foreground"
        >
          <Search className="h-4 w-4" />
        </button>
      </div>
    </form>
  );
};

export default SearchBar;
