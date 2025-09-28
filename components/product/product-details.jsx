import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import AddToCartButton from "../cart/AddToCartButton";
import { cookieManager } from "@/utils/authTools";
import { getCartItems } from "@/actions/cart";
import { getWishlistItems } from "@/actions/wishlist";
import CartQuantityControls from "../cart/cart-quantity-controls";
import { WishlistButton } from "../wishlist/wishlistButton";

export async function ProductDetails({ product }) {
  const formattedPrice = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(product.price);

  const isInStock = product.stock > 0;
  const isLowStock = product.stock > 0 && product.stock <= 10;

  const [isAuthenticated, cartData, wishlistData] = await Promise.all([
    cookieManager.isAuthenticated(),
    getCartItems(),
    getWishlistItems(),
  ]);

  // Find if this product is in cart
  const cartItem = cartData?.data?.find(
    (item) => item.productId === product.id
  );
  const isInCart = !!cartItem;

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav className="flex mb-8 text-sm">
          <a href="/" className="text-muted-foreground hover:text-foreground">
            Home
          </a>
          <span className="mx-2 text-muted-foreground">/</span>
          <a
            href="/products"
            className="text-muted-foreground hover:text-foreground"
          >
            Products
          </a>
          <span className="mx-2 text-muted-foreground">/</span>
          <span className="text-foreground">{product.category}</span>
        </nav>

        <div className="lg:grid lg:grid-cols-2 lg:gap-x-8 lg:items-start">
          {/* Product Image */}
          <div className="flex flex-col-reverse">
            <div className="aspect-w-1 aspect-h-1 w-full">
              <div className="relative h-96 w-full overflow-hidden rounded-lg border">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="h-full w-full object-cover object-center"
                  priority
                />
                {!isInStock && (
                  <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <Badge variant="destructive" className="text-lg px-4 py-2">
                      Out of Stock
                    </Badge>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Product Info */}
          <div className="mt-10 px-4 sm:px-0 sm:mt-16 lg:mt-0">
            <div className="flex items-center justify-between">
              <Badge variant="secondary" className="mb-4">
                {product.category}
              </Badge>

              {/* Wishlist Button */}
              <WishlistButton
                isAuthenticated={isAuthenticated}
                wishlistData={wishlistData}
                productId={product.id}
                className="mb-4"
              />
            </div>

            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
              {product.name}
            </h1>

            <div className="mt-3">
              <p className="text-3xl font-bold">{formattedPrice}</p>
            </div>

            {/* Stock Status */}
            <div className="mt-4">
              {isInStock ? (
                <div className="flex items-center space-x-2">
                  <div className="flex items-center">
                    <div className="h-2 w-2 bg-green-500 rounded-full mr-2"></div>
                    <span className="text-sm text-green-600 font-medium">
                      In Stock
                    </span>
                  </div>
                  <span className="text-sm text-muted-foreground">
                    ({product.stock} available)
                  </span>
                  {isLowStock && (
                    <Badge
                      variant="outline"
                      className="text-orange-600 border-orange-300"
                    >
                      Low Stock
                    </Badge>
                  )}
                </div>
              ) : (
                <div className="flex items-center">
                  <div className="h-2 w-2 bg-red-500 rounded-full mr-2"></div>
                  <span className="text-sm text-red-600 font-medium">
                    Out of Stock
                  </span>
                </div>
              )}
            </div>

            <div className="mt-6">
              <h3 className="sr-only">Description</h3>
              <div className="text-base text-muted-foreground">
                <p>{product.description}</p>
              </div>
            </div>

            <Separator className="my-6" />

            {/* Cart Actions */}
            <div className="mt-8 flex flex-col space-y-4">
              {isInCart ? (
                <div className="space-y-4">
                  {/* Product is in cart - show quantity controls */}
                  <div className="p-4 border rounded-lg bg-muted/10">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-sm font-medium text-muted-foreground">
                        This item is in your cart
                      </span>
                      <Badge variant="outline" className="text-xs">
                        In Cart
                      </Badge>
                    </div>
                    <CartQuantityControls
                      cartItem={cartItem}
                      isAuthenticated={isAuthenticated}
                      productStock={product.stock}
                      variant="default"
                      showRemoveButton={true}
                    />
                  </div>
                </div>
              ) : (
                <div className="flex space-x-4">
                  {/* Product not in cart - show add to cart button */}
                  <AddToCartButton
                    isAuthenticated={isAuthenticated}
                    productId={product.id}
                    productName={product.name}
                    disabled={!isInStock}
                    className="flex-1 h-12 text-base font-semibold"
                  />
                </div>
              )}

              {!isInStock && (
                <Button variant="outline" size="lg" className="w-full">
                  Notify When Available
                </Button>
              )}
            </div>

            {/* Quick Actions */}
            {/* {isInStock && (
              <div className="mt-6 flex gap-3">
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1"
                  // onClick={() => {
                  //   // Add functionality for quick buy
                  //   console.log("Buy now clicked");
                  // }}
                >
                  Buy Now
                </Button>
              </div>
            )} */}

            {/* Product Details */}
            <div className="mt-8 border-t pt-8">
              <h3 className="text-lg font-medium mb-4">Product Details</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Category:</span>
                  <Badge variant="outline" className="text-xs">
                    {product.category}
                  </Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Status:</span>
                  <Badge
                    variant={
                      product.status === "ACTIVE" ? "default" : "secondary"
                    }
                    className="text-xs"
                  >
                    {product.status}
                  </Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Added:</span>
                  <span>
                    {new Date(product.createdAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </span>
                </div>
                {cartItem && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">In Cart:</span>
                    <span className="font-medium text-green-600">
                      {cartItem.quantity}{" "}
                      {cartItem.quantity === 1 ? "item" : "items"}
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Shipping & Returns Info */}
            <div className="mt-8 border-t pt-8">
              <h3 className="text-lg font-medium mb-4">Shipping & Returns</h3>
              <div className="space-y-3 text-sm text-muted-foreground">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                  <p>Free shipping on orders over $50</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                  <p>30-day return policy</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                  <p>Estimated delivery: 3-5 business days</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
