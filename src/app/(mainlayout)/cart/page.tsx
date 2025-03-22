"use client";

import React, { useState } from "react";
import { ShoppingCart, Trash2, Plus, Minus } from "lucide-react";
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
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

// Dummy cart items - in a real app, this would come from a cart state or API
const CART_ITEMS = [
  {
    id: 1,
    name: "টাটকা গাজর",
    name_en: "Fresh Carrot",
    price: 60,
    quantity: 2,
    unit: "৫০০ গ্রাম",
    image: "/images/products/vegetable1.png",
  },
  {
    id: 2,
    name: "টাটকা আলু",
    name_en: "Fresh Potato",
    price: 40,
    quantity: 1,
    unit: "১ কেজি",
    image: "/images/products/vegetable2.png",
  },
  {
    id: 3,
    name: "টাটকা পেঁয়াজ",
    name_en: "Fresh Onion",
    price: 80,
    quantity: 3,
    unit: "৫০০ গ্রাম",
    image: "/images/products/vegetable3.png",
  },
];

const CartPage = () => {
  const router = useRouter();
  const [cartItems, setCartItems] = useState(CART_ITEMS);

  const updateQuantity = (itemId: number, action: "increase" | "decrease") => {
    setCartItems((prev) =>
      prev.map((item) => {
        if (item.id === itemId) {
          return {
            ...item,
            quantity:
              action === "increase"
                ? item.quantity + 1
                : Math.max(1, item.quantity - 1),
          };
        }
        return item;
      })
    );
  };

  const removeItem = (itemId: number) => {
    setCartItems((prev) => prev.filter((item) => item.id !== itemId));
  };

  const calculateSubtotal = () => {
    return cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  };

  const deliveryCharge = 60;
  const subtotal = calculateSubtotal();
  const total = subtotal + deliveryCharge;

  const handleCheckout = () => {
    router.push("/checkout");
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Breadcrumb className="mb-6">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">হোম</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>শপিং কার্ট</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <h1 className="text-3xl font-bold mb-6 flex items-center gap-2">
        <ShoppingCart className="h-8 w-8" />
        আপনার কার্ট ({cartItems.length})
      </h1>

      {cartItems.length === 0 ? (
        <Card className="p-8 text-center">
          <div className="flex flex-col items-center justify-center gap-4">
            <div className="relative h-40 w-40">
              <Image
                src="/images/empty-cart.svg"
                alt="Empty Cart"
                fill
                className="object-contain"
              />
            </div>
            <h2 className="text-2xl font-medium">আপনার কার্ট খালি</h2>
            <p className="text-gray-500 mb-4">
              আপনার কার্টে এখনো কোনো পণ্য যোগ করা হয়নি
            </p>
            <Button asChild>
              <Link href="/products">দোকানে যান</Link>
            </Button>
          </div>
        </Card>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Card>
              <div className="p-6">
                <h2 className="text-xl font-semibold mb-4">কার্ট আইটেম</h2>
                <div className="space-y-4">
                  {cartItems.map((item) => (
                    <div key={item.id}>
                      <div className="flex flex-col sm:flex-row items-start gap-4">
                        <div className="relative h-24 w-24 rounded-md overflow-hidden flex-shrink-0">
                          <Image
                            src={item.image}
                            alt={item.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="flex-grow">
                          <h3 className="font-medium">{item.name}</h3>
                          <p className="text-sm text-gray-500">{item.unit}</p>
                          <div className="mt-2 flex justify-between items-center">
                            <div className="flex items-center border rounded-md">
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 rounded-r-none"
                                onClick={() =>
                                  updateQuantity(item.id, "decrease")
                                }
                              >
                                <Minus className="h-3 w-3" />
                              </Button>
                              <div className="h-8 w-10 flex items-center justify-center">
                                {item.quantity}
                              </div>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 rounded-l-none"
                                onClick={() =>
                                  updateQuantity(item.id, "increase")
                                }
                              >
                                <Plus className="h-3 w-3" />
                              </Button>
                            </div>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="text-red-500"
                              onClick={() => removeItem(item.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                        <div className="flex-shrink-0 font-semibold">
                          ৳ {item.price * item.quantity}
                        </div>
                      </div>
                      <Separator className="my-4" />
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          </div>

          <div>
            <Card>
              <div className="p-6">
                <h2 className="text-xl font-semibold mb-4">অর্ডার সামারি</h2>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">সাবটোটাল</span>
                    <span>৳ {subtotal}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">ডেলিভারি চার্জ</span>
                    <span>৳ {deliveryCharge}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-bold text-lg">
                    <span>মোট</span>
                    <span>৳ {total}</span>
                  </div>
                  <Button
                    onClick={handleCheckout}
                    className="w-full mt-4"
                    size="lg"
                  >
                    চেকআউট করুন
                  </Button>
                  <Button
                    variant="outline"
                    asChild
                    className="w-full mt-2"
                  >
                    <Link href="/products">আরও কেনাকাটা করুন</Link>
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
