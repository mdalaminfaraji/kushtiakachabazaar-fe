"use client";

import React, { useState } from "react";
import { useParams } from "next/navigation";
import { products } from "@/data/products";
import { categories } from "@/data/categories";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Heart, Minus, Plus, Share2 } from "lucide-react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import ProductCard from "@/components/shared/product-card";

const ProductDetailPage = () => {
  const { productSlug } = useParams();
  const [quantity, setQuantity] = useState(1);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const product = products.find((p) => p.slug === productSlug);

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-8">Product not found</div>
    );
  }

  // Find category information
  const category = categories.find((cat) => cat.id === product.categoryId);
  const subCategory = category?.subCategories.find(
    (sub) => sub.id === product.subCategoryId
  );
  const childCategory = subCategory?.categories?.find(
    (child) => child.id === product.childCategoryId
  );

  // Related products - same subcategory
  const relatedProducts = products
    .filter(
      (p) =>
        p.subCategoryId === product.subCategoryId && p.id !== product.id
    )
    .slice(0, 5);

  const handleQuantityChange = (action: "increase" | "decrease") => {
    if (action === "increase") {
      setQuantity(quantity + 1);
    } else if (action === "decrease" && quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const discountPercentage = product.discountPrice
    ? Math.round(
        ((product.price - product.discountPrice) / product.price) * 100
      )
    : 0;

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <Breadcrumb className="mb-6">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          {category && (
            <>
              <BreadcrumbItem>
                <BreadcrumbLink href={`/category/${category.slug}`}>
                  {category.name}
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
            </>
          )}
          {subCategory && (
            <>
              <BreadcrumbItem>
                <BreadcrumbLink
                  href={`/category/${category?.slug}/${subCategory.slug}`}
                >
                  {subCategory.name}
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
            </>
          )}
          {childCategory && (
            <>
              <BreadcrumbItem>
                <BreadcrumbLink
                  href={`/category/${category?.slug}/${subCategory?.slug}/${childCategory.slug}`}
                >
                  {childCategory.name}
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
            </>
          )}
          <BreadcrumbItem>
            <BreadcrumbPage>{product.name}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      {/* Product Detail */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Product Images */}
        <div className="space-y-4">
          <div className="relative h-[300px] md:h-[450px] w-full overflow-hidden rounded-lg border">
            <Image
              src={product.images[activeImageIndex]}
              alt={product.name}
              fill
              className="object-contain"
            />
            {product.isFlashSale && (
              <Badge className="absolute top-4 left-4 bg-red-500 hover:bg-red-600">
                ফ্ল্যাশ সেল
              </Badge>
            )}
            {discountPercentage > 0 && (
              <Badge
                variant="outline"
                className="absolute top-4 right-4 bg-white"
              >
                -{discountPercentage}%
              </Badge>
            )}
          </div>

          {/* Thumbnail images */}
          <div className="flex gap-2 overflow-x-auto pb-2">
            {product.images.map((img, index) => (
              <div
                key={index}
                className={`relative h-20 w-20 cursor-pointer rounded-md border overflow-hidden ${
                  index === activeImageIndex
                    ? "border-primary ring-2 ring-primary ring-offset-2"
                    : ""
                }`}
                onClick={() => setActiveImageIndex(index)}
              >
                <Image src={img} alt={`${product.name} - ${index}`} fill className="object-cover" />
              </div>
            ))}
          </div>
        </div>

        {/* Product Details */}
        <div className="space-y-4">
          <h1 className="text-3xl font-bold">{product.name_bn}</h1>
          <div className="flex items-center gap-2">
            {product.discountPrice ? (
              <>
                <span className="text-2xl font-bold">
                  ৳ {product.discountPrice}
                </span>
                <span className="text-gray-400 text-lg line-through">
                  ৳ {product.price}
                </span>
                <Badge className="bg-green-500 hover:bg-green-600">
                  {discountPercentage}% ছাড়
                </Badge>
              </>
            ) : (
              <span className="text-2xl font-bold">৳ {product.price}</span>
            )}
          </div>

          <div className="text-sm text-gray-500">
            Price per {product.unit}
          </div>

          <p className="text-gray-600 mt-4">{product.description_bn}</p>

          <div className="mt-6">
            <div className="text-sm font-medium mb-2">পরিমাণ</div>
            <div className="flex items-center">
              <Button
                onClick={() => handleQuantityChange("decrease")}
                variant="outline"
                size="icon"
                className="h-10 w-10 rounded-r-none"
                disabled={quantity <= 1}
              >
                <Minus className="h-4 w-4" />
              </Button>
              <div className="h-10 w-16 flex items-center justify-center border-y">
                {quantity}
              </div>
              <Button
                onClick={() => handleQuantityChange("increase")}
                variant="outline"
                size="icon"
                className="h-10 w-10 rounded-l-none"
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 mt-6">
            <Button className="gap-2 flex-1" size="lg">
              <ShoppingCart className="h-5 w-5" />
              ব্যাগে যোগ করুন
            </Button>
            <Button variant="outline" size="lg" className="gap-2">
              <Heart className="h-5 w-5" />
              পছন্দে রাখুন
            </Button>
            <Button variant="ghost" size="icon" className="h-12 w-12">
              <Share2 className="h-5 w-5" />
            </Button>
          </div>

          <div className="mt-6">
            <div className="grid grid-cols-2 gap-4 mt-4 text-sm">
              <div className="space-y-1">
                <p className="text-gray-500">ক্যাটাগরি</p>
                <p>{category?.name_bn}</p>
              </div>
              {subCategory && (
                <div className="space-y-1">
                  <p className="text-gray-500">সাব-ক্যাটাগরি</p>
                  <p>{subCategory.name_bn}</p>
                </div>
              )}
              {childCategory && (
                <div className="space-y-1">
                  <p className="text-gray-500">ক্যাটাগরি</p>
                  <p>{childCategory.name_bn}</p>
                </div>
              )}
              <div className="space-y-1">
                <p className="text-gray-500">স্টক</p>
                <p>
                  {product.inStock ? (
                    <Badge variant="outline" className="bg-green-50 text-green-600 border-green-200">
                      স্টকে আছে
                    </Badge>
                  ) : (
                    <Badge variant="outline" className="bg-red-50 text-red-600 border-red-200">
                      স্টকে নেই
                    </Badge>
                  )}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Product Details Tabs */}
      <div className="mt-12">
        <Tabs defaultValue="description">
          <TabsList className="grid grid-cols-3 w-full md:w-[400px]">
            <TabsTrigger value="description">বিবরণ</TabsTrigger>
            <TabsTrigger value="specifications">স্পেসিফিকেশন</TabsTrigger>
            <TabsTrigger value="reviews">রিভিউ</TabsTrigger>
          </TabsList>
          <TabsContent value="description" className="mt-4">
            <Card className="p-6">
              <h3 className="text-lg font-medium mb-4">পণ্যের বিবরণ</h3>
              <p>{product.description_bn}</p>
            </Card>
          </TabsContent>
          <TabsContent value="specifications" className="mt-4">
            <Card className="p-6">
              <h3 className="text-lg font-medium mb-4">স্পেসিফিকেশন</h3>
              <div className="divide-y">
                <div className="grid grid-cols-2 py-2">
                  <div className="font-medium text-gray-600">ওজন/পরিমাণ</div>
                  <div>{product.unit}</div>
                </div>
                <div className="grid grid-cols-2 py-2">
                  <div className="font-medium text-gray-600">ক্যাটাগরি</div>
                  <div>{category?.name_bn}</div>
                </div>
                {subCategory && (
                  <div className="grid grid-cols-2 py-2">
                    <div className="font-medium text-gray-600">সাব-ক্যাটাগরি</div>
                    <div>{subCategory.name_bn}</div>
                  </div>
                )}
              </div>
            </Card>
          </TabsContent>
          <TabsContent value="reviews" className="mt-4">
            <Card className="p-6">
              <h3 className="text-lg font-medium mb-4">গ্রাহক রিভিউ</h3>
              <p className="text-gray-500">
                এখনো কোন রিভিউ নেই। প্রথম রিভিউ দিন।
              </p>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className="mt-16">
          <Separator className="my-8" />
          <h2 className="text-2xl font-bold mb-6">সম্পর্কিত পণ্য</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {relatedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetailPage;
