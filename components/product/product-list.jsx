// import { getProducts } from "@/actions/products";
// import { getCartItems } from "@/actions/cart";
// import { ProductPagination } from "@/components/product/product-pagination";
// import { ProductCard } from "@/components/product/product-card";
// import Link from "next/link";
// import ProductError from "@/app/products/error";

// export async function ProductsList({ searchParams, categories, priceRange }) {
//   // Parse search parameters
//   const resolvedParams = await searchParams;
//   const page = parseInt(resolvedParams?.page || "1");
//   const limit = parseInt(resolvedParams?.limit || "12");

//   // Build filters object
//   const filters = {
//     page,
//     limit,
//     ...(resolvedParams?.category && { category: resolvedParams.category }),
//     ...(resolvedParams?.search && { search: resolvedParams.search }),
//     ...(resolvedParams?.minPrice && { minPrice: resolvedParams.minPrice }),
//     ...(resolvedParams?.maxPrice && { maxPrice: resolvedParams.maxPrice }),
//     ...(resolvedParams?.rating && { rating: resolvedParams.rating }),
//     ...(resolvedParams?.sortBy && { sortBy: resolvedParams.sortBy }),
//     ...(resolvedParams?.sortOrder && { sortOrder: resolvedParams.sortOrder }),
//     ...(resolvedParams?.inStock && {
//       inStock: resolvedParams.inStock === "true",
//     }),
//   };

//   const [productsResponse, cartResponse] = await Promise.all([
//     getProducts(filters),
//     getCartItems(),
//   ]);

//   if (!productsResponse?.success) {
//     return (
//       <div className="col-span-full">
//         <ProductError
//           error={
//             new Error(productsResponse?.error || "Failed to fetch products")
//           }
//           reset={() => {}}
//         />
//       </div>
//     );
//   }

//   const products = productsResponse?.data || [];
//   const pagination = productsResponse?.pagination || {};
//   const cartItems = cartResponse?.success ? cartResponse.data : [];

//   // Create a map for quick cart item lookup
//   const cartItemMap = new Map(
//     cartItems.map((item) => [item.productId || item.product_id, item])
//   );

//   if (!Array.isArray(products) || products.length === 0) {
//     return (
//       <div className="col-span-full">
//         <div className="text-center py-16">
//           <div className="mx-auto w-24 h-24 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mb-4">
//             <Filter className="w-8 h-8 text-gray-400" />
//           </div>
//           <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
//             No products found
//           </h3>
//           <p className="text-gray-500 dark:text-gray-400 mb-6">
//             Try adjusting your filters or search terms
//           </p>
//           <Link href="/products">
//             <Button variant="outline">Clear all filters</Button>
//           </Link>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <>
//       {/* Products Grid */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
//         {products.map((product) => {
//           const cartItem = cartItemMap.get(product.id);
//           return (
//             <div key={product.id.toString()}>
//               <ProductCard product={product} cartItem={cartItem} />
//             </div>
//           );
//         })}
//       </div>

//       {/* Pagination */}
//       {pagination.totalPages > 1 && (
//         <div className="mt-8 mb-14 flex justify-center">
//           <ProductPagination
//             currentPage={pagination.currentPage || page}
//             totalPages={pagination.totalPages || 1}
//             totalCount={pagination.totalCount || 0}
//             hasNextPage={pagination.hasNextPage || false}
//             hasPrevPage={pagination.hasPrevPage || false}
//             limit={limit}
//           />
//         </div>
//       )}
//     </>
//   );
// }

