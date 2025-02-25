"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
const heroProducts = [
  {
    id: 1,
    image: "/images/banner/vegetables.jpg",
    alt: "Fresh Vegetables",
  },
  {
    id: 2,
    image: "/images/banner/fruits.jpg",
    alt: "Fresh Fruits",
  },
  {
    id: 3,
    image: "/images/banner/rice.jpeg",
    alt: "Premium Rice",
  },
  {
    id: 4,
    image: "/images/banner/oil.jpg",
    alt: "Cooking Oil",
  },
];
export const Slider = () => {
  const [currentImage, setCurrentImage] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % heroProducts.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);
  return (
    <div className="relative h-[300px] md:h-[400px] lg:h-[500px] z-10">
      {isLoading ? (
        <div className="w-full h-full animate-pulse bg-muted rounded-lg" />
      ) : (
        <>
          {heroProducts.map((product, index) => (
            <div
              key={product.id}
              className={`absolute inset-0 transition-opacity duration-1000 ${
                index === currentImage ? "opacity-100" : "opacity-0"
              }`}
            >
              <Image
                src={product.image}
                alt={product.alt}
                fill
                className="object-contain z-0"
                priority={index === 0}
              />
            </div>
          ))}
          {/* Dots indicator */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
            {heroProducts.map((_, index) => (
              <button
                key={index}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === currentImage ? "bg-primary w-4" : "bg-primary/50"
                }`}
                onClick={() => setCurrentImage(index)}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};
