import { useState } from "react";
import { PremiumButton } from "@/components/ui/premium-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { ShieldCheck, Users, FileText, HeartHandshake } from "lucide-react";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

export const SupportSection = () => {
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const prefersReducedMotion = usePrefersReducedMotion();
  const animationProps = prefersReducedMotion ? {} : { "data-aos": "fade-up" };

  const handleNewsletterSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!consent) {
      setStatusMessage("Merci de confirmer votre consentement RGPD avant de continuer.");
      return;
    }

    setIsSubmitting(true);
    setStatusMessage(null);

    try {
      const endpoint = import.meta.env.VITE_NEWSLETTER_ENDPOINT;

      if (!endpoint) {
        throw new Error("Aucun point de terminaison de newsletter n'est configuré.");
      }

      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        throw new Error("L'inscription n'a pas pu être réalisée. Veuillez réessayer plus tard.");
      }

      toast({
        title: "Inscription confirmée",
        description: "Merci de rejoindre la vigie citoyenne. Vérifiez votre boîte mail pour confirmer votre adresse.",
      });
      setEmail("");
      setConsent(false);
    } catch (error) {
      toast({
        title: "Service indisponible",
        description: "La newsletter est en cours de déploiement sécurisé. Contactez-nous pour être ajouté manuellement.",
        variant: "destructive",
      });
      setStatusMessage("La newsletter est actuellement en bêta privée. Nous vous recontacterons très vite.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="soutenir" className="py-24 bg-gradient-to-b from-background via-background/95 to-muted/20">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mx-auto text-center mb-16" {...animationProps}>
          <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 text-primary px-4 py-1 text-sm font-semibold uppercase tracking-widest">
            <HeartHandshake className="h-4 w-4" aria-hidden="true" />
            Soutenir le mouvement
          </span>
          <h2 className="mt-6 text-4xl lg:text-5xl font-black text-foreground">Chaque action compte</h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Rejoignez un collectif d'entraide qui documente, protège et alerte. Engagez-vous à votre rythme : informer, partager, financer.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-[2fr,1fr]" {...animationProps} data-aos-delay={prefersReducedMotion ? undefined : 150}>
          <Card className="glass-card">
            <CardContent className="p-8 lg:p-10">
              <h3 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
                <ShieldCheck className="h-6 w-6 text-primary" aria-hidden="true" />
                Rejoindre la vigie citoyenne
              </h3>
              <p className="text-muted-foreground mb-6">
                Recevez nos alertes légales, les mises à jour des procédures et un kit d'action pour faire valoir vos droits.
              </p>
              <form className="space-y-6" onSubmit={handleNewsletterSubmit} noValidate>
                <div>
                  <Label htmlFor="newsletter-email">Adresse email</Label>
                  <Input
                    id="newsletter-email"
                    type="email"
                    autoComplete="email"
                    required
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    placeholder="vous@exemple.fr"
                    className="mt-2"
                    aria-describedby="newsletter-help"
                  />
                  <p id="newsletter-help" className="mt-2 text-sm text-muted-foreground">
                    Nous n'envoyons que des informations vérifiées et utiles pour les victimes.
                  </p>
                </div>

                <div className="flex items-start gap-3">
                  <Checkbox
                    id="newsletter-consent"
                    checked={consent}
                    onCheckedChange={(checked) => setConsent(Boolean(checked))}
                    aria-describedby="newsletter-consent-note"
                    required
                  />
                  <Label htmlFor="newsletter-consent" className="text-sm text-muted-foreground">
                    J'accepte de recevoir des communications de LemaClinic Truth et j'ai lu la{' '}
                    <a href="#confidentialite" className="text-primary underline underline-offset-2">
                      politique de confidentialité
                    </a>
                    .
                  </Label>
                </div>
                <p id="newsletter-consent-note" className="text-xs text-muted-foreground">
                  Vous pouvez vous désinscrire à tout moment via le lien présent dans nos emails.
                </p>

                <PremiumButton
                  type="submit"
                  variant="primary"
                  size="default"
                  className="w-full"
                  loading={isSubmitting}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Inscription en cours..." : "Recevoir les alertes"}
                </PremiumButton>
                <div aria-live="polite" className="text-sm text-muted-foreground min-h-[1.5rem]">
                  {statusMessage}
                </div>
              </form>
            </CardContent>
          </Card>

          <div className="space-y-6">
            <Card className="glass-card">
              <CardContent className="p-6 space-y-4">
                <div className="flex items-center gap-3 text-primary">
                  <FileText className="h-5 w-5" aria-hidden="true" />
                  <h3 className="text-lg font-semibold text-foreground">Demander le kit d'action</h3>
                </div>
                <p className="text-sm text-muted-foreground">
                  Templates de courriers, conseils juridiques, checklists médicales : demandez le kit gratuit et mobilisez vos proches.
                </p>
                <PremiumButton href="#contact" variant="secondary" size="default">
                  Demander le kit
                </PremiumButton>
              </CardContent>
            </Card>

            <Card className="glass-card">
              <CardContent className="p-6 space-y-4">
                <div className="flex items-center gap-3 text-primary">
                  <Users className="h-5 w-5" aria-hidden="true" />
                  <h3 className="text-lg font-semibold text-foreground">Créer un partenariat</h3>
                </div>
                <p className="text-sm text-muted-foreground">
                  Avocats, journalistes, soignants : contribuez aux enquêtes en toute transparence. Nous partageons des dossiers vérifiés.
                </p>
                <PremiumButton href="mailto:collectif@lemaclinictruth.org" variant="secondary" size="default">
                  Devenir partenaire
                </PremiumButton>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-3" {...animationProps} data-aos-delay={prefersReducedMotion ? undefined : 250}>
          {[{
            label: "Témoignages vérifiés",
            value: "+80",
            description: "Collectés et authentifiés avec preuves",
          }, {
            label: "Actions juridiques",
            value: "12",
            description: "Dossiers accompagnés par nos partenaires",
          }, {
            label: "Kit téléchargé",
            value: "1 500",
            description: "Victimes outillées pour agir",
          }].map((stat) => (
            <Card key={stat.label} className="glass-card">
              <CardContent className="p-6 text-center space-y-2">
                <p className="text-sm uppercase tracking-[0.2em] text-muted-foreground">{stat.label}</p>
                <p className="text-4xl font-extrabold text-primary font-playfair">{stat.value}</p>
                <p className="text-sm text-muted-foreground">{stat.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
