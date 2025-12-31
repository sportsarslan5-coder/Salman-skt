
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
  search: { en: 'Search products...', ur: 'تلاش کریں...' },
  men: { en: 'Men', ur: 'مرد' },
  women: { en: 'Women', ur: 'خواتین' },
  kids: { en: 'Kids', ur: 'بچے' },
  buyNow: { en: 'Shop Collection', ur: 'خریداری کریں' },
  heroTitle: { en: 'Sialkot Shop', ur: 'سیالکوٹ شاپ' },
  heroSubtitle: { en: 'Global Export of Technical Apparel & Protective Gear.', ur: 'اعلیٰ معیار کے ملبوسات اور تکنیکی اسپورٹس ویئر۔' },
  dealOfTheDay: { en: 'Export Elite', ur: 'ایکسپورٹ پریمیم' },
  addToCart: { en: 'Add to Cart', ur: 'ٹوکری میں شامل کریں' },
  emptyCart: { en: 'Your cart is empty', ur: 'ٹوکری خالی ہے' },
  total: { en: 'Order Total', ur: 'کل رقم' },
  placeOrder: { en: 'Order via WhatsApp', ur: 'واٹس ایپ پر آرڈر کریں' },
  contactUs: { en: 'Get in Touch', ur: 'رابطہ کریں' },
  aiStylist: { en: 'Global Style Expert', ur: 'اسٹائل ماہر' },
  smartPricing: { en: 'AI Lens', ur: 'اے آئی لینز' },
};

export const PRODUCTS: Product[] = [
  {
    id: '101',
    title: "Pro-Tech Soccer Jersey",
    category: 'Men',
    price: 45.00,
    image_url: "https://images.unsplash.com/photo-1580087444194-03552a41d082?w=800&q=80",
    description: "Authentic Sialkot-engineered soccer jersey with moisture-wicking technology. Designed for professional performance and durability.",
    sizes: ["US Small", "US Medium", "US Large", "US XL", "US XXL"],
    rating: 4.9,
    reviews: 128,
    isProtex: false
  },
  {
    id: '102',
    title: "Arctic Shield Technical Jacket",
    category: 'Men',
    price: 120.00,
    image_url: "https://images.unsplash.com/photo-1544022613-e87ca75a784a?w=800&q=80",
    description: "Export-grade weather-resistant jacket. Features laser-cut seams and PROTEX thermal insulation for extreme environments.",
    sizes: ["US M", "US L", "US XL"],
    rating: 5.0,
    reviews: 84,
    isProtex: true
  },
  {
    id: '103',
    title: "Urban Elite Training Hoodie",
    category: 'Men',
    price: 65.00,
    image_url: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=800&q=80",
    description: "Heavyweight premium cotton blend. Engineered for the modern athlete with a focus on fit and comfort.",
    sizes: ["S", "M", "L", "XL"],
    rating: 4.8,
    reviews: 210,
    isProtex: true
  },
  {
    id: '104',
    title: "Technical Compression Set",
    category: 'Women',
    price: 55.00,
    image_url: "https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=800&q=80",
    description: "Elite performance wear for women. High-waisted, squat-proof, and designed with breathable mesh panels.",
    sizes: ["US XS", "US S", "US M", "US L"],
    rating: 4.7,
    reviews: 156,
    isProtex: false
  }
];

export const BLOG_POSTS: BlogPost[] = [
  {
    id: 1,
    title: "From Sialkot to New York",
    summary: "How we ship premium quality products directly from our factories to the USA.",
    date: "Dec 24, 2024",
    image: "https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?w=800&q=80"
  }
];
