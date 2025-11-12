import { useState, useEffect, useCallback } from "react";
import { Menu, X, Scale, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useScrollPosition } from "@/hooks/useScrollPosition";

const desktopLinkClasses =
  "relative px-4 py-2 text-[15px] font-medium text-muted-foreground/90 transition-all duration-300 ease-out hover:text-foreground after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:h-[2px] after:w-0 after:bg-gradient-to-r after:from-primary/0 after:via-primary after:to-primary/0 after:transition-all after:duration-300 after:ease-out hover:after:w-full before:absolute before:inset-0 before:rounded-lg before:bg-gradient-to-b before:from-white/0 before:to-white/0 before:opacity-0 before:transition-opacity before:duration-300 hover:before:from-white/[0.03] hover:before:to-white/[0.01] hover:before:opacity-100";

export const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isInformerDropdownOpen, setIsInformerDropdownOpen] = useState(false);
  const [isTemoignagesDropdownOpen, setIsTemoignagesDropdownOpen] = useState(false);
  const [isMobileInformerOpen, setIsMobileInformerOpen] = useState(false);
  const [isMobileTemoignagesOpen, setIsMobileTemoignagesOpen] = useState(false);
  const scrollY = useScrollPosition();
  const isScrolled = scrollY > 20;

  const closeDropdowns = useCallback(() => {
    setIsInformerDropdownOpen(false);
    setIsTemoignagesDropdownOpen(false);
  }, []);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeDropdowns();
        setIsOpen(false);
        setIsMobileInformerOpen(false);
        setIsMobileTemoignagesOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [closeDropdowns]);

  const handleDesktopLinkClick = () => {
    setIsOpen(false);
    closeDropdowns();
    setIsMobileInformerOpen(false);
    setIsMobileTemoignagesOpen(false);
  };

  const desktopLinks = [
    { href: "#hero", label: "Accueil" },
    { href: "#mon-histoire", label: "Mon histoire" },
    { href: "#soutenir", label: "Soutenir" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out ${
        isScrolled
          ? "backdrop-blur-xl bg-background/80 shadow-[0_8px_32px_0_rgba(0,0,0,0.4)] border-b border-white/5"
          : "bg-transparent"
      }`}
      aria-label="Navigation principale"
    >
      <div className="container mx-auto px-8 py-5">
        <div className="flex justify-between items-center">
          <a
            href="#hero"
            onClick={handleDesktopLinkClick}
            className="flex items-center gap-3 group relative px-3 py-2 rounded-xl transition-all duration-500 hover:bg-gradient-to-br hover:from-white/[0.03] hover:to-white/[0.01] hover:backdrop-blur-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            aria-label="Retour à l'accueil"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-primary/20 rounded-lg blur-xl scale-150 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative glass-strong rounded-lg p-2 border border-primary/20 group-hover:border-primary/40 transition-all duration-500 group-hover:shadow-[0_0_20px_rgba(220,38,38,0.3)]">
                <Scale className="h-6 w-6 text-primary transition-all duration-500 group-hover:scale-110 group-hover:rotate-[5deg]" strokeWidth={2.5} aria-hidden="true" />
              </div>
            </div>
            <div className="flex items-center gap-1 relative">
              <span className="text-2xl font-black tracking-tight text-foreground transition-all duration-300 group-hover:text-foreground/95 font-playfair">
                LemaClinic
              </span>
              <span className="text-2xl font-black tracking-tight bg-gradient-to-r from-primary via-primary to-primary/80 bg-clip-text text-transparent group-hover:drop-shadow-[0_0_12px_rgba(220,38,38,0.6)] transition-all duration-300 font-playfair">
                Truth
              </span>
              <div className="absolute -bottom-1 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-primary/50 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-center"></div>
            </div>
          </a>

          <div className="hidden md:flex items-center space-x-1" role="menubar">
            {desktopLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={desktopLinkClasses}
                onClick={handleDesktopLinkClick}
                role="menuitem"
              >
                {link.label}
              </a>
            ))}

            <div
              className="relative"
              onMouseEnter={() => setIsInformerDropdownOpen(true)}
              onMouseLeave={() => setIsInformerDropdownOpen(false)}
              onBlur={(event) => {
                if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
                  setIsInformerDropdownOpen(false);
                }
              }}
            >
              <button
                type="button"
                className={`${desktopLinkClasses} flex items-center gap-1`}
                aria-haspopup="true"
                aria-expanded={isInformerDropdownOpen}
                aria-controls="menu-informer"
                onClick={() => setIsInformerDropdownOpen((previous) => !previous)}
              >
                S'informer
                <ChevronDown className={`h-4 w-4 transition-transform duration-300 ${isInformerDropdownOpen ? "rotate-180" : ""}`} aria-hidden="true" />
              </button>
              {isInformerDropdownOpen && (
                <div
                  id="menu-informer"
                  role="menu"
                  className="absolute top-full left-0 mt-2 w-56 backdrop-blur-xl bg-background/95 rounded-xl border border-white/10 shadow-[0_8px_32px_0_rgba(0,0,0,0.4)] overflow-hidden animate-fade-in z-[60]"
                >
                  <a
                    href="#histoire"
                    role="menuitem"
                    onClick={handleDesktopLinkClick}
                    className="block w-full text-left px-4 py-3 text-[15px] font-medium text-muted-foreground/90 hover:text-foreground hover:bg-white/[0.05] transition-all duration-300"
                  >
                    Le piège
                  </a>
                  <a
                    href="#vos-droits"
                    role="menuitem"
                    onClick={handleDesktopLinkClick}
                    className="block w-full text-left px-4 py-3 text-[15px] font-medium text-muted-foreground/90 hover:text-foreground hover:bg-white/[0.05] transition-all duration-300"
                  >
                    Vos droits
                  </a>
                </div>
              )}
            </div>

            <div
              className="relative"
              onMouseEnter={() => setIsTemoignagesDropdownOpen(true)}
              onMouseLeave={() => setIsTemoignagesDropdownOpen(false)}
              onBlur={(event) => {
                if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
                  setIsTemoignagesDropdownOpen(false);
                }
              }}
            >
              <button
                type="button"
                className={`${desktopLinkClasses} flex items-center gap-1`}
                aria-haspopup="true"
                aria-expanded={isTemoignagesDropdownOpen}
                aria-controls="menu-temoignages"
                onClick={() => setIsTemoignagesDropdownOpen((previous) => !previous)}
              >
                Témoignages
                <ChevronDown className={`h-4 w-4 transition-transform duration-300 ${isTemoignagesDropdownOpen ? "rotate-180" : ""}`} aria-hidden="true" />
              </button>
              {isTemoignagesDropdownOpen && (
                <div
                  id="menu-temoignages"
                  role="menu"
                  className="absolute top-full left-0 mt-2 w-56 backdrop-blur-xl bg-background/95 rounded-xl border border-white/10 shadow-[0_8px_32px_0_rgba(0,0,0,0.4)] overflow-hidden animate-fade-in z-[60]"
                >
                  <a
                    href="#temoignages"
                    role="menuitem"
                    onClick={handleDesktopLinkClick}
                    className="block w-full text-left px-4 py-3 text-[15px] font-medium text-muted-foreground/90 hover:text-foreground hover:bg-white/[0.05] transition-all duration-300"
                  >
                    Voir les témoignages
                  </a>
                  <a
                    href="#agir"
                    role="menuitem"
                    onClick={handleDesktopLinkClick}
                    className="block w-full text-left px-4 py-3 text-[15px] font-medium text-muted-foreground/90 hover:text-foreground hover:bg-white/[0.05] transition-all duration-300"
                  >
                    Agir
                  </a>
                </div>
              )}
            </div>

            <a
              href="#contact"
              onClick={handleDesktopLinkClick}
              className="relative px-5 py-2 ml-2 text-[15px] font-semibold bg-primary/10 text-primary border border-primary/30 rounded-lg transition-all duration-300 ease-out hover:bg-primary hover:text-primary-foreground hover:border-primary hover:shadow-[0_0_20px_rgba(220,38,38,0.4)] hover:scale-105 before:absolute before:inset-0 before:rounded-lg before:bg-gradient-to-b before:from-white/10 before:to-white/0 before:opacity-0 before:transition-opacity before:duration-300 hover:before:opacity-100"
              role="menuitem"
            >
              Contact
            </a>
          </div>

          <Button
            variant="ghost"
            size="icon"
            className="md:hidden hover:bg-white/5 transition-all duration-300"
            onClick={() => setIsOpen((previous) => !previous)}
            aria-expanded={isOpen}
            aria-controls="menu-mobile"
            aria-label={isOpen ? "Fermer le menu" : "Ouvrir le menu"}
          >
            {isOpen ? (
              <X className="h-5 w-5 transition-transform duration-300 rotate-90" aria-hidden="true" />
            ) : (
              <Menu className="h-5 w-5 transition-transform duration-300" aria-hidden="true" />
            )}
          </Button>
        </div>

        {isOpen && (
          <div id="menu-mobile" className="md:hidden mt-6 space-y-1 animate-fade-in" role="menu">
            <div className="backdrop-blur-xl bg-white/[0.02] rounded-2xl border border-white/5 p-2 shadow-[0_8px_32px_0_rgba(0,0,0,0.3)]">
              {[...desktopLinks, { href: "#contact", label: "Contact" }].map((link, index) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={handleDesktopLinkClick}
                  className="block w-full text-left px-4 py-3 rounded-xl text-[15px] font-medium text-muted-foreground/90 hover:text-foreground hover:bg-white/[0.03] transition-all duration-300 border border-transparent hover:border-white/5"
                  style={{ animationDelay: `${index * 50}ms`, animation: "fade-in 0.3s ease-out forwards" }}
                  role="menuitem"
                >
                  {link.label}
                </a>
              ))}

              <button
                type="button"
                onClick={() => setIsMobileInformerOpen((previous) => !previous)}
                className="block w-full text-left px-4 py-3 rounded-xl text-[15px] font-medium text-muted-foreground/90 hover:text-foreground hover:bg-white/[0.03] transition-all duration-300 border border-transparent hover:border-white/5 flex items-center justify-between"
                style={{ animationDelay: `${desktopLinks.length * 50}ms`, animation: "fade-in 0.3s ease-out forwards" }}
                aria-controls="menu-mobile-informer"
                aria-expanded={isMobileInformerOpen}
              >
                S'informer
                <ChevronDown className={`h-4 w-4 transition-transform duration-300 ${isMobileInformerOpen ? "rotate-180" : ""}`} aria-hidden="true" />
              </button>

              {isMobileInformerOpen && (
                <div id="menu-mobile-informer" className="ml-4 space-y-1 animate-fade-in" role="menu">
                  <a
                    href="#histoire"
                    onClick={handleDesktopLinkClick}
                    className="block w-full text-left px-4 py-2 rounded-xl text-[14px] font-medium text-muted-foreground/80 hover:text-foreground hover:bg-white/[0.03] transition-all duration-300"
                    role="menuitem"
                  >
                    → Le piège
                  </a>
                  <a
                    href="#vos-droits"
                    onClick={handleDesktopLinkClick}
                    className="block w-full text-left px-4 py-2 rounded-xl text-[14px] font-medium text-muted-foreground/80 hover:text-foreground hover:bg-white/[0.03] transition-all duration-300"
                    role="menuitem"
                  >
                    → Vos droits
                  </a>
                </div>
              )}

              <button
                type="button"
                onClick={() => setIsMobileTemoignagesOpen((previous) => !previous)}
                className="block w-full text-left px-4 py-3 rounded-xl text-[15px] font-medium text-muted-foreground/90 hover:text-foreground hover:bg-white/[0.03] transition-all duration-300 border border-transparent hover:border-white/5 flex items-center justify-between"
                style={{ animationDelay: `${desktopLinks.length * 50 + 50}ms`, animation: "fade-in 0.3s ease-out forwards" }}
                aria-controls="menu-mobile-temoignages"
                aria-expanded={isMobileTemoignagesOpen}
              >
                Témoignages
                <ChevronDown className={`h-4 w-4 transition-transform duration-300 ${isMobileTemoignagesOpen ? "rotate-180" : ""}`} aria-hidden="true" />
              </button>

              {isMobileTemoignagesOpen && (
                <div id="menu-mobile-temoignages" className="ml-4 space-y-1 animate-fade-in" role="menu">
                  <a
                    href="#temoignages"
                    onClick={handleDesktopLinkClick}
                    className="block w-full text-left px-4 py-2 rounded-xl text-[14px] font-medium text-muted-foreground/80 hover:text-foreground hover:bg-white/[0.03] transition-all duration-300"
                    role="menuitem"
                  >
                    → Voir les témoignages
                  </a>
                  <a
                    href="#agir"
                    onClick={handleDesktopLinkClick}
                    className="block w-full text-left px-4 py-2 rounded-xl text-[14px] font-medium text-muted-foreground/80 hover:text-foreground hover:bg-white/[0.03] transition-all duration-300"
                    role="menuitem"
                  >
                    → Agir
                  </a>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};
