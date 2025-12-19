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

const generateProducts = (): Product[] => {
  const rawList = [
    { name: "T-Shirt", price: 25 }, { name: "Hoodie", price: 40 }, { name: "Jersey", price: 45 }, { name: "Jacket", price: 60 }, { name: "Tracksuit", price: 70 },
    { name: "Cap", price: 15 }, { name: "Beanie", price: 18 }, { name: "Jeans", price: 55 }, { name: "Shorts", price: 30 }, { name: "Sweatpants", price: 35 },
    { name: "Polo Shirt", price: 28 }, { name: "Dress Shirt", price: 38 }, { name: "Tank Top", price: 22 }, { name: "Sweater", price: 42 }, { name: "Cardigan", price: 48 },
    { name: "Vest", price: 32 }, { name: "Coat", price: 90 }, { name: "Trench Coat", price: 110 }, { name: "Blazer", price: 85 }, { name: "Leather Jacket", price: 120 },
    { name: "Bomber Jacket", price: 95 }, { name: "Windbreaker", price: 65 }, { name: "Raincoat", price: 75 }, { name: "Pajama Set", price: 40 }, { name: "Nightwear", price: 38 },
    { name: "Bathrobe", price: 50 }, { name: "Jumpsuit", price: 60 }, { name: "Romper", price: 45 }, { name: "Skirt", price: 30 }, { name: "Leggings", price: 28 },
    { name: "Jeggings", price: 32 }, { name: "Yoga Pants", price: 35 }, { name: "Sports Bra", price: 30 }, { name: "Workout Top", price: 26 }, { name: "Compression Shirt", price: 34 },
    { name: "Base Layer", price: 38 }, { name: "Thermal Wear", price: 40 }, { name: "Gloves", price: 20 }, { name: "Scarf", price: 22 }, { name: "Shawl", price: 28 },
    { name: "Socks (Pack)", price: 15 }, { name: "Ankle Socks", price: 10 }, { name: "Sneakers", price: 120 }, { name: "Running Shoes", price: 95 }, { name: "Leather Boots", price: 130 },
    { name: "Loafers", price: 85 }, { name: "Sandals", price: 28 }, { name: "Slippers", price: 20 }, { name: "Flip Flops", price: 18 }, { name: "Formal Shoes", price: 110 },
    { name: "Sunglasses", price: 35 }, { name: "Belt", price: 25 }, { name: "Watch", price: 60 }, { name: "Backpack", price: 50 }, { name: "Crossbody Bag", price: 40 },
    { name: "Duffle Bag", price: 60 }, { name: "Laptop Bag", price: 55 }, { name: "Wallet", price: 22 }, { name: "Tie", price: 15 }, { name: "Bow Tie", price: 18 },
    { name: "Cufflinks", price: 30 }, { name: "Handkerchief", price: 10 }, { name: "Rain Boots", price: 48 }, { name: "Ski Jacket", price: 140 }, { name: "Winter Coat", price: 130 },
    { name: "Puffer Jacket", price: 100 }, { name: "Down Jacket", price: 115 }, { name: "Graphic T-Shirt", price: 27 }, { name: "Ripped Jeans", price: 60 }, { name: "Cargo Pants", price: 50 },
    { name: "Denim Jacket", price: 85 }, { name: "Faux Fur Coat", price: 125 }, { name: "Camouflage Jacket", price: 90 }, { name: "Oversized Hoodie", price: 50 }, { name: "Zipper Hoodie", price: 45 },
    { name: "Half Sleeve Shirt", price: 30 }, { name: "Long Sleeve T-Shirt", price: 28 }, { name: "Linen Shirt", price: 40 }, { name: "Khaki Pants", price: 42 }, { name: "Joggers", price: 38 },
    { name: "Lounge Wear", price: 55 }, { name: "Sleep Shorts", price: 20 }, { name: "Sport Shorts", price: 26 }, { name: "Baseball Cap", price: 22 }, { name: "Visor Hat", price: 18 },
    { name: "Fedora Hat", price: 35 }, { name: "Bucket Hat", price: 25 }, { name: "Custom Jersey", price: 65 }, { name: "Team Tracksuit", price: 75 }, { name: "Warm Gloves", price: 24 },
    { name: "Touchscreen Gloves", price: 28 }, { name: "Waterproof Jacket", price: 85 }, { name: "Cycling Shorts", price: 32 }, { name: "Hiking Boots", price: 135 }, { name: "Trail Shoes", price: 110 },
    { name: "Dress Pants", price: 50 }, { name: "Office Shirt", price: 36 }, { name: "Softshell Jacket", price: 88 }, { name: "Winter Leggings", price: 40 }, { name: "Fashion Hoodie", price: 52 }
  ];

  return rawList.map((item, index) => {
    const name = item.name;
    const lowerName = name.toLowerCase();
    let category: 'Men' | 'Women' | 'Kids' = 'Men';
    let image = "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&q=80"; // Default T-shirt

    // Category Identification
    if (['skirt', 'leggings', 'bra', 'yoga', 'jeggings', 'shawl', 'romper', 'bathrobe', 'nightwear'].some(k => lowerName.includes(k))) {
      category = 'Women';
    }

    // High Accuracy Image Mapping
    if (lowerName === "t-shirt") image = "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&q=80";
    else if (lowerName.includes("polo")) image = "https://images.unsplash.com/photo-1581655353564-df123a1eb820?w=800&q=80";
    else if (lowerName.includes("dress shirt") || lowerName.includes("office shirt")) image = "https://images.unsplash.com/photo-1598033129183-c4f50c7176c8?w=800&q=80";
    else if (lowerName.includes("tank top") || lowerName.includes("workout top")) image = "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800&q=80";
    else if (lowerName.includes("hoodie")) image = "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=800&q=80";
    else if (lowerName.includes("sweater") || lowerName.includes("cardigan")) image = "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=800&q=80";
    else if (lowerName === "leather jacket") image = "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800&q=80";
    else if (lowerName.includes("trench coat")) image = "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=800&q=80";
    else if (lowerName.includes("blazer")) image = "https://images.unsplash.com/photo-1594932224828-b4b0573fe2f8?w=800&q=80";
    else if (lowerName.includes("bomber")) image = "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=800&q=80";
    else if (lowerName.includes("denim jacket")) image = "https://images.unsplash.com/photo-1576871337632-b9aef4c17ab9?w=800&q=80";
    else if (lowerName.includes("puffer") || lowerName.includes("down jacket")) image = "https://images.unsplash.com/photo-1544022613-e87ca75a784a?w=800&q=80";
    else if (lowerName.includes("tracksuit") || lowerName.includes("jersey")) image = "https://images.unsplash.com/photo-1517466787929-bc90951d0974?w=800&q=80";
    else if (lowerName.includes("jeans")) image = "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=800&q=80";
    else if (lowerName.includes("shorts")) image = "https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=800&q=80";
    else if (lowerName.includes("sweatpants") || lowerName.includes("joggers")) image = "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&q=80";
    else if (lowerName === "sneakers" || lowerName.includes("running")) image = "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80";
    else if (lowerName.includes("boots")) image = "https://images.unsplash.com/photo-1520639889410-1eb419ef5162?w=800&q=80";
    else if (lowerName.includes("formal shoes") || lowerName.includes("loafers")) image = "https://images.unsplash.com/photo-1533867617858-e7b97e060509?w=800&q=80";
    else if (lowerName.includes("sandals") || lowerName.includes("flip flops")) image = "https://images.unsplash.com/photo-1562273103-91b74032d164?w=800&q=80";
    else if (lowerName.includes("cap") || lowerName.includes("hat")) image = "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=800&q=80";
    else if (lowerName.includes("beanie")) image = "https://images.unsplash.com/photo-1576871337622-98d48d1cf531?w=800&q=80";
    else if (lowerName.includes("backpack") || lowerName.includes("bag")) image = "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&q=80";
    else if (lowerName.includes("watch")) image = "https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=800&q=80";
    else if (lowerName.includes("sunglasses")) image = "https://images.unsplash.com/photo-1511499767350-a1590fdb2863?w=800&q=80";
    else if (lowerName.includes("wallet") || lowerName.includes("belt")) image = "https://images.unsplash.com/photo-1627123424574-724758594e93?w=800&q=80";

    // "PROTEX" Logic: Apply branding to protective/technical items
    const isProtex = lowerName.includes("jacket") || lowerName.includes("coat") || lowerName.includes("boots") || lowerName.includes("waterproof") || lowerName.includes("ski");

    return {
      id: 1000 + index,
      name: `${name} Z`,
      category: category,
      priceUSD: item.price,
      image: image,
      description: `Premium Salman SKT ${name}. ${isProtex ? 'Featuring PROTEX weather-protection technology.' : 'Ultra-breathable premium fabric.'}`,
      sizes: category === 'Men' || category === 'Women' ? ["S", "M", "L", "XL", "XXL"] : ["US 1Y", "US 2Y", "US 3Y"],
      rating: parseFloat((4.5 + (Math.random() * 0.4)).toFixed(1)), // Fix precision
      reviews: Math.floor(Math.random() * 500) + 10,
      isProtex: isProtex // Custom flag for UI badge
    } as any;
  });
};

export const PRODUCTS: Product[] = [
  ...generateProducts()
];

export const BLOG_POSTS: BlogPost[] = [
  {
    id: 1,
    title: "Top 5 Styles of 2024",
    summary: "A breakdown of the best-selling items in America this year and why they are so popular.",
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