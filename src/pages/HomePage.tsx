import {
  BookOpen,
  Car,
  ChevronRight,
  Cpu,
  Dumbbell,
  Gamepad2,
  Gem,
  Home,
  Leaf,
  Shirt,
  ShoppingBag,
  Sparkles,
  Watch,
  type LucideIcon,
} from "lucide-react";
import { Link } from "react-router-dom";
import ProductCard from "../components/product/ProductCard";
import { useCategories } from "../hooks/useCategories";
import { useProducts } from "../hooks/useProducts";

const CATEGORY_ICONS: Record<string, LucideIcon> = {
  electronics: Cpu,
  computers: Cpu,
  fashion: Shirt,
  clothing: Shirt,
  apparel: Shirt,
  beauty: Sparkles,
  cosmetics: Sparkles,
  skincare: Sparkles,
  home: Home,
  "home & living": Home,
  furniture: Home,
  sports: Dumbbell,
  fitness: Dumbbell,
  books: BookOpen,
  education: BookOpen,
  accessories: Watch,
  watches: Watch,
  jewelry: Gem,
  toys: Gamepad2,
  games: Gamepad2,
  groceries: Leaf,
  food: Leaf,
  automotive: Car,
  vehicles: Car,
};

const getCategoryIcon = (name: string): LucideIcon => {
  const key = name.toLowerCase().trim();
  if (CATEGORY_ICONS[key]) return CATEGORY_ICONS[key];
  // partial match
  for (const [k, Icon] of Object.entries(CATEGORY_ICONS)) {
    if (key.includes(k) || k.includes(key)) return Icon;
  }
  return ShoppingBag;
};

const HomePage = () => {
  const { data: productsData, isLoading: productsLoading } = useProducts();
  const products = productsData?.products || [];
  const { data: categories = [], isLoading: categoriesLoading } =
    useCategories();

  const loading = productsLoading || categoriesLoading;

  return (
    <div className="daraz-container pt-4 pb-12">
      {/* 1. Hero Section: Slider + Categories */}
      <div className="grid grid-cols-12 gap-4 h-[344px] mb-8">
        {/* Categories Sidebar */}
        <div className="col-span-2 bg-white rounded-sm shadow-card p-3 hidden md:block overflow-hidden">
          <ul className="space-y-2 text-xs text-gray-600">
            {categories.length > 0
              ? categories.slice(0, 12).map((cat) => (
                  <li key={cat.id}>
                    <Link
                      to={`/products?category=${cat.id}`}
                      className="hover:text-primary hover:bg-gray-50 p-1 cursor-pointer flex justify-between group transition-colors"
                    >
                      <span>{cat.name}</span>
                      <ChevronRight className="w-3 h-3 opacity-0 group-hover:opacity-100" />
                    </Link>
                  </li>
                ))
              : [
                  "Electronics",
                  "Fashion",
                  "Home & Living",
                  "Beauty",
                  "Sports",
                  "Toys",
                  "Groceries",
                  "Automotive",
                ].map((cat, idx) => (
                  <li
                    key={idx}
                    className="hover:text-primary hover:bg-gray-50 p-1 cursor-pointer flex justify-between group transition-colors"
                  >
                    <span>{cat}</span>
                    <ChevronRight className="w-3 h-3 opacity-0 group-hover:opacity-100" />
                  </li>
                ))}
          </ul>
        </div>

        {/* Main Slider */}
        <div className="col-span-12 md:col-span-10 bg-gray-200 rounded-sm relative overflow-hidden group">
          <div className="w-full h-full bg-gradient-to-r from-orange-500 to-red-600 flex items-center justify-center text-white flex-col">
            <h1 className="text-4xl font-bold mb-4">Welcome to Atom Drops</h1>
            <p className="text-lg mb-6">
              Best deals on Electronics, Fashion & more!
            </p>
            <Link
              to="/products"
              className="px-6 py-2 bg-white text-orange-600 font-bold rounded-full hover:bg-gray-100 transition"
            >
              Shop Now
            </Link>
          </div>
        </div>
      </div>

      {/* 2. Category Pills */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-8">
        {(categories.length > 0
          ? categories.slice(0, 5)
          : [
              { id: "1", name: "Electronics", slug: "electronics" },
              { id: "2", name: "Fashion", slug: "fashion" },
              { id: "3", name: "Beauty", slug: "beauty" },
              { id: "4", name: "Home", slug: "home" },
              { id: "5", name: "Sports", slug: "sports" },
            ]
        ).map((item) => {
          const Icon = getCategoryIcon(item.name);
          return (
            <Link
              key={item.id}
              to={`/products?category=${item.id}`}
              className="bg-white rounded-full py-2 px-4 shadow-sm flex items-center justify-center gap-2 cursor-pointer hover:shadow-md hover:border-primary border border-transparent transition group"
            >
              <span className="w-7 h-7 rounded-full bg-orange-100 flex items-center justify-center shrink-0 group-hover:bg-orange-200 transition-colors">
                <Icon className="w-4 h-4 text-primary" />
              </span>
              <span className="text-sm font-medium text-gray-700 group-hover:text-primary transition-colors">
                {item.name}
              </span>
            </Link>
          );
        })}
      </div>

      {/* 3. Flash Sale */}
      <div className="mb-8">
        <h2 className="text-2xl text-gray-700 mb-4 font-light">Flash Sale</h2>
        <div className="bg-white p-4 rounded-sm border-b-4 border-primary">
          <div className="flex justify-between items-center mb-4 border-b border-gray-100 pb-2">
            <div className="flex gap-4 items-center">
              <span className="text-primary font-bold">On Sale Now</span>
              <div className="flex gap-2">
                <span className="bg-black text-white px-1 text-xs rounded">
                  02
                </span>
                :
                <span className="bg-black text-white px-1 text-xs rounded">
                  45
                </span>
                :
                <span className="bg-black text-white px-1 text-xs rounded">
                  18
                </span>
              </div>
            </div>
            <Link
              to="/products"
              className="text-primary border border-primary px-4 py-1 text-sm uppercase hover:bg-orange-50 font-medium"
            >
              Shop All
            </Link>
          </div>

          {/* Flash Items */}
          <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
            {loading ? (
              [...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className="h-48 bg-gray-100 animate-pulse rounded"
                ></div>
              ))
            ) : products.length > 0 ? (
              products
                .slice(0, 6)
                .map((product) => (
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
            [...Array(12)].map((_, i) => (
              <div
                key={i}
                className="h-64 bg-gray-100 animate-pulse rounded"
              ></div>
            ))
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
            <Link
              to="/products"
              className="border-2 border-primary text-primary px-10 py-2 font-bold hover:bg-primary hover:text-white transition uppercase text-sm"
            >
              Load More
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
