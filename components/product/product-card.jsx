import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, Zap } from "lucide-react";
import { WishlistButton } from "../wishlist/wishlistButton";
import AddToCartButton from "../cart/AddToCartButton";
import CartQuantityControls from "../cart/cart-quantity-controls";
import { getWishlistItems } from "@/actions/wishlist";
import { cookieManager } from "@/utils/authTools";

export async function ProductCard({ product, cartItem = null }) {
  const wishlistData = await getWishlistItems();
  const isAuthenticated = await cookieManager.isAuthenticated();

  const isInCart = !!cartItem;

  return (
    <div className="group">
      <Card className="relative overflow-hidden bg-white dark:bg-card hover:shadow-lg transition-shadow duration-300 h-full">
        {/* Product Image Container */}
        <div className="relative overflow-hidden">
          <Link href={`/products/${product.id}`}>
            <div className="aspect-square relative overflow-hidden bg-gray-50 dark:bg-muted">
              <Image
                src={product.image || "/placeholder.svg?height=240&width=240"}
                alt={product.name}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
          </Link>

          {/* Stock Badge */}
          {product.stock === 0 ? (
            <Badge className="absolute top-2 left-2 bg-red-500 hover:bg-red-600 text-white border-0 text-xs">
              Out of Stock
            </Badge>
          ) : product.stock <= 10 ? (
            <Badge className="absolute top-2 left-2 bg-orange-500 hover:bg-orange-600 text-white border-0 text-xs">
              <Zap className="w-3 h-3 mr-1" />
              {product.stock} left
            </Badge>
          ) : null}

          {/* Wishlist Button */}
          <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <WishlistButton
              isAuthenticated={isAuthenticated}
              wishlistData={wishlistData}
              productId={product.id}
              variant="ghost"
              size="sm"
              className="bg-white hover:bg-gray-50 text-gray-700 border shadow-sm h-8 w-8"
            />
          </div>
        </div>

        {/* Product Info */}
        <CardContent className="p-3 space-y-2 flex-1">
          <Link href={`/products/${product.id}`}>
            <h3 className="font-medium text-sm leading-tight hover:text-blue-600 transition-colors duration-200 line-clamp-2 min-h-[2.5rem]">
              {product.name}
            </h3>
          </Link>

          {/* Category and Rating */}
          <div className="flex items-center justify-between text-xs">
            <span className="text-muted-foreground capitalize">
              {product.category}
            </span>

            {/* Rating */}
            <div className="flex items-center gap-1">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-3 h-3 fill-amber-400 text-amber-400"
                  />
                ))}
              </div>
              <span className="text-muted-foreground">(4.5)</span>
            </div>
          </div>

          {/* Price */}
          <div className="flex items-center justify-between">
            <span className="text-lg font-bold text-gray-900 dark:text-white">
              ${product.price}
            </span>

            {product.stock > 0 && product.stock <= 10 && (
              <Badge
                variant="outline"
                className="text-xs border-orange-300 text-orange-600 bg-orange-50 dark:border-orange-800 dark:text-orange-400 dark:bg-orange-950/20"
              >
                Only {product.stock} left
              </Badge>
            )}
          </div>
        </CardContent>

        {/* Footer with Add to Cart or Quantity Controls */}
        <CardFooter className="p-3 pt-0">
          {isInCart ? (
            <CartQuantityControls
              cartItem={cartItem}
              isAuthenticated={isAuthenticated}
              productStock={product.stock}
              className="w-full"
            />
          ) : (
            <AddToCartButton
              isAuthenticated={isAuthenticated}
              productId={product.id}
              productName={product.name}
              className="w-full bg-black hover:bg-gray-800 text-white dark:bg-white dark:hover:bg-gray-100 dark:text-black border-0 transition-colors duration-200 h-9 text-sm font-medium"
              disabled={product.stock === 0}
            />
          )}
        </CardFooter>
      </Card>
    </div>
  );
}
