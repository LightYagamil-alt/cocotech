import { createFileRoute, Link, Outlet, useNavigate, useParams, useRouterState } from "@tanstack/react-router";
import { Plus, MessageSquare, Trash2, Menu, Download, Eraser } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useChatThreads, createThreadId, type ChatThread } from "@/lib/chat-storage";
import assistantLogo from "@/assets/assistant-logo.png";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";

export const Route = createFileRoute("/chat")({
  head: () => ({
    meta: [
      { title: "Chat with Coco — AI Assistant | Coco Tech" },
      { name: "description", content: "Chat with Coco, the AI assistant for Coco Tech. Get instant answers about our website, social and video services." },
    ],
  }),
  component: ChatLayout,
});

function formatTime(ts: number) {
  const d = new Date(ts);
  const now = new Date();
  const sameDay = d.toDateString() === now.toDateString();
  return sameDay
    ? d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    : d.toLocaleDateString([], { month: "short", day: "numeric" });
}

function downloadAll(threads: ChatThread[]) {
  const md = threads
    .map((t) => {
      const lines = [`# ${t.title || "Chat"}`, `_${new Date(t.updatedAt).toLocaleString()}_`, ""];
      for (const m of t.messages) {
        const role = m.role === "user" ? "**You**" : "**Coco**";
        const text = m.parts.map((p) => (p.type === "text" ? p.text : "")).join("");
        lines.push(`${role}: ${text}`, "");
      }
      return lines.join("\n");
    })
    .join("\n\n---\n\n");
  const blob = new Blob([md], { type: "text/markdown" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `coco-chat-history-${new Date().toISOString().slice(0, 10)}.md`;
  document.body.append(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

function Sidebar({
  threads,
  activeId,
  onNew,
  onSelect,
  onDelete,
  onClearAll,
}: {
  threads: ChatThread[];
  activeId?: string;
  onNew: () => void;
  onSelect: (id: string) => void;
  onDelete: (id: string) => void;
  onClearAll: () => void;
}) {
  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center gap-2 px-2 pb-3">
        <img src={assistantLogo} alt="" className="h-8 w-8" />
        <div>
          <p className="text-sm font-semibold leading-none">Coco</p>
          <p className="text-xs text-muted-foreground">AI Assistant</p>
        </div>
      </div>
      <button
        onClick={onNew}
        className="mb-3 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-brand px-3 py-2 text-sm font-semibold text-primary-foreground shadow-glow transition-transform hover:scale-[1.02] active:scale-95"
      >
        <Plus size={14} /> New chat
      </button>
      <div className="flex items-center justify-between px-2 pb-1 text-xs uppercase tracking-wide text-muted-foreground">
        <span>History</span>
        {threads.length > 0 && (
          <div className="flex items-center gap-1">
            <button
              onClick={() => downloadAll(threads)}
              className="rounded p-1 hover:bg-secondary"
              aria-label="Download all chats"
              title="Download history"
            >
              <Download size={12} />
            </button>
            <button
              onClick={onClearAll}
              className="rounded p-1 hover:bg-secondary"
              aria-label="Clear all chats"
              title="Clear all"
            >
              <Eraser size={12} />
            </button>
          </div>
        )}
      </div>
      <div className="flex-1 space-y-1 overflow-y-auto pr-1">
        {threads.length === 0 && (
          <p className="px-2 py-4 text-xs text-muted-foreground">No conversations yet. Start one above.</p>
        )}
        {threads.map((t) => {
          const isActive = t.id === activeId;
          return (
            <div
              key={t.id}
              className={`group flex items-center gap-1 rounded-lg pr-1 transition-colors animate-fade-in ${
                isActive ? "bg-secondary" : "hover:bg-secondary/60"
              }`}
            >
              <Link
                to="/chat/$threadId"
                params={{ threadId: t.id }}
                onClick={() => onSelect(t.id)}
                className="flex min-w-0 flex-1 items-center gap-2 px-2 py-2 text-left text-sm"
              >
                <MessageSquare size={14} className="shrink-0 text-muted-foreground" />
                <span className="min-w-0 flex-1 truncate">{t.title || "New chat"}</span>
                <span className="shrink-0 text-[10px] text-muted-foreground">{formatTime(t.updatedAt)}</span>
              </Link>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  onDelete(t.id);
                }}
                aria-label="Delete chat"
                className="rounded-md p-1.5 text-muted-foreground opacity-0 transition-opacity hover:bg-background hover:text-foreground group-hover:opacity-100"
              >
                <Trash2 size={14} />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function ChatLayout() {
  const navigate = useNavigate();
  const { threads, deleteThread } = useChatThreads();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const activeId = pathname.startsWith("/chat/") ? pathname.split("/chat/")[1] : undefined;
  const [mounted, setMounted] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  useEffect(() => setMounted(true), []);

  function newChat() {
    const id = createThreadId();
    setMobileOpen(false);
    navigate({ to: "/chat/$threadId", params: { threadId: id } });
  }
  function handleDelete(id: string) {
    deleteThread(id);
    if (id === activeId) navigate({ to: "/chat" });
  }
  function clearAll() {
    if (!confirm("Delete all conversations? This cannot be undone.")) return;
    threads.forEach((t) => deleteThread(t.id));
    navigate({ to: "/chat" });
  }

  const sortedThreads = useMemo(() => threads, [threads]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-6 md:px-6 md:py-10">
      {/* Mobile header */}
      <div className="mb-3 flex items-center justify-between md:hidden">
        <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
          <SheetTrigger asChild>
            <button className="rounded-lg border border-border bg-card/60 p-2 active:scale-95" aria-label="Open chat history">
              <Menu size={18} />
            </button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[300px] p-3">
            <SheetHeader className="sr-only">
              <SheetTitle>Chat history</SheetTitle>
            </SheetHeader>
            {mounted && (
              <Sidebar
                threads={sortedThreads}
                activeId={activeId}
                onNew={newChat}
                onSelect={() => setMobileOpen(false)}
                onDelete={handleDelete}
                onClearAll={clearAll}
              />
            )}
          </SheetContent>
        </Sheet>
        <div className="flex items-center gap-2">
          <img src={assistantLogo} alt="" className="h-7 w-7" />
          <span className="font-display text-sm font-semibold">Coco</span>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-[260px_1fr]">
        <aside className="hidden max-h-[80vh] rounded-2xl border border-border bg-card/60 p-3 md:flex md:flex-col">
          {mounted ? (
            <Sidebar
              threads={sortedThreads}
              activeId={activeId}
              onNew={newChat}
              onSelect={() => {}}
              onDelete={handleDelete}
              onClearAll={clearAll}
            />
          ) : null}
        </aside>

        <section className="flex min-h-[70vh] flex-col overflow-hidden rounded-2xl border border-border bg-card/60 shadow-sm animate-fade-in">
          <header className="flex items-center justify-between border-b border-border px-4 py-3">
            <div className="flex items-center gap-2">
              <img src={assistantLogo} alt="" className="h-8 w-8" />
              <div>
                <p className="text-sm font-semibold leading-none">Coco</p>
                <p className="text-xs text-muted-foreground">Online · AI Assistant</p>
              </div>
            </div>
            <span className="h-2 w-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgb(16_185_129)]" aria-hidden />
          </header>
          <div className="flex-1">
            <Outlet />
          </div>
        </section>
      </div>
    </div>
  );
}

export function useChatParams() {
  return useParams({ from: "/chat/$threadId" });
}
