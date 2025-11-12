import { Shield } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const commitments = [
  {
    title: "Transparence totale",
    description:
      "Chaque témoignage est chiffré et stocké sur un serveur situé en Union européenne. Aucun traçage publicitaire, aucune revente de données.",
  },
  {
    title: "Contrôle utilisateur",
    description:
      "Vous pouvez demander la suppression de vos informations à tout moment. Une adresse dédiée est disponible pour exercer vos droits RGPD.",
  },
  {
    title: "Sécurité renforcée",
    description:
      "Chiffrement TLS, sauvegardes chiffrées et accès restreint aux seuls membres du collectif en charge du traitement des signalements.",
  },
];

export const PrivacyCommitment = () => {
  return (
    <section id="confidentialite" className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mx-auto text-center" data-aos="fade-up">
          <Shield className="h-12 w-12 text-primary mx-auto" aria-hidden="true" />
          <h2 className="mt-6 text-4xl font-black text-foreground">Notre promesse confidentialité</h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Nous traitons vos données sensibles comme si elles étaient les nôtres : avec prudence, discrétion et traçabilité.
          </p>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-3" data-aos="fade-up" data-aos-delay="150">
          {commitments.map((commitment) => (
            <Card key={commitment.title} className="glass-card h-full">
              <CardContent className="p-6 space-y-3">
                <h3 className="text-xl font-semibold text-foreground">{commitment.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{commitment.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-12 max-w-4xl mx-auto bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-2xl p-8 text-sm text-muted-foreground" data-aos="fade-up" data-aos-delay="250">
          <p>
            <strong className="text-foreground">Responsable de traitement :</strong> Collectif citoyen LemaClinic Truth –{' '}
            <a href="mailto:privacy@lemaclinictruth.org" className="text-primary underline underline-offset-2">
              privacy@lemaclinictruth.org
            </a>
          </p>
          <p className="mt-2">
            <strong className="text-foreground">Base légale :</strong> consentement explicite des victimes et intérêt légitime à documenter des pratiques potentiellement illicites.
          </p>
          <p className="mt-2">
            <strong className="text-foreground">Durée de conservation :</strong> 24 mois maximum, renouvelables uniquement avec confirmation écrite.
          </p>
          <p className="mt-2">
            Pour exercer vos droits (accès, rectification, effacement, portabilité), contactez-nous. Réponse garantie sous 72h.
          </p>
        </div>
      </div>
    </section>
  );
};
