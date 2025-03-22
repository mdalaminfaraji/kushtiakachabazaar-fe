"use client";

import React, { useState } from "react";
import { CreditCard, MapPin, Truck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  RadioGroup,
  RadioGroupItem,
} from "@/components/ui/radio-group";
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

const CheckoutPage = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    address: "",
    city: "",
    district: "dhaka",
    postcode: "",
    paymentMethod: "cash",
    notes: "",
  });

  const calculateSubtotal = () => {
    return CART_ITEMS.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
  };

  const deliveryCharge = 60;
  const subtotal = calculateSubtotal();
  const total = subtotal + deliveryCharge;

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Combine order data (products + user info)
    const orderData = {
      items: CART_ITEMS,
      customerInfo: formData,
      totals: {
        subtotal,
        deliveryCharge,
        total,
      },
      orderDate: new Date().toISOString(),
    };

    try {
      // In a real application, send to backend API
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/orders`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
      });

      if (!response.ok) {
        throw new Error('Order submission failed');
      }

      const result = await response.json();
      
      // Store order number in localStorage or state management system
      if (typeof window !== 'undefined') {
        localStorage.setItem('lastOrderNumber', result.data.orderNumber);
      }

      // Redirect to success page
      router.push('/order-success');
    } catch (error) {
      console.error('Error submitting order:', error);
      alert('অর্ডার করতে সমস্যা হয়েছে। আবার চেষ্টা করুন।');
    }
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
            <BreadcrumbLink href="/cart">কার্ট</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>চেকআউট</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <h1 className="text-3xl font-bold mb-8">চেকআউট</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Shipping Information */}
            <Card className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <MapPin className="h-5 w-5 text-primary" />
                <h2 className="text-xl font-semibold">ডেলিভারি ঠিকানা</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="fullName">নাম</Label>
                  <Input
                    id="fullName"
                    name="fullName"
                    placeholder="আপনার পুরো নাম"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">মোবাইল নম্বর</Label>
                  <Input
                    id="phone"
                    name="phone"
                    placeholder="01XXX-XXXXXX"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">ইমেইল (ঐচ্ছিক)</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="example@domain.com"
                    value={formData.email}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="district">জেলা</Label>
                  <Select
                    value={formData.district}
                    onValueChange={(value) =>
                      handleSelectChange("district", value)
                    }
                  >
                    <SelectTrigger id="district">
                      <SelectValue placeholder="জেলা নির্বাচন করুন" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="dhaka">ঢাকা</SelectItem>
                      <SelectItem value="chittagong">চট্টগ্রাম</SelectItem>
                      <SelectItem value="rajshahi">রাজশাহী</SelectItem>
                      <SelectItem value="khulna">খুলনা</SelectItem>
                      <SelectItem value="barishal">বরিশাল</SelectItem>
                      <SelectItem value="sylhet">সিলেট</SelectItem>
                      <SelectItem value="rangpur">রংপুর</SelectItem>
                      <SelectItem value="mymensingh">ময়মনসিংহ</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="city">শহর / উপজেলা</Label>
                  <Input
                    id="city"
                    name="city"
                    placeholder="আপনার শহর বা উপজেলা"
                    value={formData.city}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="postcode">পোস্টকোড (ঐচ্ছিক)</Label>
                  <Input
                    id="postcode"
                    name="postcode"
                    placeholder="১২০০"
                    value={formData.postcode}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="address">বিস্তারিত ঠিকানা</Label>
                  <Textarea
                    id="address"
                    name="address"
                    placeholder="বাসা নম্বর, রোড নম্বর, ব্লক, এলাকা ইত্যাদি"
                    value={formData.address}
                    onChange={handleInputChange}
                    rows={3}
                    required
                  />
                </div>
              </div>
            </Card>

            {/* Delivery Options */}
            <Card className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <Truck className="h-5 w-5 text-primary" />
                <h2 className="text-xl font-semibold">ডেলিভারি অপশন</h2>
              </div>

              <RadioGroup
                defaultValue="standard"
                className="grid grid-cols-1 md:grid-cols-2 gap-4"
              >
                <div className="border rounded-lg p-4 flex items-start gap-3">
                  <RadioGroupItem
                    value="standard"
                    id="standard-delivery"
                    className="mt-1"
                  />
                  <div>
                    <Label htmlFor="standard-delivery" className="font-medium">
                      স্ট্যান্ডার্ড ডেলিভারি
                    </Label>
                    <p className="text-sm text-gray-500">
                      ১-২ দিনের মধ্যে ডেলিভারি করা হবে
                    </p>
                    <p className="text-sm font-medium mt-1">৳ {deliveryCharge}</p>
                  </div>
                </div>
                <div className="border rounded-lg p-4 flex items-start gap-3 opacity-50">
                  <RadioGroupItem
                    value="express"
                    id="express-delivery"
                    className="mt-1"
                    disabled
                  />
                  <div>
                    <Label
                      htmlFor="express-delivery"
                      className="font-medium text-gray-400"
                    >
                      এক্সপ্রেস ডেলিভারি
                    </Label>
                    <p className="text-sm text-gray-500">
                      ৪-৫ ঘন্টার মধ্যে ডেলিভারি (শীঘ্রই আসছে)
                    </p>
                    <p className="text-sm font-medium mt-1">৳ 120</p>
                  </div>
                </div>
              </RadioGroup>
            </Card>

            {/* Payment Method */}
            <Card className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <CreditCard className="h-5 w-5 text-primary" />
                <h2 className="text-xl font-semibold">পেমেন্ট পদ্ধতি</h2>
              </div>

              <Tabs
                defaultValue="cash"
                onValueChange={(value) =>
                  handleSelectChange("paymentMethod", value)
                }
              >
                <TabsList className="grid grid-cols-2 mb-4">
                  <TabsTrigger value="cash">ক্যাশ অন ডেলিভারি</TabsTrigger>
                  <TabsTrigger value="online">অনলাইন পেমেন্ট</TabsTrigger>
                </TabsList>
                <TabsContent value="cash">
                  <div className="bg-gray-50 p-4 rounded-lg border">
                    <p className="text-sm">
                      পণ্য হাতে পাওয়ার পর টাকা প্রদান করুন। ডেলিভারি ম্যান আপনার
                      কাছ থেকে টাকা সংগ্রহ করবেন।
                    </p>
                  </div>
                </TabsContent>
                <TabsContent value="online">
                  <div className="bg-gray-50 p-4 rounded-lg border">
                    <p className="text-sm text-center">
                      অনলাইন পেমেন্ট অপশন শীঘ্রই আসছে!
                    </p>
                  </div>
                </TabsContent>
              </Tabs>
            </Card>

            {/* Additional Notes */}
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4">অতিরিক্ত মন্তব্য (ঐচ্ছিক)</h2>
              <Textarea
                name="notes"
                placeholder="অর্ডার সম্পর্কে আপনার কোন বিশেষ নির্দেশনা থাকলে এখানে লিখুন"
                value={formData.notes}
                onChange={handleInputChange}
                rows={3}
              />
            </Card>
          </form>
        </div>

        {/* Order Summary */}
        <div>
          <Card className="sticky top-10">
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-4">অর্ডার সামারি</h2>

              <div className="space-y-3 mb-6">
                {CART_ITEMS.map((item) => (
                  <div key={item.id} className="flex justify-between">
                    <div className="flex-grow">
                      <span className="text-gray-800">
                        {item.name} ({item.unit}) x {item.quantity}
                      </span>
                    </div>
                    <span className="font-medium">
                      ৳ {item.price * item.quantity}
                    </span>
                  </div>
                ))}
              </div>

              <Separator className="my-3" />

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
                  type="submit"
                  className="w-full mt-4"
                  size="lg"
                  onClick={handleSubmit}
                >
                  অর্ডার নিশ্চিত করুন
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
