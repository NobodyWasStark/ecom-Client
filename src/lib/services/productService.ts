import { api } from '../api';
import type { ApiResponse, PaginatedResponse } from '../../types/api';
import type { Product, ProductImage } from '../../types';

export interface ProductFilters {
  search?: string;
  category_id?: string;
  minPrice?: number;
  maxPrice?: number;
  inStock?: boolean;
  sortBy?: 'price_asc' | 'price_desc' | 'newest' | 'oldest';
  page?: number;
  limit?: number;
}

export const productService = {
  getAll: async (filters: ProductFilters = {}) => {
    const params = new URLSearchParams();
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== '') {
        params.append(key, String(value));
      }
    });
    const { data } = await api.get<ApiResponse<PaginatedResponse<Product>>>(`/products?${params}`);
    return data.data;
  },

  getById: async (id: string) => {
    const { data } = await api.get<ApiResponse<Product>>(`/products/${id}`);
    return data.data;
  },

  getBySlug: async (slug: string) => {
    const { data } = await api.get<ApiResponse<Product>>(`/products/slug/${slug}`);
    return data.data;
  },

  // Admin operations
  create: async (productData: Partial<Product>) => {
    const { data } = await api.post<ApiResponse<Product>>('/products', productData);
    return data.data;
  },

  update: async (id: string, productData: Partial<Product>) => {
    const { data } = await api.patch<ApiResponse<Product>>(`/products/${id}`, productData);
    return data.data;
  },

  delete: async (id: string) => {
    const { data } = await api.delete(`/products/${id}`);
    return data;
  },

  addImage: async (productId: string, imageData: { url: string; alt_text?: string; is_primary?: boolean; order?: number }) => {
    const { data } = await api.post<ApiResponse<ProductImage>>(`/products/${productId}/images`, imageData);
    return data.data;
  },

  deleteImage: async (productId: string, imageId: string) => {
    const { data } = await api.delete(`/products/${productId}/images/${imageId}`);
    return data;
  },

  setPrimaryImage: async (productId: string, imageId: string) => {
    const { data } = await api.patch(`/products/${productId}/images/${imageId}/primary`);
    return data;
  },
};
