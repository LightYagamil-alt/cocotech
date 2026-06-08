const logos = [
  "Boutique Co.", "Sahara Roast", "Lumen Studio", "Pulse FM", "North & Co",
  "Kibo Eats", "Atlas Build", "Halo Skincare", "Drift Travel", "Mango & Co",
];

export function ClientMarquee() {
  const row = [...logos, ...logos];
  return (
    <section className="relative overflow-hidden border-y border-border bg-card/30 py-10">
      <p className="mx-auto mb-6 max-w-7xl px-6 text-center text-xs uppercase tracking-[0.3em] text-muted-foreground">
        Trusted by founders building the next wave
      </p>
      <div className="relative">
        <div className="flex w-max animate-marquee gap-14 whitespace-nowrap px-6 text-2xl font-display font-semibold tracking-tight text-muted-foreground md:text-3xl">
          {row.map((name, i) => (
            <span key={i} className="opacity-60 transition-opacity hover:opacity-100">
              {name}
            </span>
          ))}
        </div>
        <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-background to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-background to-transparent" />
      </div>
    </section>
  );
}
