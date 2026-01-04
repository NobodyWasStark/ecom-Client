import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../lib/api';
import type { Product } from '../types';
import ProductCard from '../components/product/ProductCard';

interface Category {
  id: string;
  name: string;
  slug: string;
}

const HomePage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Flash Sale countdown timer - 3 hours from page load
  const [timeLeft, setTimeLeft] = useState(() => {
    // Check if we have a stored end time in sessionStorage
    const storedEndTime = sessionStorage.getItem('flashSaleEndTime');
    if (storedEndTime) {
      const remaining = Math.max(0, Math.floor((parseInt(storedEndTime) - Date.now()) / 1000));
      if (remaining > 0) return remaining;
    }
    // Set new end time (3 hours from now)
    const endTime = Date.now() + 3 * 60 * 60 * 1000;
    sessionStorage.setItem('flashSaleEndTime', endTime.toString());
    return 3 * 60 * 60; // 3 hours in seconds
  });

  useEffect(() => {
    fetchData();
  }, []);

  // Countdown timer effect
  useEffect(() => {
    if (timeLeft <= 0) {
      // Reset timer when it reaches 0 (new flash sale cycle)
      const newEndTime = Date.now() + 3 * 60 * 60 * 1000;
      sessionStorage.setItem('flashSaleEndTime', newEndTime.toString());
      setTimeLeft(3 * 60 * 60);
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          // Reset to 3 hours when timer expires
          const newEndTime = Date.now() + 3 * 60 * 60 * 1000;
          sessionStorage.setItem('flashSaleEndTime', newEndTime.toString());
          return 3 * 60 * 60;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  // Format time for display
  const hours = String(Math.floor(timeLeft / 3600)).padStart(2, '0');
  const minutes = String(Math.floor((timeLeft % 3600) / 60)).padStart(2, '0');
  const seconds = String(timeLeft % 60).padStart(2, '0');

  const fetchData = async () => {
    try {
      const [productsRes, categoriesRes] = await Promise.all([
        api.get('/products'),
        api.get('/categories'),
      ]);
      // Handle nested structure: { data: { products: [...] } }
      const productsData = productsRes.data?.data?.products || productsRes.data?.products || productsRes.data?.data || productsRes.data || [];
      const categoriesData = categoriesRes.data?.data?.categories || categoriesRes.data?.categories || categoriesRes.data?.data || categoriesRes.data || [];
      setProducts(Array.isArray(productsData) ? productsData : []);
      setCategories(Array.isArray(categoriesData) ? categoriesData : []);
    } catch (error) {
      console.error("Failed to fetch data", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="daraz-container pt-4 pb-12">
      {/* 1. Hero Section: Slider + Categories */}
      <div className="grid grid-cols-12 gap-4 h-[344px] mb-8">
        {/* Categories Sidebar */}
        <div className="col-span-2 bg-white rounded-sm shadow-card hidden md:block overflow-y-auto">
          <ul className="py-2">
            {categories.length > 0 ? (
              categories.slice(0, 10).map((cat) => (
                <li key={cat.id}>
                  <Link 
                    to={`/products?category=${cat.id}`}
                    className="block px-4 py-2.5 text-sm text-gray-700 hover:text-primary hover:bg-orange-50 cursor-pointer transition-colors border-l-2 border-transparent hover:border-primary"
                  >
                    {cat.name}
                  </Link>
                </li>
              ))
            ) : (
              ['Electronics', 'Fashion', 'Home & Living', 'Beauty', 'Sports', 'Toys', 'Groceries', 'Automotive'].map((cat, idx) => (
                <li key={idx}>
                  <span className="block px-4 py-2.5 text-sm text-gray-700 hover:text-primary hover:bg-orange-50 cursor-pointer transition-colors border-l-2 border-transparent hover:border-primary">
                    {cat}
                  </span>
                </li>
              ))
            )}
          </ul>
        </div>
        
        {/* Main Slider */}
        <div className="col-span-12 md:col-span-10 bg-gray-200 rounded-sm relative overflow-hidden group">
          <div className="w-full h-full bg-gradient-to-r from-orange-500 to-red-600 flex items-center justify-center text-white flex-col">
            <h1 className="text-4xl font-bold mb-4">Welcome to Atom Drops</h1>
            <p className="text-lg mb-6">Best deals on Electronics, Fashion & more!</p>
            <Link to="/products" className="px-6 py-2 bg-white text-orange-600 font-bold rounded-full hover:bg-gray-100 transition">
              Shop Now
            </Link>
          </div>
        </div>
      </div>

      {/* 2. Category Pills */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-8">
        {(categories.length > 0 ? categories.slice(0, 5) : [
          { id: '1', name: 'Electronics', slug: 'electronics' },
          { id: '2', name: 'Fashion', slug: 'fashion' },
          { id: '3', name: 'Beauty', slug: 'beauty' },
          { id: '4', name: 'Home', slug: 'home' },
          { id: '5', name: 'Sports', slug: 'sports' },
        ]).map((item) => (
          <Link 
            key={item.id}
            to={`/products?category=${item.id}`}
            className="bg-white rounded-full py-2 px-4 shadow-sm flex items-center justify-center gap-2 cursor-pointer hover:shadow-md transition"
          >
            <div className="w-6 h-6 rounded-full bg-orange-100"></div>
            <span className="text-sm font-medium">{item.name}</span>
          </Link>
        ))}
      </div>

      {/* 3. Flash Sale */}
      <div className="mb-8">
        <h2 className="text-2xl text-gray-700 mb-4 font-light">Flash Sale</h2>
        <div className="bg-white p-4 rounded-sm border-b-4 border-primary">
          <div className="flex justify-between items-center mb-4 border-b border-gray-100 pb-2">
            <div className="flex gap-4 items-center">
              <span className="text-primary font-bold">On Sale Now</span>
              <div className="flex gap-2 items-center">
                <span className="bg-black text-white px-2 py-1 text-sm font-mono rounded min-w-[28px] text-center">{hours}</span>
                <span className="text-gray-600 font-bold">:</span>
                <span className="bg-black text-white px-2 py-1 text-sm font-mono rounded min-w-[28px] text-center">{minutes}</span>
                <span className="text-gray-600 font-bold">:</span>
                <span className="bg-black text-white px-2 py-1 text-sm font-mono rounded min-w-[28px] text-center">{seconds}</span>
              </div>
            </div>
            <Link to="/products" className="text-primary border border-primary px-4 py-1 text-sm uppercase hover:bg-orange-50 font-medium">
              Shop All
            </Link>
          </div>
          
          {/* Flash Items */}
          <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
            {loading ? (
              [...Array(6)].map((_, i) => <div key={i} className="h-48 bg-gray-100 animate-pulse rounded"></div>)
            ) : products.length > 0 ? (
              products.slice(0, 6).map((product) => (
                <ProductCard key={product.id} product={product} />
              ))
            ) : (
              <div className="col-span-6 text-center py-10 text-gray-500">
                No products available yet
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 4. Just For You */}
      <div>
        <h2 className="text-2xl text-gray-700 mb-4 font-light">Just For You</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {loading ? (
            [...Array(12)].map((_, i) => <div key={i} className="h-64 bg-gray-100 animate-pulse rounded"></div>)
          ) : products.length > 0 ? (
            products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))
          ) : (
            <div className="col-span-6 text-center py-10 text-gray-500">
              No products available yet
            </div>
          )}
        </div>
        {products.length > 0 && (
          <div className="mt-8 flex justify-center">
            <Link to="/products" className="border-2 border-primary text-primary px-10 py-2 font-bold hover:bg-primary hover:text-white transition uppercase text-sm">
              Load More
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
