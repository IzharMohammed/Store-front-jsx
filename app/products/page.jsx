import { getProducts, getCategories } from "@/actions/products";
import { getCartItems } from "@/actions/cart";
import ProductError from "./error";
import { ProductFilters } from "@/components/product/product-filters";
import { ProductPagination } from "@/components/product/product-pagination";
import { ProductCard } from "@/components/product/product-card";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Suspense } from "react";
import { Filter, SlidersHorizontal } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

// Loading components
function ProductsLoading() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
      {[...Array(12)].map((_, i) => (
        <div key={i} className="animate-pulse">
          <div className="bg-gray-200 dark:bg-gray-700 aspect-square rounded-lg mb-3"></div>
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded mb-2"></div>
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-2/3 mb-2"></div>
          <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded"></div>
        </div>
      ))}
    </div>
  );
}

function FiltersLoading() {
  return (
    <div className="space-y-6">
      <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
      <div className="h-32 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
      <div className="h-20 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
    </div>
  );
}

async function ProductsList({ searchParams, categories, priceRange }) {
  // Parse search parameters
  const resolvedParams = await searchParams;
  const page = parseInt(resolvedParams?.page || "1");
  const limit = parseInt(resolvedParams?.limit || "12");

  // Build filters object
  const filters = {
    page,
    limit,
    ...(resolvedParams?.category && { category: resolvedParams.category }),
    ...(resolvedParams?.search && { search: resolvedParams.search }),
    ...(resolvedParams?.minPrice && { minPrice: resolvedParams.minPrice }),
    ...(resolvedParams?.maxPrice && { maxPrice: resolvedParams.maxPrice }),
    ...(resolvedParams?.rating && { rating: resolvedParams.rating }),
    ...(resolvedParams?.sortBy && { sortBy: resolvedParams.sortBy }),
    ...(resolvedParams?.sortOrder && { sortOrder: resolvedParams.sortOrder }),
    ...(resolvedParams?.inStock && {
      inStock: resolvedParams.inStock === "true",
    }),
  };

  const [productsResponse, cartResponse] = await Promise.all([
    getProducts(filters),
    getCartItems(),
  ]);

  if (!productsResponse?.success) {
    return (
      <div className="col-span-full">
        <ProductError
          error={
            new Error(productsResponse?.error || "Failed to fetch products")
          }
          reset={() => {}}
        />
      </div>
    );
  }

  const products = productsResponse?.data || [];
  const pagination = productsResponse?.pagination || {};
  const cartItems = cartResponse?.success ? cartResponse.data : [];

  // Create a map for quick cart item lookup
  const cartItemMap = new Map(
    cartItems.map((item) => [item.productId || item.product_id, item])
  );

  if (!Array.isArray(products) || products.length === 0) {
    return (
      <div className="col-span-full">
        <div className="text-center py-16">
          <div className="mx-auto w-24 h-24 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mb-4">
            <Filter className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            No products found
          </h3>
          <p className="text-gray-500 dark:text-gray-400 mb-6">
            Try adjusting your filters or search terms
          </p>
          <Link href="/products">
            <Button variant="outline">Clear all filters</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
        {products.map((product) => {
          const cartItem = cartItemMap.get(product.id);
          return (
            <div key={product.id.toString()}>
              <ProductCard product={product} cartItem={cartItem} />
            </div>
          );
        })}
      </div>

      {/* Pagination */}
      {pagination.totalPages > 1 && (
        <div className="mt-8 mb-14 flex justify-center">
          <ProductPagination
            currentPage={pagination.currentPage || page}
            totalPages={pagination.totalPages || 1}
            totalCount={pagination.totalCount || 0}
            hasNextPage={pagination.hasNextPage || false}
            hasPrevPage={pagination.hasPrevPage || false}
            limit={limit}
          />
        </div>
      )}
    </>
  );
}

export default async function ProductsPage({ searchParams }) {
  // Fetch categories and price range for filters
  const categoriesResponse = await getCategories();
  const categories = categoriesResponse?.success
    ? categoriesResponse.categories
    : [];
  const priceRange = categoriesResponse?.success
    ? categoriesResponse.priceRange
    : { min: 0, max: 1000 };

  const resolvedParams = await searchParams;
  const activeFiltersCount = Object.keys(resolvedParams || {}).filter(
    (key) => key !== "page" && key !== "limit" && resolvedParams[key]
  ).length;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-background">
      <div className="container mx-auto px-4 lg:px-20 py-6 md:py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 md:mb-8">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
              All Products
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              Discover our amazing collection
            </p>
          </div>

          {/* Mobile Filter Button */}
          <div className="flex items-center gap-3 sm:hidden">
            {activeFiltersCount > 0 && (
              <Badge variant="secondary" className="text-xs">
                {activeFiltersCount} filter{activeFiltersCount > 1 ? "s" : ""}
              </Badge>
            )}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="sm" className="gap-2">
                  <SlidersHorizontal className="w-4 h-4" />
                  Filters
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-80 overflow-y-auto">
                <SheetHeader>
                  <SheetTitle>Filter Products</SheetTitle>
                  <SheetDescription>
                    Refine your search to find exactly what you're looking for
                  </SheetDescription>
                </SheetHeader>
                <div className="mt-6">
                  <Suspense fallback={<FiltersLoading />}>
                    <ProductFilters
                      categories={categories}
                      priceRange={priceRange}
                      isMobile={true}
                      className="border-0 p-0"
                    />
                  </Suspense>
                </div>
              </SheetContent>
            </Sheet>
          </div>

          {/* Desktop Active Filters Count */}
          <div className="hidden sm:flex items-center gap-3">
            {activeFiltersCount > 0 && (
              <Badge variant="secondary" className="text-xs">
                {activeFiltersCount} filter{activeFiltersCount > 1 ? "s" : ""}{" "}
                applied
              </Badge>
            )}
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
          {/* Desktop Sidebar Filters */}
          <aside className="hidden lg:block w-64 xl:w-72 flex-shrink-0">
            <div className="sticky top-6">
              <Suspense fallback={<FiltersLoading />}>
                <ProductFilters
                  categories={categories}
                  priceRange={priceRange}
                  className="bg-white dark:bg-card rounded-lg border shadow-sm"
                />
              </Suspense>
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1 min-w-0">
            <Suspense
              key={JSON.stringify(resolvedParams)}
              fallback={<ProductsLoading />}
            >
              <ProductsList
                searchParams={searchParams}
                categories={categories}
                priceRange={priceRange}
              />
            </Suspense>
          </main>
        </div>
      </div>
    </div>
  );
}
