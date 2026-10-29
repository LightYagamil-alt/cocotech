import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, ArrowUpRight, Sparkles, Code2, Palette, Film, Image as ImageIcon, Bot } from "lucide-react";
import studioImage from "@/assets/studio-editorial.jpg";
import { Button } from "@/components/ui/button";
import pBoutique from "@/assets/project-boutique.jpg";
import pCoffee from "@/assets/project-coffee.jpg";
import pFestival from "@/assets/project-festival.jpg";
import pSkincare from "@/assets/project-skincare.jpg";
import pRealestate from "@/assets/project-realestate.jpg";
import pFitness from "@/assets/project-fitness.jpg";
import assistantLogo from "@/assets/assistant-logo.png";
import inkCloudAsset from "@/assets/coco-ink-restored.mp4.asset.json";
import inkCloudWebmAsset from "@/assets/coco-ink-restored.webm.asset.json";
import inkCloudPoster from "@/assets/coco-ink-poster.jpg.asset.json";
import { ChatBubble } from "@/components/ChatBubble";
import { InkVideo } from "@/components/InkVideo";


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
 return <div>
  <section className="studio-hero relative isolate flex items-center overflow-hidden bg-image-ground text-on-image">
   <img src={studioImage} alt="Creative studio workspace with design studies and a blue paper sculpture" width={1536} height={1024} fetchPriority="high" className="absolute inset-0 -z-20 h-full w-full object-cover"/>
   <div className="image-scrim absolute inset-0 -z-10" aria-hidden/>
   <div className="mx-auto w-full max-w-[1440px] px-6 py-16 md:px-10 md:py-24">
    <p className="mb-7 text-xs text-image-muted">COCO TECH / CREATIVE TECHNOLOGY STUDIO</p>
    <h1 className="hero-title max-w-3xl font-display">Coco Tech<span className="text-brand">.</span></h1>
    <p className="mt-5 font-display text-4xl md:text-5xl">Creativity meets <em>technology.</em></p>
    <p className="mt-7 max-w-md text-base leading-relaxed text-image-muted">A small studio in Kampala building websites, campaigns and film for brands that want to feel established from day one.</p>
    <div className="mt-9 flex flex-wrap gap-3"><Button asChild size="lg"><Link to="/contact">Start a project <ArrowUpRight/></Link></Button><Button asChild variant="outline" size="lg" className="border-on-image/40 bg-transparent text-on-image hover:bg-on-image/10 hover:text-on-image"><Link to="/portfolio">See the work <ArrowRight/></Link></Button></div>
   </div>
  </section>
  <div className="border-b border-border"><div className="mx-auto flex max-w-[1440px] flex-wrap justify-between gap-3 px-6 py-5 text-xs text-muted-foreground md:px-10"><span>Independent studio · Kampala, Uganda</span><span>Websites / Branding / Social / Posters / Video</span></div></div>
  <section className="mx-auto max-w-[1440px] px-6 py-20 md:px-10 md:py-28">
   <div className="grid gap-10 lg:grid-cols-[1fr_1.7fr]"><div><p className="text-xs text-brand">01 / WHAT WE DO</p><h2 className="section-title mt-5">A studio,<br/><em className="text-muted-foreground">not a factory.</em></h2><p className="mt-6 max-w-sm text-sm leading-relaxed text-muted-foreground">Four disciplines, one small team. We take fewer projects on purpose — so each one gets the craft it deserves.</p></div>
    <ol className="divide-y divide-border border-y border-border">{services.map(s=><li key={s.n} className="grid grid-cols-[24px_minmax(0,1fr)_24px] gap-4 py-7 md:gap-8"><span className="pt-2 text-xs text-muted-foreground">{s.n}</span><div><h3 className="text-3xl md:text-4xl">{s.title}</h3><p className="mt-2 max-w-lg text-sm leading-relaxed text-muted-foreground">{s.desc}</p></div><Link to="/services" aria-label={`Explore ${s.title}`} className="pt-2 text-brand"><ArrowUpRight size={20}/></Link></li>)}</ol>
   </div><div className="mt-8 flex justify-end"><Button asChild variant="link"><Link to="/services">Every service in detail <ArrowRight/></Link></Button></div>
  </section>
  <section className="border-y border-border bg-secondary/40"><div className="mx-auto max-w-[1440px] px-6 py-20 md:px-10 md:py-28"><div className="grid grid-cols-[minmax(0,1fr)_auto] items-end gap-4"><div><p className="text-xs text-brand">02 / SELECTED WORK</p><h2 className="section-title mt-5">Design, in the real world.</h2></div><Link to="/portfolio" aria-label="View portfolio" className="mb-2 text-brand"><ArrowUpRight size={28}/></Link></div>
   <div className="mt-12 grid items-start gap-x-8 gap-y-12 md:grid-cols-2">{projects.map((w,i)=><article key={w.title} className={i%2 ? "md:pt-20" : ""}><Link to="/portfolio" className="group block"><div className={`overflow-hidden bg-card ${i%3===0 ? "aspect-[5/4]" : "aspect-[4/3]"}`}><img src={w.img} alt={w.title} loading="lazy" decoding="async" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"/></div><div className="mt-4 grid grid-cols-[minmax(0,1fr)_auto] gap-4"><div><h3 className="text-3xl">{w.title}</h3><p className="mt-1 text-xs text-muted-foreground">{w.tag} · {w.client}</p></div><ArrowUpRight size={20} className="mt-2 text-muted-foreground"/></div></Link></article>)}</div>
  </div></section>
  <section className="mx-auto max-w-[1440px] px-6 py-20 md:px-10 md:py-28"><div className="grid gap-12 lg:grid-cols-[1.2fr_1fr]"><div><p className="text-xs text-brand">03 / THE COCO CODE</p><h2 className="section-title mt-5 max-w-xl">We treat every brief like a <em>first date.</em></h2><p className="mt-6 max-w-md text-sm leading-relaxed text-muted-foreground">Curious. Attentive. A little nervous in the best way. Four rules keep us honest — every project, every time.</p></div><div className="divide-y divide-border border-t border-border">{manifesto.map(m=><div key={m.n} className="grid grid-cols-[24px_minmax(0,1fr)] gap-5 py-6"><span className="pt-1 text-xs text-brand">{m.n}</span><div><h3 className="text-3xl">{m.title}</h3><p className="mt-2 text-sm text-muted-foreground">{m.text}</p></div></div>)}</div></div></section>
  <section className="relative isolate overflow-hidden bg-image-ground text-on-image" aria-label="Coco AI"><InkVideo src={inkCloudAsset.url} fallbackSrc={inkCloudWebmAsset.url} poster={inkCloudPoster.url} className="absolute inset-0 -z-20"/><div className="coco-ink-home-scrim absolute inset-0 -z-10" aria-hidden/><div className="mx-auto grid max-w-[1440px] items-center gap-10 px-6 py-20 md:grid-cols-[1.5fr_1fr] md:px-10 md:py-24"><div><p className="text-xs text-image-muted">04 / YOUR CREATIVE CO-PILOT</p><h2 className="section-title mt-5">Meet <em>Coco.</em></h2><p className="mt-5 max-w-lg text-base leading-relaxed text-image-muted">Ask about our services, explore an idea, or brief the studio before you finish your coffee.</p><Button asChild size="lg" className="mt-8"><Link to="/chat">Talk to Coco <ArrowUpRight/></Link></Button></div><img src={assistantLogo} alt="Coco AI" loading="lazy" className="mx-auto h-40 w-40 object-contain md:h-56 md:w-56"/></div></section>
  <section className="mx-auto max-w-[1440px] px-6 py-20 md:px-10 md:py-28"><p className="text-xs text-brand">05 / LET'S BUILD</p><div className="mt-5 grid items-end gap-8 md:grid-cols-[1.5fr_1fr]"><h2 className="section-title">Let's make it<br/><em>happen together.</em></h2><div><p className="max-w-sm text-sm leading-relaxed text-muted-foreground">We thrive on bold ideas and small-brand stories. Ready to create something people actually remember?</p><Button asChild size="lg" className="mt-6"><Link to="/contact">Get started today <ArrowUpRight/></Link></Button></div></div></section>
  <ChatBubble/>
 </div>;
}
