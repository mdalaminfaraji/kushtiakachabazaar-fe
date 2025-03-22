/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState, useEffect } from "react";
import DeliveryRouteMap from "@/components/map/DeliveryRouteMap";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search, MapPin, Package, Truck, CheckCircle } from "lucide-react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Mock shop location (seller's location)
const shopLocation = {
  lat: 23.8041,
  lng: 90.4152,
  address: "আমাদের দোকান, বসুন্ধরা, ঢাকা"
};

// Mock data for demonstration
const mockOrders = [
  {
    id: "ORD-6789",
    customerName: "রহিম আহমেদ",
    address: "১২৩/এ, গুলশান-১, ঢাকা",
    phone: "01712345678",
    totalAmount: "৳1,250",
    status: "pending",
    orderDate: "২২ মার্চ, ২০২৫",
    customerLocation: {
      lat: 23.8103,
      lng: 90.4125,
      address: "১২৩/এ, গুলশান-১, ঢাকা",
    },
    items: [
      { name: "স্বাস্থ্যকর তাজা শাকসবজি প্যাকেট", quantity: 2, price: "৳450" },
      { name: "দেশি মুরগির ডিম (১২টি)", quantity: 1, price: "৳160" },
      { name: "খাঁটি ফুলের মধু ২৫০গ্রাম", quantity: 1, price: "৳320" },
    ],
  },
  {
    id: "ORD-5678",
    customerName: "ফাতেমা খাতুন",
    address: "৪৫/বি, বনানী, ঢাকা",
    phone: "01812345678",
    totalAmount: "৳2,340",
    status: "in_progress",
    orderDate: "২১ মার্চ, ২০২৫",
    customerLocation: {
      lat: 23.7937,
      lng: 90.4066,
      address: "৪৫/বি, বনানী, ঢাকা",
    },
    items: [
      { name: "দেশি চাল ৫কেজি", quantity: 1, price: "৳390" },
      { name: "সয়াবিন তেল ৫লিটার", quantity: 1, price: "৳850" },
      { name: "গরুর মাংস (প্রিমিয়াম)", quantity: 2, price: "৳1,100" },
    ],
  },
  {
    id: "ORD-4567",
    customerName: "করিম হোসেন",
    address: "৭৮/সি, মিরপুর-১০, ঢাকা",
    phone: "01912345678",
    totalAmount: "৳980",
    status: "completed",
    orderDate: "২০ মার্চ, ২০২৫",
    customerLocation: {
      lat: 23.8067,
      lng: 90.3676,
      address: "৭৮/সি, মিরপুর-১০, ঢাকা",
    },
    items: [
      { name: "মিশ্র ফলের প্যাকেট", quantity: 1, price: "৳550" },
      { name: "দেশি মিষ্টি দই ৫০০গ্রাম", quantity: 2, price: "৳430" },
    ],
  },
];

