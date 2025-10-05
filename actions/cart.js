"use server";
import { cookieManager } from "@/utils/authTools";
import { GUEST_TOKEN_KEY } from "@/utils/constants";
import { revalidateTag } from "next/cache";

const API_KEY = process.env.BACKEND_API_KEY || "";
const BACKEND_URL = process.env.BACKEND_URL || "";

export async function getCartItems() {
  // Check if environment variables are set
  if (!API_KEY || !BACKEND_URL) {
    console.error(
      "Missing environment variables: BACKEND_API_KEY or BACKEND_URL"
    );
  }

  try {
    const headers = await cookieManager.buildApiHeaders();

    const response = await fetch(`${BACKEND_URL}/v1/cart`, {
      method: "GET",
      headers,
      cache: "no-store", // Ensure fresh data on each request
      next: {
        tags: ["cart"],
      },
    });

    // Store guest token from response
    // await cookieManager.handleApiResponse(response);

    if (!response.ok) {
      const errorText = await response.text();
      console.log(`Error ${response.status}: ${errorText}`);
    }

    const data = await response.json();

    return {
      ...data,
      guestToken: response.headers.get(GUEST_TOKEN_KEY),
    };
  } catch (error) {
    console.error("Error fetching cart:", error);
    throw error;
  }
}

export async function addToCart(productId, quantity) {
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

  // const isAuthenticated = await cookieManager.isAuthenticated();
  // if (!isAuthenticated) {
  //   return {
  //     success: false,
  //     reason: "unauthenticated",
  //     message: "Please login to add items to your cart",
  //   };
  // }

  // Basic validation
  if (!productId || !quantity) {
    return {
      success: false,
      message: "Product ID and quantity are required",
    };
  }

  try {
    const headers = await cookieManager.buildApiHeaders();

    const response = await fetch(`${BACKEND_URL}/v1/cart`, {
      method: "POST",
      headers,
      body: JSON.stringify({ productId, quantity }),
      next: {
        tags: ["cart"],
      },
    });

    // await cookieManager.handleApiResponse(response);

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to add item to cart");
    }

    revalidateTag("cart");
    return {
      success: true,
      message: "Item added to cart successfully...!!!",
    };
  } catch (error) {
    console.error("Error fetching cart:", error);
    throw error;
  }
}

export async function removeFromCart(cartId) {
  try {
    const headers = await cookieManager.buildApiHeaders();

    const response = await fetch(`${BACKEND_URL}/v1/cart`, {
      method: "DELETE",
      headers,
      body: JSON.stringify({ cartId }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to remove cart item");
    }

    revalidateTag("cart");
  } catch (error) {
    console.error("Remove from cart failed:", error);
    throw error;
  }
}

export async function updateCartQuantity(cartId, newQuantity) {
  try {
    const headers = await cookieManager.buildApiHeaders();

    const response = await fetch(`${BACKEND_URL}/v1/cart/update`, {
      method: "PATCH",
      headers,
      body: JSON.stringify({
        cartItemId: cartId,
        action: "set",
        quantity: newQuantity,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to update cart items");
    }

    revalidateTag("cart");
  } catch (error) {
    console.error("Update cart failed:", error);
    throw error;
  }
}
