import { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react";

export const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      // Afficher le bouton après 300px de scroll
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <button
      onClick={scrollToTop}
      className={`fixed bottom-8 right-8 z-50 p-4 glass-premium rounded-full
                 border-2 border-primary/30 hover:border-primary
                 transition-all duration-500 ease-out
                 hover:scale-110 hover:shadow-[0_0_30px_rgba(229,57,53,0.5)]
                 group ${
                   isVisible
                     ? "opacity-100 translate-y-0"
                     : "opacity-0 translate-y-16 pointer-events-none"
                 }`}
      aria-label="Retour en haut"
    >
      <ArrowUp className="h-6 w-6 text-primary group-hover:text-primary-foreground transition-colors duration-300" />
      <span className="absolute -top-12 right-0 px-3 py-1 text-sm font-medium text-foreground bg-background/90 backdrop-blur-sm rounded-lg border border-border/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
        Retour en haut
      </span>
    </button>
  );
};
