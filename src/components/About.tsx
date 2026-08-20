import { BrandSeal } from "./BrandSeal";

type AboutProps = {
  logoSrc: string | null;
  aboutPhotoSrc: string | null;
};

const STATS = [
  { value: "Est. 2005", label: "Business Founded" },
  { value: "20+", label: "Years of Experience" },
  { value: "SE WI", label: "Based & Booking Locally" },
  { value: "Nationwide", label: "Travel Available" },
];

export function About({ logoSrc, aboutPhotoSrc }: AboutProps) {
  return (
    <section id="about" className="bg-[#08090b] py-24">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-14 px-6 sm:px-8 lg:grid-cols-2">
        <div>
          <p className="font-script text-3xl text-[#e7c982] sm:text-4xl">About</p>
          <h2 className="font-display mt-2 text-[clamp(2rem,4vw,2.9rem)] font-semibold tracking-[0.04em] text-white">
            Built on Experience. Refined with Vision.
          </h2>
          <p className="mt-5 text-lg text-slate-300">
            Ravenscraft Visuals is a Southeast Wisconsin photography brand established in 2005 and
            built around consistent, professional storytelling. Every session is approached with a
            balance of creative instinct, technical control, and a clean client experience from the
            first inquiry to final image delivery.
          </p>
          <p className="mt-4 text-lg text-slate-300">
            Whether you need portraits, couples, family sessions, live music coverage, events,
            boudoir, private garden sessions, automotive work, or visual content for your brand,
            the goal is the same: create polished images that feel personal, elevated, and worth
            remembering.
          </p>

          <div className="mt-10 grid grid-cols-2 gap-6 sm:grid-cols-4">
            {STATS.map((stat) => (
              <div
                key={stat.label}
                className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 text-center"
              >
                <p className="font-display text-2xl font-semibold text-[#d4af63]">{stat.value}</p>
                <p className="mt-1 text-xs uppercase tracking-wide text-slate-400">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col items-center gap-8 lg:items-end">
          {aboutPhotoSrc ? (
            <div className="relative w-full max-w-md overflow-hidden rounded-[2rem] border border-[#d4af63]/30 bg-black/40 shadow-[0_24px_60px_rgba(0,0,0,0.5)]">
              <img
                src={aboutPhotoSrc}
                alt="Ravenscraft Visuals photographer at work"
                className="h-auto w-full object-cover"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent px-5 py-4">
                <p className="font-script text-xl text-[#f0d48d]">Behind the lens</p>
              </div>
            </div>
          ) : (
            <BrandSeal logoSrc={logoSrc} size="section" />
          )}
        </div>
      </div>
    </section>
  );
}
