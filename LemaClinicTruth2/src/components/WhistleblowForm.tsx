import { useState } from "react";
import { Shield, Lock } from "lucide-react";
import { PremiumButton } from "@/components/ui/premium-button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

export const WhistleblowForm = () => {
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    toast({
      title: "Témoignage envoyé",
      description: "Votre témoignage a été envoyé de manière anonyme et sécurisée.",
    });
    setMessage("");
    setIsSubmitting(false);
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

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Label htmlFor="message">Votre témoignage</Label>
                <Textarea
                  id="message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Partagez votre histoire... (Tous les témoignages sont entièrement anonymes)"
                  className="min-h-[200px] mt-2"
                  required
                />
              </div>
              <PremiumButton 
                type="submit" 
                variant="primary"
                size="default"
                loading={isSubmitting}
                icon={<Lock className="h-5 w-5" />}
                className="w-full"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Envoi en cours..." : "Envoyer anonymement"}
              </PremiumButton>
            </form>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};
