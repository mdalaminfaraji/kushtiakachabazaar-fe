/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useCallback, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRouter } from "next/navigation";
import { Search, ShoppingCart, Trash2, Plus, Minus } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import LocationInput from "@/components/common/LocationInput";

const vegetables = [
  // শীতকালীন সবজি (Winter Vegetables)
  { id: 1, name: "বাঁধাকপি", englishName: "Cabbage", perKgPrice: 50 },
  { id: 2, name: "ফুলকপি", englishName: "Cauliflower", perKgPrice: 60 },
  { id: 3, name: "মুলা", englishName: "Radish", perKgPrice: 30 },
  { id: 4, name: "শালগম", englishName: "Turnip", perKgPrice: 35 },
  { id: 5, name: "গাজর", englishName: "Carrot", perKgPrice: 70 },
  { id: 6, name: "টমেটো", englishName: "Tomato", perKgPrice: 80 },
  { id: 7, name: "বেগুন", englishName: "Eggplant", perKgPrice: 60 },
  { id: 8, name: "শিম", englishName: "Flat Bean", perKgPrice: 100 },
  { id: 9, name: "মটরশুঁটি", englishName: "Green Peas", perKgPrice: 120 },
  { id: 10, name: "লাউ", englishName: "Bottle Gourd", perKgPrice: 50 },
  { id: 11, name: "ওলকপি", englishName: "Kohlrabi", perKgPrice: 55 },
  { id: 12, name: "কাঁচা কলা", englishName: "Green Banana", perKgPrice: 30 },
  { id: 13, name: "কুমড়া", englishName: "Pumpkin", perKgPrice: 45 },
  { id: 14, name: "পালং শাক", englishName: "Spinach", perKgPrice: 40 },
  { id: 15, name: "মেথি শাক", englishName: "Fenugreek Leaves", perKgPrice: 45 },

  // গ্রীষ্মকালীন সবজি (Summer Vegetables)
  { id: 16, name: "পটল", englishName: "Pointed Gourd", perKgPrice: 50 },
  { id: 17, name: "করলা", englishName: "Bitter Gourd", perKgPrice: 70 },
  { id: 18, name: "ঢেঁড়স", englishName: "Okra", perKgPrice: 60 },
  { id: 19, name: "ঝিঙা", englishName: "Ridge Gourd", perKgPrice: 50 },
  { id: 20, name: "চিচিঙ্গা", englishName: "Snake Gourd", perKgPrice: 55 },
  { id: 21, name: "কাঁকরোল", englishName: "Teasle Gourd", perKgPrice: 80 },
  { id: 22, name: "কচু", englishName: "Taro", perKgPrice: 40 },
  { id: 23, name: "বরবটি", englishName: "Long Beans", perKgPrice: 100 },
  { id: 24, name: "চাল কুমড়া", englishName: "Ash Gourd", perKgPrice: 50 },

  // বছরজুড়ে পাওয়া যায় এমন সবজি (Year-round Vegetables)
  { id: 25, name: "আলু", englishName: "Potato", perKgPrice: 40 },
  { id: 26, name: "পেঁয়াজ", englishName: "Onion", perKgPrice: 60 },
  { id: 27, name: "রসুন", englishName: "Garlic", perKgPrice: 140 },
  { id: 28, name: "আদা", englishName: "Ginger", perKgPrice: 180 },
  { id: 29, name: "লেবু", englishName: "Lemon", perKgPrice: 15 },
  { id: 30, name: "কাঁচা মরিচ", englishName: "Green Chili", perKgPrice: 150 },
];

const quantityOptions = [250, 500, 750, 1000, 2000, 3000, 4000, 5000];

const validatePhoneNumber = (phone: string) => {
  const phoneRegex = /^(01[3-9]\d{8})$/;
  return phoneRegex.test(phone);
};

