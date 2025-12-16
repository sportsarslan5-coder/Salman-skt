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
  search: { en: 'Search sneakers...', ur: 'جوتے تلاش کریں...' },
  men: { en: 'Men', ur: 'مرد' },
  women: { en: 'Women', ur: 'خواتین' },
  kids: { en: 'Kids', ur: 'بچے' },
  buyNow: { en: 'Shop Best Sellers', ur: 'سب سے زیادہ فروخت ہونے والے خریدیں' },
  heroTitle: { en: 'America\'s Favorite Kicks', ur: 'امریکہ کے پسندیدہ جوتے' },
  heroSubtitle: { en: 'Top trending styles. Iconic looks. Unbeatable prices ($50 - $100).', ur: 'سرفہرست رجحان ساز انداز۔ مشہور نظر۔ ناقابل شکست قیمتیں ($50 - $100)۔' },
  dealOfTheDay: { en: 'Top Best Sellers', ur: 'ٹاپ بہترین فروخت کنندگان' },
  addToCart: { en: 'Add to Cart', ur: 'ٹوکری میں شامل کریں' },
  reviews: { en: 'Customer Reviews', ur: 'کسٹمر کے جائزے' },
  emptyCart: { en: 'Your cart is empty', ur: 'آپ کی ٹوکری خالی ہے' },
  total: { en: 'Total', ur: 'کل' },
  placeOrder: { en: 'Place Order on WhatsApp', ur: 'واٹس ایپ پر آرڈر کریں' },
  contactUs: { en: 'Contact Us', ur: 'ہم سے رابطہ کریں' },
  sendMessage: { en: 'Send Message', ur: 'پیغام بھیجیں' },
  aiStylist: { en: 'AI Sneaker Expert', ur: 'AI جوتوں کا ماہر' },
  stylistIntro: { en: 'Hi! Looking for running shoes or casual kicks? I can help.', ur: 'ہائے! کیا آپ دوڑنے والے جوتے یا آرام دہ جوتے تلاش کر رہے ہیں؟ میں مدد کر سکتا ہوں۔' },
  typing: { en: 'Expert is typing...', ur: 'ماہر لکھ رہا ہے...' },
  footerText: { en: '© 2024 Salman SKT. All rights reserved.', ur: '© 2024 سلمان سیالکوٹ۔ جملہ حقوق محفوظ ہیں۔' },
  subscribe: { en: 'Subscribe', ur: 'سبسکرائب' },
  smartPricing: { en: 'Smart Pricing', ur: 'اسمارٹ قیمت' },
};

