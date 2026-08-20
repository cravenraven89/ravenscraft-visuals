// Prepares an image in the browser before it's uploaded to Supabase Storage.
// Large camera/phone photos are resized and compressed to WebP so uploads are
// fast and reliable. Logos are auto-cropped: any white/near-white border
// around the image is trimmed so the logo fills its frame cleanly, while any
// white that's part of the design itself (e.g. text, background) is kept.

const SAFE_UPLOAD_BYTES = 2.5 * 1024 * 1024;

export function formatFileSize(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function canvasToBlob(canvas: HTMLCanvasElement, quality: number) {
  return new Promise<Blob | null>((resolve) => {
    canvas.toBlob(resolve, "image/webp", quality);
  });
}

// ---- White-space auto-crop for logos ----

type CropBox = { x: number; y: number; w: number; h: number };

function findContentBounds(imageData: ImageData, threshold = 240): CropBox | null {
  const { data, width, height } = imageData;

  let minX = width;
  let minY = height;
  let maxX = -1;
  let maxY = -1;

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const i = (y * width + x) * 4;
      const r = data[i];
      const g = data[i + 1];
      const b = data[i + 2];
      const a = data[i + 3];

      if (a < 10) continue;
      if (r > threshold && g > threshold && b > threshold) continue;

      if (x < minX) minX = x;
      if (x > maxX) maxX = x;
      if (y < minY) minY = y;
      if (y > maxY) maxY = y;
    }
  }

  if (maxX < 0 || maxY < 0) return null;

  return { x: minX, y: minY, w: maxX - minX + 1, h: maxY - minY + 1 };
}

async function autoCropWhite(bitmap: ImageBitmap): Promise<ImageBitmap> {
  const { width, height } = bitmap;

  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;

  const ctx = canvas.getContext("2d", { willReadFrequently: true });
  if (!ctx) return bitmap;

  ctx.drawImage(bitmap, 0, 0);
  const imageData = ctx.getImageData(0, 0, width, height);
  const bounds = findContentBounds(imageData);

  if (!bounds) return bitmap;

  const trimmedLeft = bounds.x;
  const trimmedTop = bounds.y;
  const trimmedRight = width - (bounds.x + bounds.w);
  const trimmedBottom = height - (bounds.y + bounds.h);
  const minTrim = Math.max(width, height) * 0.02;

  if (
    trimmedLeft < minTrim &&
    trimmedTop < minTrim &&
    trimmedRight < minTrim &&
    trimmedBottom < minTrim
  ) {
    return bitmap;
  }

  const pad = Math.round(Math.max(bounds.w, bounds.h) * 0.02);
  const cx = Math.max(0, bounds.x - pad);
  const cy = Math.max(0, bounds.y - pad);
  const cw = Math.min(width - cx, bounds.w + pad * 2);
  const ch = Math.min(height - cy, bounds.h + pad * 2);

  const cropCanvas = document.createElement("canvas");
  cropCanvas.width = cw;
  cropCanvas.height = ch;

  const cropCtx = cropCanvas.getContext("2d");
  if (!cropCtx) return bitmap;

  // Fill with white first so the logo keeps its white background —
  // we only remove the white *border*, not white that's part of the design.
  cropCtx.fillStyle = "#ffffff";
  cropCtx.fillRect(0, 0, cw, ch);
  cropCtx.drawImage(canvas, cx, cy, cw, ch, 0, 0, cw, ch);
  bitmap.close();

  return createImageBitmap(cropCanvas);
}

// ---- Main export ----

/**
 * Resizes/compresses an uploaded image and returns a ready-to-upload File
 * (WebP format). This File can be handed directly to Supabase Storage.
 */
export async function prepareImageForUpload(
  file: File,
  kind: "logo" | "portfolio" | "about",
): Promise<File> {
  if (!file.type.startsWith("image/")) {
    throw new Error(`${file.name} is not an image file.`);
  }

  let bitmap: ImageBitmap;
  try {
    bitmap = await createImageBitmap(file);
  } catch {
    throw new Error(
      `${file.name} could not be opened. Please export it as a JPG or PNG and try again.`,
    );
  }

  if (kind === "logo") {
    bitmap = await autoCropWhite(bitmap);
  }

  const maxDimension = kind === "logo" ? 1800 : kind === "about" ? 2000 : 2400;
  const scale = Math.min(1, maxDimension / Math.max(bitmap.width, bitmap.height));
  let width = Math.max(1, Math.round(bitmap.width * scale));
  let height = Math.max(1, Math.round(bitmap.height * scale));
  let finalBlob: Blob | null = null;

  for (let resizeAttempt = 0; resizeAttempt < 3; resizeAttempt += 1) {
    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;

    const context = canvas.getContext("2d", { alpha: true });
    if (!context) {
      bitmap.close();
      throw new Error(`Your browser could not prepare ${file.name} for upload.`);
    }

    context.imageSmoothingEnabled = true;
    context.imageSmoothingQuality = "high";
    context.drawImage(bitmap, 0, 0, width, height);

    for (const quality of [0.92, 0.84, 0.74, 0.64]) {
      const blob = await canvasToBlob(canvas, quality);
      if (!blob) continue;
      finalBlob = blob;
      if (blob.size <= SAFE_UPLOAD_BYTES) break;
    }

    if (finalBlob && finalBlob.size <= SAFE_UPLOAD_BYTES) break;

    width = Math.max(1, Math.round(width * 0.8));
    height = Math.max(1, Math.round(height * 0.8));
  }

  bitmap.close();

  if (!finalBlob) {
    throw new Error(`${file.name} could not be prepared for upload.`);
  }

  const baseName = (file.name || "photo").replace(/\.[^.]+$/, "");
  return new File([finalBlob], `${baseName}.webp`, {
    type: "image/webp",
    lastModified: Date.now(),
  });
}
