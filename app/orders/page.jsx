import { getOrders } from "@/actions/order";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Package,
  Calendar,
  MapPin,
  Mail,
  Phone,
  User,
  ShoppingBag,
} from "lucide-react";
import Link from "next/link";
import { OrderCard } from "@/components/order/order-card";
import { RefreshOrdersButton } from "@/components/order/refresh-orders-button";

const statusColors = {
  PENDING:
    "bg-yellow-100 text-yellow-800 border-yellow-200 dark:bg-yellow-900/20 dark:text-yellow-300 dark:border-yellow-800",
  PROCESSING:
    "bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900/20 dark:text-blue-300 dark:border-blue-800",
  SHIPPED:
    "bg-purple-100 text-purple-800 border-purple-200 dark:bg-purple-900/20 dark:text-purple-300 dark:border-purple-800",
  DELIVERED:
    "bg-green-100 text-green-800 border-green-200 dark:bg-green-900/20 dark:text-green-300 dark:border-green-800",
  CANCELLED:
    "bg-red-100 text-red-800 border-red-200 dark:bg-red-900/20 dark:text-red-300 dark:border-red-800",
};

const statusIcons = {
  PENDING: "⏳",
  PROCESSING: "🔄",
  SHIPPED: "🚚",
  DELIVERED: "✅",
  CANCELLED: "❌",
};

const formatAddress = (address) => {
  if (typeof address === "string") {
    return address;
  }
  const addr = address;
  return `${addr.street}, ${addr.city}, ${addr.state} ${addr.zipCode}, ${addr.country}`;
};

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

// Order Item Component

const OrderItem = ({ item }) => {
  return (
    <div className="flex items-center space-x-4 p-4 bg-muted/50 rounded-lg border">
      {(item.productImage || item.product?.image) && (
        <div className="w-16 h-16 relative rounded-lg overflow-hidden bg-muted">
          <img
            src={item.productImage || item.product?.image}
            alt={item.productName || item.product?.name || "Product"}
            className="w-full h-full object-cover"
          />
        </div>
      )}
      <div className="flex-1">
        <h5 className="font-medium text-foreground">
          {item.productName || item.product?.name || "Unknown Product"}
        </h5>
        <p className="text-sm text-muted-foreground">
          Quantity: {item.quantity} × ${item.price.toFixed(2)}
        </p>
      </div>
      <div className="text-right">
        <p className="font-semibold text-foreground">
          ${(item.quantity * item.price).toFixed(2)}
        </p>
      </div>
    </div>
  );
};

// Empty State Component
const EmptyOrders = () => {
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
const OrdersLoading = () => {
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
const OrdersError = ({ error }) => {
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

// Main Orders Page Component
export default async function OrdersPage() {
  try {
    const ordersData = await getOrders();
    const orders = ordersData?.data || [];

    if (!orders.length) {
      return (
        <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
          <div className="container mx-auto px-4 py-8 max-w-6xl">
            <EmptyOrders />
          </div>
        </div>
      );
    }

    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
        <div className="container mx-auto px-4 py-8 max-w-6xl">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                <Package className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-3xl md:text-4xl font-bold">My Orders</h1>
              </div>
            </div>
            <p className="text-muted-foreground">
              You have {ordersData.count} order
              {ordersData.count !== 1 ? "s" : ""}
            </p>
          </div>

          {/* Orders List */}
          <div className="space-y-6">
            {orders.map((order, index) => (
              //@ts-ignore
              <OrderCard key={order.id} order={order} index={index} />
            ))}
          </div>

          {/* Refresh Button */}
          <div className="text-center mt-8">
            <RefreshOrdersButton />
          </div>
        </div>
      </div>
    );
  } catch (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
        <div className="container mx-auto px-4 py-8 max-w-6xl">
          <OrdersError error={error} />
        </div>
      </div>
    );
  }
}
