"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { categories } from "@/data/categories";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card } from "@/components/ui/card";
import { ChevronRight } from "lucide-react";

const Sidebar = () => {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

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
                  onClick={() => setActiveCategory(category.id)}
                >
                  <span>{category.name_bn}</span>
                  <ChevronRight size={16} />
                </li>
              ))}
            </ul>
          </div>
        </ScrollArea>
      </div>

      {/* Subcategories Panel */}
      <div className="hidden md:block md:w-2/3 lg:w-3/4">
        <ScrollArea className="h-[500px] md:h-[600px] w-full">
          {activeCategory && (
            <div className="p-4">
              <h3 className="font-medium text-xl mb-4 text-primary">
                {categories.find((cat) => cat.id === activeCategory)?.name_bn}
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {categories
                  .find((cat) => cat.id === activeCategory)
                  ?.subCategories.map((subcat) => (
                    <Link
                      href={`/category/${
                        categories.find((cat) => cat.id === activeCategory)
                          ?.slug
                      }/${subcat.slug}`}
                      key={subcat.id}
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
