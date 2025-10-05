"use client";
import { Button } from "@/components/ui/button";
import { CreditCard, ArrowRight } from "lucide-react";
import Link from "next/link";

export function CheckoutButton({ isAuthenticated, guestToken, cartItems }) {
  const handleCheckoutClick = () => {
    if (!isAuthenticated && guestToken) {
      // Show signup overlay for guest users
      window.location.href = "/cart?showSignup=true";
    } else if (!isAuthenticated && !guestToken) {
      // Redirect to home if no guest token
      window.location.href = "/";
    }
    // If authenticated, the link will work normally
  };

  if (!isAuthenticated && guestToken) {
    return (
      <Button
        size="lg"
        className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white border-0 shadow-lg"
        onClick={handleCheckoutClick}
      >
        <CreditCard className="w-5 h-5 mr-2" />
        Proceed to Checkout
        <ArrowRight className="w-4 h-4 ml-2" />
      </Button>
    );
  }

  if (!isAuthenticated && !guestToken) {
    return (
      <Button
        size="lg"
        className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white border-0 shadow-lg"
        onClick={() => (window.location.href = "/")}
      >
        <CreditCard className="w-5 h-5 mr-2" />
        Proceed to Checkout
        <ArrowRight className="w-4 h-4 ml-2" />
      </Button>
    );
  }

  // Authenticated user - normal link
  return (
    <Button
      size="lg"
      className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white border-0 shadow-lg"
      asChild
    >
      <Link href="/checkout/authenticated">
        <CreditCard className="w-5 h-5 mr-2" />
        Proceed to Checkout
        <ArrowRight className="w-4 h-4 ml-2" />
      </Link>
    </Button>
  );
}
