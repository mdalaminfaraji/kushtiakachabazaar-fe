"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Heart } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

import { Product } from "@/types";

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const price = product.price;
  const discountPrice = product.discountPrice;
  const name_bn = product.name_bn;
  const slug = product.slug;
  const unit = product.unit;
  const isFlashSale = product.isFlashSale;

  // Handle both static path and GraphQL image object
  const imageUrl = typeof product.image === 'string' 
    ? product.image 
    : product.image?.url 
      ? `${process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337'}${product.image.url}`
      : "/images/placeholder.jpg";

  const discountPercentage = discountPrice
    ? Math.round(
        ((price - discountPrice) / price) * 100
      )
    : 0;

  return (
    <Card className="overflow-hidden group hover:shadow-md transition">
      <div className="relative">
        <Link href={`/product/${slug}`}>
          <div className="relative h-48 w-full overflow-hidden">
            <Image
              src={imageUrl}
              alt={product.name || ""}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </div>
        </Link>
        {isFlashSale && (
          <Badge className="absolute top-2 left-2 bg-red-500 hover:bg-red-600">
            ফ্ল্যাশ সেল
          </Badge>
        )}
        {discountPercentage > 0 && (
          <Badge variant="outline" className="absolute top-2 right-2 bg-white">
            -{discountPercentage}%
          </Badge>
        )}
        <Button
          size="icon"
          variant="ghost"
          className="absolute right-2 bottom-2 rounded-full bg-white hover:bg-primary hover:text-white transition-colors"
        >
          <Heart className="h-4 w-4" />
        </Button>
      </div>

      <div className="p-3 space-y-2">
        <Link href={`/product/${slug}`}>
          <h3 className="font-medium text-sm line-clamp-2 group-hover:text-primary transition-colors">
            {name_bn}
          </h3>
        </Link>

        <div className="flex justify-between items-center">
          <div>
            {discountPrice ? (
              <div className="flex items-center gap-2">
                <span className="font-bold">৳ {discountPrice}</span>
                <span className="text-gray-400 text-sm line-through">
                  ৳ {price}
                </span>
              </div>
            ) : (
              <span className="font-bold">৳ {price}</span>
            )}
            <div className="text-xs text-gray-500">{unit}</div>
          </div>
          <Button size="sm" variant="outline" className="h-8 w-8 p-0">
            <ShoppingCart className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default ProductCard;

