// "use client";

// import React, { useState, useMemo } from "react";
// import { Card, CardContent } from "@/components/ui/card";
// import { Badge } from "@/components/ui/badge";
// import { Package, Calendar, MapPin, Mail, Phone, User } from "lucide-react";
// import { OrderExpandToggle } from "@/components/order/order-expand-toggle";

// const statusColors = {
//   PENDING:
//     "bg-yellow-100 text-yellow-800 border-yellow-200 dark:bg-yellow-900/20 dark:text-yellow-300 dark:border-yellow-800",
//   PROCESSING:
//     "bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900/20 dark:text-blue-300 dark:border-blue-800",
//   SHIPPED:
//     "bg-purple-100 text-purple-800 border-purple-200 dark:bg-purple-900/20 dark:text-purple-300 dark:border-purple-800",
//   DELIVERED:
//     "bg-green-100 text-green-800 border-green-200 dark:bg-green-900/20 dark:text-green-300 dark:border-green-800",
//   CANCELLED:
//     "bg-red-100 text-red-800 border-red-200 dark:bg-red-900/20 dark:text-red-300 dark:border-red-800",
// };

// const statusIcons = {
//   PENDING: "⏳",
//   PROCESSING: "🔄",
//   SHIPPED: "🚚",
//   DELIVERED: "✅",
//   CANCELLED: "❌",
// };

// function formatDate(dateString) {
//   return new Date(dateString).toLocaleDateString("en-US", {
//     year: "numeric",
//     month: "long",
//     day: "numeric",
//     hour: "2-digit",
//     minute: "2-digit",
//   });
// }

// function formatAddress(address) {
//   if (typeof address === "string") {
//     return address;
//   }
//   const addr = address;
//   return `${addr.street}, ${addr.city}, ${addr.state} ${addr.zipCode}, ${addr.country}`;
// }

// const OrderItem = ({ item }) => {
//   return (
//     <div className="flex items-center space-x-4 p-4 bg-muted/50 rounded-lg border">
//       {(item.productImage || item.product?.image) && (
//         <div className="w-16 h-16 relative rounded-lg overflow-hidden bg-muted">
//           <img
//             src={item.productImage || item.product?.image}
//             alt={item.productName || item.product?.name || "Product"}
//             className="w-full h-full object-cover"
//           />
//         </div>
//       )}
//       <div className="flex-1">
//         <h5 className="font-medium text-foreground">
//           {item.productName || item.product?.name || "Unknown Product"}
//         </h5>
//         <p className="text-sm text-muted-foreground">
//           Quantity: {item.quantity} × ${item.price.toFixed(2)}
//         </p>
//       </div>
//       <div className="text-right">
//         <p className="font-semibold text-foreground">
//           ${(item.quantity * item.price).toFixed(2)}
//         </p>
//       </div>
//     </div>
//   );
// };

// export function OrderCard({ order }) {
//   const [isExpanded, setIsExpanded] = useState(false);

//   const previewItems = useMemo(() => order.items.slice(0, 2), [order.items]);
//   const hasMore = order.items.length > 2;

//   return (
//     <Card className="overflow-hidden border-0 bg-gradient-to-br from-background to-muted/30 backdrop-blur-sm hover:shadow-xl transition-all duration-500">
//       <CardContent className="p-6">
//         {/* Order Header */}
//         <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-4">
//           <div className="flex items-center space-x-4">
//             <div className="flex-shrink-0">
//               <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
//                 <span className="text-xl text-white">
//                   {statusIcons[order.status]}
//                 </span>
//               </div>
//             </div>
//             <div>
//               <h3 className="text-lg font-semibold text-foreground">
//                 Order #{order.id.slice(-8).toUpperCase()}
//               </h3>
//               <div className="flex items-center gap-2 text-sm text-muted-foreground">
//                 <Calendar className="w-4 h-4" />
//                 <span>Placed on {formatDate(order.createdAt)}</span>
//               </div>
//             </div>
//           </div>

