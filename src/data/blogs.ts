export interface BlogPost {
  id: string;
  title: string;
  title_bn: string;
  slug: string;
  excerpt: string;
  excerpt_bn: string;
  content: string;
  content_bn: string;
  author: string;
  author_bn: string;
  date: string;
  image: string;
  category: string;
  category_bn: string;
  tags: string[];
  tags_bn: string[];
  featured: boolean;
}

export const blogPosts: BlogPost[] = [
  {
    id: "1",
    title: "The Benefits of Organic Vegetables",
    title_bn: "জৈব সবজির উপকারিতা",
    slug: "benefits-of-organic-vegetables",
    excerpt: "Discover why organic vegetables are better for your health and the environment",
    excerpt_bn: "জেনে নিন কেন জৈব সবজি আপনার স্বাস্থ্য এবং পরিবেশের জন্য ভালো",
    content: "Organic vegetables are grown without synthetic pesticides and fertilizers, making them a healthier choice for you and your family. Studies have shown that organic produce contains higher levels of certain nutrients and lower levels of pesticide residues compared to conventionally grown vegetables. Additionally, organic farming practices are more sustainable and better for the environment, promoting soil health and biodiversity.",
    content_bn: "জৈব সবজি সিনথেটিক কীটনাশক এবং সার ছাড়া উৎপাদন করা হয়, যা আপনার এবং আপনার পরিবারের জন্য স্বাস্থ্যকর পছন্দ। গবেষণায় দেখা গেছে যে জৈব সবজিতে পারম্পরিক পদ্ধতিতে উৎপাদিত সবজির তুলনায় বেশি পুষ্টি উপাদান এবং কম কীটনাশকের অবশিষ্টাংশ থাকে। এছাড়াও, জৈব চাষের পদ্ধতিগুলি আরও টেকসই এবং পরিবেশের জন্য ভালো, যা মাটির স্বাস্থ্য এবং জৈববৈচিত্র্য বজায় রাখে।",
    author: "Dr. Ahmed Khan",
    author_bn: "ডাঃ আহমেদ খান",
    date: "2025-03-10",
    image: "/images/blog/organic-vegetables.jpg",
    category: "Health",
    category_bn: "স্বাস্থ্য",
    tags: ["Organic", "Vegetables", "Health", "Environment"],
    tags_bn: ["জৈব", "সবজি", "স্বাস্থ্য", "পরিবেশ"],
    featured: true
  },
  {
    id: "2",
    title: "Seasonal Fruits and Their Benefits",
    title_bn: "মৌসুমি ফল এবং তাদের উপকারিতা",
    slug: "seasonal-fruits-benefits",
    excerpt: "Learn about the health benefits of eating seasonal fruits",
    excerpt_bn: "মৌসুমি ফল খাওয়ার স্বাস্থ্য উপকারিতা সম্পর্কে জানুন",
    content: "Seasonal fruits are not only more flavorful but also packed with essential nutrients. When fruits are allowed to ripen naturally and harvested at the right time, they contain optimal levels of vitamins, minerals, and antioxidants. Consuming seasonal fruits supports local farmers and reduces the carbon footprint associated with importing out-of-season produce.",
    content_bn: "মৌসুমি ফল শুধুমাত্র সুস্বাদুই নয়, এতে অত্যাবশ্যক পুষ্টি উপাদানও থাকে। যখন ফলগুলি স্বাভাবিকভাবে পাকতে দেওয়া হয় এবং সঠিক সময়ে সংগ্রহ করা হয়, তখন এতে ভিটামিন, খনিজ এবং অ্যান্টিঅক্সিডেন্টের সর্বোত্তম মাত্রা থাকে। মৌসুমি ফল খাওয়া স্থানীয় কৃষকদের সমর্থন করে এবং বাইরে থেকে আমদানিকৃত ফলের কার্বন ফুটপ্রিন্ট কমায়।",
    author: "Nasreen Rahman",
    author_bn: "নাসরিন রহমান",
    date: "2025-03-05",
    image: "/images/blog/seasonal-fruits.jpg",
    category: "Nutrition",
    category_bn: "পুষ্টি",
    tags: ["Fruits", "Seasonal", "Nutrition", "Local"],
    tags_bn: ["ফল", "মৌসুমি", "পুষ্টি", "স্থানীয়"],
    featured: true
  },
  {
    id: "3",
    title: "Traditional Spices in Bengali Cuisine",
    title_bn: "বাংলা রান্নায় ঐতিহ্যবাহী মসলা",
    slug: "traditional-spices-bengali-cuisine",
    excerpt: "Explore the rich variety of spices used in traditional Bengali cooking",
    excerpt_bn: "বাংলা রান্নায় ব্যবহৃত মসলার সমৃদ্ধ বৈচিত্র্য অন্বেষণ করুন",
    content: "Bengali cuisine is known for its subtle and aromatic spices that create complex flavors without overwhelming heat. Key spices include panch phoron (a five-spice blend), whole cumin, mustard seeds, turmeric, and coriander. These spices not only enhance flavor but also offer numerous health benefits, from anti-inflammatory properties to digestive aid.",
    content_bn: "বাংলা রান্না তার সূক্ষ্ম এবং সুগন্ধিযুক্ত মসলার জন্য পরিচিত যা অতিরিক্ত ঝাল ছাড়াই জটিল স্বাদ তৈরি করে। প্রধান মসলাগুলির মধ্যে রয়েছে পাঁচ ফোড়ন (পাঁচটি মসলার মিশ্রণ), গোটা জিরা, সরিষা, হলুদ এবং ধনিয়া। এই মসলাগুলি শুধুমাত্র স্বাদ বাড়ায় না, বরং প্রদাহ-বিরোধী বৈশিষ্ট্য থেকে শুরু করে হজমে সহায়তা করার মতো অনেক স্বাস্থ্য উপকার দেয়।",
    author: "Farhana Akter",
    author_bn: "ফারহানা আক্তার",
    date: "2025-02-28",
    image: "/images/blog/bengali-spices.jpg",
    category: "Cooking",
    category_bn: "রান্না",
    tags: ["Spices", "Bengali", "Cooking", "Tradition"],
    tags_bn: ["মসলা", "বাংলা", "রান্না", "ঐতিহ্য"],
    featured: false
  },
  {
    id: "4",
    title: "Understanding Food Labels",
    title_bn: "খাদ্য লেবেল বোঝা",
    slug: "understanding-food-labels",
    excerpt: "A guide to decoding nutrition facts and ingredient lists on food packages",
    excerpt_bn: "খাদ্য প্যাকেজে পুষ্টি তথ্য এবং উপাদান তালিকা ডিকোড করার একটি গাইড",
    content: "Food labels contain valuable information about what you're eating, but they can be confusing. This guide explains how to read nutrition facts panels, understand serving sizes, identify added sugars, and decode ingredient lists. Learning to interpret food labels empowers you to make informed choices about the foods you purchase and consume.",
    content_bn: "খাদ্যের লেবেলে আপনি যা খাচ্ছেন সে সম্পর্কে মূল্যবান তথ্য থাকে, কিন্তু এগুলি বিভ্রান্তিকর হতে পারে। এই গাইডটি পুষ্টি তথ্য প্যানেল পড়া, পরিবেশনের আকার বোঝা, যোগ করা চিনি চিহ্নিত করা, এবং উপাদান তালিকা ডিকোড করার ব্যাখ্যা করে। খাদ্য লেবেল ব্যাখ্যা করতে শেখা আপনাকে আপনার কেনা এবং খাওয়া খাবার সম্পর্কে সচেতন সিদ্ধান্ত নিতে সাহায্য করে।",
    author: "Professor Kamal Hussain",
    author_bn: "অধ্যাপক কামাল হোসেন",
    date: "2025-02-20",
    image: "/images/blog/food-labels.jpg",
    category: "Education",
    category_bn: "শিক্ষা",
    tags: ["Food", "Labels", "Nutrition", "Shopping"],
    tags_bn: ["খাদ্য", "লেবেল", "পুষ্টি", "শপিং"],
    featured: false
  },
  {
    id: "5",
    title: "The Art of Food Preservation",
    title_bn: "খাদ্য সংরক্ষণের শিল্প",
    slug: "art-of-food-preservation",
    excerpt: "Traditional and modern methods to extend the shelf life of your food",
    excerpt_bn: "আপনার খাবারের সংরক্ষণ সময় বাড়ানোর ঐতিহ্যগত এবং আধুনিক পদ্ধতি",
    content: "Food preservation has been practiced for centuries to extend shelf life and prevent waste. Traditional methods like pickling, drying, smoking, and fermentation are still effective today and often enhance flavor. Modern techniques include freezing, canning, vacuum sealing, and using natural preservatives. This article explores both approaches and provides practical tips for home preservation.",
    content_bn: "খাদ্যের সংরক্ষণ সময় বাড়ানো এবং অপচয় রোধ করার জন্য শতাব্দীর পর শতাব্দী ধরে অনুশীলন করা হয়েছে। আচার, শুকানো, ধোঁয়া দেওয়া, এবং গাঁজন ইত্যাদির মতো ঐতিহ্যগত পদ্ধতিগুলি আজও কার্যকর এবং প্রায়শই স্বাদ বাড়ায়। আধুনিক কৌশলগুলির মধ্যে রয়েছে ফ্রিজিং, ক্যানিং, ভ্যাকুয়াম সিলিং, এবং প্রাকৃতিক সংরক্ষক ব্যবহার করা। এই নিবন্ধটি উভয় পদ্ধতি অন্বেষণ করে এবং বাড়িতে সংরক্ষণের জন্য ব্যবহারিক টিপস প্রদান করে।",
    author: "Mahmuda Begum",
    author_bn: "মাহমুদা বেগম",
    date: "2025-02-15",
    image: "/images/blog/food-preservation.jpg",
    category: "Lifestyle",
    category_bn: "জীবনযাপন",
    tags: ["Preservation", "Food Storage", "Traditional", "Modern"],
    tags_bn: ["সংরক্ষণ", "খাদ্য সংরক্ষণ", "ঐতিহ্যগত", "আধুনিক"],
    featured: false
  },
  {
    id: "6",
    title: "Sustainable Farming Practices",
    title_bn: "টেকসই কৃষি পদ্ধতি",
    slug: "sustainable-farming-practices",
    excerpt: "How Kushtiaka Chabazaar supports local farmers who use sustainable methods",
    excerpt_bn: "কুষ্টিয়াকা ছাবাজার কীভাবে টেকসই পদ্ধতি ব্যবহারকারী স্থানীয় কৃষকদের সমর্থন করে",
    content: "At Kushtiaka Chabazaar, we're committed to supporting farmers who practice sustainable agriculture. This includes crop rotation, water conservation, natural pest management, and soil health maintenance. Sustainable farming protects the environment, produces healthier food, and ensures the long-term viability of agricultural communities. Learn how our partnerships with local farmers are making a difference.",
    content_bn: "কুষ্টিয়াকা ছাবাজারে, আমরা টেকসই কৃষি অনুশীলনকারী কৃষকদের সমর্থন করতে প্রতিশ্রুতিবদ্ধ। এর মধ্যে রয়েছে ফসল আবর্তন, পানি সংরক্ষণ, প্রাকৃতিক কীটপতঙ্গ ব্যবস্থাপনা, এবং মাটির স্বাস্থ্য বজায় রাখা। টেকসই কৃষি পরিবেশ রক্ষা করে, আরও স্বাস্থ্যকর খাবার উৎপাদন করে, এবং কৃষি সম্প্রদায়ের দীর্ঘমেয়াদী স্থায়িত্ব নিশ্চিত করে। আমাদের স্থানীয় কৃষকদের সাথে অংশীদারিত্ব কীভাবে পার্থক্য তৈরি করছে তা জানুন।",
    author: "Abdul Karim",
    author_bn: "আবদুল করিম",
    date: "2025-02-08",
    image: "/images/blog/sustainable-farming.jpg",
    category: "Sustainability",
    category_bn: "টেকসই উন্নয়ন",
    tags: ["Farming", "Sustainable", "Local", "Environment"],
    tags_bn: ["কৃষি", "টেকসই", "স্থানীয়", "পরিবেশ"],
    featured: true
  }
];

// Get all unique categories
export const blogCategories = Array.from(
  new Set(blogPosts.map((post) => post.category))
).map((category) => {
  const post = blogPosts.find((p) => p.category === category);
  return {
    name: category,
    name_bn: post?.category_bn || category,
  };
});

// Get all unique tags
export const blogTags = Array.from(
  new Set(blogPosts.flatMap((post) => post.tags))
).map((tag) => {
  const post = blogPosts.find((p) => p.tags.includes(tag));
  const index = post ? post.tags.indexOf(tag) : -1;
  return {
    name: tag,
    name_bn: post && index !== -1 ? post.tags_bn[index] : tag,
  };
});
