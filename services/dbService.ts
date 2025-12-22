import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { Product, Order } from '../types';

let supabaseInstance: SupabaseClient | null = null;

const LOCAL_STORAGE_PRODUCTS_KEY = 'skt_products_v1';
const LOCAL_STORAGE_ORDERS_KEY = 'skt_orders_v1';

const getEnv = (key: string) => {
  try {
    const altKey = key.startsWith('VITE_') ? key.replace('VITE_', '') : `VITE_${key}`;
    // @ts-ignore
    const viteEnv = (typeof import.meta !== 'undefined' && import.meta.env) ? import.meta.env[key] || import.meta.env[altKey] : null;
    const procEnv = (typeof process !== 'undefined' && process.env) ? process.env[key] || process.env[altKey] : null;
    const globalEnv = (globalThis as any)[key] || (globalThis as any)[altKey];
    
    return viteEnv || procEnv || globalEnv || '';
  } catch (e) {
    return '';
  }
};

const getSupabase = () => {
    if (supabaseInstance) return supabaseInstance;
    
    const URL = getEnv('VITE_SUPABASE_URL');
    const KEY = getEnv('VITE_SUPABASE_ANON_KEY');

    if (URL && KEY && URL.length > 10) {
        try {
            supabaseInstance = createClient(URL, KEY);
            return supabaseInstance;
        } catch (e) {
            console.warn("Supabase initialization failed, switching to local mode.");
            return null;
        }
    }
    return null;
};

// Helper to handle local storage
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
            products.push({ ...product, id: crypto.randomUUID() });
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
  isConfigured: () => getSupabase() !== null,

  checkConnection: async (): Promise<{ success: boolean; message: string; details?: string }> => {
    const client = getSupabase();
    if (!client) {
      return { 
        success: false, 
        message: "Offline Mode",
        details: "Using Browser Storage (Keys not set)."
      };
    }
    try {
      const { error } = await client.from('products').select('count', { count: 'exact', head: true });
      if (error) throw error;
      return { success: true, message: "Cloud Connected" };
    } catch (e: any) {
      return { 
        success: false, 
        message: "Cloud Error",
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
      // Merge local and cloud if needed, but for now just cloud
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

    const { data, error } = await client.from('products').upsert(cleanProduct).select();
    if (error) {
        console.error("Cloud save failed, saving locally.");
        return localDb.saveProduct(product as Product);
    }
    return data ? data[0] : null;
  },

  deleteProduct: async (id: string) => {
    const client = getSupabase();
    if (!client) return localDb.deleteProduct(id);
    const { error } = await client.from('products').delete().eq('id', id);
    if (error) {
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