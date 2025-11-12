import { Shield, Scale, FileText, AlertCircle, Lock, HelpCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface Right {
  icon: React.ReactNode;
  title: string;
  description: string;
  details: string[];
  showContactButton?: boolean;
}

export const PatientRights = () => {
  const rights: Right[] = [
    {
      icon: <FileText className="w-8 h-8 text-[#E53935]" />,
      title: "Droit à l'information",
      description: "Le patient a le droit d'être informé de manière claire, loyale et complète sur son état de santé et sur les traitements proposés, dans le respect des règles déontologiques.",
      details: [
        "Diagnostic complet et compréhensible",
        "Explication détaillée des traitements et alternatives",
        "Information sur les risques et bénéfices",
        "Accès au dossier médical complet",
        "Devis détaillé avant toute intervention"
      ]
    },
    {
      icon: <Shield className="w-8 h-8 text-[#E53935]" />,
      title: "Consentement éclairé",
      description: "Aucun soin ne peut être réalisé sans le consentement libre et éclairé du patient, obtenu après une information complète, honnête et compréhensible sur les traitements proposés.",
      details: [
        "Droit de refuser ou d'interrompre un traitement",
        "Délai de réflexion avant acceptation",
        "Consentement écrit pour les actes importants",
        "Possibilité de demander un second avis médical",
        "Liberté de choix du praticien"
      ]
    },
    {
      icon: <Scale className="w-8 h-8 text-[#E53935]" />,
      title: "Droit aux recours",
      description: "Même à l'étranger, un patient n'est pas sans droits. En cas de soins fautifs réalisés en Turquie, il existe plusieurs recours possibles pour obtenir réparation et justice.",
      details: [
        "Réclamation auprès de l'Ordre des médecins turc (Tabipler Birliği)",
        "Saisine de la justice turque ou européenne",
        "Recours possible dans le pays d'origine",
        "Soutien par des associations de victimes de soins à l'étranger",
        "Droit à une indemnisation équitable"
      ]
    },
    {
      icon: <Lock className="w-8 h-8 text-[#E53935]" />,
      title: "Protection des données",
      description: "Les informations médicales sont strictement confidentielles et protégées par le secret médical.",
      details: [
        "Confidentialité absolue du dossier médical",
        "Droit d'accès à ses données personnelles",
        "Droit de rectification des informations",
        "Consentement requis pour partage de données",
        "Protection contre toute divulgation non autorisée"
      ]
    },
    {
      icon: <AlertCircle className="w-8 h-8 text-[#E53935]" />,
      title: "Signalement des abus",
      description: "Tout patient victime de pratiques abusives peut et doit signaler ces faits aux autorités compétentes.",
      details: [
        "Signalement aux autorités sanitaires",
        "Alerte auprès des associations de patients",
        "Dépôt de plainte pénale si nécessaire",
        "Témoignage pour protéger d'autres patients",
        "Participation aux enquêtes officielles"
      ]
    },
    {
      icon: <HelpCircle className="w-8 h-8 text-[#E53935]" />,
      title: "Besoin d'aide juridique ?",
      description: "Si vous estimez que vos droits ont été bafoués, contactez-nous. Nous pouvons vous orienter vers un avocat spécialisé exerçant à Paris et à Istanbul, capable d'évaluer votre dossier et de vous accompagner.",
      showContactButton: true,
      details: []
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-background via-muted/20 to-background relative overflow-hidden" id="vos-droits">
      {/* Background effects */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-20 right-10 w-96 h-96 bg-[#E53935]/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-[#E53935]/5 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#E53935]/10 mb-6">
            <Scale className="w-8 h-8 text-[#E53935]" />
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-foreground">
            Vos Droits en tant que Patient
          </h2>
          <div className="w-32 h-1 bg-gradient-to-r from-[#E53935] to-[#E53935]/40 mx-auto mb-6 rounded-full"></div>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Connaître vos droits est essentiel pour vous protéger et faire valoir vos intérêts en cas de litige médical.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {rights.map((right, index) => (
            <Card
              key={index}
              className="glass-card hover:scale-105 transition-all duration-500 group animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CardContent className="p-8 h-full flex flex-col">
                <div className="flex-1 flex flex-col">
                  <div className="mb-6 transform group-hover:scale-110 transition-transform duration-300">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#E53935]/10 mb-4 group-hover:shadow-[0_0_20px_rgba(229,57,53,0.3)] transition-shadow duration-300">
                      {right.icon}
                    </div>
                    <h3 className="text-2xl font-bold text-foreground mb-3 group-hover:text-[#E53935] transition-colors duration-300">
                      {right.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed mb-6">
                      {right.description}
                    </p>
                  </div>

                  {right.showContactButton ? (
                    <div className="mt-auto pt-4">
                      <a
                        href="#contact"
                        className="inline-flex items-center px-6 py-3 bg-[#E53935] text-white rounded-lg font-semibold hover:bg-[#E53935]/90 hover:shadow-[0_0_20px_rgba(229,57,53,0.4)] transition-all duration-300 w-full justify-center"
                      >
                        Nous contacter
                      </a>
                    </div>
                  ) : (
                    <>
                      <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent mb-6"></div>
                      <div className="space-y-3 flex-1">
                        <h4 className="text-sm font-semibold text-foreground/70 uppercase tracking-wide mb-3">
                          Points clés
                        </h4>
                        <ul className="space-y-2">
                          {right.details.map((detail, idx) => (
                            <li
                              key={idx}
                              className="flex items-start text-sm text-muted-foreground"
                            >
                              <span className="w-1.5 h-1.5 rounded-full bg-[#E53935] mt-2 mr-3 flex-shrink-0"></span>
                              <span className="leading-relaxed">{detail}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
