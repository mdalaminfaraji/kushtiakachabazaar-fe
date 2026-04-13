"use client";

import React, { useState, useEffect } from "react";
import { products } from "@/data/products";
import ProductCard from "@/components/shared/product-card";
import FilterSidebar from "@/components/products/filter-sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { ShoppingCart, Search, SlidersHorizontal, LayoutGrid, List as ListIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Product } from "@/types";

const AllProductsPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [sortBy, setSortBy] = useState("featured");
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);
  const [priceRange, setPriceRange] = useState({ min: 0, max: 10000 });
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [inStockOnly, setInStockOnly] = useState<boolean | null>(null);

  useEffect(() => {
    let filtered = products.filter(
      (product) =>
        product.name_bn.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description_bn
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Filter by Price
    filtered = filtered.filter(
      (product) =>
        (product.discountPrice || product.price) >= priceRange.min &&
        (product.discountPrice || product.price) <= priceRange.max
    );

    // Filter by Category
    if (selectedCategory) {
      filtered = filtered.filter(
        (product) => 
          product.categoryId === selectedCategory || 
          product.subCategoryId === selectedCategory || 
          product.childCategoryId === selectedCategory
      );
    }

    // Filter by Availability
    if (inStockOnly) {
      filtered = filtered.filter((product) => product.inStock);
    }

    const sorted = [...filtered];

    switch (sortBy) {
      case "price-low":
        sorted.sort(
          (a, b) => (a.discountPrice || a.price) - (b.discountPrice || b.price)
        );
        break;
      case "price-high":
        sorted.sort(
          (a, b) => (b.discountPrice || b.price) - (a.discountPrice || a.price)
        );
        break;
      case "newest":
        // Assuming we would have a date field in real products
        break;
      case "featured":
      default:
        // Default sort for featured products
        break;
    }

    setFilteredProducts(sorted);
  }, [searchTerm, sortBy, priceRange, selectedCategory, inStockOnly]);

  return (
    <div className="container mx-auto px-4 py-8">
      <Breadcrumb className="mb-6">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">হোম</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>সকল পণ্য</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar for Desktop */}
        <div className="lg:block hidden space-y-6">
          <FilterSidebar 
            activeCategoryId={selectedCategory}
            priceRange={priceRange}
            inStockOnly={inStockOnly}
            onCategoryChange={setSelectedCategory}
            onPriceChange={(min, max) => setPriceRange({ min, max })}
            onAvailabilityChange={setInStockOnly}
          />
        </div>

        {/* Products Section */}
        <div className="lg:col-span-3">
          <h1 className="text-3xl font-bold mb-6">সকল পণ্য</h1>

          {/* Search and Filter Bar */}
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-grow">
              <Input
                type="text"
                placeholder="পণ্য খুঁজুন..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            </div>
            <div className="flex gap-2">
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="সাজান" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="featured">জনপ্রিয়</SelectItem>
                  <SelectItem value="price-low">কম দাম থেকে বেশি</SelectItem>
                  <SelectItem value="price-high">বেশি দাম থেকে কম</SelectItem>
                  <SelectItem value="newest">নতুন যোগ করা</SelectItem>
                </SelectContent>
              </Select>
              <div className="flex items-center space-x-2">
                <Button
                  variant={viewMode === "grid" ? "default" : "outline"}
                  className="h-9 w-9 p-0"
                  onClick={() => setViewMode("grid")}
                >
                  <LayoutGrid className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "outline"}
                  className="h-9 w-9 p-0"
                  onClick={() => setViewMode("list")}
                >
                  <ListIcon className="h-4 w-4" />
                </Button>
              </div>
              
              {/* Mobile Filter Sheet */}
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" className="lg:hidden" size="icon">
                    <SlidersHorizontal className="h-4 w-4" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-[300px] sm:w-[400px] overflow-y-auto">
                  <SheetHeader className="mb-4">
                    <SheetTitle className="text-left">ফিল্টার করুন</SheetTitle>
                  </SheetHeader>
                  <FilterSidebar 
                    activeCategoryId={selectedCategory}
                    priceRange={priceRange}
                    inStockOnly={inStockOnly}
                    onCategoryChange={setSelectedCategory}
                    onPriceChange={(min, max) => setPriceRange({ min, max })}
                    onAvailabilityChange={setInStockOnly}
                  />
                </SheetContent>
              </Sheet>
            </div>
          </div>

          {/* Results Count */}
          <div className="mb-6">
            <p className="text-gray-600">
              {filteredProducts.length} টি পণ্য পাওয়া গেছে
            </p>
          </div>

          {/* Product List */}
          {filteredProducts.length === 0 ? (
            <div className="text-center py-12">
              <h3 className="text-xl font-medium mb-2">
                কোন পণ্য পাওয়া যায়নি
              </h3>
              <p className="text-gray-500">
                অন্য কিছু অনুসন্ধান করার চেষ্টা করুন
              </p>
            </div>
          ) : viewMode === "grid" ? (
            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
              {filteredProducts.map((product) => (
                <ProductCard key={product.documentId} product={product} />
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {filteredProducts.map((product) => (
                <Card
                  key={product.documentId}
                  className="overflow-hidden group hover:shadow-md transition"
                >
                  <div className="flex flex-col md:flex-row">
                    <div className="md:w-1/4 relative">
                      <Link href={`/product/${product.slug}`}>
                        <div className="relative h-48 w-full overflow-hidden">
                          <Image
                            src={product.image?.url}
                            alt={product.name}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                      </Link>
                    </div>
                    <div className="md:w-3/4 p-4">
                      <Link href={`/product/${product.slug}`}>
                        <h3 className="font-medium text-lg group-hover:text-primary transition-colors">
                          {product.name_bn}
                        </h3>
                      </Link>
                      <p className="text-gray-600 my-2">
                        {product.description_bn}
                      </p>
                      <div className="flex justify-between items-center mt-4">
                        <div>
                          {product.discountPrice ? (
                            <div className="flex items-center gap-2">
                              <span className="font-bold text-lg">
                                ৳ {product.discountPrice}
                              </span>
                              <span className="text-gray-400 text-sm line-through">
                                ৳ {product.price}
                              </span>
                            </div>
                          ) : (
                            <span className="font-bold text-lg">
                              ৳ {product.price}
                            </span>
                          )}
                          <div className="text-sm text-gray-500">
                            {product.unit}
                          </div>
                        </div>
                        <Button>
                          <ShoppingCart className="h-4 w-4 mr-2" />
                          কার্টে যোগ করুন
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AllProductsPage;
