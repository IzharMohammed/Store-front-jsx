import { getProducts, getProductsByCategory } from "@/actions/products";
import { NewArrivalsCarousel } from "./new-arrivals-carousel";
import { getCartItems } from "@/actions/cart";
import { getWishlistItems } from "@/actions/wishlist";
import { PT_Serif } from "next/font/google";

const serif = PT_Serif({
  subsets: ["latin"],
  weight: "400",
});

export async function SimilarProducts({ category }) {
  console.log("category", category);

  const [productsResponse, cartResponse, wishlistResponse] = await Promise.all([
    getProductsByCategory(category),
    getCartItems(),
    getWishlistItems(),
  ]);
  console.log("productsResponse", productsResponse);

  const products = productsResponse?.data?.products || [];
  const cartItems = cartResponse?.data || [];
  const wishlistData = wishlistResponse || {};
  return (
    <div>
      <NewArrivalsCarousel
        products={products}
        cartItems={cartItems}
        wishlistData={wishlistData}
        fontClass={serif.className}
      />
    </div>
  );
}
