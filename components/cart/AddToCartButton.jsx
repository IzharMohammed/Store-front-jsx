"use client";

import { addToCart } from "@/actions/cart";
import { useState, useTransition } from "react";
import { toast } from "sonner";
import { useOverlay } from "@/components/OverlayProvider";

export default function AddToCartButton({
  productId,
  productName = "Product",
  quantity = 1,
  className = "",
  disabled = false,
}) {
  const [isSuccess, setIsSuccess] = useState(false);
  const { openOverlay } = useOverlay();
  const [isPending, setIsPending] = useState(false);

  const handleCartAction = async () => {
    setIsPending(true);
    const retryResult = await addToCart(productId, quantity);
    setIsPending(false);
    if (retryResult.success) {
      setIsSuccess(true);
      toast.success(
        retryResult.message || `${productName} added to cart successfully!`
      );
      setTimeout(() => setIsSuccess(false), 3000);
    } else {
      toast.error(retryResult.message);
    }
  };

  const handleAddToCart = async () => {
    // if (isAuthenticated) {
      handleCartAction();
    // } else {
      // openOverlay("signin", async () => handleCartAction());
    // }
  };

  return (
    <button
      onClick={handleAddToCart}
      disabled={disabled || isPending}
      // className={`px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
      className={`px-4 py-2 bg-black hover:bg-gray-800 text-white dark:bg-white dark:hover:bg-gray-100 dark:text-black rounded disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 ${className}`}
    >
      {/* Loading State */}
      {isPending && (
        <>
          <span>Adding...</span>
        </>
      )}

      {/* Success State */}
      {!isPending && isSuccess && (
        <>
          <div></div>
          <span>Added!</span>
        </>
      )}

      {/* Default State */}
      {!isPending && !isSuccess && (
        <>
          <span>Add to Cart</span>
        </>
      )}
    </button>
  );
}
