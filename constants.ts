
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
  search: { en: 'Search products...', ur: 'تلاش کریں...' },
  men: { en: "Men's Fashion", ur: 'مردانہ فیشن' },
  women: { en: "Women's Fashion", ur: 'زنانہ فیشن' },
  kids: { en: 'Shoes', ur: 'جوتے' },
  accessories: { en: 'Accessories', ur: 'اشیاء' },
  buyNow: { en: 'Shop Now', ur: 'خریداری کریں' },
  heroTitle: { en: 'SALMAN SKT', ur: 'سلمان ایس کے ٹی' },
  heroSubtitle: { en: 'Technical Mastery. Global Elegance.', ur: 'اعلیٰ معیار اور خوبصورتی' },
  dealOfTheDay: { en: 'Featured Arrivals', ur: 'نئے ڈیزائن' },
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
    id: 'skt-men-01',
    title: "Alpha Tech Bomber Jacket",
    category: "Men's Fashion",
    price: 185.00,
    image_url: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=800&q=80",
    description: "Export-grade technical bomber jacket with signature Salman SKT stitching. Water-resistant and breathable.",
    sizes: ["S", "M", "L", "XL"],
    rating: 4.9,
    reviews: 142,
    isProtex: true
  },
  {
    id: 'skt-women-01',
    title: "Minimalist Studio Gown",
    category: "Women's Fashion",
    price: 210.00,
    image_url: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=800&q=80",
    description: "Elegant silk blend evening gown. Designed for professional studio performance and visual depth.",
    sizes: ["XS", "S", "M", "L"],
    rating: 5.0,
    reviews: 96,
    isProtex: false
  },
  {
    id: 'skt-shoe-01',
    title: "Technical Court Sneakers",
    category: "Shoes",
    price: 145.00,
    image_url: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80",
    description: "Premium leather technical sneakers. Lightweight sole with high-density impact support.",
    sizes: ["8", "9", "10", "11"],
    rating: 4.8,
    reviews: 320,
    isProtex: false
  },
  {
    id: 'skt-acc-01',
    title: "Elite Studio Backpack",
    category: "Accessories",
    price: 85.00,
    image_url: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&q=80",
    description: "Structured canvas and leather backpack. Dedicated compartments for technical studio gear.",
    sizes: ["Standard"],
    rating: 4.7,
    reviews: 64,
    isProtex: false
  },
  {
    id: 'skt-shoe-02',
    title: "Classic Chelsea Boots",
    category: "Shoes",
    price: 195.00,
    image_url: "https://images.unsplash.com/photo-1638247025967-b4e38f787b76?w=800&q=80",
    description: "Hand-stitched leather Chelsea boots. Sialkot export grade craftsmanship.",
    sizes: ["7", "8", "9", "10", "11"],
    rating: 4.9,
    reviews: 88,
    isProtex: false
  },
  {
    id: 'skt-acc-02',
    title: "Precision Studio Watch",
    category: "Accessories",
    price: 299.00,
    image_url: "https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=800&q=80",
    description: "Stainless steel chronograph with minimalist dial. The essential accessory for the professional studio manager.",
    sizes: ["One Size"],
    rating: 5.0,
    reviews: 12,
    isProtex: false
  }
];

export const BLOG_POSTS: BlogPost[] = [
  {
    id: 1,
    title: "The Sialkot Export Standard",
    summary: "How Salman SKT maintains quality control for global studio apparel.",
    date: "March 15, 2025",
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&q=80"
  }
];
