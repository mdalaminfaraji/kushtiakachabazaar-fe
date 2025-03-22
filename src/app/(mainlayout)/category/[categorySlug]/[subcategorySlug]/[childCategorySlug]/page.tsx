"use client";

import React, { useState } from "react";
import { useParams } from "next/navigation";
import { categories } from "@/data/categories";
import { products } from "@/data/products";
import ProductCard from "@/components/shared/product-card";
import { Card } from "@/components/ui/card";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const ChildCategoryPage = () => {
  const { categorySlug, subcategorySlug, childCategorySlug } = useParams();
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const category = categories.find((cat) => cat.slug === categorySlug);
  const subCategory = category?.subCategories.find(
    (subcat) => subcat.slug === subcategorySlug
  );
  const childCategory = subCategory?.categories?.find(
    (child) => child.slug === childCategorySlug
  );

  if (!category || !subCategory || !childCategory) {
    return (
      <div className="container mx-auto px-4 py-8">Category not found</div>
    );
  }

  // Filter products based on child category
  const filteredProducts = products.filter(
    (product) => product.childCategoryId === childCategory.id
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <Breadcrumb className="mb-6">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href={`/category/${categorySlug}`}>
              {category.name}
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href={`/category/${categorySlug}/${subcategorySlug}`}>
              {subCategory.name}
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{childCategory.name}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <h1 className="text-3xl font-bold mb-6">{childCategory.name_bn}</h1>

      <div className="flex justify-between items-center mb-6">
        <div>
          <span className="text-gray-600">
            {filteredProducts.length} products found
          </span>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center space-x-2">
            <Button
              variant={viewMode === "grid" ? "default" : "outline"}
              className="h-9 w-9 p-0"
              onClick={() => setViewMode("grid")}
            >
              <i className="grid text-lg">⊞</i>
            </Button>
            <Button
              variant={viewMode === "list" ? "default" : "outline"}
              className="h-9 w-9 p-0"
              onClick={() => setViewMode("list")}
            >
              <i className="list text-lg">≡</i>
            </Button>
          </div>
        </div>
      </div>

      {viewMode === "grid" ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {filteredProducts.map((product) => (
            <Card
              key={product.id}
              className="overflow-hidden group hover:shadow-md transition"
            >
              <div className="flex flex-col md:flex-row">
                <div className="md:w-1/4 relative">
                  <Link href={`/product/${product.slug}`}>
                    <div className="relative h-48 w-full overflow-hidden">
                      <Image
                        src={product.image}
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
                  <p className="text-gray-600 my-2">{product.description_bn}</p>
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
                      Add to Cart
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default ChildCategoryPage;
