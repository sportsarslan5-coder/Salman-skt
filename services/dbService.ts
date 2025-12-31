
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { Product, Order } from '../types';

let supabaseInstance: SupabaseClient | null = null;

const LOCAL_STORAGE_PRODUCTS_KEY = 'skt_products_v1';
const LOCAL_STORAGE_ORDERS_KEY = 'skt_orders_v1';

const getEnv = (key: string): string => {
  try {
    const val = (import.meta as any).env?.[key] || 
                (process as any).env?.[key] || 
                '';
    const trimmed = val.trim();
    if (trimmed === key || trimmed === 'VITE_SUPABASE_URL' || trimmed === 'VITE_SUPABASE_ANON_KEY') {
        return "__ERROR_NAME_AS_VALUE__";
    }
    return trimmed;
  } catch (e) {
    return '';
  }
};

export const getDiagnostics = () => {
  const url = getEnv('VITE_SUPABASE_URL');
  const key = getEnv('VITE_SUPABASE_ANON_KEY');
  
  const isPlaceholder = url.includes('abcdxyz') || key.includes('eyJhbGci');
  const isUrlValid = !!url && url.startsWith('http') && !url.includes('abcdxyz');
  const isKeyValid = !!key && key.startsWith('eyJ') && !key.includes('eyJhbGci');
  const isSecretKey = !!key && (key.startsWith('sb_') || key.includes('secret'));

  return {
    urlFound: isUrlValid,
    keyFound: isKeyValid,
    isPlaceholder,
    isNameError: url === "__ERROR_NAME_AS_VALUE__" || key === "__ERROR_NAME_AS_VALUE__",
    isSecretKeyError: isSecretKey,
    urlValue: url === "__ERROR_NAME_AS_VALUE__" ? "Name Error" : (url ? (url.substring(0, 15) + '...') : 'Missing'),
    keyValue: key === "__ERROR_NAME_AS_VALUE__" ? "Name Error" : (key ? (key.substring(0, 8) + '...') : 'Missing')
  };
};

const getSupabase = () => {
    if (supabaseInstance) return supabaseInstance;
    
    const URL = getEnv('VITE_SUPABASE_URL');
    const KEY = getEnv('VITE_SUPABASE_ANON_KEY');

    // Extra check to prevent connection to placeholders
    if (URL && KEY && URL.startsWith('http') && KEY.startsWith('eyJ') && !URL.includes('abcdxyz')) {
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
  isConfigured: () => !!getSupabase(),

  checkConnection: async (): Promise<{ success: boolean; message: string; details?: string }> => {
    const diag = getDiagnostics();
    if (diag.isPlaceholder) return { success: false, message: "PLACEHOLDER DETECTED", details: "Pasted example URL instead of real URL." };
    if (diag.isNameError) return { success: false, message: "KEY NAME ERROR", details: "Vercel keys incorrect." };
    if (diag.isSecretKeyError) return { success: false, message: "WRONG KEY", details: "Use the 'anon' key from Supabase." };
    
    const client = getSupabase();
    if (!client) return { success: false, message: "CONFIG MISSING", details: "Vercel URL/Key not detected." };

    try {
      const { error, status } = await client.from('products').select('id').limit(1);
      if (error) {
          if (status === 404) return { success: false, message: "TABLE MISSING", details: "Run SQL Script in Supabase Editor!" };
          return { success: false, message: "CLOUD ERROR", details: error.message };
      }
      return { success: true, message: "GLOBAL SYNC: ON" };
    } catch (e: any) {
      return { success: false, message: "SYSTEM ERROR", details: e.message || "Connection failed." };
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
