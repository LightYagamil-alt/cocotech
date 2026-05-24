import { createFileRoute } from "@tanstack/react-router";
import webImg from "@/assets/work-web.jpg";
import socialImg from "@/assets/work-social.jpg";
import videoImg from "@/assets/work-video.jpg";
import heroImg from "@/assets/hero.jpg";

export const Route = createFileRoute("/portfolio")({
  head: () => ({
    meta: [
      { title: "Portfolio — Coco Tech" },
      { name: "description", content: "A selection of websites, social media campaigns and videos we've crafted." },
      { property: "og:title", content: "Portfolio — Coco Tech" },
      { property: "og:description", content: "Recent work from Coco Tech." },
    ],
  }),
  component: PortfolioPage,
});

const items = [
  { img: webImg, tag: "Website", title: "Boutique e-commerce", desc: "Full storefront rebuild with modern checkout." },
  { img: socialImg, tag: "Social", title: "Summer campaign", desc: "12-post campaign for a lifestyle brand." },
  { img: videoImg, tag: "Video", title: "Product launch reel", desc: "60s cinematic launch video." },
  { img: heroImg, tag: "Brand", title: "Identity refresh", desc: "Logo, palette and motion system." },
  { img: webImg, tag: "Website", title: "Cafe landing page", desc: "Menu, gallery and booking in one page." },
  { img: socialImg, tag: "Social", title: "Reel templates", desc: "Reusable, on-brand reel templates." },
];

function PortfolioPage() {
  return (
    <div className="mx-auto max-w-7xl px-6 py-24">
      <p className="text-sm uppercase tracking-widest text-brand">Portfolio</p>
      <h1 className="mt-2 max-w-3xl text-5xl font-bold md:text-6xl">Work we're <span className="text-gradient">proud of</span>.</h1>
      <p className="mt-4 max-w-2xl text-muted-foreground">
        A small slice of recent projects across web, social and video. Want to see something
        specific? Reach out and we'll share more.
      </p>

      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((w, i) => (
          <article key={i} className="group overflow-hidden rounded-2xl border border-border bg-card">
            <div className="aspect-[4/3] overflow-hidden">
              <img src={w.img} alt={w.title} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"/>
            </div>
            <div className="p-5">
              <p className="text-xs uppercase tracking-widest text-brand">{w.tag}</p>
              <h3 className="mt-1 font-semibold">{w.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{w.desc}</p>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
