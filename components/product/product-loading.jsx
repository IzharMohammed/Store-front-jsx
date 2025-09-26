export function ProductsLoading() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
      {[...Array(12)].map((_, i) => (
        <div key={i} className="animate-pulse">
          <div className="bg-gray-200 dark:bg-gray-700 aspect-square rounded-lg mb-3"></div>
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded mb-2"></div>
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-2/3 mb-2"></div>
          <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded"></div>
        </div>
      ))}
    </div>
  );
}

export function FiltersLoading() {
  return (
    <div className="space-y-6">
      <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
      <div className="h-32 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
      <div className="h-20 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
    </div>
  );
}
