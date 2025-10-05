"use server";

import { cookieManager } from "@/utils/authTools";
import { GUEST_TOKEN_KEY } from "@/utils/constants";
import { revalidateTag } from "next/cache";

const API_KEY = process.env.BACKEND_API_KEY || "";
const BACKEND_URL = process.env.BACKEND_URL || "";

export async function getWishlistItems() {
  // Check if environment variables are set
  if (!API_KEY || !BACKEND_URL) {
    console.error(
      "Missing environment variables: BACKEND_API_KEY or BACKEND_URL"
    );
    throw new Error("Server configuration error");
  }

  try {
    const headers = await cookieManager.buildApiHeaders();

    const response = await fetch(`${BACKEND_URL}/v1/wishlist`, {
      method: "GET",
      headers,
      cache: "no-store", // Ensure fresh data on each request
      next: {
        tags: ["wishlist"],
      },
    });

    // await cookieManager.handleApiResponse(response);

    if (!response.ok) {
      throw new Error("Failed to fetch wishlist items");
    }

    const data = await response.json();

    return {
      ...data,
      guesttoken: response.headers.get(GUEST_TOKEN_KEY),
    };
  } catch (error) {
    console.error("Error fetching wishlist:", error);
    throw error;
  }
}

export async function addToWishlist(productId) {
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

  // Basic validation
  if (!productId) {
    return {
      success: false,
      message: "Product ID is required",
    };
  }

  try {
    const headers = await cookieManager.buildApiHeaders();

    const response = await fetch(`${BACKEND_URL}/v1/wishlist`, {
      method: "POST",
      headers,
      body: JSON.stringify({ productId }),
      next: {
        tags: ["wishlist"],
      },
    });

    // await cookieManager.handleApiResponse(response);

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to add to wishlist");
    }

    revalidateTag("wishlist");
    return {
      success: true,
      message: "Item added to wishlist successfully!",
    };
  } catch (error) {
    console.error("Error adding to wishlist:", error);

    if (
      error instanceof Error &&
      error.message.includes("already in wishlist")
    ) {
      return {
        success: false,
        message: "Item is already in your wishlist",
      };
    }

    return {
      success: false,
      message:
        error instanceof Error ? error.message : "Failed to add to wishlist",
    };
  }
}

export async function removeFromWishlist(itemId) {
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

  // Basic validation
  if (!itemId) {
    return {
      success: false,
      message: "Item ID is required",
    };
  }

  try {
    const headers = await cookieManager.buildApiHeaders();

    const response = await fetch(`${BACKEND_URL}/v1/wishlist/${itemId}`, {
      method: "DELETE",
      headers,
      next: {
        tags: ["wishlist"],
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to remove from wishlist");
    }

    revalidateTag("wishlist");
    return {
      success: true,
      message: "Item removed from wishlist successfully!",
    };
  } catch (error) {
    console.error("Error removing from wishlist:", error);
    return {
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Failed to remove from wishlist",
    };
  }
}
