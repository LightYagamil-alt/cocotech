import { Link } from "@tanstack/react-router";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger, SheetClose } from "@/components/ui/sheet";
import { Menu, ArrowUpRight } from "lucide-react";
import cocoLogo from "@/assets/coco-logo.png";
const links = [
 { to: "/", label: "Home" }, { to: "/about", label: "About" }, { to: "/services", label: "Services" },
 { to: "/portfolio", label: "Portfolio" }, { to: "/chat", label: "Coco AI" }, { to: "/contact", label: "Contact" },
] as const;
export function SiteHeader() {
 return <header className="site-header nav-glass sticky top-0 z-40 flex items-center">
  <div className="mx-auto grid w-full max-w-[1440px] grid-cols-[minmax(0,1fr)_auto] items-center gap-5 px-5 md:flex md:justify-between md:px-10">
   <Link to="/" className="flex min-w-0 items-center gap-2 font-sans text-lg font-semibold"><img src={cocoLogo} alt="" className="h-9 w-9 shrink-0 object-contain"/><span className="truncate">Coco Tech<span className="text-brand">.</span></span></Link>
   <nav aria-label="Main navigation" className="hidden items-center gap-7 text-sm lg:flex">{links.slice(1).map(l=><Link key={l.to} to={l.to} preload="intent" className="text-muted-foreground hover:text-foreground" activeProps={{className:"text-foreground underline underline-offset-8"}}>{l.label}</Link>)}</nav>
   <div className="flex shrink-0 items-center gap-2"><ThemeToggle/><Button asChild variant="outline" className="hidden sm:inline-flex"><Link to="/contact">Let's talk <ArrowUpRight/></Link></Button>
    <Sheet><SheetTrigger asChild><Button variant="ghost" size="icon" aria-label="Open menu" title="Site menu" className="lg:hidden"><Menu/></Button></SheetTrigger>
     <SheetContent side="right" className="w-[min(360px,100vw)] bg-background px-7 pt-16"><SheetHeader><SheetTitle className="text-left font-sans text-sm">Coco Tech — Menu</SheetTitle></SheetHeader><nav aria-label="Mobile navigation" className="mt-10 flex flex-col gap-6">{links.map((l,i)=><SheetClose asChild key={l.to}><Link to={l.to} className="flex items-baseline gap-4 text-4xl font-display"><span className="text-xs font-sans text-muted-foreground">0{i+1}</span>{l.label}</Link></SheetClose>)}</nav><p className="mt-12 border-t border-border pt-6 text-sm text-muted-foreground">Kampala · Uganda</p></SheetContent>
    </Sheet>
   </div>
  </div>
 </header>;
}
