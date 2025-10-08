// import Image from "next/image";
// import { Badge } from "@/components/ui/badge";
// import { Button } from "@/components/ui/button";
// import { Separator } from "@/components/ui/separator";
// import AddToCartButton from "../cart/AddToCartButton";
// import { cookieManager } from "@/utils/authTools";
// import { getCartItems } from "@/actions/cart";
// import { getWishlistItems } from "@/actions/wishlist";
// import CartQuantityControls from "../cart/cart-quantity-controls";
// import { WishlistButton } from "../wishlist/wishlistButton";
// import { ProductFeedbackSection } from "@/components/feedback/product-feedback-section";
// import ProductImageGallery from "./product-image-gallery";

// export async function ProductDetails({ product }) {
//   const formattedPrice = new Intl.NumberFormat("en-US", {
//     style: "currency",
//     currency: "USD",
//   }).format(product.price);

//   const isInStock = product.stock > 0;
//   const isLowStock = product.stock > 0 && product.stock <= 10;

//   const [isAuthenticated, cartData, wishlistData] = await Promise.all([
//     cookieManager.isAuthenticated(),
//     getCartItems(),
//     getWishlistItems(),
//   ]);

//   // Find if this product is in cart
//   const cartItem = cartData?.data?.find(
//     (item) => item.productId === product.id
//   );
//   const isInCart = !!cartItem;

//   const images = Array.isArray(product.image) ? product.image : [product.image];

//   return (
//     <div className="min-h-screen">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//         {/* Breadcrumb */}
//         <nav className="flex mb-8 text-sm">
//           <a href="/" className="text-muted-foreground hover:text-foreground">
//             Home
//           </a>
//           <span className="mx-2 text-muted-foreground">/</span>
//           <a
//             href="/products"
//             className="text-muted-foreground hover:text-foreground"
//           >
//             Products
//           </a>
//           <span className="mx-2 text-muted-foreground">/</span>
//           <span className="text-foreground">{product.category}</span>
//         </nav>

//         <div className="lg:grid lg:grid-cols-2 lg:gap-x-8 lg:items-start">
//           {/* Product Image Gallery */}
//           <ProductImageGallery
//             images={images}
//             productName={product.name}
//             isInStock={isInStock}
//           />

//           {/* Product Info */}
//           <div className="mt-10 px-4 sm:px-0 sm:mt-16 lg:mt-0">
//             <div className="flex items-center justify-between">
//               <Badge variant="secondary" className="mb-4">
//                 {product.category}
//               </Badge>

//               {/* Wishlist Button */}
//               <WishlistButton
//                 isAuthenticated={isAuthenticated}
//                 wishlistData={wishlistData}
//                 productId={product.id}
//                 className="mb-4"
//               />
//             </div>

//             <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
//               {product.name}
//             </h1>

//             <div className="mt-3">
//               <p className="text-3xl font-bold">{formattedPrice}</p>
//             </div>

//             {/* Stock Status */}
//             <div className="mt-4">
//               {isInStock ? (
//                 <div className="flex items-center space-x-2">
//                   <div className="flex items-center">
//                     <div className="h-2 w-2 bg-green-500 rounded-full mr-2"></div>
//                     <span className="text-sm text-green-600 font-medium">
//                       In Stock
//                     </span>
//                   </div>
//                   <span className="text-sm text-muted-foreground">
//                     ({product.stock} available)
//                   </span>
//                   {isLowStock && (
//                     <Badge
//                       variant="outline"
//                       className="text-orange-600 border-orange-300"
//                     >
//                       Low Stock
//                     </Badge>
//                   )}
//                 </div>
//               ) : (
//                 <div className="flex items-center">
//                   <div className="h-2 w-2 bg-red-500 rounded-full mr-2"></div>
//                   <span className="text-sm text-red-600 font-medium">
//                     Out of Stock
//                   </span>
//                 </div>
//               )}
//             </div>

//             <div className="mt-6">
//               <h3 className="sr-only">Description</h3>
//               <div className="text-base text-muted-foreground">
//                 <p>{product.description}</p>
//               </div>
//             </div>

//             <Separator className="my-6" />

