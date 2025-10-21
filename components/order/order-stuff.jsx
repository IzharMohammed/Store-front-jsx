import { Button } from "@/components/ui/button";
import { Package, ShoppingBag } from "lucide-react";
import { RefreshOrdersButton } from "./refresh-orders-button";
import Link from "next/link";

export const EmptyOrders = () => {
  return (
    <div className="text-center p-8 max-w-md mx-auto">
      <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
        <Package className="w-8 h-8 text-white" />
      </div>
      <h2 className="text-2xl font-bold text-foreground mb-4">No Orders Yet</h2>
      <p className="text-muted-foreground mb-6">
        You haven't placed any orders yet. Start shopping to see your orders
        here!
      </p>
      <Button
        className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white border-0"
        asChild
      >
        <Link href="/products">
          <ShoppingBag className="w-4 h-4 mr-2" />
          Start Shopping
        </Link>
      </Button>
    </div>
  );
};

// Loading State Component
export const OrdersLoading = () => {
  return (
    <div className="flex justify-center items-center min-h-[400px]">
      <div className="flex flex-col items-center space-y-4">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        <p className="text-muted-foreground">Loading your orders...</p>
      </div>
    </div>
  );
};

// Error State Component
export const OrdersError = ({ error }) => {
  return (
    <div className="text-center p-8 max-w-md mx-auto">
      <div className="w-16 h-16 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
        <span className="text-2xl">⚠️</span>
      </div>
      <h2 className="text-2xl font-bold text-foreground mb-4">
        Failed to Load Orders
      </h2>
      <p className="text-muted-foreground mb-6">
        We encountered an error while fetching your orders. Please try again.
      </p>
      <RefreshOrdersButton />
    </div>
  );
};
