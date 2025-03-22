"use client";

import React from "react";
import { useParams } from "next/navigation";
import { categories } from "@/data/categories";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import Image from "next/image";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from "@/components/ui/breadcrumb";

const CategoryPage = () => {
  const { categorySlug } = useParams();

  const category = categories.find((cat) => cat.slug === categorySlug);

  if (!category) {
    return (
      <div className="container mx-auto px-4 py-8">Category not found</div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Breadcrumb className="mb-6">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{category.name}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <h1 className="text-3xl font-bold mb-6">{category.name_bn}</h1>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {category.subCategories.map((subCategory) => (
          <Link
            href={`/category/${categorySlug}/${subCategory.slug}`}
            key={subCategory.id}
          >
            <Card className="overflow-hidden hover:shadow-md transition group">
              <div className="relative h-48 w-full">
                <Image
                  src={subCategory.image}
                  alt={subCategory.name}
                  fill
                  className="object-cover group-hover:scale-105 transition duration-300"
                />
              </div>
              <div className="p-4 text-center">
                <h2 className="text-lg font-medium">{subCategory.name_bn}</h2>
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CategoryPage;
