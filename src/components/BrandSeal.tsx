type BrandSealProps = {
  logoSrc: string | null;
  size?: "hero" | "section" | "compact" | "nav";
};

function GoldLeafSprig({ className }: { className: string }) {
  const uid = className.replace(/[^a-z0-9]/gi, "").slice(0, 8);
  return (
    <svg
      viewBox="0 0 160 160"
      aria-hidden="true"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M131 22C119 34 111 48 108 65C105 86 112 105 128 122C95 119 70 105 55 82C42 62 38 38 43 16C59 35 78 46 100 50C113 53 124 43 131 22Z"
        fill={`url(#goldLeafA${uid})`}
      />
      <path
        d="M37 136C57 122 70 106 77 87C83 70 84 53 79 35C53 51 35 71 25 95C19 109 19 122 37 136Z"
        fill={`url(#goldLeafB${uid})`}
      />
      <path d="M92 51C81 68 76 86 79 103C82 117 90 130 104 143" stroke="#F7DB98" strokeWidth="4" strokeLinecap="round" />
      <path d="M49 112C62 100 72 85 77 68" stroke="#BF8E3E" strokeWidth="4" strokeLinecap="round" />
      <defs>
        <linearGradient id={`goldLeafA${uid}`} x1="52" y1="24" x2="132" y2="124" gradientUnits="userSpaceOnUse">
          <stop stopColor="#F9DE9E" />
          <stop offset="0.38" stopColor="#D6AE64" />
          <stop offset="0.72" stopColor="#8A6427" />
          <stop offset="1" stopColor="#F3CD76" />
        </linearGradient>
        <linearGradient id={`goldLeafB${uid}`} x1="24" y1="42" x2="80" y2="138" gradientUnits="userSpaceOnUse">
          <stop stopColor="#F5D58E" />
          <stop offset="0.48" stopColor="#B98737" />
          <stop offset="1" stopColor="#714D1E" />
        </linearGradient>
      </defs>
    </svg>
  );
}

export function BrandSeal({ logoSrc, size = "hero" }: BrandSealProps) {
  // "nav" is a minimal circular mark only — used in the header where the
  // brand name is already shown as text right next to it.
  if (size === "nav") {
    return (
      <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full border-2 border-[#d4af63] bg-white shadow-[0_0_0_2px_rgba(242,212,136,0.25)]">
        {logoSrc ? (
          <img
            src={logoSrc}
            alt="Ravenscraft Visuals logo"
            className="absolute inset-0 h-full w-full object-contain p-0.5"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-[radial-gradient(circle_at_top,rgba(241,209,139,0.25),rgba(255,255,255,0.96)_65%)]">
            <span className="font-script text-sm leading-none text-[#a7762a]">R</span>
          </div>
        )}
      </div>
    );
  }

  const isCompact = size === "compact";
  const isSection = size === "section";

  const outerClasses = isCompact
    ? "rounded-[1.8rem] px-3 py-3"
    : isSection
      ? "rounded-[2.5rem] px-5 py-5 sm:px-6 sm:py-6"
      : "rounded-[2.9rem] px-5 py-5 sm:px-8 sm:py-8";

  const frameClasses = isCompact
    ? "rounded-[1.4rem] p-2"
    : isSection
      ? "rounded-[2rem] p-3 sm:p-4"
      : "rounded-[2.4rem] p-4 sm:p-5";

  const imageWrapClasses = isCompact
    ? "h-16 w-16"
    : isSection
      ? "h-44 w-44 sm:h-52 sm:w-52"
      : "h-52 w-52 sm:h-72 sm:w-72";

  const titleSize = isCompact ? "text-[0.68rem]" : "text-[0.9rem] sm:text-[1rem]";
  const descriptorSize = isCompact ? "text-[0.52rem]" : "text-[0.72rem] sm:text-[0.8rem]";

  return (
    <div
      className={`relative inline-flex flex-col items-center border border-[#d8b46e]/55 bg-[linear-gradient(180deg,rgba(21,21,21,0.98),rgba(6,6,6,0.98))] shadow-[0_24px_70px_rgba(0,0,0,0.45)] ${outerClasses}`}
    >
      {!isCompact && <GoldLeafSprig className="absolute left-1 top-1 h-16 w-16 opacity-95 sm:h-20 sm:w-20" />}
      {!isCompact && <GoldLeafSprig className="absolute right-1 top-1 h-16 w-16 rotate-90 opacity-95 sm:h-20 sm:w-20" />}
      {!isCompact && <GoldLeafSprig className="absolute bottom-1 left-1 h-16 w-16 -rotate-90 opacity-95 sm:h-20 sm:w-20" />}
      {!isCompact && <GoldLeafSprig className="absolute bottom-1 right-1 h-16 w-16 rotate-180 opacity-95 sm:h-20 sm:w-20" />}

      <div className="rounded-full border border-[#f1d18b]/40 bg-black/70 px-4 py-1 text-[0.62rem] font-semibold uppercase tracking-[0.34em] text-[#eacb85] shadow-[0_0_24px_rgba(212,175,99,0.18)]">
        Est. 2005
      </div>

      <div
        className={`mt-3 border border-[#c79d56]/45 bg-[linear-gradient(180deg,rgba(40,26,10,0.55),rgba(0,0,0,0.55))] shadow-[inset_0_0_0_1px_rgba(248,220,155,0.08)] ${frameClasses}`}
      >
        <div className="rounded-[inherit] border border-[#efcf89]/65 bg-[radial-gradient(circle_at_top,rgba(241,209,139,0.18),rgba(10,10,10,0.98)_58%)] p-3">
          <div
            className={`relative overflow-hidden rounded-full border-[5px] border-[#d4af63] bg-white shadow-[0_0_0_3px_rgba(242,212,136,0.25),inset_0_0_30px_rgba(0,0,0,0.08)] ${imageWrapClasses}`}
          >
            {logoSrc ? (
              <img
                src={logoSrc}
                alt="Ravenscraft Visuals original logo"
                className="absolute inset-0 h-full w-full object-contain p-1"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-[radial-gradient(circle_at_top,rgba(241,209,139,0.2),rgba(255,255,255,0.96)_60%)] p-5 text-center">
                <div>
                  <p className="font-script text-2xl leading-none text-[#a7762a] sm:text-3xl">Ravenscraft</p>
                  <p className="mt-1 text-[0.58rem] font-semibold uppercase tracking-[0.32em] text-[#6e5425] sm:text-[0.7rem]">
                    Original Logo Upload
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <p className={`mt-4 text-center font-semibold uppercase tracking-[0.32em] text-[#f0d48d] ${titleSize}`}>
        Ravenscraft Visuals
      </p>
      <p className={`mt-1 text-center uppercase tracking-[0.28em] text-[#be9650] ${descriptorSize}`}>
        Photography &bull; Videography
      </p>
    </div>
  );
}
