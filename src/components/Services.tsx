import { BOOKING_CATEGORIES } from "../lib/booking-data";

type ServicesProps = {
  onSelectCategory: (categoryId: string) => void;
};

export function Services({ onSelectCategory }: ServicesProps) {
  return (
    <section id="services" className="relative bg-[#0b0c0f] py-24">
      <div className="mx-auto max-w-7xl px-6 sm:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-orange-400">
            Booking Options
          </p>
          <h2 className="font-display mt-3 text-[clamp(1.9rem,4vw,2.75rem)] font-bold text-white">
            Pick a Category, I&rsquo;ll Handle the Rest
          </h2>
          <p className="mt-4 text-slate-400">
            Portraits to weddings, quinceañeras to destination shoots — 20+ years of experience
            means every category gets the same professional polish. Willing to travel for the
            right session.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {BOOKING_CATEGORIES.map((cat) => (
            <div
              key={cat.id}
              className="group flex flex-col justify-between rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition hover:-translate-y-1 hover:border-orange-400/40 hover:bg-white/[0.06]"
            >
              <div>
                <span className="text-3xl">{cat.icon}</span>
                <h3 className="font-display mt-4 text-xl font-semibold text-white">
                  {cat.label}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-400">{cat.blurb}</p>
              </div>
              <div className="mt-6 flex items-center justify-between">
                <span className="text-sm font-semibold uppercase tracking-wide text-orange-300">
                  Starting at {cat.startingAt}
                </span>
                <a
                  href="#book"
                  onClick={() => onSelectCategory(cat.id)}
                  className="rounded-full border border-white/20 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-white transition group-hover:border-orange-400 group-hover:text-orange-300"
                >
                  Book This
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
