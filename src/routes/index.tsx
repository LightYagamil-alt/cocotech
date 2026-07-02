import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Sparkles, Code2, Palette, Film, Star, Quote, Image as ImageIcon, Bot, Zap, Compass, Layers, Heart } from "lucide-react";
import doodles from "@/assets/hero-doodles.png";
import pBoutique from "@/assets/project-boutique.jpg";
import pCoffee from "@/assets/project-coffee.jpg";
import pFestival from "@/assets/project-festival.jpg";
import pSkincare from "@/assets/project-skincare.jpg";
import pRealestate from "@/assets/project-realestate.jpg";
import pFitness from "@/assets/project-fitness.jpg";
import assistantLogo from "@/assets/assistant-logo.png";
import { ChatBubble } from "@/components/ChatBubble";
import { ClientMarquee } from "@/components/ClientMarquee";

export const Route = createFileRoute("/")({
  component: Index,
});

const services = [
  { icon: Code2, title: "Website Creation", desc: "Fast, responsive sites that turn visitors into buyers.", tint: "from-violet-500 to-fuchsia-500" },
  { icon: Palette, title: "Social Media Design", desc: "Scroll-stopping posts, stories and ad creatives.", tint: "from-fuchsia-500 to-pink-500" },
  { icon: ImageIcon, title: "Poster Design", desc: "Bold print-ready posters, flyers and event collateral.", tint: "from-cyan-500 to-violet-500" },
  { icon: Film, title: "Video Editing", desc: "Cinematic edits, reels and brand films that move people.", tint: "from-amber-500 to-pink-500" },
];

const testimonials = [
  { name: "Aisha N.", role: "Boutique Owner", text: "Coco Tech rebuilt our store and sales doubled in a month. The visuals just hit different." },
  { name: "Daniel K.", role: "Creator", text: "Their video edits make my reels look like a Netflix trailer. Pure magic." },
  { name: "Linda M.", role: "Cafe Founder", text: "Professional, fast and creative. Our Instagram finally feels like a real brand." },
];

const manifesto = [
  { icon: Zap, title: "Move Fast, Look Sharp", text: "Speed without sacrifice. Every pixel earns its place — quickly." },
  { icon: Compass, title: "Design With Intent", text: "Every choice ties back to your story. No filler, no copy-paste." },
  { icon: Layers, title: "Craft Over Trends", text: "We build for the next 5 years, not the next 5 seconds." },
  { icon: Heart, title: "Treat Small Like Big", text: "Your business deserves the same polish as the giants. Always." },
];

const projects = [
  { img: pBoutique, tag: "Brand · Web", title: "Sahara Bloom Boutique", client: "Kampala · 2025", color: "bg-amber-500/20" },
  { img: pCoffee, tag: "Identity", title: "Roasted by Ruth", client: "Entebbe · 2025", color: "bg-orange-500/20" },
  { img: pFestival, tag: "Event Campaign", title: "Pulse Nights Festival", client: "Kampala · 2025", color: "bg-fuchsia-500/20" },
  { img: pSkincare, tag: "E-commerce", title: "Halo Skin Co.", client: "Nairobi · 2025", color: "bg-emerald-500/20" },
  { img: pRealestate, tag: "Web · Video", title: "Atlas Residences", client: "Kigali · 2024", color: "bg-violet-500/20" },
  { img: pFitness, tag: "App Brand", title: "Pulse Fitness App", client: "Lagos · 2025", color: "bg-cyan-500/20" },
];

