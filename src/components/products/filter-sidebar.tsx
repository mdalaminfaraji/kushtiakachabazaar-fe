"use client";

import React, { useState } from "react";
import { useQuery } from "@apollo/client/react";
import { GET_CATEGORIES } from "@/graphql/categories/query/categoryQuery";
import { Category, SubCategory } from "@/types";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ChevronDown, ChevronRight, Filter, RefreshCw, Star } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";

interface FilterSidebarProps {
  onCategoryChange: (categoryId: string | null) => void;
  onPriceChange: (min: number, max: number) => void;
  onAvailabilityChange: (inStock: boolean | null) => void;
  activeCategoryId: string | null;
  priceRange: { min: number; max: number };
  inStockOnly: boolean | null;
  className?: string;
}

const FilterSidebar = ({
  onCategoryChange,
  onPriceChange,
  onAvailabilityChange,
  activeCategoryId,
  priceRange,
  inStockOnly,
  className,
}: FilterSidebarProps) => {
  const [expandedCategories, setExpandedCategories] = useState<Record<string, boolean>>({});
  const { data, loading, error } = useQuery<{ categories: Category[] }>(GET_CATEGORIES);

  const toggleCategory = (id: string) => {
    setExpandedCategories((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const categories = data?.categories || [];

  const handleReset = () => {
    onCategoryChange(null);
    onPriceChange(0, 10000);
    onAvailabilityChange(null);
  };

  if (error) return <div className="p-4 text-destructive">Error loading categories</div>;

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-xl font-bold flex items-center gap-2">
          <Filter className="w-5 h-5 text-primary" />
          ফিল্টার
        </h2>
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={handleReset}
          className="text-muted-foreground hover:text-primary transition-colors"
        >
          <RefreshCw className="w-4 h-4 mr-2" />
          রিসেট
        </Button>
      </div>

      {/* Categories Section */}
      <div className="rounded-xl overflow-hidden border bg-card shadow-sm">
        <div className="p-4 bg-primary/5 border-b">
          <h3 className="font-semibold text-foreground">ক্যাটাগরি</h3>
        </div>
        <ScrollArea className="h-[400px]">
          <div className="p-3">
            {loading ? (
              <div className="space-y-2">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Skeleton key={i} className="h-10 w-full rounded-md" />
                ))}
              </div>
            ) : (
              <div className="space-y-1">
                <div
                  className={`flex items-center justify-between p-2 rounded-lg cursor-pointer transition-all ${
                    activeCategoryId === null
                      ? "bg-primary text-primary-foreground"
                      : "hover:bg-accent"
                  }`}
                  onClick={() => onCategoryChange(null)}
                >
                  <span className="font-medium">সকল ক্যাটাগরি</span>
                </div>
                {categories.map((category: Category) => (
                  <div key={category.documentId} className="space-y-1">
                    <div
                      className={`flex items-center justify-between p-2 rounded-lg cursor-pointer transition-all ${
                        activeCategoryId === category.documentId
                          ? "bg-primary/10 text-primary border border-primary/20"
                          : "hover:bg-accent"
                      }`}
                      onClick={() => onCategoryChange(category.documentId)}
                    >
                      <span className="font-medium text-sm">{category.name_bn}</span>
                      {category.subCategories && category.subCategories.length > 0 && (
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-6 w-6 p-0 hover:bg-transparent"
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleCategory(category.documentId);
                          }}
                        >
                          {expandedCategories[category.documentId] ? (
                            <ChevronDown className="w-4 h-4" />
                          ) : (
                            <ChevronRight className="w-4 h-4" />
                          )}
                        </Button>
                      )}
                    </div>
                    {expandedCategories[category.documentId] && category.subCategories && (
                      <div className="ml-4 space-y-1 mt-1 border-l-2 border-primary/10 pl-2">
                        {category.subCategories.map((sub: SubCategory) => (
                          <div
                            key={sub.documentId}
                            className={`p-2 rounded-md text-xs cursor-pointer transition-all ${
                              activeCategoryId === sub.documentId
                                ? "text-primary font-bold"
                                : "text-muted-foreground hover:text-foreground"
                            }`}
                            onClick={() => onCategoryChange(sub.documentId)}
                          >
                            {sub.name_bn}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </ScrollArea>
      </div>

      {/* Price Range Section */}
      <div className="rounded-xl overflow-hidden border bg-card shadow-sm p-4">
        <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
          মূল্য পরিসীমা
        </h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between gap-4">
            <div className="space-y-2">
              <Label htmlFor="min-price" className="text-xs">সর্বনিম্ন</Label>
              <Input
                id="min-price"
                type="number"
                value={priceRange.min}
                onChange={(e) => onPriceChange(parseInt(e.target.value) || 0, priceRange.max)}
                className="h-8 text-xs"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="max-price" className="text-xs">সর্বোচ্চ</Label>
              <Input
                id="max-price"
                type="number"
                value={priceRange.max}
                onChange={(e) => onPriceChange(priceRange.min, parseInt(e.target.value) || 0)}
                className="h-8 text-xs"
              />
            </div>
          </div>
          <input
            type="range"
            min="0"
            max="10000"
            step="100"
            value={priceRange.max}
            onChange={(e) => onPriceChange(priceRange.min, parseInt(e.target.value))}
            className="w-full h-1.5 bg-secondary rounded-lg appearance-none cursor-pointer accent-primary"
          />
          <div className="flex justify-between text-[10px] text-muted-foreground">
            <span>৳০</span>
            <span>৳১০,০০০+</span>
          </div>
        </div>
      </div>

      {/* Availability Section */}
      <div className="rounded-xl overflow-hidden border bg-card shadow-sm p-4">
        <h3 className="font-semibold text-foreground mb-4">লভ্যতা</h3>
        <div className="space-y-3">
          <div className="flex items-center space-x-2">
            <Checkbox 
              id="instock" 
              checked={inStockOnly === true}
              onCheckedChange={(checked) => onAvailabilityChange(checked ? true : null)}
            />
            <Label 
              htmlFor="instock" 
              className="text-sm font-medium leading-none cursor-pointer"
            >
              স্টক আছে
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="onsale" />
            <Label 
              htmlFor="onsale" 
              className="text-sm font-medium leading-none cursor-pointer"
            >
              অফার চলছে
            </Label>
          </div>
        </div>
      </div>

      {/* Ratings Section (Optional but looks good) */}
      <div className="rounded-xl overflow-hidden border bg-card shadow-sm p-4">
        <h3 className="font-semibold text-foreground mb-4">রেটিং</h3>
        <div className="space-y-2">
          {[4, 3, 2].map((rating) => (
            <div key={rating} className="flex items-center space-x-2 cursor-pointer group">
              <Checkbox id={`rating-${rating}`} />
              <Label 
                htmlFor={`rating-${rating}`} 
                className="text-sm font-medium leading-none flex items-center gap-1 cursor-pointer group-hover:text-primary transition-colors"
              >
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`w-3.5 h-3.5 ${
                      i < rating ? "fill-yellow-400 text-yellow-400" : "text-muted"
                    }`}
                  />
                ))}
                <span className="ml-1 text-xs text-muted-foreground mr-1">ও এর বেশি</span>
              </Label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FilterSidebar;
