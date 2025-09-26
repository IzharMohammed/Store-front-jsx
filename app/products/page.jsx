import { getCategories } from "@/actions/products";
import { ProductFilters } from "@/components/product/product-filters";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Suspense } from "react";
import { SlidersHorizontal } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ProductsList } from "@/components/product/product-list";
import {
  FiltersLoading,
  ProductsLoading,
} from "@/components/product/product-loading";

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
