import { FormEvent, useState } from "react";
import { BOOKING_CATEGORIES, CONTACT_EMAIL } from "../lib/booking-data";
import { submitBooking } from "../lib/cloud-content";
import { isSupabaseConfigured } from "../lib/supabase";

type Status = "idle" | "submitting" | "success" | "error";

type BookingSectionProps = {
  selectedCategory: string;
  onCategoryChange: (categoryId: string) => void;
};

function buildBookingEmail(data: {
  name: string;
  email: string;
  phone: string | null;
  category: string;
  packageInterest: string | null;
  preferredDate: string | null;
  location: string | null;
  message: string | null;
}) {
  const categoryLabel =
    BOOKING_CATEGORIES.find((c) => c.id === data.category)?.label ?? data.category;

  const subject = `New Booking Request — ${data.name} (${categoryLabel})`;

  const bodyLines = [
    `New booking request from the Ravenscraft Visuals website:`,
    ``,
    `Name: ${data.name}`,
    `Email: ${data.email}`,
    `Phone: ${data.phone || "Not provided"}`,
    `Category: ${categoryLabel}`,
    `Package Interest: ${data.packageInterest || "Not sure yet"}`,
    `Preferred Date: ${data.preferredDate || "Not specified"}`,
    `Location: ${data.location || "Not specified"}`,
    ``,
    `Message:`,
    data.message || "(No message provided)",
  ];

  return { subject, body: bodyLines.join("\n") };
}

