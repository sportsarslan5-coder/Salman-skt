import { createClient } from '@supabase/supabase-js';
import { Product, Order } from '../types';

/**
 * DATABASE CONFIGURATION
 * These variables must be set in your Vercel Environment Variables.
 * VITE_SUPABASE_URL
 * VITE_SUPABASE_ANON_KEY
 */

// @ts-ignore
const SUPABASE_URL = (typeof import.meta !== 'undefined' && import.meta.env ? import.meta.env.VITE_SUPABASE_URL : '') || '';
// @ts-ignore
const SUPABASE_ANON_KEY = (typeof import.meta !== 'undefined' && import.meta.env ? import.meta.env.VITE_SUPABASE_ANON_KEY : '') || '';

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
        message: "Supabase not configured. Please set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in Vercel." 
      };
    }
    try {
      const { error } = await supabase.from('products').select('count', { count: 'exact', head: true });
      if (error) throw error;
      return { success: true, message: "Cloud Database Online" };
    } catch (e: any) {
      return { success: false, message: e.message || "Connection failed. Check if table 'products' exists in Supabase." };
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
    
    // Remove ID if it's empty to allow Supabase to generate a UUID
    const cleanProduct = { ...product };
    if (!cleanProduct.id) delete cleanProduct.id;

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
    const { data, error } = await supabase
      .from('orders')
      .insert(order)
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