export default function VegetableOrder() {
  const [order, setOrder] = useState(
    vegetables.map((veg) => ({ ...veg, quantity: 0, total: 0 }))
  );
  const [user, setUser] = useState({
    name: "",
    phone: "",
    address: "",
    location: { lat: 0, lng: 0 },
  });
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  const handleQuantityChange = useCallback((id: number, value: any) => {
    setOrder((prevOrder) =>
      prevOrder.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity: Number(value),
              total: (Number(value) / 1000) * item.perKgPrice,
            }
          : item
      )
    );
  }, []);

  const filteredVegetables = useMemo(() => {
    const query = searchQuery.toLowerCase();
    return order.filter(
      (item) =>
        item.name.toLowerCase().includes(query) ||
        item.englishName.toLowerCase().includes(query)
    );
  }, [order, searchQuery]);

  const selectedItems = useMemo(() => {
    return order.filter((item) => item.quantity > 0);
  }, [order]);

  const totalAmount = useMemo(
    () => order.reduce((acc, item) => acc + item.total, 0),
    [order]
  );

  const handleSubmit = async () => {
    if (!validatePhoneNumber(user.phone)) {
      alert("দয়া করে একটি বৈধ বাংলাদেশী ফোন নম্বর প্রদান করুন।");
      return;
    }

    if (selectedItems.length === 0) {
      alert("কমপক্ষে একটি সবজি অর্ডার করুন!");
      return;
    }
    if (!user.name || !user.phone || !user.address) {
      alert("অনুগ্রহ করে আপনার তথ্য পূরণ করুন!");
      return;
    }
    console.log(selectedItems);
    const data = {
      user,
      order: selectedItems,
      totalAmount,
      orderDate: new Date(),
    };
    console.log(data);
    return;
    await fetch("http://localhost:1337/api/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    router.push("/order-success");
  };

  const handleRemoveItem = (id: number) => {
    setOrder((prevOrder) =>
      prevOrder.map((item) =>
        item.id === id ? { ...item, quantity: 0, total: 0 } : item
      )
    );
  };

  const handleAdjustQuantity = (id: number, adjustment: number) => {
    const item = order.find((i) => i.id === id);
    if (!item) return;

    const currentQty = item.quantity;
    const nearestOption = quantityOptions.reduce((prev, curr) => {
      return Math.abs(curr - (currentQty + adjustment)) <
        Math.abs(prev - (currentQty + adjustment))
        ? curr
        : prev;
    });
    handleQuantityChange(id, nearestOption);
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-6 text-center">সবজি অর্ডার ফর্ম</h2>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Left Column - Product Selection */}
        <div className="space-y-4">
          <div className="relative">
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={20}
            />
            <Input
              type="text"
              placeholder="সবজি খুঁজুন... (বাংলা অথবা English)"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          <ScrollArea className="h-[600px] rounded-md border p-4">
            <div className="grid gap-4">
              {filteredVegetables.map((item) => (
                <Card
                  key={item.id}
                  className="hover:border-primary transition-colors"
                >
                  <CardContent className="flex items-center justify-between p-4">
                    <div className="flex-1">
                      <h3 className="font-medium">{item.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        {item.englishName} • {item.perKgPrice}৳/কেজি
                      </p>
                    </div>
                    <Select
                      value={item.quantity.toString()}
                      onValueChange={(value) =>
                        handleQuantityChange(item.id, Number(value))
                      }
                    >
                      <SelectTrigger className="w-[120px]">
                        <SelectValue placeholder="পরিমাণ" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="0">0 গ্রাম</SelectItem>
                        {quantityOptions.map((opt) => (
                          <SelectItem key={opt} value={opt.toString()}>
                            {opt >= 1000
                              ? `${opt / 1000} কেজি`
                              : `${opt} গ্রাম`}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </CardContent>
                </Card>
              ))}
            </div>
          </ScrollArea>
        </div>

        {/* Right Column - Cart & Checkout */}
        <div className="space-y-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <ShoppingCart className="text-primary" />
                <h3 className="text-lg font-bold">আপনার অর্ডার</h3>
              </div>

              {selectedItems.length === 0 ? (
                <p className="text-center text-muted-foreground py-8">
                  কোন সবজি নির্বাচন করা হয়নি
                </p>
              ) : (
                <ScrollArea className="h-[300px]">
                  <div className="space-y-4">
                    {selectedItems.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center justify-between p-2 rounded-lg bg-secondary"
                      >
                        <div className="flex-1">
                          <h4 className="font-medium">{item.name}</h4>
                          <p className="text-sm text-muted-foreground">
                            {item.quantity >= 1000
                              ? `${item.quantity / 1000} কেজি`
                              : `${item.quantity} গ্রাম`}{" "}
                            × {item.perKgPrice}৳
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() =>
                              handleAdjustQuantity(item.id, -quantityOptions[0])
                            }
                          >
                            <Minus className="h-4 w-4" />
                          </Button>
                          <span className="text-sm font-medium w-20 text-center">
                            {item.total}৳
                          </span>
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() =>
                              handleAdjustQuantity(item.id, quantityOptions[0])
                            }
                          >
                            <Plus className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-destructive"
                            onClick={() => handleRemoveItem(item.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              )}

              {selectedItems.length > 0 && (
                <div className="mt-4 pt-4 border-t">
                  <div className="flex justify-between text-lg font-bold">
                    <span>মোট মূল্য:</span>
                    <span>{totalAmount}৳</span>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 space-y-4">
              <h3 className="font-bold">ডেলিভারি তথ্য</h3>
              <div className="space-y-4">
                <Input
                  placeholder="আপনার নাম"
                  value={user.name}
                  onChange={(e) => setUser({ ...user, name: e.target.value })}
                />
                <Input
                  placeholder="মোবাইল নম্বর"
                  value={user.phone}
                  onChange={(e) => setUser({ ...user, phone: e.target.value })}
                />
                <LocationInput
                  value={user.address}
                  onChange={(location) =>
                    setUser({
                      ...user,
                      address: location.address,
                      location: { lat: location.lat, lng: location.lng },
                    })
                  }
                />
              </div>
            </CardContent>
          </Card>

          <Button
            onClick={handleSubmit}
            className="w-full"
            size="lg"
            disabled={
              selectedItems.length === 0 ||
              !user.name ||
              !user.phone ||
              !user.address
            }
          >
            অর্ডার কনফার্ম করুন
          </Button>
        </div>
      </div>
    </div>
  );
}
