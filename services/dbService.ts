import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { Product, Order } from '../types';

let supabaseInstance: SupabaseClient | null = null;

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
            console.error("Supabase init failed", e);
            return null;
        }
    }
    return null;
};

export const dbService = {
  isConfigured: () => getSupabase() !== null,

  checkConnection: async (): Promise<{ success: boolean; message: string; details?: string }> => {
    const client = getSupabase();
    if (!client) {
      return { 
        success: false, 
        message: "Disconnected",
        details: "Supabase keys missing in Environment Variables."
      };
    }
    try {
      const { error } = await client.from('products').select('count', { count: 'exact', head: true });
      if (error) throw error;
      return { success: true, message: "Connected" };
    } catch (e: any) {
      return { 
        success: false, 
        message: "DB Error",
        details: e.message
      };
    }
  },

  getProducts: async (): Promise<Product[]> => {
    const client = getSupabase();
    if (!client) return [];
    try {
      const { data, error } = await client
        .from('products')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Fetch Products Error:', error);
      return [];
    }
  },

  saveProduct: async (product: Partial<Product>) => {
    const client = getSupabase();
    if (!client) throw new Error("DB_NOT_CONNECTED");
    
    const cleanProduct = { ...product };
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
    if (cleanProduct.id && !uuidRegex.test(cleanProduct.id)) delete cleanProduct.id;

    const { data, error } = await client.from('products').upsert(cleanProduct).select();
    if (error) throw new Error(error.message);
    return data ? data[0] : null;
  },

  deleteProduct: async (id: string) => {
    const client = getSupabase();
    if (!client) throw new Error("DB_NOT_CONNECTED");
    const { error } = await client.from('products').delete().eq('id', id);
    if (error) throw new Error(error.message);
  },

  getOrders: async (): Promise<Order[]> => {
    const client = getSupabase();
    if (!client) return [];
    try {
      const { data, error } = await client.from('orders').select('*').order('created_at', { ascending: false });
      if (error) throw error;
      return data || [];
    } catch (error) {
      return [];
    }
  },

  saveOrder: async (order: Partial<Order>) => {
    const client = getSupabase();
    if (!client) throw new Error("DB_NOT_CONNECTED");
    const { data, error } = await client.from('orders').insert(order).select();
    if (error) throw new Error(error.message);
    return data ? data[0] : null;
  }
};