import { useEffect, useState } from "react";

const getScrollY = () => {
  if (typeof window === "undefined") {
    return 0;
  }
  return window.scrollY || 0;
};

export const useScrollPosition = () => {
  const [scrollY, setScrollY] = useState<number>(getScrollY());

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    let animationFrame: number | null = null;

    const handleScroll = () => {
      if (animationFrame !== null) {
        return;
      }

      animationFrame = window.requestAnimationFrame(() => {
        setScrollY(getScrollY());
        animationFrame = null;
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      if (animationFrame !== null) {
        window.cancelAnimationFrame(animationFrame);
      }
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return scrollY;
};

export default useScrollPosition;
