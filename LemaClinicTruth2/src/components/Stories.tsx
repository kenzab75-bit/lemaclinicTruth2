import { Card, CardContent } from "@/components/ui/card";
import { useState } from "react";

type Category = "Tous" | "Complications" | "Négligence" | "Fraude" | "Facturation";

export const Stories = () => {
  const [activeCategory, setActiveCategory] = useState<Category>("Tous");

  const stories = [
    {
      quote: "Après mon intervention, j'ai souffert de complications qui n'ont jamais été correctement prises en charge. Je me retrouve avec des dommages permanents.",
      author: "Patient Anonyme",
      location: "France",
      category: "Complications" as Category,
    },
    {
      quote: "La clinique a menti sur mon diagnostic pour justifier des procédures inutiles qui m'ont laissé dans un état pire.",
      author: "Marie S.",
      location: "Suisse",
      category: "Fraude" as Category,
    },
    {
      quote: "Facturations abusives, frais cachés non mentionnés. Le montant final était le double du devis initial.",
      author: "Sophie M.",
      location: "Luxembourg",
      category: "Facturation" as Category,
    },
  ];

  const categories: Category[] = ["Tous", "Complications", "Négligence", "Fraude", "Facturation"];

  const filteredStories = activeCategory === "Tous" 
    ? stories 
    : stories.filter(story => story.category === activeCategory);

  return (
    <section 
      className="py-20 relative overflow-hidden" 
      id="temoignages"
      style={{
        background: 'linear-gradient(135deg, #242424 0%, #2A2A2A 50%, #242424 100%)',
      }}
    >
      {/* Effets discrets premium */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#E53935]/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#E53935]/5 rounded-full blur-3xl"></div>
      </div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-12" data-aos="fade-up">
          <h2 className="text-4xl font-bold mb-4 text-[#F1F1F1]">Témoignages des Victimes</h2>
          <p className="text-xl text-[#F1F1F1]/70 max-w-2xl mx-auto">
            Des histoires réelles de personnes affectées par les pratiques de la clinique
          </p>
        </div>

        {/* Premium Filter System */}
        <div className="flex flex-wrap justify-center gap-3 mb-12" data-aos="fade-up" data-aos-delay="100">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`
                px-6 py-3 rounded-full font-medium text-sm tracking-wide
                backdrop-blur-xl border transition-all duration-500 ease-out
                ${activeCategory === category
                  ? 'bg-[#E53935]/20 text-[#E53935] border-[#E53935]/40 shadow-[0_0_20px_rgba(229,57,53,0.3)] scale-105'
                  : 'bg-white/5 text-[#F1F1F1]/60 border-white/10 hover:text-[#F1F1F1] hover:bg-white/10 hover:border-white/20 hover:scale-105'
                }
              `}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {filteredStories.map((story, index) => (
            <Card
              key={`${story.author}-${index}`}
              className="bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-2xl shadow-[0_8px_32px_0_rgba(0,0,0,0.4)] hover:shadow-[0_12px_48px_0_rgba(229,57,53,0.2)] hover:scale-[1.02] hover:border-[#E53935]/30 transition-all duration-500 animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CardContent className="p-8">
                <div className="mb-6">
                  <svg className="h-8 w-8 text-[#E53935] mb-4 drop-shadow-[0_0_8px_rgba(229,57,53,0.5)]" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                  </svg>
                  <p className="text-[#F1F1F1]/80 italic mb-4 leading-relaxed text-lg">
                    {story.quote}
                  </p>
                </div>
                <div className="border-t border-white/10 pt-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-bold text-[#F1F1F1]">{story.author}</p>
                      <p className="text-sm text-[#F1F1F1]/50">{story.location}</p>
                    </div>
                    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-[#E53935]/15 text-[#E53935] border border-[#E53935]/30 shadow-[0_0_12px_rgba(229,57,53,0.2)]">
                      {story.category}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12 space-y-2">
          <p className="text-[#F1F1F1]/60 italic">
            Tous les témoignages sont anonymisés et vérifiés avant publication
          </p>
          <p className="text-sm text-[#F1F1F1]/40">
            {filteredStories.length} témoignage{filteredStories.length > 1 ? 's' : ''} • {activeCategory === "Tous" ? "Toutes catégories" : activeCategory}
          </p>
        </div>
      </div>
    </section>
  );
};
