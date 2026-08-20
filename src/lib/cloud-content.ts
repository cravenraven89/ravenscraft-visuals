// All reads/writes to the real Supabase backend: media (logo/about/portfolio
// images) live in the "site_assets" table + "ravenscraft-media" storage
// bucket, and bookings live in the "bookings" table. Data here is shared
// with every visitor, on every device, permanently — no credit card
// required, ever.

import { getSupabase } from "./supabase";
import type { BookingStatus } from "./booking-data";

export type MediaKind = "logo" | "about" | "portfolio";

export type MediaAsset = {
  id: string;
  kind: MediaKind;
  url: string;
  storagePath: string;
  fileName: string;
  createdAt: string;
};

export type Booking = {
  id: number;
  name: string;
  email: string;
  phone: string | null;
  category: string;
  packageInterest: string | null;
  preferredDate: string | null;
  location: string | null;
  message: string | null;
  status: BookingStatus | string;
  createdAt: string;
};

export type PublicContent = {
  logo: string | null;
  aboutPhoto: string | null;
  portfolio: MediaAsset[];
};

const BUCKET = "ravenscraft-media";
const TABLE = "site_assets";

function readableNameFromPath(path: string) {
  const fileName = path.split("/").pop() ?? path;
  return fileName.replace(/\.[^.]+$/, "").replace(/^\d+-/, "");
}

function mapMediaRow(
  row: {
    id: string;
    kind: string;
    path: string;
    name: string | null;
    alt: string | null;
    sort_order: number;
    created_at: string;
  },
  publicUrl: string,
): MediaAsset {
  return {
    id: row.id,
    kind: row.kind as MediaKind,
    url: publicUrl,
    storagePath: row.path,
    fileName: row.name || readableNameFromPath(row.path),
    createdAt: row.created_at,
  };
}

function mapBookingRow(row: {
  id: number;
  name: string;
  email: string;
  phone: string | null;
  category: string;
  package_interest: string | null;
  preferred_date: string | null;
  location: string | null;
  message: string | null;
  status: string;
  created_at: string;
}): Booking {
  return {
    id: row.id,
    name: row.name,
    email: row.email,
    phone: row.phone,
    category: row.category,
    packageInterest: row.package_interest,
    preferredDate: row.preferred_date,
    location: row.location,
    message: row.message,
    status: row.status,
    createdAt: row.created_at,
  };
}

function sanitizeFileName(name: string) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9.]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 80);
}

type SiteAssetRow = {
  id: string;
  kind: string;
  path: string;
  name: string | null;
  alt: string | null;
  sort_order: number;
  created_at: string;
};

function toMediaAssets(supabase: ReturnType<typeof getSupabase>, rows: SiteAssetRow[]): MediaAsset[] {
  return rows.map((row) => {
    const { data } = supabase.storage.from(BUCKET).getPublicUrl(row.path);
    return mapMediaRow(row, data.publicUrl);
  });
}

// ----- Public reads (no login required — used by the live website) -----

export async function getPublicContent(): Promise<PublicContent> {
  try {
    const supabase = getSupabase();
    const { data, error } = await supabase
      .from(TABLE)
      .select("*")
      .order("created_at", { ascending: true });

    if (error) throw error;

    const rows = toMediaAssets(supabase, (data ?? []) as SiteAssetRow[]);
    const logo = [...rows].reverse().find((r) => r.kind === "logo")?.url ?? null;
    const aboutPhoto = [...rows].reverse().find((r) => r.kind === "about")?.url ?? null;
    const portfolio = rows.filter((r) => r.kind === "portfolio");

    return { logo, aboutPhoto, portfolio };
  } catch (error) {
    console.error("Failed to load site content from Supabase", error);
    return { logo: null, aboutPhoto: null, portfolio: [] };
  }
}

// ----- Admin: media management (requires an authenticated session) -----

export async function listAllMedia(): Promise<MediaAsset[]> {
  const supabase = getSupabase();
  const { data, error } = await supabase
    .from(TABLE)
    .select("*")
    .order("created_at", { ascending: true });

  if (error) throw error;
  return toMediaAssets(supabase, (data ?? []) as SiteAssetRow[]);
}

export async function uploadMedia(kind: MediaKind, file: File): Promise<MediaAsset> {
  const supabase = getSupabase();
  const path = `${kind}/${Date.now()}-${sanitizeFileName(file.name || "photo.webp")}`;

  const { error: uploadError } = await supabase.storage.from(BUCKET).upload(path, file, {
    contentType: file.type || "image/webp",
    upsert: false,
  });
  if (uploadError) throw new Error(uploadError.message);

  // Logo and About photo are single-image slots — remove any previous one
  // so we don't accumulate orphaned rows/files.
  if (kind === "logo" || kind === "about") {
    const { data: existingRows } = await supabase.from(TABLE).select("*").eq("kind", kind);

    for (const row of (existingRows ?? []) as SiteAssetRow[]) {
      await supabase.storage.from(BUCKET).remove([row.path]);
      await supabase.from(TABLE).delete().eq("id", row.id);
    }
  }

  const cleanName = file.name || path;
  const { data: inserted, error: insertError } = await supabase
    .from(TABLE)
    .insert({
      kind,
      path,
      name: cleanName,
      alt: `Ravenscraft Visuals ${kind}: ${readableNameFromPath(cleanName)}`,
      sort_order: 0,
    })
    .select()
    .single();

  if (insertError) throw new Error(insertError.message);

  const { data: publicUrlData } = supabase.storage.from(BUCKET).getPublicUrl(path);
  return mapMediaRow(inserted as SiteAssetRow, publicUrlData.publicUrl);
}

export async function deleteMedia(asset: MediaAsset): Promise<void> {
  const supabase = getSupabase();
  const { error: storageError } = await supabase.storage.from(BUCKET).remove([asset.storagePath]);
  if (storageError) console.error("Failed to remove storage file", storageError);

  const { error } = await supabase.from(TABLE).delete().eq("id", asset.id);
  if (error) throw new Error(error.message);
}

// ----- Bookings -----

export async function submitBooking(data: {
  name: string;
  email: string;
  phone: string | null;
  category: string;
  packageInterest: string | null;
  preferredDate: string | null;
  location: string | null;
  message: string | null;
}): Promise<Booking> {
  const supabase = getSupabase();
  const { data: inserted, error } = await supabase
    .from("bookings")
    .insert({
      name: data.name,
      email: data.email,
      phone: data.phone,
      category: data.category,
      package_interest: data.packageInterest,
      preferred_date: data.preferredDate,
      location: data.location,
      message: data.message,
      status: "new",
    })
    .select()
    .single();

  if (error) throw new Error(error.message);
  return mapBookingRow(inserted);
}

export async function listBookings(): Promise<Booking[]> {
  const supabase = getSupabase();
  const { data, error } = await supabase
    .from("bookings")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw new Error(error.message);
  return (data ?? []).map(mapBookingRow);
}

export async function updateBookingStatus(id: number, status: string): Promise<void> {
  const supabase = getSupabase();
  const { error } = await supabase.from("bookings").update({ status }).eq("id", id);
  if (error) throw new Error(error.message);
}
