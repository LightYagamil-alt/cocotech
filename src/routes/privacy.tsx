import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { title: "Privacy Policy — Coco Tech" },
      { name: "description", content: "How Coco Tech collects, uses and protects your information." },
      { property: "og:title", content: "Privacy Policy — Coco Tech" },
      { property: "og:description", content: "Our commitment to your privacy and data." },
    ],
  }),
  component: PrivacyPage,
});

function PrivacyPage() {
  return (
    <article className="mx-auto max-w-3xl px-6 py-20">
      <p className="text-sm uppercase tracking-widest text-brand">Legal</p>
      <h1 className="mt-2 font-display text-4xl font-bold md:text-5xl">Privacy Policy</h1>
      <p className="mt-2 text-sm text-muted-foreground">Last updated: {new Date().toLocaleDateString()}</p>

      <div className="prose prose-invert mt-10 max-w-none space-y-6 text-sm leading-relaxed text-muted-foreground">
        <section>
          <h2 className="text-lg font-semibold text-foreground">1. Information we collect</h2>
          <p>When you contact us or use Coco (our AI assistant), we may collect your name, email, phone number, project details, and conversation history stored locally in your browser.</p>
        </section>
        <section>
          <h2 className="text-lg font-semibold text-foreground">2. How we use it</h2>
          <p>We use your information to respond to enquiries, send project quotes, and improve our services. We never sell your data.</p>
        </section>
        <section>
          <h2 className="text-lg font-semibold text-foreground">3. Chat history</h2>
          <p>Conversations with Coco are stored in your browser's local storage and are not uploaded to our servers unless you contact us directly.</p>
        </section>
        <section>
          <h2 className="text-lg font-semibold text-foreground">4. Cookies</h2>
          <p>We use minimal local storage for theme preferences and chat history. We do not use third-party tracking cookies.</p>
        </section>
        <section>
          <h2 className="text-lg font-semibold text-foreground">5. Contact</h2>
          <p>Questions? Email <a className="text-brand hover:underline" href="mailto:hello@cocotech.co">hello@cocotech.co</a>.</p>
        </section>
      </div>
    </article>
  );
}
