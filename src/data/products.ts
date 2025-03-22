export interface Product {
  id: string;
  name: string;
  name_bn: string;
  slug: string;
  image: string;
  images: string[];
  price: number;
  discountPrice?: number;
  unit: string;
  description: string;
  description_bn: string;
  categoryId: string;
  subCategoryId: string;
  childCategoryId?: string;
  inStock: boolean;
  isPopular?: boolean;
  isFlashSale?: boolean;
  flashSaleEndDate?: string;
}

export const products: Product[] = [
  // Fresh Fruits
  {
    id: "prod-1",
    name: "Premium Banana (Dozen)",
    name_bn: "প্রিমিয়াম কলা (ডজন)",
    slug: "premium-banana-dozen",
    image: "/images/products/banana.jpg",
    images: ["/images/products/banana.jpg", "/images/products/banana-2.jpg"],
    price: 120,
    discountPrice: 100,
    unit: "dozen",
    description: "Fresh and ripe bananas, perfect for a healthy snack.",
    description_bn: "তাজা এবং পাকা কলা, স্বাস্থ্যকর স্ন্যাকের জন্য উপযুক্ত।",
    categoryId: "cat-1",
    subCategoryId: "subcat-1",
    childCategoryId: "childcat-1",
    inStock: true,
    isPopular: true,
    isFlashSale: true,
    flashSaleEndDate: "2025-04-01T23:59:59+06:00"
  },
  {
    id: "prod-2",
    name: "Apple (4 pieces)",
    name_bn: "আপেল (৪ পিস)",
    slug: "apple-4-pieces",
    image: "/images/products/apple.jpg",
    images: ["/images/products/apple.jpg", "/images/products/apple-2.jpg"],
    price: 180,
    discountPrice: 160,
    unit: "pack",
    description: "Sweet and juicy apples imported from Himachal Pradesh.",
    description_bn: "হিমাচল প্রদেশ থেকে আমদানি করা মিষ্টি ও রসালো আপেল।",
    categoryId: "cat-1",
    subCategoryId: "subcat-1",
    childCategoryId: "childcat-1",
    inStock: true,
    isPopular: true
  },
  {
    id: "prod-3",
    name: "Organic Mango",
    name_bn: "অর্গানিক আম",
    slug: "organic-mango",
    image: "/images/products/mango.jpg",
    images: ["/images/products/mango.jpg", "/images/products/mango-2.jpg"],
    price: 250,
    unit: "kg",
    description: "Sweet, organic mangoes. Perfect for summer.",
    description_bn: "মিষ্টি, অর্গানিক আম। গরমের জন্য উপযুক্ত।",
    categoryId: "cat-1",
    subCategoryId: "subcat-1",
    childCategoryId: "childcat-1",
    inStock: true
  },
  {
    id: "prod-4",
    name: "Watermelon",
    name_bn: "তরমুজ",
    slug: "watermelon",
    image: "/images/products/watermelon.jpg",
    images: ["/images/products/watermelon.jpg", "/images/products/watermelon-2.jpg"],
    price: 130,
    discountPrice: 110,
    unit: "piece",
    description: "Juicy and refreshing watermelon, locally sourced.",
    description_bn: "রসালো এবং তাজাকারী তরমুজ, স্থানীয়ভাবে সংগ্রহ করা।",
    categoryId: "cat-1",
    subCategoryId: "subcat-1",
    childCategoryId: "childcat-1",
    inStock: true,
    isPopular: true
  },
  
  // Fresh Vegetables
  {
    id: "prod-5",
    name: "Fresh Potato",
    name_bn: "তাজা আলু",
    slug: "fresh-potato",
    image: "/images/products/potato.jpg",
    images: ["/images/products/potato.jpg", "/images/products/potato-2.jpg"],
    price: 40,
    unit: "kg",
    description: "Freshly harvested potatoes, perfect for various dishes.",
    description_bn: "সদ্য সংগৃহীত আলু, বিভিন্ন খাবারের জন্য উপযুক্ত।",
    categoryId: "cat-1",
    subCategoryId: "subcat-1",
    childCategoryId: "childcat-2",
    inStock: true,
    isFlashSale: true,
    flashSaleEndDate: "2025-04-01T23:59:59+06:00"
  },
  {
    id: "prod-6",
    name: "Organic Tomato",
    name_bn: "অর্গানিক টমেটো",
    slug: "organic-tomato",
    image: "/images/products/tomato.jpg",
    images: ["/images/products/tomato.jpg", "/images/products/tomato-2.jpg"],
    price: 80,
    discountPrice: 65,
    unit: "kg",
    description: "Organic, pesticide-free tomatoes for healthier meals.",
    description_bn: "অর্গানিক, কীটনাশক-মুক্ত টমেটো স্বাস্থ্যকর খাবারের জন্য।",
    categoryId: "cat-1",
    subCategoryId: "subcat-1",
    childCategoryId: "childcat-2",
    inStock: true,
    isPopular: true
  },
  {
    id: "prod-7",
    name: "Fresh Onion",
    name_bn: "তাজা পেঁয়াজ",
    slug: "fresh-onion",
    image: "/images/products/onion.jpg",
    images: ["/images/products/onion.jpg", "/images/products/onion-2.jpg"],
    price: 60,
    unit: "kg",
    description: "Essential ingredient for every kitchen.",
    description_bn: "প্রতিটি রান্নাঘরের জন্য অপরিহার্য উপাদান।",
    categoryId: "cat-1",
    subCategoryId: "subcat-1",
    childCategoryId: "childcat-2",
    inStock: true
  },
  {
    id: "prod-8",
    name: "Green Capsicum",
    name_bn: "সবুজ ক্যাপসিকাম",
    slug: "green-capsicum",
    image: "/images/products/capsicum.jpg",
    images: ["/images/products/capsicum.jpg", "/images/products/capsicum-2.jpg"],
    price: 120,
    discountPrice: 100,
    unit: "kg",
    description: "Crunchy green capsicum, great for salads and stir-fries.",
    description_bn: "স্যালাড এবং স্টার-ফ্রাইসের জন্য দারুণ ক্রিস্পি সবুজ ক্যাপসিকাম।",
    categoryId: "cat-1",
    subCategoryId: "subcat-1",
    childCategoryId: "childcat-2",
    inStock: true
  },
  
  // Meat & Fish
  {
    id: "prod-9",
    name: "Fresh Chicken (Whole)",
    name_bn: "তাজা মুরগি (সম্পূর্ণ)",
    slug: "fresh-chicken-whole",
    image: "/images/products/chicken.jpg",
    images: ["/images/products/chicken.jpg", "/images/products/chicken-2.jpg"],
    price: 320,
    discountPrice: 300,
    unit: "kg",
    description: "Farm-fresh whole chicken, cleaned and ready to cook.",
    description_bn: "খামারের তাজা সম্পূর্ণ মুরগি, পরিষ্কার এবং রান্না করার জন্য প্রস্তুত।",
    categoryId: "cat-1",
    subCategoryId: "subcat-2",
    inStock: true,
    isPopular: true
  },
  {
    id: "prod-10",
    name: "Fresh Beef",
    name_bn: "তাজা গরুর মাংস",
    slug: "fresh-beef",
    image: "/images/products/beef.jpg",
    images: ["/images/products/beef.jpg", "/images/products/beef-2.jpg"],
    price: 650,
    unit: "kg",
    description: "Premium quality beef, perfect for curries and steaks.",
    description_bn: "প্রিমিয়াম মানের গরুর মাংস, কারি এবং স্টেকের জন্য উপযুক্ত।",
    categoryId: "cat-1",
    subCategoryId: "subcat-2",
    inStock: true,
    isFlashSale: true,
    flashSaleEndDate: "2025-04-01T23:59:59+06:00"
  },
  {
    id: "prod-11",
    name: "Rui Fish",
    name_bn: "রুই মাছ",
    slug: "rui-fish",
    image: "/images/products/ruifish.jpg",
    images: ["/images/products/ruifish.jpg", "/images/products/ruifish-2.jpg"],
    price: 300,
    discountPrice: 280,
    unit: "kg",
    description: "Fresh water Rui fish, cleaned and ready to cook.",
    description_bn: "মিঠা পানির রুই মাছ, পরিষ্কার এবং রান্না করার জন্য প্রস্তুত।",
    categoryId: "cat-1",
    subCategoryId: "subcat-2",
    inStock: true,
    isPopular: true
  },
  
  // Cooking
  {
    id: "prod-12",
    name: "Premium Basmati Rice",
    name_bn: "প্রিমিয়াম বাসমতি চাল",
    slug: "premium-basmati-rice",
    image: "/images/products/basmati.jpg",
    images: ["/images/products/basmati.jpg", "/images/products/basmati-2.jpg"],
    price: 220,
    unit: "kg",
    description: "Aromatic basmati rice, perfect for biryanis and pulaos.",
    description_bn: "সুগন্ধি বাসমতি চাল, বিরিয়ানি এবং পোলাওয়ের জন্য উপযুক্ত।",
    categoryId: "cat-1",
    subCategoryId: "subcat-3",
    inStock: true,
    isPopular: true
  },
  {
    id: "prod-13",
    name: "Pure Mustard Oil",
    name_bn: "খাঁটি সরিষার তেল",
    slug: "pure-mustard-oil",
    image: "/images/products/mustardoil.jpg",
    images: ["/images/products/mustardoil.jpg", "/images/products/mustardoil-2.jpg"],
    price: 250,
    discountPrice: 230,
    unit: "liter",
    description: "Cold-pressed pure mustard oil for authentic Bengali cuisine.",
    description_bn: "ঠান্ডা-চাপে তৈরি খাঁটি সরিষার তেল প্রকৃত বাঙালি রান্নার জন্য।",
    categoryId: "cat-1",
    subCategoryId: "subcat-3",
    inStock: true,
    isFlashSale: true,
    flashSaleEndDate: "2025-04-01T23:59:59+06:00"
  },
  
  // Sauces & Pickles
  {
    id: "prod-14",
    name: "Mango Pickle",
    name_bn: "আমের আচার",
    slug: "mango-pickle",
    image: "/images/products/mangopickle.jpg",
    images: ["/images/products/mangopickle.jpg", "/images/products/mangopickle-2.jpg"],
    price: 180,
    unit: "bottle",
    description: "Traditional homemade mango pickle, tangy and spicy.",
    description_bn: "ঐতিহ্যবাহী হোমমেড আমের আচার, টক এবং ঝাল।",
    categoryId: "cat-1",
    subCategoryId: "subcat-4",
    inStock: true,
    isPopular: true
  },
  {
    id: "prod-15",
    name: "Tomato Ketchup",
    name_bn: "টমেটো কেচাপ",
    slug: "tomato-ketchup",
    image: "/images/products/ketchup.jpg",
    images: ["/images/products/ketchup.jpg", "/images/products/ketchup-2.jpg"],
    price: 150,
    discountPrice: 130,
    unit: "bottle",
    description: "Classic tomato ketchup, great with snacks and meals.",
    description_bn: "ক্লাসিক টমেটো কেচাপ, স্ন্যাকস এবং খাবারের সাথে দারুণ।",
    categoryId: "cat-1",
    subCategoryId: "subcat-4",
    inStock: true
  },
  
  // Cleaning Supplies - Laundry
  {
    id: "prod-16",
    name: "Detergent Powder",
    name_bn: "ডিটারজেন্ট পাউডার",
    slug: "detergent-powder",
    image: "/images/products/detergent.jpg",
    images: ["/images/products/detergent.jpg", "/images/products/detergent-2.jpg"],
    price: 260,
    discountPrice: 240,
    unit: "kg",
    description: "Effective stain removal and bright clothes.",
    description_bn: "কার্যকর দাগ অপসারণ এবং উজ্জ্বল কাপড়।",
    categoryId: "cat-2",
    subCategoryId: "subcat-5",
    inStock: true,
    isPopular: true
  },
  
  // Personal Care - Bath & Body
  {
    id: "prod-17",
    name: "Natural Soap",
    name_bn: "প্রাকৃতিক সাবান",
    slug: "natural-soap",
    image: "/images/products/soap.jpg",
    images: ["/images/products/soap.jpg", "/images/products/soap-2.jpg"],
    price: 85,
    unit: "piece",
    description: "Handmade natural soap with essential oils.",
    description_bn: "অপরিহার্য তেল সহ হাতে তৈরি প্রাকৃতিক সাবান।",
    categoryId: "cat-3",
    subCategoryId: "subcat-7",
    inStock: true,
    isFlashSale: true,
    flashSaleEndDate: "2025-04-01T23:59:59+06:00"
  },
  
  // Beauty & Makeup - Skincare
  {
    id: "prod-18",
    name: "Facial Cleanser",
    name_bn: "ফেসিয়াল ক্লিনজার",
    slug: "facial-cleanser",
    image: "/images/products/cleanser.jpg",
    images: ["/images/products/cleanser.jpg", "/images/products/cleanser-2.jpg"],
    price: 320,
    discountPrice: 290,
    unit: "bottle",
    description: "Gentle facial cleanser for all skin types.",
    description_bn: "সব ধরনের ত্বকের জন্য নরম ফেসিয়াল ক্লিনজার।",
    categoryId: "cat-10",
    subCategoryId: "subcat-22",
    inStock: true,
    isPopular: true
  },
  
  // Baby Care - Baby Food
  {
    id: "prod-19",
    name: "Baby Cereal",
    name_bn: "বেবি সিরিয়াল",
    slug: "baby-cereal",
    image: "/images/products/babycereal.jpg",
    images: ["/images/products/babycereal.jpg", "/images/products/babycereal-2.jpg"],
    price: 420,
    unit: "box",
    description: "Nutritious baby cereal for healthy growth.",
    description_bn: "স্বাস্থ্যকর বৃদ্ধির জন্য পুষ্টিকর শিশু সিরিয়াল।",
    categoryId: "cat-5",
    subCategoryId: "subcat-11",
    inStock: true
  },
  
  // Home & Kitchen - Kitchenware
  {
    id: "prod-20",
    name: "Stainless Steel Cooking Pot",
    name_bn: "স্টেইনলেস স্টিল কুকিং পট",
    slug: "stainless-steel-cooking-pot",
    image: "/images/products/cookingpot.jpg",
    images: ["/images/products/cookingpot.jpg", "/images/products/cookingpot-2.jpg"],
    price: 950,
    discountPrice: 850,
    unit: "piece",
    description: "Durable stainless steel cooking pot for everyday use.",
    description_bn: "দৈনন্দিন ব্যবহারের জন্য টেকসই স্টেইনলেস স্টিল কুকিং পট।",
    categoryId: "cat-6",
    subCategoryId: "subcat-13",
    inStock: true,
    isPopular: true,
    isFlashSale: true,
    flashSaleEndDate: "2025-04-01T23:59:59+06:00"
  }
];