export const PRODUCTS: Product[] = [
  // --- NEW ADDITION ---
  {
    id: 201,
    name: "MrBeast Signature Blue Hoodie",
    category: "Men",
    priceUSD: 30.00,
    image: "https://images.unsplash.com/photo-1578768079052-aa76e52ff62e?w=800&q=80",
    description: "From the Beast Philanthropy Collection. Premium cotton blend blue hoodie featuring the iconic panther logo. 100% of profits go to charity. Soft fleece lining for maximum comfort.",
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    rating: 5.0,
    reviews: 50000
  },
  // --- NEW PROTEX SERIES (PREMIUM - Capped at $150) ---
  {
    id: 101,
    name: "ProTex Titan Elite V1",
    category: "Men",
    priceUSD: 145.00,
    image: "https://images.unsplash.com/photo-1600269452121-4f2416e55c28?w=800&q=80",
    description: "The flagship of the ProTex line. Available in Onyx Black & Gold. Engineered with aerospace-grade materials for maximum durability and explosive energy return on the court.",
    sizes: ["US 8", "US 9", "US 10", "US 11", "US 12", "US 13"],
    rating: 5.0,
    reviews: 2100
  },
  {
    id: 102,
    name: "ProTex Carbon X-Speed",
    category: "Men",
    priceUSD: 148.00,
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80",
    description: "Features a full-length carbon fiber plate for elite running performance. Comes in Racing Red & White. The lightest shoe in our collection, designed for marathon winners.",
    sizes: ["US 8", "US 9", "US 10", "US 11"],
    rating: 4.9,
    reviews: 1450
  },
  {
    id: 103,
    name: "ProTex Future High-Top",
    category: "Men",
    priceUSD: 149.00,
    image: "https://images.unsplash.com/photo-1556906781-9a412961d289?w=800&q=80",
    description: "Limited Edition. A futuristic silhouette with self-adapting fit technology. Available in Cyber Silver & Neon Blue. Premium leather and tech-mesh construction.",
    sizes: ["US 7", "US 8", "US 9", "US 10", "US 11", "US 12"],
    rating: 5.0,
    reviews: 3200
  },
  {
    id: 104,
    name: "ProTex Stealth Ops",
    category: "Men",
    priceUSD: 135.00,
    image: "https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=800&q=80",
    description: "All-black tactical street wear with Graphite Grey accents. Waterproof GORE-TEX lining with rugged grip for any urban environment.",
    sizes: ["US 8", "US 9", "US 10", "US 11", "US 12"],
    rating: 4.8,
    reviews: 980
  },
  {
    id: 105,
    name: "ProTex Gravity Defier",
    category: "Women",
    priceUSD: 135.00,
    image: "https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=800&q=80",
    description: "Maximum cushioning technology. Available in Royal Purple & Teal. Makes you feel like you're walking on clouds. Bold colors, bold performance.",
    sizes: ["US 6", "US 7", "US 8", "US 9"],
    rating: 4.9,
    reviews: 1120
  },
  {
    id: 106,
    name: "ProTex Velocity Max",
    category: "Men",
    priceUSD: 125.00,
    image: "https://images.unsplash.com/photo-1605348532760-6753d2c43329?w=800&q=80",
    description: "High-impact basketball sneakers with superior ankle support and ProTex Grip technology.",
    sizes: ["US 8", "US 9", "US 10", "US 11", "US 12", "US 13"],
    rating: 4.9,
    reviews: 890
  },
  // --- END NEW PROTEX SERIES ---

  {
    id: 1,
    name: "Urban Force One",
    category: "Men",
    priceUSD: 90.00,
    image: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=800&q=80",
    description: "The #1 street style staple in the USA. Crisp white leather upper with a chunky sole. Clean, classic, and matches every outfit.",
    sizes: ["US 8", "US 9", "US 10", "US 11", "US 12"],
    rating: 5.0,
    reviews: 1250
  },
  {
    id: 2,
    name: "Classic Canvas High",
    category: "Women",
    priceUSD: 60.00,
    image: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=800&q=80",
    description: "The timeless high-top icon. Durable black canvas with signature white stitching and rubber toe cap. A wardrobe essential.",
    sizes: ["US 5", "US 6", "US 7", "US 8", "US 9"],
    rating: 4.9,
    reviews: 980
  },
  {
    id: 3,
    name: "Retro Runner 530",
    category: "Men",
    priceUSD: 85.00,
    image: "https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=800&q=80",
    description: "The trending 'Dad Shoe' aesthetic. Breathable mesh with metallic silver overlays. Superior arch support for all-day comfort.",
    sizes: ["US 8", "US 9", "US 10", "US 11"],
    rating: 4.8,
    reviews: 540
  },
  {
    id: 4,
    name: "Street Skate Low",
    category: "Men",
    priceUSD: 55.00,
    image: "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=800&q=80",
    description: "Built for the skate park, loved by everyone. Durable suede and canvas mix with the classic side stripe detail.",
    sizes: ["US 8", "US 9", "US 10", "US 11", "US 12"],
    rating: 4.7,
    reviews: 720
  },
  {
    id: 5,
    name: "Cloud Runner Pure",
    category: "Women",
    priceUSD: 75.00,
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&q=80",
    description: "Modern minimalism. Ultra-lightweight pastel runners designed for women on the move. Features cloud-like memory foam.",
    sizes: ["US 6", "US 7", "US 8", "US 9"],
    rating: 4.9,
    reviews: 890
  },
  {
    id: 6,
    name: "Velocity Sprint X",
    category: "Men",
    priceUSD: 92.00,
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80",
    description: "High-performance red running shoes built for speed. Features responsive cushioning and a breathable knit upper.",
    sizes: ["US 8", "US 9", "US 10", "US 11", "US 12"],
    rating: 4.8,
    reviews: 340
  },
  {
    id: 7,
    name: "Cosmic Boost",
    category: "Women",
    priceUSD: 88.00,
    image: "https://images.unsplash.com/photo-1552346154-21d32810aba3?w=800&q=80",
    description: "Futuristic design with maximum energy return. The speckled sole and ergonomic fit make these perfect for gym or street.",
    sizes: ["US 6", "US 7", "US 8", "US 9"],
    rating: 4.7,
    reviews: 210
  },
  {
    id: 8,
    name: "Downtown Trekker",
    category: "Men",
    priceUSD: 75.00,
    image: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=800&q=80",
    description: "A versatile green sneaker that bridges the gap between trail functionality and urban style. Rugged outsole grip.",
    sizes: ["US 9", "US 10", "US 11"],
    rating: 4.6,
    reviews: 150
  },
  {
    id: 9,
    name: "Air Glide 90",
    category: "Women",
    priceUSD: 95.00,
    image: "https://images.unsplash.com/photo-1515955656352-a1fa3ffcd111?w=800&q=80",
    description: "Iconic 90s silhouette with a modern twist. Blue and white colorway with a visible air unit for superior heel comfort.",
    sizes: ["US 6", "US 7", "US 8", "US 9", "US 10"],
    rating: 4.9,
    reviews: 600
  },
  {
    id: 10,
    name: "Court Legend",
    category: "Men",
    priceUSD: 85.00,
    image: "https://images.unsplash.com/photo-1512374382149-233c42b6a83b?w=800&q=80",
    description: "White high-top basketball sneakers. Leather construction with perforation for breathability. A classic court look.",
    sizes: ["US 8", "US 9", "US 10", "US 11", "US 12", "US 13"],
    rating: 4.8,
    reviews: 420
  },
  {
    id: 11,
    name: "Easy Walk Slip-On",
    category: "Women",
    priceUSD: 55.00,
    image: "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?w=800&q=80",
    description: "Convenient slip-on design with a flexible sole. Perfect for casual walks and running errands.",
    sizes: ["US 5", "US 6", "US 7", "US 8"],
    rating: 4.5,
    reviews: 180
  },
  {
    id: 12,
    name: "Trail Master Grip",
    category: "Men",
    priceUSD: 98.00,
    image: "https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=800&q=80",
    description: "Black performance running shoes with aggressive tread for off-road running. Water-resistant upper.",
    sizes: ["US 8", "US 9", "US 10", "US 11"],
    rating: 4.9,
    reviews: 300
  },
  {
    id: 13,
    name: "Urban High Street",
    category: "Men",
    priceUSD: 82.00,
    image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=800&q=80",
    description: "Bold styling. These high-fashion sneakers make a statement on any sidewalk.",
    sizes: ["US 8", "US 9", "US 10", "US 11", "US 12"],
    rating: 4.7,
    reviews: 250
  },
  {
    id: 14,
    name: "Pastel Dream Chunky",
    category: "Women",
    priceUSD: 89.00,
    image: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=800&q=80",
    description: "The ultimate chunky sneaker in soft pastel hues. Adds height and style to any summer outfit.",
    sizes: ["US 6", "US 7", "US 8", "US 9"],
    rating: 4.8,
    reviews: 560
  },
  {
    id: 15,
    name: "Skater Boy Pro",
    category: "Kids",
    priceUSD: 58.00,
    image: "https://images.unsplash.com/photo-1603808033192-082d6919d3e1?w=800&q=80",
    description: "Durable sneakers for active kids. Reinforced toe cap to withstand playground wear and tear.",
    sizes: ["US 3Y", "US 4Y", "US 5Y", "US 6Y"],
    rating: 4.6,
    reviews: 120
  },
  {
    id: 16,
    name: "Little Racer V2",
    category: "Kids",
    priceUSD: 52.00,
    image: "https://images.unsplash.com/photo-1511556532299-8f662fc26c06?w=800&q=80",
    description: "Lightweight runners for kids with easy velcro straps. Breathable mesh keeps feet cool during play.",
    sizes: ["US 1Y", "US 2Y", "US 3Y", "US 4Y"],
    rating: 4.7,
    reviews: 95
  },
  {
    id: 17,
    name: "Midnight Runner",
    category: "Men",
    priceUSD: 88.00,
    image: "https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=800&q=80",
    description: "Stealthy all-black running shoes. Sleek profile with reflective details for night jogging.",
    sizes: ["US 8", "US 9", "US 10", "US 11", "US 12"],
    rating: 4.8,
    reviews: 410
  },
  {
    id: 18,
    name: "Canvas Low Profile",
    category: "Women",
    priceUSD: 50.00,
    image: "https://images.unsplash.com/photo-1499013819532-e4ff41b00669?w=800&q=80",
    description: "Minimalist white canvas sneakers. The perfect go-to shoe for jeans, dresses, or shorts.",
    sizes: ["US 5", "US 6", "US 7", "US 8", "US 9"],
    rating: 4.6,
    reviews: 850
  },
  {
    id: 19,
    name: "Sport Mode Active",
    category: "Men",
    priceUSD: 72.00,
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80",
    description: "Vibrant trainers designed for high-impact interval training.",
    sizes: ["US 8", "US 9", "US 10", "US 11"],
    rating: 4.5,
    reviews: 130
  },
  {
    id: 20,
    name: "Future Flex Knit",
    category: "Women",
    priceUSD: 94.00,
    image: "https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=800&q=80",
    description: "Premium knit construction that fits like a sock. Purple accents with a revolutionary foam sole.",
    sizes: ["US 6", "US 7", "US 8", "US 9"],
    rating: 4.9,
    reviews: 270
  },
  {
    id: 21,
    name: "Retro Basketball 84",
    category: "Men",
    priceUSD: 96.00,
    image: "https://images.unsplash.com/photo-1515955656352-a1fa3ffcd111?w=800&q=80",
    description: "Throwback basketball shoes. High ankle support and vintage aesthetics.",
    sizes: ["US 9", "US 10", "US 11", "US 12"],
    rating: 4.8,
    reviews: 330
  },
  {
    id: 22,
    name: "Suede Classic Comfort",
    category: "Men",
    priceUSD: 68.00,
    image: "https://images.unsplash.com/photo-1463100099107-aa0980c362e6?w=800&q=80",
    description: "Navy blue suede sneakers with a white sole. A sophisticated look for casual Fridays.",
    sizes: ["US 8", "US 9", "US 10", "US 11"],
    rating: 4.7,
    reviews: 290
  },
  {
    id: 23,
    name: "Neon Lite Speed",
    category: "Women",
    priceUSD: 79.00,
    image: "https://images.unsplash.com/photo-1552346154-21d32810aba3?w=800&q=80",
    description: "Ultra-bright neon runners that ensure you're seen. Lightweight mesh for hot weather running.",
    sizes: ["US 6", "US 7", "US 8", "US 9"],
    rating: 4.6,
    reviews: 180
  },
  {
    id: 24,
    name: "Camo Trek Boot",
    category: "Men",
    priceUSD: 99.00,
    image: "https://images.unsplash.com/photo-1520256862855-398228c41684?w=800&q=80",
    description: "Rugged sneaker-boot hybrid with camouflage detailing. Built for urban exploration and light trails.",
    sizes: ["US 9", "US 10", "US 11", "US 12"],
    rating: 4.8,
    reviews: 220
  },
  {
    id: 25,
    name: "Bubble Sole Tech",
    category: "Women",
    priceUSD: 84.00,
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&q=80",
    description: "Innovative bubble sole technology for maximum impact absorption. Stylish pink and grey design.",
    sizes: ["US 6", "US 7", "US 8", "US 9"],
    rating: 4.7,
    reviews: 400
  },
  {
    id: 26,
    name: "Lightning Bolt Kids",
    category: "Kids",
    priceUSD: 55.00,
    image: "https://images.unsplash.com/photo-1507464098880-e367bc5d2c08?w=800&q=80",
    description: "Electrifying blue sneakers for active kids! Features a durable rubber sole and easy velcro straps for quick changes.",
    sizes: ["US 12C", "US 13C", "US 1Y", "US 2Y"],
    rating: 4.9,
    reviews: 120
  },
  {
    id: 27,
    name: "Junior Pro Cleats",
    category: "Kids",
    priceUSD: 65.00,
    image: "https://images.unsplash.com/photo-1511886929837-354d827aae26?w=800&q=80",
    description: "Professional grade soccer cleats for the rising star. Superior traction on grass and turf fields.",
    sizes: ["US 2Y", "US 3Y", "US 4Y", "US 5Y"],
    rating: 4.8,
    reviews: 85
  },
  {
    id: 28,
    name: "Elite Court Master",
    category: "Men",
    priceUSD: 95.00,
    image: "https://images.unsplash.com/photo-1546502208-81d6e870db51?w=800&q=80",
    description: "Dominate the basketball court with superior ankle support and shock absorption. High-performance grip.",
    sizes: ["US 9", "US 10", "US 11", "US 12"],
    rating: 4.9,
    reviews: 310
  },
  {
    id: 29,
    name: "Flex Trainer X",
    category: "Women",
    priceUSD: 88.00,
    image: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=800&q=80",
    description: "The ultimate gym companion. Flexible sole for dynamic movement during yoga, pilates, or cardio sessions.",
    sizes: ["US 6", "US 7", "US 8", "US 9"],
    rating: 4.8,
    reviews: 240
  },
  {
    id: 30,
    name: "Rainbow Sparkle V",
    category: "Kids",
    priceUSD: 54.00,
    image: "https://images.unsplash.com/photo-1511556532299-8f662fc26c06?w=800&q=80",
    description: "Cute and colorful sneakers that every child loves. Soft inner lining ensures all-day comfort for little feet.",
    sizes: ["US 5C", "US 6C", "US 7C", "US 8C"],
    rating: 4.7,
    reviews: 190
  },
  {
    id: 31,
    name: "Runway Gold Edition",
    category: "Women",
    priceUSD: 99.00,
    image: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=800&q=80",
    description: "Part of our exclusive 'Fashion Show' series. These gold-accented sneakers are designed to turn heads.",
    sizes: ["US 6", "US 7", "US 8", "US 9"],
    rating: 5.0,
    reviews: 150
  },
  {
    id: 32,
    name: "Designer High-Top X",
    category: "Men",
    priceUSD: 95.00,
    image: "https://images.unsplash.com/photo-1512374382149-233c42b6a83b?w=800&q=80",
    description: "A modern masterpiece. High-top silhouette with premium leather finish. As seen on the runway.",
    sizes: ["US 8", "US 9", "US 10", "US 11"],
    rating: 4.9,
    reviews: 210
  },
  {
    id: 33,
    name: "Velvet Night Loafer",
    category: "Men",
    priceUSD: 85.00,
    image: "https://images.unsplash.com/photo-1463100099107-aa0980c362e6?w=800&q=80",
    description: "Sophisticated luxury. Deep texture with a comfortable sneaker sole. Perfect for evening wear.",
    sizes: ["US 8", "US 9", "US 10", "US 11", "US 12"],
    rating: 4.8,
    reviews: 180
  },
  {
    id: 34,
    name: "Crystal Embedded Sneaker",
    category: "Women",
    priceUSD: 100.00,
    image: "https://images.unsplash.com/photo-1512374382149-233c42b6a83b?w=800&q=80",
    description: "Shine bright like a diamond. Features subtle crystal detailing for that extra sparkle.",
    sizes: ["US 5", "US 6", "US 7", "US 8"],
    rating: 5.0,
    reviews: 340
  },
  {
    id: 35,
    name: "Limited Fashion Week Runner",
    category: "Men",
    priceUSD: 98.00,
    image: "https://images.unsplash.com/photo-1552346154-21d32810aba3?w=800&q=80",
    description: "Exclusive release. Aerodynamic design mixed with high-fashion aesthetics. Limited stock available.",
    sizes: ["US 9", "US 10", "US 11"],
    rating: 4.9,
    reviews: 500
  }
];

export const BLOG_POSTS: BlogPost[] = [
  {
    id: 1,
    title: "Top 5 Sneakers of 2024",
    summary: "A breakdown of the best-selling shoes in America this year and why they are so popular.",
    date: "Oct 12, 2024",
    image: "https://images.unsplash.com/photo-1607522370275-f14bc3a5d288?w=800&q=80"
  },
  {
    id: 2,
    title: "How to Style Canvas High-Tops",
    summary: "From dresses to denim, learn how to pair your classic canvas kicks with any outfit.",
    date: "Sep 28, 2024",
    image: "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=800&q=80"
  }
];