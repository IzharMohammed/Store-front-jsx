// import { Button } from "@/components/ui/button";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Separator } from "@/components/ui/separator";
// import {
//   ShoppingBag,
//   ArrowRight,
//   Heart,
//   Truck,
//   Shield,
//   CreditCard,
//   Package,
//   Star,
// } from "lucide-react";
// import Image from "next/image";
// import Link from "next/link";
// import EmptyCart from "@/components/cart/empty-cart";
// import { CartItemActions } from "@/components/cart/cart-item-actions";
// import { getCartItems } from "@/actions/cart";
// import { cookieManager } from "@/utils/authTools";

// export default async function CartPage() {
//   const cartData = await getCartItems();
//   const isAuthenticated = await cookieManager.isAuthenticated();
//   const guestToken = await cookieManager.getGuestToken();

//   const cartItems = cartData?.data || [];

//   const totalAmount = cartItems.reduce(
//     (sum, item) => sum + item.product.price * item.quantity,
//     0
//   );
//   const savings = totalAmount * 0.15; // Mock savings
//   const shipping = totalAmount > 100 ? 0 : 9.99;
//   const finalTotal = totalAmount + shipping;

//   if (cartItems.length === 0) {
//     return <EmptyCart />;
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
//       <div className="container mx-auto px-4 py-8 max-w-7xl">
//         {/* Header */}
//         <div className="mb-8">
//           <div className="flex items-center gap-3 mb-4">
//             <div>
//               <h1 className="text-3xl md:text-4xl font-bold">Your Cart</h1>
//               <p className="text-muted-foreground">
//                 {cartItems.length} {cartItems.length === 1 ? "item" : "items"}{" "}
//                 in your cart
//               </p>
//             </div>
//           </div>
//         </div>

//         <div className="grid gap-8 lg:grid-cols-3">
//           {/* Cart Items */}
//           <div className="lg:col-span-2">
//             <div className="space-y-4">
//               {cartItems.map((item) => (
//                 <Card
//                   key={item.id}
//                   className="overflow-hidden border-0 bg-gradient-to-br from-background to-muted/30 backdrop-blur-sm hover:shadow-xl transition-all duration-500"
//                 >
//                   <CardContent className="p-6">
//                     <div className="flex items-start gap-6">
//                       {/* Product Image */}
//                       <div className="relative w-24 h-24 md:w-32 md:h-32 rounded-2xl overflow-hidden bg-gradient-to-br from-muted/20 to-muted/40 shrink-0">
//                         <Image
//                           src={
//                             item.product.image[0] ||
//                             "/placeholder.svg?height=128&width=128"
//                           }
//                           alt={item.product.name}
//                           fill
//                           className="object-cover"
//                         />
//                       </div>

//                       {/* Product Details */}
//                       <div className="flex-1 min-w-0">
//                         <div className="flex items-start justify-between mb-3">
//                           <div>
//                             <Link href={`/product/${item.product.id}`}>
//                               <h3 className="font-bold text-lg md:text-xl hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-purple-600 hover:to-pink-600 transition-all duration-300 cursor-pointer">
//                                 {item.product.name}
//                               </h3>
//                             </Link>
//                             <p className="text-muted-foreground text-sm mt-1 line-clamp-2">
//                               {item.product.description}
//                             </p>
//                           </div>
//                         </div>

//                         {/* Price and Quantity */}
//                         <div className="flex items-center justify-between">
//                           <div className="flex items-center gap-4">
//                             <CartItemActions
//                               cartId={item.id}
//                               currentQuantity={item.quantity}
//                               productName={item.product.name}
//                             />
//                             <div className="text-sm text-muted-foreground">
//                               ${item.product.price} each
//                             </div>
//                           </div>

//                           {/* Total Price */}
//                           <div className="text-right">
//                             <div className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
//                               ${(item.product.price * item.quantity).toFixed(2)}
//                             </div>
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   </CardContent>
//                 </Card>
//               ))}
//             </div>
//           </div>

//           {/* Order Summary */}
//           <div className="lg:col-span-1">
//             <Card className="sticky top-4 border-0 bg-gradient-to-br from-background to-muted/30 backdrop-blur-sm shadow-xl">
//               <CardHeader>
//                 <CardTitle className="flex items-center gap-2">
//                   <Package className="w-5 h-5" />
//                   Order Summary
//                 </CardTitle>
//               </CardHeader>
//               <CardContent className="space-y-6">
//                 {/* Price Breakdown */}
//                 <div className="space-y-3">
//                   <div className="flex justify-between text-sm">
//                     <span>Subtotal ({cartItems.length} items)</span>
//                     <span>${totalAmount.toFixed(2)}</span>
//                   </div>
//                   <div className="flex justify-between text-sm text-green-600">
//                     <span>You save</span>
//                     <span>-${savings.toFixed(2)}</span>
//                   </div>
//                   <div className="flex justify-between text-sm">
//                     <span>Shipping</span>
//                     <span>
//                       {shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}
//                     </span>
//                   </div>
//                   <Separator />
//                   <div className="flex justify-between font-bold text-lg">
//                     <span>Total</span>
//                     <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
//                       ${finalTotal.toFixed(2)}
//                     </span>
//                   </div>
//                 </div>

