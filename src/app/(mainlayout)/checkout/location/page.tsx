"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import CustomerLocationCollector from "@/components/checkout/CustomerLocationCollector";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChevronLeft } from "lucide-react";

export default function CheckoutLocationPage() {
  const router = useRouter();
  const [customerLocation, setCustomerLocation] = useState<{
    lat: number;
    lng: number;
    address: string;
  } | null>(null);

  // Load saved location from localStorage on component mount
  useEffect(() => {
    const savedLocation = localStorage.getItem("customerLocation");
    if (savedLocation) {
      try {
        setCustomerLocation(JSON.parse(savedLocation));
      } catch (error) {
        console.error("Error parsing saved location:", error);
      }
    }
  }, []);

  // Save location and proceed to next step
  const handleLocationSave = (location: {
    lat: number;
    lng: number;
    address: string;
  }) => {
    setCustomerLocation(location);
    
    // Save to localStorage for persistence
    localStorage.setItem("customerLocation", JSON.stringify(location));
    
    // Proceed to next checkout step
    router.push("/checkout/payment");
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center mb-6">
          <Link href="/checkout/cart" className="flex items-center text-sm text-gray-600 hover:text-primary">
            <ChevronLeft className="h-4 w-4 mr-1" />
            <span>ব্যাগে ফিরে যান</span>
          </Link>
        </div>

        <div className="mb-6">
          <h1 className="text-2xl font-bold">চেকআউট</h1>
          <p className="text-gray-600">ডেলিভারি ঠিকানা নির্বাচন করুন</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Checkout Steps */}
          <div className="md:col-span-3">
            <Card className="mb-6">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-sm font-medium text-white">
                      1
                    </div>
                    <span className="ml-2 font-medium">ব্যাগ</span>
                  </div>
                  <div className="h-px w-12 bg-gray-200"></div>
                  <div className="flex items-center">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-sm font-medium text-white">
                      2
                    </div>
                    <span className="ml-2 font-medium">ঠিকানা</span>
                  </div>
                  <div className="h-px w-12 bg-gray-200"></div>
                  <div className="flex items-center">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-200 text-sm font-medium text-gray-600">
                      3
                    </div>
                    <span className="ml-2 font-medium text-gray-600">পেমেন্ট</span>
                  </div>
                  <div className="h-px w-12 bg-gray-200"></div>
                  <div className="flex items-center">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-200 text-sm font-medium text-gray-600">
                      4
                    </div>
                    <span className="ml-2 font-medium text-gray-600">নিশ্চিতকরণ</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Location Selection */}
          <div className="md:col-span-2">
            <CustomerLocationCollector
              onLocationSelect={handleLocationSave}
              initialLocation={customerLocation || undefined}
            />
          </div>

          {/* Order Summary */}
          <div className="md:col-span-1">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle>অর্ডার সারাংশ</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between text-sm">
                    <span>উপমোট (৩ আইটেম)</span>
                    <span>৳১,৪৫০</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>ডেলিভারি চার্জ</span>
                    <span>৳৬০</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>ডিসকাউন্ট</span>
                    <span className="text-green-600">-৳১০০</span>
                  </div>
                  <div className="border-t pt-3 flex justify-between font-medium">
                    <span>সর্বমোট</span>
                    <span>৳১,৪১০</span>
                  </div>
                </div>

                <div className="mt-6">
                  <Button
                    className="w-full"
                    disabled={!customerLocation}
                    onClick={() => router.push("/checkout/payment")}
                  >
                    পেমেন্ট পদ্ধতি নির্বাচন করুন
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
