import { createFileRoute } from "@tanstack/react-router";
import { Phone, Mail, MapPin, Send, Camera, ThumbsUp, Bird } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Coco Tech" },
      { name: "description", content: "Reach Coco Tech for websites, social media design and video editing. Phone +256 785 852378." },
      { property: "og:title", content: "Contact — Coco Tech" },
      { property: "og:description", content: "Let's build something great together." },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  const [sent, setSent] = useState(false);

  return (
    <div className="mx-auto max-w-7xl px-6 py-24">
      <p className="text-sm uppercase tracking-widest text-brand">Contact</p>
      <h1 className="mt-2 max-w-3xl text-5xl font-bold md:text-6xl">Let's make <span className="text-gradient">something</span>.</h1>
      <p className="mt-4 max-w-2xl text-muted-foreground">Tell us about your project — we usually reply within a few hours.</p>

      <div className="mt-12 grid gap-10 md:grid-cols-[1fr_1.2fr]">
        <div className="space-y-4">
          <a href="tel:+256785852378" className="flex items-start gap-4 rounded-2xl border border-border bg-card p-5 transition-colors hover:border-brand/60">
            <div className="rounded-xl bg-gradient-brand p-3 text-primary-foreground"><Phone size={18}/></div>
            <div>
              <p className="text-xs uppercase tracking-widest text-muted-foreground">Phone</p>
              <p className="mt-1 font-semibold">+256 785 852378</p>
              <p className="mt-1 font-semibold">+256 742 011601</p>
            </div>
          </a>
          <a href="mailto:hello@cocotech.co" className="flex items-start gap-4 rounded-2xl border border-border bg-card p-5 transition-colors hover:border-brand/60">
            <div className="rounded-xl bg-gradient-brand p-3 text-primary-foreground"><Mail size={18}/></div>
            <div>
              <p className="text-xs uppercase tracking-widest text-muted-foreground">Email</p>
              <p className="mt-1 font-semibold">hello@cocotech.co</p>
            </div>
          </a>
          <div className="flex items-start gap-4 rounded-2xl border border-border bg-card p-5">
            <div className="rounded-xl bg-gradient-brand p-3 text-primary-foreground"><MapPin size={18}/></div>
            <div>
              <p className="text-xs uppercase tracking-widest text-muted-foreground">Based in</p>
              <p className="mt-1 font-semibold">Kampala, Uganda</p>
            </div>
          </div>
          <div className="flex gap-3 pt-2">
            <a href="#" aria-label="Instagram" className="rounded-full bg-secondary p-3 hover:bg-accent/30"><Camera size={18}/></a>
            <a href="#" aria-label="Facebook" className="rounded-full bg-secondary p-3 hover:bg-accent/30"><ThumbsUp size={18}/></a>
            <a href="#" aria-label="Twitter" className="rounded-full bg-secondary p-3 hover:bg-accent/30"><Bird size={18}/></a>
          </div>
        </div>

        <form
          onSubmit={(e) => { e.preventDefault(); setSent(true); }}
          className="rounded-3xl border border-border bg-card p-8"
        >
          {sent ? (
            <div className="flex h-full min-h-[300px] flex-col items-center justify-center text-center">
              <div className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-full bg-gradient-brand text-primary-foreground shadow-glow">
                <Send size={22}/>
              </div>
              <h3 className="text-2xl font-bold">Message sent!</h3>
              <p className="mt-2 text-muted-foreground">We'll get back to you soon.</p>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Your name" name="name" required />
                <Field label="Email" name="email" type="email" required />
              </div>
              <Field label="Service of interest" name="service" placeholder="Website, social, video..." />
              <div>
                <label className="text-sm font-medium">Tell us about your project</label>
                <textarea
                  required rows={5} name="message"
                  className="mt-1 w-full rounded-xl border border-border bg-input/40 px-4 py-3 text-sm outline-none transition-colors focus:border-brand focus:ring-brand"
                  placeholder="A few sentences is enough..."
                />
              </div>
              <button type="submit" className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-brand px-6 py-3 font-semibold text-primary-foreground shadow-glow transition-transform hover:scale-[1.02]">
                Send message <Send size={16}/>
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}

function Field({ label, ...props }: React.InputHTMLAttributes<HTMLInputElement> & { label: string }) {
  return (
    <div>
      <label className="text-sm font-medium">{label}</label>
      <input
        {...props}
        className="mt-1 w-full rounded-xl border border-border bg-input/40 px-4 py-3 text-sm outline-none transition-colors focus:border-brand"
      />
    </div>
  );
}
