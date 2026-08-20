export type BookingCategory = {
  id: string;
  label: string;
  icon: string;
  blurb: string;
  startingAt: string;
};

export const BOOKING_CATEGORIES: BookingCategory[] = [
  {
    id: "portraits-headshots",
    label: "Portraits & Headshots",
    icon: "📸",
    blurb: "Professional headshots, personal branding portraits, and senior photos — crafted with two decades of portrait experience.",
    startingAt: "$250",
  },
  {
    id: "couples-engagements",
    label: "Couples & Engagements",
    icon: "💍",
    blurb: "Romantic sessions to celebrate your love story, engagement, or anniversary with cinematic, editorial-quality results.",
    startingAt: "$350",
  },
  {
    id: "weddings",
    label: "Weddings",
    icon: "💒",
    blurb: "Full or partial wedding day coverage — ceremony, reception, details, portraits, and candid moments captured with a polished editorial eye.",
    startingAt: "$1,500",
  },
  {
    id: "quinceanera",
    label: "Quinceañera",
    icon: "👑",
    blurb: "Celebrate this once-in-a-lifetime milestone with stunning portraits, ceremony coverage, and party photography to match the occasion.",
    startingAt: "$800",
  },
  {
    id: "bar-bat-mitzvah",
    label: "Bar & Bat Mitzvah",
    icon: "✡️",
    blurb: "Full event coverage for the ceremony, celebration, and portraits — capturing every meaningful moment of this important milestone.",
    startingAt: "$800",
  },
  {
    id: "milestone-events",
    label: "Major Life Events",
    icon: "🥂",
    blurb: "Sweet 16s, anniversaries, vow renewals, retirement celebrations, graduations — any milestone that deserves professional photography.",
    startingAt: "$500",
  },
  {
    id: "family-shoots",
    label: "Family Shoots",
    icon: "👨‍👩‍👧",
    blurb: "Relaxed, candid family sessions for every season and every generation — from newborns to multi-generational portraits.",
    startingAt: "$300",
  },
  {
    id: "concerts-live-music",
    label: "Concerts & Live Music",
    icon: "🎤",
    blurb: "High-energy concert, band, and live performance coverage with the speed and instinct to capture raw energy in real time.",
    startingAt: "$300",
  },
  {
    id: "events-parties",
    label: "Events & Parties",
    icon: "🎉",
    blurb: "Birthdays, corporate events, galas, fundraisers, and private parties captured candidly and professionally.",
    startingAt: "$350",
  },
  {
    id: "lifestyle-creative",
    label: "Lifestyle & Creative Shoots",
    icon: "👟",
    blurb: "Editorial-style, concept-driven, and lifestyle creative sessions with full art direction.",
    startingAt: "$300",
  },
  {
    id: "brand-content",
    label: "Brand & Content Creation",
    icon: "🛍️",
    blurb: "Product photography, small business visuals, and social media content that elevates your brand with a professional look.",
    startingAt: "$400",
  },
  {
    id: "automotive",
    label: "Automotive Shoots",
    icon: "🚗",
    blurb: "Show-quality photography for your car, bike, or build — studio precision meets on-location drama.",
    startingAt: "$350",
  },
  {
    id: "private-garden",
    label: "Private Garden Sessions",
    icon: "🌿",
    blurb: "Intimate sessions in curated private garden settings with natural light and organic backdrops.",
    startingAt: "$300",
  },
  {
    id: "boudoir",
    label: "Boudoir",
    icon: "🖤",
    blurb: "Empowering, tasteful boudoir sessions in a private, judgment-free space — professionally lit and art-directed.",
    startingAt: "$400",
  },
  {
    id: "travel-session",
    label: "Travel / Destination Session",
    icon: "✈️",
    blurb: "I'll come to you — anywhere in the Midwest or beyond. Destination shoots, on-location events, and travel portrait sessions available by request.",
    startingAt: "$500+",
  },
  {
    id: "custom",
    label: "Custom / Not Listed",
    icon: "✨",
    blurb: "Have something else in mind? With 20+ years behind the lens, I can build a plan for almost anything.",
    startingAt: "Custom quote",
  },
];

export type RatePackage = {
  name: string;
  duration: string;
  price: string;
  details: string[];
  highlight?: boolean;
  tag?: string;
};

export const RATE_PACKAGES: RatePackage[] = [
  {
    name: "Mini Session",
    duration: "30–45 minutes",
    price: "$200",
    details: [
      "1 location",
      "15–20 edited images",
      "Online gallery delivery",
      "Perfect for headshots, quick portraits & seasonal minis",
    ],
  },
  {
    name: "Standard Session",
    duration: "1 hour",
    price: "$350",
    details: [
      "1–2 locations or outfit changes",
      "30+ edited images",
      "Online gallery delivery",
      "Great for portraits, couples, family & lifestyle shoots",
    ],
    highlight: true,
    tag: "Most Booked",
  },
  {
    name: "Extended Session",
    duration: "2 hours",
    price: "$550",
    details: [
      "Multiple locations & outfit changes",
      "50+ edited images",
      "Online gallery delivery",
      "Ideal for creative concepts, brand shoots & boudoir",
    ],
  },
  {
    name: "Half-Day Coverage",
    duration: "Up to 4 hours",
    price: "$900",
    details: [
      "Events, parties & milestone celebrations",
      "100+ edited images",
      "Full gallery delivery",
      "Second shooter available as add-on",
    ],
  },
  {
    name: "Full-Day Coverage",
    duration: "6–8+ hours",
    price: "From $1,500",
    details: [
      "Weddings, quinceañeras & all-day events",
      "250+ edited images",
      "Full gallery + highlight reel option",
      "Second shooter & assistant available",
    ],
    tag: "Premium",
  },
  {
    name: "Travel / Destination",
    duration: "Session + travel",
    price: "From $500+",
    details: [
      "Any session type, any location",
      "Travel within the Midwest included at flat rate",
      "Out-of-state & destination quotes available",
      "Lodging & travel coordinated in advance",
    ],
  },
];

export const BOOKING_STATUSES = [
  "new",
  "contacted",
  "deposit-pending",
  "confirmed",
  "completed",
  "cancelled",
] as const;

export type BookingStatus = (typeof BOOKING_STATUSES)[number];

export const CONTACT_EMAIL = "ravenscraftvisuals@gmail.com";
export const INSTAGRAM_HANDLE = "ravenscraft_visuals";
export const INSTAGRAM_URL = "https://www.instagram.com/ravenscraft_visuals";
export const FACEBOOK_LABEL = "Ravenscraft Visuals";
