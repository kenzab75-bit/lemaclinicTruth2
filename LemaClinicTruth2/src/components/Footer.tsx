import { AlertTriangle, Mail, MessageSquare, Phone } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="bg-card border-t border-border py-12">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {/* Logo et description */}
            <div className="flex flex-col items-start space-y-4">
              <div className="flex items-center space-x-3">
                <AlertTriangle className="h-6 w-6 text-primary" />
                <span className="text-lg font-bold">LemaClinic Truth</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Révéler la vérité et défendre les victimes face aux abus de Lema Dental Clinic en Turquie.
              </p>
            </div>

            {/* Liens rapides */}
            <div>
              <h3 className="text-base font-semibold mb-4 text-foreground">Liens rapides</h3>
              <div className="flex flex-col gap-3">
                {[
                  { href: "#accueil", label: "Accueil" },
                  { href: "#mon-histoire", label: "Mon histoire" },
                  { href: "#histoire", label: "S'informer" },
                  { href: "#temoignages", label: "Témoignages" },
                  { href: "#agir", label: "Agir" },
                ].map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors w-fit"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </div>

            {/* Bloc Nous contacter - Glassmorphisme */}
            <div className="glass-premium p-6 rounded-2xl border-2 border-[#E53935]/20 hover:border-[#E53935]/40 transition-all duration-300 hover:shadow-[0_0_30px_rgba(229,57,53,0.3)]">
              <h3 className="text-base font-bold mb-4 text-foreground flex items-center gap-2">
                <MessageSquare className="h-5 w-5 text-[#E53935]" />
                Nous contacter
              </h3>
              <div className="flex flex-col gap-4">
                <a
                  href="#contact"
                  className="flex items-center gap-3 text-sm text-muted-foreground hover:text-[#E53935] transition-colors group"
                >
                  <div className="w-8 h-8 rounded-full bg-[#E53935]/10 flex items-center justify-center group-hover:bg-[#E53935]/20 transition-colors">
                    <Mail className="h-4 w-4 text-[#E53935]" />
                  </div>
                  <span>Formulaire de contact</span>
                </a>
                <a
                  href="#agir"
                  className="flex items-center gap-3 text-sm text-muted-foreground hover:text-[#E53935] transition-colors group"
                >
                  <div className="w-8 h-8 rounded-full bg-[#E53935]/10 flex items-center justify-center group-hover:bg-[#E53935]/20 transition-colors">
                    <Phone className="h-4 w-4 text-[#E53935]" />
                  </div>
                  <span>Témoigner anonymement</span>
                </a>
              </div>
            </div>
          </div>

          <div className="pt-8 border-t border-border text-center">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} LemaClinic Truth. Tous droits réservés.
            </p>
            <p className="text-xs text-muted-foreground mt-2">
              La vérité éclaire toujours
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};
