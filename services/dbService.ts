
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { Product, Order } from '../types';

let supabaseInstance: SupabaseClient | null = null;

const LOCAL_STORAGE_PRODUCTS_KEY = 'skt_products_v1';
const LOCAL_STORAGE_ORDERS_KEY = 'skt_orders_v1';

const getEnv = (key: string): string => {
  try {
    // Check various ways env variables might be provided
    const val = (import.meta as any).env?.[key] || 
                (process as any).env?.[key] || 
                '';
    
    // Safety check: sometimes users paste the name into the value field in Vercel
    if (val === key) return ''; 
    return val;
  } catch (e) {
    return '';
  }
};

export const getDiagnostics = () => {
  const url = getEnv('VITE_SUPABASE_URL');
  const key = getEnv('VITE_SUPABASE_ANON_KEY');
  
  return {
    urlFound: !!url && url.startsWith('http'),
    keyFound: !!key && key.length > 20,
    urlValue: url ? (url.substring(0, 10) + '...') : 'Missing',
    keyValue: key ? (key.substring(0, 5) + '...') : 'Missing'
  };
};

const getSupabase = () => {
    if (supabaseInstance) return supabaseInstance;
    
    const URL = getEnv('VITE_SUPABASE_URL');
    const KEY = getEnv('VITE_SUPABASE_ANON_KEY');

    if (URL && KEY && URL.startsWith('http') && KEY.length > 20) {
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
    const client = getSupabase();
    return !!client;
  },

  checkConnection: async (): Promise<{ success: boolean; message: string; details?: string }> => {
    const client = getSupabase();
    if (!client) {
      const diag = getDiagnostics();
      if (!diag.urlFound && !diag.keyFound) {
        return { success: false, message: "OFFLINE MODE", details: "Vercel keys are missing or name/value mixed up." };
      }
      return { success: false, message: "CONFIG ERROR", details: `URL: ${diag.urlFound ? 'OK' : 'INVALID'} | Key: ${diag.keyFound ? 'OK' : 'INVALID'}` };
    }
    try {
      const { error } = await client.from('products').select('id').limit(1);
      if (error) throw error;
      return { success: true, message: "GLOBAL SYNC ACTIVE" };
    } catch (e: any) {
      return { success: false, message: "DATABASE ERROR", details: e.message };
    }
  },

  getProducts: async (): Promise<Product[]> => {
    const client = getSupabase();
    if (!client) return localDb.getProducts();
    try {
      const { data, error } = await client.from('products').select('*').order('created_at', { ascending: false });
      if (error) return localDb.getProducts();
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
      if (error) return localDb.getOrders();
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
