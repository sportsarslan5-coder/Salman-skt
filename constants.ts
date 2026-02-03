
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
  // --- BASKETBALL UNIFORMS COLLECTION ($35) ---
  {
    id: 'skt-bball-1',
    title: "SKT Dynasty Pro-Swingman Jersey",
    category: "Team Uniforms",
    price: 35.00,
    image_url: "https://res.cloudinary.com/dzt2nrkjr/image/upload/v1769959106/unisex-nike-stephen-curry-black-golden-state-warriors-swingman-badge-player-jersey-city-edition_pi5202000_ff_5202680-898016d5c53d4c7303a4_full_s1hfmj.jpg",
    description: "Elite swingman quality basketball jersey. Features advanced moisture-wicking fabric and heat-pressed graphics. Engineered for professional league standards in Sialkot for the USA market.",
    sizes: ["S", "M", "L", "XL", "XXL"],
    rating: 5.0,
    reviews: 245,
    isProtex: true
  },
  {
    id: 'skt-signature-hoodie-v3',
    title: "SKT Signature Archive Hoodie",
    category: "Active & Casual",
    price: 35.00,
    image_url: "https://res.cloudinary.com/dc0ytviey/image/upload/v1769946031/received_636377795397638_c5nabl.jpg",
    description: "High-density technical studio hoodie. Featuring a custom heavyweight cotton-poly blend, reinforced hood structure, and precision-engineered fit. A pinnacle of Sialkot's manufacturing excellence for the global streetwear elite.",
    sizes: ["S", "M", "L", "XL", "XXL"],
    rating: 5.0,
    reviews: 31,
    isProtex: true
  },
  {
    id: 'skt-am-1',
    title: "SKT Diamond Elite Pro Baseball Uniform",
    category: "Team Uniforms",
    price: 35.00,
    image_url: "https://res.cloudinary.com/dzt2nrkjr/image/upload/v1770048123/FD-163_FD-5060_u9c4nk.png",
    description: "Professional grade baseball uniform featuring high-tension moisture-wicking fabric and ergonomic fit. Optimized for elite USA college and semi-pro leagues.",
    sizes: ["S", "M", "L", "XL", "XXL"],
    rating: 5.0,
    reviews: 184,
    isProtex: true
  },
  {
    id: 'skt-am-10',
    title: "SKT Gridiron Elite Football Uniform",
    category: "Team Uniforms",
    price: 35.00,
    image_url: "https://res.cloudinary.com/dzt2nrkjr/image/upload/v1770054613/2_811d056b-a34e-49ea-b42f-6595878871c4_800x_kj2kke.jpg",
    description: "Complete American Football uniform kit. Features high-impact spandex panels and 4-way stretch mesh for ultimate on-field dominance.",
    sizes: ["S", "M", "L", "XL", "XXL"],
    rating: 5.0,
    reviews: 420,
    isProtex: true
  },
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
  }
];

export const BLOG_POSTS: BlogPost[] = [
  {
    id: 1,
    title: "The American Uniform Standard",
    summary: "From Friday Night Lights to the Major Diamond, how Salman SKT is redefining team apparel standards in the USA.",
    date: "June 18, 2025",
    image: "https://res.cloudinary.com/dzt2nrkjr/image/upload/v1770054613/2_811d056b-a34e-49ea-b42f-6595878871c4_800x_kj2kke.jpg"
  }
];
