type VideoBlockProps = {
  src: string;
  title: string;
  description?: string;
};

export function VideoBlock({ src, title, description }: VideoBlockProps) {
  return (
    <section className="flex flex-col gap-4">
      <header className="space-y-1">
        <h2 className="text-xl font-semibold tracking-tight text-zinc-900">{title}</h2>
        {description ? (
          <p className="text-sm leading-relaxed text-zinc-600">{description}</p>
        ) : null}
      </header>
      <div className="overflow-hidden rounded-2xl border border-zinc-200/80 bg-zinc-950 shadow-sm">
        {src ? (
          <video
            className="aspect-video w-full bg-black object-contain"
            controls
            playsInline
            preload="metadata"
          >
            <source src={src} />
            Your browser does not support embedded video.{" "}
            <a className="text-amber-200 underline" href={src}>
              Download the file
            </a>
            .
          </video>
        ) : (
          <p className="p-6 text-sm text-zinc-400">
            No video URL configured. Set{" "}
            <code className="rounded bg-zinc-800 px-1.5 py-0.5 text-xs text-zinc-200">
              NEXT_PUBLIC_PORTFOLIO_VIDEO_URL
            </code>{" "}
            on Vercel, add a <code className="rounded bg-zinc-800 px-1.5 py-0.5 text-xs">url</code> field in{" "}
            <code className="rounded bg-zinc-800 px-1.5 py-0.5 text-xs">portfolio.ts</code>, or add a small{" "}
            <code className="rounded bg-zinc-800 px-1.5 py-0.5 text-xs">file</code> under{" "}
            <code className="rounded bg-zinc-800 px-1.5 py-0.5 text-xs">public/portfolio/video/</code>.
          </p>
        )}
      </div>
    </section>
  );
}
