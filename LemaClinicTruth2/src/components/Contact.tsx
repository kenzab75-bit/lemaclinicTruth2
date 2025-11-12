import { useState } from "react";
import { Mail } from "lucide-react";
import { PremiumButton } from "@/components/ui/premium-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

export const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    toast({
      title: "Message envoyé",
      description: "Nous vous répondrons dès que possible.",
    });
    setName("");
    setEmail("");
    setMessage("");
    setIsSubmitting(false);
  };

  return (
    <section className="py-20 bg-background" id="contact">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12" data-aos="fade-up">
          <h2 className="text-4xl font-bold mb-4">Nous Contacter</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Des questions ou vous souhaitez contribuer ? Contactez-nous en toute sécurité.
          </p>
        </div>

        <Card className="max-w-2xl mx-auto glass-card" data-aos="fade-up" data-aos-delay="200">
          <CardContent className="p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="name">Nom</Label>
                  <Input
                    id="name"
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
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Comment pouvons-nous vous aider ?"
                  className="min-h-[150px] mt-2"
                  required
                />
              </div>
              <PremiumButton 
                type="submit" 
                variant="primary"
                size="default"
                loading={isSubmitting}
                icon={<Mail className="h-5 w-5" />}
                className="w-full"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Envoi en cours..." : "Envoyer le message"}
              </PremiumButton>
            </form>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};
