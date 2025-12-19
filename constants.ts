import { Product, BlogPost, Translations } from './types';

export const EXCHANGE_RATE_PKR = 278.5; 
export const WHATSAPP_NUMBER = "923039877968";

export const TRANSLATIONS: Translations = {
  home: { en: 'Home', ur: 'گھر' },
  shop: { en: 'Shop', ur: 'دکان' },
  blog: { en: 'Blog', ur: 'بلاگ' },
  contact: { en: 'Contact', ur: 'رابطہ کریں' },
  cart: { en: 'Cart', ur: 'ٹوکری' },
  checkout: { en: 'Checkout', ur: 'چیک آؤٹ' },
  search: { en: 'Search sneakers...', ur: 'جوتے تلاش کریں...' },
  men: { en: 'Men', ur: 'مرد' },
  women: { en: 'Women', ur: 'خواتین' },
  kids: { en: 'Kids', ur: 'بچے' },
  buyNow: { en: 'Shop Best Sellers', ur: 'سب سے زیادہ فروخت ہونے والے خریدیں' },
  heroTitle: { en: 'America\'s Favorite Kicks', ur: 'امریکہ کے پسندیدہ جوتے' },
  heroSubtitle: { en: 'Top trending styles. Iconic looks. Unbeatable prices ($50 - $100).', ur: 'سرفہرست رجحان ساز انداز۔ مشہور نظر۔ ناقابل شکست قیمتیں ($50 - $100)۔' },
  dealOfTheDay: { en: 'Top Best Sellers', ur: 'ٹاپ بہترین فروخت کنندگان' },
  addToCart: { en: 'Add to Cart', ur: 'ٹوکری میں شامل کریں' },
  reviews: { en: 'Customer Reviews', ur: 'کسٹمر کے جائزے' },
  emptyCart: { en: 'Your cart is empty', ur: 'آپ کی ٹوکری خالی ہے' },
  total: { en: 'Total', ur: 'کل' },
  placeOrder: { en: 'Place Order on WhatsApp', ur: 'واٹس ایپ پر آرڈر کریں' },
  contactUs: { en: 'Contact Us', ur: 'ہم سے رابطہ کریں' },
  sendMessage: { en: 'Send Message', ur: 'پیغام بھیجیں' },
  aiStylist: { en: 'AI Sneaker Expert', ur: 'AI جوتوں کا ماہر' },
  stylistIntro: { en: 'Hi! Looking for running shoes or casual kicks? I can help.', ur: 'ہائے! کیا آپ دوڑنے والے جوتے یا آرام دہ جوتے تلاش کر رہے ہیں؟ میں مدد کر سکتا ہوں۔' },
  typing: { en: 'Expert is typing...', ur: 'ماہر لکھ رہا ہے...' },
  footerText: { en: '© 2024 Salman SKT. All rights reserved.', ur: '© 2024 سلمان سیالکوٹ۔ جملہ حقوق محفوظ ہیں۔' },
  subscribe: { en: 'Subscribe', ur: 'سبسکرائب' },
  smartPricing: { en: 'Smart Pricing', ur: 'اسمارٹ قیمت' },
};

