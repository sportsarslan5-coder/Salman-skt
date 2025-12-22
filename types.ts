export interface Product {
  id: string; // UUID from Supabase
  title: string;
  category: string;
  price: number;
  image_url: string;
  description: string;
  sizes?: string[];
  rating?: number;
  reviews?: number;
  isProtex?: boolean;
}

export interface Order {
  id: string;
  customer_name: string;
  phone: string;
  city: string;
  address: string;
  email: string;
  items: { productName: string, price: number, quantity: number, size: string, image: string }[];
  total: number;
  status: 'Pending' | 'Completed' | 'Cancelled';
  created_at: string;
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