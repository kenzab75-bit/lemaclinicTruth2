import { useState } from "react";
import { Shield, Lock } from "lucide-react";
import { PremiumButton } from "@/components/ui/premium-button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Checkbox } from "@/components/ui/checkbox";

export const WhistleblowForm = () => {
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [consent, setConsent] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!consent) {
      setStatusMessage("Merci de confirmer le protocole de confidentialité avant l'envoi.");
      return;
    }

    setStatusMessage(null);
    setIsSubmitting(true);

    try {
      const endpoint = import.meta.env.VITE_WHISTLE_ENDPOINT;

      if (!endpoint) {
        throw new Error("Aucun canal sécurisé configuré");
      }

      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message }),
      });

      if (!response.ok) {
        throw new Error("Échec de l'envoi du témoignage");
      }

      toast({
        title: "Témoignage envoyé",
        description: "Votre témoignage est chiffré et sera vérifié par notre cellule avant publication.",
      });
      setMessage("");
      setConsent(false);
      setStatusMessage("Merci pour votre courage. Nous revenons vers vous uniquement si vous l'avez demandé.");
    } catch (error) {
      toast({
        title: "Canal chiffré indisponible",
        description: "Vous pouvez transmettre vos éléments via signalement@lemaclinictruth.org (PGP disponible).",
        variant: "destructive",
      });
      setStatusMessage("Serveur sécurisé en maintenance. Écrivez-nous sur signalement@lemaclinictruth.org avec vos pièces jointes chiffrées.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-20 bg-muted/50" id="agir">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12" data-aos="fade-up">
          <h2 className="text-4xl font-bold mb-4">Témoignage Anonyme</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Partagez votre expérience de manière anonyme et sécurisée. Votre identité est protégée.
          </p>
        </div>

        <Card className="max-w-2xl mx-auto glass-card" data-aos="fade-up" data-aos-delay="200">
          <CardContent className="p-8">
            <div className="flex items-center space-x-3 mb-6 p-4 bg-accent/50 rounded-lg">
              <Shield className="h-6 w-6 text-primary" />
              <p className="text-sm text-muted-foreground">
                Tous les témoignages sont cryptés et stockés en toute sécurité. Nous ne collectons jamais d'adresses IP ou d'informations identifiantes.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6" noValidate>
              <div>
                <Label htmlFor="message">Votre témoignage</Label>
                <Textarea
                  id="message"
                  aria-describedby="whistle-help"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Partagez votre histoire... (Tous les témoignages sont entièrement anonymes)"
                  className="min-h-[200px] mt-2"
                  required
                />
                <p id="whistle-help" className="mt-2 text-sm text-muted-foreground">
                  Supprimez toute information permettant de vous identifier si vous souhaitez rester anonyme.
                </p>
              </div>
              <div className="flex items-start gap-3">
                <Checkbox
                  id="whistle-consent"
                  checked={consent}
                  onCheckedChange={(checked) => setConsent(Boolean(checked))}
                  aria-describedby="whistle-consent-note"
                  required
                />
                <Label htmlFor="whistle-consent" className="text-sm text-muted-foreground">
                  Je confirme avoir lu et compris la{' '}
                  <a href="#confidentialite" className="text-primary underline underline-offset-2">
                    charte de confidentialité
                  </a>
                  . Mon témoignage peut être publié de manière anonymisée.
                </Label>
              </div>
              <p id="whistle-consent-note" className="text-xs text-muted-foreground">
                Aucune donnée technique (IP, navigateur) n'est enregistrée. Nous ne vous recontactons que si vous le demandez explicitement.
              </p>
              <PremiumButton
                type="submit"
                variant="primary"
                size="default"
                loading={isSubmitting}
                icon={<Lock className="h-5 w-5" />}
                className="w-full"
                disabled={isSubmitting || !consent}
              >
                {isSubmitting ? "Envoi en cours..." : "Envoyer anonymement"}
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
