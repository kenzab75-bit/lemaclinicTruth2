import { useState, useEffect, useRef } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { useScrollPosition } from "@/hooks/useScrollPosition";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

interface TimelineStep {
  number: number;
  title: string;
  description: string;
  details: string[];
  sources: { label: string; info: string }[];
}

const TIMELINE_STEPS: TimelineStep[] = [
  {
    number: 1,
    title: "L'appât commercial",
    description:
      "Lema Dental Clinic vous appâte avec des devis attractifs et un discours rassurant. Sous couvert de soins \"haut de gamme\", tout est pensé pour instaurer la confiance et provoquer votre départ vers Istanbul.",
    details: [
      "Publicités agressives sur les réseaux sociaux Instagram, Facebook",
      "Promesses de prix 60-70% moins chers avec des 'garanties' attractives (Hôtel 5 étoiles, transfert gratuit etc)",
      "Communication ultra-réactive et rassurante via WhatsApp et réseaux sociaux",
      "Partenariats avec des influenceurs ou stars internationales pour promouvoir la clinique",
    ],
    sources: [
      { label: "Témoignage patient #12", info: "Devis initial de 3500€ pour 20 facettes et couronnes" },
      { label: "Capture écran Facebook, Instagram, site web", info: "" },
      { label: "Conversation WhatsApp", info: "Échanges avant le départ" },
    ],
  },
  {
    number: 2,
    title: "Le piège",
    description:
      "Une fois sur place, vous vous retrouvez pris au piège, entièrement dépendants de la clinique, qui exploite cette position de force pour accélérer les procédures. Les consentements sont signés dans la précipitation, sous pression psychologique et logistique. Refuser devient impensable, au risque de perdre les sommes versées et le séjour déjà engagé.",
    details: [
      "Examen initial bâclé, expédié en moins de dix minutes",
      "Traitement prévu avant le départ modifié sur place, au profit de soins beaucoup plus coûteux et invasifs, sans justification médicale réelle ni transparente",
      "Multiplication des actes : meulage, dévitalisations, couronnes, non prévus",
      "Inflation des prix : facture finale 2 à 3 fois supérieure au devis",
      "Isolation du patient : pression pour payer rapidement",
    ],
    sources: [
      { label: "Factures comparées", info: "Documents avant/après traitement" },
      { label: "Export de conversations WhatsApp", info: "" },
    ],
  },
  {
    number: 3,
    title: "L'impasse",
    description:
      "Une fois entre les mains du chirurgien, vous découvrez des pratiques expéditives où le profit prime sur la santé, sans le moindre scrupule à bafouer le code de déontologie médicale au nom de l'argent. Vous ne contrôlez plus rien...",
    details: [
      "Complications post-opératoires graves : douleurs chroniques, pulpite",
      "Absence totale de suivi médical après le retour en Europe",
      "Impossibilité de joindre la clinique ou réponses évasives ; isolement",
      "Refus de prise en charge des complications",
      "Coûts de réparation en Europe dépassant largement les économies initiales",
    ],
    sources: [
      { label: "Rapports et examens médicaux", info: "Dentistes français 2025" },
      { label: "Témoignage patient", info: "" },
      { label: "Échanges emails", info: "Tentatives de contact restées sans réponse" },
    ],
  },
  {
    number: 4,
    title: "La vérité éclate",
    description:
      "Faire émerger la vérité par la justice. Parce que le silence protège les fautes, et que seule la vérité libère.",
    details: [
      "Création de groupes d'entraide et de témoignages de victimes",
      "Publication de preuves concrètes : factures, photos, rapports médicaux",
      "Médiatisation croissante de l'affaire dans les médias européens",
      "Plaintes déposées auprès des autorités compétentes",
      "Mobilisation pour alerter les futurs patients et prévenir de nouveaux cas",
      "Demande d'enquête officielle sur les pratiques de la clinique",
    ],
    sources: [
      { label: "Groupe Facebook", info: "Nombreux témoignages recensés" },
      { label: "Plainte en cours de dépôt", info: "" },
    ],
  },
];

