// import { getProducts } from "@/actions/products";
// import { getCartItems } from "@/actions/cart";
// import { Button } from "@/components/ui/button";
// import { Flame, TrendingUp } from "lucide-react";
// import Link from "next/link";
// import { ProductCard } from "./product-card";

// export async function Products() {
//   const [productsResponse, cartResponse] = await Promise.all([
//     getProducts(),
//     getCartItems(),
//   ]);

//   const products = productsResponse?.data || [];
//   const cartItems = cartResponse?.data || [];

//   return (
//     <section className="py-20 px-4">
//       <div className="max-w-7xl mx-auto">
//         {/* Section Header */}
//         <div className="text-center mb-12">
//           <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-orange-500/10 to-red-500/10 border border-orange-500/20 mb-4">
//             <Flame className="w-4 h-4 text-orange-500" />
//             <span className="text-sm font-medium">Trending Now</span>
//           </div>
//           <h2 className="text-3xl md:text-4xl font-bold mb-4">
//             <span className="bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
//               Hot
//             </span>{" "}
//             Products
//           </h2>
//           <p className="text-muted-foreground max-w-md mx-auto">
//             Discover our most popular and trending products
//           </p>
//         </div>

//         {/* Products Grid */}
//         {/* <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6"> */}
//         <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-3 md:gap-4">
//           {products.map((product) => {
//             // Find cart item for this product
//             const cartItem = cartItems.find(
//               (item) => item.productId === product.id
//             );

//             return (
//               <div key={product.id}>
//                 <ProductCard product={product} cartItem={cartItem} />
//               </div>
//             );
//           })}
//         </div>

//         {/* Show More Button */}
//         <div className="text-center mt-12">
//           <Link href="/products">
//             <Button
//               size="lg"
//               variant="outline"
//               className="group border-2 hover:bg-muted/50 transition-all duration-300 px-8"
//             >
//               <span className="mr-2">View All Products</span>
//               <div>
//                 <TrendingUp className="w-4 h-4" />
//               </div>
//             </Button>
//           </Link>
//         </div>
//       </div>
//     </section>
//   );
// }

import { getProducts } from "@/actions/products";
import { getCartItems } from "@/actions/cart";
import Link from "next/link";
import { NewArrivalsCarousel } from "./new-arrivals-carousel";
import { getWishlistItems } from "@/actions/wishlist";

export async function Products() {
  const [productsResponse, cartResponse, wishlistResponse] = await Promise.all([
    getProducts(),
    getCartItems(),
    getWishlistItems(),
  ]);

  const products = productsResponse?.data || [];
  const cartItems = cartResponse?.data || [];
  const wishlistData = wishlistResponse || {};

  return (
    <section className="py-16 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Link href="products" className="text-decoration-line: underline">
            Shop New Arrivals
          </Link>
          {/* Arrows are rendered inside the carousel (positioned top-right) */}
        </div>

        {/* Carousel of large product tiles */}
        <NewArrivalsCarousel
          products={products}
          cartItems={cartItems}
          wishlistData={wishlistData}
        />

        {/* View all link stays below */}
        <div className="text-center mt-12">
          <Link
            href="/products"
            className="inline-block px-6 py-3 border rounded-md hover:bg-muted/50 transition"
          >
            View All Products
          </Link>
        </div>
      </div>
    </section>
  );
}
