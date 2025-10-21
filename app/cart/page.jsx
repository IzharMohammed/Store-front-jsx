import { Button } from "@/components/ui/button";
import { Truck, Shield, CreditCard, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import EmptyCart from "@/components/cart/empty-cart";
import { CartItemActions } from "@/components/cart/cart-item-actions";
import { getCartItems } from "@/actions/cart";
import { cookieManager } from "@/utils/authTools";
import { Cormorant_Garamond } from "next/font/google";

const garamond = Cormorant_Garamond({
  weight: "500",
  style: "normal",
  subsets: ["latin"],
});

export default async function CartPage() {
  const cartData = await getCartItems();
  const isAuthenticated = await cookieManager.isAuthenticated();
  const guestToken = await cookieManager.getGuestToken();

  const cartItems = cartData?.data || [];

  const totalAmount = cartItems.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );
  const shipping = totalAmount > 100 ? 0 : 9.99;
  const finalTotal = totalAmount + shipping;

  if (cartItems.length === 0) {
    return <EmptyCart />;
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12 max-w-6xl">
        {/* Header */}
        <div className="mb-18 mt-10">
          <h1 className={`${garamond.className} text-2xl`}>Your cart</h1>
        </div>

        <div className="grid gap-12 lg:grid-cols-3">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            {/* Table Header */}
            <div className="grid grid-cols-12 gap-4 pb-4 border-b mb-8">
              <div
                className={`col-span-5 text-sm font-medium text-muted-foreground uppercase tracking-wider ${garamond.className}`}
              >
                Product
              </div>
              <div
                className={`col-span-4 text-center text-sm font-medium text-muted-foreground uppercase tracking-wider ${garamond.className}`}
              >
                Quantity
              </div>
              <div
                className={`col-span-3 text-right text-sm font-medium text-muted-foreground uppercase tracking-wider ${garamond.className}`}
              >
                Total
              </div>
            </div>

            {/* Cart Items */}
            <div className="space-y-0">
              {cartItems.map((item, index) => (
                <div key={item.id}>
                  <div className="grid grid-cols-12 gap-4 py-8 items-center">
                    {/* Product Info */}
                    <div className="col-span-5 flex gap-4">
                      <Link
                        href={`/product/${item.product.id}`}
                        className="relative w-24 h-32 bg-muted shrink-0 overflow-hidden"
                      >
                        <Image
                          src={
                            item.product.image[0] ||
                            "/placeholder.svg?height=96&width=96"
                          }
                          alt={item.product.name}
                          fill
                          className="object-cover hover:opacity-80 transition-opacity"
                        />
                      </Link>

                      <div className="flex-1 min-w-0">
                        <Link href={`/product/${item.product.id}`}>
                          <h3 className="font-medium text-sm mb-2 hover:underline">
                            {item.product.name}
                          </h3>
                        </Link>
                        <p className="text-sm text-muted-foreground tracking-wide">
                          {item.product.description?.slice(0, 50)}
                        </p>
                      </div>
                    </div>

                    {/* Quantity */}
                    <div className="col-span-4 flex justify-center">
                      <CartItemActions
                        cartId={item.id}
                        currentQuantity={item.quantity}
                        productName={item.product.name}
                      />
                    </div>

                    {/* Total Price */}
                    <div className="col-span-3 text-right">
                      <div className="text-lg font-medium">
                        €{(item.product.price * item.quantity).toFixed(0)}
                      </div>
                    </div>
                  </div>
                  {index < cartItems.length - 1 && <div className="border-b" />}
                </div>
              ))}
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <div className="space-y-8">
                {/* Summary */}
                <div>
                  <h2 className={`mb-6 ${garamond.className} text-xl`}>
                    Order Summary
                  </h2>

                  <div className="space-y-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">
                        Subtotal ({cartItems.length}{" "}
                        {cartItems.length === 1 ? "item" : "items"})
                      </span>
                      <span className="font-medium">
                        €{totalAmount.toFixed(0)}
                      </span>
                    </div>

                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Shipping</span>
                      <span className="font-medium">
                        {shipping === 0 ? (
                          <span className="text-green-600">Free</span>
                        ) : (
                          `€${shipping.toFixed(0)}`
                        )}
                      </span>
                    </div>

                    <div className="border-t pt-4 mt-4">
                      <div className="flex justify-between">
                        <span>Total</span>
                        <span>€{finalTotal.toFixed(0)}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Free Shipping Bar */}
                {totalAmount < 100 && (
                  <div className="bg-blue-50 dark:bg-blue-950/30 p-4 rounded border border-blue-200 dark:border-blue-800">
                    <div className="flex items-center gap-2 text-blue-700 dark:text-blue-300 text-sm mb-3">
                      <Truck className="w-4 h-4 shrink-0" />
                      <span className="text-xs">
                        Add €{(100 - totalAmount).toFixed(0)} more for FREE
                        shipping
                      </span>
                    </div>
                    <div className="w-full bg-blue-200 dark:bg-blue-900 rounded-full h-1.5">
                      <div
                        className="bg-blue-600 dark:bg-blue-400 h-1.5 rounded-full transition-all duration-500"
                        style={{
                          width: `${Math.min((totalAmount / 100) * 100, 100)}%`,
                        }}
                      />
                    </div>
                  </div>
                )}

                {/* Checkout Button */}
                <Button size="lg" className="w-full text-sm" asChild>
                  <Link
                    href={
                      isAuthenticated
                        ? "/checkout/authenticated"
                        : "/signup?next=/checkout/authenticated"
                    }
                  >
                    <CreditCard className="w-4 h-4 mr-2" />
                    Checkout
                  </Link>
                </Button>

                {/* Continue Shopping */}
                <Button variant="outline" size="lg" className="w-full" asChild>
                  <Link href="/products">Continue Shopping</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
