import { useState } from "react";
import { Mail } from "lucide-react";
import { PremiumButton } from "@/components/ui/premium-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Checkbox } from "@/components/ui/checkbox";

export const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [consent, setConsent] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!consent) {
      setStatusMessage("Merci de confirmer votre consentement avant l'envoi.");
      return;
    }

    setStatusMessage(null);
    setIsSubmitting(true);

    try {
      const endpoint = import.meta.env.VITE_CONTACT_ENDPOINT;

      if (!endpoint) {
        throw new Error("Aucun point de terminaison configuré");
      }

      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message }),
      });

      if (!response.ok) {
        throw new Error("Impossible d'envoyer votre message");
      }

      toast({
        title: "Message envoyé",
        description: "Nous revenons vers vous sous 48h ouvrées. Pensez à vérifier vos spams.",
      });
      setName("");
      setEmail("");
      setMessage("");
      setConsent(false);
      setStatusMessage("Votre demande est bien enregistrée. Nous vous contacterons rapidement.");
    } catch (error) {
      toast({
        title: "Canal temporairement indisponible",
        description: "Le connecteur sécurisé est en cours de déploiement. Utilisez privacy@lemaclinictruth.org pour une réponse prioritaire.",
        variant: "destructive",
      });
      setStatusMessage("Le formulaire est en bêta. Vous pouvez également nous écrire sur privacy@lemaclinictruth.org.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-20 bg-background" id="contact">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12" data-aos="fade-up">
          <h2 className="text-4xl font-bold mb-4">Nous Contacter</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Des questions ou vous souhaitez contribuer ? Contactez-nous en toute sécurité. Toutes les réponses partent d'une messagerie chiffrée.
          </p>
        </div>

        <Card className="max-w-2xl mx-auto glass-card" data-aos="fade-up" data-aos-delay="200">
          <CardContent className="p-8">
            <form onSubmit={handleSubmit} className="space-y-6" noValidate>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="name">Nom</Label>
                  <Input
                    id="name"
                    autoComplete="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Votre nom"
                    className="mt-2"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    autoComplete="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="votre@email.com"
                    className="mt-2"
                    required
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="contactMessage">Message</Label>
                <Textarea
                  id="contactMessage"
                  aria-describedby="contact-help"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Comment pouvons-nous vous aider ?"
                  className="min-h-[150px] mt-2"
                  required
                />
                <p id="contact-help" className="mt-2 text-sm text-muted-foreground">
                  Merci d'ajouter un maximum de contexte : dates, échanges, documents disponibles.
                </p>
              </div>
              <div className="flex items-start gap-3">
                <Checkbox
                  id="contact-consent"
                  checked={consent}
                  onCheckedChange={(checked) => setConsent(Boolean(checked))}
                  aria-describedby="contact-consent-note"
                  required
                />
                <Label htmlFor="contact-consent" className="text-sm text-muted-foreground">
                  J'accepte le traitement de mes données pour être recontacté·e et j'ai lu la{' '}
                  <a href="#confidentialite" className="text-primary underline underline-offset-2">
                    politique de confidentialité
                  </a>
                  .
                </Label>
              </div>
              <p id="contact-consent-note" className="text-xs text-muted-foreground">
                Vos informations ne seront jamais partagées avec des tiers et peuvent être supprimées sur simple demande.
              </p>
              <PremiumButton
                type="submit"
                variant="primary"
                size="default"
                loading={isSubmitting}
                icon={<Mail className="h-5 w-5" />}
                className="w-full"
                disabled={isSubmitting || !consent}
              >
                {isSubmitting ? "Envoi en cours..." : "Envoyer le message"}
              </PremiumButton>
              <div aria-live="polite" className="text-sm text-muted-foreground min-h-[1.5rem]">
                {statusMessage}
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};
