
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
    id: 'skt-bball-2',
    title: "SKT Patriot USA Elite Uniform",
    category: "Team Uniforms",
    price: 35.00,
    image_url: "https://res.cloudinary.com/dzt2nrkjr/image/upload/v1769959046/usa-basketball-uniforms_lmxidn.jpg",
    description: "National team inspired performance kit. Includes sublimated jersey and matching shorts. Lightweight, breathable, and designed for the most intense court sessions.",
    sizes: ["Y-L", "S", "M", "L", "XL", "XXL"],
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
    description: "Classic maroon and white collegiate style basketball uniform. Heavy-duty construction with flexible side panels for maximum mobility. Ideal for high school and semi-pro teams.",
    sizes: ["S", "M", "L", "XL", "XXL"],
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
    description: "Professional grade youth basketball uniforms. Sourced from the best materials in Sialkot, providing comfort and durability for rising stars in the USA leagues.",
    sizes: ["Y-S", "Y-M", "Y-L", "S", "M"],
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
    description: "Dual-layer reversible basketball jersey for practice and scrimmages. High-grade mesh for superior ventilation. A staple for every basketball program in the States.",
    sizes: ["S", "M", "L", "XL", "XXL"],
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
    description: "Technical Z-Series basketball uniform featuring laser-cut ventilation and reinforced stitching. Designed for elite athletes seeking the ultimate competitive edge.",
    sizes: ["S", "M", "L", "XL", "XXL"],
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
    description: "State-of-the-art performance jersey with athletic tailoring. Features 4-way stretch fabric that moves with your body. Export-ready from Salman SKT.",
    sizes: ["S", "M", "L", "XL", "XXL"],
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
    description: "Traditional varsity styling meets modern tech. This uniform set is built to withstand the rigors of a full season while keeping players cool and dry.",
    sizes: ["S", "M", "L", "XL", "XXL"],
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
    description: "Street-inspired basketball jersey for urban leagues. Features bold graphics and a relaxed fit for both on-court action and off-court style.",
    sizes: ["S", "M", "L", "XL", "XXL"],
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
    description: "The next generation of basketball apparel. Sleek, minimal design with high-performance synthetic blends. Preferred by modern pro-am players.",
    sizes: ["S", "M", "L", "XL", "XXL"],
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
    description: "Timeless basketball uniform design featuring premium tackle-twill numbering and lettering options. Hand-crafted with precision in our Sialkot studio.",
    sizes: ["S", "M", "L", "XL", "XXL"],
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
    description: "Custom-grade league uniform with breathable mesh panels and moisture-control technology. Optimized for high-speed gameplay.",
    sizes: ["S", "M", "L", "XL", "XXL"],
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
    description: "Aggressive styling and performance features define the Full-Court Press uniform. Engineered for durability and freedom of movement.",
    sizes: ["S", "M", "L", "XL", "XXL"],
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
    description: "Essential basketball jersey for every athlete. Lightweight, airy, and featuring the signature SKT technical fit that players love across the USA.",
    sizes: ["S", "M", "L", "XL", "XXL"],
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
    description: "Advanced mesh-based uniform set providing ultimate airflow. Perfect for warm-weather outdoor courts or intense indoor play.",
    sizes: ["S", "M", "L", "XL", "XXL"],
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
    description: "Nostalgic basketball jersey with a modern performance twist. Celebrates the golden era of basketball with authentic SKT manufacturing quality.",
    sizes: ["S", "M", "L", "XL", "XXL"],
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
    description: "Premium custom uniform set for organized leagues. High-density embroidery and sublimated patterns ensure long-lasting style and quality.",
    sizes: ["S", "M", "L", "XL", "XXL"],
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
    description: "Urban varsity aesthetics paired with pro-grade materials. This uniform is a favorite for metropolitan city leagues across the country.",
    sizes: ["S", "M", "L", "XL", "XXL"],
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
    description: "Sleek, vector-designed uniform featuring aerodynamic fit and high-tech moisture management. The choice for semi-pro teams in the USA.",
    sizes: ["S", "M", "L", "XL", "XXL"],
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
    description: "The ultimate performance jersey for high-stakes games. Lightweight, sweat-resistant, and featuring an ergonomic cut for peak athleticism.",
    sizes: ["S", "M", "L", "XL", "XXL"],
    rating: 5.0,
    reviews: 104,
    isProtex: true
  },

  // --- CORE COLLECTION ---
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
    id: 'skt-pd-stick-jacket-2',
    title: "Price & Depression Stick Jacket (Archive II)",
    category: "Active & Casual",
    price: 50.00,
    image_url: "https://res.cloudinary.com/dc0ytviey/image/upload/v1769747602/IMG_20241105_202206_389_eugddm.jpg",
    description: "Technical Stick Jacket featuring industrial-grade panelling and reinforced seams. Designed for the high-end USA streetwear market by Salman SKT.",
    sizes: ["S", "M", "L", "XL", "XXL"],
    rating: 4.9,
    reviews: 89,
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
    title: "Sialkot to USA: The Basketball Revolution",
    summary: "How Salman SKT's factory-direct model is providing pro-grade uniforms to youth leagues across the United States.",
    date: "June 12, 2025",
    image: "https://res.cloudinary.com/dzt2nrkjr/image/upload/v1769959046/usa-basketball-uniforms_lmxidn.jpg"
  }
];