export const Timeline = () => {
  const [selectedStep, setSelectedStep] = useState<TimelineStep | null>(null);
  const [visibleSteps, setVisibleSteps] = useState<number[]>([]);
  const scrollY = useScrollPosition();
  const prefersReducedMotion = usePrefersReducedMotion();
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (prefersReducedMotion) {
      setVisibleSteps(TIMELINE_STEPS.map((_, index) => index));
      return;
    }

    if (typeof IntersectionObserver === "undefined") {
      setVisibleSteps(TIMELINE_STEPS.map((_, index) => index));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        setVisibleSteps((current) => {
          const next = new Set(current);

          entries.forEach((entry) => {
            const index = Number((entry.target as HTMLElement).dataset.stepIndex);
            if (Number.isNaN(index)) {
              return;
            }

            if (entry.isIntersecting) {
              next.add(index);
            } else {
              next.delete(index);
            }
          });

          return Array.from(next.values()).sort((a, b) => a - b);
        });
      },
      { threshold: 0.3 }
    );

    stepRefs.current.forEach((element) => {
      if (element) {
        observer.observe(element);
      }
    });

    return () => observer.disconnect();
  }, [prefersReducedMotion]);

  const parallaxOffset = prefersReducedMotion ? 0 : scrollY * 0.1;
  const highestVisibleIndex = visibleSteps.length ? Math.max(...visibleSteps) : -1;
  const progress = prefersReducedMotion ? 100 : Math.max(0, ((highestVisibleIndex + 1) / TIMELINE_STEPS.length) * 100);

  const animationProps = prefersReducedMotion ? {} : { "data-aos": "fade-up" };

  return (
    <>
      <section
        className="py-32 bg-gradient-to-br from-background via-muted/20 to-background relative overflow-hidden"
        id="histoire"
      >
        <div
          className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-primary/5"
          style={{ transform: `translateY(${parallaxOffset}px)` }}
        ></div>
        <div
          className="absolute inset-0 opacity-30"
          style={{ transform: `translateY(${parallaxOffset * 0.5}px)` }}
        >
          <div className="absolute top-20 left-10 w-64 h-64 bg-primary/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-primary/10 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative">
          <div className="text-center mb-20" {...animationProps}>
            <div className="space-y-4 mb-8">
              <h2 className="text-5xl lg:text-7xl font-black leading-tight">
                <span className="block text-foreground mb-2">Une mécanique</span>
                <span className="block bg-gradient-to-r from-primary via-primary to-primary/70 bg-clip-text text-transparent">
                  bien étudiée
                </span>
              </h2>
            </div>
            <div className="w-32 h-1 bg-gradient-to-r from-primary to-primary/40 mx-auto mb-8 rounded-full"></div>
            <p className="text-xl lg:text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
              Découvrez comment un système bien rodé transforme la confiance des patients en instrument de profit.
            </p>
          </div>

          <div className="relative">
            <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-transparent via-border to-transparent transform -translate-x-1/2 hidden lg:block"></div>
            <div
              className="absolute left-1/2 top-0 w-1 bg-gradient-to-b from-primary via-primary to-transparent transform -translate-x-1/2 hidden lg:block transition-all duration-1000"
              style={{ height: `${progress}%` }}
            ></div>

            <div className="space-y-16">
              {TIMELINE_STEPS.map((step, index) => {
                const isVisible = prefersReducedMotion || visibleSteps.includes(index);
                const delay = prefersReducedMotion ? undefined : `${index * 100}ms`;

                return (
                  <div
                    key={step.number}
                    ref={(element) => {
                      stepRefs.current[index] = element;
                    }}
                    data-step-index={index}
                    className={`flex flex-col lg:flex-row items-center gap-8 ${
                      index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
                    } transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
                    style={{
                      transitionDelay: delay,
                      transform: prefersReducedMotion ? undefined : `translateY(${isVisible ? 0 : 40}px)`
                    }}
                    {...animationProps}
                  >
                    <div className="lg:w-1/2">
                      <div
                        className="glass-card p-8 rounded-2xl hover:scale-105 transition-all duration-500 cursor-pointer group"
                        onClick={() => setSelectedStep(step)}
                      >
                        <div className="flex items-center mb-4">
                          <span className="bg-primary text-primary-foreground px-4 py-2 rounded-full text-sm font-bold font-mono group-hover:shadow-glow transition-all duration-300">
                            Étape {step.number}
                          </span>
                          <h3 className="text-2xl font-bold text-foreground ml-4 group-hover:text-primary transition-colors duration-300">
                            {step.title}
                          </h3>
                        </div>
                        <p className="text-muted-foreground leading-relaxed text-lg mb-4">{step.description}</p>
                        <div className="flex items-center text-primary text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <span>Cliquer pour voir les détails</span>
                          <svg className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </div>
                      </div>
                    </div>

                    <div className="hidden lg:flex lg:w-12 justify-center">
                      <div className={`w-6 h-6 rounded-full border-2 ${isVisible ? "bg-primary border-primary" : "border-border"} transition-colors duration-500`}></div>
                    </div>

                    <div className="lg:w-1/2">
                      <div className="glass-card p-8 rounded-2xl">
                        <h4 className="text-xl font-semibold text-foreground mb-4">Ce qu'il faut retenir</h4>
                        <ul className="space-y-3">
                          {step.details.map((detail) => (
                            <li key={detail} className="flex items-start gap-3 text-muted-foreground">
                              <span className="mt-1 block h-2 w-2 rounded-full bg-primary"></span>
                              <span>{detail}</span>
                            </li>
                          ))}
                        </ul>
                        <div className="mt-6">
                          <p className="text-sm font-semibold text-foreground uppercase tracking-[0.3em]">Sources</p>
                          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                            {step.sources.map((source) => (
                              <li key={`${step.number}-${source.label}`}>
                                <span className="text-primary font-medium">{source.label}</span>
                                {source.info && ` — ${source.info}`}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <Dialog open={Boolean(selectedStep)} onOpenChange={() => setSelectedStep(null)}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>{selectedStep?.title}</DialogTitle>
            <DialogDescription>{selectedStep?.description}</DialogDescription>
          </DialogHeader>
          <div className="mt-6 space-y-4">
            <div>
              <h4 className="font-semibold text-foreground">Points clés</h4>
              <ul className="list-disc ml-6 text-sm text-muted-foreground space-y-2">
                {selectedStep?.details.map((detail) => (
                  <li key={detail}>{detail}</li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-foreground">Sources vérifiées</h4>
              <ul className="list-disc ml-6 text-sm text-muted-foreground space-y-2">
                {selectedStep?.sources.map((source) => (
                  <li key={source.label}>
                    <span className="text-primary font-medium">{source.label}</span>
                    {source.info && ` — ${source.info}`}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};
