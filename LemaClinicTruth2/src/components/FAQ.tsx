import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export const FAQ = () => {
  const faqs = [
    {
      question: "Comment puis-je témoigner de manière anonyme ?",
      answer: "Utilisez notre formulaire de témoignage sécurisé ci-dessus. Nous utilisons un chiffrement de bout en bout et ne collectons jamais d'adresses IP ou d'informations identifiantes. Votre anonymat est notre priorité absolue.",
    },
    {
      question: "Quel type de documentation acceptez-vous ?",
      answer: "Nous acceptons les dossiers médicaux, les factures, la correspondance, les photos et toute autre documentation pertinente. Tous les témoignages sont examinés attentivement et stockés en toute sécurité.",
    },
    {
      question: "Y a-t-il un soutien juridique disponible pour les victimes ?",
      answer: "Nous pouvons vous mettre en contact avec des professionnels du droit spécialisés dans les cas de faute médicale. Contactez-nous via le formulaire sécurisé pour plus d'informations.",
    },
  ];

  return (
    <section className="py-20 bg-muted/50" id="faq">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16" data-aos="fade-up">
          <h2 className="text-4xl font-bold mb-4">Questions Fréquentes</h2>
          <p className="text-xl text-muted-foreground">
            Tout ce que vous devez savoir sur le projet
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="glass-card rounded-lg px-6 border-none"
                data-aos="fade-up"
                data-aos-delay={index * 100}
              >
                <AccordionTrigger className="text-left hover:text-primary hover:no-underline text-lg font-semibold">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed text-base">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};
