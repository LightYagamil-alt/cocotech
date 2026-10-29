import { Button } from "@/components/ui/button";
import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import pBoutique from "@/assets/project-boutique.jpg";
import pCoffee from "@/assets/project-coffee.jpg";
import pFestival from "@/assets/project-festival.jpg";
import pSkincare from "@/assets/project-skincare.jpg";
import pRealestate from "@/assets/project-realestate.jpg";
import pFitness from "@/assets/project-fitness.jpg";

export const Route = createFileRoute("/portfolio")({
  head: () => ({
    meta: [
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
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
  { img: pBoutique, tag: "Website", title: "Sahara Bloom Boutique", desc: "Full e-commerce rebuild — 2.1× sales in 30 days.", client: "Sahara Bloom", year: 2025 },
  { img: pCoffee, tag: "Brand", title: "Roasted by Ruth", desc: "Identity, packaging & cafe collateral.", client: "Roasted by Ruth", year: 2025 },
  { img: pFestival, tag: "Video", title: "Pulse Nights — Aftermovie", desc: "90s cinematic festival highlights.", client: "Pulse FM", year: 2025 },
  { img: pSkincare, tag: "Website", title: "Halo Skin Co.", desc: "Editorial Shopify store with reels integration.", client: "Halo Skin", year: 2025 },
  { img: pRealestate, tag: "Video", title: "Atlas Residences Reveal", desc: "Drone-led property launch film.", client: "Atlas Build", year: 2024 },
  { img: pFitness, tag: "Brand", title: "Pulse Fitness App", desc: "App identity, onboarding & launch creative.", client: "Pulse Fit", year: 2025 },
  { img: pBoutique, tag: "Social Media", title: "Sahara Summer Drop", desc: "12-post lifestyle campaign, 3× reach.", client: "Sahara Bloom", year: 2025 },
  { img: pCoffee, tag: "Social Media", title: "Roasted Reels Kit", desc: "Reusable, on-brand reel templates.", client: "Roasted by Ruth", year: 2025 },
  { img: pFestival, tag: "Social Media", title: "Pulse Ad Pack", desc: "Meta + TikTok creative system.", client: "Pulse FM", year: 2025 },
  { img: pSkincare, tag: "Brand", title: "Halo Visual Identity", desc: "Logo, palette and motion system.", client: "Halo Skin", year: 2024 },
  { img: pRealestate, tag: "Website", title: "Atlas Marketing Site", desc: "From idea to launch in 9 days.", client: "Atlas Build", year: 2025 },
  { img: pFitness, tag: "Video", title: "Pulse Fit Launch Reel", desc: "60s product launch film.", client: "Pulse Fit", year: 2025 },
];

const categories: Category[] = ["All", "Website", "Social Media", "Video", "Brand"];

function PortfolioPage() {
  const [active, setActive] = useState<Category>("All");
  const filtered = useMemo(
    () => (active === "All" ? items : items.filter((i) => i.tag === active)),
    [active],
  );

  return (
    <div className="mx-auto max-w-7xl px-6 py-16 md:py-24">
      <p className="text-sm uppercase tracking-widest text-brand">Portfolio</p>
      <h1 className="mt-2 max-w-4xl page-title">
        Work we're <span className="text-aurora">proud of</span>.
      </h1>
      <p className="mt-4 max-w-2xl text-muted-foreground">
        A slice of recent projects across web, social, brand and video. Filter by what you're
        curious about.
      </p>

      <div className="mt-10 flex flex-wrap gap-2">
        {categories.map((c) => {
          const isActive = c === active;
          const count = c === "All" ? items.length : items.filter((i) => i.tag === c).length;
          return (
            <Button variant="ghost"
              key={c}
              onClick={() => setActive(c)}
              className={`inline-flex items-center gap-2 rounded-md border px-5 py-2.5 text-sm font-semibold transition-colors active:scale-[0.98] ${
                isActive
                  ? "border-transparent bg-foreground text-background "
                  : "bg-transparent border-border text-muted-foreground hover:text-foreground hover:border-brand/40"
              }`}
            >
              {c}
              <span className={`text-xs ${isActive ? "text-background/70" : "text-muted-foreground/60"}`}>{count}</span>
            </Button>
          );
        })}
      </div>

      <div className="mt-10 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-2">
        {filtered.map((w, i) => (
          <article
            key={`${w.title}-${i}`}
            className="group relative min-w-0"
            style={{ animationDelay: `${(i % 6) * 60}ms` }}
          >
            <div className="relative aspect-[4/3] overflow-hidden">
              <img
                src={w.img}
                alt={w.title}
                loading="lazy"
                decoding="async"
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
              />
            </div>
            <div className="mt-4">
              <p className="text-xs text-brand">{w.tag} · {w.year}</p>
              <h3 className="mt-2 text-3xl">{w.title}</h3>
              <p className="mt-1 text-xs text-muted-foreground">{w.client}</p>
            </div>
            <div className="mt-3">
              <p className="text-sm text-muted-foreground">{w.desc}</p>
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
