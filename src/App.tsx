import { useEffect, useState } from "react";
import { SiteHeader } from "./components/SiteHeader";
import { Hero } from "./components/Hero";
import { Services } from "./components/Services";
import { Portfolio } from "./components/Portfolio";
import { Rates } from "./components/Rates";
import { About } from "./components/About";
import { BookingSection } from "./components/BookingSection";
import { SiteFooter } from "./components/SiteFooter";
import { AdminPage } from "./components/AdminPage";
import { getPublicContent, type MediaAsset } from "./lib/cloud-content";
import { isSupabaseConfigured } from "./lib/supabase";

function useHashRoute() {
  const [hash, setHash] = useState(() => window.location.hash);

  useEffect(() => {
    const onChange = () => setHash(window.location.hash);
    window.addEventListener("hashchange", onChange);
    return () => window.removeEventListener("hashchange", onChange);
  }, []);

  return hash;
}

function HomePage() {
  const [logoSrc, setLogoSrc] = useState<string | null>(null);
  const [aboutPhotoSrc, setAboutPhotoSrc] = useState<string | null>(null);
  const [portfolioImages, setPortfolioImages] = useState<MediaAsset[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("");

  useEffect(() => {
    if (!isSupabaseConfigured()) return;

    let active = true;
    void getPublicContent().then((content) => {
      if (!active) return;
      setLogoSrc(content.logo);
      setAboutPhotoSrc(content.aboutPhoto);
      setPortfolioImages(content.portfolio);
    });

    return () => {
      active = false;
    };
  }, []);

  return (
    <div className="bg-[#08090b] text-slate-100 antialiased">
      <SiteHeader logoSrc={logoSrc} />
      <main className="overflow-x-hidden">
        <Hero logoSrc={logoSrc} />
        <Services onSelectCategory={setSelectedCategory} />
        <Portfolio images={portfolioImages} />
        <Rates />
        <About logoSrc={logoSrc} aboutPhotoSrc={aboutPhotoSrc} />
        <BookingSection
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
        />
      </main>
      <SiteFooter logoSrc={logoSrc} />
    </div>
  );
}

export default function App() {
  const hash = useHashRoute();
  const isAdmin = hash.startsWith("#/admin");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [isAdmin]);

  // Keep the private admin panel out of search results and social previews.
  // (Search engines rarely index hash-only routes anyway since the URL never
  // changes server-side, but this adds a clear, explicit signal too.)
  useEffect(() => {
    const robotsMeta = document.querySelector('meta[name="robots"]');
    const originalContent = robotsMeta?.getAttribute("content") ?? "index, follow";

    if (isAdmin) {
      robotsMeta?.setAttribute("content", "noindex, nofollow");
      document.title = "Studio Admin | Ravenscraft Visuals";
    } else {
      robotsMeta?.setAttribute("content", originalContent);
      document.title = "Ravenscraft Visuals | SE Wisconsin Photographer | Weddings, Portraits & Events";
    }
  }, [isAdmin]);

  return isAdmin ? <AdminPage /> : <HomePage />;
}
