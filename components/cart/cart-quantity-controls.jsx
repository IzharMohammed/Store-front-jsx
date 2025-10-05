"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Minus, Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { updateCartQuantity, removeFromCart } from "@/actions/cart";
import { useOverlay } from "@/components/OverlayProvider";

export default function CartQuantityControls({
  cartItem,
  productStock,
  className = "",
  showRemoveButton = true,
  variant = "default", // "default" | "compact"
}) {
  const [quantity, setQuantity] = useState(cartItem.quantity);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isRemoving, setIsRemoving] = useState(false);
  const { openOverlay } = useOverlay();

  const handleQuantityUpdate = async (newQuantity) => {
    // if (!isAuthenticated) {
    //   openOverlay("signin");
    //   return;
    // }

    if (newQuantity === quantity || newQuantity < 1) return;

    if (newQuantity > productStock) {
      toast.error(`Only ${productStock} items available in stock`);
      return;
    }

    setIsUpdating(true);
    try {
      await updateCartQuantity(cartItem.id, newQuantity);
      setQuantity(newQuantity);
      toast.success("Cart updated successfully");
    } catch (error) {
      toast.error(error.message || "Failed to update cart");
    } finally {
      setIsUpdating(false);
    }
  };

  const handleRemove = async () => {
    // if (!isAuthenticated) {
    //   openOverlay("signin");
    //   return;
    // }

    setIsRemoving(true);
    try {
      await removeFromCart(cartItem.id);
      toast.success("Item removed from cart");
    } catch (error) {
      toast.error(error.message || "Failed to remove item");
    } finally {
      setIsRemoving(false);
    }
  };

  const increment = () => handleQuantityUpdate(quantity + 1);
  const decrement = () => {
    if (quantity === 1 && showRemoveButton) {
      handleRemove();
    } else {
      handleQuantityUpdate(quantity - 1);
    }
  };

  if (variant === "compact") {
    return (
      <div className={`flex items-center gap-1 ${className}`}>
        <Button
          variant="outline"
          size="sm"
          onClick={decrement}
          disabled={isUpdating || isRemoving}
          className="h-7 w-7 p-0 shrink-0"
        >
          {quantity === 1 && showRemoveButton ? (
            <Trash2 className="h-3 w-3" />
          ) : (
            <Minus className="h-3 w-3" />
          )}
        </Button>

        <span className="text-sm font-medium min-w-[2ch] text-center px-1">
          {quantity}
        </span>

        <Button
          variant="outline"
          size="sm"
          onClick={increment}
          disabled={isUpdating || quantity >= productStock}
          className="h-7 w-7 p-0 shrink-0"
        >
          <Plus className="h-3 w-3" />
        </Button>
      </div>
    );
  }

  return (
    <div className={`flex items-center justify-between gap-2 ${className}`}>
      <div className="flex items-center gap-2 flex-1">
        <Button
          variant="outline"
          size="sm"
          onClick={decrement}
          disabled={isUpdating || isRemoving}
          className="h-8 w-8 p-0 shrink-0"
        >
          {quantity === 1 && showRemoveButton ? (
            <Trash2 className="h-3 w-3" />
          ) : (
            <Minus className="h-3 w-3" />
          )}
        </Button>

        <div className="flex-1 text-center">
          <span className="text-sm font-medium">
            {isUpdating ? "..." : quantity}
          </span>
        </div>

        <Button
          variant="outline"
          size="sm"
          onClick={increment}
          disabled={isUpdating || quantity >= productStock}
          className="h-8 w-8 p-0 shrink-0"
        >
          <Plus className="h-3 w-3" />
        </Button>
      </div>

      {/* In Cart Badge */}
      <div className="text-xs text-muted-foreground">In Cart</div>
    </div>
  );
}
