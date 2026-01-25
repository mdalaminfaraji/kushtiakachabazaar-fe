"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useQuery } from "@apollo/client/react";
import { GET_CATEGORIES } from "@/graphql/categories/query/categoryQuery";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card } from "@/components/ui/card";
import { ChevronRight, ArrowLeft, Loader2 } from "lucide-react";
import { Category, ChildCategory, SubCategory } from "@/types";

const Sidebar = () => {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [activeSubcategory, setActiveSubcategory] = useState<string | null>(null);

  const { data, loading, error } = useQuery<{ categories: Category[] }>(GET_CATEGORIES);

  const categories = data?.categories || [];

  // Get the active category object
  const activeCategoryObj = categories?.find((cat: Category) => cat.documentId === activeCategory);
  
  // Get the active subcategory object
  const activeSubcategoryObj = activeCategoryObj?.subCategories?.find(
    (subcat: SubCategory) => subcat.documentId === activeSubcategory
  );


  useEffect(() => {
    if (categories.length > 0) {
      setActiveCategory(categories[0].documentId);
    }
  }, [categories]);

  // Handle category click
  const handleCategoryClick = (categoryId: string) => {
    if (activeCategory === categoryId) {
      // If clicking the same category, toggle it off
      setActiveCategory(null);
      setActiveSubcategory(null);
    } else {
      // Set new active category and reset subcategory
      setActiveCategory(categoryId);
      setActiveSubcategory(null);
    }
  };

  // Handle subcategory click
  const handleSubcategoryClick = (subcategoryId: string) => {
    if (activeSubcategory === subcategoryId) {
      // If clicking the same subcategory, toggle it off
      setActiveSubcategory(null);
    } else {
      // Set new active subcategory
      setActiveSubcategory(subcategoryId);
    }
  };

  // Reset subcategory selection
  const handleBackToSubcategories = () => {
    setActiveSubcategory(null);
  };

    if (loading) {
    return (
      <div className="flex items-center justify-center h-[500px] w-full">
        <Loader2 className="animate-spin text-primary" size={32} />
      </div>
    );
  }

  if (error) {
    console.error("Error fetching categories:", error);
    return (
      <div className="flex items-center justify-center h-[500px] w-full text-destructive">
        ক্যাটাগরি লোড হতে সমস্যা হয়েছে
      </div>
    );
  }

  return (
    <div className="flex w-full">
      {/* Categories Sidebar */}
      <div className="w-full md:w-1/3 lg:w-1/4 border-r">
        <ScrollArea className="h-[500px] md:h-[600px] w-full">
          <div className="p-2">
            <h3 className="font-medium text-lg mb-3 text-primary">ক্যাটাগরি</h3>
            <ul className="space-y-1">
              {categories.map((category: Category) => (
                <li
                  key={category.documentId}
                  className={`px-3 py-2 rounded-md cursor-pointer flex items-center justify-between hover:bg-muted transition ${
                    activeCategory === category.documentId
                      ? "bg-primary/10 text-primary"
                      : ""
                  }`}
                  onClick={() => handleCategoryClick(category.documentId)}
                >
                  <span>{category.name_bn}</span>
                  <ChevronRight size={16} />
                </li>
              ))}
            </ul>
          </div>
        </ScrollArea>
      </div>

      {/* Subcategories & Child Categories Panel */}
      <div className="hidden md:block md:w-2/3 lg:w-3/4">
        <ScrollArea className="h-[500px] md:h-[600px] w-full">
          {/* Show subcategories when a category is active */}
          {activeCategory && !activeSubcategory && (
            <div className="p-4">
              <h3 className="font-medium text-xl mb-4 text-primary">
                {activeCategoryObj?.name_bn}
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {activeCategoryObj?.subCategories?.map((subcat: SubCategory) => (
                  <div key={subcat.documentId}>
                    {/* If subcategory has child categories, make it interactive to show them */}
                    {subcat.childCategories && subcat.childCategories.length > 0 ? (
                      <Card 
                        className="overflow-hidden hover:shadow-md transition group cursor-pointer"
                        onClick={() => handleSubcategoryClick(subcat.documentId)}
                      >
                        <div className="relative w-full h-32">
                          {subcat.image?.url ? (
                            <Image
                              src={`${process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337'}${subcat.image.url}`}
                              alt={subcat.name}
                              fill
                              className="object-cover group-hover:scale-105 transition duration-300"
                            />
                          ) : (
                            <div className="w-full h-full bg-muted flex items-center justify-center">
                              <span className="text-muted-foreground text-xs">{subcat.name}</span>
                            </div>
                          )}
                        </div>
                        <div className="p-3 flex items-center justify-between">
                          <h4 className="font-medium">{subcat.name_bn}</h4>
                          <ChevronRight size={16} className="text-gray-500" />
                        </div>
                      </Card>
                    ) : (
                      /* Otherwise, make it a direct link to the subcategory page */
                      <Link
                        href={`/category/${activeCategoryObj?.slug}/${subcat.slug}`}
                      >
                        <Card className="overflow-hidden hover:shadow-md transition group">
                          <div className="relative w-full h-32">
                            {subcat.image?.url ? (
                              <Image
                                src={`${process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337'}${subcat.image.url}`}
                                alt={subcat.name}
                                fill
                                className="object-cover group-hover:scale-105 transition duration-300"
                              />
                            ) : (
                              <div className="w-full h-full bg-muted flex items-center justify-center">
                                <span className="text-muted-foreground text-xs">{subcat.name}</span>
                              </div>
                            )}
                          </div>
                          <div className="p-3">
                            <h4 className="font-medium text-center">
                              {subcat.name_bn}
                            </h4>
                          </div>
                        </Card>
                      </Link>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Show child categories when both category and subcategory are active */}
          {activeCategory && activeSubcategory && activeSubcategoryObj?.childCategories && (
            <div className="p-4">
              {/* Back button to return to subcategories */}
              <button 
                onClick={handleBackToSubcategories}
                className="flex items-center text-primary mb-4 hover:underline"
              >
                <ArrowLeft size={16} className="mr-1" />
                <span>ফিরে যান</span>
              </button>
              
              <h3 className="font-medium text-xl mb-2 text-primary">
                {activeSubcategoryObj?.name_bn}
              </h3>
              <p className="text-gray-500 mb-4">
                {activeCategoryObj?.name_bn} &gt; {activeSubcategoryObj?.name_bn}
              </p>
              
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {activeSubcategoryObj?.childCategories?.map((childCat: ChildCategory) => (
                  <Link
                    href={`/category/${activeCategoryObj?.slug}/${activeSubcategoryObj?.slug}/${childCat.slug}`}
                    key={childCat.documentId}
                  >
                    <Card className="overflow-hidden hover:shadow-md transition group">
                      <div className="relative w-full h-32">
                        {childCat.image?.url ? (
                          <Image
                            src={`${process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337'}${childCat.image.url}`}
                            alt={childCat.name}
                            fill
                            className="object-cover group-hover:scale-105 transition duration-300"
                          />
                        ) : (
                          <div className="w-full h-full bg-muted flex items-center justify-center">
                            <span className="text-muted-foreground text-xs">{childCat.name}</span>
                          </div>
                        )}
                      </div>
                      <div className="p-3">
                        <h4 className="font-medium text-center">
                          {childCat.name_bn}
                        </h4>
                      </div>
                    </Card>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </ScrollArea>
      </div>
    </div>
  );
};

export default Sidebar;