//             {/* Cart Actions */}
//             <div className="mt-8 flex flex-col space-y-4">
//               {isInCart ? (
//                 <div className="space-y-4">
//                   {/* Product is in cart - show quantity controls */}
//                   <div className="p-4 border rounded-lg bg-muted/10">
//                     <div className="flex items-center justify-between mb-3">
//                       <span className="text-sm font-medium text-muted-foreground">
//                         This item is in your cart
//                       </span>
//                       <Badge variant="outline" className="text-xs">
//                         In Cart
//                       </Badge>
//                     </div>
//                     <CartQuantityControls
//                       cartItem={cartItem}
//                       isAuthenticated={isAuthenticated}
//                       productStock={product.stock}
//                       variant="default"
//                       showRemoveButton={true}
//                     />
//                   </div>
//                 </div>
//               ) : (
//                 <div className="flex space-x-4">
//                   {/* Product not in cart - show add to cart button */}
//                   <AddToCartButton
//                     isAuthenticated={isAuthenticated}
//                     productId={product.id}
//                     productName={product.name}
//                     disabled={!isInStock}
//                     className="flex-1 h-12 text-base font-semibold"
//                   />
//                 </div>
//               )}

//               {!isInStock && (
//                 <Button variant="outline" size="lg" className="w-full">
//                   Notify When Available
//                 </Button>
//               )}
//             </div>

//             {/* Quick Actions */}
//             {/* {isInStock && (
//               <div className="mt-6 flex gap-3">
//                 <Button
//                   variant="outline"
//                   size="sm"
//                   className="flex-1"
//                   // onClick={() => {
//                   //   // Add functionality for quick buy
//                   //   console.log("Buy now clicked");
//                   // }}
//                 >
//                   Buy Now
//                 </Button>
//               </div>
//             )} */}

//             {/* Product Details */}
//             <div className="mt-8 border-t pt-8">
//               <h3 className="text-lg font-medium mb-4">Product Details</h3>
//               <div className="space-y-2 text-sm">
//                 <div className="flex justify-between">
//                   <span className="text-muted-foreground">Category:</span>
//                   <Badge variant="outline" className="text-xs">
//                     {product.category}
//                   </Badge>
//                 </div>
//                 <div className="flex justify-between">
//                   <span className="text-muted-foreground">Status:</span>
//                   <Badge
//                     variant={
//                       product.status === "ACTIVE" ? "default" : "secondary"
//                     }
//                     className="text-xs"
//                   >
//                     {product.status}
//                   </Badge>
//                 </div>
//                 <div className="flex justify-between">
//                   <span className="text-muted-foreground">Added:</span>
//                   <span>
//                     {new Date(product.createdAt).toLocaleDateString("en-US", {
//                       year: "numeric",
//                       month: "long",
//                       day: "numeric",
//                     })}
//                   </span>
//                 </div>
//                 {cartItem && (
//                   <div className="flex justify-between">
//                     <span className="text-muted-foreground">In Cart:</span>
//                     <span className="font-medium text-green-600">
//                       {cartItem.quantity}{" "}
//                       {cartItem.quantity === 1 ? "item" : "items"}
//                     </span>
//                   </div>
//                 )}
//               </div>
//             </div>

//             {/* Shipping & Returns Info */}
//             <div className="mt-8 border-t pt-8">
//               <h3 className="text-lg font-medium mb-4">Shipping & Returns</h3>
//               <div className="space-y-3 text-sm text-muted-foreground">
//                 <div className="flex items-start gap-3">
//                   <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
//                   <p>Free shipping on orders over $50</p>
//                 </div>
//                 <div className="flex items-start gap-3">
//                   <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
//                   <p>30-day return policy</p>
//                 </div>
//                 <div className="flex items-start gap-3">
//                   <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
//                   <p>Estimated delivery: 3-5 business days</p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Product Feedback Section */}
//         <ProductFeedbackSection product={product} />
//       </div>
//     </div>
//   );
// }

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import AddToCartButton from "../cart/AddToCartButton";
import { cookieManager } from "@/utils/authTools";
import { getCartItems } from "@/actions/cart";
import { getWishlistItems } from "@/actions/wishlist";
import CartQuantityControls from "../cart/cart-quantity-controls";
import { WishlistButton } from "../wishlist/wishlistButton";
import { ProductFeedbackSection } from "@/components/feedback/product-feedback-section";
import ProductImageGallery from "./product-image-gallery";
import { Fraunces } from "next/font/google";
import { SimilarProducts } from "./similar-products";
const frauncesFont = Fraunces({
  subsets: ["latin"],
  weight: "200",
});

