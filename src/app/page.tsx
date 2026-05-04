import { portfolioItems } from "@/data/portfolio";
import { PortfolioFeed } from "@/components/PortfolioFeed";

export default function Home() {
  return (
    <div className="min-h-full bg-gradient-to-b from-stone-100 to-stone-200/90">
      <header className="sticky top-0 z-10 border-b border-zinc-200/70 bg-white/85 backdrop-blur-md">
        <div className="mx-auto flex max-w-4xl flex-col gap-1 px-4 py-6 sm:px-6 lg:px-8">
          <p className="text-xs font-medium uppercase tracking-widest text-amber-800/90">
            Columbia · Human Centered Design &amp; Innovation
          </p>
          <h1 className="text-2xl font-semibold tracking-tight text-zinc-900 sm:text-3xl">
            Design Portfolio - Emile Al-Billeh
          </h1>
        </div>
      </header>
      <main>
        <PortfolioFeed items={portfolioItems} />
      </main>
    </div>
  );
}
