"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Calendar, Tag, User, Clock, ArrowLeft, Share2 } from "lucide-react";
import { blogPosts, blogCategories } from "@/data/blogs";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

interface BlogPostPageProps {
  params: {
    slug: string;
  };
}

export default function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = params;

  // Find the blog post by slug
  const post = blogPosts.find((post) => post.slug === slug);

  // If post not found, return 404
  if (!post) {
    notFound();
  }

  // Get related posts (same category, excluding current post)
  const relatedPosts = blogPosts
    .filter((p) => p.category === post.category && p.id !== post.id)
    .slice(0, 3);

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

  // Estimate reading time (1 minute per 200 words)
  const calculateReadingTime = (content: string) => {
    const words = content.split(/\s+/).length;
    const readingTime = Math.ceil(words / 200);
    return readingTime;
  };

  const readingTime = calculateReadingTime(post.content_bn);

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
            <BreadcrumbLink href="/blog">ব্লগ</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{post.title_bn}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-3">
          {/* Back to blogs button */}
          <Link href="/blog">
            <Button variant="outline" size="sm" className="mb-6">
              <ArrowLeft className="w-4 h-4 mr-2" />
              সকল ব্লগ
            </Button>
          </Link>

          <Card className="overflow-hidden">
            {/* Featured Image */}
            <div className="relative h-[300px] md:h-[400px] w-full">
              <Image
                src={post.image}
                alt={post.title_bn}
                fill
                priority
                className="object-cover"
              />
              <div className="absolute top-4 right-4">
                <Badge className="bg-primary text-white px-3 py-1">
                  {post.category_bn}
                </Badge>
              </div>
            </div>

            {/* Post Content */}
            <div className="p-6 md:p-8">
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4">
                {post.title_bn}
              </h1>

              {/* Meta Information */}
              <div className="flex flex-wrap gap-4 text-gray-500 mb-6">
                <div className="flex items-center">
                  <Calendar className="w-4 h-4 mr-2" />
                  <span>{formatDate(post.date)}</span>
                </div>
                <div className="flex items-center">
                  <User className="w-4 h-4 mr-2" />
                  <span>{post.author_bn}</span>
                </div>
                <div className="flex items-center">
                  <Clock className="w-4 h-4 mr-2" />
                  <span>{readingTime} মিনিট পড়া</span>
                </div>
              </div>

              {/* Content */}
              <div className="prose prose-lg max-w-none mb-8">
                {post.content_bn.split("\n").map((paragraph, index) => (
                  <p key={index} className="mb-4 text-gray-800 leading-relaxed">
                    {paragraph}
                  </p>
                ))}
              </div>

              {/* Tags */}
              <div className="mb-6">
                <h3 className="text-lg font-medium mb-3">ট্যাগ:</h3>
                <div className="flex flex-wrap gap-2">
                  {post.tags_bn.map((tag, index) => (
                    <Link href={`/blog?tag=${post.tags[index]}`} key={index}>
                      <Badge
                        variant="outline"
                        className="hover:bg-primary/10 transition-colors cursor-pointer"
                      >
                        <Tag className="w-3 h-3 mr-1" />
                        {tag}
                      </Badge>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Share */}
              <div className="flex items-center gap-4">
                <span className="font-medium">শেয়ার করুন:</span>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    className="rounded-full w-8 h-8"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      viewBox="0 0 16 16"
                    >
                      <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z" />
                    </svg>
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    className="rounded-full w-8 h-8"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      viewBox="0 0 16 16"
                    >
                      <path d="M5.026 15c6.038 0 9.341-5.003 9.341-9.334 0-.14 0-.282-.006-.422A6.685 6.685 0 0 0 16 3.542a6.658 6.658 0 0 1-1.889.518 3.301 3.301 0 0 0 1.447-1.817 6.533 6.533 0 0 1-2.087.793A3.286 3.286 0 0 0 7.875 6.03a9.325 9.325 0 0 1-6.767-3.429 3.289 3.289 0 0 0 1.018 4.382A3.323 3.323 0 0 1 .64 6.575v.045a3.288 3.288 0 0 0 2.632 3.218 3.203 3.203 0 0 1-.865.115 3.23 3.23 0 0 1-.614-.057 3.283 3.283 0 0 0 3.067 2.277A6.588 6.588 0 0 1 .78 13.58a6.32 6.32 0 0 1-.78-.045A9.344 9.344 0 0 0 5.026 15z" />
                    </svg>
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    className="rounded-full w-8 h-8"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      viewBox="0 0 16 16"
                    >
                      <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854V1.146zm4.943 12.248V6.169H2.542v7.225h2.401zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248-.822 0-1.359.54-1.359 1.248 0 .694.521 1.248 1.327 1.248h.016zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016a5.54 5.54 0 0 1 .016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225h2.4z" />
                    </svg>
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    className="rounded-full w-8 h-8"
                  >
                    <Share2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          </Card>

          {/* Related Posts */}
          {relatedPosts.length > 0 && (
            <div className="mt-12">
              <h2 className="text-2xl font-bold mb-6">সম্পর্কিত নিবন্ধ</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {relatedPosts.map((relatedPost) => (
                  <Link href={`/blog/${relatedPost.slug}`} key={relatedPost.id}>
                    <Card className="overflow-hidden group h-full hover:shadow-md transition-shadow">
                      <div className="relative h-48 w-full overflow-hidden">
                        <Image
                          src={relatedPost.image}
                          alt={relatedPost.title_bn}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <div className="p-4">
                        <div className="text-sm text-gray-500 mb-2">
                          {formatDate(relatedPost.date)}
                        </div>
                        <h3 className="font-medium group-hover:text-primary transition-colors line-clamp-2">
                          {relatedPost.title_bn}
                        </h3>
                      </div>
                    </Card>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1">
          {/* Author Info */}
          <Card className="overflow-hidden mb-6">
            <div className="p-4 bg-primary text-white font-medium">
              <h2 className="text-lg">লেখক</h2>
            </div>
            <div className="p-5 flex flex-col items-center text-center">
              <div className="w-24 h-24 rounded-full bg-gray-200 mb-4 flex items-center justify-center">
                <User className="w-12 h-12 text-gray-400" />
              </div>
              <h3 className="font-medium text-lg mb-1">{post.author_bn}</h3>
              <p className="text-gray-600 text-sm mb-4">
                কুষ্টিয়াকা ছাবাজারের নিয়মিত লেখক
              </p>
              <Separator className="mb-4" />
              <p className="text-sm text-gray-600">
                খাদ্য, পুষ্টি এবং স্বাস্থ্যকর জীবনযাপন বিষয়ে বিশেষজ্ঞ। নিয়মিত
                গবেষণা এবং লেখালেখির মাধ্যমে মানুষকে সচেতন করতে প্রতিশ্রুতিবদ্ধ।
              </p>
            </div>
          </Card>

          {/* Categories */}
          <Card className="overflow-hidden mb-6">
            <div className="p-4 bg-primary text-white font-medium">
              <h2 className="text-lg">ক্যাটাগরি</h2>
            </div>
            <div className="p-4">
              <ul className="space-y-2">
                {blogCategories.map((category) => (
                  <li key={category.name}>
                    <Link
                      href={`/blog?category=${category.name}`}
                      className="flex items-center justify-between px-3 py-2 rounded hover:bg-gray-100 transition"
                    >
                      <span>{category.name_bn}</span>
                      <span className="text-gray-500 text-sm">
                        {
                          blogPosts.filter((p) => p.category === category.name)
                            .length
                        }
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </Card>

          {/* Recent Posts */}
          <Card className="overflow-hidden">
            <div className="p-4 bg-primary text-white font-medium">
              <h2 className="text-lg">সাম্প্রতিক পোস্ট</h2>
            </div>
            <div className="p-4">
              <ul className="space-y-4">
                {blogPosts
                  .filter((p) => p.id !== post.id)
                  .sort(
                    (a, b) =>
                      new Date(b.date).getTime() - new Date(a.date).getTime()
                  )
                  .slice(0, 5)
                  .map((recentPost) => (
                    <li key={recentPost.id}>
                      <Link
                        href={`/blog/${recentPost.slug}`}
                        className="flex items-start gap-3 group"
                      >
                        <div className="relative w-16 h-16 flex-shrink-0 rounded overflow-hidden">
                          <Image
                            src={recentPost.image}
                            alt={recentPost.title_bn}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <h3 className="text-sm font-medium group-hover:text-primary transition-colors line-clamp-2">
                            {recentPost.title_bn}
                          </h3>
                          <div className="text-xs text-gray-500 mt-1 flex items-center">
                            <Calendar className="w-3 h-3 mr-1" />
                            {formatDate(recentPost.date)}
                          </div>
                        </div>
                      </Link>
                    </li>
                  ))}
              </ul>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
