"use client";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Package, 
  Smartphone, 
  Shirt, 
  Home, 
  Gamepad2, 
  Book, 
  Car, 
  Heart, 
  Grid3X3,
  ShoppingBag
} from "lucide-react";

// Category icon mapping
const categoryIcons = {
  all: ShoppingBag,
  electronics: Smartphone,
  clothing: Shirt,
  home: Home,
  books: Book,
  games: Gamepad2,
  automotive: Car,
  health: Heart,
  sports: Package,
  toys: Gamepad2,
  beauty: Heart,
  jewelry: Package,
  food: Package,
  default: Package
};

// Category colors for variety
const categoryColors = {
  all: "bg-gradient-to-br from-gray-500 to-gray-600",
  electronics: "bg-gradient-to-br from-blue-500 to-blue-600",
  clothing: "bg-gradient-to-br from-pink-500 to-pink-600",
  home: "bg-gradient-to-br from-green-500 to-green-600",
  books: "bg-gradient-to-br from-amber-500 to-amber-600",
  games: "bg-gradient-to-br from-purple-500 to-purple-600",
  automotive: "bg-gradient-to-br from-red-500 to-red-600",
  health: "bg-gradient-to-br from-teal-500 to-teal-600",
  sports: "bg-gradient-to-br from-orange-500 to-orange-600",
  toys: "bg-gradient-to-br from-yellow-500 to-yellow-600",
  beauty: "bg-gradient-to-br from-rose-500 to-rose-600",
  jewelry: "bg-gradient-to-br from-indigo-500 to-indigo-600",
  food: "bg-gradient-to-br from-lime-500 to-lime-600",
  default: "bg-gradient-to-br from-slate-500 to-slate-600"
};

export function CategoryCard({ category }) {
  const categoryKey = category.name.toLowerCase();
  const IconComponent = categoryIcons[categoryKey] || categoryIcons.default;
  const colorClass = categoryColors[categoryKey] || categoryColors.default;
  
  // Format category name for display
  const displayName = category.displayName || category.name;
  const formattedName = displayName === 'all' 
    ? 'All Products' 
    : displayName.split(' ').map(word => 
        word.charAt(0).toUpperCase() + word.slice(1)
      ).join(' ');

  const href = category.name === 'all' 
    ? '/products' 
    : `/products?category=${encodeURIComponent(category.name)}`;

  return (
    <Link href={href} className="group">
      <Card className="relative overflow-hidden bg-white dark:bg-card hover:shadow-lg transition-all duration-300 group-hover:scale-105 h-full border-2 hover:border-primary/20">
        <CardContent className="p-4 flex flex-col items-center text-center space-y-3">
          {/* Icon Container */}
          <div className={`
            w-14 h-14 rounded-full ${colorClass} 
            flex items-center justify-center 
            shadow-lg group-hover:shadow-xl transition-shadow duration-300
            relative overflow-hidden
          `}>
            <IconComponent className="w-7 h-7 text-white" />
            
            {/* Shine effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
          </div>
          
          {/* Category Name */}
          <div className="space-y-1">
            <h3 className="font-semibold text-sm leading-tight group-hover:text-primary transition-colors duration-200">
              {formattedName}
            </h3>
            
            {/* Product Count */}
            <Badge 
              variant="secondary" 
              className="text-xs font-medium bg-muted/50 hover:bg-muted transition-colors"
            >
              {category.count} {category.count === 1 ? 'item' : 'items'}
            </Badge>
          </div>
          
          {/* Hover Effect Line */}
          <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-primary to-primary/60 group-hover:w-full transition-all duration-300" />
        </CardContent>
      </Card>
    </Link>
  );
}