"use client";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Slider } from "@/components/ui/slider";
import {
  Filter,
  X,
  ChevronDown,
  Search,
  SlidersHorizontal,
  RefreshCw,
} from "lucide-react";

export function ProductFilters({
  categories = [],
  priceRange = { min: 0, max: 1000 },
  className = "",
  isMobile = false,
}) {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Filter states
  const [filters, setFilters] = useState({
    search: searchParams.get("search") || "",
    category: searchParams.get("category") || "all",
    minPrice: parseInt(
      searchParams.get("minPrice") || priceRange.min.toString()
    ),
    maxPrice: parseInt(
      searchParams.get("maxPrice") || priceRange.max.toString()
    ),
    inStock: searchParams.get("inStock") === "true",
    sortBy: searchParams.get("sortBy") || "createdAt",
    sortOrder: searchParams.get("sortOrder") || "desc",
  });

  const [priceValues, setPriceValues] = useState([
    filters.minPrice,
    filters.maxPrice,
  ]);
  const [isOpen, setIsOpen] = useState({
    category: true,
    price: true,
    availability: true,
    sort: true,
  });

  // Apply filters
  const applyFilters = () => {
    const params = new URLSearchParams();

    if (filters.search) params.set("search", filters.search);
    if (filters.category && filters.category !== "all")
      params.set("category", filters.category);
    if (priceValues[0] > priceRange.min)
      params.set("minPrice", priceValues[0].toString());
    if (priceValues[1] < priceRange.max)
      params.set("maxPrice", priceValues[1].toString());
    if (filters.inStock) params.set("inStock", "true");
    if (filters.sortBy !== "createdAt") params.set("sortBy", filters.sortBy);
    if (filters.sortOrder !== "desc")
      params.set("sortOrder", filters.sortOrder);

    router.push(`/products?${params.toString()}`);
  };

  // Clear all filters
  const clearFilters = () => {
    setFilters({
      search: "",
      category: "all",
      minPrice: priceRange.min,
      maxPrice: priceRange.max,
      inStock: false,
      sortBy: "createdAt",
      sortOrder: "desc",
    });
    setPriceValues([priceRange.min, priceRange.max]);
    router.push("/products");
  };

  // Count active filters
  const activeFiltersCount =
    Object.entries(filters).reduce((count, [key, value]) => {
      if (key === "sortBy" && value === "createdAt") return count;
      if (key === "sortOrder" && value === "desc") return count;
      if (key === "category" && value === "all") return count;
      if (key === "search" && !value) return count;
      if (key === "minPrice" && value === priceRange.min) return count;
      if (key === "maxPrice" && value === priceRange.max) return count;
      if (key === "inStock" && !value) return count;
      return count + 1;
    }, 0) +
    (priceValues[0] > priceRange.min || priceValues[1] < priceRange.max
      ? 1
      : 0);

  const FilterContent = () => (
    <div className="space-y-6">
      {/* Search */}
      {/* <div className="space-y-2">
        <Label
          htmlFor="search"
          className="text-sm font-medium flex items-center gap-2"
        >
          <Search className="w-4 h-4" />
          Search Products
        </Label>
        <Input
          id="search"
          placeholder="Search by name or description..."
          value={filters.search}
          onChange={(e) =>
            setFilters((prev) => ({ ...prev, search: e.target.value }))
          }
          className="h-9"
        />
      </div> */}

      {/* Category Filter */}
      <Collapsible
        open={isOpen.category}
        onOpenChange={(open) =>
          setIsOpen((prev) => ({ ...prev, category: open }))
        }
      >
        <CollapsibleTrigger asChild>
          <Button variant="ghost" className="w-full justify-between p-0 h-auto">
            <Label className="text-sm font-medium">Category</Label>
            <ChevronDown
              className={`w-4 h-4 transition-transform ${
                isOpen.category ? "rotate-180" : ""
              }`}
            />
          </Button>
        </CollapsibleTrigger>
        <CollapsibleContent className="space-y-2 mt-2">
          <Select
            value={filters.category}
            onValueChange={(value) =>
              setFilters((prev) => ({ ...prev, category: value }))
            }
          >
            <SelectTrigger className="h-9">
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {categories.map((category) => (
                <SelectItem key={category.name} value={category.name}>
                  {category.name} ({category.count})
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </CollapsibleContent>
      </Collapsible>

      {/* Price Range */}
      <Collapsible
        open={isOpen.price}
        onOpenChange={(open) => setIsOpen((prev) => ({ ...prev, price: open }))}
      >
        <CollapsibleTrigger asChild>
          <Button variant="ghost" className="w-full justify-between p-0 h-auto">
            <Label className="text-sm font-medium">Price Range</Label>
            <ChevronDown
              className={`w-4 h-4 transition-transform ${
                isOpen.price ? "rotate-180" : ""
              }`}
            />
          </Button>
        </CollapsibleTrigger>
        <CollapsibleContent className="space-y-3 mt-2">
          <div className="px-2">
            <Slider
              defaultValue={priceValues}
              value={priceValues}
              onValueChange={setPriceValues}
              max={priceRange.max}
              min={priceRange.min}
              step={1}
              className="w-full"
            />
          </div>
          <div className="flex items-center gap-2 text-sm">
            <span className="font-medium">${priceValues[0]}</span>
            <span className="text-muted-foreground">-</span>
            <span className="font-medium">${priceValues[1]}</span>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <Label htmlFor="minPrice" className="text-xs">
                Min Price
              </Label>
              <Input
                id="minPrice"
                type="number"
                value={priceValues[0]}
                onChange={(e) => {
                  const value = parseInt(e.target.value) || priceRange.min;
                  setPriceValues([value, priceValues[1]]);
                }}
                className="h-8"
              />
            </div>
            <div>
              <Label htmlFor="maxPrice" className="text-xs">
                Max Price
              </Label>
              <Input
                id="maxPrice"
                type="number"
                value={priceValues[1]}
                onChange={(e) => {
                  const value = parseInt(e.target.value) || priceRange.max;
                  setPriceValues([priceValues[0], value]);
                }}
                className="h-8"
              />
            </div>
          </div>
        </CollapsibleContent>
      </Collapsible>

      {/* Availability */}
      <Collapsible
        open={isOpen.availability}
        onOpenChange={(open) =>
          setIsOpen((prev) => ({ ...prev, availability: open }))
        }
      >
        <CollapsibleTrigger asChild>
          <Button variant="ghost" className="w-full justify-between p-0 h-auto">
            <Label className="text-sm font-medium">Availability</Label>
            <ChevronDown
              className={`w-4 h-4 transition-transform ${
                isOpen.availability ? "rotate-180" : ""
              }`}
            />
          </Button>
        </CollapsibleTrigger>
        <CollapsibleContent className="space-y-2 mt-2">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="inStock"
              checked={filters.inStock}
              onCheckedChange={(checked) =>
                setFilters((prev) => ({ ...prev, inStock: checked === true }))
              }
            />
            <Label htmlFor="inStock" className="text-sm">
              In Stock Only
            </Label>
          </div>
        </CollapsibleContent>
      </Collapsible>

      {/* Sort Options */}
      <Collapsible
        open={isOpen.sort}
        onOpenChange={(open) => setIsOpen((prev) => ({ ...prev, sort: open }))}
      >
        <CollapsibleTrigger asChild>
          <Button variant="ghost" className="w-full justify-between p-0 h-auto">
            <Label className="text-sm font-medium">Sort By</Label>
            <ChevronDown
              className={`w-4 h-4 transition-transform ${
                isOpen.sort ? "rotate-180" : ""
              }`}
            />
          </Button>
        </CollapsibleTrigger>
        <CollapsibleContent className="space-y-2 mt-2">
          <Select
            value={`${filters.sortBy}-${filters.sortOrder}`}
            onValueChange={(value) => {
              const [sortBy, sortOrder] = value.split("-");
              setFilters((prev) => ({ ...prev, sortBy, sortOrder }));
            }}
          >
            <SelectTrigger className="h-9">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="createdAt-desc">Newest First</SelectItem>
              <SelectItem value="createdAt-asc">Oldest First</SelectItem>
              <SelectItem value="name-asc">Name: A to Z</SelectItem>
              <SelectItem value="name-desc">Name: Z to A</SelectItem>
              <SelectItem value="price-asc">Price: Low to High</SelectItem>
              <SelectItem value="price-desc">Price: High to Low</SelectItem>
              <SelectItem value="stock-desc">Most Stock</SelectItem>
              <SelectItem value="stock-asc">Least Stock</SelectItem>
            </SelectContent>
          </Select>
        </CollapsibleContent>
      </Collapsible>

      {/* Action Buttons */}
      <div className="space-y-2 pt-4 border-t">
        <Button onClick={applyFilters} className="w-full h-9">
          Apply Filters
          {activeFiltersCount > 0 && (
            <span className="ml-2 bg-white text-black rounded-full w-5 h-5 text-xs flex items-center justify-center">
              {activeFiltersCount}
            </span>
          )}
        </Button>
        {activeFiltersCount > 0 && (
          <Button
            onClick={clearFilters}
            variant="outline"
            className="w-full h-9"
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Clear All
          </Button>
        )}
      </div>
    </div>
  );

  if (isMobile) {
    return (
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="sm" className="gap-2">
            <SlidersHorizontal className="w-4 h-4" />
            Filters
            {activeFiltersCount > 0 && (
              <span className="bg-black text-white rounded-full w-5 h-5 text-xs flex items-center justify-center">
                {activeFiltersCount}
              </span>
            )}
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-80 overflow-y-auto">
          <SheetHeader>
            <SheetTitle>Filter Products</SheetTitle>
            <SheetDescription>
              Refine your search with these filters
            </SheetDescription>
          </SheetHeader>
          <div className="mt-6">
            <FilterContent />
          </div>
        </SheetContent>
      </Sheet>
    );
  }

  return (
    <div className={`bg-card rounded-lg border p-4 ${className}`}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-medium flex items-center gap-2">
          <Filter className="w-4 h-4" />
          Filters
        </h3>
        {activeFiltersCount > 0 && (
          <Button
            onClick={clearFilters}
            variant="ghost"
            size="sm"
            className="h-auto p-1"
          >
            <X className="w-4 h-4" />
          </Button>
        )}
      </div>
      <FilterContent />
    </div>
  );
}
