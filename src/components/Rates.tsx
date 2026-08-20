import { RATE_PACKAGES } from "../lib/booking-data";

export function Rates() {
  return (
    <section id="rates" className="relative bg-[#0b0c0f] py-24">
      <div className="mx-auto max-w-7xl px-6 sm:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-orange-400">
            Rates &amp; Packages
          </p>
          <h2 className="font-display mt-3 text-[clamp(1.9rem,4vw,2.75rem)] font-bold text-white">
            20+ Years of Experience, Transparent Pricing
          </h2>
          <p className="mt-4 text-slate-400">
            Straightforward packages built around two decades behind the lens. Final pricing
            depends on category, location, travel, and add-ons — every quote is confirmed
            before a deposit is requested. Willing to travel for the right session.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {RATE_PACKAGES.map((pkg) => (
            <div
              key={pkg.name}
              className={`flex flex-col rounded-2xl border p-7 ${
                pkg.highlight
                  ? "border-orange-400/60 bg-gradient-to-b from-orange-500/10 to-transparent"
                  : "border-white/10 bg-white/[0.03]"
              }`}
            >
              {pkg.tag && (
                <span
                  className={`mb-3 w-fit rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-wide ${
                    pkg.highlight
                      ? "bg-orange-500/20 text-orange-300"
                      : "bg-[#d4af63]/15 text-[#e7c982]"
                  }`}
                >
                  {pkg.tag}
                </span>
              )}
              <h3 className="font-display text-xl font-bold text-white">{pkg.name}</h3>
              <p className="mt-1 text-sm text-slate-400">{pkg.duration}</p>
              <p className="font-display mt-4 text-3xl font-extrabold text-orange-400">
                {pkg.price}
              </p>
              <ul className="mt-5 flex flex-1 flex-col gap-2 text-sm text-slate-300">
                {pkg.details.map((d) => (
                  <li key={d} className="flex gap-2">
                    <span className="text-orange-400">✓</span>
                    <span>{d}</span>
                  </li>
                ))}
              </ul>
              <a
                href="#book"
                className={`mt-6 block rounded-full px-6 py-3 text-center text-sm font-semibold transition ${
                  pkg.highlight
                    ? "bg-gradient-to-r from-orange-500 to-pink-600 text-white shadow-lg shadow-orange-900/30 hover:scale-[1.02]"
                    : "border border-white/20 text-white hover:border-orange-400 hover:text-orange-300"
                }`}
              >
                Book This Package
              </a>
            </div>
          ))}
        </div>

        <div className="mx-auto mt-14 grid max-w-5xl gap-6 lg:grid-cols-2">
          <div className="rounded-2xl border border-orange-400/30 bg-orange-500/5 p-7 sm:p-9">
            <h3 className="font-display text-lg font-bold uppercase tracking-wide text-orange-300">
              Deposit Policy
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-slate-200 sm:text-base">
              A non-refundable retainer deposit is required for{" "}
              <span className="font-semibold text-white">every</span> photography booking to
              reserve your date and time. The deposit is applied toward your total session cost,
              with the remaining balance due on or before the day of your shoot. Payment details
              and a deposit invoice will be sent by email once your session is confirmed.
            </p>
          </div>

          <div className="rounded-2xl border border-[#d4af63]/30 bg-[#d4af63]/5 p-7 sm:p-9">
            <h3 className="font-display text-lg font-bold uppercase tracking-wide text-[#e7c982]">
              Travel &amp; Destination Sessions
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-slate-200 sm:text-base">
              Based in Southeast Wisconsin but willing to go where the work takes me.
              Local travel within SE Wisconsin is included in every session.
              Midwest travel is available at a flat rate. Out-of-state and destination
              sessions are quoted individually — travel, lodging, and logistics are
              coordinated in advance so you know the full cost up front.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
