import { useState, useEffect, useRef, useMemo } from "react";
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
  const [hoveredStep, setHoveredStep] = useState<number | null>(null);
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

  const parallaxOffset = prefersReducedMotion ? 0 : scrollY * 0.08;
  const highestVisibleIndex = visibleSteps.length ? Math.max(...visibleSteps) : -1;
  const progress = prefersReducedMotion ? 100 : Math.max(0, ((highestVisibleIndex + 1) / TIMELINE_STEPS.length) * 100);
  const segmentSpan = useMemo(() => 100 / TIMELINE_STEPS.length, []);

  const animationProps = prefersReducedMotion ? {} : { "data-aos": "fade-up" };

  return (
    <>
      <section className="py-32 relative overflow-hidden" id="histoire">
        <div
          className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,hsla(var(--secondary)/0.18),transparent_60%),radial-gradient(circle_at_bottom_right,hsla(var(--tertiary)/0.28),transparent_55%)]"
          style={{ transform: `translateY(${parallaxOffset}px)` }}
        ></div>
        <div className="absolute inset-0 grain-overlay"></div>

        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative">
          <div className="text-center mb-24 space-y-6" {...animationProps}>
            <span className="inline-flex items-center justify-center px-5 py-2 rounded-full border border-[hsla(var(--foreground)/0.08)] bg-[hsla(var(--background)/0.6)] text-xs font-geo uppercase tracking-[0.35em] text-[hsla(var(--foreground)/0.6)]">
              Dossier d'enquête
            </span>
            <h2 className="text-5xl lg:text-6xl xl:text-7xl leading-tight font-semibold">
              <span className="block text-foreground">Une mécanique</span>
              <span className="block bg-gradient-to-r from-[hsl(var(--secondary))] via-[hsl(var(--primary))] to-[hsl(var(--accent))] bg-clip-text text-transparent">
                bien étudiée
              </span>
            </h2>
            <p className="text-xl lg:text-2xl text-[hsla(var(--foreground)/0.7)] max-w-4xl mx-auto leading-relaxed">
              Découvrez comment un système bien rodé transforme la confiance des patients en instrument de profit.
            </p>
          </div>

          <div className="hidden lg:flex items-center gap-4 mb-20" {...animationProps}>
            {TIMELINE_STEPS.map((step, index) => {
              const segmentProgress = Math.min(
                100,
                Math.max(0, ((progress - index * segmentSpan) / segmentSpan) * 100)
              );
              const isActive = segmentProgress > 0;

              return (
                <div key={step.number} className="relative flex-1">
                  <div className="h-1 rounded-full bg-[hsla(var(--foreground)/0.08)] overflow-hidden">
                    <div
                      className={`h-full transition-all duration-700 ${isActive ? "bg-[hsl(var(--cta-secondary))]" : "bg-transparent"}`}
                      style={{ width: `${segmentProgress}%` }}
                    ></div>
                  </div>
                  <div
                    className={`absolute -top-6 left-1/2 -translate-x-1/2 h-14 w-14 rounded-full border border-[hsla(var(--foreground)/0.12)] flex items-center justify-center text-lg font-geo transition-all duration-500 ${
                      isActive ? "bg-[hsla(var(--badge-surface)/0.9)] text-[hsl(var(--cta-secondary-foreground))] shadow-[0_20px_40px_-28px_hsla(var(--cta-secondary)/0.9)]" : "bg-[hsla(var(--background)/0.9)] text-[hsla(var(--foreground)/0.4)]"
                    }`}
                  >
                    {step.number.toString().padStart(2, "0")}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="space-y-16">
            {TIMELINE_STEPS.map((step, index) => {
              const isVisible = prefersReducedMotion || visibleSteps.includes(index);
              const delay = prefersReducedMotion ? undefined : `${index * 120}ms`;
              const isActive = highestVisibleIndex >= index;
              const isHovered = hoveredStep === step.number;

              return (
                <article
                  key={step.number}
                  ref={(element) => {
                    stepRefs.current[index] = element;
                  }}
                  data-step-index={index}
                  className={`group relative overflow-hidden rounded-[32px] border border-[hsla(var(--foreground)/0.08)] bg-[hsla(var(--background)/0.55)] backdrop-blur-xl transition-all duration-700 ${
                    isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
                  } ${isActive ? "shadow-[0_50px_120px_-70px_hsla(var(--primary)/0.65)]" : ""}`}
                  style={{
                    transitionDelay: delay,
                    transform: prefersReducedMotion ? undefined : `translateY(${isVisible ? 0 : 60}px)`
                  }}
                  {...animationProps}
                  onMouseEnter={() => {
                    if (!prefersReducedMotion) {
                      setHoveredStep(step.number);
                    }
                  }}
                  onMouseLeave={() => setHoveredStep(null)}
                >
                  <div className="grid gap-8 xl:grid-cols-[minmax(0,260px)_minmax(0,1fr)_320px] p-8 xl:p-12">
                    <figure className="relative overflow-hidden rounded-[28px] border border-[hsla(var(--foreground)/0.06)] bg-[hsla(var(--background)/0.6)] aspect-[4/5]">
                      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,hsla(var(--primary)/0.45),transparent_55%),radial-gradient(circle_at_80%_20%,hsla(var(--accent)/0.3),transparent_60%),radial-gradient(circle_at_10%_80%,hsla(var(--secondary)/0.4),transparent_60%)]"></div>
                      <div className="absolute inset-0 bg-[linear-gradient(135deg,hsla(var(--foreground)/0.04)_0%,transparent_45%),linear-gradient(315deg,hsla(var(--foreground)/0.03)_0%,transparent_55%)]"></div>
                      <div className="absolute inset-0 mix-blend-overlay opacity-30 bg-[url('data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 120 120\'%3E%3Cpath d=\'M0 60h120M60 0v120\' stroke=\'rgba(255,255,255,0.1)\' stroke-width=\'0.5\'/%3E%3C/svg%3E')]"></div>
                      <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-[hsla(var(--background)/0.9)] via-[hsla(var(--background)/0.75)] to-transparent">
                        <span className="inline-flex px-4 py-1 rounded-full text-xs font-geo tracking-[0.28em] text-[hsla(var(--foreground)/0.7)] border border-[hsla(var(--foreground)/0.1)]">
                          Étape {step.number}
                        </span>
                        <figcaption className="mt-4 text-lg font-geo text-[hsla(var(--foreground)/0.88)]">
                          {step.title}
                        </figcaption>
                      </div>
                    </figure>

                    <div className="space-y-6">
                      <header className="space-y-4">
                        <h3 className="text-3xl lg:text-4xl font-semibold text-foreground leading-tight">
                          {step.title}
                        </h3>
                        <p className="text-lg lg:text-xl text-[hsla(var(--foreground)/0.75)] leading-relaxed">
                          {step.description}
                        </p>
                      </header>
                      <div>
                        <h4 className="text-sm font-geo uppercase tracking-[0.35em] text-[hsla(var(--foreground)/0.55)] mb-4">
                          Ce qu'il faut retenir
                        </h4>
                        <ul className="space-y-3">
                          {step.details.map((detail) => (
                            <li key={detail} className="flex items-start gap-3 text-[hsla(var(--foreground)/0.72)]">
                              <span className="mt-1 block h-2 w-2 rounded-full bg-[hsl(var(--cta-primary))]"></span>
                              <span>{detail}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <aside
                      className={`relative transition-transform duration-500 ${
                        prefersReducedMotion ? "" : "xl:translate-x-8 group-hover:translate-x-0"
                      }`}
                    >
                      <div
                        className={`h-full rounded-[28px] border border-[hsla(var(--foreground)/0.08)] glass-premium p-6 xl:p-8 flex flex-col gap-6 ${
                          isHovered || isActive ? "shadow-[0_35px_80px_-60px_hsla(var(--accent)/0.7)]" : ""
                        }`}
                      >
                        <div>
                          <p className="text-xs font-geo uppercase tracking-[0.4em] text-[hsla(var(--foreground)/0.6)]">
                            Preuves collectées
                          </p>
                          <p className="mt-3 text-sm text-[hsla(var(--foreground)/0.7)]">
                            Pièces jointes analysées et vérifiées par le collectif.
                          </p>
                        </div>
                        <ul className="space-y-3 text-sm text-[hsla(var(--foreground)/0.75)]">
                          {step.sources.map((source) => (
                            <li
                              key={`${step.number}-${source.label}`}
                              className="border border-[hsla(var(--foreground)/0.08)] rounded-2xl px-4 py-3 bg-[hsla(var(--background)/0.65)]"
                            >
                              <p className="font-geo text-[hsla(var(--foreground)/0.85)]">{source.label}</p>
                              {source.info && <p className="text-xs text-[hsla(var(--foreground)/0.6)]">{source.info}</p>}
                            </li>
                          ))}
                        </ul>
                        <button
                          type="button"
                          onClick={() => setSelectedStep(step)}
                          className="mt-auto inline-flex items-center justify-between gap-3 rounded-full border border-[hsla(var(--foreground)/0.12)] px-4 py-2 text-xs font-geo uppercase tracking-[0.3em] text-[hsl(var(--cta-tertiary-foreground))] bg-[hsl(var(--cta-tertiary))] hover:bg-[hsla(var(--cta-tertiary)/0.85)] transition-colors"
                        >
                          Voir le dossier complet
                          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
                          </svg>
                        </button>
                      </div>
                    </aside>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <Dialog open={Boolean(selectedStep)} onOpenChange={() => setSelectedStep(null)}>
        <DialogContent className="max-w-3xl border border-[hsla(var(--foreground)/0.08)] bg-[hsla(var(--background)/0.92)]">
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
