import { getProducts } from "@/actions/products";
import { getCartItems } from "@/actions/cart";
import { ProductPagination } from "@/components/product/product-pagination";
import { ProductCard } from "@/components/product/product-card";
import Link from "next/link";
import ProductError from "@/app/products/error";

export async function ProductsList({ searchParams, categories, priceRange }) {
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
