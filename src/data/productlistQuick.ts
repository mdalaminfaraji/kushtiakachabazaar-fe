export const vegetables = [
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
  {
    id: 10,
    name: "লাউ",
    englishName: "Bottle Gourd",
    pricePerPiece: 20,
    isPricePerPiece: true,
  },
  { id: 11, name: "ওলকপি", englishName: "Kohlrabi", perKgPrice: 55 },
  {
    id: 12,
    name: "কাঁচা কলা",
    englishName: "Green Banana",
    pricePerPiece: 5,
    isPricePerPiece: true,
  },
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
  {
    id: 29,
    name: "লেবু",
    englishName: "Lemon",
    pricePerPiece: 10,
    isPricePerPiece: true,
  },
  { id: 30, name: "কাঁচা মরিচ", englishName: "Green Chili", perKgPrice: 150 },

  // --- 🍚 GROCERY STAPLES (High Demand) ---
  { id: 31, name: "মিনিকেট চাল", englishName: "Miniket Rice", category: "Grocery", perKgPrice: 75 },
  { id: 32, name: "মসুর ডাল", englishName: "Red Lentils (Deshi)", category: "Grocery", perKgPrice: 145 },
  { id: 33, name: "সয়াবিন তেল (৫ লিটার)", englishName: "Soybean Oil 5L", category: "Grocery", pricePerPiece: 810, isPricePerPiece: true },
  { id: 34, name: "চিনি", englishName: "Sugar", category: "Grocery", perKgPrice: 135 },
  { id: 35, name: "আটা (২ কেজি প্যাকেট)", englishName: "Atta (2kg Pack)", category: "Grocery", pricePerPiece: 120, isPricePerPiece: true },

  // --- 🌶️ SPICES (মশলা) ---
  { id: 36, name: "হলুদ গুঁড়া (২০০ গ্রাম)", englishName: "Turmeric Powder 200g", category: "Spices", pricePerPiece: 90, isPricePerPiece: true },
  { id: 37, name: "মরিচ গুঁড়া (২০০ গ্রাম)", englishName: "Chili Powder 200g", category: "Spices", pricePerPiece: 110, isPricePerPiece: true },
  { id: 38, name: "আদা", englishName: "Ginger", category: "Spices", perKgPrice: 180 },
  { id: 39, name: "রসুন (দেশি)", englishName: "Garlic (Local)", category: "Spices", perKgPrice: 220 },
  { id: 40, name: "পেঁয়াজ", englishName: "Onion", category: "Spices", perKgPrice: 90 },

  // --- 🥛 DAIRY & BREAKFAST ---
  { id: 41, name: "ডিম (১ ডজন)", englishName: "Eggs (1 Dozen)", category: "Dairy", pricePerPiece: 155, isPricePerPiece: true },
  { id: 42, name: "তরল দুধ (১ লিটার)", englishName: "Liquid Milk 1L", category: "Dairy", pricePerPiece: 95, isPricePerPiece: true },
  { id: 43, name: "ডানো গুঁড়ো দুধ (৫০০ গ্রাম)", englishName: "Dano Milk Powder 500g", category: "Dairy", pricePerPiece: 475, isPricePerPiece: true },
  { id: 44, name: "ইস্পাহানি চা (৪০০ গ্রাম)", englishName: "Ispahani Tea 400g", category: "Beverage", pricePerPiece: 230, isPricePerPiece: true },

  // --- 🧼 PERSONAL CARE & HYGIENE ---
  { id: 45, name: "সাবান (লাক্স)", englishName: "Lux Soap 150g", category: "Hygiene", pricePerPiece: 75, isPricePerPiece: true },
  { id: 46, name: "সানসিল্ক শ্যাম্পু", englishName: "Sunsilk Shampoo 180ml", category: "Hygiene", pricePerPiece: 220, isPricePerPiece: true },
  { id: 47, name: "পেপসোডেন্ট টুথপেস্ট", englishName: "Pepsodent 200g", category: "Hygiene", pricePerPiece: 185, isPricePerPiece: true },
  { id: 48, name: "হুইল ডিটারজেন্ট (১ কেজি)", englishName: "Wheel Powder 1kg", category: "Cleaning", pricePerPiece: 110, isPricePerPiece: true },
  { id: 49, name: "হারপিক (৭৫০ মিলি)", englishName: "Harpic Toilet Cleaner 750ml", category: "Cleaning", pricePerPiece: 180, isPricePerPiece: true },

  // --- 👶 BABY CARE ---
  { id: 50, name: "মামিপোকো প্যান্টস (L)", englishName: "MamyPoko Pants (L)", category: "Baby Care", pricePerPiece: 1250, isPricePerPiece: true },
  { id: 51, name: "সেরেল্যাক (গমের)", englishName: "Cerelac Wheat 400g", category: "Baby Care", pricePerPiece: 450, isPricePerPiece: true },
  { id: 52, name: "বেবি ওয়াইপস (প্যামপার্স)", englishName: "Baby Wipes (Pampers)", category: "Baby Care", pricePerPiece: 280, isPricePerPiece: true },

  // --- 🍗 FISH & MEAT ---
  { id: 53, name: "মুরগি (ব্রয়লার)", englishName: "Broiler Chicken", category: "Meat", perKgPrice: 200 },
  { id: 54, name: "গরুর মাংস", englishName: "Beef", category: "Meat", perKgPrice: 750 },
  { id: 55, name: "ইলিশ মাছ (৮০০ গ্রাম+)", englishName: "Hilsa Fish (800g+)", category: "Fish", perKgPrice: 1600 }
];