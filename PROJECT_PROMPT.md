# Ravenscraft Visuals — Project Build Prompt

Use this as a spec to rebuild this site from scratch, or to explain it to someone else.

## What to Build

A photography business website for **Ravenscraft Visuals**, a Southeast Wisconsin
photography studio established in 2005, with 20+ years of experience. Black-and-gold
luxury aesthetic. React + Vite + Tailwind CSS, single-page app with hash-based routing
for an admin panel.

## Look & Feel

- Dark theme: near-black backgrounds (`#08090b`, `#0b0c0f`), gold accent (`#d4af63`),
  warm orange accents for booking CTAs
- Fonts: "Alex Brush" (script, for accents like "Visuals") + "Cormorant Garamond"
  (elegant serif, for all other text)
- A recurring "brand seal" component: a circular logo in a gold-bordered frame with
  decorative gold leaf sprigs in the corners and an "Est. 2005" pill badge, used in
  the header (small/compact version), About section, and footer
- Smooth scroll, fade-up animations on the hero

## Pages / Sections (single page, in order)

1. **Header** (fixed/sticky) — small circular logo mark + "RAVENSCRAFT / Visuals"
   wordmark, nav links (Services, Portfolio, Rates, About, Contact), Instagram icon,
   Admin link, gold "Book Now" button. Collapses to a hamburger menu on smaller
   screens (below `xl` breakpoint) so it never overflows.
2. **Hero** — full-height background photo (moody autumn forest), headline about
   "20+ years behind the lens," two CTA buttons (Book Your Session / View Booking
   Options), the brand seal on the side.
3. **Services** — grid of booking categories (see Content below), each with an
   icon, blurb, starting price, and a "Book This" button that pre-selects that
   category in the booking form.
4. **Portfolio** — masonry/columns grid of uploaded photos. If no photos are
   uploaded yet, shows a placeholder grid describing creative specialties
   (landscapes, macro, storms, travel, wildlife) plus a link to Instagram and to
   the admin uploader.
5. **Rates** — 6 pricing package cards (see Content below) plus a deposit policy
   box and a travel/destination policy box.
6. **About** — bio text, a 4-stat grid (Est. 2005 / 20+ years / SE WI / Nationwide
   travel), and either an admin-uploaded "at work" photo or the brand seal as a
   fallback image.
7. **Booking form** — full request form (name, email, phone, category, package
   interest, preferred date, location, message) that saves directly to the
   database so it shows up in the admin dashboard from any device. If the
   database isn't reachable, it falls back to opening the visitor's email client
   with the details pre-filled, addressed to the studio's contact email.
8. **Footer** — brand mark, contact info (email, Instagram, Facebook), quick
   links, admin link, copyright.

## Content

**Booking categories** (icon, label, blurb, starting price) — include at least:
Portraits & Headshots ($250), Couples & Engagements ($350), Weddings ($1,500),
Quinceañera ($800), Bar & Bat Mitzvah ($800), Major Life Events — Sweet 16s/vow
renewals/graduations ($500), Family Shoots ($300), Concerts & Live Music ($300),
Events & Parties ($350), Lifestyle & Creative Shoots ($300), Brand & Content
Creation ($400), Automotive Shoots ($350), Private Garden Sessions ($300),
Boudoir ($400), Travel/Destination Session ($500+), Custom/Not Listed.

**Rate packages**: Mini Session ($200, 30–45 min), Standard Session ($350, 1 hr,
marked "Most Booked"), Extended Session ($550, 2 hr), Half-Day Coverage ($900,
up to 4 hr), Full-Day Coverage (From $1,500, 6–8+ hr, marked "Premium"), Travel /
Destination (From $500+, flat-rate Midwest travel included).

**Contact**: email `ravenscraftvisuals@gmail.com`, Instagram `@ravenscraft_visuals`,
Facebook "Ravenscraft Visuals".

## Admin Panel (`#/admin` route)

A password-protected back office for the studio owner, reached via a hash route
(no page reload / no server routing needed):

- **First-run setup screen**: since this is a static site with no custom backend,
  it needs a real database to store photos/bookings permanently for all visitors.
  Show a step-by-step guide to create a free Supabase project, paste in a SQL
  script (creates a storage bucket + two tables + security rules), create an
  admin login, and paste the Project URL + public API key into a form. Include a
  "Test Connection" button that verifies the credentials work before saving.
- **Login**: plain email/password against Supabase Auth.
- **Media manager**: upload a logo (auto-crops white borders but preserves
  white *inside* the design), an About-section photo, and unlimited portfolio
  images (multi-select). Images are resized/compressed client-side to WebP
  before upload (~1800–2400px max dimension) so large phone photos upload fast.
  Shows current saved images with Remove buttons, and a running list of
  "pending" files with a single "Save Changes" button.
- **Bookings dashboard**: table of all submitted booking requests (name, email,
  phone, category, date, location, message) with a status dropdown per row
  (new / contacted / deposit-pending / confirmed / completed / cancelled) that
  updates the database live.

## Backend / Data Architecture

Use **Supabase** (Postgres + file storage + auth), called directly from the
browser with the public "anon"/"publishable" key — no custom server needed.
This is a deliberate choice: this app is a static site (no server-side code
runs), so anything the admin uploads must live in a real shared database, not
in browser storage, or other visitors will never see it.

Schema:
- Storage bucket `ravenscraft-media` (public read).
- Table `site_assets`: `id` (uuid), `kind` (`logo` | `about` | `portfolio`),
  `path` (storage path), `name`, `alt`, `sort_order`, `created_at`.
- Table `bookings`: `id` (identity int), `name`, `email`, `phone`, `category`,
  `package_interest`, `preferred_date`, `location`, `message`, `status`
  (default `'new'`), `created_at`.
- Row Level Security: anyone (anon) can `select` site_assets and `insert`
  bookings; only authenticated users can write/delete site_assets or
  read/update bookings.

The Supabase Project URL and public key are safe to hard-code directly in the
client code (they're meant to be public; protection comes from the RLS
policies above, not secrecy).

## Key Implementation Notes

- No page-reload routing: use a simple `window.location.hash` listener to
  switch between the main site and `/admin`, since this is a static SPA.
- Keep the header visually compact — a full decorative "brand seal" (with
  extra badge text) is too tall for a nav bar; use a minimal circular logo
  mark there instead, reserving the full ornate seal for Hero/About/Footer.
- Prepare all uploaded images client-side (resize + compress to WebP, and for
  logos, auto-trim white borders while keeping interior white intact) before
  uploading, to keep storage usage and load times low.
- Write a plain-language, step-by-step setup guide (a markdown file in the
  project) for the non-technical site owner covering: creating the free
  database account, running the SQL setup script, creating their own admin
  login, and connecting the site — including what to do if the free database
  "pauses" itself after a week of no traffic (just log in and resume it).
