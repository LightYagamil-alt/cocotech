import { Link } from "@tanstack/react-router";
import { Camera, ThumbsUp, Bird, Phone, Mail } from "lucide-react";
import cocoLogo from "@/assets/coco-logo.png";

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-secondary/40 text-foreground">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-16 md:grid-cols-5">
        <div className="md:col-span-2">
          <div className="flex items-center gap-2 font-display text-lg font-bold">
            <img src={cocoLogo} alt="Coco Tech" className="h-10 w-10 object-contain " />
            Coco<span className="text-aurora">Tech</span>
          </div>
          <p className="mt-4 max-w-sm text-sm text-foreground/70">
            Creativity meets technology. Websites, social media design, posters and
            video editing for ambitious brands across East Africa.
          </p>
          <div className="mt-6 flex gap-3">
            <a href="#" aria-label="Instagram" className="rounded-md border border-border/20 bg-secondary/10 p-2.5 transition hover:bg-secondary/20"><Camera size={16}/></a>
            <a href="#" aria-label="Facebook" className="rounded-md border border-border/20 bg-secondary/10 p-2.5 transition hover:bg-secondary/20"><ThumbsUp size={16}/></a>
            <a href="#" aria-label="Twitter" className="rounded-md border border-border/20 bg-secondary/10 p-2.5 transition hover:bg-secondary/20"><Bird size={16}/></a>
          </div>
        </div>

        <div>
          <h4 className="text-sm font-semibold uppercase tracking-widest text-foreground/60">Quick Links</h4>
          <ul className="mt-4 space-y-3 text-sm">
            <li><Link to="/" className="text-foreground/80 hover:text-foreground">Home</Link></li>
            <li><Link to="/about" className="text-foreground/80 hover:text-foreground">About</Link></li>
            <li><Link to="/services" className="text-foreground/80 hover:text-foreground">Services</Link></li>
            <li><Link to="/portfolio" className="text-foreground/80 hover:text-foreground">Work</Link></li>
            <li><Link to="/chat" className="text-foreground/80 hover:text-foreground">Coco AI</Link></li>
            <li><Link to="/contact" className="text-foreground/80 hover:text-foreground">Contact</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold uppercase tracking-widest text-foreground/60">Resources</h4>
          <ul className="mt-4 space-y-3 text-sm">
            <li><Link to="/portfolio" className="text-foreground/80 hover:text-foreground">Case Studies</Link></li>
            <li><Link to="/about" className="text-foreground/80 hover:text-foreground">Our Process</Link></li>
            <li><Link to="/contact" className="text-foreground/80 hover:text-foreground">Get a Quote</Link></li>
            <li><Link to="/services" className="text-foreground/80 hover:text-foreground">What's Included</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold uppercase tracking-widest text-foreground/60">Get in touch</h4>
          <ul className="mt-4 space-y-3 text-sm text-foreground/80">
            <li className="flex items-center gap-2"><Phone size={14}/><span>+256 785 852378</span></li>
            <li className="flex items-center gap-2"><Phone size={14}/><span>+256 742 011601</span></li>
            <li className="flex items-center gap-2"><Mail size={14}/><span>hello@cocotech.co</span></li>
          </ul>
        </div>
      </div>

      <div className="relative flex flex-col items-center justify-between gap-2 border-t border-border/10 px-6 py-6 text-center text-xs text-foreground/60 md:flex-row">
        <p>© {new Date().getFullYear()} Coco Tech. Crafted with care in Uganda.</p>
        <div className="flex gap-4">
          <Link to="/privacy" className="hover:text-foreground">Privacy Policy</Link>
          <Link to="/terms" className="hover:text-foreground">Terms</Link>
        </div>
      </div>
    </footer>
  );
}
