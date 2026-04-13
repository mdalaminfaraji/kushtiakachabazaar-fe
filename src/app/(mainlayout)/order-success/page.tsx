/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React from "react";
import { CheckCircle, Package, Truck, Home, ArrowRight, Printer } from "lucide-react";
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
  const [orderData, setOrderData] = React.useState<any>(null);

  // Get the order number and data from localStorage when component mounts
  React.useEffect(() => {
    const storedOrderNumber = localStorage.getItem('lastOrderNumber');
    const storedOrderData = localStorage.getItem('lastOrderData');
    
    if (storedOrderNumber) {
      setOrderNumber(storedOrderNumber);
    } else {
      setOrderNumber("KB" + Math.floor(100000 + Math.random() * 900000));
    }

    if (storedOrderData) {
      setOrderData(JSON.parse(storedOrderData));
    }
  }, []);

  const handlePrint = () => {
    window.print();
  };

  // Dummy order date if no data
  const orderDate = orderData?.date 
    ? new Date(orderData.date).toLocaleDateString("bn-BD", {
        year: "numeric", month: "long", day: "numeric", hour: "2-digit", minute: "2-digit",
      })
    : new Date().toLocaleDateString("bn-BD", {
        year: "numeric", month: "long", day: "numeric", hour: "2-digit", minute: "2-digit",
      });

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Print CSS to hide Navbar, Footer and other elements */}
      <style dangerouslySetInnerHTML={{ __html: `
        @media print {
          nav, footer, header, .no-print, [role="banner"], [role="contentinfo"] {
            display: none !important;
          }
          body {
            background: white !important;
          }
          .container {
            max-width: 100% !important;
            width: 100% !important;
            padding: 0 !important;
            margin: 0 !important;
          }
          /* Hide everything except our print section */
          .print-hidden {
            display: none !important;
          }
        }
      `}} />

      {/* Printable Receipt Section (Hidden on screen, visible on print) */}
      <div className="hidden print:block p-8 bg-white text-black font-sans">
        <div className="text-center mb-8 border-b-2 pb-4">
          <h1 className="text-2xl font-bold uppercase tracking-wider">Daily Market</h1>
          <p className="text-sm">নারাইল, বাংলাদেশ</p>
          <p className="text-sm">মোবাইল: ০১৭১১-১১১১১১</p>
        </div>

        <div className="mb-6 flex justify-between">
          <div>
            <h3 className="font-bold underline mb-1">গ্রাহকের তথ্য:</h3>
            <p className="text-sm">নাম: {orderData?.customer?.name || "N/A"}</p>
            <p className="text-sm">ফোন: {orderData?.customer?.phone || "N/A"}</p>
            <p className="text-sm">ঠিকানা: {orderData?.customer?.address || "N/A"}</p>
          </div>
          <div className="text-right">
            <p className="text-sm"><span className="font-bold">অর্ডার নং:</span> {orderNumber}</p>
            <p className="text-sm"><span className="font-bold">তারিখ:</span> {orderDate}</p>
          </div>
        </div>

        <table className="w-full mb-6 border-collapse">
          <thead>
            <tr className="border-b-2 border-t-2">
              <th className="py-2 text-left">পণ্যের নাম</th>
              <th className="py-2 text-center">পরিমাণ</th>
              <th className="py-2 text-right">মূল্য</th>
            </tr>
          </thead>
          <tbody>
            {orderData?.items?.map((item: any, idx: number) => (
              <tr key={idx} className="border-b border-dashed">
                <td className="py-2">{item.name} ({item.englishName})</td>
                <td className="py-2 text-center">
                  {item.isPricePerPiece 
                    ? `${item.quantity} পিস` 
                    : item.quantity >= 1000 ? `${item.quantity/1000} কেজি` : `${item.quantity} গ্রাম`}
                </td>
                <td className="py-2 text-right">{item.total}৳</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="flex justify-end gap-12">
          <div className="text-right space-y-1">
            <p className="font-bold text-lg border-t-2 pt-2">মোট মূল্য: {orderData?.total || 0}৳</p>
            <p className="text-xs text-gray-500 italic mt-4">Daily Market-এ কেনাকাটা করার জন্য ধন্যবাদ।</p>
          </div>
        </div>
      </div>

      {/* Screen Content */}
      <div className="print:hidden print-hidden">
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
          <Card className="p-8 text-center border-t-4 border-t-primary shadow-lg overflow-hidden relative">
            {/* Subtle Gradient Background */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary/20 via-primary to-primary/20" />
            
            <div className="flex flex-col items-center">
              <div className="bg-green-100 dark:bg-green-900/30 p-4 rounded-full mb-4">
                <CheckCircle className="h-16 w-16 text-green-500" />
              </div>
              <h1 className="text-3xl font-bold mb-2">অর্ডার সফলভাবে সম্পন্ন হয়েছে!</h1>
              <p className="text-muted-foreground mb-6 max-w-md">
                আপনার অর্ডার সফলভাবে গ্রহণ করা হয়েছে। আমাদের প্রতিনিধি শীঘ্রই আপনার সাথে যোগাযোগ করবেন।
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full mb-8">
                <div className="bg-secondary/40 backdrop-blur-sm border rounded-xl p-5 text-left transition-all hover:bg-secondary/60">
                  <div className="flex items-center gap-2 mb-3 text-primary">
                    <Package size={18} />
                    <span className="font-bold">অর্ডার তথ্য</span>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">অর্ডার নং:</span>
                      <span className="font-mono font-bold text-primary">{orderNumber}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">তারিখ:</span>
                      <span>{orderDate}</span>
                    </div>
                  </div>
                </div>

                <div className="bg-secondary/40 backdrop-blur-sm border rounded-xl p-5 text-left transition-all hover:bg-secondary/60">
                  <div className="flex items-center gap-2 mb-3 text-primary">
                    <Truck size={18} />
                    <span className="font-bold">ডেলিভারি তথ্য</span>
                  </div>
                  <div className="space-y-1 text-xs">
                    <p className="font-medium">{orderData?.customer?.name}</p>
                    <p className="text-muted-foreground">{orderData?.customer?.phone}</p>
                    <p className="text-muted-foreground truncate">{orderData?.customer?.address}</p>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 w-full mb-8">
                <Button variant="default" className="flex-1 h-12 gap-2 shadow-md hover:shadow-lg transition-all" onClick={handlePrint}>
                  <Printer size={18} />
                  রশিদ ডাউনলোড করুন
                </Button>
                <Button asChild variant="outline" className="flex-1 h-12 gap-2 border-primary/20">
                  <Link href="/products">
                    আরো কেনাকাটা করুন
                    <ArrowRight size={16} />
                  </Link>
                </Button>
              </div>

              <Separator className="mb-8" />

              <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                অর্ডার স্ট্যাটাস
              </h2>

              <div className="relative w-full px-4">
                <div className="absolute left-8 top-0 h-full w-0.5 bg-secondary" />

                {[
                  { icon: Package, title: "অর্ডার গ্রহণ করা হয়েছে", status: "completed", desc: "আপনার অর্ডার সিস্টেমে গ্রহণ করা হয়েছে" },
                  { icon: Package, title: "প্রসেসিং", status: "pending", desc: "আপনার অর্ডার প্রস্তুত করা হচ্ছে" },
                  { icon: Truck, title: "ডেলিভারি", status: "pending", desc: "অর্ডার ডেলিভারির জন্য প্রেরণ করা হবে" },
                  { icon: Home, title: "সম্পন্ন", status: "pending", desc: "অর্ডার ডেলিভারি সফলভাবে সম্পন্ন" }
                ].map((step, idx) => (
                  <div key={idx} className="flex items-start relative mb-10 last:mb-0 group">
                    <div className={`z-10 flex items-center justify-center w-12 h-12 rounded-full border-2 transition-all shadow-sm ${
                      step.status === 'completed' 
                        ? 'bg-primary text-primary-foreground border-primary scale-110' 
                        : 'bg-background text-muted-foreground border-muted group-hover:border-primary/50'
                    }`}>
                      <step.icon size={20} />
                    </div>
                    <div className="ml-6 text-left">
                      <h3 className={`font-bold transition-colors ${step.status === 'completed' ? 'text-primary' : 'text-foreground'}`}>
                        {step.title}
                      </h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {step.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-12 pt-6 border-t w-full">
                <Button asChild variant="ghost" className="text-muted-foreground hover:text-primary transition-colors">
                  <Link href="/">
                    হোমপেজে ফিরে যান
                  </Link>
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccessPage;