export default function DeliveryTrackingPage() {
  const [selectedTab, setSelectedTab] = useState("pending");
  const [selectedOrder, setSelectedOrder] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredOrders, setFilteredOrders] = useState(mockOrders);

  // Filter orders based on status and search query
  useEffect(() => {
    const filtered = mockOrders.filter(
      (order) =>
        (selectedTab === "all" || order.status === selectedTab) &&
        (order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
          order.customerName
            .toLowerCase()
            .includes(searchQuery.toLowerCase()) ||
          order.address.toLowerCase().includes(searchQuery.toLowerCase()))
    );
    setFilteredOrders(filtered);
  }, [selectedTab, searchQuery]);

  // Set the first order as selected by default
  useEffect(() => {
    if (filteredOrders.length > 0 && !selectedOrder) {
      setSelectedOrder(filteredOrders[0]);
    }
  }, [filteredOrders, selectedOrder]);

  // Handle order status update
  const handleStatusUpdate = (status: string) => {
    if (!selectedOrder) return;

    const updatedOrders = mockOrders.map((order) =>
      order.id === selectedOrder.id ? { ...order, status } : order
    );
    // In a real app, you'd make an API call here to update the status
    console.log("Updating order status:", selectedOrder.id, status);

    // Update the selected order
    setSelectedOrder({ ...selectedOrder, status });

    // For the mock, we'll also update our mock data
    setFilteredOrders(
      updatedOrders.filter(
        (order) =>
          (selectedTab === "all" || order.status === selectedTab) &&
          (order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
            order.customerName
              .toLowerCase()
              .includes(searchQuery.toLowerCase()) ||
            order.address.toLowerCase().includes(searchQuery.toLowerCase()))
      )
    );
  };

  // Get status icon
  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending":
        return <Package className="h-5 w-5 text-yellow-500" />;
      case "in_progress":
        return <Truck className="h-5 w-5 text-blue-500" />;
      case "completed":
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      default:
        return <Package className="h-5 w-5" />;
    }
  };

  // Get status label
  const getStatusLabel = (status: string) => {
    switch (status) {
      case "pending":
        return "অপেক্ষমান";
      case "in_progress":
        return "ডেলিভারি চলছে";
      case "completed":
        return "সম্পন্ন";
      default:
        return status;
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">ডেলিভারি ট্র্যাকিং</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Orders List */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>অর্ডার তালিকা</CardTitle>
              <CardDescription>
                সব অর্ডার এবং তাদের স্ট্যাটাস দেখুন
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Tabs & Search */}
                <div className="space-y-2">
                  <Tabs
                    defaultValue="pending"
                    value={selectedTab}
                    onValueChange={setSelectedTab}
                  >
                    <TabsList className="grid grid-cols-4 w-full">
                      <TabsTrigger value="all">সব</TabsTrigger>
                      <TabsTrigger value="pending">অপেক্ষমান</TabsTrigger>
                      <TabsTrigger value="in_progress">চলছে</TabsTrigger>
                      <TabsTrigger value="completed">সম্পন্ন</TabsTrigger>
                    </TabsList>
                  </Tabs>

                  <div className="relative">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="অর্ডার নম্বর বা গ্রাহক খুঁজুন"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-8"
                    />
                  </div>
                </div>

                {/* Orders */}
                <div className="space-y-2">
                  {filteredOrders.length === 0 ? (
                    <div className="text-center py-8 text-gray-500">
                      কোন অর্ডার পাওয়া যায়নি
                    </div>
                  ) : (
                    filteredOrders.map((order) => (
                      <div
                        key={order.id}
                        className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                          selectedOrder?.id === order.id
                            ? "border-primary bg-primary/5"
                            : "hover:bg-gray-50"
                        }`}
                        onClick={() => setSelectedOrder(order)}
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <div className="font-medium">{order.id}</div>
                            <div className="text-sm text-gray-500">
                              {order.customerName}
                            </div>
                          </div>
                          <div className="flex items-center">
                            {getStatusIcon(order.status)}
                            <span
                              className={`text-xs ml-1 ${
                                order.status === "pending"
                                  ? "text-yellow-500"
                                  : order.status === "in_progress"
                                  ? "text-blue-500"
                                  : "text-green-500"
                              }`}
                            >
                              {getStatusLabel(order.status)}
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center text-xs text-gray-500 mt-1">
                          <MapPin className="h-3 w-3 mr-1" />
                          <span className="truncate">{order.address}</span>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Order Details & Map */}
        <div className="lg:col-span-2">
          {selectedOrder ? (
            <div className="space-y-6">
              {/* Order Details */}
              <Card>
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-center">
                    <div>
                      <CardTitle>{selectedOrder.id}</CardTitle>
                      <CardDescription>
                        অর্ডার তারিখ: {selectedOrder.orderDate}
                      </CardDescription>
                    </div>
                    <div className="flex items-center px-3 py-1 rounded-full bg-gray-100">
                      {getStatusIcon(selectedOrder.status)}
                      <span className="text-sm ml-1">
                        {getStatusLabel(selectedOrder.status)}
                      </span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <h4 className="text-sm font-medium mb-1">
                        গ্রাহকের তথ্য
                      </h4>
                      <p className="text-sm">{selectedOrder.customerName}</p>
                      <p className="text-sm">{selectedOrder.phone}</p>
                      <p className="text-sm">{selectedOrder.address}</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium mb-1">
                        অর্ডার সামারি
                      </h4>
                      <p className="text-sm">
                        মোট: {selectedOrder.totalAmount}
                      </p>
                      <p className="text-sm">
                        পণ্য: {selectedOrder.items.length} টি
                      </p>
                      <p className="text-sm">
                        স্ট্যাটাস: {getStatusLabel(selectedOrder.status)}
                      </p>
                    </div>
                  </div>

                  <h4 className="text-sm font-medium mb-2">অর্ডার আইটেম</h4>
                  <div className="space-y-2">
                    {selectedOrder.items.map((item: any, idx: number) => (
                      <div
                        key={idx}
                        className="flex justify-between items-center text-sm p-2 border-b last:border-0"
                      >
                        <div className="flex-1">
                          <span className="font-medium">{item.name}</span>
                          <span className="text-gray-500 ml-2">
                            x{item.quantity}
                          </span>
                        </div>
                        <div>{item.price}</div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Delivery Map */}
              <DeliveryRouteMap
                sellerLocation={shopLocation}
                customerLocation={selectedOrder.customerLocation}
                deliveryStatus={selectedOrder.status}
                onStartDelivery={() => handleStatusUpdate("in_progress")}
                onCompleteDelivery={() => handleStatusUpdate("completed")}
              />
            </div>
          ) : (
            <Card className="h-full flex items-center justify-center">
              <div className="text-center p-8 text-gray-500">
                <Package className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                <p>অর্ডার নির্বাচন করুন</p>
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
