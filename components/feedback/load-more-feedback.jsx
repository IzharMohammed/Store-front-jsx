"use client";
import { useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { getProductFeedback } from "@/actions/feedback";
import { FeedbackItem } from "./feedback-item";
import { toast } from "sonner";

export function LoadMoreFeedback({ productId, currentCount, totalCount }) {
  const [additionalFeedback, setAdditionalFeedback] = useState([]);
  const [loadedCount, setLoadedCount] = useState(currentCount);
  const [isPending, startTransition] = useTransition();

  const handleLoadMore = async () => {
    startTransition(async () => {
      try {
        const result = await getProductFeedback(productId, 5, loadedCount);

        if (result.success && result.data) {
          setAdditionalFeedback((prev) => [...prev, ...result.data]);
          setLoadedCount((prev) => prev + result.data.length);
        } else {
          toast.error("Failed to load more feedback");
        }
      } catch (error) {
        console.error("Error loading more feedback:", error);
        toast.error("Failed to load more feedback. Please try again.");
      }
    });
  };

  if (loadedCount >= totalCount) {
    return null;
  }

  return (
    <div className="space-y-4">
      {/* Render additional feedback items */}
      {additionalFeedback.map((feedback) => (
        <FeedbackItem
          key={feedback.id}
          feedback={feedback}
          isOwnFeedback={false} // Since these are loaded additional items, they won't be user's own
          productId={productId}
        />
      ))}

      {/* Load more button */}
      <div className="text-center pt-4">
        <Button
          variant="outline"
          onClick={handleLoadMore}
          disabled={isPending}
          className="min-w-[120px]"
        >
          {isPending ? (
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 border-2 border-gray-300 border-t-gray-600 rounded-full animate-spin" />
              <span>Loading...</span>
            </div>
          ) : (
            <>Load More ({totalCount - loadedCount} remaining)</>
          )}
        </Button>
      </div>
    </div>
  );
}
