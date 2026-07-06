import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ThemeToggle } from "@/components/ThemeToggle";
import cocoLogo from "@/assets/coco-logo.png";

const links = [
  { to: "/", label: "Home", n: "01" },
  { to: "/about", label: "About", n: "02" },
  { to: "/services", label: "Services", n: "03" },
  { to: "/portfolio", label: "Portfolio", n: "04" },
  { to: "/chat", label: "AI Assistant", n: "05" },
  { to: "/contact", label: "Contact", n: "06" },
] as const;

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  // Lock body scroll while overlay is open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <>
      <header className="sticky top-0 z-50 glass">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-6 py-4">
          <Link to="/" className="flex items-center gap-2 font-display text-lg font-bold" onClick={() => setOpen(false)}>
            <img src={cocoLogo} alt="Coco Tech" className="h-9 w-9 object-contain drop-shadow-[0_2px_8px_rgba(168,85,247,0.4)]" />
            <span>Coco<span className="text-gradient"> Tech</span></span>
          </Link>

          {/* Inline nav — visible on desktop for quick access */}
          <nav className="hidden lg:flex items-center gap-1 text-sm">
            {links.slice(1).map((l) => (
              <Link
                key={l.to}
                to={l.to}
                preload="intent"
                activeOptions={{ exact: l.to === "/" }}
                className="rounded-full px-3 py-1.5 text-foreground/75 transition-colors hover:text-foreground hover:bg-foreground/5"
                activeProps={{ className: "text-foreground bg-foreground/8" }}
              >
                {l.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2 md:gap-3">
            <Link
              to="/contact"
              preload="intent"
              className="hidden rounded-full bg-gradient-brand px-5 py-2 text-sm font-semibold text-primary-foreground shadow-glow transition-transform hover:scale-[1.03] active:scale-[0.98] md:inline-block"
            >
              Get a Quote
            </Link>
            <ThemeToggle />
            <button
              onClick={() => setOpen((o) => !o)}
              className="relative z-[60] rounded-md p-2 text-foreground lg:hidden"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
            >
              <span className={`hamburger ${open ? "is-open" : ""}`} aria-hidden>
                <span /><span /><span />
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Full-screen overlay menu */}
      <div
        className={`fixed inset-0 z-40 transition-opacity duration-500 ${open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
        aria-hidden={!open}
      >
        <div className="absolute inset-0 bg-[#070817]">
          <div className="glow-lamp absolute inset-0 opacity-60" aria-hidden />
          <div className="absolute inset-0 bg-black/40" aria-hidden />
        </div>

        <nav className="relative flex h-full flex-col justify-center px-6 pt-24 md:px-16">
          <p className="mb-8 text-[10px] uppercase tracking-[0.32em] text-white/50">Menu</p>
          <ul className="space-y-2 md:space-y-4">
            {links.map((l, i) => (
              <li key={l.to} className="overflow-hidden">
                <Link
                  to={l.to}
                  onClick={() => setOpen(false)}
                  className={`group flex items-baseline gap-4 font-display font-black leading-[0.95] text-white transition-transform duration-500 hover:translate-x-3 ${open ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"}`}
                  style={{ transitionDelay: open ? `${120 + i * 60}ms` : "0ms" }}
                  activeOptions={{ exact: l.to === "/" }}
                  activeProps={{ className: "text-aurora" }}
                >
                  <span className="font-mono text-xs font-normal text-white/40">{l.n}</span>
                  <span className="text-4xl tracking-tight md:text-7xl">{l.label}</span>
                </Link>
              </li>
            ))}
          </ul>

          <div className="mt-14 flex flex-wrap items-center gap-6 text-sm text-white/60">
            <span>Kampala · Uganda</span>
            <span className="h-4 w-px bg-white/20" />
            <a href="mailto:hello@cocotech.co" className="hover:text-white">hello@cocotech.co</a>
          </div>
        </nav>
      </div>
    </>
  );
}
