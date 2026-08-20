import { BrandSeal } from "./BrandSeal";
import { INSTAGRAM_URL } from "../lib/booking-data";

type SiteHeaderProps = {
  logoSrc: string | null;
};

const NAV_LINKS = [
  { href: "#services", label: "Services" },
  { href: "#portfolio", label: "Portfolio" },
  { href: "#rates", label: "Rates" },
  { href: "#about", label: "About" },
  { href: "#contact", label: "Contact" },
];

function InstagramIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.2" cy="6.8" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function SiteHeader({ logoSrc }: SiteHeaderProps) {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-[#0a0a0c]/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-2 sm:px-6">
        <a href="#top" className="flex min-w-0 items-center gap-2">
          <BrandSeal logoSrc={logoSrc} size="nav" />
          <div className="min-w-0 leading-none">
            <p className="truncate font-display text-xs font-semibold tracking-[0.14em] text-white sm:text-sm">
              RAVENSCRAFT
            </p>
            <p className="font-script -mt-0.5 text-lg leading-none text-[#dcb76d] sm:text-xl">
              Visuals
            </p>
          </div>
        </a>

        <nav className="hidden items-center gap-5 xl:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="whitespace-nowrap text-sm font-medium tracking-[0.06em] text-slate-200 transition hover:text-[#d4af63]"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-2.5 xl:flex">
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noreferrer"
            aria-label="Instagram"
            title="Instagram"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-slate-300 transition hover:border-[#d4af63] hover:text-[#d4af63]"
          >
            <InstagramIcon />
          </a>
          <a
            href="#/admin"
            className="whitespace-nowrap rounded-full border border-[#d4af63]/45 px-4 py-2 text-xs font-semibold text-[#f0d48d] transition hover:border-[#d4af63] hover:bg-[#d4af63]/10"
          >
            Admin
          </a>
          <a
            href="#book"
            className="whitespace-nowrap rounded-full bg-gradient-to-r from-[#a7762a] via-[#d4af63] to-[#8a6528] px-4 py-2 text-xs font-semibold text-black shadow-lg shadow-black/40 transition hover:scale-105"
          >
            Book Now
          </a>
        </div>

        <details className="group relative shrink-0 xl:hidden">
          <summary className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border border-white/15 text-white marker:content-none">
            <span className="sr-only">Toggle menu</span>
            <svg className="group-open:hidden" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />
            </svg>
            <svg className="hidden group-open:block" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
            </svg>
          </summary>
          <div className="absolute right-0 top-12 w-64 max-w-[calc(100vw-2rem)] rounded-2xl border border-white/10 bg-[#0a0a0c] p-4 shadow-2xl shadow-black/50">
            <nav className="flex flex-col gap-4">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-base font-medium text-slate-100 transition hover:text-[#d4af63]"
                >
                  {link.label}
                </a>
              ))}
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 text-base font-medium text-slate-100 transition hover:text-[#d4af63]"
              >
                <InstagramIcon />
                Instagram
              </a>
              <a
                href="#/admin"
                className="text-base font-medium text-[#f0d48d] transition hover:text-[#d4af63]"
              >
                Admin / Uploads
              </a>
              <a
                href="#book"
                className="mt-2 rounded-full bg-gradient-to-r from-[#a7762a] via-[#d4af63] to-[#8a6528] px-5 py-3 text-center text-base font-semibold text-black"
              >
                Book Now
              </a>
            </nav>
          </div>
        </details>
      </div>
    </header>
  );
}
