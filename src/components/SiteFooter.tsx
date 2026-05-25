import { Link } from "@tanstack/react-router";
import { Camera, ThumbsUp, Bird, Phone, Mail } from "lucide-react";

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-border bg-card/40">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-14 md:grid-cols-4">
        <div className="md:col-span-2">
          <div className="flex items-center gap-2 font-display text-lg font-bold">
            <span className="inline-block h-8 w-8 rounded-lg bg-gradient-brand" />
            Coco<span className="text-gradient">Tech</span>
          </div>
          <p className="mt-3 max-w-sm text-sm text-muted-foreground">
            Creativity meets technology. Websites, social media design and video
            editing for ambitious small businesses.
          </p>
        </div>

        <div>
          <h4 className="text-sm font-semibold">Explore</h4>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            <li><Link to="/about" className="hover:text-foreground">About</Link></li>
            <li><Link to="/services" className="hover:text-foreground">Services</Link></li>
            <li><Link to="/portfolio" className="hover:text-foreground">Portfolio</Link></li>
            <li><Link to="/contact" className="hover:text-foreground">Contact</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold">Get in touch</h4>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            <li className="flex items-center gap-2"><Phone size={14}/> +256 785 852378</li>
            <li className="flex items-center gap-2"><Mail size={14}/> hello@cocotech.co</li>
          </ul>
          <div className="mt-4 flex gap-3">
            <a href="#" aria-label="Instagram" className="rounded-full bg-secondary p-2 hover:bg-accent/30"><Camera size={16}/></a>
            <a href="#" aria-label="Facebook" className="rounded-full bg-secondary p-2 hover:bg-accent/30"><ThumbsUp size={16}/></a>
            <a href="#" aria-label="Twitter" className="rounded-full bg-secondary p-2 hover:bg-accent/30"><Bird size={16}/></a>
          </div>
        </div>
      </div>
      <div className="border-t border-border py-5 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} Coco Tech. Crafted with care in Uganda.
      </div>
    </footer>
  );
}
