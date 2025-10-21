import { getOrders } from "@/actions/order";
import { OrderCard } from "@/components/order/order-card";
import {EmptyOrders,OrdersError} from "@/components/order/order-stuff";
import { Cormorant_Garamond } from "next/font/google";

const garamond = Cormorant_Garamond({
  weight: "500",
  style: "normal",
  subsets: ["latin"],
});

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
             
              <div>
                <h1 className={`text-3xl md:text-4xl font-bold ${garamond.className}`}>My Orders</h1>
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
            {/* <RefreshOrdersButton /> */}
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
