"use server";

import { cookieManager } from "@/utils/authTools";

const API_KEY = process.env.BACKEND_API_KEY || "";
const BACKEND_URL = process.env.BACKEND_URL || "";

export async function getBanners() {
  // Check if environment variables are set
  if (!API_KEY || !BACKEND_URL) {
    console.error(
      "Missing environment variables: BACKEND_API_KEY or BACKEND_URL"
    );
    return {
      success: false,
      data: [],
      count: 0,
      message: "Configuration error",
    };
  }

  try {
    const userData = await cookieManager.getAuthUser();

    const headers = {
      "Content-Type": "application/json",
      "x-api-key": API_KEY,
    };

    // Add custom headers if user is authenticated
    // if (userData) {
    //   headers["x-customer-id"] = userData.id;
    // }

    console.log("userData",userData);
    
    const response = await fetch(`${BACKEND_URL}/v1/banners`, {
      method: "GET",
      headers,
      cache: "no-store", // Ensure fresh data on each request
      next: {
        tags: ["banners"],
      },
    });

    console.log("response for banners", response);

    if (!response.ok) {
      const errorText = await response.text();
      console.log(`Error ${response.status}: ${errorText}`);
      return {
        success: false,
        data: [],
        count: 0,
        message: "Failed to fetch banners",
      };
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching banners:", error);
    return { success: false, data: [], count: 0, message: "Network error" };
  }
}
