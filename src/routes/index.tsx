import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Sparkles, Code2, Palette, Film, Star, Quote, Image as ImageIcon, Bot, Zap, Compass, Layers, Heart } from "lucide-react";
import webImg from "@/assets/work-web.jpg";
import socialImg from "@/assets/work-social.jpg";
import videoImg from "@/assets/work-video.jpg";
import assistantLogo from "@/assets/assistant-logo.png";
import { ChatBubble } from "@/components/ChatBubble";
import { LiveBackground } from "@/components/LiveBackground";
import { ClientMarquee } from "@/components/ClientMarquee";

export const Route = createFileRoute("/")({
  component: Index,
});

const services = [
  { icon: Code2, title: "Website Creation", desc: "Fast, responsive sites that turn visitors into customers." },
  { icon: Palette, title: "Social Media Design", desc: "Scroll-stopping posts, stories and ad creatives." },
  { icon: ImageIcon, title: "Poster Design", desc: "Bold print-ready posters and flyers for events and promos." },
  { icon: Film, title: "Video Editing", desc: "Cinematic edits, reels and brand films that move people." },
];

const testimonials = [
  { name: "Aisha N.", role: "Boutique Owner", text: "Coco Tech rebuilt our store and sales doubled in a month. The visuals just hit different." },
  { name: "Daniel K.", role: "Creator", text: "Their video edits make my reels look like a Netflix trailer. Pure magic." },
  { name: "Linda M.", role: "Cafe Founder", text: "Professional, fast and creative. Our Instagram finally feels like a real brand." },
];

const manifesto = [
  { icon: Zap, title: "Move Fast, Look Sharp", text: "Speed without sacrifice. Every pixel earns its place — quickly." },
  { icon: Compass, title: "Design With Intent", text: "Every choice ties back to your story. No filler, no fluff, no copy-paste." },
  { icon: Layers, title: "Craft Over Trends", text: "We build for the next 5 years, not the next 5 seconds. Timeless beats trendy." },
  { icon: Heart, title: "Treat Small Like Big", text: "Your business deserves the same polish as the giants. Always." },
];