//           <div className="flex items-center space-x-4">
//             <Badge
//               variant="secondary"
//               className={`px-3 py-1 text-sm font-medium ${
//                 statusColors[order.status]
//               }`}
//             >
//               {order.status}
//             </Badge>
//             <div className="text-right">
//               <p className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
//                 ${order.total.toFixed(2)}
//               </p>
//               <p className="text-sm text-muted-foreground">
//                 {order.items.length} item{order.items.length !== 1 ? "s" : ""}
//               </p>
//             </div>
//             <OrderExpandToggle
//               orderId={order.id}
//               isExpanded={isExpanded}
//               onToggle={() => setIsExpanded((v) => !v)}
//             />
//           </div>
//         </div>

//         {/* Order Items */}
//         <div className="space-y-3">
//           {(isExpanded ? order.items : previewItems).map((item) => (
//             <OrderItem key={item.id} item={item} />
//           ))}

//           {!isExpanded && hasMore && (
//             <div className="text-center p-2 text-sm text-muted-foreground bg-muted/30 rounded-lg">
//               +{order.items.length - 2} more item
//               {order.items.length - 2 !== 1 ? "s" : ""}
//             </div>
//           )}
//         </div>

//         {/* Customer & Shipping Info */}
//         {isExpanded && (
//           <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6 pt-6 border-t border-border">
//             <div>
//               <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
//                 <User className="w-4 h-4" />
//                 Customer Information
//               </h4>
//               <div className="space-y-2 text-sm">
//                 {order.customerName && (
//                   <div className="flex items-center gap-2">
//                     <User className="w-3 h-3 text-muted-foreground" />
//                     <span>{order.customerName}</span>
//                   </div>
//                 )}
//                 <div className="flex items-center gap-2">
//                   <Mail className="w-3 h-3 text-muted-foreground" />
//                   <span>{order.customerEmail}</span>
//                 </div>
//                 {order.customerPhone && (
//                   <div className="flex items-center gap-2">
//                     <Phone className="w-3 h-3 text-muted-foreground" />
//                     <span>{order.customerPhone}</span>
//                   </div>
//                 )}
//               </div>
//             </div>

//             <div>
//               <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
//                 <MapPin className="w-4 h-4" />
//                 Shipping Address
//               </h4>
//               <p className="text-sm text-muted-foreground">
//                 {formatAddress(order.shippingAddress)}
//               </p>
//             </div>
//           </div>
//         )}

//         {/* Order Summary */}
//         {isExpanded && (
//           <div className="flex justify-end mt-6 pt-4 border-t border-border">
//             <div className="text-right">
//               <div className="flex justify-between items-center mb-2 min-w-[200px]">
//                 <span className="text-muted-foreground">Subtotal:</span>
//                 <span className="font-medium">
//                   $
//                   {order.items
//                     .reduce((sum, item) => sum + item.quantity * item.price, 0)
//                     .toFixed(2)}
//                 </span>
//               </div>
//               <div className="flex justify-between items-center text-lg font-bold border-t border-border pt-2">
//                 <span>Total:</span>
//                 <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
//                   ${order.total.toFixed(2)}
//                 </span>
//               </div>
//             </div>
//           </div>
//         )}
//       </CardContent>
//     </Card>
//   );
// }

"use client";

import React, { useState, useMemo } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Package, Calendar, MapPin, Mail, Phone, User } from "lucide-react";
import { OrderExpandToggle } from "@/components/order/order-expand-toggle";

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

