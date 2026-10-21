import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { Sparkles } from "lucide-react";
import { createThreadId } from "@/lib/chat-storage";
import assistantLogo from "@/assets/assistant-logo.png";

export const Route = createFileRoute("/chat/")({
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

  // Auto-redirect users landing on /chat with no thread into a fresh one only
  // if they click — keep this as an inviting landing page by default.
  useEffect(() => {
    // No auto-redirect logic needed here as per design requirements
  }, []);

  return (
    <div className="flex h-full flex-col items-center justify-center px-6 py-16 text-center">
      <img src={assistantLogo} alt="Coco assistant" className="h-16 w-16 animate-float" />
      <p className="glass-chip mt-4 inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs text-muted-foreground">
        <Sparkles size={12} className="text-brand" /> Powered by AI
      </p>
      <h1 className="mt-4 font-display text-3xl font-bold md:text-5xl">
        Hi, I'm <span className="text-gradient">Coco</span>.
      </h1>
      <p className="mt-3 max-w-md text-muted-foreground">
        Ask me anything about our websites, social media design or video editing — or get help scoping your next project.
      </p>
      <button
        onClick={() => startChat()}
        className="mt-6 rounded-full bg-gradient-brand px-6 py-3 text-sm font-semibold text-primary-foreground shadow-glow transition-transform hover:scale-105"
      >
        Start a conversation
      </button>
      <div className="mt-8 grid w-full max-w-2xl gap-2 sm:grid-cols-2">
        {suggestions.map((s) => (
          <button
            key={s}
            onClick={() => startChat(s)}
            className="glass-chip rounded-xl px-4 py-3 text-left text-sm text-muted-foreground transition-all hover:-translate-y-0.5 hover:border-brand/50 hover:text-foreground"
          >
            {s}
          </button>
        ))}
      </div>
    </div>
  );
}
