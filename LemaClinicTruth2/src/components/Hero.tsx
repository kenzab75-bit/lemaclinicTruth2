import { useEffect, useMemo, useState } from "react";
import { Shield, Heart } from "lucide-react";
import { PremiumButton } from "@/components/ui/premium-button";
import { useScrollPosition } from "@/hooks/useScrollPosition";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

export const Hero = () => {
  const scrollY = useScrollPosition();
  const prefersReducedMotion = usePrefersReducedMotion();
  const keywords = useMemo(
    () => ["Enquêter", "Réparer", "Protéger"],
    []
  );
  const [activeKeyword, setActiveKeyword] = useState(0);

  const titleParallaxY = prefersReducedMotion ? 0 : scrollY * 0.3;
  const titleScale = prefersReducedMotion ? 1 : Math.max(1 - scrollY * 0.0003, 0.85);
  const titleOpacity = prefersReducedMotion ? 1 : Math.max(1 - scrollY * 0.002, 0);
  const getAosProps = (animation: string, delay?: number) =>
    prefersReducedMotion ? {} : { "data-aos": animation, ...(delay ? { "data-aos-delay": delay } : {}) };

  useEffect(() => {
    if (prefersReducedMotion) {
      setActiveKeyword(0);
      return;
    }

    const interval = window.setInterval(() => {
      setActiveKeyword((current) => (current + 1) % keywords.length);
    }, 3600);

    return () => window.clearInterval(interval);
  }, [keywords, prefersReducedMotion]);

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-24"
    >
      <div className="absolute inset-0 mesh-panel scale-110"></div>
      <div className="absolute inset-0 bg-[linear-gradient(115deg,hsla(var(--tertiary)/0.35)_0%,transparent_35%),linear-gradient(250deg,hsla(var(--secondary)/0.4)_0%,transparent_45%)]"></div>
      <div
        className="absolute inset-0 opacity-25"
        style={{
          transform: prefersReducedMotion ? undefined : `translateY(${scrollY * 0.05}px)`
        }}
      >
        <div className="absolute inset-0 bg-[linear-gradient(0deg,transparent 97%,hsla(var(--foreground)/0.05) 100%)] bg-[length:100%_28px]"></div>
        <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent 97%,hsla(var(--foreground)/0.04) 100%)] bg-[length:28px_100%]"></div>
      </div>
      <div className="absolute inset-0 grain-overlay"></div>

      <div className="container mx-auto px-6 text-center relative z-10">
        {/* Breaking News Banner */}
        <div className="glass-premium border border-[hsla(var(--foreground)/0.08)] rounded-2xl px-5 py-4 mb-10 mt-2 max-w-4xl mx-auto shadow-[0_40px_90px_-60px_hsla(var(--primary)/0.7)]" {...getAosProps("fade-down")}>
          <div className="flex items-center justify-center gap-4 flex-wrap">
            <span className="px-4 py-1.5 rounded-full text-sm font-geo tracking-[0.18em] bg-[hsl(var(--badge-surface))] text-[hsla(var(--foreground)/0.85)] border border-[hsl(var(--badge-border))]">
              Alerte
            </span>
            <p className="text-base font-geo text-[hsl(var(--cta-secondary))]">
              Révélations exclusives sur les pratiques de la clinique LEMA DENTAL à Istanbul
            </p>
          </div>
        </div>

        {/* Alert Icon */}
        <div className="flex justify-center mb-14" {...getAosProps("zoom-in", 300)}>
          <div className="relative h-36 w-36 rounded-full bg-gradient-to-br from-[hsl(var(--tertiary))] via-[hsla(var(--primary)/0.45)] to-transparent p-[1px]">
            <div className="absolute inset-0 rounded-full blur-2xl bg-[hsla(var(--primary)/0.45)]"></div>
            <div className="relative h-full w-full rounded-full glass-premium flex items-center justify-center">
              <svg className="h-16 w-16 text-[hsl(var(--cta-secondary))] drop-shadow-[0_12px_30px_hsla(var(--primary)/0.45)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
          </div>
        </div>

        {/* Main Title */}
        <h1
          className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-semibold mb-8 leading-[0.95] tracking-tight"
          {...getAosProps("fade-up", 600)}
          style={{
            transform: `translateY(${titleParallaxY}px) scale(${titleScale})`,
            opacity: titleOpacity,
            transition: 'transform 0.1s ease-out, opacity 0.1s ease-out',
          }}
        >
          <span className="block text-foreground">LemaClinic</span>
          <span className="block bg-gradient-to-r from-[hsl(var(--primary))] via-[hsl(var(--secondary))] to-[hsl(var(--accent))] bg-clip-text text-transparent">
            Truth
          </span>
        </h1>

        {/* Slogan */}
        <div className="mb-14 flex flex-col items-center gap-6" {...getAosProps("fade-up", 900)}>
          <p
            className="text-2xl lg:text-3xl xl:text-4xl font-normal text-[hsla(var(--foreground)/0.92)]"
            style={{
              transform: `translateY(${titleParallaxY * 0.5}px)`,
              opacity: titleOpacity,
              transition: 'transform 0.1s ease-out, opacity 0.1s ease-out',
            }}
          >
            La vérité éclaire toujours
          </p>
          <div className="relative h-10 w-full max-w-sm overflow-hidden rounded-full border border-[hsla(var(--foreground)/0.1)] bg-[hsla(var(--background)/0.7)]">
            <div
              className="absolute inset-0 flex flex-col transition-transform duration-700 ease-out"
              style={{ transform: `translateY(-${activeKeyword * 100}%)` }}
            >
              {keywords.map((keyword) => (
                <span key={keyword} className="h-10 flex items-center justify-center text-sm font-geo uppercase tracking-[0.45em] text-[hsla(var(--foreground)/0.75)]">
                  {keyword}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Mission Statement */}
        <div className="max-w-6xl mx-auto mb-16" {...getAosProps("fade-up", 1200)}>
          <div className="glass-strong rounded-3xl p-8 lg:p-12 hover:scale-[1.02] transition-transform duration-500 border border-[hsla(var(--foreground)/0.08)]">
            <p className="text-xl lg:text-[26px] font-geo leading-relaxed text-[hsla(var(--foreground)/0.88)]">
              Révéler la vérité, défendre les victimes, face aux abus de Lema Dental Clinic en Turquie.
            </p>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col lg:flex-row gap-6 justify-center items-center" {...getAosProps("fade-up", 1000)}>
          <PremiumButton
            href="#mon-histoire"
            variant="primary"
            size="lg"
            icon={<Shield className="h-6 w-6" />}
          >
            Découvrir mon histoire
          </PremiumButton>

          <PremiumButton
            href="#soutenir"
            variant="secondary"
            size="lg"
            icon={<Heart className="h-6 w-6" />}
          >
            Soutenir le projet
          </PremiumButton>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="glass-strong w-8 h-12 border-2 border-border rounded-full flex justify-center p-2">
            <div className="w-2 h-4 bg-primary rounded-full animate-pulse"></div>
          </div>
          <p className="text-muted-foreground text-sm mt-2 font-mono text-center">SCROLL</p>
        </div>
      </div>
    </section>
  );
};
