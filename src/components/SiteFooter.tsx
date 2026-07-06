import { Link } from "@tanstack/react-router";
import { Camera, ThumbsUp, Bird, Phone, Mail } from "lucide-react";
import cocoLogo from "@/assets/coco-logo.png";

export function SiteFooter() {
  return (
    <footer className="relative isolate mt-24 overflow-hidden border-t border-border text-white">
      {/* Live nebula background */}
      <div className="absolute inset-0 -z-10">
        <div className="glow-lamp" aria-hidden />
        <div className="absolute inset-0 bg-black/82" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,transparent,rgba(0,0,0,0.46))]" aria-hidden />
      </div>

      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-16 md:grid-cols-5">
        <div className="md:col-span-2">
          <div className="flex items-center gap-2 font-display text-lg font-bold">
            <img src={cocoLogo} alt="Coco Tech" className="h-10 w-10 object-contain drop-shadow-[0_2px_12px_rgba(168,85,247,0.7)]" />
            Coco<span className="text-aurora">Tech</span>
          </div>
          <p className="mt-4 max-w-sm text-sm text-white/70">
            Creativity meets technology. Websites, social media design, posters and
            video editing for ambitious brands across East Africa.
          </p>
          <div className="mt-6 flex gap-3">
            <a href="#" aria-label="Instagram" className="rounded-full border border-white/20 bg-white/10 p-2.5 backdrop-blur transition hover:bg-white/20"><Camera size={16}/></a>
            <a href="#" aria-label="Facebook" className="rounded-full border border-white/20 bg-white/10 p-2.5 backdrop-blur transition hover:bg-white/20"><ThumbsUp size={16}/></a>
            <a href="#" aria-label="Twitter" className="rounded-full border border-white/20 bg-white/10 p-2.5 backdrop-blur transition hover:bg-white/20"><Bird size={16}/></a>
          </div>
        </div>

        <div>
          <h4 className="text-sm font-semibold uppercase tracking-widest text-white/60">Quick Links</h4>
          <ul className="mt-4 space-y-3 text-sm">
            <li><Link to="/" className="text-white/80 hover:text-white">Home</Link></li>
            <li><Link to="/about" className="text-white/80 hover:text-white">About</Link></li>
            <li><Link to="/services" className="text-white/80 hover:text-white">Services</Link></li>
            <li><Link to="/portfolio" className="text-white/80 hover:text-white">Work</Link></li>
            <li><Link to="/chat" className="text-white/80 hover:text-white">Coco AI</Link></li>
            <li><Link to="/contact" className="text-white/80 hover:text-white">Contact</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold uppercase tracking-widest text-white/60">Resources</h4>
          <ul className="mt-4 space-y-3 text-sm">
            <li><Link to="/portfolio" className="text-white/80 hover:text-white">Case Studies</Link></li>
            <li><Link to="/about" className="text-white/80 hover:text-white">Our Process</Link></li>
            <li><Link to="/contact" className="text-white/80 hover:text-white">Get a Quote</Link></li>
            <li><Link to="/services" className="text-white/80 hover:text-white">What's Included</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold uppercase tracking-widest text-white/60">Get in touch</h4>
          <ul className="mt-4 space-y-3 text-sm text-white/80">
            <li className="flex items-center gap-2"><Phone size={14}/><span>+256 785 852378</span></li>
            <li className="flex items-center gap-2"><Phone size={14}/><span>+256 742 011601</span></li>
            <li className="flex items-center gap-2"><Mail size={14}/><span>hello@cocotech.co</span></li>
          </ul>
        </div>
      </div>

      <div className="relative flex flex-col items-center justify-between gap-2 border-t border-white/10 px-6 py-6 text-center text-xs text-white/60 md:flex-row">
        <p>© {new Date().getFullYear()} Coco Tech. Crafted with care in Uganda.</p>
        <div className="flex gap-4">
          <Link to="/privacy" className="hover:text-white">Privacy Policy</Link>
          <Link to="/terms" className="hover:text-white">Terms</Link>
        </div>
      </div>
    </footer>
  );
}
