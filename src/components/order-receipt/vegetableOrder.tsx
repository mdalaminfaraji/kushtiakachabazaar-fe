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

const vegetables = [
  // শীতকালীন সবজি
  { name: "বাঁধাকপি", perKgPrice: 50 },
  { name: "ফুলকপি", perKgPrice: 60 },
  { name: "মুলা", perKgPrice: 30 },
  { name: "শালগম", perKgPrice: 35 },
  { name: "গাজর", perKgPrice: 70 },
  { name: "টমেটো", perKgPrice: 80 },
  { name: "বেগুন", perKgPrice: 60 },
  { name: "শিম", perKgPrice: 100 },
  { name: "মটরশুঁটি", perKgPrice: 120 },
  { name: "লাউ", perKgPrice: 50 },
  { name: "ওলকপি", perKgPrice: 55 },
  { name: "কাঁচা কলা", perKgPrice: 30 },
  { name: "কুমড়া", perKgPrice: 45 },
  { name: "পালং শাক", perKgPrice: 40 },
  { name: "মেথি শাক", perKgPrice: 45 },

  // গ্রীষ্মকালীন সবজি
  { name: "পটল", perKgPrice: 50 },
  { name: "করলা", perKgPrice: 70 },
  { name: "ঢেঁড়স", perKgPrice: 60 },
  { name: "ঝিঙা", perKgPrice: 50 },
  { name: "চিচিঙ্গা", perKgPrice: 55 },
  { name: "কাঁকরোল", perKgPrice: 80 },
  { name: "কচু", perKgPrice: 40 },
  { name: "বরবটি", perKgPrice: 100 },
  { name: "চাল কুমড়া", perKgPrice: 50 },
  { name: "কাঁচা আম", perKgPrice: 120 },
  { name: "চাউল কুমড়া", perKgPrice: 55 },
  { name: "ধুন্দল", perKgPrice: 50 },
  { name: "করলা পাতা", perKgPrice: 30 },
  { name: "লাউ শাক", perKgPrice: 40 },
  { name: "কুমড়ার ফুল", perKgPrice: 35 },

  // বর্ষাকালীন সবজি
  { name: "কাঁচা মরিচ", perKgPrice: 150 },
  { name: "চাল কুমড়া", perKgPrice: 50 },
  { name: "ঢেঁড়স", perKgPrice: 60 },
  { name: "করলা", perKgPrice: 70 },
  { name: "কচু শাক", perKgPrice: 40 },
  { name: "মিষ্টি কুমড়া", perKgPrice: 45 },
  { name: "ডাটাশাক", perKgPrice: 35 },
  { name: "কুমড়ার লতা", perKgPrice: 40 },
  { name: "কলমি শাক", perKgPrice: 30 },
  { name: "নট শাক", perKgPrice: 30 },
  { name: "সজনেডাঁটা", perKgPrice: 80 },
  { name: "শাপলা", perKgPrice: 50 },

  // বছরজুড়ে পাওয়া যায় এমন সবজি
  { name: "আলু", perKgPrice: 40 },
  { name: "পেঁয়াজ", perKgPrice: 60 },
  { name: "রসুন", perKgPrice: 140 },
  { name: "আদা", perKgPrice: 180 },
  { name: "লেবু", perKgPrice: 15 },
  { name: "কাঁচা মরিচ", perKgPrice: 150 },
  { name: "লাল শাক", perKgPrice: 40 },
  { name: "পুঁই শাক", perKgPrice: 45 },
  { name: "পাতা কপি", perKgPrice: 50 },
  { name: "ধনে পাতা", perKgPrice: 200 },
  { name: "লাউ", perKgPrice: 50 },
  { name: "শসা", perKgPrice: 60 },

  // কন্দ ও মূলজাতীয় সবজি
  { name: "আদা", perKgPrice: 180 },
  { name: "রসুন", perKgPrice: 140 },
  { name: "মিষ্টি আলু", perKgPrice: 50 },
  { name: "মূলো", perKgPrice: 30 },
  { name: "শালগম", perKgPrice: 35 },
  { name: "কচু", perKgPrice: 40 },
  { name: "ওল", perKgPrice: 45 },
];

