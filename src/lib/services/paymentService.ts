import { api } from '../api';
import type { ApiResponse } from '../../types/api';

export const paymentService = {
  initiate: async (orderId: string) => {
    const { data } = await api.post<ApiResponse<{ payment_url?: string; payment_id: string }>>('/payments/initiate', { order_id: orderId });
    return data.data;
  },

  execute: async (paymentId: string) => {
    const { data } = await api.post<ApiResponse<{ status: string }>>('/payments/execute', { payment_id: paymentId });
    return data.data;
  },
};
