import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Terms of Service — Coco Tech" },
      { name: "description", content: "Terms governing the use of Coco Tech services and website." },
      { property: "og:title", content: "Terms of Service — Coco Tech" },
      { property: "og:description", content: "The rules of engagement for working with Coco Tech." },
    ],
  }),
  component: TermsPage,
});

function TermsPage() {
  return (
    <article className="mx-auto max-w-3xl px-6 py-20">
      <p className="text-sm uppercase tracking-widest text-brand">Legal</p>
      <h1 className="mt-2 font-display text-4xl font-bold md:text-5xl">Terms of Service</h1>
      <p className="mt-2 text-sm text-muted-foreground">Last updated: {new Date().toLocaleDateString()}</p>

      <div className="prose prose-invert mt-10 max-w-none space-y-6 text-sm leading-relaxed text-muted-foreground">
        <section>
          <h2 className="text-lg font-semibold text-foreground">1. Services</h2>
          <p>Coco Tech provides website creation, social media design, video editing, and poster design services. Scope, timeline and price are agreed in writing per project.</p>
        </section>
        <section>
          <h2 className="text-lg font-semibold text-foreground">2. Quotes & payments</h2>
          <p>Free quotes are non-binding for 30 days. A 50% deposit may be required to begin work; the balance is due on delivery unless otherwise agreed.</p>
        </section>
        <section>
          <h2 className="text-lg font-semibold text-foreground">3. Revisions & ownership</h2>
          <p>Each package includes a defined number of revisions. Ownership of final deliverables transfers upon full payment.</p>
        </section>
        <section>
          <h2 className="text-lg font-semibold text-foreground">4. AI assistant</h2>
          <p>Coco (our AI assistant) provides general guidance and is not a substitute for a formal quote or professional advice. Quotes are only valid when confirmed by a human team member.</p>
        </section>
        <section>
          <h2 className="text-lg font-semibold text-foreground">5. Liability</h2>
          <p>We are not liable for indirect or consequential damages. Our maximum liability is limited to the fees paid for the project in question.</p>
        </section>
        <section>
          <h2 className="text-lg font-semibold text-foreground">6. Contact</h2>
          <p>For questions, email <a className="text-brand hover:underline" href="mailto:hello@cocotech.co">hello@cocotech.co</a>.</p>
        </section>
      </div>
    </article>
  );
}
