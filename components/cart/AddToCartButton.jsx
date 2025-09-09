"use client";

import { addToCart } from "@/actions/cart";
import { useState, useTransition } from "react";
import { toast } from "sonner";
import { useOverlay } from "@/components/OverlayProvider";

export default function AddToCartButton({
  isAuthenticated,
  productId,
  productName = "Product",
  quantity = 1,
  className = "",
  disabled = false,
}) {
  const [isPending, startTransition] = useTransition();
  const [isSuccess, setIsSuccess] = useState(false);
  const { openOverlay } = useOverlay();

  const handleAddToCart = async () => {
    alert(isAuthenticated);
    const result = await addToCart(productId, quantity);
    console.log(result);
    if (isAuthenticated) {
      startTransition(async () => {
        setIsSuccess(true);
        toast.success(`${productName} added to cart successfully!`);
        setTimeout(() => setIsSuccess(false), 3000);
      });
    } else if (result.reason === "unauthenticated") {
      openOverlay("signin", async () => {
        const retryResult = await addToCart(productId, quantity);
        if (retryResult.success) {
          setIsSuccess(true);
          toast.success(
            retryResult.message || `${productName} added to cart successfully!`
          );
          setTimeout(() => setIsSuccess(false), 3000);
        } else {
          toast.error(retryResult.message);
        }
      });
    } else {
      toast.error(result.message);
    }
  };

  return (
    <button
      onClick={handleAddToCart}
      disabled={disabled || isPending}
      className={`px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
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
