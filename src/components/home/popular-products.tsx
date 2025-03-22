"use client";

import React from "react";
import { products } from "@/data/products";
import ProductCard from "@/components/shared/product-card";

const PopularProducts = () => {
  const popularProducts = products.filter((product) => product.isPopular);

  return (
    <div className="py-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl md:text-3xl font-bold">
          <span className="text-primary">জনপ্রিয়</span> পণ্যসমূহ
        </h2>
        <a
          href="/products?filter=popular"
          className="text-primary hover:underline"
        >
          সব দেখুন
        </a>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {popularProducts.slice(0, 10).map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default PopularProducts;
