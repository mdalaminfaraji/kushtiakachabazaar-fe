"use client";

import React from "react";
import { CheckCircle, Package, Truck, Home, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Link from "next/link";

const OrderSuccessPage = () => {
  const [orderNumber, setOrderNumber] = React.useState<string>("");

  // Get the order number from localStorage when component mounts
  React.useEffect(() => {
    const storedOrderNumber = localStorage.getItem('lastOrderNumber');
    if (storedOrderNumber) {
      setOrderNumber(storedOrderNumber);
    } else {
      // Fallback to random generation if no order number is available
      setOrderNumber("KB" + Math.floor(100000 + Math.random() * 900000));
    }
  }, []);

  // Dummy order date
  const orderDate = new Date().toLocaleDateString("bn-BD", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <Breadcrumb className="mb-6">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">হোম</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/checkout">চেকআউট</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>অর্ডার সফল</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="max-w-3xl mx-auto">
        <Card className="p-8 text-center">
          <div className="flex flex-col items-center">
            <CheckCircle className="h-20 w-20 text-green-500 mb-4" />
            <h1 className="text-3xl font-bold mb-2">অর্ডার সফলভাবে সম্পন্ন হয়েছে!</h1>
            <p className="text-gray-600 mb-6">
              আপনার অর্ডার সফলভাবে গ্রহণ করা হয়েছে। আমরা শীঘ্রই আপনার সাথে যোগাযোগ করব।
            </p>

            <div className="bg-gray-50 rounded-lg p-4 w-full mb-6">
              <div className="flex justify-between">
                <span className="text-gray-600">অর্ডার নং:</span>
                <span className="font-medium">{orderNumber}</span>
              </div>
              <div className="flex justify-between mt-2">
                <span className="text-gray-600">অর্ডারের তারিখ:</span>
                <span>{orderDate}</span>
              </div>
              <div className="flex justify-between mt-2">
                <span className="text-gray-600">পেমেন্ট পদ্ধতি:</span>
                <span>ক্যাশ অন ডেলিভারি</span>
              </div>
            </div>

            <Separator className="my-6" />

            <h2 className="text-xl font-semibold mb-4">অর্ডার ট্র্যাকিং</h2>

            <div className="relative w-full">
              <div className="absolute left-8 top-0 h-full w-0.5 bg-gray-200" />

              <div className="flex items-center relative mb-8">
                <div className="z-10 flex items-center justify-center w-16 h-16 bg-green-100 rounded-full border-2 border-green-500">
                  <Package className="h-8 w-8 text-green-600" />
                </div>
                <div className="ml-6">
                  <h3 className="font-medium text-lg">অর্ডার গ্রহণ করা হয়েছে</h3>
                  <p className="text-gray-500">
                    আপনার অর্ডার আমাদের সিস্টেমে গ্রহণ করা হয়েছে
                  </p>
                </div>
              </div>

              <div className="flex items-center relative mb-8">
                <div className="z-10 flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full border-2 border-gray-300">
                  <Package className="h-8 w-8 text-gray-500" />
                </div>
                <div className="ml-6">
                  <h3 className="font-medium text-lg">প্রসেসিং</h3>
                  <p className="text-gray-500">
                    আপনার অর্ডার প্রস্তুত করা হচ্ছে
                  </p>
                </div>
              </div>

              <div className="flex items-center relative mb-8">
                <div className="z-10 flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full border-2 border-gray-300">
                  <Truck className="h-8 w-8 text-gray-500" />
                </div>
                <div className="ml-6">
                  <h3 className="font-medium text-lg">ডেলিভারি</h3>
                  <p className="text-gray-500">
                    আপনার অর্ডার ডেলিভারির জন্য প্রেরণ করা হয়েছে
                  </p>
                </div>
              </div>

              <div className="flex items-center relative">
                <div className="z-10 flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full border-2 border-gray-300">
                  <Home className="h-8 w-8 text-gray-500" />
                </div>
                <div className="ml-6">
                  <h3 className="font-medium text-lg">সম্পন্ন</h3>
                  <p className="text-gray-500">
                    অর্ডার ডেলিভারি সম্পন্ন হয়েছে
                  </p>
                </div>
              </div>
            </div>

            <Separator className="my-6" />

            <div className="flex flex-col sm:flex-row gap-4 w-full">
              <Button asChild variant="outline" className="flex-1">
                <Link href="/products">
                  আরো কেনাকাটা করুন
                </Link>
              </Button>
              <Button asChild className="flex-1 gap-2">
                <Link href="/">
                  হোমপেজে ফিরে যান
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default OrderSuccessPage;