function formatDate(dateString) {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function formatAddress(address) {
  if (typeof address === "string") return address;
  const addr = address;
  return `${addr.street}, ${addr.city}, ${addr.state} ${addr.zipCode}, ${addr.country}`;
}

const OrderItem = ({ item }) => (
  <div className="flex items-center space-x-4 p-4 bg-muted/40 rounded-lg border border-border">
    {(item.productImage || item.product?.image) && (
      <div className="w-16 h-16 relative rounded-md overflow-hidden bg-muted shrink-0">
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

export function OrderCard({ order }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const previewItems = useMemo(() => order.items.slice(0, 2), [order.items]);
  const hasMore = order.items.length > 2;

  return (
    <Card className="border border-border bg-background hover:shadow-md transition-all duration-300 rounded-xl">
      <CardContent className="p-6 space-y-5">
        {/* Order Header */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          {/* Left: ID + Date */}
          <div className="flex items-center gap-4">
            <div className="flex-shrink-0">
              <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center border border-border">
                <span className="text-xl">
                  {statusIcons[order.status] || "📦"}
                </span>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-medium text-foreground">
                Order #{order.id.slice(-8).toUpperCase()}
              </h3>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Calendar className="w-4 h-4" />
                <span>{formatDate(order.createdAt)}</span>
              </div>
            </div>
          </div>

          {/* Right: Status + Total */}
          <div className="flex items-center gap-4">
            <Badge
              variant="secondary"
              className={`px-3 py-1 text-sm font-medium rounded-full ${
                statusColors[order.status]
              }`}
            >
              {order.status}
            </Badge>
            <div className="text-right">
              <p className="text-xl font-medium">
                ${order.total.toFixed(2)}
              </p>
              <p className="text-sm text-muted-foreground">
                {order.items.length} item{order.items.length !== 1 ? "s" : ""}
              </p>
            </div>
            <OrderExpandToggle
              orderId={order.id}
              isExpanded={isExpanded}
              onToggle={() => setIsExpanded((v) => !v)}
            />
          </div>
        </div>

        {/* Order Items */}
        <div className="space-y-3">
          {(isExpanded ? order.items : previewItems).map((item) => (
            <OrderItem key={item.id} item={item} />
          ))}

          {!isExpanded && hasMore && (
            <div className="text-center p-2 text-sm text-muted-foreground bg-muted/30 rounded-lg">
              +{order.items.length - 2} more item
              {order.items.length - 2 !== 1 ? "s" : ""}
            </div>
          )}
        </div>

        {/* Expanded Details */}
        {isExpanded && (
          <>
            {/* Customer & Shipping Info */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pt-6 border-t border-border">
              <div>
                <h4 className="font-medium text-foreground mb-3 flex items-center gap-2">
                  <User className="w-4 h-4" />
                  Customer Information
                </h4>
                <div className="space-y-2 text-sm">
                  {order.customerName && (
                    <div className="flex items-center gap-2">
                      <User className="w-3 h-3 text-muted-foreground" />
                      <span>{order.customerName}</span>
                    </div>
                  )}
                  <div className="flex items-center gap-2">
                    <Mail className="w-3 h-3 text-muted-foreground" />
                    <span>{order.customerEmail}</span>
                  </div>
                  {order.customerPhone && (
                    <div className="flex items-center gap-2">
                      <Phone className="w-3 h-3 text-muted-foreground" />
                      <span>{order.customerPhone}</span>
                    </div>
                  )}
                </div>
              </div>

              <div>
                <h4 className="font-medium text-foreground mb-3 flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  Shipping Address
                </h4>
                <p className="text-sm text-muted-foreground">
                  {formatAddress(order.shippingAddress)}
                </p>
              </div>
            </div>

            {/* Order Summary */}
            <div className="flex justify-end mt-6 pt-4 border-t border-border">
              <div className="text-right space-y-1">
                <div className="flex justify-between items-center min-w-[220px]">
                  <span className="text-muted-foreground">Subtotal:</span>
                  <span className="font-medium">
                    $
                    {order.items
                      .reduce(
                        (sum, item) => sum + item.quantity * item.price,
                        0
                      )
                      .toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between items-center text-lg font-medium border-t border-border pt-2">
                  <span>Total:</span>
                  {/* <span className="text-rose-600"> */}
                    ${order.total.toFixed(2)}
                  {/* </span> */}
                </div>
              </div>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}
