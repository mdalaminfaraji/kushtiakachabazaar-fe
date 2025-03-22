"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { categories } from "@/data/categories";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card } from "@/components/ui/card";
import { ChevronRight, ArrowLeft } from "lucide-react";

const Sidebar = () => {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [activeSubcategory, setActiveSubcategory] = useState<string | null>(null);

  // Get the active category object
  const activeCategoryObj = categories.find((cat) => cat.id === activeCategory);
  
  // Get the active subcategory object
  const activeSubcategoryObj = activeCategoryObj?.subCategories.find(
    (subcat) => subcat.id === activeSubcategory
  );

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

  return (
    <div className="flex w-full">
      {/* Categories Sidebar */}
      <div className="w-full md:w-1/3 lg:w-1/4 border-r">
        <ScrollArea className="h-[500px] md:h-[600px] w-full">
          <div className="p-2">
            <h3 className="font-medium text-lg mb-3 text-primary">ক্যাটাগরি</h3>
            <ul className="space-y-1">
              {categories.map((category) => (
                <li
                  key={category.id}
                  className={`px-3 py-2 rounded-md cursor-pointer flex items-center justify-between hover:bg-muted transition ${
                    activeCategory === category.id
                      ? "bg-primary/10 text-primary"
                      : ""
                  }`}
                  onClick={() => handleCategoryClick(category.id)}
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
                {activeCategoryObj?.subCategories.map((subcat) => (
                  <div key={subcat.id}>
                    {/* If subcategory has child categories, make it interactive to show them */}
                    {subcat.categories && subcat.categories.length > 0 ? (
                      <Card 
                        className="overflow-hidden hover:shadow-md transition group cursor-pointer"
                        onClick={() => handleSubcategoryClick(subcat.id)}
                      >
                        <div className="relative w-full h-32">
                          <Image
                            src={subcat.image}
                            alt={subcat.name}
                            fill
                            className="object-cover group-hover:scale-105 transition duration-300"
                          />
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
                            <Image
                              src={subcat.image}
                              alt={subcat.name}
                              fill
                              className="object-cover group-hover:scale-105 transition duration-300"
                            />
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
          {activeCategory && activeSubcategory && activeSubcategoryObj?.categories && (
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
                {activeSubcategoryObj?.categories?.map((childCat) => (
                  <Link
                    href={`/category/${activeCategoryObj?.slug}/${activeSubcategoryObj?.slug}/${childCat.slug}`}
                    key={childCat.id}
                  >
                    <Card className="overflow-hidden hover:shadow-md transition group">
                      <div className="relative w-full h-32">
                        <Image
                          src={childCat.image}
                          alt={childCat.name}
                          fill
                          className="object-cover group-hover:scale-105 transition duration-300"
                        />
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
