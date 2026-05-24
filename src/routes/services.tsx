import { createFileRoute, Link } from "@tanstack/react-router";
import { Code2, Palette, Film, Check } from "lucide-react";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Services — Coco Tech" },
      { name: "description", content: "Website creation, social media design and video editing for small and medium businesses." },
      { property: "og:title", content: "Services — Coco Tech" },
      { property: "og:description", content: "Websites, social posts, and video editing — beautifully done." },
    ],
  }),
  component: ServicesPage,
});

const services = [
  {
    icon: Code2,
    title: "Website Creation",
    desc: "Modern, responsive websites tailored to small and medium businesses. From landing pages to full e-commerce.",
    points: ["Responsive design", "SEO ready", "Fast performance", "Easy to manage"],
  },
  {
    icon: Palette,
    title: "Social Media Design",
    desc: "Branded post packs, stories, reels covers and ad creatives that stop the scroll.",
    points: ["Custom brand kits", "Weekly content packs", "Story & reel templates", "Ad creatives"],
  },
  {
    icon: Film,
    title: "Video Editing",
    desc: "Cinematic edits, short-form reels, product videos and event recap films.",
    points: ["Reels & TikToks", "YouTube edits", "Color grading", "Motion graphics"],
  },
];

function ServicesPage() {
  return (
    <div className="mx-auto max-w-7xl px-6 py-24">
      <p className="text-sm uppercase tracking-widest text-brand">Services</p>
      <h1 className="mt-2 max-w-3xl text-5xl font-bold md:text-6xl">Everything you need to look <span className="text-gradient">undeniably good</span> online.</h1>

      <div className="mt-16 space-y-6">
        {services.map((s, idx) => (
          <div key={s.title} className="group grid items-center gap-8 rounded-3xl border border-border bg-card p-8 md:grid-cols-[1fr_2fr] md:p-12">
            <div>
              <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-brand text-primary-foreground shadow-glow">
                <s.icon size={26}/>
              </div>
              <p className="mt-4 text-xs uppercase tracking-widest text-muted-foreground">0{idx+1}</p>
              <h2 className="mt-1 text-3xl font-bold">{s.title}</h2>
            </div>
            <div>
              <p className="text-muted-foreground">{s.desc}</p>
              <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                {s.points.map((p) => (
                  <li key={p} className="flex items-center gap-2 text-sm">
                    <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-brand/15 text-brand">
                      <Check size={12}/>
                    </span>
                    {p}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-16 flex flex-wrap items-center justify-between gap-4 rounded-3xl border border-border bg-card p-10">
        <h2 className="text-2xl font-bold">Not sure what you need?</h2>
        <Link to="/contact" className="rounded-full bg-gradient-brand px-6 py-3 font-semibold text-primary-foreground shadow-glow hover:scale-105 transition-transform">
          Talk to us
        </Link>
      </div>
    </div>
  );
}