function BookingForm({ selectedCategory, onCategoryChange }: BookingSectionProps) {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [usedEmailFallback, setUsedEmailFallback] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");
    setErrorMessage("");
    setUsedEmailFallback(false);

    const form = event.currentTarget;
    const formData = new FormData(form);

    const name = String(formData.get("name") ?? "").trim();
    const email = String(formData.get("email") ?? "").trim();
    const category = String(formData.get("category") ?? "").trim();

    if (!name) {
      setStatus("error");
      setErrorMessage("Please enter your name.");
      return;
    }
    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
      setStatus("error");
      setErrorMessage("Please enter a valid email.");
      return;
    }
    if (!category || !BOOKING_CATEGORIES.some((c) => c.id === category)) {
      setStatus("error");
      setErrorMessage("Please select a valid booking category.");
      return;
    }

    const bookingData = {
      name,
      email,
      phone: String(formData.get("phone") ?? "").trim() || null,
      category,
      packageInterest: String(formData.get("packageInterest") ?? "").trim() || null,
      preferredDate: String(formData.get("preferredDate") ?? "").trim() || null,
      location: String(formData.get("location") ?? "").trim() || null,
      message: String(formData.get("message") ?? "").trim() || null,
    };

    // Primary path: save the request straight into the studio's real database,
    // so it shows up in Admin > Bookings from any device, immediately.
    if (isSupabaseConfigured()) {
      try {
        await submitBooking(bookingData);
        setStatus("success");
        form.reset();
        onCategoryChange("");
        return;
      } catch (err) {
        console.error("Booking could not be saved to the database", err);
        // Fall through to the email fallback below.
      }
    }

    // Fallback: open the customer's email app with everything pre-filled, in
    // case the database isn't connected yet or the request failed to save.
    const { subject, body } = buildBookingEmail(bookingData);
    const mailtoUrl = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailtoUrl;

    setUsedEmailFallback(true);
    setStatus("success");
    form.reset();
    onCategoryChange("");
  }

  if (status === "success") {
    return (
      <div className="rounded-3xl border border-orange-400/40 bg-orange-500/10 p-10 text-center">
        <p className="text-4xl">📸</p>
        <h3 className="font-display mt-4 text-2xl font-bold text-white">
          {usedEmailFallback ? "Almost Done — One Last Step!" : "Request Received!"}
        </h3>
        {usedEmailFallback ? (
          <p className="mt-3 text-slate-200">
            Your email app should have just opened with your request pre-filled. Please press{" "}
            <span className="font-semibold text-white">Send</span> in that app to deliver it.
          </p>
        ) : (
          <p className="mt-3 text-slate-200">
            Thank you for reaching out to Ravenscraft Visuals. Your request has been saved and
            I&rsquo;ll follow up by email within 24–48 hours to confirm details and send over a
            deposit invoice to lock in your date.
          </p>
        )}
        <p className="mt-4 text-sm text-slate-400">
          Questions in the meantime? Email{" "}
          <a href={`mailto:${CONTACT_EMAIL}`} className="text-orange-300 underline">
            {CONTACT_EMAIL}
          </a>
        </p>
        <button
          type="button"
          onClick={() => {
            setStatus("idle");
            setUsedEmailFallback(false);
          }}
          className="mt-6 rounded-full border border-white/20 px-5 py-2.5 text-sm font-semibold text-white transition hover:border-orange-400 hover:text-orange-300"
        >
          Submit Another Request
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={(e) => void handleSubmit(e)} className="grid grid-cols-1 gap-5 sm:grid-cols-2">
      <div className="sm:col-span-1">
        <label htmlFor="name" className="mb-1.5 block text-sm font-medium text-slate-200">
          Full Name *
        </label>
        <input
          id="name"
          name="name"
          required
          className="w-full rounded-xl border border-white/15 bg-white/[0.04] px-4 py-3 text-white placeholder:text-slate-500 focus:border-orange-400 focus:outline-none"
          placeholder="Jane Doe"
        />
      </div>

      <div className="sm:col-span-1">
        <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-slate-200">
          Email *
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          className="w-full rounded-xl border border-white/15 bg-white/[0.04] px-4 py-3 text-white placeholder:text-slate-500 focus:border-orange-400 focus:outline-none"
          placeholder="jane@email.com"
        />
      </div>

      <div className="sm:col-span-1">
        <label htmlFor="phone" className="mb-1.5 block text-sm font-medium text-slate-200">
          Phone
        </label>
        <input
          id="phone"
          name="phone"
          type="tel"
          className="w-full rounded-xl border border-white/15 bg-white/[0.04] px-4 py-3 text-white placeholder:text-slate-500 focus:border-orange-400 focus:outline-none"
          placeholder="(414) 555-0123"
        />
      </div>

      <div className="sm:col-span-1">
        <label htmlFor="category" className="mb-1.5 block text-sm font-medium text-slate-200">
          Booking Category *
        </label>
        <select
          id="category"
          name="category"
          required
          value={selectedCategory}
          onChange={(e) => onCategoryChange(e.target.value)}
          className="w-full rounded-xl border border-white/15 bg-white/[0.04] px-4 py-3 text-white focus:border-orange-400 focus:outline-none"
        >
          <option value="" disabled className="bg-[#0b0c0f]">
            Select a category
          </option>
          {BOOKING_CATEGORIES.map((cat) => (
            <option key={cat.id} value={cat.id} className="bg-[#0b0c0f]">
              {cat.icon} {cat.label}
            </option>
          ))}
        </select>
      </div>

      <div className="sm:col-span-1">
        <label htmlFor="packageInterest" className="mb-1.5 block text-sm font-medium text-slate-200">
          Package Interest
        </label>
        <select
          id="packageInterest"
          name="packageInterest"
          defaultValue=""
          className="w-full rounded-xl border border-white/15 bg-white/[0.04] px-4 py-3 text-white focus:border-orange-400 focus:outline-none"
        >
          <option value="" className="bg-[#0b0c0f]">
            Not sure yet
          </option>
          <option value="Mini Session (30-45 min) - $200" className="bg-[#0b0c0f]">
            Mini Session (30–45 min) — $200
          </option>
          <option value="Standard Session (1 hr) - $350" className="bg-[#0b0c0f]">
            Standard Session (1 hr) — $350
          </option>
          <option value="Extended Session (2 hr) - $550" className="bg-[#0b0c0f]">
            Extended Session (2 hr) — $550
          </option>
          <option value="Half-Day Coverage (up to 4 hr) - $900" className="bg-[#0b0c0f]">
            Half-Day Coverage (up to 4 hr) — $900
          </option>
          <option value="Full-Day Coverage (6-8+ hr) - From $1,500" className="bg-[#0b0c0f]">
            Full-Day Coverage (6–8+ hr) — From $1,500
          </option>
          <option value="Travel / Destination - From $500+" className="bg-[#0b0c0f]">
            Travel / Destination — From $500+
          </option>
        </select>
      </div>

      <div className="sm:col-span-1">
        <label htmlFor="preferredDate" className="mb-1.5 block text-sm font-medium text-slate-200">
          Preferred Date
        </label>
        <input
          id="preferredDate"
          name="preferredDate"
          type="date"
          className="w-full rounded-xl border border-white/15 bg-white/[0.04] px-4 py-3 text-white focus:border-orange-400 focus:outline-none [color-scheme:dark]"
        />
      </div>

      <div className="sm:col-span-2">
        <label htmlFor="location" className="mb-1.5 block text-sm font-medium text-slate-200">
          Location / City
        </label>
        <input
          id="location"
          name="location"
          className="w-full rounded-xl border border-white/15 bg-white/[0.04] px-4 py-3 text-white placeholder:text-slate-500 focus:border-orange-400 focus:outline-none"
          placeholder="e.g. Kenosha, Racine, Milwaukee — willing to travel"
        />
      </div>

      <div className="sm:col-span-2">
        <label htmlFor="message" className="mb-1.5 block text-sm font-medium text-slate-200">
          Tell me about your vision
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          className="w-full rounded-xl border border-white/15 bg-white/[0.04] px-4 py-3 text-white placeholder:text-slate-500 focus:border-orange-400 focus:outline-none"
          placeholder="Share any details — theme, number of people, timing, inspiration, etc."
        />
      </div>

      {status === "error" && (
        <p className="sm:col-span-2 rounded-xl border border-red-500/40 bg-red-500/10 px-4 py-3 text-sm text-red-300">
          {errorMessage}
        </p>
      )}

      <div className="sm:col-span-2">
        <p className="mb-4 text-xs leading-relaxed text-slate-400">
          A non-refundable deposit is required to secure every booking. Submitting this form is a
          request, not a confirmed date — I&rsquo;ll email you to confirm availability and send your
          deposit invoice.
        </p>
        <button
          type="submit"
          disabled={status === "submitting"}
          className="w-full rounded-full bg-gradient-to-r from-orange-500 to-pink-600 px-8 py-4 text-base font-semibold text-white shadow-xl shadow-orange-900/40 transition hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
        >
          {status === "submitting" ? "Sending..." : "Request to Book"}
        </button>
      </div>
    </form>
  );
}

export function BookingSection({ selectedCategory, onCategoryChange }: BookingSectionProps) {
  return (
    <section id="book" className="bg-[#0b0c0f] py-24">
      <div className="mx-auto max-w-4xl px-6 sm:px-8">
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-orange-400">
            Let&rsquo;s Get You Booked
          </p>
          <h2 className="font-display mt-3 text-[clamp(1.9rem,4vw,2.75rem)] font-bold text-white">
            Request Your Session
          </h2>
          <p className="mt-4 text-slate-400">
            Fill out the form below and I&rsquo;ll respond by email at{" "}
            <a href={`mailto:${CONTACT_EMAIL}`} className="text-orange-300 underline">
              {CONTACT_EMAIL}
            </a>{" "}
            to confirm your date and send a deposit invoice.
          </p>
        </div>

        <div className="mt-12 rounded-3xl border border-white/10 bg-white/[0.02] p-6 sm:p-10">
          <BookingForm selectedCategory={selectedCategory} onCategoryChange={onCategoryChange} />
        </div>
      </div>
    </section>
  );
}
