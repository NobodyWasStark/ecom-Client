import { api } from '../api';
import type { ApiResponse } from '../../types/api';
import type { Order } from '../../types';

export interface CreateOrderData {
  items: Array<{ product_id: string; quantity: number }>;
  shipping_address_id: string;
}

export interface CreateOrderFromCartData {
  shipping_address_id: string;
}

export const orderService = {
  getMyOrders: async () => {
    const { data } = await api.get<ApiResponse<Order[]>>('/orders/my');
    return data.data;
  },

  getById: async (id: string) => {
    const { data } = await api.get<ApiResponse<Order>>(`/orders/${id}`);
    return data.data;
  },

  create: async (orderData: CreateOrderData) => {
    const { data } = await api.post<ApiResponse<Order>>('/orders', orderData);
    return data.data;
  },

  createFromCart: async (orderData: CreateOrderFromCartData) => {
    const { data } = await api.post<ApiResponse<Order>>('/orders/from-cart', orderData);
    return data.data;
  },

  cancel: async (id: string) => {
    const { data } = await api.patch<ApiResponse<Order>>(`/orders/${id}/cancel`);
    return data.data;
  },
};
