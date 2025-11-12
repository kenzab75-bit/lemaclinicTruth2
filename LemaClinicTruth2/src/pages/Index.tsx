import { Navigation } from "@/components/Navigation";
import { Hero } from "@/components/Hero";
import { Timeline } from "@/components/Timeline";
import { PatientRights } from "@/components/PatientRights";
import { MyStory } from "@/components/MyStory";
import { Stories } from "@/components/Stories";
import { WhistleblowForm } from "@/components/WhistleblowForm";
import { FAQ } from "@/components/FAQ";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { ScrollToTop } from "@/components/ScrollToTop";
import { SupportSection } from "@/components/SupportSection";
import { PrivacyCommitment } from "@/components/PrivacyCommitment";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-1/2 focus:-translate-x-1/2 focus:bg-primary focus:text-primary-foreground focus:px-4 focus:py-2 focus:rounded-full focus:z-[100]"
      >
        Aller au contenu principal
      </a>
      <Navigation />
      <main id="main-content" tabIndex={-1} className="outline-none">
        <Hero />
        <MyStory />
        <Timeline />
        <PatientRights />
        <Stories />
        <SupportSection />
        <WhistleblowForm />
        <FAQ />
        <Contact />
        <PrivacyCommitment />
      </main>
      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default Index;
