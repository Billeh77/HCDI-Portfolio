/**
 * What shows on the site: this list only. Order = top to bottom on the page.
 *
 * Files on disk:
 *   PDFs:   web/public/portfolio/pdfs/
 *   Video:  web/public/portfolio/video/ (keep each file under ~95MB for GitHub, or use env URL below)
 *
 * For a large video: set NEXT_PUBLIC_PORTFOLIO_VIDEO_URL in Vercel (Project → Settings → Environment Variables)
 * to a direct HTTPS URL to your .mp4 (e.g. Cloudinary, Mux, S3, or a compressed file on a CDN).
 *
 * Use the exact file name (including spaces). Special characters in names are fine;
 * URLs are encoded automatically.
 */

export type PortfolioPdf = {
  kind: "pdf";
  id: string;
  title: string;
  /** File name inside public/portfolio/pdfs/ */
  file: string;
  description?: string;
};

export type PortfolioVideo = {
  kind: "video";
  id: string;
  title: string;
  /** File name inside public/portfolio/video/ (small files only; ignored by git if over GitHub limits) */
  file?: string;
  /** Direct video URL (optional; overrides env and `file` when set) */
  url?: string;
  description?: string;
};

export type PortfolioItem = PortfolioPdf | PortfolioVideo;

/** Build a safe URL for a file under /public/portfolio/… */
export function portfolioAssetUrl(
  folder: "pdfs" | "video",
  file: string,
): string {
  return `/portfolio/${folder}/${encodeURIComponent(file)}`;
}

/** Video source: explicit `url`, then env (for Vercel), then local `file` in /public. */
export function portfolioVideoSrc(item: PortfolioVideo): string {
  const trimmedUrl = item.url?.trim();
  if (trimmedUrl) return trimmedUrl;
  const fromEnv = process.env.NEXT_PUBLIC_PORTFOLIO_VIDEO_URL?.trim();
  if (fromEnv) return fromEnv;
  if (item.file) return portfolioAssetUrl("video", item.file);
  return "";
}

export const portfolioItems: PortfolioItem[] = [
  {
    kind: "pdf",
    id: "design-decode",
    title: "Design Decode",
    file: "Design Decode.pdf",
  },
  {
    kind: "pdf",
    id: "trench-colder-days",
    title: "Gianna's Trench Coat for Colder Days",
    // File on disk uses a typographic apostrophe (U+2019), not ASCII '
    file: "Gianna\u2019s Trench Coat for Colder Days.pdf",
  },
  {
    kind: "pdf",
    id: "coat-redesign",
    title: "Coat Redesign for Gianna",
    file: "Coat Redesign for Gianna (1).pdf",
  },
  {
    kind: "pdf",
    id: "design-document",
    title: "Viberations Design Document",
    file: "Design Document .pdf",
  },
  {
    kind: "video",
    id: "process-video",
    title: "Viberations Video",
    file: "new video.mp4",
  },
];