// Helper to generate IDs and assign images/categories for the 100 items
const generateProducts = (): Product[] => {
  const rawList = [
    { name: "T-Shirt", price: 25 }, { name: "Hoodie", price: 40 }, { name: "Jersey", price: 45 }, { name: "Jacket", price: 60 }, { name: "Tracksuit", price: 70 },
    { name: "Cap", price: 15 }, { name: "Beanie", price: 18 }, { name: "Jeans", price: 55 }, { name: "Shorts", price: 30 }, { name: "Sweatpants", price: 35 },
    { name: "Polo Shirt", price: 28 }, { name: "Dress Shirt", price: 38 }, { name: "Tank Top", price: 22 }, { name: "Sweater", price: 42 }, { name: "Cardigan", price: 48 },
    { name: "Vest", price: 32 }, { name: "Coat", price: 90 }, { name: "Trench Coat", price: 110 }, { name: "Blazer", price: 85 }, { name: "Leather Jacket", price: 120 },
    { name: "Bomber Jacket", price: 95 }, { name: "Windbreaker", price: 65 }, { name: "Raincoat", price: 75 }, { name: "Pajama Set", price: 40 }, { name: "Nightwear", price: 38 },
    { name: "Bathrobe", price: 50 }, { name: "Jumpsuit", price: 60 }, { name: "Romper", price: 45 }, { name: "Skirt", price: 30 }, { name: "Leggings", price: 28 },
    { name: "Jeggings", price: 32 }, { name: "Yoga Pants", price: 35 }, { name: "Sports Bra", price: 30 }, { name: "Workout Top", price: 26 }, { name: "Compression Shirt", price: 34 },
    { name: "Base Layer", price: 38 }, { name: "Thermal Wear", price: 40 }, { name: "Gloves", price: 20 }, { name: "Scarf", price: 22 }, { name: "Shawl", price: 28 },
    { name: "Socks (Pack)", price: 15 }, { name: "Ankle Socks", price: 10 }, { name: "Sneakers", price: 120 }, { name: "Running Shoes", price: 95 }, { name: "Leather Boots", price: 130 },
    { name: "Loafers", price: 85 }, { name: "Sandals", price: 28 }, { name: "Slippers", price: 20 }, { name: "Flip Flops", price: 18 }, { name: "Formal Shoes", price: 110 },
    { name: "Sunglasses", price: 35 }, { name: "Belt", price: 25 }, { name: "Watch", price: 60 }, { name: "Backpack", price: 50 }, { name: "Crossbody Bag", price: 40 },
    { name: "Duffle Bag", price: 60 }, { name: "Laptop Bag", price: 55 }, { name: "Wallet", price: 22 }, { name: "Tie", price: 15 }, { name: "Bow Tie", price: 18 },
    { name: "Cufflinks", price: 30 }, { name: "Handkerchief", price: 10 }, { name: "Rain Boots", price: 48 }, { name: "Ski Jacket", price: 140 }, { name: "Winter Coat", price: 130 },
    { name: "Puffer Jacket", price: 100 }, { name: "Down Jacket", price: 115 }, { name: "Graphic T-Shirt", price: 27 }, { name: "Ripped Jeans", price: 60 }, { name: "Cargo Pants", price: 50 },
    { name: "Denim Jacket", price: 85 }, { name: "Faux Fur Coat", price: 125 }, { name: "Camouflage Jacket", price: 90 }, { name: "Oversized Hoodie", price: 50 }, { name: "Zipper Hoodie", price: 45 },
    { name: "Half Sleeve Shirt", price: 30 }, { name: "Long Sleeve T-Shirt", price: 28 }, { name: "Linen Shirt", price: 40 }, { name: "Khaki Pants", price: 42 }, { name: "Joggers", price: 38 },
    { name: "Lounge Wear", price: 55 }, { name: "Sleep Shorts", price: 20 }, { name: "Sport Shorts", price: 26 }, { name: "Baseball Cap", price: 22 }, { name: "Visor Hat", price: 18 },
    { name: "Fedora Hat", price: 35 }, { name: "Bucket Hat", price: 25 }, { name: "Custom Jersey", price: 65 }, { name: "Team Tracksuit", price: 75 }, { name: "Warm Gloves", price: 24 },
    { name: "Touchscreen Gloves", price: 28 }, { name: "Waterproof Jacket", price: 85 }, { name: "Cycling Shorts", price: 32 }, { name: "Hiking Boots", price: 135 }, { name: "Trail Shoes", price: 110 },
    { name: "Dress Pants", price: 50 }, { name: "Office Shirt", price: 36 }, { name: "Softshell Jacket", price: 88 }, { name: "Winter Leggings", price: 40 }, { name: "Fashion Hoodie", price: 52 }
  ];

  return rawList.map((item, index) => {
    const name = item.name;
    const lowerName = name.toLowerCase();
    let category: 'Men' | 'Women' | 'Kids' = 'Men';
    let image = "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&q=80"; // Default shirt

    // Category Logic
    if (['skirt', 'leggings', 'bra', 'yoga', 'jeggings', 'dress', 'shawl', 'romper'].some(k => lowerName.includes(k))) {
      category = 'Women';
    } else if (['little', 'junior', 'kids', 'baby'].some(k => lowerName.includes(k))) {
      category = 'Kids';
    }

    // Image Logic based on keywords
    if (lowerName.includes('hoodie') || lowerName.includes('sweater') || lowerName.includes('cardigan')) {
      image = "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=800&q=80";
    } else if (lowerName.includes('jacket') || lowerName.includes('coat') || lowerName.includes('windbreaker') || lowerName.includes('blazer')) {
      image = "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800&q=80";
    } else if (lowerName.includes('shoe') || lowerName.includes('sneaker') || lowerName.includes('boot') || lowerName.includes('loafer') || lowerName.includes('sandal')) {
      image = "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80";
    } else if (lowerName.includes('jeans') || lowerName.includes('pants') || lowerName.includes('shorts') || lowerName.includes('joggers')) {
      image = "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=800&q=80";
    } else if (lowerName.includes('cap') || lowerName.includes('hat') || lowerName.includes('beanie')) {
      image = "https://images.unsplash.com/photo-1534215754734-18e55d13e346?w=800&q=80";
    } else if (lowerName.includes('bag') || lowerName.includes('backpack') || lowerName.includes('wallet')) {
      image = "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=800&q=80";
    } else if (lowerName.includes('watch')) {
      image = "https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=800&q=80";
    }

    return {
      id: 1000 + index,
      name: name,
      category: category,
      priceUSD: item.price,
      image: image,
      description: `Premium quality ${name} from our latest Salman SKT collection. Built for comfort and style.`,
      sizes: category === 'Men' || category === 'Women' ? ["S", "M", "L", "XL", "XXL"] : ["US 1Y", "US 2Y", "US 3Y"],
      rating: 4.5 + (Math.random() * 0.5),
      reviews: Math.floor(Math.random() * 500) + 10
    };
  });
};

export const PRODUCTS: Product[] = [
  {
    id: 201,
    name: "MrBeast Signature Blue Hoodie",
    category: "Men",
    priceUSD: 30.00,
    image: "https://images.unsplash.com/photo-1578768079052-aa76e52ff62e?w=800&q=80",
    description: "From the Beast Philanthropy Collection. Premium cotton blend blue hoodie featuring the iconic panther logo. 100% of profits go to charity.",
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    rating: 5.0,
    reviews: 50000
  },
  ...generateProducts()
];

export const BLOG_POSTS: BlogPost[] = [
  {
    id: 1,
    title: "Top 5 Sneakers of 2024",
    summary: "A breakdown of the best-selling shoes in America this year and why they are so popular.",
    date: "Oct 12, 2024",
    image: "https://images.unsplash.com/photo-1607522370275-f14bc3a5d288?w=800&q=80"
  },
  {
    id: 2,
    title: "How to Style Canvas High-Tops",
    summary: "From dresses to denim, learn how to pair your classic canvas kicks with any outfit.",
    date: "Sep 28, 2024",
    image: "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=800&q=80"
  }
];