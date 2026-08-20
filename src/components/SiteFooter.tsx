import { BrandSeal } from "./BrandSeal";
import { CONTACT_EMAIL, FACEBOOK_LABEL, INSTAGRAM_HANDLE, INSTAGRAM_URL } from "../lib/booking-data";

type SiteFooterProps = {
  logoSrc: string | null;
};

export function SiteFooter({ logoSrc }: SiteFooterProps) {
  return (
    <footer id="contact" className="border-t border-white/10 bg-[#08090b] py-16">
      <div className="mx-auto max-w-7xl px-6 sm:px-8">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-3">
          <div>
            <div className="flex items-center gap-4">
              <BrandSeal logoSrc={logoSrc} size="compact" />
              <div>
                <p className="font-display text-lg font-semibold tracking-[0.18em] text-white">
                  RAVENSCRAFT
                </p>
                <p className="font-script -mt-1 text-2xl leading-none text-[#dcb76d]">Visuals</p>
              </div>
            </div>
            <p className="mt-4 max-w-xs text-base text-slate-400">
              Established in 2005, Ravenscraft Visuals serves Southeast Wisconsin with professional
              photography, artistic style, and a polished booking experience.
            </p>
          </div>

          <div>
            <h3 className="font-display text-xl font-semibold text-white">Get In Touch</h3>
            <ul className="mt-4 space-y-3 text-base text-slate-400">
              <li>
                <a href={`mailto:${CONTACT_EMAIL}`} className="transition hover:text-[#d4af63]">
                  ✉️ {CONTACT_EMAIL}
                </a>
              </li>
              <li>
                <a
                  href={INSTAGRAM_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="transition hover:text-[#d4af63]"
                >
                  📷 @{INSTAGRAM_HANDLE}
                </a>
              </li>
              <li>📘 {FACEBOOK_LABEL} on Facebook</li>
            </ul>
          </div>

          <div>
            <h3 className="font-display text-xl font-semibold text-white">Quick Links</h3>
            <ul className="mt-4 space-y-3 text-base text-slate-400">
              <li>
                <a href="#services" className="transition hover:text-[#d4af63]">
                  Booking Options
                </a>
              </li>
              <li>
                <a href="#rates" className="transition hover:text-[#d4af63]">
                  Rates &amp; Deposit Policy
                </a>
              </li>
              <li>
                <a href="#portfolio" className="transition hover:text-[#d4af63]">
                  Portfolio
                </a>
              </li>
              <li>
                <a href="#book" className="transition hover:text-[#d4af63]">
                  Book a Session
                </a>
              </li>
              <li>
                <a href="#/admin" className="font-semibold text-[#f0d48d] transition hover:text-[#d4af63]">
                  Admin / Uploads
                </a>
              </li>
            </ul>
            <div className="mt-5 rounded-2xl border border-[#d4af63]/20 bg-black/20 p-4 text-sm text-slate-300">
              Need to add your real logo or photos?
              <a href="#/admin" className="ml-1 font-semibold text-[#f0d48d] underline underline-offset-4">
                Open Admin / Uploads
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-6 text-sm text-slate-500 sm:flex-row">
          <p>&copy; {new Date().getFullYear()} Ravenscraft Visuals. All rights reserved.</p>
          <p>
            A deposit is required to reserve any booking.{" "}
            <a href="#/admin" className="transition hover:text-[#d4af63]">
              Admin
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
