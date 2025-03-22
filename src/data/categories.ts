export interface Category {
  id: string;
  name: string;
  name_bn: string;
  slug: string;
  image: string;
  subCategories: SubCategory[];
}

export interface SubCategory {
  id: string;
  name: string;
  name_bn: string;
  slug: string;
  image: string;
  parentId: string;
  categories?: ChildCategory[];
}

export interface ChildCategory {
  id: string;
  name: string;
  name_bn: string;
  slug: string;
  image: string;
  parentId: string;
}

export const categories: Category[] = [
  {
    id: "cat-1",
    name: "Food",
    name_bn: "খাবার",
    slug: "food",
    image: "/images/categories/food.jpg",
    subCategories: [
      {
        id: "subcat-1",
        name: "Fruits & Vegetables",
        name_bn: "ফল ও সবজি",
        slug: "fruits-vegetables",
        image: "/images/categories/fruits-vegetables.jpg",
        parentId: "cat-1",
        categories: [
          {
            id: "childcat-1",
            name: "Fresh Fruits",
            name_bn: "তাজা ফল",
            slug: "fresh-fruits",
            image: "/images/categories/fresh-fruits.jpg",
            parentId: "subcat-1",
          },
          {
            id: "childcat-2",
            name: "Fresh Vegetables",
            name_bn: "তাজা সবজি",
            slug: "fresh-vegetables",
            image: "/images/categories/fresh-vegetables.jpg",
            parentId: "subcat-1",
          }
        ]
      },
      {
        id: "subcat-2",
        name: "Meat & Fish",
        name_bn: "মাংস ও মাছ",
        slug: "meat-fish",
        image: "/images/categories/meat-fish.jpg",
        parentId: "cat-1",
      },
      {
        id: "subcat-3",
        name: "Cooking",
        name_bn: "রান্না করা",
        slug: "cooking",
        image: "/images/categories/cooking.jpg",
        parentId: "cat-1",
      },
      {
        id: "subcat-4",
        name: "Sauces & Pickles",
        name_bn: "সস ও আচার",
        slug: "sauces-pickles",
        image: "/images/categories/sauces-pickles.jpg",
        parentId: "cat-1",
      }
    ]
  },
  {
    id: "cat-2",
    name: "Cleaning Supplies",
    name_bn: "পরিষ্কারের সামগ্রী",
    slug: "cleaning-supplies",
    image: "/images/categories/cleaning-supplies.jpg",
    subCategories: [
      {
        id: "subcat-5",
        name: "Laundry",
        name_bn: "কাপড় ধোয়া",
        slug: "laundry",
        image: "/images/categories/laundry.jpg",
        parentId: "cat-2",
      },
      {
        id: "subcat-6",
        name: "Household Cleaners",
        name_bn: "ঘরোয়া ক্লিনার",
        slug: "household-cleaners",
        image: "/images/categories/household-cleaners.jpg",
        parentId: "cat-2",
      }
    ]
  },
  {
    id: "cat-3",
    name: "Personal Care",
    name_bn: "ব্যক্তিগত যত্ন",
    slug: "personal-care",
    image: "/images/categories/personal-care.jpg",
    subCategories: [
      {
        id: "subcat-7",
        name: "Bath & Body",
        name_bn: "গোসল ও শরীর",
        slug: "bath-body",
        image: "/images/categories/bath-body.jpg",
        parentId: "cat-3",
      },
      {
        id: "subcat-8",
        name: "Hair Care",
        name_bn: "চুলের যত্ন",
        slug: "hair-care",
        image: "/images/categories/hair-care.jpg",
        parentId: "cat-3",
      }
    ]
  },
  {
    id: "cat-4",
    name: "Health & Wellness",
    name_bn: "স্বাস্থ্য ও সুস্থতা",
    slug: "health-wellness",
    image: "/images/categories/health-wellness.jpg",
    subCategories: [
      {
        id: "subcat-9",
        name: "Medicine",
        name_bn: "ঔষধ",
        slug: "medicine",
        image: "/images/categories/medicine.jpg",
        parentId: "cat-4",
      },
      {
        id: "subcat-10",
        name: "Supplements",
        name_bn: "সাপ্লিমেন্ট",
        slug: "supplements",
        image: "/images/categories/supplements.jpg",
        parentId: "cat-4",
      }
    ]
  },
  {
    id: "cat-5",
    name: "Baby Care",
    name_bn: "শিশু যত্ন",
    slug: "baby-care",
    image: "/images/categories/baby-care.jpg",
    subCategories: [
      {
        id: "subcat-11",
        name: "Baby Food",
        name_bn: "শিশু খাদ্য",
        slug: "baby-food",
        image: "/images/categories/baby-food.jpg",
        parentId: "cat-5",
      },
      {
        id: "subcat-12",
        name: "Diapers",
        name_bn: "ডায়াপার",
        slug: "diapers",
        image: "/images/categories/diapers.jpg",
        parentId: "cat-5",
      }
    ]
  },
  {
    id: "cat-6",
    name: "Home & Kitchen",
    name_bn: "হোম এবং কিচেন",
    slug: "home-kitchen",
    image: "/images/categories/home-kitchen.jpg",
    subCategories: [
      {
        id: "subcat-13",
        name: "Kitchenware",
        name_bn: "রান্নাঘরের সামগ্রী",
        slug: "kitchenware",
        image: "/images/categories/kitchenware.jpg",
        parentId: "cat-6",
      },
      {
        id: "subcat-14",
        name: "Home Decor",
        name_bn: "হোম ডেকর",
        slug: "home-decor",
        image: "/images/categories/home-decor.jpg",
        parentId: "cat-6",
      }
    ]
  },
  {
    id: "cat-7",
    name: "Stationery & Office",
    name_bn: "স্টেশনারী ও অফিস",
    slug: "stationery-office",
    image: "/images/categories/stationery-office.jpg",
    subCategories: [
      {
        id: "subcat-15",
        name: "Paper Products",
        name_bn: "কাগজের পণ্য",
        slug: "paper-products",
        image: "/images/categories/paper-products.jpg",
        parentId: "cat-7",
      },
      {
        id: "subcat-16",
        name: "Writing Instruments",
        name_bn: "লেখার সরঞ্জাম",
        slug: "writing-instruments",
        image: "/images/categories/writing-instruments.jpg",
        parentId: "cat-7",
      }
    ]
  },
  {
    id: "cat-8",
    name: "Pet Care",
    name_bn: "পোষা প্রাণীর যত্ন",
    slug: "pet-care",
    image: "/images/categories/pet-care.jpg",
    subCategories: [
      {
        id: "subcat-17",
        name: "Pet Food",
        name_bn: "পোষা প্রাণীর খাবার",
        slug: "pet-food",
        image: "/images/categories/pet-food.jpg",
        parentId: "cat-8",
      },
      {
        id: "subcat-18",
        name: "Pet Accessories",
        name_bn: "পোষা প্রাণীর সামগ্রী",
        slug: "pet-accessories",
        image: "/images/categories/pet-accessories.jpg",
        parentId: "cat-8",
      }
    ]
  },
  {
    id: "cat-9",
    name: "Toys & Sports",
    name_bn: "খেলনা ও খেলাধুলা",
    slug: "toys-sports",
    image: "/images/categories/toys-sports.jpg",
    subCategories: [
      {
        id: "subcat-19",
        name: "Toys",
        name_bn: "খেলনা",
        slug: "toys",
        image: "/images/categories/toys.jpg",
        parentId: "cat-9",
      },
      {
        id: "subcat-20",
        name: "Sports Equipment",
        name_bn: "খেলাধুলার সরঞ্জাম",
        slug: "sports-equipment",
        image: "/images/categories/sports-equipment.jpg",
        parentId: "cat-9",
      }
    ]
  },
  {
    id: "cat-10",
    name: "Beauty & Makeup",
    name_bn: "সৌন্দর্য ও মেকাপ",
    slug: "beauty-makeup",
    image: "/images/categories/beauty-makeup.jpg",
    subCategories: [
      {
        id: "subcat-21",
        name: "Makeup",
        name_bn: "মেকাপ",
        slug: "makeup",
        image: "/images/categories/makeup.jpg",
        parentId: "cat-10",
      },
      {
        id: "subcat-22",
        name: "Skincare",
        name_bn: "স্কিনকেয়ার",
        slug: "skincare",
        image: "/images/categories/skincare.jpg",
        parentId: "cat-10",
      }
    ]
  }
];
