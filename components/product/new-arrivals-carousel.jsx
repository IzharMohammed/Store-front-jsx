"use client";

import Image from "next/image";
import { useRef } from "react";
import AddToCartButton from "@/components/cart/AddToCartButton";
import { WishlistButton } from "@/components/wishlist/wishlistButton";
import Link from "next/link";
import CartQuantityControls from "../cart/cart-quantity-controls";

export function NewArrivalsCarousel({
  products = [],
  cartItems,
  wishlistData,
  fontClass = "",
}) {
  const scrollerRef = useRef(null);

  const scrollByAmount = () => {
    const el = scrollerRef.current;
    if (!el) return 0;
    // scroll by the width of one tile (including gap)
    const first = el.querySelector("[data-tile]");
    return first ? first.clientWidth + 24 : 400;
  };

  const scrollLeft = () => {
    const el = scrollerRef.current;
    if (el) el.scrollBy({ left: -scrollByAmount(), behavior: "smooth" });
  };
  const scrollRight = () => {
    const el = scrollerRef.current;
    if (el) el.scrollBy({ left: scrollByAmount(), behavior: "smooth" });
  };

  return (
    <div className="relative">
      {/* Top-right arrows */}
      <div className="absolute -top-12 right-0 flex gap-2">
        <button
          onClick={scrollLeft}
          className="h-9 w-9 rounded-full border hover:bg-muted transition"
          aria-label="Previous"
        >
          ←
        </button>
        <button
          onClick={scrollRight}
          className="h-9 w-9 rounded-full border hover:bg-muted transition"
          aria-label="Next"
        >
          →
        </button>
      </div>

      <div
        ref={scrollerRef}
        className="overflow-x-auto scroll-smooth [-ms-overflow-style:none] [scrollbar-width:none]"
      >
        {/* hide scrollbar */}
        <style jsx>{`
          div::-webkit-scrollbar {
            display: none;
          }
        `}</style>

        <div className="flex gap-6">
          {products.map((product) => {
            const cartItem =
              cartItems.find(
                (i) => (i.productId || i.product_id) === product.id
              ) || null;

            const isInCart = !!cartItem;

            console.log(!!isInCart);

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
              <div
                key={product.id}
                data-tile
                className="shrink-0 w-[420px] sm:w-[520px]"
              >
                <div className="relative overflow-hidden border">
                  <Link href={`/products/${product.id}`} className="block">
                    <div className="relative w-full bg-gray-50 aspect-[4/5]">
                      <Image
                        src={
                          Array.isArray(product.image)
                            ? product.image[0]
                            : product.image
                        }
                        alt={product.name}
                        fill
                        className="object-cover"
                        sizes="(max-width: 640px) 420px, 520px"
                        priority={false}
                      />
                    </div>
                  </Link>

                  {/* Wishlist at top-right over image */}
                  <div className="absolute top-3 right-3">
                    <WishlistButton
                      wishlistData={wishlistData}
                      productId={product.id}
                      variant="outline"
                      size="sm"
                      className="bg-white/90 backdrop-blur border h-8 w-8"
                    />
                  </div>
                </div>

                {/* Title and price below image */}
                <div className="absoluet ml-36 mt-3 px-1 ">
                  <Link href={`/products/${product.id}`}>
                    <h3 className={`${fontClass}`}>{product.name}</h3>
                  </Link>
                  <div className="mt-1 flex items-baseline gap-2">
                    {hasDiscount ? (
                      <>
                        <span
                          className={`text-sm line-through text-muted-foreground ${fontClass}`}
                        >
                          ${Number(originalPrice).toFixed(2)}
                        </span>
                        <span className={`text-red-600 ${fontClass}`}>
                          ${Number(discountPrice).toFixed(2)}
                        </span>
                      </>
                    ) : (
                      <span
                        className={`text-foreground font-semibold ${fontClass}`}
                      >
                        ${Number(product.price).toFixed(2)}
                      </span>
                    )}
                  </div>
                </div>

                {/* Keep existing functional buttons */}
                <div className="mt-3 px-1">
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
      </div>
    </div>
  );
}
