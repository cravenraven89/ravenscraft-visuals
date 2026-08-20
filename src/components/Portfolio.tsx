import type { MediaAsset } from "../lib/cloud-content";
import { INSTAGRAM_URL } from "../lib/booking-data";

type PortfolioProps = {
  images: MediaAsset[];
};

const CREATIVE_RANGE = [
  {
    title: "Landscapes & Reflections",
    description:
      "Wide environmental scenes, dramatic skies, water reflections, and atmospheric light.",
  },
  {
    title: "Macro & Detail",
    description:
      "Close-up studies that highlight texture, personality, and the beauty in small subjects.",
  },
  {
    title: "Storms & Night Atmosphere",
    description:
      "Bold cloud formations, moody weather, evening light, and cinematic urban frames.",
  },
  {
    title: "Travel & Architecture",
    description:
      "Location-based imagery with strong structure, movement, and destination character.",
  },
  {
    title: "Wildlife & Character",
    description:
      "Expressive animal portraits and nature-driven images with a strong visual point of view.",
  },
];

export function Portfolio({ images }: PortfolioProps) {
  return (
    <section id="portfolio" className="bg-[#08090b] py-24">
      <div className="mx-auto max-w-7xl px-6 sm:px-8">
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <div>
            <p className="font-script text-3xl text-[#e7c982] sm:text-4xl">Portfolio</p>
            <h2 className="font-display mt-2 text-[clamp(2rem,4vw,2.9rem)] font-semibold tracking-[0.04em] text-white">
              A Creative Eye Beyond the Session
            </h2>
            <p className="mt-4 max-w-2xl text-lg text-slate-400">
              Ravenscraft Visuals blends portrait and client work with artistic photography that
              captures atmosphere, detail, travel, texture, and light.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-white/20 px-5 py-3 text-sm font-semibold text-white transition hover:border-[#d4af63] hover:text-[#ecd39b]"
            >
              View Instagram Portfolio
              <span aria-hidden>→</span>
            </a>
            <a
              href="#/admin"
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#a7762a] via-[#d4af63] to-[#8a6528] px-5 py-3 text-sm font-semibold text-black transition hover:scale-[1.02]"
            >
              Upload My Photos
              <span aria-hidden>↑</span>
            </a>
          </div>
        </div>

        {images.length > 0 ? (
          <div className="mt-12 columns-1 gap-4 sm:columns-2 sm:gap-5 lg:columns-3">
            {images.map((item) => (
              <figure
                key={item.id}
                className="group mb-4 inline-block w-full break-inside-avoid overflow-hidden rounded-[1.6rem] border border-white/10 bg-black/30 shadow-[0_18px_45px_rgba(0,0,0,0.24)] sm:mb-5"
              >
                <img
                  src={item.url}
                  alt={`Ravenscraft Visuals portfolio: ${item.fileName}`}
                  loading="lazy"
                  decoding="async"
                  className="block h-auto w-full transition duration-500 group-hover:scale-[1.015]"
                />
              </figure>
            ))}
          </div>
        ) : (
          <div className="mt-12 rounded-[2rem] border border-[#d4af63]/25 bg-[linear-gradient(180deg,rgba(15,15,15,0.92),rgba(8,8,8,0.98))] p-8 sm:p-10">
            <div className="mb-6 rounded-2xl border border-[#d4af63]/20 bg-[#0b0b0d] px-5 py-4 text-sm leading-relaxed text-slate-300">
              Your portfolio section is now connected to the admin uploader. Click
              <a href="#/admin" className="mx-1 font-semibold text-[#e7c982] underline">
                Admin / Uploads
              </a>
              and your photos will appear here automatically after upload.
            </div>
            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-5">
              {CREATIVE_RANGE.map((item) => (
                <div
                  key={item.title}
                  className="rounded-[1.5rem] border border-white/10 bg-white/[0.03] p-5"
                >
                  <h3 className="font-display text-xl font-semibold text-white">{item.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-slate-400">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
