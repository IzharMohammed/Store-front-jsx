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
