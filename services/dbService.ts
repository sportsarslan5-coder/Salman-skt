import { createClient } from '@supabase/supabase-js';
import { Product, Order } from '../types';

// IMPORTANT: Replace these with your actual Supabase credentials for the global DB to work.
// You can get these from your Supabase Project Settings > API.
const SUPABASE_URL = (typeof process !== 'undefined' && process.env.VITE_SUPABASE_URL) || 'https://your-project-id.supabase.co';
const SUPABASE_ANON_KEY = (typeof process !== 'undefined' && process.env.VITE_SUPABASE_ANON_KEY) || 'your-anon-key';

const isConfigured = SUPABASE_URL !== 'https://your-project-id.supabase.co' && SUPABASE_ANON_KEY !== 'your-anon-key';

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export const dbService = {
  checkConnection: async (): Promise<{ success: boolean; message: string }> => {
    if (!isConfigured) {
        return { success: false, message: "Supabase credentials not configured in dbService.ts or Vercel Env Vars." };
    }
    try {
        const { error } = await supabase.from('products').select('count', { count: 'exact', head: true });
        if (error) throw error;
        return { success: true, message: "Connected to Cloud Database" };
    } catch (e: any) {
        return { success: false, message: e.message || "Database connection failed" };
    }
  },

  // --- PRODUCT CRUD (GLOBAL) ---
  getProducts: async (): Promise<Product[]> => {
    if (!isConfigured) {
        console.error("Supabase not configured. Please set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY.");
        return [];
    }
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .order('id', { ascending: false });
    
    if (error) {
      console.error('Error fetching global products:', error.message, error.details);
      return [];
    }
    return data || [];
  },

  saveProduct: async (product: Product) => {
    const { data, error } = await supabase
      .from('products')
      .upsert(product)
      .select();

    if (error) {
      console.error('Error saving product to cloud:', error.message, error.details);
      throw new Error(error.message);
    }
    return data;
  },

  deleteProduct: async (id: number) => {
    const { error } = await supabase
      .from('products')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting product from cloud:', error.message, error.details);
      throw new Error(error.message);
    }
  },

  // --- ORDER MANAGEMENT (GLOBAL) ---
  getOrders: async (): Promise<Order[]> => {
    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .order('date', { ascending: false });

    if (error) {
      console.error('Error fetching global orders:', error.message, error.details);
      return [];
    }
    return data || [];
  },

  saveOrder: async (order: Order) => {
    const { data, error } = await supabase
      .from('orders')
      .insert(order)
      .select();

    if (error) {
      console.error('Error saving order to cloud:', error.message, error.details);
      throw new Error(error.message);
    }
    return data;
  },

  deleteOrder: async (id: string) => {
    const { error } = await supabase
      .from('orders')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting order from cloud:', error.message, error.details);
      throw new Error(error.message);
    }
  }
};