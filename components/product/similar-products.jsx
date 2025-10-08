import { getProducts } from "@/actions/products";
import { NewArrivalsCarousel } from "./new-arrivals-carousel";
import { getCartItems } from "@/actions/cart";
import { getWishlistItems } from "@/actions/wishlist";
import { PT_Serif } from "next/font/google";

const serif = PT_Serif({
  subsets: ["latin"],
  weight: "400",
});
export async function SimilarProducts() {
  const [productsResponse, cartResponse, wishlistResponse] = await Promise.all([
    getProducts(),
    getCartItems(),
    getWishlistItems(),
  ]);

  const products = productsResponse?.data || [];
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
