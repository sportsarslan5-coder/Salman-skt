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
  search: { en: 'Search 3D products...', ur: 'مصنوعات تلاش کریں...' },
  men: { en: 'Men', ur: 'مرد' },
  women: { en: 'Women', ur: 'خواتین' },
  kids: { en: 'Kids', ur: 'بچے' },
  buyNow: { en: 'Shop 3D Collection', ur: '3D کلیکشن خریدیں' },
  heroTitle: { en: 'Sialkot Shop 3D Z', ur: 'سیالکوٹ شاپ تھری ڈی زیڈ' },
  heroSubtitle: { en: 'High-definition 3D sublimation apparel and PROTEX premium protective gear.', ur: 'ہائی ڈیفینیشن تھری ڈی سبلیمیشن ملبوسات اور پروٹیکس پریمیم حفاظتی گیئر۔' },
  dealOfTheDay: { en: 'Trending Now', ur: 'اب ٹرینڈ ہو رہا ہے' },
  addToCart: { en: 'Add to Cart', ur: 'ٹوکری میں شامل کریں' },
  reviews: { en: 'Customer Reviews', ur: 'کسٹمر کے جائزے' },
  emptyCart: { en: 'Your cart is empty', ur: 'آپ کی ٹوکری خالی ہے' },
  total: { en: 'Total', ur: 'کل' },
  placeOrder: { en: 'Place Order on WhatsApp', ur: 'واٹس ایپ پر آرڈر کریں' },
  contactUs: { en: 'Contact Us', ur: 'ہم سے رابطہ کریں' },
  sendMessage: { en: 'Send Message', ur: 'پیغام بھیجیں' },
  aiStylist: { en: '3D Style Expert', ur: '3D اسٹائل ماہر' },
  stylistIntro: { en: 'Hi! I am your Sialkot Shop expert. Looking for 3D printed jerseys or PROTEX jackets?', ur: 'ہائے! میں آپ کا سیالکوٹ شاپ ایکسپرٹ ہوں۔ کیا آپ 3D جرسی یا پروٹیکس جیکٹ تلاش کر رہے ہیں؟' },
  typing: { en: 'Expert is typing...', ur: 'ماہر لکھ رہا ہے...' },
  footerText: { en: '© 2024 Salman SKT. All rights reserved.', ur: '© 2024 سلمان سیالکوٹ۔ جملہ حقوق محفوظ ہیں۔' },
  subscribe: { en: 'Subscribe', ur: 'سبسکرائب' },
  smartPricing: { en: 'Smart Pricing', ur: 'اسمارٹ قیمت' },
};

