"use client";

class ClientCookieManager {
  AUTH_TOKEN_KEY = "auth_token";
  USER_DATA_KEY = "user_data";
  GUEST_TOKEN_KEY = "guest_token";

  // Client-side methods for reading cookies
  getAuthUser() {
    if (typeof window === "undefined") return null;

    try {
      const userData = document.cookie
        .split("; ")
        .find((row) => row.startsWith(`${this.USER_DATA_KEY}=`))
        ?.split("=")[1];

      if (!userData) return null;

      const decodedValue = decodeURIComponent(userData);
      return JSON.parse(decodedValue);
    } catch (error) {
      console.error("Error parsing user data from cookie:", error);
      return null;
    }
  }

  getAuthToken() {
    if (typeof window === "undefined") return null;

    const token = document.cookie
      .split("; ")
      .find((row) => row.startsWith(`${this.AUTH_TOKEN_KEY}=`))
      ?.split("=")[1];

    return token || null;
  }

  getGuestToken() {
    if (typeof window === "undefined") return null;

    const token = document.cookie
      .split("; ")
      .find((row) => row.startsWith(`${this.GUEST_TOKEN_KEY}=`))
      ?.split("=")[1];

    return token || null;
  }

  isAuthenticated() {
    const token = this.getAuthToken();
    const user = this.getAuthUser();
    return !!(token && user);
  }

  // Build headers for client-side API calls
  buildApiHeaders() {
    const headers = {
      "Content-Type": "application/json",
      "x-api-key": process.env.NEXT_PUBLIC_BACKEND_API_KEY || "",
    };

    // Check if user is authenticated
    const user = this.getAuthUser();
    if (user?.id) {
      headers["x-customer-id"] = user.id;
    } else {
      // Add guest token for unauthenticated users
      const guestToken = this.getGuestToken();
      if (guestToken) {
        headers["x-guest-token"] = guestToken;
      }
    }

    return headers;
  }
}

export const clientCookieManager = new ClientCookieManager();
