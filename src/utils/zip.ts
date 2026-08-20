import JSZip from "jszip";

export interface ExtractedFile {
  path: string;
  content: string;
  size: number;
  isBinary: boolean;
  skipped: boolean;
  skipReason?: string;
}

const BINARY_EXTENSIONS = new Set([
  "png", "jpg", "jpeg", "gif", "webp", "avif", "ico", "bmp", "tiff",
  "woff", "woff2", "ttf", "otf", "eot",
  "mp3", "mp4", "wav", "ogg", "webm", "mov", "avi",
  "zip", "gz", "tar", "rar", "7z", "pdf", "exe", "dll", "bin", "wasm",
  "psd", "ai", "sketch", "fig", "db", "sqlite",
]);

const SKIP_DIRS = [
  "node_modules/",
  ".git/",
  "dist/",
  "build/",
  ".next/",
  ".cache/",
  "coverage/",
  "__MACOSX/",
];

const SKIP_FILES = new Set([
  "package-lock.json",
  "yarn.lock",
  "pnpm-lock.yaml",
  ".DS_Store",
  "Thumbs.db",
]);

const MAX_FILE_SIZE = 500_000; // 500 KB per file

function getExtension(path: string): string {
  const name = path.split("/").pop() || "";
  const dot = name.lastIndexOf(".");
  return dot >= 0 ? name.slice(dot + 1).toLowerCase() : "";
}

function fileName(path: string): string {
  return path.split("/").pop() || path;
}

function shouldSkipPath(path: string): string | null {
  for (const dir of SKIP_DIRS) {
    if (path.includes(dir)) return `inside ${dir.replace("/", "")} (not needed)`;
  }
  if (SKIP_FILES.has(fileName(path))) return "auto-generated file (not needed)";
  return null;
}

function looksBinary(text: string): boolean {
  // If it contains null characters or lots of replacement chars, treat as binary
  if (text.includes("\u0000")) return true;
  let weird = 0;
  const sample = text.slice(0, 2000);
  for (const ch of sample) {
    if (ch === "\uFFFD") weird++;
  }
  return weird > 10;
}

export interface ExtractResult {
  files: ExtractedFile[];
  totalEntries: number;
}

export async function extractZip(file: File): Promise<ExtractResult> {
  const zip = await JSZip.loadAsync(file);
  const files: ExtractedFile[] = [];
  let totalEntries = 0;

  const entries = Object.values(zip.files).filter((e) => !e.dir);
  totalEntries = entries.length;

  for (const entry of entries) {
    const path = entry.name;
    const skipReason = shouldSkipPath(path);

    if (skipReason) {
      files.push({ path, content: "", size: 0, isBinary: false, skipped: true, skipReason });
      continue;
    }

    const ext = getExtension(path);
    if (BINARY_EXTENSIONS.has(ext)) {
      files.push({
        path,
        content: "",
        size: 0,
        isBinary: true,
        skipped: true,
        skipReason: "image/media file (can't be copied as text)",
      });
      continue;
    }

    try {
      const content = await entry.async("string");
      if (looksBinary(content)) {
        files.push({
          path,
          content: "",
          size: content.length,
          isBinary: true,
          skipped: true,
          skipReason: "binary file (can't be copied as text)",
        });
        continue;
      }
      if (content.length > MAX_FILE_SIZE) {
        files.push({
          path,
          content: content.slice(0, MAX_FILE_SIZE),
          size: content.length,
          isBinary: false,
          skipped: true,
          skipReason: "file is very large (over 500 KB)",
        });
        continue;
      }
      files.push({ path, content, size: content.length, isBinary: false, skipped: false });
    } catch {
      files.push({
        path,
        content: "",
        size: 0,
        isBinary: true,
        skipped: true,
        skipReason: "could not read this file",
      });
    }
  }

  // Sort: readable files first, then by path
  files.sort((a, b) => {
    if (a.skipped !== b.skipped) return a.skipped ? 1 : -1;
    return a.path.localeCompare(b.path);
  });

  return { files, totalEntries };
}

export function formatSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export function buildCopyAllText(files: ExtractedFile[]): string {
  const good = files.filter((f) => !f.skipped);
  const parts: string[] = [
    "Here are the files from my website project. Please restore them:",
    "",
  ];
  for (const f of good) {
    parts.push(`===== FILE: ${f.path} =====`);
    parts.push(f.content.trimEnd());
    parts.push("");
  }
  return parts.join("\n");
}
