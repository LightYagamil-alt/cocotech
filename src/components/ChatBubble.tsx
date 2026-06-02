import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { X, Sparkles, ArrowRight } from "lucide-react";
import assistantLogo from "@/assets/assistant-logo.png";
import { createThreadId } from "@/lib/chat-storage";

const suggestions = [
  "Build me a website",
  "Redesign my socials",
  "Edit a launch reel",
];

export function ChatBubble() {
  const [open, setOpen] = useState(false);
  const [nudge, setNudge] = useState(false);
  const [threadId] = useState(() => createThreadId());

  // Greeting nudge appears after ~2.5s and lingers ~4s (once per session)
  useEffect(() => {
    const seen = sessionStorage.getItem("cocotech.bubble.nudged");
    if (seen) return;
    const t = setTimeout(() => {
      setNudge(true);
      sessionStorage.setItem("cocotech.bubble.nudged", "1");
      setTimeout(() => setNudge(false), 4000);
    }, 2500);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="pointer-events-none fixed bottom-4 right-4 z-50 flex flex-col items-end gap-3 md:bottom-6 md:right-6">
      {/* Greeting nudge */}
      {nudge && !open && (
        <div className="pointer-events-auto max-w-[16rem] animate-fade-up rounded-2xl rounded-br-sm border border-border bg-card px-3 py-2 text-xs shadow-glow">
          <span className="text-foreground">Hi, I'm Coco 👋 — here to help with anything you need.</span>
        </div>
      )}

      {/* Expanded card */}
      {open && (
        <div className="pointer-events-auto w-[min(20rem,calc(100vw-2rem))] origin-bottom-right animate-fade-up overflow-hidden rounded-2xl border border-border bg-card shadow-glow">
          <div className="flex items-center gap-3 border-b border-border bg-gradient-brand/10 p-4">
            <img src={assistantLogo} alt="" className="h-10 w-10" />
            <div className="flex-1">
              <p className="text-sm font-semibold">Coco</p>
              <p className="flex items-center gap-1 text-xs text-muted-foreground">
                <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-400" />
                Online · usually replies instantly
              </p>
            </div>
            <button
              onClick={() => setOpen(false)}
              aria-label="Close"
              className="rounded-md p-1 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
            >
              <X size={16} />
            </button>
          </div>
          <div className="p-4">
            <p className="inline-flex items-center gap-1 text-xs text-brand">
              <Sparkles size={12} /> Powered by AI
            </p>
            <p className="mt-2 text-sm text-foreground">
              Hi! I'm Coco — ask about websites, social design or video editing.
            </p>
            <div className="mt-3 flex flex-col gap-1.5">
              {suggestions.map((s) => (
                <Link
                  key={s}
                  to="/chat/$threadId"
                  params={{ threadId }}
                  search={{ q: s }}
                  onClick={() => setOpen(false)}
                  className="group flex items-center justify-between rounded-lg border border-border bg-background/50 px-3 py-2 text-left text-xs text-muted-foreground transition-colors hover:border-brand/60 hover:text-foreground"
                >
                  <span>{s}</span>
                  <ArrowRight size={12} className="opacity-0 transition-opacity group-hover:opacity-100" />
                </Link>
              ))}
            </div>
            <Link
              to="/chat"
              onClick={() => setOpen(false)}
              className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-brand px-4 py-2.5 text-sm font-semibold text-primary-foreground shadow-glow transition-transform hover:scale-[1.02]"
            >
              Start a chat <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      )}

      {/* Floating bubble button */}
      <div className="pointer-events-auto relative">
        {!open && (
          <span className="absolute inset-0 -z-10 animate-ping rounded-full bg-brand/40" aria-hidden />
        )}
        <button
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Close chat" : "Chat with Coco"}
          className={`relative flex h-14 w-14 items-center justify-center overflow-hidden rounded-full bg-gradient-brand p-0 text-primary-foreground shadow-glow transition-transform hover:scale-110 active:scale-95 ${
            nudge && !open ? "animate-float" : ""
          }`}
        >
          {open ? (
            <X size={22} />
          ) : (
            <img
              src={assistantLogo}
              alt=""
              className="h-9 w-9 drop-shadow-[0_1px_2px_rgba(0,0,0,0.25)]"
            />
          )}
        </button>
      </div>
    </div>
  );
}
