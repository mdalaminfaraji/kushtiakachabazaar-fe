"use client";

import React from "react";
import Image from "next/image";
import { Card } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

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
  const plugin = React.useRef(
    Autoplay({ delay: 5000, stopOnInteraction: true })
  );

  return (
    <Carousel
      plugins={[plugin.current]}
      className="w-full max-w-screen-2xl mx-auto relative h-[300px] md:h-[400px] lg:h-[500px] -z-10"
      opts={{
        align: "start",
        loop: true,
      }}
    >
      <CarouselContent>
        {heroProducts.map((product, index) => (
          <CarouselItem key={product.id} className="md:basis-1/1 lg:basis-1/1">
            <div className="p-1">
              <Card className="border-0">
                <div className="relative aspect-[16/9] w-full overflow-hidden rounded-lg">
                  <Image
                    src={product.image}
                    alt={product.alt}
                    fill
                    className="object-cover"
                    priority={index === 0}
                  />
                </div>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="hidden " />
      <CarouselNext className="hidden " />
    </Carousel>
  );
};
