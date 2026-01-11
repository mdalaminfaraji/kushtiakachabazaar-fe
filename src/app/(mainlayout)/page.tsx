import Banner from "@/components/home/banner";
import VegetableOrder from "@/components/order-receipt/vegetableOrder";
import FlashSale from "@/components/home/flash-sale";
import PopularProducts from "@/components/home/popular-products";
import Sidebar from "@/components/home/sidebar";
import { Separator } from "@/components/ui/separator";

export default function Home() {
  return (
    <main>
      <Banner />
      
      <div className="container mx-auto px-4 py-8">
        <h2 className="text-2xl md:text-3xl font-bold mb-4">
          <span className="text-primary">শপিং</span> করুন
        </h2>
        <div className="border rounded-lg shadow-sm overflow-hidden">
          <Sidebar />
        </div>
      </div>
      
      <div className="container mx-auto px-4">
        <Separator className="my-8" />
        <FlashSale />
        <Separator className="my-8" />
        <PopularProducts />
      </div>
      <VegetableOrder />
    </main>
  );
}
