"use client";

import dynamic from "next/dynamic";
import type { PortfolioItem } from "@/data/portfolio";
import { portfolioAssetUrl, portfolioVideoSrc } from "@/data/portfolio";
import { VideoBlock } from "@/components/VideoBlock";

const PdfCarousel = dynamic(
  () => import("@/components/PdfCarousel").then((m) => m.PdfCarousel),
  { ssr: false, loading: () => <p className="text-sm text-zinc-500">Loading viewer…</p> },
);

type PortfolioFeedProps = {
  items: PortfolioItem[];
};

export function PortfolioFeed({ items }: PortfolioFeedProps) {
  return (
    <div className="mx-auto flex w-full max-w-4xl flex-col gap-20 px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
      {items.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-zinc-300 bg-zinc-50/80 p-10 text-center">
          <p className="text-lg font-medium text-zinc-800">No pieces yet</p>
          <p className="mt-2 text-sm text-zinc-600">
            Edit{" "}
            <code className="rounded bg-zinc-200/80 px-1.5 py-0.5 text-xs">src/data/portfolio.ts</code>{" "}
            and add PDF or video entries. Put files in{" "}
            <code className="rounded bg-zinc-200/80 px-1.5 py-0.5 text-xs">public/portfolio/pdfs/</code> or{" "}
            <code className="rounded bg-zinc-200/80 px-1.5 py-0.5 text-xs">public/portfolio/video/</code>.
          </p>
        </div>
      ) : (
        items.map((item) => {
          if (item.kind === "pdf") {
            return (
              <PdfCarousel
                key={item.id}
                src={portfolioAssetUrl("pdfs", item.file)}
                title={item.title}
                description={item.description}
              />
            );
          }
          const videoSrc = portfolioVideoSrc(item);
          return (
            <VideoBlock
              key={item.id}
              src={videoSrc}
              title={item.title}
              description={item.description}
            />
          );
        })
      )}
    </div>
  );
}
