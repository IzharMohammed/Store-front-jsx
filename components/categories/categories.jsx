import { getCategories } from "@/actions/products";
import { CategoryCard } from "./category-card";
import { Sparkles, Grid3X3 } from "lucide-react";

export async function Categories() {
  const response = await getCategories();
  const categories = response?.categories || [];

  if (!response?.success || categories.length === 0) {
    return null;
  }

  // Add "All Products" as the first category
  const allCategories = [
    ...categories.map((cat) => ({ ...cat, displayName: cat.name })),
  ];

  console.log("allCategories", allCategories);

  return (
    <section className="py-16 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 mb-4">
            <Grid3X3 className="w-4 h-4 text-blue-500" />
            <span className="text-sm font-medium">Shop by Category</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Explore
            </span>{" "}
            Categories
          </h2>
          <p className="text-muted-foreground max-w-md mx-auto">
            Browse our carefully curated collection by category
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
          {allCategories.map((category) => (
            <CategoryCard key={category.name} category={category} />
          ))}
        </div>

        {/* Browse All Link */}
        <div className="text-center mt-8">
          <p className="text-sm text-muted-foreground">
            Can't find what you're looking for?{" "}
            <a
              href="/products"
              className="text-blue-600 hover:text-blue-700 font-medium underline underline-offset-4"
            >
              Browse all products
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
