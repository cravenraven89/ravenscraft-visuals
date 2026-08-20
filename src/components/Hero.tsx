import { BrandSeal } from "./BrandSeal";

type HeroProps = {
  logoSrc: string | null;
};

export function Hero({ logoSrc }: HeroProps) {
  return (
    <section id="top" className="relative flex min-h-[100svh] items-center overflow-hidden pt-16">
      <img
        src="/images/hero-bg.jpg"
        alt="Moody autumn forest at dusk"
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/75 via-black/65 to-[#08090b]" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-transparent to-black/55" />

      <div className="relative z-10 mx-auto grid w-full max-w-7xl gap-12 px-6 py-16 sm:px-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        <div className="text-center lg:text-left">
          <p className="animate-fade-up text-sm font-semibold uppercase tracking-[0.35em] text-[#d4af63]">
            SE Wisconsin Photographer &middot; Established 2005
          </p>
          <p className="font-script mt-5 animate-fade-up text-4xl leading-none text-[#f0d596] sm:text-5xl">
            Ravenscraft Visuals
          </p>
          <h1 className="font-display mt-3 max-w-4xl animate-fade-up text-[clamp(2.5rem,7vw,5rem)] font-semibold leading-[1.03] text-white">
            Elegant photography with a bold artistic edge.
            <span className="font-script mt-3 block text-[0.9em] font-normal text-[#ecd39b] sm:text-[0.78em]">
              Crafted beautifully for portraits, events, love stories, and more
            </span>
          </h1>
          <p className="mt-6 max-w-2xl animate-fade-up text-lg leading-relaxed text-slate-200 lg:max-w-xl">
            Ravenscraft Visuals delivers polished portrait, wedding, quinceañera, concert,
            family, boudoir, automotive, brand, and lifestyle photography with the experience
            and creative direction that only comes from 20+ years behind the lens. Based in
            SE Wisconsin — willing to travel.
          </p>

          <div className="mt-9 flex flex-col items-center gap-4 animate-fade-up sm:flex-row lg:items-start">
            <a
              href="#book"
              className="w-full rounded-full bg-gradient-to-r from-[#a7762a] via-[#d4af63] to-[#8a6528] px-8 py-4 text-base font-semibold text-black shadow-xl shadow-black/40 transition hover:scale-105 sm:w-auto"
            >
              Book Your Session
            </a>
            <a
              href="#services"
              className="w-full rounded-full border border-[#d4af63]/45 bg-black/25 px-8 py-4 text-base font-semibold text-white backdrop-blur transition hover:border-[#d4af63] hover:text-[#ecd39b] sm:w-auto"
            >
              View Booking Options
            </a>
          </div>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3 text-xs uppercase tracking-[0.22em] text-slate-400 lg:justify-start">
            <span className="rounded-full border border-white/10 bg-black/20 px-4 py-2">Deposit Required</span>
            <span className="rounded-full border border-white/10 bg-black/20 px-4 py-2">Willing to Travel</span>
            <span className="rounded-full border border-white/10 bg-black/20 px-4 py-2">Photography &amp; Videography</span>
          </div>
        </div>

        <div className="flex justify-center lg:justify-end">
          <BrandSeal logoSrc={logoSrc} size="hero" />
        </div>
      </div>
    </section>
  );
}
