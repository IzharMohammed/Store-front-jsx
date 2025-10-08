"use server";

import { cookieManager } from "@/utils/authTools";
import { GUEST_TOKEN_KEY } from "@/utils/constants";

const API_KEY = process.env.BACKEND_API_KEY || "";
const BACKEND_URL = process.env.BACKEND_URL || "";

export async function getProducts(filters = {}) {
  try {
    // Build headers with auth or guest token
    const headers = await cookieManager.buildApiHeaders();

    // Build query string from filters
    const queryParams = new URLSearchParams();

    // Add all filter parameters
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== "") {
        queryParams.append(key, value.toString());
      }
    });

    const queryString = queryParams.toString();
    const url = `${BACKEND_URL}/v1/products${
      queryString ? `?${queryString}` : ""
    }`;

    const response = await fetch(url, {
      method: "GET",
      headers,
      cache: "no-store",
      next: {
        tags: ["products"],
      },
    });

    // Store guest token if returned
    // await cookieManager.handleApiResponse(response);

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      return {
        success: false,
        error:
          errorData.message ||
          `Server error: ${response.status}. Please try again.`,
      };
    }

    const data = await response.json();

    return {
      ...data,
      guestToken: response.headers.get(GUEST_TOKEN_KEY),
    };
  } catch (error) {
    console.error("Error fetching products:", error);
    return {
      success: false,
      error: "Failed to fetch products",
    };
  }
}

// Get categories for filter dropdown
export async function getCategories() {
  try {
    const headers = await cookieManager.buildApiHeaders();

    const response = await fetch(`${BACKEND_URL}/v1/products?limit=1`, {
      method: "GET",
      headers,
      cache: "force-cache",
      next: {
        tags: ["categories"],
        revalidate: 3600, // Cache for 1 hour
      },
    });

    // await cookieManager.handleApiResponse(response);

    if (!response.ok) {
      return {
        success: false,
        error: "Failed to fetch categories",
      };
    }

    const data = await response.json();
    return {
      success: true,
      categories: data.filters?.categories || [],
      priceRange: data.filters?.priceRange || { min: 0, max: 1000 },
    };
  } catch (error) {
    console.error("Error fetching categories:", error);
    return {
      success: false,
      error: "Failed to fetch categories",
    };
  }
}

export async function getProductDetails(productId) {
  try {
    const userData = await cookieManager.getAuthUser();
    const headers = {
      "Content-Type": "application/json",
      "x-api-key": API_KEY,
    };

    // Add custom headers if user is authenticated
    if (userData) {
      headers["x-user-id"] = userData.id;
    }

    const response = await fetch(`${BACKEND_URL}/v1/products/${productId}`, {
      method: "GET",
      headers,
      cache: "no-store", // Ensure fresh data on each request
      next: {
        tags: ["products"],
      },
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      return {
        success: false,
        error:
          errorData.message ||
          `Server error: ${response.status}. Please try again.`,
      };
    }

    return response.json();
  } catch (error) {
    console.log("Error fetching product  details:", error);
    throw error;
  }
}

export async function getProductsByCategory(category) {
  try {
    const userData = await cookieManager.getAuthUser();
    const headers = {
      "Content-Type": "application/json",
      "x-api-key": API_KEY,
    };

    // Add custom headers if user is authenticated
    if (userData) {
      headers["x-user-id"] = userData.id;
    }

    const response = await fetch(
      `${BACKEND_URL}/v1/products/category/${category}`,
      {
        method: "GET",
        headers,
        cache: "no-store", // Ensure fresh data on each request
        next: {
          tags: ["products"],
        },
      }
    );

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      return {
        success: false,
        error:
          errorData.message ||
          `Server error: ${response.status}. Please try again.`,
      };
    }

    return response.json();
  } catch (error) {
    console.log("Error fetching product  details:", error);
    throw error;
  }
}
