import { useEffect, useState } from "react";
import { Link, useRouter, useRouterState } from "@tanstack/react-router";
import { X, Sparkles, ArrowRight, Loader2 } from "lucide-react";
import assistantLogo from "@/assets/assistant-logo.png";
import { createThreadId } from "@/lib/chat-storage";

const suggestions = [
  "How much does a website cost?",
  "Start my project",
  "Show your portfolio",
];

export function ChatBubble() {
  const router = useRouter();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [open, setOpen] = useState(false);
  const [opening, setOpening] = useState(false);
  const [nudge, setNudge] = useState(false);
  const [threadId] = useState(() => createThreadId());

  // Prewarm the chat route so navigation feels instant
  useEffect(() => {
    void router.preloadRoute({ to: "/chat/$threadId", params: { threadId } }).catch(() => {});
  }, [router, threadId]);

  // Reset opening state whenever the route actually changes to /chat/*
  useEffect(() => {
    if (opening && pathname.startsWith("/chat")) setOpening(false);
  }, [pathname, opening]);


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
        <div className="glass-panel-strong pointer-events-auto max-w-[16rem] animate-fade-up rounded-2xl rounded-br-sm px-3 py-2 text-xs">
          <span className="text-foreground">Hi, I'm Coco 👋 — here to help with anything you need.</span>
        </div>
      )}

      {/* Expanded card */}
      {open && (
        <div className="glass-panel-strong pointer-events-auto w-[min(20rem,calc(100vw-2rem))] origin-bottom-right animate-fade-up overflow-hidden rounded-2xl">
          <div className="flex items-center gap-3 border-b border-border/50 bg-gradient-brand/10 p-4">
            <img src={assistantLogo} alt="Coco" className="h-12 w-12 object-contain" />
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
                  preload="intent"
                  onClick={() => { setOpening(true); setOpen(false); }}
                  className="glass-chip group flex items-center justify-between rounded-lg px-3 py-2 text-left text-xs text-muted-foreground transition-colors hover:border-brand/50 hover:text-foreground active:scale-[0.99]"
                >
                  <span>{s}</span>
                  <ArrowRight size={12} className="opacity-0 transition-opacity group-hover:opacity-100" />
                </Link>
              ))}
            </div>
            <Link
              to="/chat/$threadId"
              params={{ threadId }}
              preload="intent"
              onClick={() => { setOpening(true); setOpen(false); }}
              className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-brand px-4 py-2.5 text-sm font-semibold text-primary-foreground shadow-glow transition-transform duration-100 hover:scale-[1.02] active:scale-[0.98]"
            >
              Start a chat <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      )}

      {/* Opening overlay */}
      {opening && (
        <div className="glass-panel-strong pointer-events-auto flex items-center gap-2 rounded-full px-3 py-2 text-xs text-foreground animate-fade-in">
          <Loader2 size={14} className="animate-spin text-brand" />
          <span>Opening Coco…</span>
        </div>
      )}

      {/* Floating bubble button */}
      <div className="pointer-events-auto relative">
        {!open && (
          <span className="absolute inset-0 -z-10 animate-ping rounded-full bg-brand/30" aria-hidden />
        )}
        <button
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Close chat" : "Chat with Coco"}
          className={`relative flex h-16 w-16 items-center justify-center rounded-full shadow-glow transition-transform duration-100 hover:scale-105 active:scale-95 ${
            open ? "bg-gradient-brand text-primary-foreground" : "bg-transparent"
          } ${nudge && !open ? "animate-float" : ""}`}
        >
          {open ? (
            <X size={24} />
          ) : (
            <img
              src={assistantLogo}
              alt="Coco AI"
              className="h-16 w-16 object-contain drop-shadow-[0_4px_16px_rgba(168,85,247,0.5)]"
            />
          )}
        </button>
      </div>
    </div>
  );
}
