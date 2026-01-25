"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import Head from "next/head";
import { Calendar, Tag, User, Clock, ArrowLeft, Share2 } from "lucide-react";
import { GET_BLOG, GET_BLOGS } from "@/graphql/blogs/query/blogsQuery";
import { useQuery } from "@apollo/client/react";
import type { Blog, BlogImage, BlogTag, BlogQueryResponse, BlogsQueryResponse } from "@/types/blog";
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

  // Fetch the specific blog post
  const { data, loading, error } = useQuery<BlogQueryResponse>(GET_BLOG, {
    variables: { slug },
  });

  // Fetch all blogs for related posts
  const { data: allBlogsData } = useQuery<BlogsQueryResponse>(GET_BLOGS);

  // Get image URL
  const getImageUrl = (image?: BlogImage) => {
    if (!image) return "/placeholder-blog.jpg";
    return `${process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337"}${image.url}`;
  };

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

  // Loading state
  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center items-center min-h-[400px]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-gray-600">লোড হচ্ছে...</p>
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-12">
          <h3 className="text-xl font-medium mb-2 text-red-600">ত্রুটি ঘটেছে</h3>
          <p className="text-gray-600">{error.message}</p>
        </div>
      </div>
    );
  }

  // Get the blog post
  const post = data?.blogs?.[0];

  // If post not found
  if (!post) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-12">
          <h3 className="text-xl font-medium mb-2">নিবন্ধ পাওয়া যায়নি</h3>
          <p className="text-gray-600 mb-4">দুঃখিত, এই নিবন্ধটি খুঁজে পাওয়া যায়নি।</p>
          <Link href="/blog">
            <Button>সকল ব্লগে ফিরে যান</Button>
          </Link>
        </div>
      </div>
    );
  }

  // Get related posts (same category, excluding current post)
  const allBlogs = allBlogsData?.blogs || [];
  const relatedPosts = [...allBlogs]
    .filter((p: Blog) => p.category?.documentId === post.category?.documentId && p.documentId !== post.documentId)
    .slice(0, 3);

  const readingTime = post.readingTime || calculateReadingTime(post.content_bn || "");

  return (
    <>
      <Head>
        <title>{post.title_bn} | কুষ্টিয়াকা ছাবাজার ব্লগ</title>
        <meta name="description" content={post.excerpt_bn || post.excerpt} />
        <meta name="keywords" content={`${post.category?.name_bn}, ${post.tags?.map(t => t.name_bn).join(', ')}, শীতকালীন সবজি, স্বাস্থ্য টিপস`} />
        
        {/* Open Graph */}
        <meta property="og:title" content={post.title_bn} />
        <meta property="og:description" content={post.excerpt_bn || post.excerpt} />
        <meta property="og:type" content="article" />
        {post.featuredImage && (
          <meta property="og:image" content={getImageUrl(post.featuredImage)} />
        )}
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={post.title_bn} />
        <meta name="twitter:description" content={post.excerpt_bn || post.excerpt} />
        {post.featuredImage && (
          <meta name="twitter:image" content={getImageUrl(post.featuredImage)} />
        )}
      </Head>
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
                src={getImageUrl(post.featuredImage)}
                alt={post.title_bn}
                fill
                priority
                className="object-cover"
              />
              <div className="absolute top-4 right-4">
                <Badge className="bg-primary text-white px-3 py-1">
                  {post.category?.name_bn || 'সাধারণ'}
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
                  <span>{formatDate(post.publishedDate || post.createdAt || new Date().toISOString())}</span>
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
                <div dangerouslySetInnerHTML={{ __html: post.content_bn || "" }} />
                {/* {post.content_bn?.split("\n").map((paragraph: string, index: number) => (
                  <p key={index} className="mb-4 text-gray-800 leading-relaxed">
                    {paragraph}
                  </p>
                ))} */}
              </div>

              {/* Tags */}
              {post.tags && post.tags.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-lg font-medium mb-3">ট্যাগ:</h3>
                  <div className="flex flex-wrap gap-2">
                    {post.tags.map((tag: BlogTag) => (
                      <Link href={`/blog?tag=${tag.slug}`} key={tag.documentId}>
                        <Badge
                          variant="outline"
                          className="hover:bg-primary/10 transition-colors cursor-pointer"
                        >
                          <Tag className="w-3 h-3 mr-1" />
                          {tag.name_bn}
                        </Badge>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

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
                {relatedPosts.map((relatedPost: Blog) => (
                  <Link href={`/blog/${relatedPost.slug}`} key={relatedPost.documentId}>
                    <Card className="overflow-hidden group h-full hover:shadow-md transition-shadow">
                      <div className="relative h-48 w-full overflow-hidden">
                        <Image
                          src={getImageUrl(relatedPost.featuredImage)}
                          alt={relatedPost.title_bn}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <div className="p-4">
                        <div className="text-sm text-gray-500 mb-2">
                          {formatDate(relatedPost.publishedDate || relatedPost.createdAt || new Date().toISOString())}
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
                {post.category && (
                  <li>
                    <Link
                      href={`/blog?category=${post.category.slug}`}
                      className="flex items-center justify-between px-3 py-2 rounded hover:bg-gray-100 transition"
                    >
                      <span>{post.category.name_bn}</span>
                    </Link>
                  </li>
                )}
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
                {[...allBlogs]
                  .filter((p: Blog) => p.documentId !== post.documentId)
                  .sort(
                    (a: Blog, b: Blog) =>
                      new Date(b.publishedDate || b.createdAt || '').getTime() - new Date(a.publishedDate || a.createdAt || '').getTime()
                  )
                  .slice(0, 5)
                  .map((recentPost: Blog) => (
                    <li key={recentPost.documentId}>
                      <Link
                        href={`/blog/${recentPost.slug}`}
                        className="flex items-start gap-3 group"
                      >
                        <div className="relative w-16 h-16 flex-shrink-0 rounded overflow-hidden">
                          <Image
                            src={getImageUrl(recentPost.featuredImage)}
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
                            {formatDate(recentPost.publishedDate || recentPost.createdAt || new Date().toISOString())}
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
    </>
  );
}
