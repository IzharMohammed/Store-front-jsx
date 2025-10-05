"use client";
import { useRouter, useSearchParams } from "next/navigation";
import SignUpOverlay from "../signUpOverlay";
import SignInOverlay from "../signInOverlay";

export function CartOverlays() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Show signin overlay if URL parameter is set
  if (searchParams.get("showSignin") === "true") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 flex items-center justify-center p-4">
        <SignInOverlay
          onSuccess={() => {
            router.push("/checkout/authenticated");
          }}
          onClose={() => {
            router.push("/cart");
          }}
          onSwitch={() => {
            router.push("/cart");
          }}
        />
      </div>
    );
  }

  // Show signup overlay if URL parameter is set
  if (searchParams.get("showSignup") === "true") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 flex items-center justify-center p-4">
        <SignUpOverlay
          onSuccess={() => {
            router.push("/cart?showSignin=true");
          }}
          onClose={() => {
            router.push("/cart");
          }}
          onSwitch={() => {
            router.push("/cart?showSignin=true");
          }}
        />
      </div>
    );
  }

  return null;
}
