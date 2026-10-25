import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, ArrowUpRight, Sparkles, Code2, Palette, Film, Image as ImageIcon, Bot } from "lucide-react";
import doodles from "@/assets/hero-doodles.png";
import pBoutique from "@/assets/project-boutique.jpg";
import pCoffee from "@/assets/project-coffee.jpg";
import pFestival from "@/assets/project-festival.jpg";
import pSkincare from "@/assets/project-skincare.jpg";
import pRealestate from "@/assets/project-realestate.jpg";
import pFitness from "@/assets/project-fitness.jpg";
import assistantLogo from "@/assets/assistant-logo.png";
import inkCloudAsset from "@/assets/ink-cloud.mp4.asset.json";
import inkCloudWebmAsset from "@/assets/ink-cloud.webm.asset.json";
import { ChatBubble } from "@/components/ChatBubble";
import { InkVideo } from "@/components/InkVideo";
import { ClientMarquee } from "@/components/ClientMarquee";

const OG_IMAGE =
  "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/dd3fa582-67ec-42fb-b961-17fe339d7ab7/id-preview-09446fd9--b816c6ed-3fbe-45f2-b341-924d68585e23.lovable.app-1780274397342.png";

const LOCAL_BUSINESS_JSONLD = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "Coco Tech",
  description:
    "Creative studio in Kampala building websites, social media design, posters and video for small and medium businesses.",
  slogan: "Creativity meets Technology",
  areaServed: "Uganda",
  address: { "@type": "PostalAddress", addressLocality: "Kampala", addressCountry: "UG" },
  telephone: "+256785852378",
  email: "hello@cocotech.co",
  image: OG_IMAGE,
  makesOffer: [
    "Website design and development",
    "Social media design",
    "Poster and flyer design",
    "Video editing",
  ].map((n) => ({ "@type": "Offer", itemOffered: { "@type": "Service", name: n } })),
};

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Coco Tech — Websites, Design & Video Studio in Kampala" },
      {
        name: "description",
        content:
          "Kampala creative studio building fast websites, scroll-stopping social design, posters and video for small businesses. Free quote in 24 hours.",
      },
      { property: "og:title", content: "Coco Tech — Websites, Design & Video Studio in Kampala" },
      {
        property: "og:description",
        content:
          "Websites, social media design, posters and video editing for ambitious small businesses in Uganda and beyond.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    scripts: [
      { type: "application/ld+json", children: JSON.stringify(LOCAL_BUSINESS_JSONLD) },
    ],
  }),
  component: Index,
});


const services = [
  { n: "01", icon: Code2, title: "Websites", desc: "Fast, editorial sites built to convert. From launch pages to full commerce.", tag: "Design · Build · Ship" },
  { n: "02", icon: Palette, title: "Social Design", desc: "Post systems, story kits and ad creative your feed will actually recognise.", tag: "Weekly · Monthly" },
  { n: "03", icon: ImageIcon, title: "Posters", desc: "Print-ready posters and flyers with the kind of type people photograph.", tag: "Print · Digital" },
  { n: "04", icon: Film, title: "Video", desc: "Cinematic reels, brand films and launch aftermovies with real narrative.", tag: "Reels · Long-form" },
];

const manifesto = [
  { n: "01", title: "Move fast. Look sharp.", text: "Speed without sacrifice. Every pixel earns its place — quickly." },
  { n: "02", title: "Design with intent.", text: "Every choice ties back to your story. No filler, no copy-paste." },
  { n: "03", title: "Craft over trends.", text: "We build for the next five years, not the next five seconds." },
  { n: "04", title: "Treat small like big.", text: "Your business deserves the same polish as the giants. Always." },
];

