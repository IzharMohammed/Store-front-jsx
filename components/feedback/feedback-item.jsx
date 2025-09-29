"use client";
import { useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { updateFeedback, deleteFeedback } from "@/actions/feedback";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { renderStars } from "./render-stars";

export function FeedbackItem({ feedback, isOwnFeedback, productId }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editComment, setEditComment] = useState(feedback.comment);
  const [isPending, startTransition] = useTransition();
  const [isDeleting, setIsDeleting] = useState(false);

  const handleUpdate = async () => {
    if (!editComment.trim()) {
      toast.error("Please enter your feedback");
      return;
    }

    if (editComment.length > 1000) {
      toast.error("Feedback must be less than 1000 characters");
      return;
    }

    if (editComment.trim() === feedback.comment) {
      setIsEditing(false);
      return;
    }

    startTransition(async () => {
      try {
        const result = await updateFeedback(feedback.id, editComment.trim());

        if (result.success) {
          toast.success(result.message);
          setIsEditing(false);
        } else {
          toast.error(result.message || "Failed to update feedback");
        }
      } catch (error) {
        console.error("Error updating feedback:", error);
        toast.error("Failed to update feedback. Please try again.");
      }
    });
  };

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      const result = await deleteFeedback(feedback.id, productId);

      if (result.success) {
        toast.success(result.message);
      } else {
        toast.error(result.message || "Failed to delete feedback");
        setIsDeleting(false);
      }
    } catch (error) {
      console.error("Error deleting feedback:", error);
      toast.error("Failed to delete feedback. Please try again.");
      setIsDeleting(false);
    }
  };

  const handleCancelEdit = () => {
    setEditComment(feedback.comment);
    setIsEditing(false);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (isDeleting) {
    return (
      <div className="p-4 border rounded-lg bg-muted/20 animate-pulse">
        <div className="text-center text-muted-foreground">
          Deleting feedback...
        </div>
      </div>
    );
  }

  return (
    <div
      className={`p-4 border rounded-lg ${
        isOwnFeedback ? "bg-blue-50 border-blue-200" : "bg-gray-50"
      }`}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white text-sm font-medium">
            {feedback.customer?.name
              ? feedback.customer.name.charAt(0).toUpperCase()
              : feedback.customer?.email?.charAt(0).toUpperCase() || "A"}
          </div>
          <div>
            <p className="font-medium text-sm  text-black">
              {feedback.customer?.name || "Anonymous Customer"}
            </p>
            <p className="text-xs text-muted-foreground">
              {formatDate(feedback.createdAt)}
              {feedback.updatedAt !== feedback.createdAt && (
                <span className="ml-1">(edited)</span>
              )}
            </p>
            {feedback.rating && renderStars(feedback.rating)}
          </div>
        </div>

        <div className="flex items-center space-x-2">
          {isOwnFeedback && (
            <Badge variant="outline" className="text-xs">
              Your Review
            </Badge>
          )}
        </div>
      </div>

      {isEditing ? (
        <div className="space-y-3">
          <Textarea
            value={editComment}
            onChange={(e) => setEditComment(e.target.value)}
            className="min-h-[80px] resize-none"
            maxLength={1000}
            disabled={isPending}
          />
          <div className="flex justify-between items-center">
            <p className="text-xs text-muted-foreground">
              {editComment.length}/1000 characters
            </p>
            <div className="flex space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handleCancelEdit}
                disabled={isPending}
              >
                Cancel
              </Button>
              <Button
                size="sm"
                onClick={handleUpdate}
                disabled={isPending || !editComment.trim()}
              >
                {isPending ? "Updating..." : "Update"}
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <>
          <p className="text-sm text-gray-700 mb-3 leading-relaxed">
            {feedback.comment}
          </p>

          {isOwnFeedback && (
            <div className="flex justify-end space-x-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsEditing(true)}
                className="text-xs h-7"
              >
                Edit
              </Button>

              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-xs h-7 text-red-600 hover:text-red-700 hover:bg-red-50"
                  >
                    Delete
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Delete Feedback</AlertDialogTitle>
                    <AlertDialogDescription>
                      Are you sure you want to delete your feedback? This action
                      cannot be undone.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={handleDelete}
                      className="bg-red-600 hover:bg-red-700"
                    >
                      Delete
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          )}
        </>
      )}
    </div>
  );
}
