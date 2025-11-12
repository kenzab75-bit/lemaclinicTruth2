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

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <Hero />
      <MyStory />
      <Timeline />
      <PatientRights />
      <Stories />
      <WhistleblowForm />
      <FAQ />
      <Contact />
      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default Index;
