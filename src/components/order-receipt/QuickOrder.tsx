/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useMemo, useState } from "react";
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
import { Search, ShoppingCart, Trash2, Plus, Minus, CheckCircle2 } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import LocationInput from "@/components/common/LocationInput";
import { cn } from "@/lib/utils";
import { useMutation, useQuery } from "@apollo/client/react";
import { CREATE_ORDER_MUTATION } from "@/graphql/orders/mutations";
import { GET_PRODUCTS } from "@/graphql/products/query/productQuery";
import { toast } from "sonner";
import { CreateOrderResponse, OrderInput, ProductsResponse, Product } from "@/types/order";
import { useEffect } from "react";


// Quantity options for weight-based products (in grams)
const quantityOptions = [250, 500, 750, 1000, 2000, 3000, 4000, 5000];

// Quantity options for piece-based products
const pieceOptions = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12, 15, 20];

const validatePhoneNumber = (phone: string) => {
  const phoneRegex = /^(01[3-9]\d{8})$/;
  return phoneRegex.test(phone);
};

export default function QuickOrder() {
  const [order, setOrder] = useState<any[]>([]);
  const { data: productsData, loading: productsLoading } = useQuery<ProductsResponse>(GET_PRODUCTS);

  useEffect(() => {
    if (productsData?.products) {
      const formattedProducts = productsData.products.map((p: Product) => {
        const isPiece = p.unit.toLowerCase().includes("piece") || p.unit.toLowerCase().includes("পিস");
        return {
          id: p.documentId,
          name: p.name_bn,
          englishName: p.name,
          price: p.price,
          unit: p.unit,
          isPricePerPiece: isPiece,
          quantity: 0,
          total: 0,
        };
      });
      setOrder(formattedProducts);
    }
  }, [productsData]);
  const [user, setUser] = useState({
    name: "Alamin",
    phone: "01711111111",
    address: "Narail, Bangladesh",
    location: { lat: 23.1580, lng: 89.5271 },
  });
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  // Update handleQuantityChange to handle both types
  const handleQuantityChange = (id: number, quantity: number) => {
    setOrder((prevOrder) =>
      prevOrder.map((item) => {
        if (item.id !== id) return item;

        const newQuantity = quantity;
        const total = item.isPricePerPiece
          ? newQuantity * (item.price || 0)
          : (newQuantity / 1000) * (item.price || 0);

        return {
          ...item,
          quantity: newQuantity,
          total,
        };
      })
    );
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

    if (item.isPricePerPiece) {
      // For piece-based products, just increment/decrement by 1
      const newQty = Math.max(0, currentQty + (adjustment > 0 ? 1 : -1));
      handleQuantityChange(id, newQty);
    } else {
      // For weight-based products, use the existing logic
      const nearestOption = quantityOptions.reduce((prev, curr) => {
        return Math.abs(curr - (currentQty + adjustment)) <
          Math.abs(prev - (currentQty + adjustment))
          ? curr
          : prev;
      });
      handleQuantityChange(id, nearestOption);
    }
  };

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

  const [createOrder, { loading }] = useMutation<CreateOrderResponse, { data: OrderInput }>(CREATE_ORDER_MUTATION, {
    onCompleted: (data) => {
      const orderId = data?.createOrder?.documentId || "KB" + Math.floor(100000 + Math.random() * 900000);
      localStorage.setItem('lastOrderNumber', orderId);
      localStorage.setItem('lastOrderData', JSON.stringify({
        items: selectedItems,
        total: totalAmount,
        customer: user,
        date: new Date().toISOString()
      }));
      toast.success("অর্ডার সফলভাবে সম্পন্ন হয়েছে!");
      router.push("/order-success");
    },
    onError: (error) => {
      console.error("Order error:", error);
      toast.error("অর্ডার করতে সমস্যা হয়েছে। আবার চেষ্টা করুন।");
    },
  });

  const handleSubmit = async () => {
    if (!validatePhoneNumber(user.phone)) {
      toast.warning("দয়া করে একটি বৈধ বাংলাদেশী ফোন নম্বর প্রদান করুন।");
      return;
    }

    if (selectedItems.length === 0) {
      toast.warning("কমপক্ষে একটি পণ্য অর্ডার করুন!");
      return;
    }
    if (!user.name || !user.phone || !user.address) {
      toast.warning("অনুগ্রহ করে আপনার তথ্য পূরণ করুন!");
      return;
    }

    const mutationData = {
      customerName: user.name,
      customerPhone: user.phone,
      deliveryAddress: user.address,
      location: user.location,
      totalAmount: totalAmount,
      products: selectedItems.map(item => item.id), // already documentId
      orderStatus: "Pending",
    };

    await createOrder({
      variables: {
        data: mutationData,
      },
    });
  };
  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-6 text-center">পণ্য অর্ডার ফর্ম</h2>

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
              placeholder="পণ্য খুঁজুন... (বাংলা অথবা English)"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          <ScrollArea className="h-[600px] rounded-md border p-4">
            <div className="grid gap-4">
              {productsLoading ? (
                <p className="text-center py-8">পণ্য লোড হচ্ছে...</p>
              ) : filteredVegetables.length === 0 ? (
                <p className="text-center py-8">কোন পণ্য পাওয়া যায়নি</p>
              ) : (
                filteredVegetables.map((item) => (
                  <Card
                    key={item.id}
                    className={cn(
                      "transition-all duration-200 border-2 relative overflow-hidden",
                      item.quantity > 0 
                        ? "border-primary bg-primary/5 shadow-sm" 
                        : "hover:border-primary/30 border-transparent bg-card"
                    )}
                  >
                    {item.quantity > 0 && (
                      <div className="absolute top-0 right-0 p-1">
                        <CheckCircle2 className="w-4 h-4 text-primary" />
                      </div>
                    )}
                    <CardContent className="flex items-center justify-between p-4">
                      <div className="flex-1">
                        <h3 className="font-medium">{item.name}</h3>
                        <p className="text-sm text-muted-foreground">
                          {item.englishName} - {item.price}৳/{item.unit}
                        </p>
                      </div>
                      <Select
                        value={item.quantity.toString()}
                        onValueChange={(value) =>
                          handleQuantityChange(item.id, Number(value))
                        }
                      >
                        <SelectTrigger className="w-[120px]">
                          <SelectValue
                            placeholder={item.isPricePerPiece ? "পিস" : "পরিমাণ"}
                          />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="0">
                            {item.isPricePerPiece ? "0 পিস" : "0 গ্রাম"}
                          </SelectItem>
                          {(item.isPricePerPiece
                            ? pieceOptions
                            : quantityOptions
                          ).map((opt) => (
                            <SelectItem key={opt} value={opt.toString()}>
                              {item.isPricePerPiece
                                ? `${opt} পিস`
                                : opt >= 1000
                                ? `${opt / 1000} কেজি`
                                : `${opt} গ্রাম`}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </CardContent>
                  </Card>
                ))
              )}
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
                  কোন পণ্য নির্বাচন করা হয়নি
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
                            {item.isPricePerPiece
                              ? `${item.quantity} পিস × ${item.price}৳`
                              : `${
                                  item.quantity >= 1000
                                    ? `${item.quantity / 1000} কেজি`
                                    : `${item.quantity} গ্রাম`
                                } × ${item.price}৳`}
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
              loading ||
              selectedItems.length === 0 ||
              !user.name ||
              !user.phone ||
              !user.address
            }
          >
            {loading ? "প্রসেসিং..." : "অর্ডার কনফার্ম করুন"}
          </Button>
        </div>
      </div>
    </div>
  );
}
