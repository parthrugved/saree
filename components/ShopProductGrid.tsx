"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { Filter, X, ChevronDown } from "lucide-react";

interface Product {
  _id: string;
  title: string;
  price: number;
  images?: string[];
  fabric: string;
  type: string;
}

type SortOption = "featured" | "price-low-high" | "price-high-low";

export function ShopProductGrid({ products }: { products: Product[] }) {
  const [sortBy, setSortBy] = useState<SortOption>("featured");
  const [showFilters, setShowFilters] = useState(false);
  const [selectedFabrics, setSelectedFabrics] = useState<string[]>([]);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);

  // Extract unique fabric and type values for filter options
  const fabrics = useMemo(
    () => [...new Set(products.map((p) => p.fabric).filter(Boolean))],
    [products]
  );
  const types = useMemo(
    () => [...new Set(products.map((p) => p.type).filter(Boolean))],
    [products]
  );

  // Filter then sort
  const filteredAndSorted = useMemo(() => {
    let result = [...products];

    // Apply fabric filter
    if (selectedFabrics.length > 0) {
      result = result.filter((p) => selectedFabrics.includes(p.fabric));
    }

    // Apply type filter
    if (selectedTypes.length > 0) {
      result = result.filter((p) => selectedTypes.includes(p.type));
    }

    // Apply sort
    switch (sortBy) {
      case "price-low-high":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-high-low":
        result.sort((a, b) => b.price - a.price);
        break;
      case "featured":
      default:
        // Keep original order
        break;
    }

    return result;
  }, [products, sortBy, selectedFabrics, selectedTypes]);

  const toggleFabric = (fabric: string) => {
    setSelectedFabrics((prev) =>
      prev.includes(fabric) ? prev.filter((f) => f !== fabric) : [...prev, fabric]
    );
  };

  const toggleType = (type: string) => {
    setSelectedTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
  };

  const clearFilters = () => {
    setSelectedFabrics([]);
    setSelectedTypes([]);
  };

  const activeFilterCount = selectedFabrics.length + selectedTypes.length;

  return (
    <>
      {/* Controls row */}
      <div className="flex flex-col md:flex-row justify-between items-end md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-serif font-bold text-gray-900 dark:text-white mb-2">
            Shop Collection
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Discover our elegant ready-to-wear sarees.
          </p>
        </div>
        <div className="flex items-center gap-4">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`flex items-center gap-2 border px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              showFilters || activeFilterCount > 0
                ? "border-amber-500 bg-amber-50 text-amber-700 dark:bg-amber-950 dark:text-amber-400 dark:border-amber-700"
                : "border-gray-300 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-900"
            }`}
          >
            <Filter className="h-4 w-4" />
            Filters
            {activeFilterCount > 0 && (
              <span className="bg-amber-600 text-white text-xs rounded-full px-1.5 py-0.5 leading-none">
                {activeFilterCount}
              </span>
            )}
          </button>

          <div className="relative">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOption)}
              className="appearance-none border border-gray-300 dark:border-gray-700 bg-transparent dark:bg-black pl-4 pr-10 py-2 rounded-full text-sm font-medium focus:outline-none focus:ring-1 focus:ring-amber-500 cursor-pointer"
            >
              <option value="featured">Sort by: Featured</option>
              <option value="price-low-high">Price: Low to High</option>
              <option value="price-high-low">Price: High to Low</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 pointer-events-none text-gray-500" />
          </div>
        </div>
      </div>

      {/* Filter panel */}
      {showFilters && (
        <div className="mb-8 p-6 border border-gray-200 dark:border-gray-800 rounded-2xl bg-gray-50 dark:bg-gray-950 animate-in slide-in-from-top-2 duration-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-medium text-gray-900 dark:text-white">Filter by</h3>
            {activeFilterCount > 0 && (
              <button
                onClick={clearFilters}
                className="text-sm text-amber-600 hover:text-amber-700 font-medium transition-colors"
              >
                Clear all
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Fabric filter */}
            {fabrics.length > 0 && (
              <div>
                <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-3 uppercase tracking-wider">
                  Fabric
                </h4>
                <div className="flex flex-wrap gap-2">
                  {fabrics.map((fabric) => (
                    <button
                      key={fabric}
                      onClick={() => toggleFabric(fabric)}
                      className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors border ${
                        selectedFabrics.includes(fabric)
                          ? "bg-amber-600 text-white border-amber-600"
                          : "border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:border-amber-500"
                      }`}
                    >
                      {fabric}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Type filter */}
            {types.length > 0 && (
              <div>
                <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-3 uppercase tracking-wider">
                  Type
                </h4>
                <div className="flex flex-wrap gap-2">
                  {types.map((type) => (
                    <button
                      key={type}
                      onClick={() => toggleType(type)}
                      className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors border ${
                        selectedTypes.includes(type)
                          ? "bg-amber-600 text-white border-amber-600"
                          : "border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:border-amber-500"
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Active filter tags */}
      {activeFilterCount > 0 && !showFilters && (
        <div className="flex flex-wrap items-center gap-2 mb-6">
          <span className="text-sm text-gray-500 dark:text-gray-400">Active filters:</span>
          {selectedFabrics.map((fabric) => (
            <button
              key={`fab-${fabric}`}
              onClick={() => toggleFabric(fabric)}
              className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200 transition-colors hover:bg-amber-200 dark:hover:bg-amber-800"
            >
              {fabric}
              <X className="h-3 w-3" />
            </button>
          ))}
          {selectedTypes.map((type) => (
            <button
              key={`type-${type}`}
              onClick={() => toggleType(type)}
              className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200 transition-colors hover:bg-amber-200 dark:hover:bg-amber-800"
            >
              {type}
              <X className="h-3 w-3" />
            </button>
          ))}
          <button
            onClick={clearFilters}
            className="text-xs text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 ml-1 underline"
          >
            Clear all
          </button>
        </div>
      )}

      {/* Product grid */}
      {filteredAndSorted.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-gray-500 dark:text-gray-400">
          <p className="text-lg font-medium mb-2">No products found</p>
          <p className="text-sm mb-4">Try adjusting your filters.</p>
          <button
            onClick={clearFilters}
            className="text-amber-600 hover:text-amber-700 font-medium text-sm transition-colors"
          >
            Clear all filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {filteredAndSorted.map((product) => (
            <Link
              href={`/shop/${product._id}`}
              key={product._id}
              className="group cursor-pointer"
            >
              <div className="relative h-96 w-full overflow-hidden rounded-xl bg-gray-100 dark:bg-gray-900 mb-4">
                <Image
                  src={
                    product.images?.[0] ||
                    `https://picsum.photos/seed/saree${product._id}/600/800`
                  }
                  alt={product.title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div>
                <h3 className="font-medium text-lg text-gray-900 dark:text-white line-clamp-1">
                  {product.title}
                </h3>
                <div className="flex justify-between items-center mt-1">
                  <p className="text-gray-500 dark:text-gray-400 text-sm">
                    {product.type} • {product.fabric}
                  </p>
                  <p className="font-semibold text-amber-600">
                    ₹{product.price.toLocaleString()}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </>
  );
}
