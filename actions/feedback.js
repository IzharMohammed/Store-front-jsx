"use server";
import { cookieManager } from "@/utils/authTools";
import { revalidateTag } from "next/cache";

const API_KEY = process.env.BACKEND_API_KEY || "";
const BACKEND_URL = process.env.BACKEND_URL || "";

export async function getFeedbackItems() {
  // Check if environment variables are set
  if (!API_KEY || !BACKEND_URL) {
    console.error(
      "Missing environment variables: BACKEND_API_KEY or BACKEND_URL"
    );
    return {
      success: false,
      message: "Server configuration error. Please try again later.",
    };
  }

  try {
    const userData = await cookieManager.getAuthUser();

    const headers = {
      "Content-Type": "application/json",
      "x-api-key": API_KEY,
    };

    // Add custom headers if user is authenticated
    if (userData) {
      headers["x-customer-id"] = userData.id;
    }

    const response = await fetch(`${BACKEND_URL}/v1/feedback`, {
      method: "GET",
      headers,
      cache: "no-store", // Ensure fresh data on each request
      next: {
        tags: ["feedback"],
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.log(`Error ${response.status}: ${errorText}`);
      return {
        success: false,
        message: "Failed to fetch feedback",
      };
    }

    return response.json();
  } catch (error) {
    console.error("Error fetching feedback:", error);
    return {
      success: false,
      message: "Failed to fetch feedback",
    };
  }
}

export async function getProductFeedback(productId, limit = 10, offset = 0) {
  // Check if environment variables are set
  if (!API_KEY || !BACKEND_URL) {
    console.error(
      "Missing environment variables: BACKEND_API_KEY or BACKEND_URL"
    );
    return {
      success: false,
      message: "Server configuration error. Please try again later.",
    };
  }

  try {
    const headers = {
      "Content-Type": "application/json",
      "x-api-key": API_KEY,
    };

    const url = new URL(`${BACKEND_URL}/v1/feedback/product/${productId}`);
    url.searchParams.append("limit", limit.toString());
    url.searchParams.append("offset", offset.toString());

    const response = await fetch(url.toString(), {
      method: "GET",
      headers,
      cache: "no-store", // Ensure fresh data on each request
      next: {
        tags: ["product-feedback", `feedback-${productId}`],
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.log(`Error ${response.status}: ${errorText}`);
      return {
        success: false,
        message: "Failed to fetch product feedback",
      };
    }

    return response.json();
  } catch (error) {
    console.error("Error fetching product feedback:", error);
    return {
      success: false,
      message: "Failed to fetch product feedback",
    };
  }
}

export async function createFeedback(productId, comment) {
  // Check if environment variables are set
  if (!API_KEY || !BACKEND_URL) {
    console.error(
      "Missing environment variables: BACKEND_API_KEY or BACKEND_URL"
    );
    return {
      success: false,
      message: "Server configuration error. Please try again later.",
    };
  }

  const isAuthenticated = await cookieManager.isAuthenticated();
  if (!isAuthenticated) {
    return {
      success: false,
      reason: "unauthenticated",
      message: "Please login to add feedback",
    };
  }

  // Basic validation
  if (!productId || !comment) {
    return {
      success: false,
      message: "Product ID and comment are required",
    };
  }

  if (comment.length > 1000) {
    return {
      success: false,
      message: "Comment must be less than 1000 characters",
    };
  }

  try {
    const userData = await cookieManager.getAuthUser();

    const headers = {
      "Content-Type": "application/json",
      "x-api-key": API_KEY,
    };

    // Add custom headers if user is authenticated
    if (userData) {
      headers["x-customer-id"] = userData.id;
    }

    const response = await fetch(`${BACKEND_URL}/v1/feedback`, {
      method: "POST",
      headers,
      body: JSON.stringify({ productId, comment }),
      next: {
        tags: ["feedback"],
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      return {
        success: false,
        message: errorData.message || "Failed to add feedback",
      };
    }

    const result = await response.json();

    // Revalidate both user feedback and product feedback
    revalidateTag("feedback");
    revalidateTag("product-feedback");
    revalidateTag(`feedback-${productId}`);

    return {
      success: true,
      message: result.message || "Feedback added successfully",
    };
  } catch (error) {
    console.error("Error creating feedback:", error);
    return {
      success: false,
      message: "Failed to add feedback",
    };
  }
}
