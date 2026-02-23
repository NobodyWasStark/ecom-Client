import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Filter,
  Package,
  Search,
  Star,
  X,
} from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import ProductCard from "../components/product/ProductCard";
import { useCategories } from "../hooks/useCategories";
import { useProducts } from "../hooks/useProducts";

const RATING_OPTIONS = [5, 4, 3, 2, 1];

const QUICK_PRICE_RANGES = [
  { label: "Under ৳500", min: "", max: "500" },
  { label: "৳500 – ৳1000", min: "500", max: "1000" },
  { label: "৳1000 – ৳2000", min: "1000", max: "2000" },
  { label: "Over ৳2000", min: "2000", max: "" },
];

const ProductsPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  // ── Derive ALL filter state directly from URL params ──────────────────────
  const searchQuery = searchParams.get("search") || "";
  const categoryId = searchParams.get("category") || "";
  const minPriceParam = searchParams.get("minPrice") || "";
  const maxPriceParam = searchParams.get("maxPrice") || "";
  const sortByParam = (searchParams.get("sortBy") || "best") as
    | "best"
    | "price_asc"
    | "price_desc"
    | "newest";
  const minRatingParam = searchParams.get("minRating")
    ? Number(searchParams.get("minRating"))
    : undefined;
  const inStockParam = searchParams.get("inStock") === "true";
  const pageParam = searchParams.get("page")
    ? Number(searchParams.get("page"))
    : 1;

  // ── Local state only for unconfirmed price inputs & local search box ──────
  const [priceMin, setPriceMin] = useState(minPriceParam);
  const [priceMax, setPriceMax] = useState(maxPriceParam);
  const [localSearch, setLocalSearch] = useState(searchQuery);

  // Keep local inputs in sync when URL changes externally (e.g. "clear filters")
  useEffect(() => {
    setPriceMin(minPriceParam);
  }, [minPriceParam]);
  useEffect(() => {
    setPriceMax(maxPriceParam);
  }, [maxPriceParam]);
  useEffect(() => {
    setLocalSearch(searchQuery);
  }, [searchQuery]);

  // ── Utility: batch-update URL params and optionally reset page ─────────────
  const updateParams = useCallback(
    (updates: Record<string, string | null>, resetPage = true) => {
      setSearchParams((prev) => {
        const params = new URLSearchParams(prev);
        Object.entries(updates).forEach(([key, value]) => {
          if (value === null || value === "") {
            params.delete(key);
          } else {
            params.set(key, value);
          }
        });
        if (resetPage) params.delete("page");
        return params;
      });
    },
    [setSearchParams],
  );

  // ── Data fetching (all filters flow through URL → hook → API) ─────────────
  const { data: productsData, isLoading: isLoadingProducts } = useProducts({
    search: searchQuery || undefined,
    category_id: categoryId || undefined,
    minPrice: minPriceParam ? Number(minPriceParam) : undefined,
    maxPrice: maxPriceParam ? Number(maxPriceParam) : undefined,
    sortBy: sortByParam !== "best" ? sortByParam : undefined,
    minRating: minRatingParam,
    inStock: inStockParam || undefined,
    page: pageParam,
    limit: 20,
  });

  const { data: categories = [], isLoading: isLoadingCategories } =
    useCategories();

  const isLoading = isLoadingProducts || isLoadingCategories;
  const products = productsData?.products ?? [];
  const pagination = productsData?.pagination;
  const totalProducts = pagination?.total ?? 0;
  const totalPages = pagination?.totalPages ?? 1;

  const selectedCategoryName = categories.find(
    (c) => c.id === categoryId,
  )?.name;
  const hasActiveFilters = !!(
    categoryId ||
    minPriceParam ||
    maxPriceParam ||
    minRatingParam ||
    inStockParam
  );
  const activeFilterCount = [
    categoryId,
    minPriceParam || maxPriceParam,
    minRatingParam,
    inStockParam,
  ].filter(Boolean).length;

  // ── Handlers ───────────────────────────────────────────────────────────────
  const handleCategoryClick = (catId: string | null) =>
    updateParams({ category: catId || null });

  const handleLocalSearch = (e: React.FormEvent) => {
    e.preventDefault();
    updateParams({ search: localSearch.trim() || null });
  };

  const clearSearch = () => {
    setLocalSearch("");
    updateParams({ search: null });
  };

  const handleApplyPriceFilter = () => {
    const min = priceMin.trim();
    const max = priceMax.trim();
    if (min && max && Number(min) > Number(max)) {
      alert("Minimum price cannot be greater than maximum price.");
      return;
    }
    updateParams({ minPrice: min || null, maxPrice: max || null });
  };

  const handleQuickPrice = (min: string, max: string) => {
    setPriceMin(min);
    setPriceMax(max);
    updateParams({ minPrice: min || null, maxPrice: max || null });
  };

  const handleClearPrice = () => {
    setPriceMin("");
    setPriceMax("");
    updateParams({ minPrice: null, maxPrice: null });
  };

  const handleRatingClick = (stars: number) => {
    // Toggle: clicking the active rating clears it
    updateParams({
      minRating: minRatingParam === stars ? null : String(stars),
    });
  };

  const handleSortChange = (value: string) =>
    updateParams({ sortBy: value === "best" ? null : value }, false);

  const handleInStockChange = (checked: boolean) =>
    updateParams({ inStock: checked ? "true" : null });

  const handlePageChange = (page: number) => {
    updateParams({ page: String(page) }, false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const clearAllFilters = () => {
    const params = new URLSearchParams();
    if (searchQuery) params.set("search", searchQuery);
    setSearchParams(params);
    setPriceMin("");
    setPriceMax("");
  };

  // ── Shared filter panel (used in sidebar + mobile drawer) ─────────────────
  const FiltersPanel = (
    <div className="space-y-4">
      {/* Search */}
      <div className="bg-white p-4 shadow-card rounded-sm">
        <h3 className="font-bold text-sm mb-3 text-gray-700 flex items-center gap-2">
          <Search className="w-4 h-4" /> Search
        </h3>
        <form onSubmit={handleLocalSearch} className="flex gap-1">
          <input
            type="text"
            value={localSearch}
            onChange={(e) => setLocalSearch(e.target.value)}
            placeholder="Search products..."
            className="flex-1 border border-gray-300 px-3 py-2 text-sm rounded-sm outline-none focus:border-primary"
          />
          <button
            type="submit"
            className="bg-primary text-white px-3 py-2 rounded-sm hover:bg-primary-hover"
          >
            <Search className="w-4 h-4" />
          </button>
        </form>
      </div>

      {/* Categories */}
      <div className="bg-white p-4 shadow-card rounded-sm">
        <h3 className="font-bold text-sm mb-3 text-gray-700 flex items-center gap-2">
          <Filter className="w-4 h-4" /> Categories
        </h3>
        {isLoadingCategories ? (
          <div className="space-y-2">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="h-8 bg-gray-100 animate-pulse rounded-sm"
              />
            ))}
          </div>
        ) : (
          <ul className="space-y-0.5 text-sm">
            <li>
              <button
                onClick={() => handleCategoryClick(null)}
                className={`w-full text-left px-3 py-2 rounded-sm transition-colors ${
                  !categoryId
                    ? "bg-orange-50 text-primary font-semibold border-l-2 border-primary pl-2.5"
                    : "text-gray-600 hover:bg-gray-50"
                }`}
              >
                All Products
              </button>
            </li>
            {categories.map((cat) => (
              <li key={cat.id}>
                <button
                  onClick={() => handleCategoryClick(cat.id)}
                  className={`w-full text-left px-3 py-2 rounded-sm transition-colors flex items-center justify-between ${
                    categoryId === cat.id
                      ? "bg-orange-50 text-primary font-semibold border-l-2 border-primary pl-2.5"
                      : "text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  <span>{cat.name}</span>
                  {cat._count != null && (
                    <span className="text-xs text-gray-400">
                      ({cat._count.products})
                    </span>
                  )}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Price Range */}
      <div className="bg-white p-4 shadow-card rounded-sm">
        <h3 className="font-bold text-sm mb-3 text-gray-700">Price Range</h3>
        {/* Quick presets */}
        <div className="flex flex-wrap gap-1 mb-3">
          {QUICK_PRICE_RANGES.map((opt) => (
            <button
              key={opt.label}
              onClick={() => handleQuickPrice(opt.min, opt.max)}
              className={`text-xs px-2 py-1 rounded border transition-colors ${
                minPriceParam === opt.min && maxPriceParam === opt.max
                  ? "bg-primary text-white border-primary"
                  : "bg-gray-50 text-gray-600 border-gray-200 hover:border-primary hover:text-primary"
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
        {/* Custom range inputs */}
        <div className="flex items-center gap-2 mb-3">
          <input
            type="number"
            placeholder="Min"
            value={priceMin}
            min={0}
            onChange={(e) => setPriceMin(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleApplyPriceFilter()}
            className="w-full border border-gray-300 px-2 py-2 text-sm rounded-sm outline-none focus:border-primary"
          />
          <span className="text-gray-400 font-medium shrink-0">-</span>
          <input
            type="number"
            placeholder="Max"
            value={priceMax}
            min={0}
            onChange={(e) => setPriceMax(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleApplyPriceFilter()}
            className="w-full border border-gray-300 px-2 py-2 text-sm rounded-sm outline-none focus:border-primary"
          />
        </div>
        <button
          onClick={handleApplyPriceFilter}
          className="w-full bg-primary text-white text-sm py-2 rounded-sm hover:bg-primary-hover transition"
        >
          Apply
        </button>
        {(minPriceParam || maxPriceParam) && (
          <button
            onClick={handleClearPrice}
            className="w-full mt-2 text-xs text-gray-500 hover:text-red-500 flex items-center justify-center gap-1"
          >
            <X className="w-3 h-3" /> Clear price filter
          </button>
        )}
      </div>

      {/* In Stock */}
      <div className="bg-white p-4 shadow-card rounded-sm">
        <label className="flex items-center gap-3 cursor-pointer select-none">
          <input
            type="checkbox"
            checked={inStockParam}
            onChange={(e) => handleInStockChange(e.target.checked)}
            className="w-4 h-4 accent-primary rounded"
          />
          <div>
            <span className="text-sm font-bold text-gray-700 flex items-center gap-1.5">
              <Package className="w-4 h-4" /> In Stock Only
            </span>
            <p className="text-xs text-gray-400 mt-0.5">
              Hide out-of-stock items
            </p>
          </div>
        </label>
      </div>

      {/* Customer Ratings */}
      <div className="bg-white p-4 shadow-card rounded-sm">
        <h3 className="font-bold text-sm mb-3 text-gray-700">
          Customer Ratings
        </h3>
        <ul className="space-y-0.5">
          {RATING_OPTIONS.map((stars) => (
            <li key={stars}>
              <button
                onClick={() => handleRatingClick(stars)}
                className={`w-full flex items-center gap-2 px-2 py-2 rounded-sm text-sm transition-colors ${
                  minRatingParam === stars
                    ? "bg-orange-50 border-l-2 border-primary pl-1.5"
                    : "hover:bg-gray-50"
                }`}
              >
                <div className="flex shrink-0">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < stars
                          ? "text-yellow-400 fill-yellow-400"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-gray-500 text-xs">& Up</span>
                {minRatingParam === stars && (
                  <X className="w-3 h-3 text-gray-400 ml-auto" />
                )}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Clear All Filters */}
      {hasActiveFilters && (
        <button
          onClick={clearAllFilters}
          className="w-full bg-white border border-gray-300 text-gray-600 text-sm py-2 rounded-sm hover:border-red-400 hover:text-red-500 transition flex items-center justify-center gap-1"
        >
          <X className="w-4 h-4" /> Clear All Filters
        </button>
      )}
    </div>
  );

  // ── Pagination helper ──────────────────────────────────────────────────────
  const paginationPages: (number | "…")[] = Array.from(
    { length: totalPages },
    (_, i) => i + 1,
  )
    .filter((p) => p === 1 || p === totalPages || Math.abs(p - pageParam) <= 2)
    .reduce((acc: (number | "…")[], p, idx, arr) => {
      if (idx > 0 && (p as number) - (arr[idx - 1] as number) > 1)
        acc.push("…");
      acc.push(p);
      return acc;
    }, []);

  // ── Render ─────────────────────────────────────────────────────────────────
  return (
    <div className="daraz-container py-4">
      {/* Search Results Header */}
      {searchQuery && (
        <div className="bg-white p-4 shadow-card rounded-sm mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2 flex-wrap">
            <Search className="w-5 h-5 text-gray-400 shrink-0" />
            <span className="text-gray-600">Search results for:</span>
            <span className="font-bold text-gray-800">"{searchQuery}"</span>
          </div>
          <button
            onClick={clearSearch}
            className="flex items-center gap-1 text-sm text-gray-500 hover:text-red-500 shrink-0 ml-2"
          >
            <X className="w-4 h-4" /> Clear
          </button>
        </div>
      )}

      {/* Active Filter Chips */}
      {hasActiveFilters && (
        <div className="bg-white px-4 py-2.5 shadow-card rounded-sm mb-4 flex flex-wrap items-center gap-2">
          <span className="text-xs text-gray-500 font-medium">
            Active Filters:
          </span>

          {categoryId && selectedCategoryName && (
            <span className="flex items-center gap-1 bg-orange-50 text-primary text-xs px-2.5 py-1 rounded-full border border-orange-200">
              {selectedCategoryName}
              <button
                onClick={() => handleCategoryClick(null)}
                aria-label="Remove category filter"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          )}

          {(minPriceParam || maxPriceParam) && (
            <span className="flex items-center gap-1 bg-orange-50 text-primary text-xs px-2.5 py-1 rounded-full border border-orange-200">
              Price: {minPriceParam ? `৳${minPriceParam}` : "৳0"} –{" "}
              {maxPriceParam ? `৳${maxPriceParam}` : "∞"}
              <button
                onClick={handleClearPrice}
                aria-label="Remove price filter"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          )}

          {minRatingParam && (
            <span className="flex items-center gap-1 bg-orange-50 text-primary text-xs px-2.5 py-1 rounded-full border border-orange-200">
              {minRatingParam}★ & Up
              <button
                onClick={() => updateParams({ minRating: null })}
                aria-label="Remove rating filter"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          )}

          {inStockParam && (
            <span className="flex items-center gap-1 bg-orange-50 text-primary text-xs px-2.5 py-1 rounded-full border border-orange-200">
              In Stock
              <button
                onClick={() => handleInStockChange(false)}
                aria-label="Remove in-stock filter"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          )}
        </div>
      )}

      <div className="flex gap-4">
        {/* ── Desktop Sidebar ───────────────────────────────────────────────── */}
        <div className="w-64 shrink-0 hidden md:block">{FiltersPanel}</div>

        {/* ── Main Content ─────────────────────────────────────────────────── */}
        <div className="flex-1 min-w-0">
          {/* Toolbar */}
          <div className="bg-white p-3 shadow-card rounded-sm mb-4 flex justify-between items-center flex-wrap gap-2">
            <div className="flex items-center gap-3">
              {/* Mobile filter trigger */}
              <button
                onClick={() => setMobileFiltersOpen(true)}
                className="md:hidden flex items-center gap-1.5 border border-gray-300 px-3 py-1.5 rounded-sm text-sm text-gray-600 hover:border-primary hover:text-primary"
              >
                <Filter className="w-4 h-4" />
                Filters
                {activeFilterCount > 0 && (
                  <span className="bg-primary text-white text-xs rounded-full w-4 h-4 flex items-center justify-center leading-none">
                    {activeFilterCount}
                  </span>
                )}
              </button>

              <div className="text-sm text-gray-600">
                <span className="font-bold text-gray-800">{totalProducts}</span>{" "}
                items found
                {selectedCategoryName && (
                  <span>
                    {" "}
                    in "
                    <span className="text-primary">{selectedCategoryName}</span>
                    "
                  </span>
                )}
                {searchQuery && (
                  <span>
                    {" "}
                    for "<span className="text-primary">{searchQuery}</span>"
                  </span>
                )}
              </div>
            </div>

            <div className="flex items-center gap-2 text-sm text-gray-600">
              <span className="hidden sm:inline">Sort By:</span>
              <div className="relative">
                <select
                  value={sortByParam}
                  onChange={(e) => handleSortChange(e.target.value)}
                  className="appearance-none border border-gray-300 px-3 py-1.5 pr-8 rounded-sm cursor-pointer bg-white outline-none focus:border-primary text-sm"
                >
                  <option value="best">Best Match</option>
                  <option value="newest">Newest Arrivals</option>
                  <option value="price_asc">Price: Low to High</option>
                  <option value="price_desc">Price: High to Low</option>
                </select>
                <ChevronDown className="w-4 h-4 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400" />
              </div>
            </div>
          </div>

          {/* Products Grid */}
          {isLoading ? (
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {[...Array(12)].map((_, i) => (
                <div
                  key={i}
                  className="bg-white rounded-sm overflow-hidden animate-pulse"
                >
                  <div className="h-48 bg-gray-200" />
                  <div className="p-3 space-y-2">
                    <div className="h-4 bg-gray-200 rounded w-3/4" />
                    <div className="h-3 bg-gray-200 rounded w-1/2" />
                    <div className="h-5 bg-gray-200 rounded w-1/3" />
                  </div>
                </div>
              ))}
            </div>
          ) : products.length > 0 ? (
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-sm shadow-card p-10 text-center">
              <Search className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-700 mb-2">
                No products found
              </h3>
              <p className="text-gray-500 mb-4 text-sm">
                {searchQuery
                  ? `No results for "${searchQuery}". Try different keywords.`
                  : "Try adjusting or clearing your filters."}
              </p>
              {hasActiveFilters && (
                <button
                  onClick={clearAllFilters}
                  className="text-sm text-primary hover:underline"
                >
                  Clear all filters
                </button>
              )}
              <Link
                to="/products"
                className="block mt-2 text-sm text-primary hover:underline"
              >
                View all products
              </Link>
            </div>
          )}

          {/* ── Pagination ─────────────────────────────────────────────────── */}
          {!isLoading && totalPages > 1 && (
            <div className="mt-6 flex justify-center items-center gap-1.5">
              <button
                onClick={() => handlePageChange(pageParam - 1)}
                disabled={pageParam <= 1}
                className="flex items-center gap-1 px-3 py-2 border border-gray-300 rounded-sm text-sm text-gray-600 hover:border-primary hover:text-primary disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronLeft className="w-4 h-4" /> Prev
              </button>

              {paginationPages.map((p, idx) =>
                p === "…" ? (
                  <span
                    key={`ellipsis-${idx}`}
                    className="px-2 py-2 text-sm text-gray-400 select-none"
                  >
                    …
                  </span>
                ) : (
                  <button
                    key={p}
                    onClick={() => handlePageChange(p as number)}
                    className={`w-9 h-9 rounded-sm text-sm font-medium transition-colors ${
                      pageParam === p
                        ? "bg-primary text-white"
                        : "border border-gray-300 text-gray-600 hover:border-primary hover:text-primary"
                    }`}
                  >
                    {p}
                  </button>
                ),
              )}

              <button
                onClick={() => handlePageChange(pageParam + 1)}
                disabled={pageParam >= totalPages}
                className="flex items-center gap-1 px-3 py-2 border border-gray-300 rounded-sm text-sm text-gray-600 hover:border-primary hover:text-primary disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              >
                Next <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* ── Mobile Filter Drawer ─────────────────────────────────────────────── */}
      {mobileFiltersOpen && (
        <div className="fixed inset-0 z-50 md:hidden flex">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setMobileFiltersOpen(false)}
          />
          {/* Drawer */}
          <div className="absolute right-0 top-0 h-full w-80 max-w-[90vw] bg-gray-50 flex flex-col">
            <div className="sticky top-0 bg-white px-4 py-3 flex items-center justify-between border-b shadow-sm z-10">
              <h2 className="font-bold text-gray-800 flex items-center gap-2">
                <Filter className="w-4 h-4" /> Filters
                {activeFilterCount > 0 && (
                  <span className="bg-primary text-white text-xs px-2 py-0.5 rounded-full">
                    {activeFilterCount} active
                  </span>
                )}
              </h2>
              <button
                onClick={() => setMobileFiltersOpen(false)}
                aria-label="Close filters"
              >
                <X className="w-5 h-5 text-gray-500 hover:text-gray-800" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-4">{FiltersPanel}</div>
            <div className="sticky bottom-0 bg-white border-t px-4 py-3">
              <button
                onClick={() => setMobileFiltersOpen(false)}
                className="w-full bg-primary text-white py-2.5 rounded-sm font-medium hover:bg-primary-hover transition"
              >
                Show {totalProducts} Results
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductsPage;
