"use client";
import { createContext, useContext, useState } from "react";
import SignUpOverlay from "@/components/signUpOverlay";
import SignInOverlay from "@/components/signInOverlay";

const OverlayContext = createContext(null);

export function OverlayProvider({ children }) {
  const [overlayType, setOverlayType] = useState(null);
  const [onSuccessCallback, setOnSuccessCallback] = useState(null);

  const openOverlay = (type, onSuccess) => {
    setOverlayType(type);
    setOnSuccessCallback(() => onSuccess || null);
  };

  const closeOverlay = () => {
    setOverlayType(null);
    setOnSuccessCallback(null);
  };

  const handleSuccess = async () => {
    if (onSuccessCallback) await onSuccessCallback();
    closeOverlay();
  };

  const switchOverlay = (type) => {
    setOverlayType(type);
  };

  return (
    <OverlayContext.Provider
      value={{ openOverlay, closeOverlay, switchOverlay }}
    >
      {children}
      {overlayType && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
          onClick={closeOverlay}
        >
          <div onClick={(e) => e.stopPropagation()}>
            {overlayType === "signin" && (
              <SignInOverlay
                onSuccess={handleSuccess}
                onClose={closeOverlay}
                onSwitch={() => switchOverlay("signup")}
              />
            )}
            {overlayType === "signup" && (
              <SignUpOverlay
                onSuccess={handleSuccess}
                onClose={closeOverlay}
                onSwitch={() => switchOverlay("signin")}
              />
            )}
          </div>
        </div>
      )}
    </OverlayContext.Provider>
  );
}

export const useOverlay = () => useContext(OverlayContext);
