
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { Product, Order } from '../types';

let supabaseInstance: SupabaseClient | null = null;

const LOCAL_STORAGE_PRODUCTS_KEY = 'skt_products_v1';
const LOCAL_STORAGE_ORDERS_KEY = 'skt_orders_v1';

// Vercel and Vite handles env variables differently. This ensures we pick them up.
const getEnv = (key: string): string => {
  try {
    // 1. Try Vite's import.meta.env (Client Side)
    if (typeof import.meta !== 'undefined' && (import.meta as any).env && (import.meta as any).env[key]) {
      return (import.meta as any).env[key];
    }
    // 2. Try standard process.env (Server Side / Deployment)
    if (typeof process !== 'undefined' && process.env && process.env[key]) {
      return process.env[key];
    }
    return '';
  } catch (e) {
    return '';
  }
};

const getSupabase = () => {
    if (supabaseInstance) return supabaseInstance;
    
    // Check both VITE_ prefixed and standard names
    const URL = getEnv('VITE_SUPABASE_URL') || getEnv('SUPABASE_URL');
    const KEY = getEnv('VITE_SUPABASE_ANON_KEY') || getEnv('SUPABASE_ANON_KEY');

    if (URL && KEY && URL.length > 10) {
        try {
            supabaseInstance = createClient(URL, KEY);
            return supabaseInstance;
        } catch (e) {
            console.error("Supabase Initialization Error:", e);
            return null;
        }
    }
    return null;
};

const localDb = {
    getProducts: (): Product[] => {
        const data = localStorage.getItem(LOCAL_STORAGE_PRODUCTS_KEY);
        return data ? JSON.parse(data) : [];
    },
    saveProduct: (product: Product) => {
        const products = localDb.getProducts();
        const index = products.findIndex(p => p.id === product.id);
        if (index > -1) {
            products[index] = product;
        } else {
            product.id = crypto.randomUUID();
            products.push(product);
        }
        localStorage.setItem(LOCAL_STORAGE_PRODUCTS_KEY, JSON.stringify(products));
        return product;
    },
    deleteProduct: (id: string) => {
        const products = localDb.getProducts().filter(p => p.id !== id);
        localStorage.setItem(LOCAL_STORAGE_PRODUCTS_KEY, JSON.stringify(products));
    },
    getOrders: (): Order[] => {
        const data = localStorage.getItem(LOCAL_STORAGE_ORDERS_KEY);
        return data ? JSON.parse(data) : [];
    },
    saveOrder: (order: Partial<Order>) => {
        const orders = localDb.getOrders();
        const newOrder = { 
            ...order, 
            id: crypto.randomUUID(), 
            created_at: new Date().toISOString() 
        } as Order;
        orders.push(newOrder);
        localStorage.setItem(LOCAL_STORAGE_ORDERS_KEY, JSON.stringify(orders));
        return newOrder;
    }
};

export const dbService = {
  isConfigured: () => {
    return !!getSupabase();
  },

  checkConnection: async (): Promise<{ success: boolean; message: string; details?: string }> => {
    const client = getSupabase();
    if (!client) {
      return { 
        success: false, 
        message: "OFFLINE / LOCAL MODE",
        details: "Keys not found. Using local storage."
      };
    }
    try {
      // Light check
      const { error } = await client.from('products').select('id').limit(1);
      if (error) throw error;
      return { success: true, message: "CLOUD CONNECTED" };
    } catch (e: any) {
      return { 
        success: false, 
        message: "SYNC ERROR",
        details: e.message
      };
    }
  },

  getProducts: async (): Promise<Product[]> => {
    const client = getSupabase();
    if (!client) return localDb.getProducts();
    try {
      const { data, error } = await client.from('products').select('*').order('created_at', { ascending: false });
      if (error) throw error;
      return data || [];
    } catch (error) {
      return localDb.getProducts();
    }
  },

  saveProduct: async (product: Partial<Product>) => {
    const client = getSupabase();
    if (!client) return localDb.saveProduct(product as Product);
    
    try {
        const { data, error } = await client.from('products').upsert(product).select();
        if (error) throw error;
        return data ? data[0] : null;
    } catch (e) {
        return localDb.saveProduct(product as Product);
    }
  },

  deleteProduct: async (id: string) => {
    const client = getSupabase();
    if (!client) return localDb.deleteProduct(id);
    try {
        await client.from('products').delete().eq('id', id);
    } catch (e) {
        localDb.deleteProduct(id);
    }
  },

  getOrders: async (): Promise<Order[]> => {
    const client = getSupabase();
    if (!client) return localDb.getOrders();
    try {
      const { data, error } = await client.from('orders').select('*').order('created_at', { ascending: false });
      if (error) throw error;
      return data || [];
    } catch (error) {
      return localDb.getOrders();
    }
  },

  saveOrder: async (order: Partial<Order>) => {
    const client = getSupabase();
    if (!client) return localDb.saveOrder(order);
    try {
        const { data, error } = await client.from('orders').insert(order).select();
        if (error) throw error;
        return data ? data[0] : null;
    } catch (e) {
        return localDb.saveOrder(order);
    }
  }
};
