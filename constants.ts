
import { Product, BlogPost, Translations } from './types';

export const EXCHANGE_RATE_PKR = 278.5; 
export const WHATSAPP_NUMBER = "923039877968";

export const TRANSLATIONS: Translations = {
  home: { en: 'Home', ur: 'گھر' },
  shop: { en: 'Catalog', ur: 'دکان' },
  blog: { en: 'Journal', ur: 'بلاگ' },
  contact: { en: 'Support', ur: 'رابطہ' },
  cart: { en: 'Bag', ur: 'ٹوکری' },
  checkout: { en: 'Finalize', ur: 'چیک آؤٹ' },
  search: { en: 'Search for uniforms, gear, apparel...', ur: 'مصنوعات تلاش کریں...' },
  men: { en: "Team Uniforms", ur: 'یونیفارم' },
  women: { en: "Active & Casual", ur: 'ایکٹو ویئر' },
  kids: { en: 'Elite Shoes', ur: 'جوتے' },
  accessories: { en: 'Gear & Bags', ur: 'اشیاء' },
  buyNow: { en: 'Shop Now', ur: 'خریداری کریں' },
  heroTitle: { en: 'SALMAN SKT', ur: 'سلمان ایس کے ٹی' },
  heroSubtitle: { en: 'Professional Apparel Manufacturer. Youth to Semi-Pro.', ur: 'اعلیٰ معیار اور خوبصورتی' },
  dealOfTheDay: { en: 'Featured Stock', ur: 'نئے ڈیزائن' },
  addToCart: { en: 'Add to Bag', ur: 'ٹوکری میں شامل کریں' },
  emptyCart: { en: 'Your bag is empty', ur: 'ٹوکری خالی ہے' },
  total: { en: 'Subtotal', ur: 'کل رقم' },
  placeOrder: { en: 'Order via WhatsApp', ur: 'واٹس ایپ پر آرڈر کریں' },
  contactUs: { en: 'Factory Support', ur: 'رابطہ کریں' },
  aiStylist: { en: 'Studio AI', ur: 'اے آئی اسٹائل' },
  smartPricing: { en: 'Visual Lens', ur: 'اے آئی لینز' },
};

