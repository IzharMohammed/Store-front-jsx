"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronDown } from "lucide-react";

export function CategoryDropdown({ categories }) {
  const [isOpen, setIsOpen] = useState(false);
  const [timeoutId, setTimeoutId] = useState(null);

  // Handle both array and object with categories property
  const categoryList = Array.isArray(categories)
    ? categories
    : categories?.categories || [];

  const handleMouseEnter = () => {
    if (timeoutId) {
      clearTimeout(timeoutId);
      setTimeoutId(null);
    }
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    const id = setTimeout(() => {
      setIsOpen(false);
    }, 200);
    setTimeoutId(id);
  };

  return (
    <>
      {/* Blur Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
          style={{ top: "64px" }} // Adjust based on your navbar height
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Dropdown Button and Menu */}
      <div
        className="relative"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <button
          className="flex items-center space-x-1 text-sm font-medium hover:text-primary transition-colors py-2"
          aria-expanded={isOpen}
          aria-haspopup="true"
        >
          <span>Shop</span>
          <ChevronDown
            className={`w-4 h-4 transition-transform duration-300 ${
              isOpen ? "rotate-180" : ""
            }`}
          />
        </button>

        {/* Dropdown Menu */}
        {isOpen && (
          <div className="absolute top-full left-0 mt-2 w-64 bg-background border rounded-lg shadow-xl z-50 py-2">
            <div className="px-3 py-2">
              <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                Categories
              </h3>
              <div className="space-y-1">
                {categoryList.length > 0 ? (
                  categoryList.map((category) => (
                    <Link
                      key={category.id}
                      href={`/products?category=${
                        category.slug ||
                        category.name.toLowerCase().replace(/\s+/g, "-")
                      }`}
                      className="block px-3 py-2 text-sm hover:bg-accent hover:text-accent-foreground rounded-md transition-colors"
                      onClick={() => setIsOpen(false)}
                    >
                      {category.name}
                    </Link>
                  ))
                ) : (
                  <p className="px-3 py-2 text-sm text-muted-foreground">
                    No categories available
                  </p>
                )}
              </div>
            </div>

            {/* Optional: View All Categories Link */}
            <div className="border-t mt-2 pt-2 px-3">
              <Link
                href="/products"
                className="block px-3 py-2 text-sm font-medium text-primary hover:bg-accent rounded-md transition-colors"
                onClick={() => setIsOpen(false)}
              >
                View All Products →
              </Link>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
