import { createClient } from '@supabase/supabase-js';
import { Product, Order } from '../types';

/**
 * DATABASE CONFIGURATION
 * These variables must be set in your Vercel Environment Variables.
 * Recommended: VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY
 */

const getEnv = (key: string) => {
  // Try the exact key, then try without VITE_ prefix if it had it, or with it if it didn't.
  const alternativeKey = key.startsWith('VITE_') ? key.replace('VITE_', '') : `VITE_${key}`;
  const keysToTry = [key, alternativeKey];

  for (const k of keysToTry) {
    // 1. Try process.env (Vercel/Node style)
    if (typeof process !== 'undefined' && process.env && process.env[k]) return process.env[k];
    
    // 2. Try import.meta.env (Vite/ESM style)
    // @ts-ignore
    if (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env[k]) return import.meta.env[k];
    
    // 3. Try globalThis (Edge cases)
    // @ts-ignore
    if (typeof globalThis !== 'undefined' && globalThis[k]) return globalThis[k];
  }
  return '';
};

const SUPABASE_URL = getEnv('VITE_SUPABASE_URL');
const SUPABASE_ANON_KEY = getEnv('VITE_SUPABASE_ANON_KEY');

// Verify configuration - allow anything that isn't empty or the default placeholder
const isConfigured = SUPABASE_URL.length > 10 && !SUPABASE_URL.includes('your-project-id');

export const supabase = isConfigured 
  ? createClient(SUPABASE_URL, SUPABASE_ANON_KEY) 
  : null;

export const dbService = {
  checkConnection: async (): Promise<{ success: boolean; message: string }> => {
    if (!supabase) {
      return { 
        success: false, 
        message: "Database Configuration Missing. Check Vercel Env Vars." 
      };
    }
    try {
      // Test the connection by hitting the products table
      const { error } = await supabase.from('products').select('count', { count: 'exact', head: true });
      if (error) throw error;
      return { success: true, message: "Cloud Connection Active" };
    } catch (e: any) {
      return { success: false, message: e.message || "Table 'products' not found. Run the SQL script." };
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
      throw new Error("Database not configured. \n\nCommon fixes:\n1. Ensure 'products' table exists in Supabase.\n2. Ensure VITE_SUPABASE_URL is correct in Vercel.");
    }
    
    const cleanProduct = { ...product };
    
    // Standard UUID format check
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
    
    // If ID is missing or not a valid UUID, let Supabase handle generation
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
    try {
      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .order('created_at', { ascending: false });

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