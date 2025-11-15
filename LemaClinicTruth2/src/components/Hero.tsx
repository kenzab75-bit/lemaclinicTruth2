import { AlertCircle, Shield, Heart } from "lucide-react";

export const Hero = () => {
  return (
    <section
      id="hero"
      className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#0D0D0F]"
    >
      <div className="absolute inset-0 bg-[linear-gradient(180deg,#0D0D0F_0%,#1B0E10_40%,#0D0D0F_100%)]" />
      <div className="absolute inset-0 bg-black/70" />
      <div className="hero-noise absolute inset-0" />
      <div className="hero-vignette pointer-events-none absolute inset-0" />

      <div className="relative z-10 w-full max-w-4xl px-6 text-center">
        <div className="mx-auto mb-8 mt-6 inline-flex items-center gap-4 rounded-full border border-[#1F1F1F] bg-[#111113]/90 px-6 py-2.5 text-sm font-geo uppercase tracking-[0.32em] text-white/85">
          <span className="text-white">Alerte</span>
          <span className="text-[#D1D5DB]">
            Révélations exclusives sur les pratiques de la clinique LEMA DENTAL à Istanbul
          </span>
        </div>

        <div className="mx-auto mb-8 flex items-center justify-center">
          <div className="relative flex h-40 w-40 items-center justify-center">
            <div className="absolute inset-0 rounded-full bg-[#8F1A23]/40 blur-xl hero-halo" />
            <div className="absolute inset-[14%] rounded-full border border-white/10" />
            <div className="relative flex h-32 w-32 items-center justify-center rounded-full bg-[#8F1A23] shadow-[0_18px_40px_rgba(12,12,14,0.65)]">
              <AlertCircle className="h-16 w-16 text-white" strokeWidth={2.2} />
            </div>
          </div>
        </div>

        <h1 className="mb-5 text-5xl font-semibold leading-[0.95] tracking-tight text-white sm:text-6xl lg:text-7xl">
          <span className="block">LemaClinic</span>
          <span className="block text-[#8F1A23]">Truth</span>
        </h1>

        <p className="mx-auto mb-10 max-w-3xl text-lg font-light text-[#E5E7EB] sm:text-xl">
          La vérité éclaire toujours
        </p>

        <div className="mx-auto mb-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <a
            href="#mon-histoire"
            className="inline-flex items-center justify-center gap-3 rounded-md bg-[#B4202A] px-8 py-3 text-base font-semibold text-white shadow-[0_20px_40px_rgba(180,32,42,0.35)] transition-colors duration-200 hover:bg-[#c53035]"
          >
            <Shield className="h-5 w-5" />
            Découvrir mon histoire
          </a>
          <a
            href="#soutenir"
            className="inline-flex items-center justify-center gap-3 rounded-md border border-[#B4202A] px-8 py-3 text-base font-semibold text-white transition-colors duration-200 hover:bg-[#B4202A]/10"
          >
            <Heart className="h-5 w-5" />
            Soutenir le projet
          </a>
        </div>

        <div className="mx-auto max-w-3xl rounded-3xl border border-[#1F1F1F] bg-[#111113]/90 p-8 text-left text-white">
          <p className="text-lg leading-relaxed text-[#D1D5DB]">
            Révéler la vérité, défendre les victimes, face aux abus de Lema Dental Clinic en Turquie.
          </p>
        </div>
      </div>
    </section>
  );
};
