import { Card, CardContent } from "@/components/ui/card";

export const MyStory = () => {
  return (
    <section className="py-32 bg-background" id="mon-histoire">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16" data-aos="fade-up">
          <h2 className="text-4xl lg:text-6xl font-black text-foreground mb-8">
            Mon Histoire
          </h2>
          <div className="w-32 h-1 bg-gradient-to-r from-primary to-primary/40 mx-auto mb-8 rounded-full"></div>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          <Card className="glass-card hover:scale-105 transition-transform duration-500" data-aos="fade-up" data-aos-delay="100">
            <CardContent className="p-8">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                  <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold ml-4 text-foreground">Qui suis-je ?</h3>
              </div>
              <div className="space-y-2">
                <p className="text-muted-foreground leading-relaxed text-lg">
                  Je suis une patiente qui a fait confiance à la clinique <strong className="text-primary font-bold">Lema Dental</strong> à Istanbul.
                </p>
                <p className="text-muted-foreground leading-relaxed text-lg">
                  Comme beaucoup, j'ai cru aux promesses d'un sourire parfait, à des soins modernes et à une équipe qualifiée.
                </p>
                <p className="text-muted-foreground leading-relaxed text-lg">
                  Mais derrière cette façade séduisante, j'ai découvert une tout autre réalité : celle d'une expérience marquée par la douleur, les manquements et le mépris.
                </p>
                <p className="text-muted-foreground leading-relaxed text-lg">
                  Je suis aujourd'hui une <strong className="text-primary">victime</strong>, mais aussi une <strong className="text-primary">voix</strong> — celle de toutes les personnes qui ont été trompées ou réduites au silence.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="glass-card hover:scale-105 transition-transform duration-500" data-aos="fade-up" data-aos-delay="200">
            <CardContent className="p-8">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                  <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold ml-4 text-foreground">Pourquoi ce site ?</h3>
              </div>
              <div className="space-y-2">
                <p className="text-muted-foreground leading-relaxed text-lg">
                  J'ai créé ce site pour révéler la vérité et prévenir d'autres victimes.
                </p>
                <p className="text-muted-foreground leading-relaxed text-lg">
                  Ce site n'est pas une vengeance : c'est une alerte citoyenne.
                </p>
                <p className="text-muted-foreground leading-relaxed text-lg">
                  Un espace de témoignage, d'enquête et de partage d'informations, construit avec rigueur.
                </p>
                <p className="text-muted-foreground leading-relaxed text-lg">
                  Mon objectif est simple : que plus personne ne se laisse séduire par des promesses mensongères, et que chaque patient retrouve son <strong className="text-primary">droit fondamental</strong> à la transparence, au respect et à la dignité.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="mt-16 max-w-4xl mx-auto" data-aos="fade-up" data-aos-delay="300">
          <Card className="glass-card">
            <CardContent className="p-8 lg:p-12">
              <h3 className="text-3xl font-bold text-foreground mb-6">Mon expérience</h3>
              <div className="prose prose-lg prose-invert max-w-none">
                <p className="text-muted-foreground leading-relaxed text-lg mb-4">
                  Comme beaucoup d'autres, j'ai été attiré par les promesses alléchantes de Lema Dental Clinic à Istanbul. Des soins dentaires de qualité à des prix attractifs, une équipe professionnelle, des installations modernes... La réalité s'est révélée bien différente.
                </p>
                <p className="text-muted-foreground leading-relaxed text-lg mb-4">
                  Une fois sur place, le cauchemar a commencé. Les diagnostics ont changé, les prix ont explosé, et les complications sont apparues rapidement. Les promesses se sont évaporées, et je me suis retrouvé piégé dans un système bien rodé, conçu pour maximiser les profits au détriment de la santé des patients.
                </p>
                <p className="text-muted-foreground leading-relaxed text-lg">
                  Aujourd'hui, je me bats pour exposer ces pratiques et aider d'autres victimes. Ce site est ma voix, et j'espère qu'il deviendra aussi la vôtre.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};
