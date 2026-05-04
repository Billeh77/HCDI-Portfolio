"use client";

import { useCallback, useEffect, useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

function usePdfWidth() {
  const [width, setWidth] = useState(720);

  useEffect(() => {
    function update() {
      const max = 880;
      const padding = 56;
      const w = Math.min(max, Math.max(280, window.innerWidth - padding));
      setWidth(w);
    }
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  return width;
}

type PdfCarouselProps = {
  src: string;
  title: string;
  description?: string;
};

export function PdfCarousel({ src, title, description }: PdfCarouselProps) {
  const pageWidth = usePdfWidth();
  const [numPages, setNumPages] = useState<number | null>(null);
  const [pageIndex, setPageIndex] = useState(0);
  const [loadError, setLoadError] = useState<string | null>(null);

  useEffect(() => {
    pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;
  }, []);

  const onLoadSuccess = useCallback(({ numPages: n }: { numPages: number }) => {
    setNumPages(n);
    setPageIndex(0);
    setLoadError(null);
  }, []);

  const onLoadError = useCallback(() => {
    setLoadError("Could not load this PDF. Check that the file exists under public/portfolio/pdfs/ and the name matches portfolio.ts.");
    setNumPages(null);
  }, []);

  const pageNumber = pageIndex + 1;
  const canPrev = pageIndex > 0;
  const canNext = numPages != null && pageIndex < numPages - 1;

  return (
    <section className="flex flex-col gap-4">
      <header className="space-y-1">
        <h2 className="text-xl font-semibold tracking-tight text-zinc-900">{title}</h2>
        {description ? (
          <p className="text-sm leading-relaxed text-zinc-600">{description}</p>
        ) : null}
      </header>

      <div className="overflow-hidden rounded-2xl border border-zinc-200/80 bg-zinc-50 shadow-sm">
        {loadError ? (
          <p className="p-6 text-sm text-red-700">{loadError}</p>
        ) : (
          <div className="flex flex-col items-center gap-4 p-4 sm:p-6">
            <Document
              file={src}
              onLoadSuccess={onLoadSuccess}
              onLoadError={onLoadError}
              loading={
                <p className="py-16 text-sm text-zinc-500">Loading PDF…</p>
              }
              className="flex flex-col items-center"
            >
              {numPages != null && numPages > 0 ? (
                <Page
                  pageNumber={pageNumber}
                  width={pageWidth}
                  className="rounded-lg shadow-md [&_.react-pdf\_\_Page\_\_canvas]:mx-auto [&_.react-pdf\_\_Page\_\_canvas]:max-w-full"
                  renderTextLayer
                  renderAnnotationLayer
                />
              ) : null}
            </Document>

            {numPages != null && numPages > 1 ? (
              <div className="flex w-full max-w-md flex-wrap items-center justify-between gap-3 border-t border-zinc-200/90 pt-4">
                <button
                  type="button"
                  onClick={() => setPageIndex((i) => Math.max(0, i - 1))}
                  disabled={!canPrev}
                  className="rounded-full border border-zinc-300 bg-white px-4 py-2 text-sm font-medium text-zinc-800 shadow-sm transition hover:bg-zinc-50 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  Previous page
                </button>
                <span className="text-sm tabular-nums text-zinc-600">
                  Page {pageNumber} of {numPages}
                </span>
                <button
                  type="button"
                  onClick={() =>
                    setPageIndex((i) =>
                      numPages != null ? Math.min(numPages - 1, i + 1) : i,
                    )
                  }
                  disabled={!canNext}
                  className="rounded-full border border-zinc-300 bg-white px-4 py-2 text-sm font-medium text-zinc-800 shadow-sm transition hover:bg-zinc-50 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  Next page
                </button>
              </div>
            ) : numPages === 1 ? (
              <p className="text-xs text-zinc-500">Single-page document</p>
            ) : null}
          </div>
        )}
      </div>
    </section>
  );
}