const generateProducts = (): Product[] => {
  const rawList = [
    { name: "T-Shirt", price: 25, img: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&q=80" },
    { name: "Hoodie", price: 40, img: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=800&q=80" },
    { name: "Jersey", price: 45, img: "https://images.unsplash.com/photo-1580087444194-03552a41d082?w=800&q=80" },
    { name: "Jacket", price: 60, img: "https://images.unsplash.com/photo-1601924994987-69e26d50dc26?w=800&q=80" },
    { name: "Tracksuit", price: 70, img: "https://images.unsplash.com/photo-1483721310020-03333e577078?w=800&q=80" },
    { name: "Cap", price: 15, img: "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=800&q=80" },
    { name: "Beanie", price: 18, img: "https://images.unsplash.com/photo-1576871337622-98d48d1cf531?w=800&q=80" },
    { name: "Jeans", price: 55, img: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=800&q=80" },
    { name: "Shorts", price: 30, img: "https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=800&q=80" },
    { name: "Sweatpants", price: 35, img: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&q=80" },
    { name: "Polo Shirt", price: 28, img: "https://images.unsplash.com/photo-1581655353564-df123a1eb820?w=800&q=80" },
    { name: "Dress Shirt", price: 38, img: "https://images.unsplash.com/photo-1598033129183-c4f50c7176c8?w=800&q=80" },
    { name: "Tank Top", price: 22, img: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800&q=80" },
    { name: "Sweater", price: 42, img: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=800&q=80" },
    { name: "Cardigan", price: 48, img: "https://images.unsplash.com/photo-1574282893982-ff1675ba4900?w=800&q=80" },
    { name: "Vest", price: 32, img: "https://images.unsplash.com/photo-1621072156002-e2fccbc0b17d?w=800&q=80" },
    { name: "Coat", price: 90, img: "https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=800&q=80" },
    { name: "Trench Coat", price: 110, img: "https://images.unsplash.com/photo-1580657018910-c7b75b9400d7?w=800&q=80" },
    { name: "Blazer", price: 85, img: "https://images.unsplash.com/photo-1594932224828-b4b0573fe2f8?w=800&q=80" },
    { name: "Leather Jacket", price: 120, img: "https://images.unsplash.com/photo-1520975954732-35dd22299614?w=800&q=80" },
    { name: "Bomber Jacket", price: 95, img: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=800&q=80" },
    { name: "Windbreaker", price: 65, img: "https://images.unsplash.com/photo-1622445272461-c6580cab8755?w=800&q=80" },
    { name: "Raincoat", price: 75, img: "https://images.unsplash.com/photo-1559551409-dadc959f76b8?w=800&q=80" },
    { name: "Pajama Set", price: 40, img: "https://images.unsplash.com/photo-1590611380053-da6447011f45?w=800&q=80" },
    { name: "Nightwear", price: 38, img: "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800&q=80" },
    { name: "Bathrobe", price: 50, img: "https://images.unsplash.com/photo-1560010976-b6e2d6776b26?w=800&q=80" },
    { name: "Jumpsuit", price: 60, img: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=800&q=80" },
    { name: "Romper", price: 45, img: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=800&q=80" },
    { name: "Skirt", price: 30, img: "https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?w=800&q=80" },
    { name: "Leggings", price: 28, img: "https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=800&q=80" },
    { name: "Jeggings", price: 32, img: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=800&q=80" },
    { name: "Yoga Pants", price: 35, img: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&q=80" },
    { name: "Sports Bra", price: 30, img: "https://images.unsplash.com/photo-1518310383802-640c2de311b2?w=800&q=80" },
    { name: "Workout Top", price: 26, img: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800&q=80" },
    { name: "Compression Shirt", price: 34, img: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800&q=80" },
    { name: "Base Layer", price: 38, img: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=800&q=80" },
    { name: "Thermal Wear", price: 40, img: "https://images.unsplash.com/photo-1516762689617-e1cffcef479d?w=800&q=80" },
    { name: "Gloves", price: 20, img: "https://images.unsplash.com/photo-1590483734724-38813735741f?w=800&q=80" },
    { name: "Scarf", price: 22, img: "https://images.unsplash.com/photo-1520903920243-00d872a2d1c9?w=800&q=80" },
    { name: "Shawl", price: 28, img: "https://images.unsplash.com/photo-1627855014049-94038676f6b5?w=800&q=80" },
    { name: "Socks (Pack)", price: 15, img: "https://images.unsplash.com/photo-1582966298636-a1d08e432474?w=800&q=80" },
    { name: "Ankle Socks", price: 10, img: "https://images.unsplash.com/photo-1619024304443-41c304671391?w=800&q=80" },
    { name: "Sneakers", price: 120, img: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80" },
    { name: "Running Shoes", price: 95, img: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=800&q=80" },
    { name: "Leather Boots", price: 130, img: "https://images.unsplash.com/photo-1520639889410-1eb419ef5162?w=800&q=80" },
    { name: "Loafers", price: 85, img: "https://images.unsplash.com/photo-1533867617858-e7b97e060509?w=800&q=80" },
    { name: "Sandals", price: 28, img: "https://images.unsplash.com/photo-1562273103-91b74032d164?w=800&q=80" },
    { name: "Slippers", price: 20, img: "https://images.unsplash.com/photo-1591348113547-7563d1a65971?w=800&q=80" },
    { name: "Flip Flops", price: 18, img: "https://images.unsplash.com/photo-1561909848-977d0617f275?w=800&q=80" },
    { name: "Formal Shoes", price: 110, img: "https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?w=800&q=80" },
    { name: "Sunglasses", price: 35, img: "https://images.unsplash.com/photo-1511499767350-a1590fdb2863?w=800&q=80" },
    { name: "Belt", price: 25, img: "https://images.unsplash.com/photo-1624222247344-550fb8ec5521?w=800&q=80" },
    { name: "Watch", price: 60, img: "https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=800&q=80" },
    { name: "Backpack", price: 50, img: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&q=80" },
    { name: "Crossbody Bag", price: 40, img: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=800&q=80" },
    { name: "Duffle Bag", price: 60, img: "https://images.unsplash.com/photo-1544816155-12df9643f363?w=800&q=80" },
    { name: "Laptop Bag", price: 55, img: "https://images.unsplash.com/photo-1547949003-9792a18a2601?w=800&q=80" },
    { name: "Wallet", price: 22, img: "https://images.unsplash.com/photo-1627123424574-724758594e93?w=800&q=80" },
    { name: "Tie", price: 15, img: "https://images.unsplash.com/photo-1589756823851-4144360e221f?w=800&q=80" },
    { name: "Bow Tie", price: 18, img: "https://images.unsplash.com/photo-1572946261541-0f707f15239a?w=800&q=80" },
    { name: "Cufflinks", price: 30, img: "https://images.unsplash.com/photo-1630154030638-96a29774619d?w=800&q=80" },
    { name: "Handkerchief", price: 10, img: "https://images.unsplash.com/photo-1518310383802-640c2de311b2?w=800&q=80" },
    { name: "Rain Boots", price: 48, img: "https://images.unsplash.com/photo-1560343090-f0409e92791a?w=800&q=80" },
    { name: "Ski Jacket", price: 140, img: "https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?w=800&q=80" },
    { name: "Winter Coat", price: 130, img: "https://images.unsplash.com/photo-1544022613-e87ca75a784a?w=800&q=80" },
    { name: "Puffer Jacket", price: 100, img: "https://images.unsplash.com/photo-1544022613-e87ca75a784a?w=800&q=80" },
    { name: "Down Jacket", price: 115, img: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=800&q=80" },
    { name: "Graphic T-Shirt", price: 27, img: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=800&q=80" },
    { name: "Ripped Jeans", price: 60, img: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=800&q=80" },
    { name: "Cargo Pants", price: 50, img: "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=800&q=80" },
    { name: "Denim Jacket", price: 85, img: "https://images.unsplash.com/photo-1576871337622-98d48d1cf531?w=800&q=80" },
    { name: "Faux Fur Coat", price: 125, img: "https://images.unsplash.com/photo-1517441581617-12444e8ce930?w=800&q=80" },
    { name: "Camouflage Jacket", price: 90, img: "https://images.unsplash.com/photo-1548883354-94bcfe321cbb?w=800&q=80" },
    { name: "Oversized Hoodie", price: 50, img: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=800&q=80" },
    { name: "Zipper Hoodie", price: 45, img: "https://images.unsplash.com/photo-1513373319109-eb154073eb0b?w=800&q=80" },
    { name: "Half Sleeve Shirt", price: 30, img: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=800&q=80" },
    { name: "Long Sleeve T-Shirt", price: 28, img: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=800&q=80" },
    { name: "Linen Shirt", price: 40, img: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=800&q=80" },
    { name: "Khaki Pants", price: 42, img: "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=800&q=80" },
    { name: "Joggers", price: 38, img: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&q=80" },
    { name: "Lounge Wear", price: 55, img: "https://images.unsplash.com/photo-1590611380053-da6447011f45?w=800&q=80" },
    { name: "Sleep Shorts", price: 20, img: "https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=800&q=80" },
    { name: "Sport Shorts", price: 26, img: "https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=800&q=80" },
    { name: "Baseball Cap", price: 22, img: "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=800&q=80" },
    { name: "Visor Hat", price: 18, img: "https://images.unsplash.com/photo-1521369909029-2afed882baee?w=800&q=80" },
    { name: "Fedora Hat", price: 35, img: "https://images.unsplash.com/photo-1514327605112-b887c0e61c0a?w=800&q=80" },
    { name: "Bucket Hat", price: 25, img: "https://images.unsplash.com/photo-1597040610200-057482813636?w=800&q=80" },
    { name: "Custom Jersey", price: 65, img: "https://images.unsplash.com/photo-1580087444194-03552a41d082?w=800&q=80" },
    { name: "Team Tracksuit", price: 75, img: "https://images.unsplash.com/photo-1483721310020-03333e577078?w=800&q=80" },
    { name: "Warm Gloves", price: 24, img: "https://images.unsplash.com/photo-1590483734724-38813735741f?w=800&q=80" },
    { name: "Touchscreen Gloves", price: 28, img: "https://images.unsplash.com/photo-1590483734724-38813735741f?w=800&q=80" },
    { name: "Waterproof Jacket", price: 85, img: "https://images.unsplash.com/photo-1559551409-dadc959f76b8?w=800&q=80" },
    { name: "Cycling Shorts", price: 32, img: "https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=800&q=80" },
    { name: "Hiking Boots", price: 135, img: "https://images.unsplash.com/photo-1520639889410-1eb419ef5162?w=800&q=80" },
    { name: "Trail Shoes", price: 110, img: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=800&q=80" },
    { name: "Dress Pants", price: 50, img: "https://images.unsplash.com/photo-1594932224828-b4b0573fe2f8?w=800&q=80" },
    { name: "Office Shirt", price: 36, img: "https://images.unsplash.com/photo-1598033129183-c4f50c7176c8?w=800&q=80" },
    { name: "Softshell Jacket", price: 88, img: "https://images.unsplash.com/photo-1622445272461-c6580cab8755?w=800&q=80" },
    { name: "Winter Leggings", price: 40, img: "https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=800&q=80" },
    { name: "Fashion Hoodie", price: 52, img: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=800&q=80" }
  ];

  return rawList.map((item, index) => {
    const name = item.name;
    const lowerName = name.toLowerCase();
    let category: 'Men' | 'Women' | 'Kids' = 'Men';

    if (['skirt', 'leggings', 'bra', 'yoga', 'jeggings', 'shawl', 'romper', 'bathrobe', 'nightwear'].some(k => lowerName.includes(k))) {
      category = 'Women';
    } else if (['kids', 'junior', 'little', 'youth'].some(k => lowerName.includes(k))) {
      category = 'Kids';
    }

    const isProtex = lowerName.includes("jacket") || lowerName.includes("coat") || lowerName.includes("boots") || lowerName.includes("waterproof") || lowerName.includes("ski");
    const is3D = lowerName.includes("t-shirt") || lowerName.includes("jersey") || lowerName.includes("hoodie") || lowerName.includes("tracksuit") || lowerName.includes("polo");

    return {
      id: 1000 + index,
      name: `${name} 3D Z`,
      category: category,
      priceUSD: item.price,
      image: item.img,
      description: `Official Salman SKT ${name} 3D Z collection. ${is3D ? 'Featuring high-definition 3D sublimation textures for a hyper-realistic finish.' : ''} ${isProtex ? 'Equipped with PROTEX elite weather-resistance technology for maximum durability in all conditions.' : 'Crafted from premium, sustainably sourced Sialkot grade materials.'}`,
      sizes: category === 'Men' || category === 'Women' ? ["S", "M", "L", "XL", "XXL"] : ["US 1Y", "US 2Y", "US 3Y"],
      rating: parseFloat((4.7 + (Math.random() * 0.3)).toFixed(1)),
      reviews: Math.floor(Math.random() * 950) + 150,
      isProtex: isProtex
    };
  });
};

export const PRODUCTS: Product[] = [
  ...generateProducts()
];

export const BLOG_POSTS: BlogPost[] = [
  {
    id: 1,
    title: "Revolutionizing 3D Sublimation",
    summary: "Discover how Sialkot Shop is setting new global standards in high-definition printed apparel.",
    date: "Dec 18, 2024",
    image: "https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?w=800&q=80"
  },
  {
    id: 2,
    title: "PROTEX: The Ultimate Shield",
    summary: "Exploring the science behind the weather-resistance of our latest winter collection.",
    date: "Dec 05, 2024",
    image: "https://images.unsplash.com/photo-1544022613-e87ca75a784a?w=800&q=80"
  }
];