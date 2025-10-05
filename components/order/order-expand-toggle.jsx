"use client";

import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";

export function OrderExpandToggle({ orderId, isExpanded, onToggle }) {
  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={onToggle}
      className="p-2 rounded-lg hover:bg-muted transition-colors"
      aria-label={
        isExpanded ? "Collapse order details" : "Expand order details"
      }
    >
      <ChevronDown
        className={`w-5 h-5 text-muted-foreground transition-transform duration-200 ${
          isExpanded ? "rotate-180" : ""
        }`}
      />
    </Button>
  );
}
