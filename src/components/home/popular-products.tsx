"use client";

import React from "react";
import { useQuery } from "@apollo/client/react";
import { GET_PRODUCTS } from "@/graphql/products/query/productQuery";
import ProductCard from "@/components/shared/product-card";
import { Loader2 } from "lucide-react";
import { Product } from "@/types";

const PopularProducts = () => {
  const { data, loading, error } = useQuery<{ products: Product[] }>(GET_PRODUCTS);

  const popularProducts = data?.products?.filter((product: Product) => product.isPopular) || [];

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="animate-spin text-primary" size={32} />
      </div>
    );
  }

  if (error || popularProducts.length === 0) {
    return null;
  }

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
        {popularProducts.slice(0, 10).map((product: Product) => (
          <ProductCard key={product.documentId} product={product} />
        ))}
      </div>
    </div>
  );
};

export default PopularProducts;

