"use client";

import { useState, useEffect } from "react";
import {
  ShoppingCart,
  ArrowRight,
  Package,
  Sparkles,
  CreditCard,
  Heart,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function BottomCheckoutNavbar({ cartItems = [] }) {
  const [isVisible, setIsVisible] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [sparkleIndex, setSparkleIndex] = useState(0);

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const totalAmount = cartItems.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  useEffect(() => {
    if (cartItems.length > 0) {
      setIsVisible(true);
      setIsAnimating(true);
      const timer = setTimeout(() => setIsAnimating(false), 1000);
      return () => clearTimeout(timer);
    } else {
      setIsVisible(false);
    }
  }, [cartItems.length]);

  // Sparkle animation effect
  useEffect(() => {
    if (isVisible) {
      const sparkleTimer = setInterval(() => {
        setSparkleIndex((prev) => (prev + 1) % 3);
      }, 2000);
      return () => clearInterval(sparkleTimer);
    }
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <>
      {/* Backdrop blur overlay */}
      <div
        className={`fixed inset-0 pointer-events-none z-40 transition-opacity duration-500 ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
        style={{
          background:
            "linear-gradient(to top, rgba(0,0,0,0.1) 0%, transparent 20%)",
        }}
      />

      {/* Main Bottom Navbar */}
      <div
        className={`fixed bottom-0 left-0 right-0 z-50 transform transition-all duration-500 ease-out ${
          isVisible
            ? "translate-y-0 opacity-100 scale-100"
            : "translate-y-full opacity-0 scale-95"
        }`}
      >
        {/* Glow effect */}
        <div className="absolute inset-0 bg-gradient-to-t from-purple-500/20 via-pink-500/10 to-transparent blur-xl" />

        {/* Main container */}
        <div className="relative bg-background/95 backdrop-blur-xl border-t border-border/50 shadow-2xl">
          {/* Animated border gradient */}
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent" />

          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              {/* Cart Summary - Left Side */}
              <div className="flex items-center gap-4">
                {/* Animated Cart Icon */}
                <div className="relative">
                  {/* <div
                    className={`w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center transition-all duration-300 ${
                      isAnimating ? "animate-bounce" : "hover:scale-110"
                    }`}
                  >
                    <ShoppingCart className="w-6 h-6 text-white" />
                  </div> */}

                  {/* Item count badge */}
                  {/* <div
                    className={`absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center transition-all duration-300 ${
                      isAnimating ? "animate-pulse scale-110" : ""
                    }`}
                  >
                    {totalItems > 99 ? "99+" : totalItems}
                  </div> */}

                  {/* Sparkle effects */}
                  {/* {[0, 1, 2].map((index) => (
                    <Sparkles
                      key={index}
                      className={`absolute w-3 h-3 text-yellow-400 transition-all duration-1000 ${
                        sparkleIndex === index ? "opacity-100 animate-ping" : "opacity-0"
                      }`}
                      style={{
                        top: index === 0 ? "-8px" : index === 1 ? "8px" : "2px",
                        left: index === 0 ? "8px" : index === 1 ? "-8px" : "16px",
                      }}
                    />
                  ))} */}
                </div>

                {/* Cart Details */}
                <div className="hidden sm:block">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-muted-foreground">
                      {totalItems} {totalItems === 1 ? "item" : "items"}
                    </span>
                    <div className="w-1 h-1 bg-muted-foreground rounded-full" />
                    <span className="text-md  bg-clip-text">
                      ${totalAmount.toFixed(2)}
                    </span>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Ready for checkout
                  </div>
                </div>
              </div>

              {/* Action Buttons - Right Side */}
              <div className="flex items-center gap-3">
                {/* View Cart Button - Mobile/Desktop */}
                <Link href="/cart" className="hidden sm:block">
                  <Button
                    variant="outline"
                    size="sm"
                    className="group hover:bg-muted/50 transition-all duration-300 hover:scale-105"
                  >
                    <Package className="w-4 h-4 mr-2 group-hover:rotate-12 transition-transform" />
                    View Cart
                  </Button>
                </Link>

                {/* Mobile View Cart */}
                <Link href="/cart" className="sm:hidden">
                  <Button
                    variant="outline"
                    size="sm"
                    className="hover:bg-muted/50 transition-all duration-300 hover:scale-105"
                  >
                    <Package className="w-4 h-4" />
                  </Button>
                </Link>

                {/* Checkout Button */}
                <Link href="/checkout/authenticated">
                  <Button size="sm" className="group relative  px-6">
                    {/* Animated background */}
                    <div className="absolute" />

                    <div className="relative flex items-center gap-2">
                      <CreditCard className="w-4 h-4" />
                      <span className="hidden sm:inline">Checkout</span>
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </Button>
                </Link>
              </div>
            </div>

            {/* Progress bar for free shipping (optional) */}
            {totalAmount < 100 && (
              <div className="mt-3 px-2">
                <div className="flex items-center justify-between text-xs text-muted-foreground mb-1">
                  {/* <span>Add ${(100 - totalAmount).toFixed(2)} more for FREE shipping!</span> */}
                  {/* <span>{Math.round((totalAmount / 100) * 100)}%</span> */}
                </div>
                <div className="w-full bg-muted rounded-full h-1.5">
                  <div
                    className="bg-gradient-to-r from-green-500 to-emerald-500 h-1.5 rounded-full transition-all duration-1000 ease-out"
                    style={{
                      width: `${Math.min((totalAmount / 100) * 100, 100)}%`,
                    }}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
