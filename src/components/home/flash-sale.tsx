"use client";

import React, { useState, useEffect } from "react";
import { products } from "@/data/products";
import ProductCard from "@/components/shared/product-card";

const FlashSale = () => {
  const flashSaleProducts = products.filter((product) => product.isFlashSale);
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    // Set a common end date for the flash sale
    const endDate = new Date(flashSaleProducts[0]?.flashSaleEndDate || "");

    const calculateTimeLeft = () => {
      const now = new Date();
      const difference = endDate.getTime() - now.getTime();

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      }
    };

    const timer = setInterval(calculateTimeLeft, 1000);
    calculateTimeLeft();

    return () => clearInterval(timer);
  }, [flashSaleProducts]);

  const formatTime = (time: number) => {
    return time < 10 ? `0${time}` : time;
  };

  return (
    <div className="py-8">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6">
        <h2 className="text-2xl md:text-3xl font-bold">
          <span className="text-red-500">ফ্ল্যাশ</span> সেল
        </h2>
        <div className="flex items-center mt-2 md:mt-0 space-x-2">
          <div className="text-sm md:text-base">শেষ হতে বাকি:</div>
          <div className="flex space-x-1">
            <div className="bg-primary/10 text-primary px-2 py-1 rounded">
              <span className="font-bold">{formatTime(timeLeft.days)}</span>
              <span className="text-xs">দিন</span>
            </div>
            <div className="bg-primary/10 text-primary px-2 py-1 rounded">
              <span className="font-bold">{formatTime(timeLeft.hours)}</span>
              <span className="text-xs">ঘন্টা</span>
            </div>
            <div className="bg-primary/10 text-primary px-2 py-1 rounded">
              <span className="font-bold">{formatTime(timeLeft.minutes)}</span>
              <span className="text-xs">মিনিট</span>
            </div>
            <div className="bg-primary/10 text-primary px-2 py-1 rounded">
              <span className="font-bold">{formatTime(timeLeft.seconds)}</span>
              <span className="text-xs">সেকেন্ড</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {flashSaleProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default FlashSale;
