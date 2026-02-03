
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
  // --- AMERICAN UNIFORMS COLLECTION (FOOTBALL & BASEBALL) ($35) ---
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
    id: 'skt-am-2',
    title: "SKT Varsity Legacy Baseball Jersey",
    category: "Team Uniforms",
    price: 35.00,
    image_url: "https://res.cloudinary.com/dzt2nrkjr/image/upload/v1770048123/FD-BASE-VN2-3444-nLxSniE19uaW_alt_3_x1e3hs.png",
    description: "Classic American varsity baseball aesthetic paired with technical studio performance. Breathable mesh panels and reinforced stitching for maximum durability.",
    sizes: ["S", "M", "L", "XL", "XXL"],
    rating: 4.9,
    reviews: 92,
    isProtex: true
  },
  {
    id: 'skt-am-3',
    title: "SKT State Series Baseball Kit",
    category: "Team Uniforms",
    price: 35.00,
    image_url: "https://res.cloudinary.com/dzt2nrkjr/image/upload/v1770048122/iw4bvdxfzz7ak15hcgrm_cqn51z.jpg",
    description: "High-performance baseball kit designed for the intense pace of the diamond. Export-grade materials from Sialkot for the American youth sports market.",
    sizes: ["Y-L", "S", "M", "L", "XL"],
    rating: 4.8,
    reviews: 156,
    isProtex: true
  },
  {
    id: 'skt-am-4',
    title: "SKT Practice Elite Baseball Jersey",
    category: "Team Uniforms",
    price: 35.00,
    image_url: "https://res.cloudinary.com/dzt2nrkjr/image/upload/v1770048125/aHR0cHM6Ly9zdG9yYWdlLmdvb2dsZWFwaXMuY29tL2dhbWVjb2Nrc29ubGluZS1jb20vMjAyNi8wMS9hMDQ5ZmIxNS1ic2JfMDEyM19wcmFjdGljZV9kYXZpc18yNl81OS5qcGc_iy4soz.png",
    description: "Heavy-duty practice jersey built for the daily grind. Features double-knit fabric and stain-resistant treatment. Preferred by top-tier coaching programs.",
    sizes: ["S", "M", "L", "XL", "XXL"],
    rating: 5.0,
    reviews: 78,
    isProtex: true
  },
  {
    id: 'skt-am-5',
    title: "SKT Local League Baseball Jersey",
    category: "Team Uniforms",
    price: 35.00,
    image_url: "https://res.cloudinary.com/dzt2nrkjr/image/upload/v1770054975/250px-Uniforme_local_ialcqx.jpg",
    description: "Traditional local league inspired baseball jersey. Lightweight design with high-quality sublimation for vibrant, long-lasting team colors.",
    sizes: ["S", "M", "L", "XL", "XXL"],
    rating: 4.7,
    reviews: 112,
    isProtex: true
  },
  {
    id: 'skt-am-6',
    title: "SKT Major Edition Baseball Uniform",
    category: "Team Uniforms",
    price: 35.00,
    image_url: "https://res.cloudinary.com/dzt2nrkjr/image/upload/v1770054977/2024_Major_League_Baseball_uniform_controversy__28cropped_29_vbgtfr.jpg",
    description: "Elite 'Major' series baseball uniform. Features the latest in technical textile engineering to ensure peak player performance on every inning.",
    sizes: ["S", "M", "L", "XL", "XXL"],
    rating: 4.9,
    reviews: 215,
    isProtex: true
  },
  {
    id: 'skt-am-7',
    title: "SKT Gridiron Fall Performance Bag",
    category: "Gear & Bags",
    price: 35.00,
    image_url: "https://res.cloudinary.com/dzt2nrkjr/image/upload/v1770054977/new-index-bat-bags-grid-fall-2025-3_igkuhe.jpg",
    description: "Professional grade gear bag for football and baseball equipment. Waterproof base and reinforced compartments for technical studio durability.",
    sizes: ["One Size"],
    rating: 5.0,
    reviews: 45,
    isProtex: true
  },
  {
    id: 'skt-am-8',
    title: "SKT Pro Diamond Performance Jersey",
    category: "Team Uniforms",
    price: 35.00,
    image_url: "https://res.cloudinary.com/dzt2nrkjr/image/upload/v1770054977/Cam_Cannarella_JohnByrumGetty_efpobp.jpg",
    description: "Authentic diamond performance jersey as used by semi-pro athletes. Engineered with laser-ventilation and athletic taper for the American physique.",
    sizes: ["S", "M", "L", "XL", "XXL"],
    rating: 5.0,
    reviews: 310,
    isProtex: true
  },
  {
    id: 'skt-am-9',
    title: "SKT Legacy No.7 Baseball Jersey",
    category: "Team Uniforms",
    price: 35.00,
    image_url: "https://res.cloudinary.com/dzt2nrkjr/image/upload/v1770055149/2026_BASE_LeggettNo7Legacy_FRONT_rkrgpu.webp",
    description: "Iconic legacy series baseball jersey. Features high-definition tackle twill numbering and a heritage technical weave. Export-ready quality.",
    sizes: ["S", "M", "L", "XL", "XXL"],
    rating: 4.9,
    reviews: 64,
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
    id: 'skt-am-11',
    title: "SKT Patriot Series Football Kit",
    category: "Team Uniforms",
    price: 35.00,
    image_url: "https://res.cloudinary.com/dzt2nrkjr/image/upload/v1770054614/American-Football-700-9_vpggpv.jpg",
    description: "USA-inspired professional football kit. Designed for high school and youth programs seeking elite factory-direct manufacturing from Salman SKT.",
    sizes: ["Y-L", "S", "M", "L", "XL", "XXL"],
    rating: 4.8,
    reviews: 132,
    isProtex: true
  },
  {
    id: 'skt-am-12',
    title: "SKT All-American Football Jersey",
    category: "Team Uniforms",
    price: 35.00,
    image_url: "https://res.cloudinary.com/dzt2nrkjr/image/upload/v1770054612/16AMERICANFOOTBALLMODEL_swj02j.jpg",
    description: "Technical All-American football jersey with cowl-sleeve construction and reinforced necklines. The gold standard for contact sports apparel.",
    sizes: ["S", "M", "L", "XL", "XXL"],
    rating: 4.9,
    reviews: 210,
    isProtex: true
  },
  {
    id: 'skt-am-13',
    title: "SKT Core Pro Football Performance Kit",
    category: "Team Uniforms",
    price: 35.00,
    image_url: "https://res.cloudinary.com/dzt2nrkjr/image/upload/v1770056439/image.coreimg_szfvyx.jpg",
    description: "Modern core-performance football kit. Utilizes ultra-breathable technical fabrics to keep players performing at their peak under pressure.",
    sizes: ["S", "M", "L", "XL", "XXL"],
    rating: 4.7,
    reviews: 89,
    isProtex: true
  },
  {
    id: 'skt-am-14',
    title: "SKT Air Force Captain Series Kit",
    category: "Team Uniforms",
    price: 35.00,
    image_url: "https://res.cloudinary.com/dzt2nrkjr/image/upload/v1770056399/Hawaii_AirForce_Web_Captians_f52wrm.webp",
    description: "Captain-grade football uniform set featuring specialized sublimation and a tailored athletic cut. Built for leadership on the gridiron.",
    sizes: ["S", "M", "L", "XL", "XXL"],
    rating: 5.0,
    reviews: 56,
    isProtex: true
  },
  {
    id: 'skt-am-15',
    title: "SKT American Sports Story Jersey",
    category: "Team Uniforms",
    price: 35.00,
    image_url: "https://res.cloudinary.com/dzt2nrkjr/image/upload/v1770056398/240917-american-sports-story-al-0928-5de7fc_xhcoqy.jpg",
    description: "Authentic story-series football jersey. Hand-crafted in Sialkot for the discerning American athlete who values heritage and technical quality.",
    sizes: ["S", "M", "L", "XL", "XXL"],
    rating: 4.8,
    reviews: 42,
    isProtex: true
  },
  {
    id: 'skt-am-16',
    title: "SKT Stadium Series Pro Football Jersey",
    category: "Team Uniforms",
    price: 35.00,
    image_url: "https://res.cloudinary.com/dzt2nrkjr/image/upload/v1770056397/01_08_34_15_gla_103_rec709_g24_20_3840x2160_20240726_0098751-copy-4-copy_lksoe4.jpg",
    description: "Professional stadium-ready football jersey. Features high-density mesh and anti-slip shoulder technology for professional-level grip.",
    sizes: ["S", "M", "L", "XL", "XXL"],
    rating: 5.0,
    reviews: 167,
    isProtex: true
  },
  {
    id: 'skt-am-17',
    title: "SKT Gridiron Vault Archive Jerseys",
    category: "Team Uniforms",
    price: 35.00,
    image_url: "https://res.cloudinary.com/dzt2nrkjr/image/upload/v1770056364/jerseys_j0kxki.jpg",
    description: "Multi-panel technical football jerseys from the SKT archive. Optimized for high-speed contact and extreme durability in USA leagues.",
    sizes: ["S", "M", "L", "XL", "XXL"],
    rating: 4.9,
    reviews: 203,
    isProtex: true
  },
  {
    id: 'skt-am-18',
    title: "SKT Training Field Uniform Set",
    category: "Team Uniforms",
    price: 35.00,
    image_url: "https://res.cloudinary.com/dzt2nrkjr/image/upload/v1770056366/american-football-player-uniform-training-field_23-2150034543_w6cmwh.jpg",
    description: "The definitive football training set. Combines technical studio comfort with rugged factory-direct manufacturing for the American athlete.",
    sizes: ["S", "M", "L", "XL", "XXL"],
    rating: 5.0,
    reviews: 312,
    isProtex: true
  },

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
  // ... rest of the products remain for variety
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
