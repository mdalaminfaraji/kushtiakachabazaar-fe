"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Search, Calendar, Tag, ArrowRight } from "lucide-react";
import { blogPosts, blogCategories, blogTags } from "@/data/blogs";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Tabs,
  TabsList,
  TabsTrigger
} from "@/components/ui/tabs";

export default function BlogPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const featuredPosts = blogPosts.filter((post) => post.featured);

  // Format date to Bengali format
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return date.toLocaleDateString("bn-BD", options);
  };

  // Filter posts based on search and category
  const [filteredPosts, setFilteredPosts] = useState(blogPosts);
  useEffect(() => {
    const filtered = blogPosts.filter((post) => {
      const matchesSearch =
        searchTerm === "" ||
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.title_bn.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.content_bn.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.tags.some((tag) =>
          tag.toLowerCase().includes(searchTerm.toLowerCase())
        ) ||
        post.tags_bn.some((tag) =>
          tag.toLowerCase().includes(searchTerm.toLowerCase())
        );

      const matchesCategory =
        selectedCategory === null || post.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });

    setFilteredPosts(filtered);
  }, [searchTerm, selectedCategory]);

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <Breadcrumb className="mb-6">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">হোম</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>ব্লগ</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-3">আমাদের ব্লগ</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          খাদ্য, পুষ্টি, এবং স্বাস্থ্যকর জীবনযাপন সম্পর্কে আমাদের নিয়মিত
          আপডেট, টিপস এবং নিবন্ধগুলি পড়ুন
        </p>
      </div>

      {/* Featured Posts Section */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold mb-6 pb-2 border-b">
          নির্বাচিত নিবন্ধ
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredPosts.map((post) => (
            <Card
              key={post.id}
              className="overflow-hidden group hover:shadow-lg transition-shadow duration-300"
            >
              <Link href={`/blog/${post.slug}`}>
                <div className="relative h-48 w-full overflow-hidden">
                  <Image
                    src={post.image}
                    alt={post.title_bn}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-0 right-0 bg-primary text-white px-3 py-1 m-3 rounded-md text-sm">
                    {post.category_bn}
                  </div>
                </div>
              </Link>
              <div className="p-5">
                <div className="flex items-center text-gray-500 text-sm mb-3">
                  <Calendar className="w-4 h-4 mr-1" />
                  <span className="mr-3">{formatDate(post.date)}</span>
                  <span>{post.author_bn}</span>
                </div>
                <Link href={`/blog/${post.slug}`}>
                  <h3 className="text-xl font-semibold mb-3 group-hover:text-primary transition-colors">
                    {post.title_bn}
                  </h3>
                </Link>
                <p className="text-gray-600 mb-4 line-clamp-2">
                  {post.excerpt_bn}
                </p>
                <Link href={`/blog/${post.slug}`}>
                  <Button variant="outline" className="group">
                    আরও পড়ুন{" "}
                    <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* Blog Content Area */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-3">
          {/* Search and Filters */}
          <div className="mb-8">
            <div className="relative mb-6">
              <Input
                type="text"
                placeholder="ব্লগ খুঁজুন..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            </div>

            {/* Category Tabs */}
            <Tabs defaultValue="all" className="w-full">
              <TabsList className="mb-6 flex flex-wrap h-auto">
                <TabsTrigger
                  value="all"
                  onClick={() => setSelectedCategory(null)}
                  className="mb-2"
                >
                  সকল
                </TabsTrigger>
                {blogCategories.map((category) => (
                  <TabsTrigger
                    key={category.name}
                    value={category.name}
                    onClick={() => setSelectedCategory(category.name)}
                    className="mb-2"
                  >
                    {category.name_bn}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
          </div>

          {/* Results Count */}
          <div className="mb-6">
            <p className="text-gray-600">
              {filteredPosts.length} টি নিবন্ধ পাওয়া গেছে
            </p>
          </div>

          {/* Blog Posts Grid */}
          {filteredPosts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredPosts.map((post) => (
                <Card
                  key={post.id}
                  className="overflow-hidden group hover:shadow-md transition-shadow"
                >
                  <Link href={`/blog/${post.slug}`}>
                    <div className="relative h-48 w-full overflow-hidden">
                      <Image
                        src={post.image}
                        alt={post.title_bn}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  </Link>
                  <div className="p-5">
                    <div className="flex justify-between items-center mb-3">
                      <Badge variant="outline" className="bg-primary/10">
                        {post.category_bn}
                      </Badge>
                      <div className="text-gray-500 text-sm flex items-center">
                        <Calendar className="w-3 h-3 mr-1" />
                        {formatDate(post.date)}
                      </div>
                    </div>
                    <Link href={`/blog/${post.slug}`}>
                      <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors">
                        {post.title_bn}
                      </h3>
                    </Link>
                    <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                      {post.excerpt_bn}
                    </p>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-500">
                        লেখক: {post.author_bn}
                      </span>
                      <Link href={`/blog/${post.slug}`}>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-primary hover:text-primary/80 p-0 h-auto hover:bg-transparent"
                        >
                          আরও পড়ুন
                          <ArrowRight className="ml-1 w-3 h-3" />
                        </Button>
                      </Link>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <h3 className="text-xl font-medium mb-2">
                কোন নিবন্ধ পাওয়া যায়নি
              </h3>
              <p className="text-gray-600 mb-4">
                আপনার অনুসন্ধান মাপদণ্ড পরিবর্তন করে আবার চেষ্টা করুন।
              </p>
              <Button onClick={() => {
                setSearchTerm("");
                setSelectedCategory(null);
              }}>
                সব নিবন্ধ দেখুন
              </Button>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1">
          {/* Categories Card */}
          <Card className="overflow-hidden mb-6">
            <div className="p-4 bg-primary text-white font-medium">
              <h2 className="text-lg">ক্যাটাগরি</h2>
            </div>
            <div className="p-4">
              <ul className="space-y-2">
                <li>
                  <button
                    onClick={() => setSelectedCategory(null)}
                    className={`w-full text-left px-3 py-2 rounded hover:bg-gray-100 transition ${
                      selectedCategory === null ? "text-primary font-medium" : ""
                    }`}
                  >
                    সকল ক্যাটাগরি
                  </button>
                </li>
                {blogCategories.map((category) => (
                  <li key={category.name}>
                    <button
                      onClick={() => setSelectedCategory(category.name)}
                      className={`w-full text-left px-3 py-2 rounded hover:bg-gray-100 transition ${
                        selectedCategory === category.name
                          ? "text-primary font-medium"
                          : ""
                      }`}
                    >
                      {category.name_bn}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </Card>

          {/* Recent Posts */}
          <Card className="overflow-hidden mb-6">
            <div className="p-4 bg-primary text-white font-medium">
              <h2 className="text-lg">সাম্প্রতিক পোস্ট</h2>
            </div>
            <div className="p-4">
              <ul className="space-y-4">
                {blogPosts
                  .sort(
                    (a, b) =>
                      new Date(b.date).getTime() - new Date(a.date).getTime()
                  )
                  .slice(0, 5)
                  .map((post) => (
                    <li key={post.id}>
                      <Link
                        href={`/blog/${post.slug}`}
                        className="flex items-start gap-3 group"
                      >
                        <div className="relative w-16 h-16 flex-shrink-0 rounded overflow-hidden">
                          <Image
                            src={post.image}
                            alt={post.title_bn}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <h3 className="text-sm font-medium group-hover:text-primary transition-colors line-clamp-2">
                            {post.title_bn}
                          </h3>
                          <div className="text-xs text-gray-500 mt-1 flex items-center">
                            <Calendar className="w-3 h-3 mr-1" />
                            {formatDate(post.date)}
                          </div>
                        </div>
                      </Link>
                    </li>
                  ))}
              </ul>
            </div>
          </Card>

          {/* Tags */}
          <Card className="overflow-hidden">
            <div className="p-4 bg-primary text-white font-medium">
              <h2 className="text-lg">ট্যাগ</h2>
            </div>
            <div className="p-4">
              <div className="flex flex-wrap gap-2">
                {blogTags.map((tag) => (
                  <Badge
                    key={tag.name}
                    variant="outline"
                    className="cursor-pointer hover:bg-primary/10 transition-colors"
                    onClick={() => setSearchTerm(tag.name)}
                  >
                    <Tag className="w-3 h-3 mr-1" />
                    {tag.name_bn}
                  </Badge>
                ))}
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
