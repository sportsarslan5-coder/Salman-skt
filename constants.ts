
import { Product, BlogPost, Translations } from './types';

export const EXCHANGE_RATE_PKR = 278.5; 
export const WHATSAPP_NUMBER = "923039877968";

export const TRANSLATIONS: Translations = {
  home: { en: 'Home', ur: 'گھر' },
  shop: { en: 'Catalog', ur: 'دکان' },
  blog: { en: 'Archive', ur: 'بلاگ' },
  contact: { en: 'Inquiry', ur: 'رابطہ' },
  cart: { en: 'Manifest', ur: 'ٹوکری' },
  checkout: { en: 'Finalize', ur: 'چیک آؤٹ' },
  search: { en: 'Query Assets...', ur: 'تلاش کریں...' },
  men: { en: 'Technical', ur: 'فنی' },
  women: { en: 'Performance', ur: 'کارکردگی' },
  kids: { en: 'Junior', ur: 'جونیئر' },
  buyNow: { en: 'Acquire Asset', ur: 'خریداری کریں' },
  heroTitle: { en: 'Salman SKT', ur: 'سلمان ایس کے ٹی' },
  heroSubtitle: { en: 'I was a lesson.', ur: 'اعلیٰ معیار کے ملبوسات' },
  dealOfTheDay: { en: 'Soup Series', ur: 'سوپ سیریز' },
  addToCart: { en: 'Deploy to Manifest', ur: 'ٹوکری میں شامل کریں' },
  emptyCart: { en: 'Archive is empty', ur: 'ٹوکری خالی ہے' },
  total: { en: 'Total Valuation', ur: 'کل رقم' },
  placeOrder: { en: 'Finalize on WhatsApp', ur: 'واٹس ایپ پر آرڈر کریں' },
  contactUs: { en: 'Direct Link', ur: 'رابطہ کریں' },
  aiStylist: { en: 'Style AI', ur: 'اے آئی اسٹائل' },
  smartPricing: { en: 'AI Lens', ur: 'اے آئی لینز' },
};

export const PRODUCTS: Product[] = [
  {
    id: 'depression-shoes-01',
    title: "The 'Depression' Tech Footwear",
    category: 'Footwear',
    price: 220.00,
    image_url: "https://res.cloudinary.com/dc0ytviey/image/upload/v1769492135/untitled-1769491073282_tjzjlc.jpg",
    description: "A technical footwear lesson. Crafted for those who walk through the storm. Industrial grade soles with a heavy emotional footprint. Engineered for extreme urban durability.",
    sizes: ["US 8", "US 9", "US 10", "US 11"],
    rating: 5.0,
    reviews: 124,
    isProtex: true
  },
  {
    id: 'soup-alpha-01',
    title: "Signature Soup Jacket (Alpha)",
    category: 'Men',
    price: 185.00,
    image_url: "https://images.unsplash.com/photo-1591047139829-d91aec16adcd?w=800&q=80",
    description: "The definitive flagship piece. Engineered with fluid-repellent Protex. As the founder says: 'I was a lesson.' This is urban hardware, not just a jacket.",
    sizes: ["US M", "US L", "US XL", "US XXL"],
    rating: 5.0,
    reviews: 489,
    isProtex: true
  },
  {
    id: 'stand-studio-01',
    title: "Industrial Studio Stand",
    category: 'Accessories',
    price: 95.00,
    image_url: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=800&q=80",
    description: "Welded steel garment display. The exact unit used in Salman SKT production facilities. Minimalist, indestructible, industrial grade.",
    sizes: ["Standard"],
    rating: 4.9,
    reviews: 82,
    isProtex: false
  },
  {
    id: 'tech-hoodie-v3',
    title: "V3 Technical Hoodie",
    category: 'Men',
    price: 75.00,
    image_url: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=800&q=80",
    description: "Double-knit technical fleece with reinforced impact zones. Designed for high-frequency movement and climate resilience.",
    sizes: ["S", "M", "L", "XL"],
    rating: 4.8,
    reviews: 312,
    isProtex: true
  }
];

export const BLOG_POSTS: BlogPost[] = [
  {
    id: 1,
    title: "The Legacy of the Lesson",
    summary: "How a single failure in the workshop led to the invention of the world's most durable technical gear.",
    date: "Feb 15, 2025",
    image: "https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?w=800&q=80"
  }
];
