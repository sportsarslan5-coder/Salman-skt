
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
  search: { en: 'Search products...', ur: 'مصنوعات تلاش کریں...' },
  men: { en: 'Men', ur: 'مرد' },
  women: { en: 'Women', ur: 'خواتین' },
  kids: { en: 'Kids', ur: 'بچے' },
  buyNow: { en: 'Shop Our Collection', ur: 'ہماری کلیکشن خریدیں' },
  heroTitle: { en: 'Sialkot Shop', ur: 'سیالکوٹ شاپ' },
  heroSubtitle: { en: 'Premium quality apparel, technical sportswear, and PROTEX protective gear.', ur: 'اعلیٰ معیار کے ملبوسات، تکنیکی اسپورٹس ویئر، اور پروٹیکس حفاظتی گیئر۔' },
  dealOfTheDay: { en: 'Trending Now', ur: 'اب ٹرینڈ ہو رہا ہے' },
  addToCart: { en: 'Add to Cart', ur: 'ٹوکری میں شامل کریں' },
  reviews: { en: 'Customer Reviews', ur: 'کسٹمر کے جائزے' },
  emptyCart: { en: 'Your cart is empty', ur: 'آپ کی ٹوکری خالی ہے' },
  total: { en: 'Total', ur: 'کل' },
  placeOrder: { en: 'Place Order on WhatsApp', ur: 'واٹس ایپ پر آرڈر کریں' },
  contactUs: { en: 'Contact Us', ur: 'ہم سے رابطہ کریں' },
  sendMessage: { en: 'Send Message', ur: 'پیغام بھیجیں' },
  aiStylist: { en: 'Style Expert', ur: 'اسٹائل ماہر' },
  stylistIntro: { en: 'Hi! I am your Sialkot Shop expert. Looking for premium jerseys or PROTEX jackets?', ur: 'ہائے! میں آپ کا سیالکوٹ شاپ ایکسپرٹ ہوں۔ کیا آپ پریمیم جرسی یا پروٹیکس جیکٹ تلاش کر رہے ہیں؟' },
  typing: { en: 'Expert is typing...', ur: 'ماہر لکھ رہا ہے...' },
  footerText: { en: '© 2024 Sialkot Shop Export. All rights reserved.', ur: '© 2024 سیالکوٹ شاپ ایکسپورٹ۔ جملہ حقوق محفوظ ہیں۔' },
  subscribe: { en: 'Subscribe', ur: 'سبسکرائب' },
  smartPricing: { en: 'AI Lens', ur: 'اے آئی لینز' },
};

const generateProducts = (): Product[] => {
  const rawList = [
    { name: "Pro-Lite Football Jersey", price: 45, category: 'Men', img: "https://images.unsplash.com/photo-1580087444194-03552a41d082?w=800&q=80", isProtex: false },
    { name: "Arctic Storm Jacket", price: 110, category: 'Men', img: "https://images.unsplash.com/photo-1544022613-e87ca75a784a?w=800&q=80", isProtex: true },
    { name: "Technical Training Hoodie", price: 65, category: 'Men', img: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=800&q=80", isProtex: true },
    { name: "Export Grade Cotton Tee", price: 25, category: 'Men', img: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&q=80", isProtex: false },
    { name: "Laser-Cut Tracksuit", price: 95, category: 'Men', img: "https://images.unsplash.com/photo-1483721310020-03333e577078?w=800&q=80", isProtex: true },
    { name: "Premium Leather Biker Jacket", price: 180, category: 'Men', img: "https://images.unsplash.com/photo-1520975954732-35dd22299614?w=800&q=80", isProtex: true },
    { name: "Womens Elite Yoga Leggings", price: 35, category: 'Women', img: "https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=800&q=80", isProtex: false },
    { name: "Urban Tech Windbreaker", price: 85, category: 'Men', img: "https://images.unsplash.com/photo-1622445272461-c6580cab8755?w=800&q=80", isProtex: true },
    { name: "Junior Pro Sports Set", price: 40, category: 'Kids', img: "https://images.unsplash.com/photo-1519233924710-1811568205f4?w=800&q=80", isProtex: false },
    { name: "Export Quality Denim Jacket", price: 75, category: 'Men', img: "https://images.unsplash.com/photo-1576871337622-98d48d1cf531?w=800&q=80", isProtex: false }
  ];

  return rawList.map((item, index) => ({
    id: (2000 + index).toString(),
    title: item.name,
    category: item.category,
    price: item.price,
    image_url: item.img,
    description: `Official Sialkot Shop ${item.name} collection. Engineered with ${item.isProtex ? 'PROTEX technical weather-proofing' : 'premium export-grade cotton'} for the ultimate athletic and lifestyle experience.`,
    sizes: item.category === 'Kids' ? ["US 8Y", "US 10Y", "US 12Y"] : ["S", "M", "L", "XL", "XXL"],
    rating: parseFloat((4.8 + (Math.random() * 0.2)).toFixed(1)),
    reviews: Math.floor(Math.random() * 500) + 50,
    isProtex: item.isProtex
  }));
};

export const PRODUCTS: Product[] = generateProducts();

export const BLOG_POSTS: BlogPost[] = [
  {
    id: 1,
    title: "The Sialkot Legacy",
    summary: "How a small city in Pakistan became the world's leading hub for sports manufacturing.",
    date: "Dec 20, 2024",
    image: "https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?w=800&q=80"
  },
  {
    id: 2,
    title: "PROTEX Technology Explained",
    summary: "Diving deep into the laser-cut technology that makes our jackets invincible.",
    date: "Dec 15, 2024",
    image: "https://images.unsplash.com/photo-1544022613-e87ca75a784a?w=800&q=80"
  }
];
