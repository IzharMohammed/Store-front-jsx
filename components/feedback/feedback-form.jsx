"use client";
import { useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { createFeedback } from "@/actions/feedback";
import { toast } from "sonner";

export function FeedbackForm({ productId, productName }) {
  const [comment, setComment] = useState("");
  const [isPending, startTransition] = useTransition();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!comment.trim()) {
      toast.error("Please enter your feedback");
      return;
    }

    if (comment.length > 1000) {
      toast.error("Feedback must be less than 1000 characters");
      return;
    }

    startTransition(async () => {
      try {
        const result = await createFeedback(productId, comment.trim());
        
        if (result.success) {
          toast.success(result.message);
          setComment(""); // Clear form
        } else {
          if (result.reason === "unauthenticated") {
            toast.error("Please login to add feedback");
          } else {
            toast.error(result.message || "Failed to add feedback");
          }
        }
      } catch (error) {
        console.error("Error submitting feedback:", error);
        toast.error("Failed to submit feedback. Please try again.");
      }
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Textarea
          placeholder={`Share your experience with ${productName}...`}
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="min-h-[100px] resize-none"
          maxLength={1000}
          disabled={isPending}
        />
        <div className="flex justify-between items-center mt-2">
          <p className="text-xs text-muted-foreground">
            {comment.length}/1000 characters
          </p>
        </div>
      </div>
      
      <div className="flex justify-end">
        <Button 
          type="submit" 
          disabled={isPending || !comment.trim()}
          size="sm"
          className="min-w-[100px]"
        >
          {isPending ? (
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              <span>Posting...</span>
            </div>
          ) : (
            "Post Feedback"
          )}
        </Button>
      </div>
    </form>
  );
}