
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
  // --- NEWEST ADDITIONS ---
  {
    id: 'skt-signature-hoodie-v3',
    title: "SKT Signature Archive Hoodie",
    category: "Active & Casual",
    price: 35.00,
    image_url: "https://res.cloudinary.com/dc0ytviey/image/upload/v1769946031/received_636377795397638_c5nabl.jpg",
    description: "High-density technical studio hoodie. Featuring a custom heavyweight cotton-poly blend and precision-engineered fit. A pinnacle of Sialkot's manufacturing excellence.",
    sizes: ["S", "M", "L", "XL", "XXL"],
    rating: 5.0,
    reviews: 42,
    isProtex: true
  },

  // --- AMERICAN FIELD SERIES ---
  {
    id: 'skt-am-1',
    title: "SKT Diamond Elite Pro Baseball Uniform",
    category: "Team Uniforms",
    price: 35.00,
    image_url: "https://res.cloudinary.com/dzt2nrkjr/image/upload/v1770048123/FD-163_FD-5060_u9c4nk.png",
    description: "Professional grade baseball uniform featuring high-tension moisture-wicking fabric. Optimized for elite USA college and semi-pro leagues.",
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
    description: "Complete American Football uniform kit. Features high-impact spandex panels and 4-way stretch mesh for dominance on the field.",
    sizes: ["S", "M", "L", "XL", "XXL"],
    rating: 5.0,
    reviews: 420,
    isProtex: true
  },

  // --- BASKETBALL ELITE COLLECTION (RESTORATION 1-20) ---
  {
    id: 'skt-bball-1',
    title: "SKT Dynasty Pro-Swingman Jersey",
    category: "Team Uniforms",
    price: 35.00,
    image_url: "https://res.cloudinary.com/dzt2nrkjr/image/upload/v1769959106/unisex-nike-stephen-curry-black-golden-state-warriors-swingman-badge-player-jersey-city-edition_pi5202000_ff_5202680-898016d5c53d4c7303a4_full_s1hfmj.jpg",
    description: "Elite swingman quality basketball jersey. Features advanced moisture-wicking fabric and heat-pressed graphics for USA professional standards.",
    sizes: ["S", "M", "L", "XL", "XXL"],
    rating: 5.0,
    reviews: 245,
    isProtex: true
  },
  {
    id: 'skt-bball-2',
    title: "SKT Patriot USA Elite Uniform",
    category: "Team Uniforms",
    price: 35.00,
    image_url: "https://res.cloudinary.com/dzt2nrkjr/image/upload/v1769959046/usa-basketball-uniforms_lmxidn.jpg",
    description: "National team inspired performance kit. Includes sublimated jersey and matching shorts for intense court sessions.",
    sizes: ["S", "M", "L", "XL"],
    rating: 4.9,
    reviews: 112,
    isProtex: true
  },
  {
    id: 'skt-bball-3',
    title: "SKT Maroon Dynasty Team Kit",
    category: "Team Uniforms",
    price: 35.00,
    image_url: "https://res.cloudinary.com/dzt2nrkjr/image/upload/v1769959009/MaroonBasketballUniform_o6zycg.jpg",
    description: "Classic maroon and white collegiate style. Heavy-duty construction for high school and semi-pro teams.",
    sizes: ["S", "M", "L", "XL"],
    rating: 4.8,
    reviews: 89,
    isProtex: true
  },
  {
    id: 'skt-bball-4',
    title: "SKT Youth Elite Pro Basketball Kit",
    category: "Team Uniforms",
    price: 35.00,
    image_url: "https://res.cloudinary.com/dzt2nrkjr/image/upload/v1769959076/Youth-Basketball-Uniforms-manufacturer-Pakistan_ur1l7x.jpg",
    description: "Professional grade youth basketball uniforms. Comfort and durability for rising stars in USA leagues.",
    sizes: ["Y-S", "Y-M", "Y-L", "S"],
    rating: 5.0,
    reviews: 320,
    isProtex: true
  },
  {
    id: 'skt-bball-5',
    title: "SKT Reversible Elite Scrimmage Jersey",
    category: "Team Uniforms",
    price: 35.00,
    image_url: "https://res.cloudinary.com/dzt2nrkjr/image/upload/v1769959007/Wholesale-Blank-Basketball-Uniforms-Youth-Unisex-Reversible-Basketball-Jersey_ljzsb0.webp",
    description: "Dual-layer reversible jersey for practice. High-grade mesh for superior ventilation.",
    sizes: ["S", "M", "L", "XL"],
    rating: 4.7,
    reviews: 56,
    isProtex: true
  },
  {
    id: 'skt-bball-6',
    title: "SKT Z-Series Pro Court Uniform",
    category: "Team Uniforms",
    price: 35.00,
    image_url: "https://res.cloudinary.com/dzt2nrkjr/image/upload/v1769959075/ZWBK-700-F_vizasi.jpg",
    description: "Technical Z-Series basketball uniform featuring laser-cut ventilation and reinforced stitching.",
    sizes: ["S", "M", "L", "XL"],
    rating: 4.9,
    reviews: 74,
    isProtex: true
  },
  {
    id: 'skt-bball-7',
    title: "SKT Modern League Performance Jersey",
    category: "Team Uniforms",
    price: 35.00,
    image_url: "https://res.cloudinary.com/dzt2nrkjr/image/upload/v1769959108/r2bTqPDVgvog-1_hgbxbr.jpg",
    description: "State-of-the-art performance jersey with athletic tailoring. Features 4-way stretch fabric.",
    sizes: ["S", "M", "L", "XL"],
    rating: 5.0,
    reviews: 132,
    isProtex: true
  },
  {
    id: 'skt-bball-8',
    title: "SKT Varsity Prime Uniform Set",
    category: "Team Uniforms",
    price: 35.00,
    image_url: "https://res.cloudinary.com/dzt2nrkjr/image/upload/v1769959108/189-1_407fdb46-3f2a-4381-8fdd-26b09f0a65cb_mchjhk.jpg",
    description: "Traditional varsity styling meets modern tech. Built to withstand a full high-stakes season.",
    sizes: ["S", "M", "L", "XL"],
    rating: 4.8,
    reviews: 94,
    isProtex: true
  },
  {
    id: 'skt-bball-9',
    title: "SKT Urban Court Elite Jersey",
    category: "Team Uniforms",
    price: 35.00,
    image_url: "https://res.cloudinary.com/dzt2nrkjr/image/upload/v1769958927/71uA4UbhXvL._AC_UY1000__rhhrri.jpg",
    description: "Street-inspired basketball jersey for urban leagues. Bold graphics and relaxed fit.",
    sizes: ["S", "M", "L", "XL"],
    rating: 4.9,
    reviews: 156,
    isProtex: true
  },
  {
    id: 'skt-bball-10',
    title: "SKT Modern Pro Basketball Suit",
    category: "Team Uniforms",
    price: 35.00,
    image_url: "https://res.cloudinary.com/dzt2nrkjr/image/upload/v1769958928/BSuit0040_900x_g9jbkf.jpg",
    description: "Next-gen basketball apparel. Sleek, minimal design with high-performance synthetic blends.",
    sizes: ["S", "M", "L", "XL"],
    rating: 5.0,
    reviews: 42,
    isProtex: true
  },
  {
    id: 'skt-bball-11',
    title: "SKT Classic Varsity Basketball Kit",
    category: "Team Uniforms",
    price: 35.00,
    image_url: "https://res.cloudinary.com/dzt2nrkjr/image/upload/v1769958927/183-1_a1023030-c00d-43ad-8f5c-1541d6348c01_bqxydt.jpg",
    description: "Timeless design featuring premium tackle-twill options. Hand-crafted in Sialkot.",
    sizes: ["S", "M", "L", "XL"],
    rating: 4.7,
    reviews: 118,
    isProtex: true
  },
  {
    id: 'skt-bball-12',
    title: "SKT Prime League Basketball Uniform",
    category: "Team Uniforms",
    price: 35.00,
    image_url: "https://res.cloudinary.com/dzt2nrkjr/image/upload/v1769958927/Custom_Adult_Basketball_Uniforms_664264dfe7ddc_zhcmjr.jpg",
    description: "Custom-grade league uniform with breathable mesh panels and moisture-control tech.",
    sizes: ["S", "M", "L", "XL"],
    rating: 4.9,
    reviews: 67,
    isProtex: true
  },
  {
    id: 'skt-bball-13',
    title: "SKT Full-Court Press Uniform",
    category: "Team Uniforms",
    price: 35.00,
    image_url: "https://res.cloudinary.com/dzt2nrkjr/image/upload/v1769959008/1-42_u5zayn.jpg",
    description: "Aggressive styling and performance features for freedom of movement.",
    sizes: ["S", "M", "L", "XL"],
    rating: 4.8,
    reviews: 83,
    isProtex: true
  },
  {
    id: 'skt-bball-14',
    title: "SKT Baseline Pro Basketball Jersey",
    category: "Team Uniforms",
    price: 35.00,
    image_url: "https://res.cloudinary.com/dzt2nrkjr/image/upload/v1769959008/1-38_ldi0e1.jpg",
    description: "Essential basketball jersey. Lightweight and airy with signature technical fit.",
    sizes: ["S", "M", "L", "XL"],
    rating: 4.9,
    reviews: 145,
    isProtex: true
  },
  {
    id: 'skt-bball-15',
    title: "SKT High-Performance Mesh Kit",
    category: "Team Uniforms",
    price: 35.00,
    image_url: "https://res.cloudinary.com/dzt2nrkjr/image/upload/v1769959010/03-1_rok8gj.jpg",
    description: "Advanced mesh-based uniform set providing ultimate airflow for intense play.",
    sizes: ["S", "M", "L", "XL"],
    rating: 4.6,
    reviews: 38,
    isProtex: true
  },
  {
    id: 'skt-bball-16',
    title: "SKT Retro Archive Jersey",
    category: "Team Uniforms",
    price: 35.00,
    image_url: "https://res.cloudinary.com/dzt2nrkjr/image/upload/v1769959047/s-l1200_szuyx4.jpg",
    description: "Nostalgic basketball jersey with a modern performance twist. Golden era aesthetics.",
    sizes: ["S", "M", "L", "XL"],
    rating: 5.0,
    reviews: 91,
    isProtex: true
  },
  {
    id: 'skt-bball-17',
    title: "SKT Custom League Pro Uniform",
    category: "Team Uniforms",
    price: 35.00,
    image_url: "https://res.cloudinary.com/dzt2nrkjr/image/upload/v1769959049/Custom_Adult_Basketball_Uniforms_664264dfe7ddc_jqmbze.jpg",
    description: "Premium custom uniform set for organized leagues. High-density embroidery.",
    sizes: ["S", "M", "L", "XL"],
    rating: 4.9,
    reviews: 52,
    isProtex: true
  },
  {
    id: 'skt-bball-18',
    title: "SKT Metro Varsity Uniform",
    category: "Team Uniforms",
    price: 35.00,
    image_url: "https://res.cloudinary.com/dzt2nrkjr/image/upload/v1769959050/188-1_59d0b9a1-c567-4ad9-ad5f-2ba062b470d6_pao8pn.jpg",
    description: "Urban varsity aesthetics favored by metropolitan city leagues across the USA.",
    sizes: ["S", "M", "L", "XL"],
    rating: 4.8,
    reviews: 76,
    isProtex: true
  },
  {
    id: 'skt-bball-19',
    title: "SKT Studio Vector Performance Set",
    category: "Team Uniforms",
    price: 35.00,
    image_url: "https://res.cloudinary.com/dzt2nrkjr/image/upload/v1769959077/realistic-basketball-jersey-front-and-back-view-mockup-free-vector_rp66dv.jpg",
    description: "Aerodynamic fit and high-tech moisture management for semi-pro teams.",
    sizes: ["S", "M", "L", "XL"],
    rating: 4.7,
    reviews: 29,
    isProtex: true
  },
  {
    id: 'skt-bball-20',
    title: "SKT Pro-League Performance Jersey",
    category: "Team Uniforms",
    price: 35.00,
    image_url: "https://res.cloudinary.com/dzt2nrkjr/image/upload/v1769958927/mens_bball14_vhu6hj.jpg",
    description: "The ultimate performance jersey for high-stakes games. Sweat-resistant ergonomic cut.",
    sizes: ["S", "M", "L", "XL"],
    rating: 5.0,
    reviews: 104,
    isProtex: true
  },

  // --- STREETWEAR & STUDIO GEAR ---
  {
    id: 'skt-premium-hoodie-v2',
    title: "Premium Studio Hoodie",
    category: "Active & Casual",
    price: 35.00,
    image_url: "https://res.cloudinary.com/dc0ytviey/image/upload/v1769946025/received_534683599421218_fvdmuq.jpg",
    description: "New season technical hoodie. Featuring factory-grade reinforced stitching and premium blend.",
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
    description: "Industrial-grade technical hoodie featuring a performance-optimized blend and motion aesthetics.",
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
    description: "Premium technical 'Stick Jacket' from the Price & Depression collection. Weather-resistant utility.",
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
    description: "Original technical footwear. High-performance design optimized for technical apparel synergy.",
    sizes: ["7", "8", "9", "10", "11", "12"],
    rating: 5.0,
    reviews: 48,
    isProtex: true
  }
];

export const BLOG_POSTS: BlogPost[] = [
  {
    id: 1,
    title: "Sialkot to USA: The Apparel Revolution",
    summary: "How Salman SKT is redefining team sports and streetwear through a factory-direct global model.",
    date: "June 20, 2025",
    image: "https://res.cloudinary.com/dzt2nrkjr/image/upload/v1769959046/usa-basketball-uniforms_lmxidn.jpg"
  }
];
