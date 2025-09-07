import { getProducts } from "@/actions/products";
import ProductError from "./error";
import { CategoryFilter } from "@/components/CategoryFilter";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/product/product-card";

export default async function ProductsPage({ searchParams }) {
  const response = await getProducts();
  const products = response?.data || [];

  if (!response?.success) {
    return (
      <div className="container mx-auto px-4 py-8">
        <ProductError
          error={new Error(response?.error || "Failed")}
          reset={() => {}}
        />
      </div>
    );
  }

  const resolvedParams = await searchParams;
  const selectedCategory = resolvedParams?.category;

  const filteredProducts = selectedCategory
    ? products.filter((p) => p.category === selectedCategory)
    : products;


  return (
    <div className="container mx-auto px-20 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">All Products</h1>
        <CategoryFilter />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {Array.isArray(filteredProducts) && filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <div key={product.id.toString()}>
              <ProductCard product={product} />
            </div>
          ))
        ) : (
          <div className="col-span-full text-center py-10 text-gray-500">
            No products found..
            <Link href="/">
              <Button className="mt-4">Go back</Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
