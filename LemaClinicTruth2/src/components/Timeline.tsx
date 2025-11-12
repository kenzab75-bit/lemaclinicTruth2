import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";

interface TimelineStep {
  number: number;
  title: string;
  description: string;
  details: string[];
  sources: { label: string; info: string }[];
}

export const Timeline = () => {
  const [selectedStep, setSelectedStep] = useState<TimelineStep | null>(null);
  const [scrollY, setScrollY] = useState(0);
  const [visibleSteps, setVisibleSteps] = useState<number[]>([]);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
      
      // Detect which steps are in viewport
      const stepElements = document.querySelectorAll('[data-timeline-step]');
      const newVisibleSteps: number[] = [];
      
      stepElements.forEach((el, index) => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.8 && rect.bottom > 0) {
          newVisibleSteps.push(index);
        }
      });
      
      setVisibleSteps(newVisibleSteps);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const timelineSteps: TimelineStep[] = [
    {
      number: 1,
      title: "L'appât commercial",
      description: "Lema Dental Clinic vous appâte avec des devis attractifs et un discours rassurant. Sous couvert de soins \"haut de gamme\", tout est pensé pour instaurer la confiance et provoquer votre départ vers Istanbul.",
      details: [
        "Publicités agressives sur les réseaux sociaux Instagram, Facebook",
        "Promesses de prix 60-70% moins chers avec des 'garanties' attractives (Hôtel 5 étoiles, transfert gratuit  etc)",
        "Communication ultra-réactive et rassurante via WhatsApp et réseaux sociaux",
        "Partenariats avec des influenceurs ou stars internationales pour promouvoir la clinique"
      ],
      sources: [
        { label: "Témoignage patient #12", info: "Devis initial de 3500€ pour 20 facettes et couronnes" },
        { label: "Capture écran Facebook, Instagram, site web", info: "" },
        { label: "Conversation WhatsApp", info: "Échanges avant le départ" }
      ]
    },
    {
      number: 2,
      title: "Le piège",
      description: "Une fois sur place, vous vous retrouvez pris au piège, entièrement dépendants de la clinique, qui exploite cette position de force pour accélérer les procédures. Les consentements sont signés dans la précipitation, sous pression psychologique et logistique. Refuser devient impensable, au risque de perdre les sommes versées et le séjour déjà engagé.",
      details: [
        "Examen initial bâclé, expédié en moins de dix minutes",
        "Traitement prévu avant le départ modifié sur place, au profit de soins beaucoup plus coûteux et invasifs, sans justification médicale réelle ni transparente",
        "Multiplication des actes : meulage, dévitalisations, couronnes, non prévus",
        "Inflation des prix : facture finale 2 à 3 fois supérieure au devis",
        "Isolation du patient : pression pour payer rapidement"
      ],
      sources: [
        { label: "Factures comparées", info: "Documents avant/après traitement" },
        { label: "Export de conversations WhatsApp", info: "" }
      ]
    },
    {
      number: 3,
      title: "L'impasse",
      description: "Une fois entre les mains du chirurgien, vous découvrez des pratiques expéditives où le profit prime sur la santé, sans le moindre scrupule à bafouer le code de déontologie médicale au nom de l'argent. Vous ne contrôlez plus rien...",
      details: [
        "Complications post-opératoires graves : douleurs chroniques, pulpite",
        "Absence totale de suivi médical après le retour en Europe",
        "Impossibilité de joindre la clinique ou réponses évasives ; isolement",
        "Refus de prise en charge des complications",
        "Coûts de réparation en Europe dépassant largement les économies initiales"
      ],
      sources: [
        { label: "Rapports et examens médicaux", info: "Dentistes français 2025" },
        { label: "Témoignage patient", info: "" },
        { label: "Échanges emails", info: "Tentatives de contact restées sans réponse" }
      ]
    },
    {
      number: 4,
      title: "La vérité éclate",
      description: "Faire émerger la vérité par la justice. Parce que le silence protège les fautes, et que seule la vérité libère.",
      details: [
        "Création de groupes d'entraide et de témoignages de victimes",
        "Publication de preuves concrètes : factures, photos, rapports médicaux",
        "Médiatisation croissante de l'affaire dans les médias européens",
        "Plaintes déposées auprès des autorités compétentes",
        "Mobilisation pour alerter les futurs patients et prévenir de nouveaux cas",
        "Demande d'enquête officielle sur les pratiques de la clinique"
      ],
      sources: [
        { label: "Groupe Facebook", info: "Nombreux témoignages recensés" },
        { label: "Plainte en cours de dépôt", info: "" }
      ]
    }
  ];

  const parallaxOffset = scrollY * 0.1;
  

  return (
    <>
      <section className="py-32 bg-gradient-to-br from-background via-muted/20 to-background relative overflow-hidden" id="histoire">
        {/* Parallax background layers */}
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
          <div className="text-center mb-20">
            <div className="space-y-4 mb-8">
              <h2 className="text-5xl lg:text-7xl font-black leading-tight">
                <span className="block text-foreground mb-2">
                  Une mécanique
                </span>
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
            {/* Animated vertical line */}
            <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-transparent via-border to-transparent transform -translate-x-1/2 hidden lg:block"></div>
            <div 
              className="absolute left-1/2 top-0 w-1 bg-gradient-to-b from-primary via-primary to-transparent transform -translate-x-1/2 hidden lg:block transition-all duration-1000"
              style={{ 
                height: `${Math.min(100, (scrollY / 50))}%`,
              }}
            ></div>
            
            <div className="space-y-16">
              {timelineSteps.map((step, index) => {
                const isVisible = visibleSteps.includes(index);
                const delay = index * 100;
                
                return (
                  <div
                    key={step.number}
                    data-timeline-step
                    className={`flex flex-col lg:flex-row items-center gap-8 ${
                      index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
                    } transition-all duration-700 ${
                      isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                    }`}
                    style={{ 
                      transitionDelay: `${delay}ms`,
                      transform: `translateY(${isVisible ? 0 : 40}px)`
                    }}
                  >
                    <div className="lg:w-1/2">
                      <div className="glass-card p-8 rounded-2xl hover:scale-105 transition-all duration-500 cursor-pointer group"
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
                        <p className="text-muted-foreground leading-relaxed text-lg mb-4">
                          {step.description}
                        </p>
                        <div className="flex items-center text-primary text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <span>Cliquer pour voir les détails</span>
                          <svg className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </div>
                      </div>
                    </div>
                    
                    {/* Interactive central point */}
                    <div className="hidden lg:flex lg:w-12 justify-center">
                      <button
                        onClick={() => setSelectedStep(step)}
                        className={`w-8 h-8 rounded-full bg-primary shadow-glow transition-all duration-500 hover:scale-150 hover:shadow-intense cursor-pointer relative group ${
                          isVisible ? 'animate-pulse' : ''
                        }`}
                      >
                        <span className="absolute inset-0 rounded-full bg-primary animate-ping opacity-75"></span>
                        <span className="absolute inset-2 rounded-full bg-background group-hover:bg-primary transition-colors duration-300"></span>
                      </button>
                    </div>
                    
                    <div className="lg:w-1/2"></div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Modal with detailed information */}
      <Dialog open={!!selectedStep} onOpenChange={(open) => !open && setSelectedStep(null)}>
        <DialogContent className="glass-premium max-w-3xl max-h-[80vh] overflow-y-auto">
          {selectedStep && (
            <>
              <DialogHeader>
                <div className="flex items-center gap-4 mb-4">
                  <span className="bg-primary text-primary-foreground px-4 py-2 rounded-full text-sm font-bold font-mono shadow-glow">
                    Étape {selectedStep.number}
                  </span>
                  <DialogTitle className="text-3xl font-bold text-foreground">
                    {selectedStep.title}
                  </DialogTitle>
                </div>
                <DialogDescription className="text-lg text-muted-foreground leading-relaxed">
                  {selectedStep.description}
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-8 mt-6">
                {/* Detailed breakdown */}
                <div className="glass p-6 rounded-xl">
                  <h4 className="text-xl font-bold text-foreground mb-4 flex items-center">
                    <svg className="w-5 h-5 mr-2 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                    Détails de l'étape
                  </h4>
                  <ul className="space-y-3">
                    {selectedStep.details.map((detail, idx) => (
                      <li 
                        key={idx}
                        className="flex items-start text-muted-foreground animate-fade-in"
                        style={{ animationDelay: `${idx * 50}ms` }}
                      >
                        <span className="w-2 h-2 rounded-full bg-primary mt-2 mr-3 flex-shrink-0"></span>
                        <span className="leading-relaxed">{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Sources and evidence */}
                <div className="glass p-6 rounded-xl">
                  <h4 className="text-xl font-bold text-foreground mb-4 flex items-center">
                    <svg className="w-5 h-5 mr-2 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    Sources et preuves
                  </h4>
                  <div className="space-y-3">
                    {selectedStep.sources.map((source, idx) => (
                      <div 
                        key={idx}
                        className="flex items-start p-4 bg-background/50 rounded-lg border border-border/50 hover:border-primary/50 transition-colors duration-300 animate-fade-in"
                        style={{ animationDelay: `${idx * 100}ms` }}
                      >
                        <svg className="w-5 h-5 text-primary mt-0.5 mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                        </svg>
                        <div>
                          <p className="font-semibold text-foreground">{source.label}</p>
                          <p className="text-sm text-muted-foreground mt-1">{source.info}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};
