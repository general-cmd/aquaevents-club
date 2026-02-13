import { useState, useEffect } from "react";

interface UseProductPopupOptions {
  /** Scroll depth percentage to trigger popup (0-100) */
  scrollDepthTrigger?: number;
  /** Time on page in seconds before showing popup */
  timeOnPageTrigger?: number;
  /** Delay in ms before checking triggers */
  initialDelay?: number;
  /** Session storage key to prevent showing popup multiple times */
  storageKey?: string;
}

/**
 * Custom hook to manage product popup behavior triggers
 * Triggers popup based on scroll depth or time on page
 * Prevents showing popup multiple times per session
 */
export function useProductPopup({
  scrollDepthTrigger = 50,
  timeOnPageTrigger = 30,
  initialDelay = 2000,
  storageKey = "productPopupShown"
}: UseProductPopupOptions = {}) {
  const [showPopup, setShowPopup] = useState(false);
  const [hasTriggered, setHasTriggered] = useState(false);

  useEffect(() => {
    // Check if popup was already shown in this session
    const popupShown = sessionStorage.getItem(storageKey);
    if (popupShown === "true") {
      setHasTriggered(true);
      return;
    }

    let timeoutId: NodeJS.Timeout;
    let scrollHandler: (() => void) | null = null;

    const triggerPopup = () => {
      if (!hasTriggered) {
        setShowPopup(true);
        setHasTriggered(true);
        sessionStorage.setItem(storageKey, "true");
        
        // Clean up scroll listener
        if (scrollHandler) {
          window.removeEventListener("scroll", scrollHandler);
        }
      }
    };

    // Time on page trigger
    const timeTriggerId = setTimeout(() => {
      triggerPopup();
    }, timeOnPageTrigger * 1000 + initialDelay);

    // Scroll depth trigger
    scrollHandler = () => {
      const scrollPercentage =
        (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;

      if (scrollPercentage >= scrollDepthTrigger) {
        triggerPopup();
      }
    };

    // Add scroll listener after initial delay
    timeoutId = setTimeout(() => {
      window.addEventListener("scroll", scrollHandler!);
    }, initialDelay);

    return () => {
      clearTimeout(timeoutId);
      clearTimeout(timeTriggerId);
      if (scrollHandler) {
        window.removeEventListener("scroll", scrollHandler);
      }
    };
  }, [scrollDepthTrigger, timeOnPageTrigger, initialDelay, storageKey, hasTriggered]);

  const closePopup = () => {
    setShowPopup(false);
  };

  const resetPopup = () => {
    sessionStorage.removeItem(storageKey);
    setHasTriggered(false);
    setShowPopup(false);
  };

  return {
    showPopup,
    closePopup,
    resetPopup,
    hasTriggered
  };
}