const quantityOptions = [250, 500, 750, 1000, 2000, 3000, 4000, 5000];

export default function VegetableOrder() {
  const [order, setOrder] = useState(
    vegetables.map((veg) => ({ ...veg, quantity: 0, total: 0 }))
  );
  const [user, setUser] = useState({ name: "", phone: "", address: "" });
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  const handleQuantityChange = useCallback((index: number, value: any) => {
    setOrder((prevOrder) =>
      prevOrder.map((item, i) =>
        i === index
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
    return order.filter((item) =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase())
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
    if (selectedItems.length === 0) {
      alert("কমপক্ষে একটি সবজি অর্ডার করুন!");
      return;
    }
    if (!user.name || !user.phone || !user.address) {
      alert("অনুগ্রহ করে আপনার তথ্য পূরণ করুন!");
      return;
    }
    console.log(selectedItems);
    const data = { user, order: selectedItems, totalAmount, orderDate: new Date() };
    console.log(data);
    return;
    await fetch("http://localhost:1337/api/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    router.push("/order-success");
  };

  const handleRemoveItem = (index: number) => {
    setOrder((prevOrder) =>
      prevOrder.map((item, i) =>
        i === index ? { ...item, quantity: 0, total: 0 } : item
      )
    );
  };

  const handleAdjustQuantity = (index: number, adjustment: number) => {
    const item = order[index];
    const currentQty = item.quantity;
    const nearestOption = quantityOptions.reduce((prev, curr) => {
      return Math.abs(curr - (currentQty + adjustment)) < Math.abs(prev - (currentQty + adjustment))
        ? curr
        : prev;
    });
    handleQuantityChange(index, nearestOption);
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-6 text-center">সবজি অর্ডার ফর্ম</h2>
      
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Left Column - Product Selection */}
        <div className="space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <Input
              type="text"
              placeholder="সবজি খুঁজুন..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          <ScrollArea className="h-[600px] rounded-md border p-4">
            <div className="grid gap-4">
              {filteredVegetables.map((item, index) => (
                <Card key={index} className="hover:border-primary transition-colors">
                  <CardContent className="flex items-center justify-between p-4">
                    <div className="flex-1">
                      <h3 className="font-medium">{item.name}</h3>
                      <p className="text-sm text-muted-foreground">{item.perKgPrice}৳/কেজি</p>
                    </div>
                    <Select
                      value={item.quantity.toString()}
                      onValueChange={(value) => handleQuantityChange(index, Number(value))}
                    >
                      <SelectTrigger className="w-[120px]">
                        <SelectValue placeholder="পরিমাণ" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="0">0 গ্রাম</SelectItem>
                        {quantityOptions.map((opt) => (
                          <SelectItem key={opt} value={opt.toString()}>
                            {opt >= 1000 ? `${opt/1000} কেজি` : `${opt} গ্রাম`}
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
                    {selectedItems.map((item, index) => (
                      <div key={index} className="flex items-center justify-between p-2 rounded-lg bg-secondary">
                        <div className="flex-1">
                          <h4 className="font-medium">{item.name}</h4>
                          <p className="text-sm text-muted-foreground">
                            {item.quantity >= 1000 
                              ? `${item.quantity/1000} কেজি` 
                              : `${item.quantity} গ্রাম`
                            } × {item.perKgPrice}৳
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => handleAdjustQuantity(index, -quantityOptions[0])}
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
                            onClick={() => handleAdjustQuantity(index, quantityOptions[0])}
                          >
                            <Plus className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-destructive"
                            onClick={() => handleRemoveItem(index)}
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
                <Input
                  placeholder="ঠিকানা"
                  value={user.address}
                  onChange={(e) => setUser({ ...user, address: e.target.value })}
                />
              </div>
            </CardContent>
          </Card>

          <Button
            onClick={handleSubmit}
            className="w-full"
            size="lg"
            disabled={selectedItems.length === 0 || !user.name || !user.phone || !user.address}
          >
            অর্ডার কনফার্ম করুন
          </Button>
        </div>
      </div>
    </div>
  );
}