export async function ProductDetails({ product }) {
  const formatCurrency = (v) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(v);

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

  const images = Array.isArray(product.image) ? product.image : [product.image];
  console.log("product", typeof product.discount);

  // Price logic: show strike-through original and discounted price when provided
  const originalPrice = Number(product.price ?? 0);

  const discount =
    typeof product.discount === "number" ? Number(product.discount) : null;

  const discountPrice = originalPrice - (originalPrice * discount) / 100;

  const hasDiscount =
    typeof discountPrice === "number" &&
    discountPrice > 0 &&
    originalPrice > 0 &&
    discountPrice < originalPrice;

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

        <div className="lg:grid lg:grid-cols-[1.5fr_1fr] lg:gap-x-8 lg:items-start">
          {/* Left: All images grid */}
          <ProductImageGallery
            images={images}
            productName={product.name}
            isInStock={isInStock}
          />

          {/* Right: Info */}
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

            <h1
              className={`font-light tracking-tight sm:text-4xl ${frauncesFont.className} `}
            >
              {product.name}
            </h1>

            {/* Price with discount */}
            <div className="mt-3">
              {hasDiscount ? (
                <div className="flex items-baseline gap-3">
                  <span className="line-through text-muted-foreground">
                    {formatCurrency(originalPrice)}
                  </span>
                  <span className="font-bold text-foreground">
                    {formatCurrency(discountPrice)}
                  </span>
                  <Badge variant="outline" className="text-red-400">
                    {Math.round(
                      ((originalPrice - discountPrice) / originalPrice) * 100
                    )}
                    % off
                  </Badge>
                </div>
              ) : (
                <p className="text-3xl font-bold">
                  {formatCurrency(originalPrice)}
                </p>
              )}
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

            {/* Feature bullets under price */}
            <div className="mt-5 space-y-3 text-sm">
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-foreground rounded-full mt-2 flex-shrink-0"></div>
                <p>Free express 4-8 day shipping</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-foreground rounded-full mt-2 flex-shrink-0"></div>
                <p>30 day returns & exchanges</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-foreground rounded-full mt-2 flex-shrink-0"></div>
                <p>Made to order, never overproduced</p>
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

            {/* Accordions */}
            <div className="mt-10">
              {/* Description */}
              <details className="group border-t py-3" open>
                <summary className="flex cursor-pointer items-center justify-between font-medium">
                  <span className={`${frauncesFont.className}`}>
                    Description
                  </span>
                  <span className="ml-2 text-xl group-open:hidden">+</span>
                  <span className="ml-2 text-xl hidden group-open:inline">
                    −
                  </span>
                </summary>
                <div className="mt-3 text-sm text-muted-foreground">
                  <p>
                    {product.description ??
                      "The Aloha sandal is a celebration of timeless elegance. A statement yet casual look that compliments any outfit. Hand made with premium cowhide leather and a featherlight soft moulded footbed for all day comfort."}
                  </p>
                </div>
              </details>

              {/* Product Details (dummy data) */}
              <details className="group border-t py-3">
                <summary className="flex cursor-pointer items-center justify-between font-medium">
                  <span className={`${frauncesFont.className}`}>
                    Product Details
                  </span>
                  <span className="ml-2 text-xl group-open:hidden">+</span>
                  <span className="ml-2 text-xl hidden group-open:inline">
                    −
                  </span>
                </summary>
                <div className="mt-3 space-y-3 text-sm">
                  <p>
                    <span className="font-semibold">Color:</span> Black
                  </p>
                  <p>
                    <span className="font-semibold">Heel Height:</span> 1.1”
                    (3cm)
                  </p>
                  <p>
                    <span className="font-semibold">Material:</span> 100%
                    genuine leather upper & in-sole
                  </p>
                  <p>
                    <span className="font-semibold">Bottom:</span> High grip
                    non-slip base
                  </p>
                  <div>
                    <p className="font-semibold">Features:</p>
                    <ul className="mt-2 list-disc pl-6 space-y-1">
                      <li>
                        <span className="font-semibold">Featherlight:</span>{" "}
                        Super light design, 165 grams per sandal.
                      </li>
                      <li>
                        <span className="font-semibold">Arch support:</span>{" "}
                        Avoids plantar fasciitis and Achilles tendinitis.
                      </li>
                      <li>
                        <span className="font-semibold">
                          Cushioned footbed:
                        </span>{" "}
                        Shock absorbing, preventing stress fractures.
                      </li>
                      <li>
                        <span className="font-semibold">Raised toe bar:</span>{" "}
                        Prevents hammer toes and slippage.
                      </li>
                      <li>
                        <span className="font-semibold">Deep heel cup:</span>{" "}
                        Adds stability, preventing knee stress and pronation.
                      </li>
                    </ul>
                  </div>
                </div>
              </details>

              {/* Size Chart (dummy) */}
              <details className="group border-t py-3">
                <summary className="flex cursor-pointer items-center justify-between font-medium">
                  <span className={`${frauncesFont.className}`}>
                    Size Chart
                  </span>
                  <span className="ml-2 text-xl group-open:hidden">+</span>
                  <span className="ml-2 text-xl hidden group-open:inline">
                    −
                  </span>
                </summary>
                <div className="mt-3 text-sm text-muted-foreground">
                  <p>
                    EU 35–36: US 5–6 · EU 37–38: US 7–8 · EU 39–40: US 9–10 · EU
                    41–42: US 11–12
                  </p>
                </div>
              </details>

              {/* Shipping Info (dummy incl. India) */}
              <details className="group border-t py-3">
                <summary className="flex cursor-pointer items-center justify-between font-medium">
                  <span className={`${frauncesFont.className}`}>
                    Shipping Info
                  </span>
                  <span className="ml-2 text-xl group-open:hidden">+</span>
                  <span className="ml-2 text-xl hidden group-open:inline">
                    −
                  </span>
                </summary>
                <div className="mt-3 space-y-2 text-sm text-muted-foreground">
                  <p>
                    We offer FREE worldwide shipping. All products are shipped
                    with express.
                  </p>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>United States: 4–8 business days</li>
                    <li>Canada: 4–8 business days</li>
                    <li>Australia: 3–7 business days</li>
                    <li>India: 5–9 business days</li>
                    <li>Rest of the World: 4–10 business days</li>
                  </ul>
                </div>
              </details>

              {/* Why Liberté */}
              <details className="group border-t py-3">
                <summary className="flex cursor-pointer items-center justify-between font-medium">
                  <span className={`${frauncesFont.className}`}>
                    Why Liberté
                  </span>
                  <span className="ml-2 text-xl group-open:hidden">+</span>
                  <span className="ml-2 text-xl hidden group-open:inline">
                    −
                  </span>
                </summary>
                <div className="mt-3 text-sm text-muted-foreground">
                  <ul className="list-disc pl-6 space-y-2">
                    <li>
                      <span className="font-semibold">Fast shipping:</span>{" "}
                      orders are shipped between 1–3 business days. Why wait?
                    </li>
                    <li>
                      <span className="font-semibold">
                        Highest quality products:
                      </span>{" "}
                      We don’t compromise on quality. Period.
                    </li>
                    <li>
                      <span className="font-semibold">On-Demand Shopping:</span>{" "}
                      We craft each product only when it's ordered, eliminating
                      waste through excess inventory.
                    </li>
                    <li>
                      <span className="font-semibold">
                        Ethical Labor Practices:
                      </span>{" "}
                      Our artisans receive base wage three times higher than
                      industry norms.
                    </li>
                    <li>
                      <span className="font-semibold">
                        Hassle-free returns:
                      </span>{" "}
                      Not happy? Return it and get a refund. No questions asked.
                    </li>
                    <li>
                      <span className="font-semibold">
                        Offsetting Carbon Emissions:
                      </span>{" "}
                      Liberté is part of DHL's Go Green initiative that reduces
                      carbon emissions by using sustainable marine and aviation
                      fuels.
                    </li>
                  </ul>
                </div>
              </details>
            </div>
          </div>
        </div>

        {/* Customer Feedback */}
        <ProductFeedbackSection product={product} />
        <div className="mt-50">
          <h2
            className={`text-3xl font-light mb-8 text-center tracking-tight ${frauncesFont.className}`}
          >
            Similar Products
          </h2>
          <div className="mx-auto w-24 h-[2px] bg-gray-300 mb-12"></div>
          <SimilarProducts />
        </div>
      </div>
    </div>
  );
}
