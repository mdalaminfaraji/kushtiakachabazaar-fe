import { Button } from "@/components/ui/button";
import { ArrowRight, ShoppingCart } from "lucide-react";
import Link from "next/link";
import { Slider } from "./slider";
const Banner = () => {
  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        {/* Left side - Text Content */}
        <div className="space-y-6">
          <div className="space-y-2">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
              <span className="text-primary">ফ্রেশ</span> এবং{" "}
              <span className="text-primary">অর্গানিক</span> পণ্য
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground">
              আপনার দৈনন্দিন প্রয়োজনীয় সকল পণ্য এখন আপনার দোরগোড়ায়
            </p>
          </div>

          <div className="space-y-4">
            <p className="text-muted-foreground">
              ✓ ১০০% ফ্রেশ এবং অর্গানিক পণ্য
            </p>
            <p className="text-muted-foreground">✓ দ্রুত ডেলিভারি সার্ভিস</p>
            <p className="text-muted-foreground">✓ সর্বোচ্চ মানের পণ্য</p>
          </div>

          <div className="flex gap-4">
            <Button size="lg" className="gap-2">
              <ShoppingCart className="h-5 w-5" />
              শপিং করুন
            </Button>
            <Button variant="outline" size="lg" className="gap-2">
              <Link href="/products" className="flex items-center gap-2">
                আরও দেখুন
                <ArrowRight className="h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>

        {/* Right side - Image Carousel */}
        <Slider />
      </div>
    </div>
  );
};

export default Banner;