function Index() {
  const headline = "Creativity meets Technology.";
  return (
    <div>
      {/* HERO — massive aurora typography over live animated background */}
      <section className="relative overflow-hidden">
        <LiveBackground />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/10 to-background" />
        <div className="relative mx-auto max-w-7xl px-6 py-24 md:py-36">
          <div className="max-w-5xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-3 py-1 text-xs text-muted-foreground backdrop-blur animate-fade-in">
              <Sparkles size={12} className="text-brand"/> Creative studio · Uganda
            </span>
            <h1 className="mt-6 font-display font-bold leading-[0.92] tracking-tight text-[clamp(2.75rem,9vw,8.5rem)] letter-rise">
              {headline.split(" ").map((word, wi) => (
                <span key={wi} className="mr-[0.18em] inline-block">
                  {word.split("").map((ch, ci) => {
                    const isHighlight = word.toLowerCase().startsWith("tech");
                    return (
                      <span
                        key={ci}
                        className={isHighlight ? "text-aurora" : ""}
                        style={{ animationDelay: `${(wi * 6 + ci) * 35}ms` }}
                      >
                        {ch}
                      </span>
                    );
                  })}
                </span>
              ))}
            </h1>
            <p className="mt-6 max-w-xl text-lg text-muted-foreground animate-fade-up [animation-delay:600ms]">
              We build beautiful websites, eye-catching social posts, and cinematic videos that make
              small businesses look anything but small.
            </p>
            <div className="mt-8 flex flex-wrap gap-3 animate-fade-up [animation-delay:750ms]">
              <Link to="/contact" className="inline-flex items-center gap-2 rounded-full bg-gradient-brand px-6 py-3 font-semibold text-primary-foreground shadow-glow transition-transform hover:scale-105">
                Hire Us Now <ArrowRight size={16}/>
              </Link>
              <Link to="/portfolio" className="inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-6 py-3 font-semibold backdrop-blur hover:bg-secondary">
                See our work
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CLIENT MARQUEE */}
      <ClientMarquee />

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
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((s, i) => (
            <div
              key={s.title}
              className="group relative overflow-hidden rounded-2xl border border-border bg-card p-8 transition-all animate-fade-up hover-lift hover:shadow-glow"
              style={{ animationDelay: `${i * 80}ms` }}
            >
              <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-gradient-brand opacity-0 blur-3xl transition-opacity group-hover:opacity-40" />
              <div className="relative">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-brand text-primary-foreground transition-transform group-hover:scale-110 group-hover:rotate-3">
                  <s.icon size={22}/>
                </div>
                <h3 className="mt-5 text-xl font-semibold">{s.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* THE COCO CODE — manifesto, with live animated backdrop */}
      <section className="relative overflow-hidden py-24">
        <LiveBackground />
        <div className="absolute inset-0 bg-background/60" />
        <div className="relative mx-auto max-w-7xl px-6">
          <div className="max-w-3xl">
            <p className="text-sm uppercase tracking-[0.3em] text-brand">Our philosophy</p>
            <h2 className="mt-3 font-display text-5xl font-bold leading-[1] tracking-tight md:text-7xl">
              <span className="text-aurora">#TheCocoCode</span>
            </h2>
            <p className="mt-5 max-w-xl text-lg text-muted-foreground">
              Four principles that shape every project we touch. It's not a process —
              it's a promise.
            </p>
          </div>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {manifesto.map((m, i) => (
              <div
                key={m.title}
                className="group relative overflow-hidden rounded-2xl border border-border bg-card/70 p-7 backdrop-blur transition-all hover-lift hover:border-brand/50 hover:shadow-glow animate-fade-up"
                style={{ animationDelay: `${i * 90}ms` }}
              >
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                <p className="text-xs font-mono uppercase tracking-widest text-muted-foreground">0{i + 1}</p>
                <div className="mt-3 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-brand text-primary-foreground">
                  <m.icon size={20} />
                </div>
                <h3 className="mt-5 text-xl font-bold">{m.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{m.text}</p>
              </div>
            ))}
          </div>
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
            { img: webImg, tag: "Website", title: "E-commerce rebuild", client: "Boutique Co. · 2025" },
            { img: socialImg, tag: "Social", title: "Brand campaign", client: "Sahara Roast · 2025" },
            { img: videoImg, tag: "Video", title: "Launch reel", client: "Lumen Studio · 2025" },
          ].map((w, i) => (
            <div
              key={w.title}
              className="group overflow-hidden rounded-2xl border border-border animate-scale-in hover-lift"
              style={{ animationDelay: `${i * 100}ms` }}
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img src={w.img} alt={w.title} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"/>
              </div>
              <div className="flex items-center justify-between bg-card p-4">
                <div>
                  <p className="text-xs uppercase tracking-widest text-brand">{w.tag} · {w.client}</p>
                  <h3 className="mt-1 font-semibold">{w.title}</h3>
                </div>
                <ArrowRight size={18} className="opacity-50 transition-transform group-hover:translate-x-1"/>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* COCO AI FEATURE */}
      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="relative overflow-hidden rounded-3xl border border-border bg-card p-8 md:p-14">
          <LiveBackground />
          <div className="absolute inset-0 bg-card/60" />
          <div className="relative grid items-center gap-10 md:grid-cols-2">
            <div className="order-2 md:order-1">
              <p className="inline-flex items-center gap-2 text-sm uppercase tracking-widest text-brand">
                <Sparkles size={14} /> Meet Coco AI
              </p>
              <h2 className="mt-3 text-4xl font-bold md:text-5xl">
                Your <span className="text-aurora">creative co-pilot</span>, always on.
              </h2>
              <p className="mt-4 max-w-lg text-muted-foreground">
                Coco AI helps you sketch websites, draft social posts, brainstorm campaigns and brief
                our team — instantly. Trained on what makes small brands feel big.
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <Link
                  to="/chat"
                  className="inline-flex items-center gap-2 rounded-full bg-gradient-brand px-6 py-3 font-semibold text-primary-foreground shadow-glow transition-transform hover:scale-105"
                >
                  <Bot size={16} /> Try Coco AI <ArrowRight size={16} />
                </Link>
                <Link
                  to="/services"
                  className="inline-flex items-center gap-2 rounded-full border border-border px-6 py-3 font-semibold hover:bg-secondary"
                >
                  Learn more
                </Link>
              </div>
            </div>
            <div className="order-1 flex items-center justify-center md:order-2">
              <div className="relative">
                <div className="absolute inset-0 animate-pulse rounded-full bg-gradient-brand opacity-30 blur-3xl" />
                <img
                  src={assistantLogo}
                  alt="Coco AI"
                  loading="lazy"
                  className="relative h-56 w-56 animate-float object-contain md:h-72 md:w-72"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="mx-auto max-w-7xl px-6 py-20">
        <h2 className="text-4xl font-bold md:text-5xl">Loved by founders & creators</h2>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <figure
              key={t.name}
              className="relative rounded-2xl border border-border bg-card p-6 animate-fade-up hover-lift"
              style={{ animationDelay: `${i * 120}ms` }}
            >
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

      <ChatBubble />
    </div>
  );
}
