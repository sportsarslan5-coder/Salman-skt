import { createClient } from '@supabase/supabase-js';
import { Product, Order } from '../types';

/**
 * DATABASE CONFIGURATION
 * These variables must be set in your Vercel Environment Variables.
 * VITE_SUPABASE_URL
 * VITE_SUPABASE_ANON_KEY
 */

const getEnv = (key: string) => {
  // Try various ways environment variables are injected in modern frontend environments
  if (typeof process !== 'undefined' && process.env && process.env[key]) return process.env[key];
  // @ts-ignore
  if (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env[key]) return import.meta.env[key];
  // Check globalThis for some edge cases
  // @ts-ignore
  if (typeof globalThis !== 'undefined' && globalThis[key]) return globalThis[key];
  return '';
};

const SUPABASE_URL = getEnv('VITE_SUPABASE_URL');
const SUPABASE_ANON_KEY = getEnv('VITE_SUPABASE_ANON_KEY');

const isConfigured = SUPABASE_URL.length > 0 && !SUPABASE_URL.includes('your-project-id');

// Create a single supabase client instance
export const supabase = isConfigured 
  ? createClient(SUPABASE_URL, SUPABASE_ANON_KEY) 
  : null;

export const dbService = {
  checkConnection: async (): Promise<{ success: boolean; message: string }> => {
    if (!supabase) {
      return { 
        success: false, 
        message: "Supabase credentials missing. Add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to Vercel Settings." 
      };
    }
    try {
      const { error } = await supabase.from('products').select('count', { count: 'exact', head: true });
      if (error) throw error;
      return { success: true, message: "Cloud Database Online" };
    } catch (e: any) {
      return { success: false, message: e.message || "Connection failed. Run the SQL script in Supabase Dashboard." };
    }
  },

  getProducts: async (): Promise<Product[]> => {
    if (!supabase) return [];
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) {
      console.error('Fetch Products Error:', error.message);
      return [];
    }
    return data || [];
  },

  saveProduct: async (product: Partial<Product>) => {
    if (!supabase) throw new Error("Database not configured");
    
    const cleanProduct = { ...product };
    
    // UUID validation: If ID is not a valid UUID format, remove it so Supabase generates a new one.
    // This prevents "invalid input syntax for type uuid" errors from Date.now() strings.
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-12a-f]{12}$/i;
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
    const { error } = await supabase
      .from('products')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Delete Product Error:', error.message);
      throw new Error(error.message);
    }
  },

  getOrders: async (): Promise<Order[]> => {
    if (!supabase) return [];
    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Fetch Orders Error:', error.message);
      return [];
    }
    return data || [];
  },

  saveOrder: async (order: Partial<Order>) => {
    if (!supabase) throw new Error("Database not configured");
    
    const cleanOrder = { ...order };
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-12a-f]{12}$/i;
    if (cleanOrder.id && !uuidRegex.test(cleanOrder.id)) {
      delete cleanOrder.id;
    }

    const { data, error } = await supabase
      .from('orders')
      .insert(cleanOrder)
      .select();

    if (error) {
      console.error('Save Order Error:', error.message);
      throw new Error(error.message);
    }
    return data[0];
  },

  deleteOrder: async (id: string) => {
    if (!supabase) throw new Error("Database not configured");
    const { error } = await supabase
      .from('orders')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Delete Order Error:', error.message);
      throw new Error(error.message);
    }
  }
};