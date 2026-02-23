import { useQuery } from '@tanstack/react-query';
import { api } from '../lib/api';

interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string | null;
  parent_id?: string | null;
  _count?: { products: number };
}

const fetchCategories = async (): Promise<Category[]> => {
  const { data } = await api.get('/categories');
  // Handle nested structure similar to how it was handled in components
  return data.data?.categories || data.categories || data.data || data || [];
};

export const useCategories = () => {
  return useQuery({
    queryKey: ['categories'],
    queryFn: fetchCategories,
    staleTime: 1000 * 60 * 60, // Categories change rarely, cache for 1 hour
  });
};