const projects = [
  { img: pBoutique, tag: "Brand · Web", title: "Sahara Bloom", client: "Kampala · 2025" },
  { img: pCoffee, tag: "Identity", title: "Roasted by Ruth", client: "Entebbe · 2025" },
  { img: pFestival, tag: "Campaign", title: "Pulse Nights", client: "Kampala · 2025" },
  { img: pSkincare, tag: "E-commerce", title: "Halo Skin Co.", client: "Nairobi · 2025" },
  { img: pRealestate, tag: "Web · Film", title: "Atlas Residences", client: "Kigali · 2024" },
  { img: pFitness, tag: "App Brand", title: "Pulse Fit", client: "Lagos · 2025" },
];

function Index() {
  return (
    <div>
      {/* ============================================================
          HERO — editorial, restrained, one focal point.
          Live background: slow doodle drift + soft lamp bloom.
      ============================================================ */}
      <section className="relative isolate overflow-hidden bg-[#070817]">
        <div
          className="absolute inset-0 doodle-bg opacity-[0.14]"
          style={{ backgroundImage: `url(${doodles})`, filter: "invert(1)" }}
          aria-hidden
        />
        <div className="absolute inset-0 opacity-70" aria-hidden>
          <div className="glow-lamp" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#070817]/70 to-[#070817]" aria-hidden />

        <div className="relative mx-auto grid max-w-[92rem] gap-10 px-6 pt-24 pb-40 md:pt-36 md:pb-56 lg:grid-cols-12 lg:gap-6">
          <div className="lg:col-span-9">
            <span className="inline-flex items-center gap-2 text-[10px] font-medium uppercase tracking-[0.32em] text-white/60 animate-fade-in">
              <span className="h-px w-8 bg-white/40" /> Creative studio · Uganda
            </span>

            {/* Editorial headline — mixed weights and italics for human hierarchy */}
            <h1 className="mt-8 font-display font-black text-white leading-[0.86] tracking-[-0.04em] text-[clamp(3.4rem,13vw,11rem)] letter-rise">
              <span className="block">Creativity,</span>
              <span className="block pl-[0.06em] italic font-normal text-white/70">meets</span>
              <span className="block text-aurora">Technology.</span>
            </h1>
          </div>

          {/* Right column — small block that breaks the symmetry */}
          <div className="lg:col-span-3 lg:pt-40">
            <p className="max-w-sm text-base leading-relaxed text-white/75 animate-fade-up [animation-delay:500ms]">
              A small studio in Kampala building websites, campaigns and film for brands that
              want to feel <em className="text-white">established from day one</em>.
            </p>
            <div className="mt-8 flex flex-wrap gap-3 animate-fade-up [animation-delay:700ms]">
              <Link to="/contact" className="magnetic-btn inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-slate-950">
                Start a project <ArrowUpRight size={16}/>
              </Link>
              <Link to="/portfolio" className="glass-dark inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5 active:scale-[0.98]">
                See the work
              </Link>
            </div>
          </div>
        </div>
      </section>

      <div className="seam seam-dark-to-light" aria-hidden />

      <ClientMarquee />

      {/* ============================================================
          SERVICES — asymmetric editorial list, not a grid of cards.
      ============================================================ */}
      <section className="mx-auto max-w-[86rem] px-6 pt-32 pb-24 md:pt-40">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <p className="text-[10px] uppercase tracking-[0.32em] text-muted-foreground">(01) What we do</p>
            <h2 className="mt-4 font-display text-5xl font-black leading-[0.95] tracking-tight md:text-7xl">
              A studio, <br/>
              <span className="italic font-normal text-muted-foreground">not a</span> factory.
            </h2>
            <p className="mt-6 max-w-sm text-muted-foreground">
              Four disciplines, one small team. We take fewer projects on purpose — so
              each one gets the craft it deserves.
            </p>
          </div>

          <ol className="lg:col-span-8 divide-y divide-border border-y border-border">
            {services.map((s, i) => (
              <li
                key={s.title}
                className="group grid grid-cols-[auto_1fr_auto] items-center gap-6 py-8 transition-colors hover:bg-secondary/40 md:py-10 md:px-4 animate-fade-up"
                style={{ animationDelay: `${i * 80}ms` }}
              >
                <span className="font-mono text-xs text-muted-foreground/70">{s.n}</span>
                <div className="min-w-0">
                  <div className="flex items-center gap-4">
                    <span className="glass-chip inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-brand transition-all group-hover:scale-105 group-hover:border-brand/50">
                      <s.icon size={18}/>
                    </span>
                    <h3 className="font-display text-3xl font-bold tracking-tight md:text-5xl">{s.title}</h3>
                  </div>
                  <p className="mt-3 max-w-xl text-sm text-muted-foreground md:pl-[3.75rem]">{s.desc}</p>
                </div>
                <span className="hidden shrink-0 text-[10px] uppercase tracking-[0.28em] text-muted-foreground md:block">{s.tag}</span>
              </li>
            ))}
          </ol>
        </div>

        <div className="mt-14 flex justify-end">
          <Link to="/services" className="inline-flex items-center gap-2 text-sm font-semibold text-foreground underline-offset-8 hover:underline">
            Every service in detail <ArrowRight size={14}/>
          </Link>
        </div>
      </section>

      <div className="seam seam-light-to-dark" aria-hidden />

      {/* ============================================================
          THE COCO CODE — editorial numbered manifesto.
          One dominant statement, four supporting principles.
      ============================================================ */}
      <section className="relative overflow-hidden bg-[#0a0b18] py-32 md:py-48">
        <div className="absolute inset-0 opacity-60" aria-hidden>
          <div className="glow-lamp" />
        </div>
        <div className="absolute inset-0 bg-[#0a0b18]/70" aria-hidden />

        <div className="relative mx-auto max-w-[86rem] px-6 text-white">
          <p className="text-[10px] uppercase tracking-[0.32em] text-white/50">(02) Our philosophy</p>

          <div className="mt-6 grid gap-10 lg:grid-cols-12">
            <h2 className="lg:col-span-7 font-display font-black leading-[0.9] tracking-[-0.03em] text-[clamp(3rem,9vw,8rem)]">
              We treat every <br className="hidden md:block"/>
              brief like a <span className="text-aurora italic">first date</span>.
            </h2>
            <p className="lg:col-span-4 lg:col-start-9 lg:pt-6 text-lg text-white/70">
              Curious. Attentive. A little nervous in the best way. Four rules keep us honest
              — every project, every time.
            </p>
          </div>

          <div className="mt-24 grid gap-x-10 gap-y-16 md:grid-cols-2">
            {manifesto.map((m, i) => (
              <div
                key={m.n}
                className={`group relative ${i % 2 === 1 ? "md:pl-10 md:pt-16" : ""}`}
              >
                <span className="font-display text-[7rem] font-black leading-none text-white/8 md:text-[10rem]">{m.n}</span>
                <div className="-mt-16 md:-mt-24">
                  <h3 className="font-display text-3xl font-bold tracking-tight md:text-5xl">{m.title}</h3>
                  <p className="mt-4 max-w-md text-base text-white/70">{m.text}</p>
                  <span className="mt-6 block h-px w-16 bg-white/30 transition-all duration-500 group-hover:w-40 group-hover:bg-amber-200/70" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="seam seam-dark-to-light" aria-hidden />

      {/* A breath — deliberate pause between manifesto and work */}
      <div className="mx-auto max-w-[86rem] px-6 pt-20 md:pt-28">
        <span className="rule-breath text-foreground" />
      </div>

      {/* ============================================================
          FEATURED WORK — magazine grid, asymmetric, tighter type.
      ============================================================ */}
      <section className="mx-auto max-w-[86rem] px-6 py-32 reveal-on-scroll">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="text-[10px] uppercase tracking-[0.32em] text-muted-foreground">(03) Selected work</p>
            <h2 className="mt-4 font-display text-5xl font-black leading-[0.95] tracking-tight md:text-7xl">
              Real brands. <br/>
              <span className="italic font-normal text-muted-foreground">Real</span> glow-ups.
            </h2>
          </div>
          <Link to="/portfolio" className="text-sm font-semibold underline-offset-8 hover:underline">View archive →</Link>
        </div>

        <div className="mt-16 grid gap-5 md:grid-cols-6 md:grid-rows-2">
          {projects.slice(0, 4).map((w, i) => {
            const layouts = [
              "md:col-span-4 md:row-span-2 md:min-h-[560px]",
              "md:col-span-2 md:min-h-[270px]",
              "md:col-span-1 md:min-h-[270px]",
              "md:col-span-1 md:min-h-[270px]",
            ];
            return (
              <article
                key={w.title}
                className={`group relative overflow-hidden rounded-2xl bg-card animate-fade-up ${layouts[i]}`}
                style={{ animationDelay: `${i * 90}ms` }}
              >
                <img src={w.img} alt={w.title} loading="lazy" decoding="async" className="absolute inset-0 h-full w-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.06]" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-6 text-white">
                  <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-white/70">{w.tag}</span>
                  <h3 className={`mt-2 font-display font-bold leading-tight ${i === 0 ? "text-3xl md:text-5xl" : "text-xl md:text-2xl"}`}>{w.title}</h3>
                  <p className="mt-1 text-xs text-white/60">{w.client}</p>
                </div>
              </article>
            );
          })}
        </div>

        <div className="mt-5 grid gap-5 md:grid-cols-3">
          {projects.slice(3, 6).map((w, i) => (
            <article
              key={w.title + i}
              className={`group relative overflow-hidden rounded-2xl bg-card animate-fade-up ${i === 1 ? "md:mt-8" : ""} ${i === 2 ? "md:-mt-6" : ""}`}
              style={{ animationDelay: `${i * 100}ms` }}
            >
              <div className="aspect-[4/5] overflow-hidden">
                <img src={w.img} alt={w.title} loading="lazy" decoding="async" className="h-full w-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.06]" />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/10 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-6 text-white">
                <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-white/70">{w.tag}</span>
                <h3 className="mt-2 font-display text-xl font-bold md:text-2xl">{w.title}</h3>
                <p className="mt-1 text-xs text-white/60">{w.client}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <div className="seam seam-light-to-dark" aria-hidden />

      {/* ============================================================
          COCO AI — flagship product moment.
          Full-bleed dark, live nebula, oversized composition.
      ============================================================ */}
      <section className="relative isolate overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-[#070817]" aria-hidden>
          <InkVideo src={inkCloudAsset.url} fallbackSrc={inkCloudWebmAsset.url} className="absolute inset-0" />

          {/* deep vignette so headline stays legible */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/55 to-black/85" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_20%,rgba(0,0,0,0.55)_80%)]" />
        </div>

        <div className="relative mx-auto grid max-w-[92rem] items-center gap-12 px-6 py-32 md:py-48 lg:grid-cols-12">
          <div className="lg:col-span-7 text-white">
            <p className="inline-flex items-center gap-3 text-[10px] uppercase tracking-[0.32em] text-white/60">
              <Sparkles size={12}/> (04) A flagship experience
            </p>
            <h2 className="mt-6 font-display font-black leading-[0.88] tracking-[-0.03em] text-[clamp(3rem,10vw,9rem)]">
              Meet <span className="italic font-normal text-white/75">Coco</span> — <br/>
              <span className="text-aurora">your creative</span><br/>
              co-pilot.
            </h2>
            <p className="mt-8 max-w-xl text-lg text-white/70">
              Sketch a website in a sentence. Draft a week of posts in a minute. Brief the studio
              before you finish your coffee. Coco is trained on the way small brands actually grow.
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-5">
              <Link to="/chat" className="magnetic-btn inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-slate-950">
                <Bot size={16}/> Talk to Coco <ArrowUpRight size={16}/>
              </Link>
              <Link to="/services" className="text-sm font-semibold text-white/80 underline-offset-8 hover:text-white hover:underline">
                Or explore the studio →
              </Link>
            </div>
          </div>

          <div className="relative flex items-center justify-center lg:col-span-5">
            <div aria-hidden className="absolute inset-0 -z-10">
              <div className="absolute inset-8 rounded-full bg-gradient-brand opacity-40 blur-[80px]" />
            </div>
            <img
              src={assistantLogo}
              alt="Coco AI"
              loading="lazy"
              className="relative h-72 w-72 animate-float drop-shadow-[0_30px_60px_rgba(168,85,247,0.45)] md:h-[26rem] md:w-[26rem]"
            />
          </div>
        </div>
      </section>

      <div className="seam seam-dark-to-light" aria-hidden />

      {/* ============================================================
          TESTIMONIALS — one dominant pull-quote, not a grid.
      ============================================================ */}
      <section className="mx-auto max-w-[80rem] px-6 py-36 md:py-52 reveal-on-scroll">
        <p className="text-[10px] uppercase tracking-[0.32em] text-muted-foreground">(05) In their words</p>
        <blockquote className="mt-10 max-w-5xl font-display text-4xl font-medium leading-[1.15] tracking-tight md:text-7xl">
          <span className="text-muted-foreground/40">"</span>
          Coco Tech rebuilt our store and sales <em className="not-italic text-aurora">doubled in a month</em>.
          The visuals just hit different.
          <span className="text-muted-foreground/40">"</span>
        </blockquote>
        <div className="mt-10 flex items-center gap-4">
          <span className="h-px w-12 bg-foreground/40" />
          <div>
            <p className="text-sm font-semibold">Aisha N.</p>
            <p className="text-xs text-muted-foreground">Founder · Sahara Bloom Boutique</p>
          </div>
        </div>

        <div className="mt-16 grid gap-8 border-t border-border pt-10 md:grid-cols-2">
          <figure className="animate-fade-up">
            <p className="text-lg leading-relaxed text-foreground/90">
              "Their video edits make my reels look like a Netflix trailer. Pure magic."
            </p>
            <figcaption className="mt-4 text-xs uppercase tracking-widest text-muted-foreground">Daniel K. · Creator</figcaption>
          </figure>
          <figure className="animate-fade-up md:pt-10 [animation-delay:120ms]">
            <p className="text-lg leading-relaxed text-foreground/90">
              "Professional, fast, creative. Our Instagram finally feels like a real brand."
            </p>
            <figcaption className="mt-4 text-xs uppercase tracking-widest text-muted-foreground">Linda M. · Cafe Founder</figcaption>
          </figure>
        </div>
      </section>

      <div className="seam seam-light-to-dark" aria-hidden />

      {/* ============================================================
          FINAL CTA — glow-lamp live background.
      ============================================================ */}
      <section className="relative isolate overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="glow-lamp" aria-hidden />
          <div className="absolute inset-0 bg-black/45" />
        </div>
        <div className="relative mx-auto max-w-5xl px-6 py-32 text-center text-white md:py-52">
          <p className="text-[10px] uppercase tracking-[0.32em] text-white/60">(06) Let's build</p>
          <h2 className="mt-6 font-display font-black leading-[0.9] tracking-[-0.03em] text-[clamp(3rem,9vw,8.5rem)]">
            Let's make it <br/>
            <span className="text-aurora italic">happen</span> together.
          </h2>
          <p className="mx-auto mt-8 max-w-xl text-lg text-white/75">
            We thrive on bold ideas and small-brand stories. Ready to create something people
            actually remember?
          </p>
          <div className="mt-12 flex flex-wrap justify-center gap-4">
            <Link to="/contact" className="magnetic-btn inline-flex items-center gap-2 rounded-full bg-white px-8 py-4 text-base font-semibold text-slate-950">
              Get started today <ArrowUpRight size={18}/>
            </Link>
            <Link to="/portfolio" className="glass-dark inline-flex items-center gap-2 rounded-full px-8 py-4 text-base font-semibold text-white transition-transform hover:-translate-y-0.5 active:scale-[0.98]">
              See the work
            </Link>
          </div>
        </div>
      </section>

      <ChatBubble />
    </div>
  );
}
