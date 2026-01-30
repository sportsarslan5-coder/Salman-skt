
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
    description: "Premium varsity-style baseball jacket crafted with soft yet durable fabric. Featuring classic ribbed cuffs and collar, bold embroidered logo details, and a modern streetwear silhouette — perfect for casual everyday outfits, campus style, or urban fashion. A must-have outerwear essential for the season.",
    sizes: ["S", "M", "L", "XL", "XXL"],
    rating: 4.9,
    reviews: 42,
    isProtex: true
  },
  {
    id: 'skt-price-depression-v2',
    title: "Price & Depression Elite Stick Jacket",
    category: "Active & Casual",
    price: 50.00,
    image_url: "https://res.cloudinary.com/dc0ytviey/image/upload/v1769616091/IMG_20241109_212640_976_mndkiy.jpg",
    description: "The definitive technical outerwear from the Price & Depression series. This 'Stick Jacket' features industrial-grade stitching, premium insulated lining, and a high-performance silhouette optimized for the professional studio environment.",
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
    description: "Professional manufacturer quality football uniform. High-grade sublimation & tackle twill options. Available for Youth and Semi-Pro leagues.",
    sizes: ["Y-S", "Y-M", "S", "M", "L", "XL", "XXL"],
    rating: 4.9,
    reviews: 120,
    isProtex: true
  },
  {
    id: 'skt-bb-uniform',
    title: "Elite Basketball Uniform Set",
    category: "Team Uniforms",
    price: 38.00,
    image_url: "https://images.unsplash.com/photo-1546519638-68e109498ffc?w=800&q=80",
    description: "Tackle Twill & Sublimated basketball kits. Breathable, durable mesh fabric designed for high-intensity competition.",
    sizes: ["S", "M", "L", "XL", "XXL"],
    rating: 4.8,
    reviews: 95,
    isProtex: false
  },
  {
    id: 'skt-hoodie-alpha',
    title: "Alpha Tech Studio Hoodie",
    category: "Active & Casual",
    price: 55.00,
    image_url: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=800&q=80",
    description: "Premium fleece-lined tech hoodie. Professional double-stitching and screen-printed graphics. Export-grade durability.",
    sizes: ["S", "M", "L", "XL"],
    rating: 5.0,
    reviews: 340,
    isProtex: true
  },
  {
    id: 'skt-jogging-suit',
    title: "Warm Up & Jogging Suit",
    category: "Active & Casual",
    price: 75.00,
    image_url: "https://images.unsplash.com/photo-1483721310020-03333e577078?w=800&q=80",
    description: "Full track suit set for athletes. Sweat-wicking material and industrial quality finishing.",
    sizes: ["S", "M", "L", "XL"],
    rating: 4.7,
    reviews: 88,
    isProtex: false
  },
  {
    id: 'skt-duffle-bag',
    title: "Elite Tech Duffle Bag",
    category: "Gear & Bags",
    price: 60.00,
    image_url: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&q=80",
    description: "Durable sport duffle bag. Specialized compartments for sports gloves, sleeves, and shoes.",
    sizes: ["Standard"],
    rating: 4.9,
    reviews: 56,
    isProtex: false
  },
  {
    id: 'skt-compression-gear',
    title: "Elite Compression Pants",
    category: "Active & Casual",
    price: 25.00,
    image_url: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=800&q=80",
    description: "Four-way stretch technical compression wear. Professional grade support for Semi-Pro athletes.",
    sizes: ["S", "M", "L", "XL"],
    rating: 4.8,
    reviews: 112,
    isProtex: false
  }
];

export const BLOG_POSTS: BlogPost[] = [
  {
    id: 1,
    title: "Manufacturing Mastery: Tackle Twill vs. Sublimation",
    summary: "A deep dive into the technical standards used by Salman SKT for high-end teamwear.",
    date: "April 20, 2025",
    image: "https://images.unsplash.com/photo-1520004434532-668416a08753?w=800&q=80"
  }
];
