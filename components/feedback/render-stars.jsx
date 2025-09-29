import { StarIcon as StarSolid } from "@heroicons/react/24/solid";
import { StarIcon as StarOutline } from "@heroicons/react/24/outline";

export const renderStars = (rating) => {
  return (
    <div className="flex items-center space-x-1">
      {[1, 2, 3, 4, 5].map((star) => {
        const Icon = star <= rating ? StarSolid : StarOutline;
        return <Icon key={star} className="h-4 w-4 text-yellow-400" />;
      })}
    </div>
  );
};