function Index() {
  const headline = "Creativity meets Technology.";
  return (
    <div>
      {/* HERO — bold doodle wallpaper, giant typography, zigzag cut */}
      <section className="relative isolate overflow-hidden bg-[#070817] clip-zigzag-bottom">
        {/* Doodle wallpaper */}
        <div
          className="absolute inset-0 doodle-bg opacity-[0.18] dark:opacity-[0.22]"
          style={{ backgroundImage: `url(${doodles})`, filter: "invert(1)" }}
          aria-hidden
        />
        {/* Color overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/32 via-amber-400/18 to-sky-400/24 mix-blend-screen" aria-hidden />
        <div className="absolute inset-0 bg-gradient-to-b from-black/15 via-[#070817]/58 to-[#070817]" aria-hidden />

        <div className="relative mx-auto max-w-7xl px-6 pt-20 pb-32 md:pt-28 md:pb-44">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-medium text-white backdrop-blur animate-fade-in">
            <Sparkles size={12} /> Creative studio · Uganda
          </span>
          <h1 className="mt-6 font-display font-extrabold leading-[0.88] tracking-tight text-white text-[clamp(3.15rem,12vw,10rem)] letter-rise">
            {headline.split(" ").map((word, wi) => (
              <span key={wi} className="mr-[0.12em] inline-block">
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
          <p className="mt-6 max-w-xl text-lg text-white/80 animate-fade-up [animation-delay:600ms]">
            We build websites, posters, social campaigns and video stories with the kind
            of craft that makes a growing business feel established from day one.
          </p>
          <div className="mt-8 flex flex-wrap gap-3 animate-fade-up [animation-delay:750ms]">
             <Link to="/contact" className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 font-semibold text-slate-950 shadow-glow transition-transform hover:scale-[1.03] active:scale-[0.98]">
              Hire Us Now <ArrowRight size={16}/>
            </Link>
             <Link to="/portfolio" className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-6 py-3 font-semibold text-white backdrop-blur hover:bg-white/20 active:scale-[0.98]">
              See our work
            </Link>
          </div>
        </div>
      </section>

      {/* CLIENT MARQUEE */}
      <ClientMarquee />

      {/* SERVICES — illustrated tilted cards */}
      <section className="mx-auto max-w-7xl px-6 py-24">
        <div className="flex items-end justify-between gap-6">
          <div>
            <p className="text-sm uppercase tracking-widest text-brand">What we do</p>
            <h2 className="mt-2 text-4xl font-bold md:text-6xl">
              Services built to <span className="text-aurora">stand out</span>
            </h2>
          </div>
          <Link to="/services" className="hidden text-sm text-muted-foreground hover:text-foreground md:inline">
            All services →
          </Link>
        </div>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((s, i) => (
            <div
              key={s.title}
              className="group relative overflow-hidden rounded-3xl border border-border bg-card p-7 transition-colors animate-fade-up hover-lift hover:shadow-glow"
              style={{ animationDelay: `${i * 80}ms` }}
            >
              {/* Doodle illustration */}
              <div
                className="absolute -right-8 -top-8 h-40 w-40 rounded-full opacity-[0.08] transition-transform duration-300 group-hover:scale-110"
                style={{ backgroundImage: `url(${doodles})`, backgroundSize: "240px" }}
                aria-hidden
              />
              <div className={`absolute -left-16 -bottom-16 h-48 w-48 rounded-full bg-gradient-to-br ${s.tint} opacity-20 blur-3xl transition-opacity group-hover:opacity-40`} />
              <div className="relative">
                <div className={`inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${s.tint} text-white shadow-lg transition-transform group-hover:scale-105 group-hover:-rotate-3`}>
                  <s.icon size={26}/>
                </div>
                <h3 className="mt-6 text-2xl font-bold">{s.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{s.desc}</p>
                <Link to="/services" className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-brand opacity-0 transition-opacity group-hover:opacity-100">
                  Learn more <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* THE COCO CODE — manifesto over doodle wallpaper */}
      <section className="relative overflow-hidden bg-[#090a16] py-28 clip-zigzag-top clip-zigzag-bottom">
        <div
          className="absolute inset-0 doodle-bg opacity-[0.12]"
          style={{ backgroundImage: `url(${doodles})`, filter: "invert(1)" }}
          aria-hidden
        />
        <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500/16 via-black/28 to-amber-400/14" aria-hidden />
        <div className="relative mx-auto max-w-7xl px-6 text-white">
          <div className="max-w-3xl">
            <p className="text-sm uppercase tracking-[0.3em] text-amber-200">Our philosophy</p>
            <h2 className="mt-3 font-display font-extrabold leading-[0.92] tracking-tight text-5xl md:text-8xl">
              <span className="text-aurora">#TheCocoCode</span>
            </h2>
            <p className="mt-5 max-w-xl text-lg text-white/80">
              Four principles that shape every project we touch. It's not a process —
              it's a promise.
            </p>
          </div>
          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {manifesto.map((m, i) => (
              <div
                key={m.title}
                className="group relative overflow-hidden rounded-2xl border border-white/15 bg-white/[0.04] p-7 backdrop-blur transition-colors hover-lift hover:border-amber-200/50 hover:bg-white/[0.08] animate-fade-up"
                style={{ animationDelay: `${i * 90}ms` }}
              >
                <p className="text-xs font-mono uppercase tracking-widest text-white/50">0{i + 1}</p>
                <div className="mt-3 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-cyan-500 text-white">
                  <m.icon size={20} />
                </div>
                <h3 className="mt-5 text-xl font-bold">{m.title}</h3>
                <p className="mt-2 text-sm text-white/70">{m.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED WORK — magazine grid */}
      <section className="mx-auto max-w-7xl px-6 py-24">
        <div className="flex items-end justify-between gap-6">
          <div>
            <p className="text-sm uppercase tracking-widest text-brand">Featured work</p>
            <h2 className="mt-2 text-4xl font-bold md:text-6xl">Real brands. Real glow-ups.</h2>
          </div>
          <Link to="/portfolio" className="text-sm text-muted-foreground hover:text-foreground">View all →</Link>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-6 md:grid-rows-2">
          {projects.slice(0, 4).map((w, i) => {
            const layouts = [
              "md:col-span-4 md:row-span-2",   // big left
              "md:col-span-2",                 // small top right
              "md:col-span-1",                 // small bottom
              "md:col-span-1",                 // small bottom
            ];
            return (
              <article
                key={w.title}
                className={`group relative overflow-hidden rounded-3xl border border-border animate-fade-up hover-lift ${layouts[i]}`}
                style={{ animationDelay: `${i * 100}ms` }}
              >
                <div className="absolute inset-0">
                  <img src={w.img} alt={w.title} loading="lazy" decoding="async" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]" />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
                <div className="relative flex h-full min-h-[220px] flex-col justify-end p-6 text-white md:min-h-[260px]">
                  <span className="inline-flex w-fit rounded-full border border-white/30 bg-white/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-widest backdrop-blur">
                    {w.tag}
                  </span>
                  <h3 className="mt-3 text-2xl font-bold leading-tight md:text-3xl">{w.title}</h3>
                  <p className="mt-1 text-sm text-white/70">{w.client}</p>
                </div>
              </article>
            );
          })}
        </div>

        {/* Second row */}
        <div className="mt-6 grid gap-6 md:grid-cols-2">
          {projects.slice(4, 6).map((w, i) => (
            <article
              key={w.title}
              className="group relative overflow-hidden rounded-3xl border border-border animate-fade-up hover-lift"
              style={{ animationDelay: `${i * 100}ms` }}
            >
              <div className="aspect-[16/10] overflow-hidden">
                <img src={w.img} alt={w.title} loading="lazy" decoding="async" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]" />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-6 text-white">
                <span className="inline-flex w-fit rounded-full border border-white/30 bg-white/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-widest backdrop-blur">
                  {w.tag}
                </span>
                <h3 className="mt-3 text-2xl font-bold">{w.title}</h3>
                <p className="mt-1 text-sm text-white/70">{w.client}</p>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-12 flex justify-center">
          <Link to="/portfolio" className="inline-flex items-center gap-2 rounded-full border-2 border-foreground px-7 py-3 font-semibold transition-colors hover:bg-foreground hover:text-background active:scale-[0.98]">
            More Work <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      {/* COCO AI FEATURE */}
      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="relative overflow-hidden rounded-[2rem] border border-border bg-card p-8 md:p-14">
          <div
            className="absolute inset-0 doodle-bg opacity-[0.06]"
            style={{ backgroundImage: `url(${doodles})` }}
            aria-hidden
          />
          <div className="absolute inset-0 bg-soft-glow opacity-80" />
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
                <Link to="/chat" className="inline-flex items-center gap-2 rounded-full bg-gradient-brand px-6 py-3 font-semibold text-primary-foreground shadow-glow transition-transform hover:scale-[1.03] active:scale-[0.98]">
                  <Bot size={16} /> Try Coco AI <ArrowRight size={16} />
                </Link>
                <Link to="/services" className="inline-flex items-center gap-2 rounded-full border border-border px-6 py-3 font-semibold hover:bg-secondary">
                  Learn more
                </Link>
              </div>
            </div>
            <div className="order-1 flex items-center justify-center md:order-2">
              <div className="relative">
                <div className="absolute inset-0 rounded-full bg-gradient-brand opacity-25 blur-3xl" />
                <img src={assistantLogo} alt="Coco AI" loading="lazy" className="relative h-56 w-56 animate-float object-contain md:h-72 md:w-72"/>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="mx-auto max-w-7xl px-6 py-20">
        <h2 className="text-4xl font-bold md:text-6xl">Loved by founders & creators</h2>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <figure
              key={t.name}
              className="relative rounded-3xl border border-border bg-card p-7 animate-fade-up hover-lift"
              style={{ animationDelay: `${i * 120}ms` }}
            >
              <Quote className="absolute right-5 top-5 text-brand/30" size={32}/>
              <div className="flex gap-1 text-brand">
                {Array.from({length:5}).map((_,i)=>(<Star key={i} size={14} fill="currentColor"/>))}
              </div>
              <blockquote className="mt-3 text-base text-foreground/90">"{t.text}"</blockquote>
              <figcaption className="mt-5 text-sm font-semibold">{t.name} <span className="font-normal text-muted-foreground">· {t.role}</span></figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* FINAL CTA — glow-lamp live background */}
      <section className="relative isolate overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="glow-lamp" aria-hidden />
          <div className="absolute inset-0 bg-black/48" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent,rgba(0,0,0,0.42))]" aria-hidden />
        </div>
        <div className="relative mx-auto max-w-5xl px-6 py-28 text-center text-white md:py-40">
          <h2 className="font-display font-extrabold leading-[0.92] tracking-tight text-5xl md:text-8xl">
            Let's make it<br/><span className="text-aurora">Happen together.</span>
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-lg text-white/80">
            We thrive on bold ideas and small-brand stories. Ready to create something
            people actually remember?
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <Link to="/contact" className="inline-flex items-center gap-2 rounded-full bg-white px-8 py-4 text-base font-bold text-slate-950 transition-transform hover:scale-[1.03] active:scale-[0.98]">
              Get Started Today <ArrowRight size={18}/>
            </Link>
            <Link to="/portfolio" className="inline-flex items-center gap-2 rounded-full border border-white/40 bg-white/10 px-8 py-4 text-base font-bold text-white backdrop-blur hover:bg-white/20 active:scale-[0.98]">
              See the work
            </Link>
          </div>
        </div>
      </section>

      <ChatBubble />
    </div>
  );
}
