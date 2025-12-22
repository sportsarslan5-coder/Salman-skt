import { createClient } from '@supabase/supabase-js';
import { Product, Order } from '../types';

/**
 * DATABASE CONFIGURATION
 * These variables must be set in your Vercel Environment Variables.
 * Names: VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY
 */

const getEnv = (key: string) => {
  // Check for the key and its alternative (with/without VITE_ prefix)
  const altKey = key.startsWith('VITE_') ? key.replace('VITE_', '') : `VITE_${key}`;
  const keysToTry = [key, altKey];

  for (const k of keysToTry) {
    // 1. Try process.env (Vercel/Node environment)
    if (typeof process !== 'undefined' && process.env && process.env[k]) return process.env[k];
    
    // 2. Try import.meta.env (Vite/Local environment)
    // @ts-ignore
    if (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env[k]) return import.meta.env[k];
    
    // 3. Try globalThis (Edge cases)
    // @ts-ignore
    if (typeof globalThis !== 'undefined' && globalThis[k]) return globalThis[k];
  }
  return '';
};

const URL = getEnv('VITE_SUPABASE_URL');
const KEY = getEnv('VITE_SUPABASE_ANON_KEY');

// Verify configuration: must be longer than a placeholder string
const isConfigured = URL.length > 15 && !URL.includes('your-project-id');

export const supabase = isConfigured 
  ? createClient(URL, KEY) 
  : null;

export const dbService = {
  isConfigured: () => isConfigured,

  checkConnection: async (): Promise<{ success: boolean; message: string; details?: string }> => {
    if (!supabase) {
      return { 
        success: false, 
        message: "Configuration Missing",
        details: "VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY are not set in Vercel."
      };
    }
    try {
      const { error } = await supabase.from('products').select('count', { count: 'exact', head: true });
      if (error) throw error;
      return { success: true, message: "Cloud Database Online" };
    } catch (e: any) {
      return { 
        success: false, 
        message: "Table Error",
        details: e.message || "Make sure you ran the 'CREATE TABLE products' script in Supabase SQL Editor."
      };
    }
  },

  getProducts: async (): Promise<Product[]> => {
    if (!supabase) return [];
    try {
      const { data, error } = await supabase
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
    if (!supabase) {
      throw new Error("DATABASE_NOT_CONFIGURED");
    }
    
    const cleanProduct = { ...product };
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
    
    // Remove invalid IDs so Supabase creates a proper UUID
    if (!cleanProduct.id || !uuidRegex.test(cleanProduct.id)) {
      delete cleanProduct.id;
    }

    const { data, error } = await supabase
      .from('products')
      .upsert(cleanProduct)
      .select();

    if (error) {
      console.error('Save Product Error:', error.message);
      throw new Error(error.message);
    }
    return data[0];
  },

  deleteProduct: async (id: string) => {
    if (!supabase) throw new Error("Database not configured");
    const { error } = await supabase.from('products').delete().eq('id', id);
    if (error) throw new Error(error.message);
  },

  getOrders: async (): Promise<Order[]> => {
    if (!supabase) return [];
    try {
      const { data, error } = await supabase.from('orders').select('*').order('created_at', { ascending: false });
      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Fetch Orders Error:', error);
      return [];
    }
  },

  saveOrder: async (order: Partial<Order>) => {
    if (!supabase) throw new Error("Database not configured");
    const cleanOrder = { ...order };
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
    if (cleanOrder.id && !uuidRegex.test(cleanOrder.id)) delete cleanOrder.id;

    const { data, error } = await supabase.from('orders').insert(cleanOrder).select();
    if (error) throw new Error(error.message);
    return data[0];
  },

  deleteOrder: async (id: string) => {
    if (!supabase) throw new Error("Database not configured");
    const { error } = await supabase.from('orders').delete().eq('id', id);
    if (error) throw new Error(error.message);
  }
};