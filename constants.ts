
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
  // --- NEWEST AMERICAN UNIFORM ADDITIONS ($35) ---
  {
    id: 'skt-am-new-1',
    title: "SKT Gridiron Legacy American Uniform",
    category: "Team Uniforms",
    price: 35.00,
    image_url: "https://res.cloudinary.com/dzt2nrkjr/image/upload/v1770128553/FB_IMG_1753631444486_vgv7it.jpg",
    description: "Professional grade American football uniform. Features high-impact padding pockets, reinforced stitching, and breathable mesh panels. Engineered for the USA league standards.",
    sizes: ["S", "M", "L", "XL", "XXL"],
    rating: 5.0,
    reviews: 124,
    isProtex: true
  },
  {
    id: 'skt-am-new-2',
    title: "SKT Pro-Field American Uniform",
    category: "Team Uniforms",
    price: 35.00,
    image_url: "https://res.cloudinary.com/dzt2nrkjr/image/upload/v1770128553/IMG_20240825_235546_falfi5.jpg",
    description: "Elite field-ready American football kit. Lightweight but extremely durable fabric designed for high-performance maneuvers on the gridiron.",
    sizes: ["S", "M", "L", "XL", "XXL"],
    rating: 4.9,
    reviews: 98,
    isProtex: true
  },
  {
    id: 'skt-am-new-3',
    title: "SKT Varsity American Elite Uniform",
    category: "Team Uniforms",
    price: 35.00,
    image_url: "https://res.cloudinary.com/dzt2nrkjr/image/upload/v1770128671/FB_IMG_1747016784574_kzunjj.jpg",
    description: "Varsity series American football uniform. Featuring premium sublimation and athletic tailoring. Built for top-tier collegiate and high school programs.",
    sizes: ["S", "M", "L", "XL", "XXL"],
    rating: 5.0,
    reviews: 210,
    isProtex: true
  },
  {
    id: 'skt-am-new-4',
    title: "SKT Championship American Uniform",
    category: "Team Uniforms",
    price: 35.00,
    image_url: "https://res.cloudinary.com/dzt2nrkjr/image/upload/v1770128671/FB_IMG_1745329080230_it2zeb.jpg",
    description: "Tournament grade American football apparel. Heavy-duty construction with flexible side panels for maximum mobility during high-stakes games.",
    sizes: ["S", "M", "L", "XL", "XXL"],
    rating: 4.8,
    reviews: 76,
    isProtex: true
  },

  // --- BASKETBALL UNIFORMS: PHASE 2 (PREVIOUSLY POSTED) ---
  {
    id: 'skt-bball-p2-1',
    title: "SKT Championship Series Pro-Fit Uniform",
    category: "Team Uniforms",
    price: 35.00,
    image_url: "https://res.cloudinary.com/dzt2nrkjr/image/upload/v1769959108/r2bTqPDVgvog-1_hgbxbr.jpg",
    description: "Elite Championship Series uniform designed for high-stakes USA tournaments. Features high-definition sublimation and athletic tailoring.",
    sizes: ["S", "M", "L", "XL", "XXL"],
    rating: 5.0,
    reviews: 156,
    isProtex: true
  },
  {
    id: 'skt-bball-p2-2',
    title: "SKT Varsity Legend Basketball Kit",
    category: "Team Uniforms",
    price: 35.00,
    image_url: "https://res.cloudinary.com/dzt2nrkjr/image/upload/v1769959108/189-1_407fdb46-3f2a-4381-8fdd-26b09f0a65cb_mchjhk.jpg",
    description: "Classic Varsity styling meets professional manufacturing. Built for USA high school and collegiate programs.",
    sizes: ["S", "M", "L", "XL", "XXL"],
    rating: 4.9,
    reviews: 82,
    isProtex: true
  },
  {
    id: 'skt-bball-p2-3',
    title: "SKT Pro-Am Performance League Uniform",
    category: "Team Uniforms",
    price: 35.00,
    image_url: "https://res.cloudinary.com/dzt2nrkjr/image/upload/v1769959106/unisex-nike-stephen-curry-black-golden-state-warriors-swingman-badge-player-jersey-city-edition_pi5202000_ff_5202680-898016d5c53d4c7303a4_full_s1hfmj.jpg",
    description: "Professional Grade Swingman quality. Advanced moisture-wicking fabric and heat-pressed graphics. Engineered for the USA Pro-Am circuit.",
    sizes: ["S", "M", "L", "XL", "XXL"],
    rating: 5.0,
    reviews: 310,
    isProtex: true
  },
  {
    id: 'skt-bball-p2-4',
    title: "SKT Stateside Elite Team Gear",
    category: "Team Uniforms",
    price: 35.00,
    image_url: "https://res.cloudinary.com/dzt2nrkjr/image/upload/v1769959077/realistic-basketball-jersey-front-and-back-view-mockup-free-vector_rp66dv.jpg",
    description: "Full kit including performance jersey and shorts. Features 4-way stretch mesh for ultimate freedom.",
    sizes: ["S", "M", "L", "XL", "XXL"],
    rating: 4.8,
    reviews: 44,
    isProtex: true
  },
  {
    id: 'skt-bball-p2-5',
    title: "SKT AAU Tournament Grade Uniform",
    category: "Team Uniforms",
    price: 35.00,
    image_url: "https://res.cloudinary.com/dzt2nrkjr/image/upload/v1769959076/Youth-Basketball-Uniforms-manufacturer-Pakistan_ur1l7x.jpg",
    description: "The preferred choice for USA Youth and AAU programs. Lightweight, ultra-breathable.",
    sizes: ["Y-S", "Y-M", "Y-L", "S", "M"],
    rating: 5.0,
    reviews: 215,
    isProtex: true
  },
  {
    id: 'skt-bball-p2-6',
    title: "SKT Challenger Series Reversible",
    category: "Team Uniforms",
    price: 35.00,
    image_url: "https://res.cloudinary.com/dzt2nrkjr/image/upload/v1769959075/ZWBK-700-F_vizasi.jpg",
    description: "High-tech reversible kit for practice and competition. Laser-cut ventilation.",
    sizes: ["S", "M", "L", "XL", "XXL"],
    rating: 4.7,
    reviews: 63,
    isProtex: true
  },
  {
    id: 'skt-bball-p2-7',
    title: "SKT Metro City League Jersey",
    category: "Team Uniforms",
    price: 35.00,
    image_url: "https://res.cloudinary.com/dzt2nrkjr/image/upload/v1769959050/188-1_59d0b9a1-c567-4ad9-ad5f-2ba062b470d6_pao8pn.jpg",
    description: "Street-inspired urban basketball gear. High-density embroidery and pro-grade materials.",
    sizes: ["S", "M", "L", "XL", "XXL"],
    rating: 4.9,
    reviews: 98,
    isProtex: true
  },
  {
    id: 'skt-bball-p2-8',
    title: "SKT Custom Draft Pro Uniform",
    category: "Team Uniforms",
    price: 35.00,
    image_url: "https://res.cloudinary.com/dzt2nrkjr/image/upload/v1769959049/Custom_Adult_Basketball_Uniforms_664264dfe7ddc_jqmbze.jpg",
    description: "Advanced custom uniform for professional league drafts. Ergonomic cut.",
    sizes: ["S", "M", "L", "XL", "XXL"],
    rating: 5.0,
    reviews: 51,
    isProtex: true
  },
  {
    id: 'skt-bball-p2-9',
    title: "SKT Retro Archive Court Jersey",
    category: "Team Uniforms",
    price: 35.00,
    image_url: "https://res.cloudinary.com/dzt2nrkjr/image/upload/v1769959047/s-l1200_szuyx4.jpg",
    description: "Nostalgic styling paired with modern technical performance. USA basketball tribute.",
    sizes: ["S", "M", "L", "XL", "XXL"],
    rating: 4.8,
    reviews: 124,
    isProtex: true
  },
  {
    id: 'skt-bball-p2-10',
    title: "SKT Patriot Elite USA Uniform",
    category: "Team Uniforms",
    price: 35.00,
    image_url: "https://res.cloudinary.com/dzt2nrkjr/image/upload/v1769959046/usa-basketball-uniforms_lmxidn.jpg",
    description: "USA Team inspired colors and technical specifications. Engineered for peak performance.",
    sizes: ["S", "M", "L", "XL", "XXL"],
    rating: 5.0,
    reviews: 187,
    isProtex: true
  },
  {
    id: 'skt-bball-p2-11',
    title: "SKT Baseline High-Performance Kit",
    category: "Team Uniforms",
    price: 35.00,
    image_url: "https://res.cloudinary.com/dzt2nrkjr/image/upload/v1769959010/03-1_rok8gj.jpg",
    description: "Focused on core performance metrics. Lightweight mesh and flexible side-panels.",
    sizes: ["S", "M", "L", "XL", "XXL"],
    rating: 4.6,
    reviews: 39,
    isProtex: true
  },
  {
    id: 'skt-bball-p2-12',
    title: "SKT Collegiate Maroon Elite Uniform",
    category: "Team Uniforms",
    price: 35.00,
    image_url: "https://res.cloudinary.com/dzt2nrkjr/image/upload/v1769959009/MaroonBasketballUniform_o6zycg.jpg",
    description: "Classic maroon and white varsity colorway. Features heavy-duty tackle twill.",
    sizes: ["S", "M", "L", "XL", "XXL"],
    rating: 4.9,
    reviews: 77,
    isProtex: true
  },
  {
    id: 'skt-bball-p2-13',
    title: "SKT Platinum Baseline Jersey",
    category: "Team Uniforms",
    price: 35.00,
    image_url: "https://res.cloudinary.com/dzt2nrkjr/image/upload/v1769959008/1-38_ldi0e1.jpg",
    description: "Premium baseline jersey for elite athletes. Features advanced technical mesh.",
    sizes: ["S", "M", "L", "XL", "XXL"],
    rating: 5.0,
    reviews: 112,
    isProtex: true
  },
  {
    id: 'skt-bball-p2-14',
    title: "SKT Full-Court Press Pro Kit",
    category: "Team Uniforms",
    price: 35.00,
    image_url: "https://res.cloudinary.com/dzt2nrkjr/image/upload/v1769959008/1-42_u5zayn.jpg",
    description: "Designed for the aggressive defender. High-tension fabric and reinforced seams.",
    sizes: ["S", "M", "L", "XL", "XXL"],
    rating: 4.8,
    reviews: 93,
    isProtex: true
  },
  {
    id: 'skt-bball-p2-15',
    title: "SKT Reversible Scrimmage Pro",
    category: "Team Uniforms",
    price: 35.00,
    image_url: "https://res.cloudinary.com/dzt2nrkjr/image/upload/v1769959007/Wholesale-Blank-Basketball-Uniforms-Youth-Unisex-Reversible-Basketball-Jersey_ljzsb0.webp",
    description: "The ultimate dual-sided jersey for USA basketball training programs.",
    sizes: ["S", "M", "L", "XL", "XXL"],
    rating: 4.7,
    reviews: 41,
    isProtex: true
  },
  {
    id: 'skt-bball-p2-16',
    title: "SKT National Pride Team Uniform",
    category: "Team Uniforms",
    price: 35.00,
    image_url: "https://res.cloudinary.com/dzt2nrkjr/image/upload/v1769958927/Custom_Adult_Basketball_Uniforms_664264dfe7ddc_zhcmjr.jpg",
    description: "Bold styling and performance focus for regional teams. High-density sublimation.",
    sizes: ["S", "M", "L", "XL", "XXL"],
    rating: 5.0,
    reviews: 104,
    isProtex: true
  },
  {
    id: 'skt-bball-p2-17',
    title: "SKT Varsity Prime Team Set",
    category: "Team Uniforms",
    price: 35.00,
    image_url: "https://res.cloudinary.com/dzt2nrkjr/image/upload/v1769958927/183-1_a1023030-c00d-43ad-8f5c-1541d6348c01_bqxydt.jpg",
    description: "Traditional varsity aesthetics with modern technical fabric. USA league standards.",
    sizes: ["S", "M", "L", "XL", "XXL"],
    rating: 4.9,
    reviews: 66,
    isProtex: true
  },
  {
    id: 'skt-bball-p2-18',
    title: "SKT Urban Street Court Jersey",
    category: "Team Uniforms",
    price: 35.00,
    image_url: "https://res.cloudinary.com/dzt2nrkjr/image/upload/v1769958927/71uA4UbhXvL._AC_UY1000__rhhrri.jpg",
    description: "Fashion-forward basketball jersey for urban summer leagues and high-intensity practice.",
    sizes: ["S", "M", "L", "XL", "XXL"],
    rating: 4.8,
    reviews: 119,
    isProtex: true
  },
  {
    id: 'skt-bball-p2-19',
    title: "SKT Elite Pro Suit Uniform",
    category: "Team Uniforms",
    price: 35.00,
    image_url: "https://res.cloudinary.com/dzt2nrkjr/image/upload/v1769958928/BSuit0040_900x_g9jbkf.jpg",
    description: "Full uniform set featuring sleek modern design and advanced performance synthetic materials.",
    sizes: ["S", "M", "L", "XL", "XXL"],
    rating: 5.0,
    reviews: 55,
    isProtex: true
  },
  {
    id: 'skt-bball-p2-20',
    title: "SKT Pro-Am Division Jersey",
    category: "Team Uniforms",
    price: 35.00,
    image_url: "https://res.cloudinary.com/dzt2nrkjr/image/upload/v1769958927/mens_bball14_vhu6hj.jpg",
    description: "The choice for elite players in the USA Pro-Am division. Engineered for explosive movement.",
    sizes: ["S", "M", "L", "XL", "XXL"],
    rating: 5.0,
    reviews: 89,
    isProtex: true
  },
  {
    id: 'skt-bball-p2-21',
    title: "SKT Studio Baseline Uniform",
    category: "Team Uniforms",
    price: 35.00,
    image_url: "https://res.cloudinary.com/dzt2nrkjr/image/upload/v1769959108/r2bTqPDVgvog-1_hgbxbr.jpg",
    description: "Technical baseline uniform set. High-performance manufacturing standards.",
    sizes: ["S", "M", "L", "XL", "XXL"],
    rating: 4.9,
    reviews: 31,
    isProtex: true
  },

  // --- PREVIOUS STREETWEAR & STUDIO GEAR (PRESERVED) ---
  {
    id: 'skt-signature-hoodie-v3',
    title: "SKT Signature Archive Hoodie",
    category: "Active & Casual",
    price: 35.00,
    image_url: "https://res.cloudinary.com/dc0ytviey/image/upload/v1769946031/received_636377795397638_c5nabl.jpg",
    description: "High-density technical studio hoodie. Featuring a custom heavyweight cotton-poly blend and precision-engineered fit.",
    sizes: ["S", "M", "L", "XL", "XXL"],
    rating: 5.0,
    reviews: 42,
    isProtex: true
  },
  {
    id: 'skt-am-1',
    title: "SKT Diamond Elite Pro Baseball Uniform",
    category: "Team Uniforms",
    price: 35.00,
    image_url: "https://res.cloudinary.com/dzt2nrkjr/image/upload/v1770048123/FD-163_FD-5060_u9c4nk.png",
    description: "Professional grade baseball uniform featuring high-tension moisture-wicking fabric.",
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
    description: "Complete American Football uniform kit. Features high-impact spandex panels.",
    sizes: ["S", "M", "L", "XL", "XXL"],
    rating: 5.0,
    reviews: 420,
    isProtex: true
  },
  {
    id: 'skt-bball-1',
    title: "SKT Dynasty Pro-Swingman Jersey",
    category: "Team Uniforms",
    price: 35.00,
    image_url: "https://res.cloudinary.com/dzt2nrkjr/image/upload/v1769959106/unisex-nike-stephen-curry-black-golden-state-warriors-swingman-badge-player-jersey-city-edition_pi5202000_ff_5202680-898016d5c53d4c7303a4_full_s1hfmj.jpg",
    description: "Elite swingman quality basketball jersey. USA professional standards.",
    sizes: ["S", "M", "L", "XL", "XXL"],
    rating: 5.0,
    reviews: 245,
    isProtex: true
  },
  {
    id: 'skt-premium-hoodie-v2',
    title: "Premium Studio Hoodie",
    category: "Active & Casual",
    price: 35.00,
    image_url: "https://res.cloudinary.com/dc0ytviey/image/upload/v1769946025/received_534683599421218_fvdmuq.jpg",
    description: "New season technical hoodie. Featuring factory-grade reinforced stitching.",
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
    description: "Industrial-grade technical hoodie featuring a performance-optimized blend.",
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
    description: "Premium technical 'Stick Jacket' from the Price & Depression collection.",
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
    description: "Original technical footwear. High-performance design.",
    sizes: ["7", "8", "9", "10", "11", "12"],
    rating: 5.0,
    reviews: 48,
    isProtex: true
  }
];

export const BLOG_POSTS: BlogPost[] = [
  {
    id: 1,
    title: "The All-American Basketball League Standard",
    summary: "How Salman SKT's factory-direct model is providing tournament-grade uniforms to pro-am and collegiate leagues across the USA.",
    date: "June 25, 2025",
    image: "https://res.cloudinary.com/dzt2nrkjr/image/upload/v1769959106/unisex-nike-stephen-curry-black-golden-state-warriors-swingman-badge-player-jersey-city-edition_pi5202000_ff_5202680-898016d5c53d4c7303a4_full_s1hfmj.jpg"
  }
];
