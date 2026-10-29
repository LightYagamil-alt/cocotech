import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";
import { createThreadId } from "@/lib/chat-storage";
import assistantLogo from "@/assets/assistant-logo.png";

export const Route = createFileRoute("/chat/")({
  head: () => ({
    meta: [
      { title: "Coco AI — Start a Conversation | Coco Tech" },
      { name: "description", content: "Start a conversation with Coco about websites, social media design, posters and video projects." },
      { property: "og:title", content: "Coco AI — Start a Conversation | Coco Tech" },
      { property: "og:description", content: "Start a conversation with Coco about websites, social media design, posters and video projects." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ChatIndex,
});

const suggestions = [
  "I need a website for my bakery — where do we start?",
  "Can you redesign my Instagram feed?",
  "Edit a 30-second reel for my brand launch.",
  "What does a typical project cost?",
];

function ChatIndex() {
  const navigate = useNavigate();

  function startChat(prompt?: string) {
    const id = createThreadId();
    navigate({
      to: "/chat/$threadId",
      params: { threadId: id },
      search: prompt ? { q: prompt } : undefined,
    });
  }

  return (
    <div className="flex h-full flex-col items-center justify-center overflow-y-auto px-4 py-6 text-center">
      <img src={assistantLogo} alt="Coco assistant" className="h-16 w-16 " />
      <p className="mt-3 inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs text-muted-foreground">
        <Sparkles size={12} className="text-brand" /> Powered by AI
      </p>
      <h1 className="mt-4 font-display text-4xl md:text-5xl">
        Hi, I'm <span className="text-gradient">Coco</span>.
      </h1>
      <p className="mt-3 max-w-md text-sm leading-relaxed text-muted-foreground">
        Ask me anything about our websites, social media design or video editing — or get help scoping your next project.
      </p>
      <Button
        onClick={() => startChat()}
        className="mt-5"
      >
        Start a conversation
      </Button>
      <div className="mt-6 grid w-full max-w-xl gap-2 sm:grid-cols-2">
        {suggestions.map((s) => (
          <Button
            key={s}
            onClick={() => startChat(s)}
            className="h-auto whitespace-normal rounded-md border border-border bg-background px-3 py-2 text-left text-xs leading-relaxed text-muted-foreground hover:bg-secondary hover:text-foreground"
          >
            {s}
          </Button>
        ))}
      </div>
    </div>
  );
}