//                 {/* Free Shipping Progress */}
//                 {totalAmount < 100 && (
//                   <div className="bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-950/20 dark:to-cyan-950/20 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
//                     <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 text-sm mb-2">
//                       <Truck className="w-4 h-4" />
//                       <span>
//                         Add ${(100 - totalAmount).toFixed(2)} more for FREE
//                         shipping!
//                       </span>
//                     </div>
//                     <div className="w-full bg-blue-200 dark:bg-blue-800 rounded-full h-2">
//                       <div
//                         className="bg-gradient-to-r from-blue-500 to-cyan-500 h-2 rounded-full transition-all duration-1000"
//                         style={{ width: `${(totalAmount / 100) * 100}%` }}
//                       />
//                     </div>
//                   </div>
//                 )}

//                 {/* Trust Indicators */}
//                 <div className="grid grid-cols-3 gap-4 text-center">
//                   {[
//                     { icon: Shield, text: "Secure" },
//                     { icon: Truck, text: "Fast Ship" },
//                     { icon: Star, text: "Quality" },
//                   ].map(({ icon: Icon, text }) => (
//                     <div
//                       key={text}
//                       className="flex flex-col items-center gap-1"
//                     >
//                       <Icon className="w-5 h-5 text-muted-foreground" />
//                       <span className="text-xs text-muted-foreground">
//                         {text}
//                       </span>
//                     </div>
//                   ))}
//                 </div>

//                 {/* Checkout Button */}
//                 <Button
//                   size="lg"
//                   className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white border-0 shadow-lg"
//                   asChild
//                 >
//                   {/* <Link href="/checkout/authenticated"> */}
//                   <Link
//                     href={
//                       isAuthenticated
//                         ? "/checkout/authenticated"
//                         : "/signup?next=/checkout/authenticated"
//                     }
//                   >
//                     <CreditCard className="w-5 h-5 mr-2" />
//                     Proceed to Checkout
//                     <ArrowRight className="w-4 h-4 ml-2" />
//                   </Link>
//                 </Button>

//                 <Button variant="outline" size="lg" className="w-full" asChild>
//                   <Link href="/products">Continue Shopping</Link>
//                 </Button>
//               </CardContent>
//             </Card>
//           </div>
//         </div>

//         {/* Recommendations */}
//         <div className="mt-16">
//           <Card className="border-0 bg-gradient-to-br from-background to-muted/30 backdrop-blur-sm">
//             <CardContent className="p-8">
//               <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
//                 <Heart className="w-5 h-5" />
//                 You might also like
//               </h3>
//               <p className="text-muted-foreground mb-6">
//                 Based on items in your cart
//               </p>
//               <div className="text-center py-8 text-muted-foreground">
//                 <Package className="w-12 h-12 mx-auto mb-2 opacity-50" />
//                 Recommendations will appear here
//               </div>
//             </CardContent>
//           </Card>
//         </div>
//       </div>
//     </div>
//   );
// }

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
  const savings = totalAmount * 0.15; // Mock savings
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
                          <h3 className="font-medium text-base mb-2 hover:underline">
                            {item.product.name}
                          </h3>
                        </Link>
                        <p className="text-sm text-muted-foreground  tracking-wide">
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
                    <div className="flex justify-between text-base">
                      <span className="text-muted-foreground">
                        Subtotal ({cartItems.length}{" "}
                        {cartItems.length === 1 ? "item" : "items"})
                      </span>
                      <span className="font-medium">
                        €{totalAmount.toFixed(0)}
                      </span>
                    </div>

                    <div className="flex justify-between text-base">
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
                      <div className="flex justify-between text-xl font-bold">
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
                <Button
                  size="lg"
                  className="w-full text-base font-semibold"
                  asChild
                >
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

                {/* Trust Badges */}
                <div className="pt-6 border-t space-y-3">
                  <div className="flex items-center gap-3">
                    <Shield className="w-5 h-5 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">
                      Secure Payment
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Truck className="w-5 h-5 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">
                      Fast Delivery
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Star className="w-5 h-5 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">
                      Top Quality
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
