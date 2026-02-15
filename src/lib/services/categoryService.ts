import { api } from '../api';
import type { ApiResponse } from '../../types/api';
import type { Category, Product } from '../../types';

export const categoryService = {
  getAll: async (includeProducts = false) => {
    const params = includeProducts ? '?includeProducts=true' : '';
    const { data } = await api.get<ApiResponse<Category[]>>(`/categories${params}`);
    return data.data;
  },

  getById: async (id: string) => {
    const { data } = await api.get<ApiResponse<Category>>(`/categories/${id}`);
    return data.data;
  },

  getBySlug: async (slug: string) => {
    const { data } = await api.get<ApiResponse<Category>>(`/categories/slug/${slug}`);
    return data.data;
  },

  getProducts: async (categoryId: string, params?: { page?: number; limit?: number; sortBy?: string }) => {
    const searchParams = new URLSearchParams();
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined) searchParams.append(key, String(value));
      });
    }
    const query = searchParams.toString();
    const { data } = await api.get<ApiResponse<{ products: Product[]; total: number }>>(`/categories/${categoryId}/products${query ? `?${query}` : ''}`);
    return data.data;
  },

  // Admin operations
  create: async (categoryData: { name: string; description?: string; parent_id?: string }) => {
    const { data } = await api.post<ApiResponse<Category>>('/categories', categoryData);
    return data.data;
  },

  update: async (id: string, categoryData: Partial<{ name: string; description: string }>) => {
    const { data } = await api.patch<ApiResponse<Category>>(`/categories/${id}`, categoryData);
    return data.data;
  },

  delete: async (id: string) => {
    const { data } = await api.delete(`/categories/${id}`);
    return data;
  },
};
