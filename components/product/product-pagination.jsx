"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";

export function ProductPagination({
  currentPage,
  totalPages,
  totalCount,
  hasNextPage,
  hasPrevPage,
  limit = 12,
}) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const navigateToPage = (page) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", page.toString());
    router.push(`/products?${params.toString()}`);
  };

  const changeLimit = (newLimit) => {
    const params = new URLSearchParams(searchParams);
    params.set("limit", newLimit);
    params.delete("page"); // Reset to first page when changing limit
    router.push(`/products?${params.toString()}`);
  };

  // Generate page numbers to show
  const getPageNumbers = () => {
    const delta = 2; // Number of pages to show on each side of current page
    const pages = [];
    const rangeStart = Math.max(2, currentPage - delta);
    const rangeEnd = Math.min(totalPages - 1, currentPage + delta);

    // Always show first page
    pages.push(1);

    // Add ellipsis if there's a gap
    if (rangeStart > 2) {
      pages.push("...");
    }

    // Add range around current page
    for (let i = rangeStart; i <= rangeEnd; i++) {
      if (i !== 1 && i !== totalPages) {
        pages.push(i);
      }
    }

    // Add ellipsis if there's a gap
    if (rangeEnd < totalPages - 1) {
      pages.push("...");
    }

    // Always show last page (if more than 1 page)
    if (totalPages > 1) {
      pages.push(totalPages);
    }

    return pages;
  };

  if (totalPages <= 1) {
    return null;
  }

  const startItem = (currentPage - 1) * limit + 1;
  const endItem = Math.min(currentPage * limit, totalCount);

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-8">
      {/* Results info */}
      <div className="text-sm text-muted-foreground">
        Showing {startItem}-{endItem} of {totalCount} products
      </div>

      {/* Pagination controls */}
      <div className="flex items-center gap-2">
        {/* Items per page */}
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">Show:</span>
          <Select value={limit.toString()} onValueChange={changeLimit}>
            <SelectTrigger className="w-16 h-8">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="12">12</SelectItem>
              <SelectItem value="24">24</SelectItem>
              <SelectItem value="36">36</SelectItem>
              <SelectItem value="48">48</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="h-4 w-px bg-border mx-2" />

        {/* First page */}
        <Button
          variant="outline"
          size="sm"
          onClick={() => navigateToPage(1)}
          disabled={!hasPrevPage}
          className="h-8 w-8 p-0"
        >
          <ChevronsLeft className="w-4 h-4" />
        </Button>

        {/* Previous page */}
        <Button
          variant="outline"
          size="sm"
          onClick={() => navigateToPage(currentPage - 1)}
          disabled={!hasPrevPage}
          className="h-8 w-8 p-0"
        >
          <ChevronLeft className="w-4 h-4" />
        </Button>

        {/* Page numbers */}
        <div className="flex items-center gap-1">
          {getPageNumbers().map((page, index) => (
            <div key={index}>
              {page === "..." ? (
                <span className="px-2 py-1 text-sm text-muted-foreground">
                  ...
                </span>
              ) : (
                <Button
                  variant={currentPage === page ? "default" : "outline"}
                  size="sm"
                  onClick={() => navigateToPage(page)}
                  className="h-8 w-8 p-0"
                >
                  {page}
                </Button>
              )}
            </div>
          ))}
        </div>

        {/* Next page */}
        <Button
          variant="outline"
          size="sm"
          onClick={() => navigateToPage(currentPage + 1)}
          disabled={!hasNextPage}
          className="h-8 w-8 p-0"
        >
          <ChevronRight className="w-4 h-4" />
        </Button>

        {/* Last page */}
        <Button
          variant="outline"
          size="sm"
          onClick={() => navigateToPage(totalPages)}
          disabled={!hasNextPage}
          className="h-8 w-8 p-0"
        >
          <ChevronsRight className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}
