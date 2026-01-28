
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
  search: { en: 'Search for products, brands and more', ur: 'مصنوعات تلاش کریں...' },
  men: { en: "Men's Fashion", ur: 'مردانہ فیشن' },
  women: { en: "Women's Fashion", ur: 'زنانہ فیشن' },
  kids: { en: 'Shoes', ur: 'جوتے' },
  accessories: { en: 'Accessories', ur: 'اشیاء' },
  buyNow: { en: 'Shop Now', ur: 'خریداری کریں' },
  heroTitle: { en: 'SALMAN SKT', ur: 'سلمان ایس کے ٹی' },
  heroSubtitle: { en: 'Professional Studio Fashion. Export Quality.', ur: 'اعلیٰ معیار اور خوبصورتی' },
  dealOfTheDay: { en: 'Top Recommendations', ur: 'نئے ڈیزائن' },
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
    id: 'skt-men-formal-01',
    title: "Signature Formal Suite",
    category: "Men's Fashion",
    price: 245.00,
    image_url: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=800&q=80",
    description: "Premium formal wear crafted from high-density wool blend. Designed for elite studio events and corporate excellence.",
    sizes: ["S", "M", "L", "XL"],
    rating: 4.9,
    reviews: 210,
    isProtex: true
  },
  {
    id: 'skt-women-ethnic-01',
    title: "Hand-Embroidered Ethnic Set",
    category: "Women's Fashion",
    price: 135.00,
    image_url: "https://images.unsplash.com/photo-1583391733956-6c78276477e2?w=800&q=80",
    description: "Traditional ethnic wear with a modern studio twist. Features delicate hand-embroidery and premium silk fabrics.",
    sizes: ["XS", "S", "M", "L"],
    rating: 5.0,
    reviews: 85,
    isProtex: false
  },
  {
    id: 'skt-shoe-sneaker-01',
    title: "Alpha Tech Sneakers",
    category: "Shoes",
    price: 120.00,
    image_url: "https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=800&q=80",
    description: "Breathable mesh sneakers with high-impact support. Ideal for casual wear and technical studio movement.",
    sizes: ["7", "8", "9", "10", "11"],
    rating: 4.8,
    reviews: 420,
    isProtex: false
  },
  {
    id: 'skt-acc-belt-01',
    title: "Full-Grain Leather Belt",
    category: "Accessories",
    price: 45.00,
    image_url: "https://images.unsplash.com/photo-1624222247344-550fbadecfe4?w=800&q=80",
    description: "Durable full-grain leather belt with a custom Salman SKT buckle. A staple accessory for professional attire.",
    sizes: ["32", "34", "36", "38"],
    rating: 4.7,
    reviews: 120,
    isProtex: false
  },
  {
    id: 'skt-acc-glasses-01',
    title: "Studio Vision Sunglasses",
    category: "Accessories",
    price: 65.00,
    image_url: "https://images.unsplash.com/photo-1511499767390-a73359580bf1?w=800&q=80",
    description: "Polarized UV-protection sunglasses. Lightweight acetate frames designed for visual clarity and style.",
    sizes: ["One Size"],
    rating: 4.9,
    reviews: 56,
    isProtex: false
  },
  {
    id: 'skt-shoe-sandals-01',
    title: "Elite Comfort Sandals",
    category: "Shoes",
    price: 55.00,
    image_url: "https://images.unsplash.com/photo-1603487759182-23b8859edca2?w=800&q=80",
    description: "Ergonomic leather sandals with cushioned footbeds. Perfect for casual summer days and relaxed studio environments.",
    sizes: ["7", "8", "9", "10"],
    rating: 4.6,
    reviews: 180,
    isProtex: false
  },
  {
    id: 'skt-men-casual-01',
    title: "Essential Studio Polo",
    category: "Men's Fashion",
    price: 35.00,
    image_url: "https://images.unsplash.com/photo-1581655353564-df123a1eb820?w=800&q=80",
    description: "100% Pima cotton polo. Pre-shrunk and double-stitched for lasting quality in casual settings.",
    sizes: ["S", "M", "L", "XL", "XXL"],
    rating: 4.8,
    reviews: 340,
    isProtex: false
  },
  {
    id: 'skt-acc-cap-01',
    title: "Technical Archive Cap",
    category: "Accessories",
    price: 25.00,
    image_url: "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=800&q=80",
    description: "Classic 6-panel technical cap with embroidered SKT logo. Adjustible strap with steel buckle.",
    sizes: ["One Size"],
    rating: 4.9,
    reviews: 92,
    isProtex: false
  }
];

export const BLOG_POSTS: BlogPost[] = [
  {
    id: 1,
    title: "The Art of Professional Stitching",
    summary: "Exploring the technical standards that make Sialkot the world's apparel hub.",
    date: "April 10, 2025",
    image: "https://images.unsplash.com/photo-1520004434532-668416a08753?w=800&q=80"
  }
];