export const PRODUCTS: Product[] = [
  {
    id: 'skt-premium-hoodie-v2',
    title: "Premium Studio Hoodie",
    category: "Active & Casual",
    price: 35.00,
    image_url: "https://res.cloudinary.com/dc0ytviey/image/upload/v1769946025/received_534683599421218_fvdmuq.jpg",
    description: "New season technical hoodie. Featuring factory-grade reinforced stitching and a premium cotton-poly blend for maximum comfort and durability. A Sialkot manufacturing exclusive for the global streetwear scene.",
    sizes: ["S", "M", "L", "XL", "XXL"],
    rating: 4.9,
    reviews: 24,
    isProtex: true
  },
  {
    id: 'skt-technical-hoodie-gif',
    title: "Technical Studio Hoodie",
    category: "Active & Casual",
    price: 30.00,
    image_url: "https://res.cloudinary.com/dc0ytviey/image/upload/v1769747839/tshirt-2.original_le1qch.gif",
    description: "Industrial-grade technical hoodie featuring a performance-optimized blend. This 'Salman SKT' studio essential brings motion to streetwear with complex panelling and factory-grade durability. Built for the USA technical fashion scene.",
    sizes: ["S", "M", "L", "XL", "XXL"],
    rating: 5.0,
    reviews: 62,
    isProtex: true
  },
  {
    id: 'skt-pd-stick-jacket-1',
    title: "Price & Depression Stick Jacket",
    category: "Active & Casual",
    price: 50.00,
    image_url: "https://res.cloudinary.com/dc0ytviey/image/upload/v1769747603/IMG_20241109_212720_166_tqlcub.jpg",
    description: "Premium technical 'Stick Jacket' from the Price & Depression collection. USA SEO Optimized industrial streetwear with signature stitching and weather-resistant utility.",
    sizes: ["S", "M", "L", "XL", "XXL"],
    rating: 5.0,
    reviews: 142,
    isProtex: true
  },
  {
    id: 'skt-pd-stick-jacket-2',
    title: "Price & Depression Stick Jacket (Archive II)",
    category: "Active & Casual",
    price: 50.00,
    image_url: "https://res.cloudinary.com/dc0ytviey/image/upload/v1769747602/IMG_20241105_202206_389_eugddm.jpg",
    description: "Technical Stick Jacket featuring industrial-grade panelling and reinforced seams. Designed for the high-end USA streetwear market by Salman SKT.",
    sizes: ["S", "M", "L", "XL", "XXL"],
    rating: 4.9,
    reviews: 89,
    isProtex: true
  },
  {
    id: 'skt-pd-stick-jacket-3',
    title: "Price & Depression Stick Jacket (Lesson Edition)",
    category: "Active & Casual",
    price: 50.00,
    image_url: "https://res.cloudinary.com/dc0ytviey/image/upload/v1769747584/IMG_20241104_002851_263_rrzyjq.jpg",
    description: "'I was a lesson' technical shell. Precision stick stitching and high-performance silhouette. Elite manufacturing standards for the urban explorer.",
    sizes: ["S", "M", "L", "XL", "XXL"],
    rating: 5.0,
    reviews: 76,
    isProtex: true
  },
  {
    id: 'skt-pd-stick-jacket-4',
    title: "Price & Depression Stick Jacket (Studio Series)",
    category: "Active & Casual",
    price: 50.00,
    image_url: "https://res.cloudinary.com/dc0ytviey/image/upload/v1769747602/IMG_20241105_202208_105_leu9ci.jpg",
    description: "Factory-grade technical outerwear. This Stick Jacket balances complex industrial aesthetics with functional export durability. Optimized for autumn and winter.",
    sizes: ["S", "M", "L", "XL", "XXL"],
    rating: 4.8,
    reviews: 54,
    isProtex: true
  },
  {
    id: 'skt-pd-stick-jacket-5',
    title: "Price & Depression Stick Jacket (Varsity Hybrid)",
    category: "Active & Casual",
    price: 50.00,
    image_url: "https://res.cloudinary.com/dc0ytviey/image/upload/v1769747603/IMG_20241109_212702_161_ciaowd.jpg",
    description: "Technical varsity-style hybrid Stick Jacket. Features bold embroidered details and a modern streetwear silhouette. High-quality Sialkot craftsmanship.",
    sizes: ["S", "M", "L", "XL", "XXL"],
    rating: 4.9,
    reviews: 112,
    isProtex: true
  },
  {
    id: 'skt-price-depression-shoes',
    title: "Price & Depression Archive I",
    category: "Elite Shoes",
    price: 155.00,
    image_url: "https://res.cloudinary.com/dc0ytviey/image/upload/v1769492135/untitled-1769491073282_tjzjlc.jpg",
    description: "Original technical footwear from the 'I was a lesson' collection. High-performance design optimized for technical apparel synergy.",
    sizes: ["7", "8", "9", "10", "11", "12"],
    rating: 5.0,
    reviews: 48,
    isProtex: true
  },
  {
    id: 'skt-fb-sublimated',
    title: "Sublimation Football Uniform",
    category: "Team Uniforms",
    price: 45.00,
    image_url: "https://images.unsplash.com/photo-1551854838-212c20b8c184?w=800&q=80",
    description: "Professional manufacturer quality football uniform. High-grade sublimation & tackle twill options.",
    sizes: ["Y-S", "Y-M", "S", "M", "L", "XL", "XXL"],
    rating: 4.9,
    reviews: 120,
    isProtex: true
  }
];

export const BLOG_POSTS: BlogPost[] = [
  {
    id: 1,
    title: "The Rise of Stick Jackets in the USA",
    summary: "How the Price & Depression series became a technical streetwear staple through Sialkot's manufacturing excellence.",
    date: "June 05, 2025",
    image: "https://res.cloudinary.com/dc0ytviey/image/upload/v1769747603/IMG_20241109_212720_166_tqlcub.jpg"
  }
];
