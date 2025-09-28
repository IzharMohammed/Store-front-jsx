import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { getProductFeedback } from "@/actions/feedback";
import { cookieManager } from "@/utils/authTools";
import { FeedbackForm } from "./feedback-form";
import { FeedbackItem } from "./feedback-item";
import { LoadMoreFeedback } from "./load-more-feedback";

export async function ProductFeedbackSection({ product }) {
  const [isAuthenticated, feedbackData] = await Promise.all([
    cookieManager.isAuthenticated(),
    getProductFeedback(product.id, 5, 0), // Load first 5 feedback items
  ]);

  const userData = isAuthenticated ? await cookieManager.getAuthUser() : null;

  // Check if user has already given feedback for this product
  const userFeedback = feedbackData?.data?.find(
    (feedback) => feedback.customerId === userData?.id
  );

  return (
    <div className="mt-12 border-t pt-8 mb-16">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-xl font-semibold mb-2">Customer Feedback</h3>
          <p className="text-sm text-muted-foreground">
            {feedbackData?.total ? (
              <>
                {feedbackData.total}{" "}
                {feedbackData.total === 1 ? "review" : "reviews"}
                for this product
              </>
            ) : (
              "Be the first to share your thoughts about this product"
            )}
          </p>
        </div>
        {feedbackData?.total > 0 && (
          <Badge variant="outline" className="text-xs">
            {feedbackData.total}{" "}
            {feedbackData.total === 1 ? "Review" : "Reviews"}
          </Badge>
        )}
      </div>

      {/* Feedback Form */}
      {isAuthenticated ? (
        !userFeedback ? (
          <div className="mb-8">
            <div className="p-4 border rounded-lg bg-muted/10">
              <h4 className="font-medium mb-3">Share Your Experience</h4>
              <FeedbackForm productId={product.id} productName={product.name} />
            </div>
          </div>
        ) : (
          <div className="mb-8">
            <div className="p-4 border rounded-lg bg-green-50 border-green-200">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-medium text-green-800">Your Feedback</h4>
                <Badge
                  variant="outline"
                  className="text-xs text-green-700 border-green-300"
                >
                  Posted
                </Badge>
              </div>
              <FeedbackItem
                feedback={userFeedback}
                isOwnFeedback={true}
                productId={product.id}
              />
            </div>
          </div>
        )
      ) : (
        <div className="mb-8">
          <div className="p-4 border rounded-lg bg-muted/10 text-center">
            <p className="text-muted-foreground mb-3">
              Please login to share your feedback about this product
            </p>
            <Button variant="outline" size="sm" asChild>
              <a href="/signup">Login to Add Feedback</a>
            </Button>
          </div>
        </div>
      )}

      <Separator className="mb-6" />

      {/* Feedback List */}
      {feedbackData?.data && feedbackData.data.length > 0 ? (
        <div className="space-y-6">
          <h4 className="font-medium">All Reviews</h4>
          <div className="space-y-4">
            {feedbackData.data.map((feedback) => (
              <FeedbackItem
                key={feedback.id}
                feedback={feedback}
                isOwnFeedback={feedback.customerId === userData?.id}
                productId={product.id}
              />
            ))}
          </div>

          {/* Load More Button */}
          {feedbackData.total > feedbackData.count && (
            <LoadMoreFeedback
              productId={product.id}
              currentCount={feedbackData.count}
              totalCount={feedbackData.total}
            />
          )}
        </div>
      ) : (
        <div className="text-center py-8">
          <div className="text-muted-foreground mb-4">
            <svg
              className="w-12 h-12 mx-auto mb-3 opacity-50"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M7 8h10m0 0V6a2 2 0 00-2-2H9a2 2 0 00-2 2v2m10 0v10a2 2 0 01-2 2H9a2 2 0 01-2-2V8m10 0H7m5 5.5v3m0 0l-2-2m2 2l2-2"
              />
            </svg>
            <p className="text-sm">No reviews yet</p>
            <p className="text-xs mt-1">
              Be the first to share your experience with this product
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
