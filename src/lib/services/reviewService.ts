import { api } from '../api';
import type { ApiResponse } from '../../types/api';
import type { Review } from '../../types';

export interface CreateReviewData {
  product_id: string;
  rating: number;
  comment?: string;
}

export const reviewService = {
  getProductReviews: async (productId: string, params?: { page?: number; limit?: number; rating?: number }) => {
    const searchParams = new URLSearchParams();
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined) searchParams.append(key, String(value));
      });
    }
    const query = searchParams.toString();
    const { data } = await api.get<ApiResponse<{ reviews: Review[]; total: number }>>(`/reviews/products/${productId}${query ? `?${query}` : ''}`);
    return data.data;
  },

  getById: async (id: string) => {
    const { data } = await api.get<ApiResponse<Review>>(`/reviews/${id}`);
    return data.data;
  },

  getMyReviews: async () => {
    const { data } = await api.get<ApiResponse<Review[]>>('/reviews/user/me');
    return data.data;
  },

  create: async (reviewData: CreateReviewData) => {
    const { data } = await api.post<ApiResponse<Review>>('/reviews', reviewData);
    return data.data;
  },

  update: async (id: string, reviewData: Partial<{ rating: number; comment: string }>) => {
    const { data } = await api.patch<ApiResponse<Review>>(`/reviews/${id}`, reviewData);
    return data.data;
  },

  delete: async (id: string) => {
    const { data } = await api.delete(`/reviews/${id}`);
    return data;
  },
};
