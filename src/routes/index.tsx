import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Sparkles, Code2, Palette, Film, Star, Quote } from "lucide-react";
import heroImg from "@/assets/hero.jpg";
import webImg from "@/assets/work-web.jpg";
import socialImg from "@/assets/work-social.jpg";
import videoImg from "@/assets/work-video.jpg";

export const Route = createFileRoute("/")({
  component: Index,
});

const services = [
  { icon: Code2, title: "Website Creation", desc: "Fast, responsive sites that turn visitors into customers." },
  { icon: Palette, title: "Social Media Design", desc: "Scroll-stopping posts, stories and ad creatives." },
  { icon: Film, title: "Video Editing", desc: "Cinematic edits, reels and brand films that move people." },
];

const testimonials = [
  { name: "Aisha N.", role: "Boutique Owner", text: "Coco Tech rebuilt our store and sales doubled in a month. The visuals just hit different." },
  { name: "Daniel K.", role: "Creator", text: "Their video edits make my reels look like a Netflix trailer. Pure magic." },
  { name: "Linda M.", role: "Cafe Founder", text: "Professional, fast and creative. Our Instagram finally feels like a real brand." },
];

function Index() {
  return (
    <div>
      {/* HERO */}
      <section className="relative overflow-hidden">
        <img
          src={heroImg}
          alt=""
          aria-hidden
          width={1920}
          height={1080}
          className="absolute inset-0 h-full w-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/70 to-background" />
        <div className="relative mx-auto max-w-7xl px-6 py-28 md:py-40">
          <div className="max-w-3xl animate-fade-up">
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card/50 px-3 py-1 text-xs text-muted-foreground backdrop-blur">
              <Sparkles size={12} className="text-brand"/> Creative studio · Uganda
            </span>
            <h1 className="mt-6 font-display text-5xl font-bold leading-[1.05] md:text-7xl">
              Creativity meets <span className="text-gradient">Technology</span>.
            </h1>
            <p className="mt-6 max-w-xl text-lg text-muted-foreground">
              We build beautiful websites, eye-catching social media posts, and
              cinematic videos that make small businesses look anything but small.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/contact" className="inline-flex items-center gap-2 rounded-full bg-gradient-brand px-6 py-3 font-semibold text-primary-foreground shadow-glow transition-transform hover:scale-105">
                Hire Us Now <ArrowRight size={16}/>
              </Link>
              <Link to="/portfolio" className="inline-flex items-center gap-2 rounded-full border border-border px-6 py-3 font-semibold hover:bg-secondary">
                See our work
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="mx-auto max-w-7xl px-6 py-24">
        <div className="flex items-end justify-between gap-6">
          <div>
            <p className="text-sm uppercase tracking-widest text-brand">What we do</p>
            <h2 className="mt-2 text-4xl font-bold md:text-5xl">Services built to make you stand out</h2>
          </div>
          <Link to="/services" className="hidden text-sm text-muted-foreground hover:text-foreground md:inline">
            All services →
          </Link>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {services.map((s) => (
            <div key={s.title} className="group relative overflow-hidden rounded-2xl border border-border bg-card p-8 transition-all hover:-translate-y-1 hover:shadow-glow">
              <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-gradient-brand opacity-0 blur-3xl transition-opacity group-hover:opacity-40" />
              <div className="relative">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-brand text-primary-foreground">
                  <s.icon size={22}/>
                </div>
                <h3 className="mt-5 text-xl font-semibold">{s.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* PORTFOLIO PREVIEW */}
      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="flex items-end justify-between gap-6">
          <h2 className="text-4xl font-bold md:text-5xl">Selected work</h2>
          <Link to="/portfolio" className="text-sm text-muted-foreground hover:text-foreground">View all →</Link>
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {[
            { img: webImg, tag: "Website", title: "E-commerce rebuild" },
            { img: socialImg, tag: "Social", title: "Brand campaign" },
            { img: videoImg, tag: "Video", title: "Launch reel" },
          ].map((w) => (
            <div key={w.title} className="group overflow-hidden rounded-2xl border border-border">
              <div className="aspect-[4/3] overflow-hidden">
                <img src={w.img} alt={w.title} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"/>
              </div>
              <div className="flex items-center justify-between bg-card p-4">
                <div>
                  <p className="text-xs uppercase tracking-widest text-brand">{w.tag}</p>
                  <h3 className="mt-1 font-semibold">{w.title}</h3>
                </div>
                <ArrowRight size={18} className="opacity-50 transition-transform group-hover:translate-x-1"/>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="mx-auto max-w-7xl px-6 py-20">
        <h2 className="text-4xl font-bold md:text-5xl">Loved by founders & creators</h2>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {testimonials.map((t) => (
            <figure key={t.name} className="relative rounded-2xl border border-border bg-card p-6">
              <Quote className="absolute right-4 top-4 text-brand/30" size={28}/>
              <div className="flex gap-1 text-brand">
                {Array.from({length:5}).map((_,i)=>(<Star key={i} size={14} fill="currentColor"/>))}
              </div>
              <blockquote className="mt-3 text-sm text-muted-foreground">"{t.text}"</blockquote>
              <figcaption className="mt-4 text-sm font-semibold">{t.name} <span className="font-normal text-muted-foreground">· {t.role}</span></figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="relative overflow-hidden rounded-3xl border border-border bg-card p-10 md:p-16">
          <div className="absolute inset-0 bg-soft-glow opacity-80" />
          <div className="relative flex flex-col items-start gap-6 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="max-w-xl text-3xl font-bold md:text-5xl">Ready to look legit online?</h2>
              <p className="mt-3 max-w-xl text-muted-foreground">Tell us about your project — we'll send a free quote within 24 hours.</p>
            </div>
            <Link to="/contact" className="inline-flex items-center gap-2 rounded-full bg-gradient-brand px-6 py-3 font-semibold text-primary-foreground shadow-glow hover:scale-105 transition-transform">
              Get a Quote <ArrowRight size={16}/>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
