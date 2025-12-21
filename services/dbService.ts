import { Product, Order } from '../types';
import { PRODUCTS as INITIAL_PRODUCTS } from '../constants';

const PRODUCTS_KEY = 'skt_shop_products_v1';
const ORDERS_KEY = 'skt_shop_orders_v1';

export const dbService = {
  // --- PRODUCT CRUD ---
  getProducts: (): Product[] => {
    const stored = localStorage.getItem(PRODUCTS_KEY);
    if (!stored) {
      localStorage.setItem(PRODUCTS_KEY, JSON.stringify(INITIAL_PRODUCTS));
      return INITIAL_PRODUCTS;
    }
    return JSON.parse(stored);
  },

  saveProduct: (product: Product) => {
    const products = dbService.getProducts();
    const index = products.findIndex(p => p.id === product.id);
    if (index > -1) {
      products[index] = product;
    } else {
      products.unshift(product);
    }
    localStorage.setItem(PRODUCTS_KEY, JSON.stringify(products));
    return products;
  },

  deleteProduct: (id: number) => {
    const products = dbService.getProducts().filter(p => p.id !== id);
    localStorage.setItem(PRODUCTS_KEY, JSON.stringify(products));
    return products;
  },

  // --- ORDER MANAGEMENT ---
  getOrders: (): Order[] => {
    const stored = localStorage.getItem(ORDERS_KEY);
    return stored ? JSON.parse(stored) : [];
  },

  saveOrder: (order: Order) => {
    const orders = dbService.getOrders();
    orders.unshift(order);
    localStorage.setItem(ORDERS_KEY, JSON.stringify(orders));
    return orders;
  },

  deleteOrder: (id: string) => {
    const orders = dbService.getOrders().filter(o => o.id !== id);
    localStorage.setItem(ORDERS_KEY, JSON.stringify(orders));
    return orders;
  }
};