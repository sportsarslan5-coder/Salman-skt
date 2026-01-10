
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
  heroTitle: { en: 'Salman SKT', ur: 'سلمان ایس کے ٹی' },
  heroSubtitle: { en: 'I was a lesson.', ur: 'اعلیٰ معیار کے ملبوسات اور فنی جیکٹس۔' },
  dealOfTheDay: { en: 'Soup Series', ur: 'سوپ سیریز' },
  addToCart: { en: 'Add to Cart', ur: 'ٹوکری میں شامل کریں' },
  emptyCart: { en: 'Your cart is empty', ur: 'ٹوکری خالی ہے' },
  total: { en: 'Order Total', ur: 'کل رقم' },
  placeOrder: { en: 'Order via WhatsApp', ur: 'واٹس ایپ پر آرڈر کریں' },
  contactUs: { en: 'Get in Touch', ur: 'رابطہ کریں' },
  aiStylist: { en: 'The Stylist', ur: 'اسٹائل ماہر' },
  smartPricing: { en: 'AI Lens', ur: 'اے آئی لینز' },
};

export const PRODUCTS: Product[] = [
  {
    id: 'soup-01',
    title: "Signature Soup Jacket (Alpha)",
    category: 'Men',
    price: 185.00,
    image_url: "https://images.unsplash.com/photo-1591047139829-d91aec16adcd?w=800&q=80",
    description: "The definitive piece by Salman SKT. This soup jacket isn't just clothing; it's a technical shield. Engineered with fluid-repellent Protex fabric. As the founder says: 'I was a lesson.'",
    sizes: ["US M", "US L", "US XL", "US XXL"],
    rating: 5.0,
    reviews: 489,
    isProtex: true
  },
  {
    id: 'stand-01',
    title: "The SKT Studio T-Shirt Stand",
    category: 'Accessories',
    price: 95.00,
    image_url: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=800&q=80",
    description: "The industrial-grade T-shirt stand used in Salman SKT's private studios. Minimalist, heavy-duty, and designed to display garments with the respect they deserve.",
    sizes: ["Studio Size"],
    rating: 4.9,
    reviews: 82,
    isProtex: false
  },
  {
    id: 'hoodie-01',
    title: "Technical Soup Hoodie",
    category: 'Men',
    price: 75.00,
    image_url: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=800&q=80",
    description: "A mid-weight technical layer for the urban explorer. Features the signature SKT fit and high-density branding. Built for durability.",
    sizes: ["S", "M", "L", "XL"],
    rating: 4.8,
    reviews: 312,
    isProtex: true
  },
  {
    id: 'jersey-01',
    title: "Elite Export Jersey",
    category: 'Men',
    price: 45.00,
    image_url: "https://images.unsplash.com/photo-1580087444194-03552a41d082?w=800&q=80",
    description: "Professional grade moisture-wicking jersey. Built for the heat of the game with reinforced stitching.",
    sizes: ["US Small", "US Medium", "US Large", "US XL"],
    rating: 4.9,
    reviews: 215,
    isProtex: false
  }
];

export const BLOG_POSTS: BlogPost[] = [
  {
    id: 1,
    title: "The Evolution of the Soup Jacket",
    summary: "Discover why Salman SKT says 'I was a lesson' and how it shaped the most durable jacket on the market.",
    date: "Jan 10, 2025",
    image: "https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?w=800&q=80"
  }
];
