import { useQuery } from '@tanstack/react-query';
import { productService, type ProductFilters } from '../lib/services/productService';

export const useProducts = (filters: ProductFilters = {}) => {
  return useQuery({
    queryKey: ['products', filters],
    queryFn: () => productService.getAll(filters),
  });
};

export const useProduct = (id: string) => {
  return useQuery({
    queryKey: ['product', id],
    queryFn: () => productService.getById(id),
    enabled: !!id,
  });
};

// Hook for fetching a product by slug (if needed)
export const useProductBySlug = (slug: string) => {
  return useQuery({
    queryKey: ['product', 'slug', slug],
    queryFn: () => productService.getBySlug(slug),
    enabled: !!slug,
  });
};
