import { api } from '../../../lib/api';
import type { Product } from '../../../types';
import type { ApiResponse, PaginatedResponse } from '../../../types/api';

export const productApi = {
  getProducts: async (): Promise<Product[]> => {
    const { data } = await api.get<ApiResponse<PaginatedResponse<Product>>>('/products');
    return data.data?.products || [];
  },
};