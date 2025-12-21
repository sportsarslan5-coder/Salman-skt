export interface Product {
  id: number;
  name: string;
  category: 'Men' | 'Women' | 'Kids';
  priceUSD: number;
  image: string;
  description: string;
  sizes: string[];
  rating: number;
  reviews: number;
  isProtex?: boolean;
}

export interface Order {
  id: string;
  customerName: string;
  phone: string;
  city: string;
  address: string;
  email: string;
  items: { productName: string, price: number, quantity: number, size: string, image: string }[];
  total: number;
  status: 'Pending' | 'Completed' | 'Cancelled';
  date: string;
}

export interface CartItem extends Product {
  selectedSize: string;
  quantity: number;
}

export interface BlogPost {
  id: number;
  title: string;
  summary: string;
  date: string;
  image: string;
}

export type Language = 'en' | 'ur';
export type Currency = 'USD' | 'PKR';

export interface Translations {
  [key: string]: {
    en: string;
    ur: string;
  };
}