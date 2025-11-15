import { useState } from "react";
import { Menu, X, Scale } from "lucide-react";
import { useScrollPosition } from "@/hooks/useScrollPosition";

const links = [
  { href: "#hero", label: "Accueil" },
  { href: "#mon-histoire", label: "Mon histoire" },
  { href: "#soutenir", label: "Soutenir" },
  { href: "#histoire", label: "Le piège" },
  { href: "#vos-droits", label: "Vos droits" },
  { href: "#temoignages", label: "Témoignages" },
  { href: "#agir", label: "Agir" },
];

export const Navigation = () => {
  const scrollY = useScrollPosition();
  const isScrolled = scrollY > 20;
  const [menuOpen, setMenuOpen] = useState(false);

  const desktopLinks = [
    { href: "#hero", label: "Accueil" },
    { href: "#mon-histoire", label: "Mon histoire" },
    { href: "#soutenir", label: "Soutenir" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${
        isScrolled ? "bg-[#0D0D0F]/85 shadow-[0_6px_24px_rgba(0,0,0,0.6)]" : "bg-transparent"
      }`}
      aria-label="Navigation principale"
    >
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-4">
        <a
          href="#hero"
          className="flex items-center gap-3 text-white"
          aria-label="Retour à l'accueil"
          onClick={() => setMenuOpen(false)}
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-md border border-white/15 bg-white/5">
            <Scale className="h-6 w-6 text-white" strokeWidth={2.2} aria-hidden="true" />
          </div>
          <div className="flex items-baseline gap-1">
            <span className="text-2xl font-semibold tracking-tight text-white">LemaClinic</span>
            <span className="text-2xl font-semibold tracking-tight text-[#B4202A]">Truth</span>
          </div>
        </a>

        <div className="hidden items-center gap-8 md:flex" role="menubar">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium uppercase tracking-[0.18em] text-white/80 transition-colors hover:text-white"
              role="menuitem"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contact"
            className="rounded-md bg-[#B4202A] px-5 py-2 text-sm font-semibold text-white transition-colors hover:bg-[#c53035]"
            role="menuitem"
          >
            Contact
          </a>
        </div>

        <button
          type="button"
          className="inline-flex items-center justify-center rounded-md border border-white/20 p-2 text-white md:hidden"
          onClick={() => setMenuOpen((previous) => !previous)}
          aria-expanded={menuOpen}
          aria-controls="menu-mobile"
          aria-label={menuOpen ? "Fermer le menu" : "Ouvrir le menu"}
        >
          {menuOpen ? <X className="h-6 w-6" aria-hidden="true" /> : <Menu className="h-6 w-6" aria-hidden="true" />}
        </button>
      </div>

      <div
        id="menu-mobile"
        className={`md:hidden transition-all duration-300 ${menuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}`}
        aria-hidden={!menuOpen}
      >
        <div className="space-y-2 px-6 pb-6">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="block rounded-md border border-white/12 bg-white/5 px-4 py-3 text-sm font-medium uppercase tracking-[0.2em] text-white/80 transition-colors hover:text-white"
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contact"
            className="block rounded-md bg-[#B4202A] px-4 py-3 text-center text-sm font-semibold text-white transition-colors hover:bg-[#c53035]"
            onClick={() => setMenuOpen(false)}
          >
            Contact
          </a>
        </div>
      </div>
    </nav>
  );
};
