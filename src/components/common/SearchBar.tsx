"use client";

import { Search, X } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";

// Demo data for suggestions
const demoCategories = [
  { id: 1, name: "Home Appliances", image: "/images/categories/appliances.png" },
  { id: 2, name: "Electronics", image: "/images/categories/electronics.png" },
  { id: 3, name: "Fashion", image: "/images/categories/fashion.png" },
  { id: 4, name: "Beauty", image: "/images/categories/beauty.png" },
];

const demoProducts = [
  { id: 1, name: "Air Purifier", category: "Home Appliances", price: 299.99 },
  { id: 2, name: "Hair Dryer", category: "Beauty", price: 49.99 },
  { id: 3, name: "Electric Hair Brush", category: "Beauty", price: 79.99 },
  { id: 4, name: "Refrigerator", category: "Home Appliances", price: 899.99 },
  { id: 5, name: "Iron", category: "Home Appliances", price: 39.99 },
];

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState(demoProducts);
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Implement search functionality here
    console.log("Searching for:", searchQuery);
    setIsOpen(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    setIsOpen(true);

    // Filter products based on search query
    const filtered = demoProducts.filter(product =>
      product.name.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredProducts(filtered);
  };

  return (
    <div ref={searchRef} className="relative w-full max-w-[500px] lg:max-w-[600px]">
      <form onSubmit={handleSearch} className="relative">
        <div className="relative">
          <input
            type="text"
            value={searchQuery}
            onChange={handleInputChange}
            onFocus={() => setIsOpen(true)}
            placeholder="Search for products..."
            className="w-full h-12 pl-4 pr-12 rounded-full border border-input bg-background text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => {
                setSearchQuery("");
                setFilteredProducts(demoProducts);
              }}
              className="absolute right-12 top-0 h-full px-2 flex items-center justify-center text-muted-foreground hover:text-foreground"
            >
              <X className="h-4 w-4" />
            </button>
          )}
          <button
            type="submit"
            className="absolute right-0 top-0 h-full px-4 flex items-center justify-center text-muted-foreground hover:text-foreground"
          >
            <Search className="h-5 w-5" />
          </button>
        </div>
      </form>

      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-white rounded-lg shadow-lg border border-gray-200 max-h-[80vh] overflow-y-auto z-50">
          {/* Categories section */}
          <div className="p-4 border-b">
            <h3 className="text-sm font-semibold text-gray-600 mb-3">Popular Categories</h3>
            <div className="grid grid-cols-2 gap-2">
              {demoCategories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => {
                    setSearchQuery(category.name);
                    setIsOpen(false);
                  }}
                  className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                    {/* Placeholder for category icon */}
                    <Image src={category.image} alt={category.name} width={24} height={24} />
                  </div>
                  <span className="text-sm text-gray-700">{category.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Products section */}
          <div className="p-2">
            {filteredProducts.map((product) => (
              <button
                key={product.id}
                onClick={() => {
                  setSearchQuery(product.name);
                  setIsOpen(false);
                }}
                className="w-full text-left p-2 hover:bg-gray-50 rounded-lg flex items-center justify-between"
              >
                <div className="flex items-center space-x-3">
                  <Search className="h-4 w-4 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-700">{product.name}</p>
                    <p className="text-xs text-gray-500">{product.category}</p>
                  </div>
                </div>
                <span className="text-sm font-medium text-gray-900">${product.price}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
