
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { Product, Order } from '../types';

let supabaseInstance: SupabaseClient | null = null;

const LOCAL_STORAGE_PRODUCTS_KEY = 'skt_products_v1';
const LOCAL_STORAGE_ORDERS_KEY = 'skt_orders_v1';

const getEnv = (key: string) => {
  // Try all possible ways to get environment variables in different hosting environments
  try {
    const altKey = key.startsWith('VITE_') ? key.replace('VITE_', '') : `VITE_${key}`;
    
    // Fix: Access import.meta.env through any to avoid property access errors
    const meta = import.meta as any;
    if (typeof meta !== 'undefined' && meta.env) {
        if (meta.env[key]) return meta.env[key];
        if (meta.env[altKey]) return meta.env[altKey];
    }
    
    // @ts-ignore - Node/Vercel/Classic
    if (typeof process !== 'undefined' && process.env) {
        if (process.env[key]) return process.env[key];
        if (process.env[altKey]) return process.env[altKey];
    }

    // Global scope (fallback)
    return (globalThis as any)[key] || (globalThis as any)[altKey] || '';
  } catch (e) {
    return '';
  }
};

const getSupabase = () => {
    if (supabaseInstance) return supabaseInstance;
    
    const URL = getEnv('VITE_SUPABASE_URL');
    const KEY = getEnv('VITE_SUPABASE_ANON_KEY');

    // Only attempt if keys look valid
    if (URL && KEY && URL.startsWith('http')) {
        try {
            supabaseInstance = createClient(URL, KEY);
            return supabaseInstance;
        } catch (e) {
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
    const client = getSupabase();
    return !!client;
  },

  checkConnection: async (): Promise<{ success: boolean; message: string; details?: string }> => {
    const client = getSupabase();
    if (!client) {
      return { 
        success: false, 
        message: "Offline / Local Mode",
        details: "Keys missing. Data will NOT sync across mobiles."
      };
    }
    try {
      const { error } = await client.from('products').select('count', { count: 'exact', head: true });
      if (error) throw error;
      return { success: true, message: "Cloud Active (Sync ON)" };
    } catch (e: any) {
      return { 
        success: false, 
        message: "Connection Error",
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
    
    const cleanProduct = { ...product };
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
    if (cleanProduct.id && !uuidRegex.test(cleanProduct.id)) delete cleanProduct.id;

    try {
        const { data, error } = await client.from('products').upsert(cleanProduct).select();
        if (error) throw error;
        return data ? data[0] : null;
    } catch (e) {
        console.warn("Saving locally as fallback");
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
