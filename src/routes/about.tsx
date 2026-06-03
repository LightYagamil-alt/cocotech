import { createFileRoute, Link } from "@tanstack/react-router";
import { Target, Eye, Heart, Crown } from "lucide-react";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Coco Tech" },
      { name: "description", content: "Coco Tech is a creative studio helping small businesses look pro online through web design, social graphics and video." },
      { property: "og:title", content: "About — Coco Tech" },
      { property: "og:description", content: "Our mission, vision and the team behind Coco Tech." },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-24">
      <p className="text-sm uppercase tracking-widest text-brand">About</p>
      <h1 className="mt-2 text-5xl font-bold md:text-6xl">A small studio with <span className="text-gradient">big creative</span> energy.</h1>
      <p className="mt-6 max-w-3xl text-lg text-muted-foreground">
        Coco Tech is a creative services studio built for small and medium businesses that want
        to show up online with the same polish as the biggest brands. We blend clean design,
        sharp storytelling, and modern technology to help you grow.
      </p>

      <div className="mt-16 grid gap-6 md:grid-cols-3">
        {[
          { icon: Target, title: "Our Mission", text: "Make professional digital presence accessible, fast and beautifully crafted for every business." },
          { icon: Eye, title: "Our Vision", text: "A web where every small business gets to look — and feel — like a category leader." },
          { icon: Heart, title: "Our Values", text: "Honesty, creativity, speed, and obsessive attention to detail in every pixel and frame." },
        ].map((v) => (
          <div key={v.title} className="rounded-2xl border border-border bg-card p-6">
            <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-brand text-primary-foreground">
              <v.icon size={20}/>
            </div>
            <h3 className="mt-4 text-lg font-semibold">{v.title}</h3>
            <p className="mt-2 text-sm text-muted-foreground">{v.text}</p>
          </div>
        ))}
      </div>

      <div className="mt-16 rounded-3xl border border-border bg-card p-10 text-center">
        <h2 className="text-3xl font-bold">Let's build something worth sharing.</h2>
        <Link to="/contact" className="mt-6 inline-flex rounded-full bg-gradient-brand px-6 py-3 font-semibold text-primary-foreground shadow-glow hover:scale-105 transition-transform">
          Start a project
        </Link>
      </div>
    </div>
  );
}
