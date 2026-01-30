
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
    id: 'skt-varsity-jacket-streetwear',
    title: "Men’s Designer Varsity Baseball Jacket – Streetwear Style",
    category: "Active & Casual",
    price: 59.99,
    image_url: "https://res.cloudinary.com/dc0ytviey/image/upload/v1769747603/IMG_20241109_212702_161_ciaowd.jpg",
    description: "Premium varsity-style baseball jacket crafted with soft yet durable fabric. Featuring classic ribbed cuffs and collar, bold embroidered logo details, and a modern streetwear silhouette — perfect for casual everyday outfits, campus style, or urban fashion. A must-have outerwear essential for fall and winter.",
    sizes: ["S", "M", "L", "XL", "XXL"],
    rating: 4.9,
    reviews: 86,
    isProtex: true
  },
  {
    id: 'skt-price-depression-alpha',
    title: "Price & Depression Alpha Stick Jacket",
    category: "Active & Casual",
    price: 50.00,
    image_url: "https://res.cloudinary.com/dc0ytviey/image/upload/v1769747602/IMG_20241105_202206_389_eugddm.jpg",
    description: "Technical Alpha-series outerwear. This 'Price & Depression' edition features reinforced stitching and a weather-resistant technical shell, optimized for the USA streetwear market.",
    sizes: ["S", "M", "L", "XL", "XXL"],
    rating: 5.0,
    reviews: 42,
    isProtex: true
  },
  {
    id: 'skt-price-depression-lesson',
    title: "Price & Depression 'Lesson' Tech Shell",
    category: "Active & Casual",
    price: 50.00,
    image_url: "https://res.cloudinary.com/dc0ytviey/image/upload/v1769747584/IMG_20241104_002851_263_rrzyjq.jpg",
    description: "I was a lesson. High-performance technical shell jacket with industrial-grade finishing. A core piece of the Salman SKT technical archive.",
    sizes: ["S", "M", "L", "XL", "XXL"],
    rating: 5.0,
    reviews: 31,
    isProtex: true
  },
  {
    id: 'skt-price-depression-studio',
    title: "Price & Depression Studio Tech Jacket",
    category: "Active & Casual",
    price: 50.00,
    image_url: "https://res.cloudinary.com/dc0ytviey/image/upload/v1769747602/IMG_20241105_202208_105_leu9ci.jpg",
    description: "Designed for the urban explorer. This technical jacket balances industrial aesthetics with functional manufacturing standards.",
    sizes: ["S", "M", "L", "XL", "XXL"],
    rating: 4.8,
    reviews: 19,
    isProtex: true
  },
  {
    id: 'skt-price-depression-v3',
    title: "Price & Depression Industrial Parka",
    category: "Active & Casual",
    price: 50.00,
    image_url: "https://res.cloudinary.com/dc0ytviey/image/upload/v1769747603/IMG_20241109_212720_166_tqlcub.jpg",
    description: "Maximum utility stick jacket. Features complex panelling and factory-grade insulated lining for the ultimate fall/winter essential.",
    sizes: ["S", "M", "L", "XL", "XXL"],
    rating: 5.0,
    reviews: 27,
    isProtex: true
  },
  {
    id: 'skt-price-depression-v2',
    title: "Price & Depression Elite Stick Jacket",
    category: "Active & Casual",
    price: 50.00,
    image_url: "https://res.cloudinary.com/dc0ytviey/image/upload/v1769616091/IMG_20241109_212640_976_mndkiy.jpg",
    description: "The definitive technical outerwear from the Price & Depression series. This 'Stick Jacket' features industrial-grade stitching, premium insulated lining, and a high-performance silhouette.",
    sizes: ["S", "M", "L", "XL", "XXL"],
    rating: 5.0,
    reviews: 64,
    isProtex: true
  },
  {
    id: 'skt-price-depression',
    title: "Price & Depression Archive I",
    category: "Elite Shoes",
    price: 155.00,
    image_url: "https://res.cloudinary.com/dc0ytviey/image/upload/v1769492135/untitled-1769491073282_tjzjlc.jpg",
    description: "The original technical footwear from the 'I was a lesson' collection. High-performance design optimized for technical apparel synergy.",
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
    title: "Price & Depression: The Studio Philosophy",
    summary: "Exploring the rise of technical 'Stick Jackets' in the USA streetwear market and Sialkot's manufacturing role.",
    date: "May 10, 2025",
    image: "https://res.cloudinary.com/dc0ytviey/image/upload/v1769747603/IMG_20241109_212720_166_tqlcub.jpg"
  }
];
