import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import webImg from "@/assets/work-web.jpg";
import socialImg from "@/assets/work-social.jpg";
import videoImg from "@/assets/work-video.jpg";
import heroImg from "@/assets/hero.jpg";

export const Route = createFileRoute("/portfolio")({
  head: () => ({
    meta: [
      { title: "Portfolio — Coco Tech" },
      { name: "description", content: "Selected websites, social campaigns, brand identities and videos crafted by Coco Tech." },
      { property: "og:title", content: "Portfolio — Coco Tech" },
      { property: "og:description", content: "Recent work from Coco Tech across web, social and video." },
    ],
  }),
  component: PortfolioPage,
});

type Category = "All" | "Website" | "Social Media" | "Video" | "Brand";

const items: { img: string; tag: Exclude<Category, "All">; title: string; desc: string; client: string; year: number }[] = [
  { img: webImg, tag: "Website", title: "Boutique e-commerce", desc: "+118% conversions after rebuild.", client: "Boutique Co.", year: 2025 },
  { img: socialImg, tag: "Social Media", title: "Summer campaign", desc: "12-post lifestyle drop, 3x reach.", client: "Sahara Roast", year: 2025 },
  { img: videoImg, tag: "Video", title: "Product launch reel", desc: "60s cinematic launch film.", client: "Lumen Studio", year: 2025 },
  { img: heroImg, tag: "Brand", title: "Identity refresh", desc: "Logo, palette & motion system.", client: "North & Co", year: 2024 },
  { img: webImg, tag: "Website", title: "Cafe landing page", desc: "Menu, gallery & booking in one.", client: "Kibo Eats", year: 2024 },
  { img: socialImg, tag: "Social Media", title: "Reel templates", desc: "Reusable, on-brand reel kit.", client: "Pulse FM", year: 2025 },
  { img: videoImg, tag: "Video", title: "Founder docu-short", desc: "Story-led 90s brand film.", client: "Atlas Build", year: 2024 },
  { img: webImg, tag: "Website", title: "SaaS marketing site", desc: "From idea to launch in 9 days.", client: "Halo Skincare", year: 2025 },
  { img: socialImg, tag: "Social Media", title: "Ad creatives pack", desc: "Meta + TikTok creative system.", client: "Drift Travel", year: 2025 },
  { img: heroImg, tag: "Brand", title: "Studio rebrand", desc: "End-to-end visual identity.", client: "Mango & Co", year: 2024 },
  { img: videoImg, tag: "Video", title: "Event aftermovie", desc: "Highlights edit, color graded.", client: "Pulse FM", year: 2024 },
  { img: webImg, tag: "Website", title: "Portfolio site", desc: "Editorial-style creator site.", client: "Lumen Studio", year: 2024 },
];

const categories: Category[] = ["All", "Website", "Social Media", "Video", "Brand"];

function PortfolioPage() {
  const [active, setActive] = useState<Category>("All");
  const filtered = useMemo(
    () => (active === "All" ? items : items.filter((i) => i.tag === active)),
    [active],
  );

  return (
    <div className="mx-auto max-w-7xl px-6 py-24">
      <p className="text-sm uppercase tracking-widest text-brand">Portfolio</p>
      <h1 className="mt-2 max-w-3xl text-5xl font-bold md:text-6xl">
        Work we're <span className="text-gradient">proud of</span>.
      </h1>
      <p className="mt-4 max-w-2xl text-muted-foreground">
        A slice of recent projects across web, social, brand and video. Filter by what you're
        curious about.
      </p>

      {/* Filters */}
      <div className="mt-10 flex flex-wrap gap-2">
        {categories.map((c) => {
          const isActive = c === active;
          return (
            <button
              key={c}
              onClick={() => setActive(c)}
              className={`rounded-full border px-4 py-2 text-sm font-medium transition-all ${
                isActive
                  ? "border-transparent bg-gradient-brand text-primary-foreground shadow-glow"
                  : "border-border bg-card/50 text-muted-foreground hover:text-foreground hover:border-brand/50"
              }`}
            >
              {c}
            </button>
          );
        })}
      </div>

      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((w, i) => (
          <article
            key={`${w.title}-${i}`}
            className="group relative overflow-hidden rounded-2xl border border-border bg-card animate-fade-up hover-lift"
            style={{ animationDelay: `${(i % 6) * 60}ms` }}
          >
            <div className="relative aspect-[4/3] overflow-hidden">
              <img
                src={w.img}
                alt={w.title}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/90 via-background/30 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              <div className="absolute inset-x-0 bottom-0 translate-y-4 p-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                <p className="text-sm text-foreground">{w.desc}</p>
              </div>
            </div>
            <div className="p-5">
              <div className="flex items-center justify-between gap-2">
                <p className="text-xs uppercase tracking-widest text-brand">{w.tag}</p>
                <span className="rounded-full border border-border bg-secondary/50 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
                  {w.client} · {w.year}
                </span>
              </div>
              <h3 className="mt-2 font-semibold">{w.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{w.desc}</p>
            </div>
          </article>
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="mt-10 text-center text-sm text-muted-foreground">Nothing here yet — try another category.</p>
      )}
    </div>
  );
}
