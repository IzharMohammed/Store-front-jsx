"use server";

import { cookieManager } from "@/utils/authTools";
import { redirect } from "next/navigation";

const API_KEY = process.env.BACKEND_API_KEY || "";
const BACKEND_URL = process.env.BACKEND_URL || "";

export async function signup(prevState, formData) {
  const name = formData.get("name");
  const email = formData.get("email");
  const password = formData.get("password");
  // Basic validation
  if (!name || !email || !password) {
    return {
      success: false,
      error: "All fields are required",
    };
  }

  if (!email.includes("@") || !email.includes(".")) {
    return {
      success: false,
      error: "Please enter a valid email address",
    };
  }

  if (password.length < 6) {
    return {
      success: false,
      error: "Password must be at least 6 characters long",
    };
  }

  // Check if environment variables are set
  if (!API_KEY || !BACKEND_URL) {
    console.error(
      "Missing environment variables: BACKEND_API_KEY or BACKEND_URL"
    );
    return {
      success: false,
      error: "Server configuration error. Please try again later.",
    };
  }

  try {
    const response = await fetch(`${BACKEND_URL}/v1/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": API_KEY,
      },
      body: JSON.stringify({ email, name, password }),
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

    const data = await response.json();

    // Get guest token before clearing it
    const guestToken = await cookieManager.getGuestToken();

    // Set authenticated user cookies
    // await cookieManager.setAuthenticatedUser(data);

    // Merge guest data if guest token exists
    if (guestToken) {
      try {
        const mergeResponse = await fetch(
          `${BACKEND_URL}/v1/auth/merge-guest-data`,
          {
            method: "POST",
            headers: {
              "x-api-key": API_KEY,
              "x-customer-id": data.userId,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ guestToken }),
          }
        );

        if (mergeResponse.ok) {
          const mergeData = await mergeResponse.json();
          console.log("Guest data merged successfully:", mergeData);
        } else {
          console.error(
            "Failed to merge guest data:",
            await mergeResponse.text()
          );
        }

        console.log("Guest data merged successfully");
      } catch (error) {
        console.error("Failed to merge guest data:", error);
        // Don't fail signup if merge fails
      }
    }

    // Clear guest token (this happens in setAuthenticatedUser)
    // await cookieManager.clearGuestToken(); // Already cleared in setAuthenticatedUser

    return {
      success: true,
      message: "Account created successfully!",
    };
  } catch (error) {
    console.error("Signup error:", error);
    return {
      success: false,
      error: "Network error. Please check your connection and try again.",
    };
  }
}

// export async function redirectToLogin() {
//   redirect("/signin");
// }

export async function redirectToDashboard() {
  redirect("/");
}

export async function redirectToLogin(next) {
  redirect(`/signin${next ? `?next=${encodeURIComponent(next)}` : ""}`);
}
