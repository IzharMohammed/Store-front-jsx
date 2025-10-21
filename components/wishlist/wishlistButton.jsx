"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";
import { cn } from "@/utils/format";
import { toast } from "sonner";
import { addToWishlist, removeFromWishlist } from "@/actions/wishlist";
import { useOverlay } from "../OverlayProvider";

export const WishlistButton = ({
  wishlistData,
  productId,
  variant = "outline",
  size = "default",
  className,
  onWishlistChange,
}) => {
  const { openOverlay } = useOverlay();
  const [isPending, setIsPending] = useState(false);

  const isInWishlist =
    wishlistData?.data?.some((item) => item.productId === productId) || false;
  const wishlistItem = wishlistData?.data?.find(
    (item) => item.productId === productId
  );

  const addToWishlistAction = async () => {
    setIsPending(true);
    if (isInWishlist && wishlistItem) {
      try {
        await removeFromWishlist(wishlistItem.id);
        setIsPending(false);
        toast.success("Item removed from wishlist");
      } catch (error) {
        toast.error("Failed to remove item from wishlist");
      }
    } else {
      try {
        await addToWishlist(productId);
        setIsPending(false);
        toast.success("Item added to wishlist");
      } catch (error) {
        toast.error("Failed to add item to wishlist");
      }
    }
  };

  // Toggle wishlist status
  const handleToggleWishlist = async () => {
    addToWishlistAction();
  };

  return (
    <Button
      variant={variant}
      size={size}
      onClick={handleToggleWishlist}
      disabled={isPending}
      className={cn(
        "h-8 w-8 p-0", // Fixed size for the icon button
        className,
        isInWishlist
          ? "text-red-500 hover:text-red-600"
          : "text-gray-500 hover:text-gray-600"
      )}
      title={isInWishlist ? "Remove from wishlist" : "Add to wishlist"}
    >
      <Heart className={cn("w-4 h-4", isInWishlist ? "fill-current" : "")} />
    </Button>
  );
};