import { getProducts } from "@/actions/products";
import { getCartItems } from "@/actions/cart";
import { ProductPagination } from "@/components/product/product-pagination";
import Link from "next/link";
import ProductError from "@/app/products/error";
import Image from "next/image";
import AddToCartButton from "@/components/cart/AddToCartButton";
import { WishlistButton } from "@/components/wishlist/wishlistButton";
import { getWishlistItems } from "@/actions/wishlist";
import CartQuantityControls from "../cart/cart-quantity-controls";

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

  const [productsResponse, cartResponse, wishlistResponse] = await Promise.all([
    getProducts(filters),
    getCartItems(),
    getWishlistItems(),
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
  const wishlistData = wishlistResponse || {};

  // Create a map for quick cart item lookup
  const cartItemMap = new Map(
    cartItems.map((item) => [item.productId || item.product_id, item])
  );


  if (!Array.isArray(products) || products.length === 0) {
    return (
      <div className="col-span-full">
        <div className="text-center py-16">
          <h3 className="text-lg font-semibold mb-2">No products found</h3>
          <p className="text-muted-foreground mb-6">
            Try adjusting your filters or search terms
          </p>
          <Link
            href="/products"
            className="inline-block border rounded px-4 py-2"
          >
            Clear all filters
          </Link>
        </div>
      </div>
    );
  }

  const formatMoney = (v) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(Number(v || 0));

  return (
    <>
      {/* Large-image grid like the reference */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {products.map((product) => {
          const cartItem = cartItemMap.get(product.id);

          const isInCart = !!cartItem;

          const img =
            Array.isArray(product.image) && product.image.length
              ? product.image[0]
              : product.image;

          const originalPrice = Number(product.price ?? 0);

          const discount =
            typeof product.discount === "number"
              ? Number(product.discount)
              : null;

          const discountPrice =
            originalPrice - (originalPrice * discount) / 100;

          const hasDiscount =
            typeof discountPrice === "number" &&
            discountPrice > 0 &&
            originalPrice > 0 &&
            discountPrice < originalPrice;

          return (
            <div key={product.id.toString()} className="group">
              {/* Image tile (large) */}
              <Link href={`/products/${product.id}`} className="block">
                <div className="relative w-full bg-gray-50  overflow-hidden border">
                  {/* Tall aspect like screenshot */}
                  <div className="relative aspect-[4/5]">
                    <Image
                      src={img}
                      alt={product.name}
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 50vw, 33vw"
                    />
                  </div>
                </div>
              </Link>

              {/* Wishlist button at top-right over image */}
              <div className="relative">
                <div className="absolute -top-[calc(100%+33rem)] right-3">
                  <WishlistButton
                    wishlistData={wishlistData}
                    productId={product.id}
                    variant="outline"
                    size="sm"
                    className="bg-white/90 backdrop-blur border h-8 w-8"
                  />
                </div>
              </div>

              {/* Name and price (no ratings) */}
              <div className="mt-3 text-center">
                <Link href={`/products/${product.id}`}>
                  <h3 className="text-sm sm:text-base font-medium">
                    {product.name}
                  </h3>
                </Link>
                <div className="mt-1 flex items-center justify-center gap-2">
                  {hasDiscount ? (
                    <>
                      <span className="text-sm line-through text-muted-foreground">
                        {formatMoney(originalPrice)}
                      </span>
                      <span className="text-red-600">
                        {formatMoney(discountPrice)}
                      </span>
                    </>
                  ) : (
                    <span className="font-semibold">
                      {formatMoney(product.price)}
                    </span>
                  )}
                </div>
              </div>

              {/* Add to Cart */}
              <div className="mt-3">
                {isInCart ? (
                  <CartQuantityControls
                    cartItem={cartItem}
                    productStock={product.stock}
                    className="w-full"
                  />
                ) : (
                  <AddToCartButton
                    // isAuthenticated={isAuthenticated}
                    productId={product.id}
                    productName={product.name}
                    className="w-full bg-black hover:bg-gray-800 text-white dark:bg-white dark:hover:bg-gray-100 dark:text-black border-0 transition-colors duration-200 h-9 text-sm font-medium"
                    disabled={product.stock === 0}
                  />
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Pagination */}
      {pagination.totalPages > 1 && (
        <div className="mt-10 mb-14 flex justify-center">
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
