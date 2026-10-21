import { createFileRoute, Link, Outlet, useNavigate, useParams, useRouterState } from "@tanstack/react-router";
import { Plus, MessageSquare, Trash2, Menu, Download, Eraser, Search, Pencil, Check, X } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useChatThreads, createThreadId, type ChatThread } from "@/lib/chat-storage";
import assistantLogo from "@/assets/assistant-logo.png";
import inkCloudAsset from "@/assets/ink-cloud.mp4.asset.json";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

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
  onRename,
  onClearAll,
}: {
  threads: ChatThread[];
  activeId?: string;
  onNew: () => void;
  onSelect: (id: string) => void;
  onDelete: (id: string) => void;
  onRename: (id: string, title: string) => void;
  onClearAll: () => void;
}) {
  const [query, setQuery] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [draft, setDraft] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return threads;
    return threads.filter((t) => {
      if (t.title.toLowerCase().includes(q)) return true;
      return t.messages.some((m) =>
        m.parts.some((p) => p.type === "text" && p.text.toLowerCase().includes(q)),
      );
    });
  }, [threads, query]);

  function startEdit(t: ChatThread) {
    setEditingId(t.id);
    setDraft(t.title);
  }
  function commitEdit() {
    if (editingId) onRename(editingId, draft);
    setEditingId(null);
  }

  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center gap-2 px-2 pb-3">
        <img src={assistantLogo} alt="" className="h-8 w-8" />
        <div className="min-w-0">
          <p className="text-sm font-semibold leading-none">Conversations</p>
          <p className="text-xs text-muted-foreground">Your chats with Coco</p>
        </div>
      </div>
      <button
        onClick={onNew}
        className="mb-3 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-brand px-3 py-2 text-sm font-semibold text-primary-foreground shadow-glow transition-transform hover:scale-[1.02] active:scale-95"
      >
        <Plus size={14} /> New Chat
      </button>
      <div className="relative mb-2">
        <Search size={13} className="pointer-events-none absolute left-2.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search conversations..."
          className="glass-input w-full rounded-lg py-1.5 pl-7 pr-2 text-xs outline-none placeholder:text-muted-foreground"
        />
      </div>
      <div className="flex items-center justify-between px-2 pb-1 text-[10px] uppercase tracking-wide text-muted-foreground">
        <span>Recent</span>
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
        {filtered.length === 0 && (
          <p className="px-2 py-4 text-xs text-muted-foreground">
            {threads.length === 0 ? "No conversations yet. Start one above." : "No matches."}
          </p>
        )}
        {filtered.map((t) => {
          const isActive = t.id === activeId;
          const isEditing = editingId === t.id;
          return (
            <div
              key={t.id}
              className={cn(
                "group flex items-center gap-1 rounded-lg pr-1 transition-colors animate-fade-in",
                isActive
                  ? "bg-secondary ring-1 ring-brand/40"
                  : "hover:bg-secondary/60",
              )}
            >
              {isEditing ? (
                <div className="flex flex-1 items-center gap-1 px-2 py-1.5">
                  <input
                    autoFocus
                    value={draft}
                    onChange={(e) => setDraft(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") commitEdit();
                      if (e.key === "Escape") setEditingId(null);
                    }}
                    className="min-w-0 flex-1 rounded border border-border bg-background px-1.5 py-1 text-sm outline-none focus:border-brand/60"
                  />
                  <button onClick={commitEdit} className="rounded p-1 text-muted-foreground hover:text-foreground" aria-label="Save">
                    <Check size={13} />
                  </button>
                  <button onClick={() => setEditingId(null)} className="rounded p-1 text-muted-foreground hover:text-foreground" aria-label="Cancel">
                    <X size={13} />
                  </button>
                </div>
              ) : (
                <>
                  <Link
                    to="/chat/$threadId"
                    params={{ threadId: t.id }}
                    onClick={() => onSelect(t.id)}
                    className="flex min-w-0 flex-1 items-center gap-2 px-2 py-2 text-left text-sm"
                  >
                    <MessageSquare size={14} className={cn("shrink-0", isActive ? "text-brand" : "text-muted-foreground")} />
                    <span className="min-w-0 flex-1 truncate">{t.title || "New chat"}</span>
                    <span className="shrink-0 text-[10px] text-muted-foreground">{formatTime(t.updatedAt)}</span>
                  </Link>
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      startEdit(t);
                    }}
                    aria-label="Rename chat"
                    className="rounded-md p-1.5 text-muted-foreground opacity-0 transition-opacity hover:bg-background hover:text-foreground group-hover:opacity-100"
                  >
                    <Pencil size={13} />
                  </button>
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      onDelete(t.id);
                    }}
                    aria-label="Delete chat"
                    className="rounded-md p-1.5 text-muted-foreground opacity-0 transition-opacity hover:bg-background hover:text-foreground group-hover:opacity-100"
                  >
                    <Trash2 size={13} />
                  </button>
                </>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function ChatLayout() {
  const navigate = useNavigate();
  const { threads, deleteThread, renameThread, clearThreads } = useChatThreads();
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
    clearThreads();
    navigate({ to: "/chat" });
  }

  const sortedThreads = useMemo(() => threads, [threads]);

  return (
    <div className="relative isolate">
      {/* Ambient ink-cloud background — ties chat visually to the home Coco AI moment */}
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden" aria-hidden>
        <video
          src={inkCloudAsset.url}
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          className="absolute inset-0 h-full w-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-background/85 backdrop-blur-2xl" />
      </div>

      <div className="mx-auto w-full max-w-[1400px] px-2 py-3 sm:px-4 md:px-6 md:py-6">
      {/* Mobile header */}
      <div className="mb-3 flex items-center justify-between md:hidden">
        <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
          <SheetTrigger asChild>
            <button className="glass-chip rounded-lg p-2 active:scale-95" aria-label="Open conversations">
              <Menu size={18} />
            </button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[300px] p-3">
            <SheetHeader className="sr-only">
              <SheetTitle>Conversations</SheetTitle>
            </SheetHeader>
            {mounted && (
              <Sidebar
                threads={sortedThreads}
                activeId={activeId}
                onNew={newChat}
                onSelect={() => setMobileOpen(false)}
                onDelete={handleDelete}
                onRename={renameThread}
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

      <div className="grid gap-4 md:grid-cols-[280px_1fr] md:gap-6">
        <aside className="glass-panel hidden max-h-[calc(100dvh-8rem)] rounded-2xl p-3 md:flex md:flex-col">
          {mounted ? (
            <Sidebar
              threads={sortedThreads}
              activeId={activeId}
              onNew={newChat}
              onSelect={() => {}}
              onDelete={handleDelete}
              onRename={renameThread}
              onClearAll={clearAll}
            />
          ) : null}
        </aside>

        <section className="glass-panel-strong flex h-[calc(100dvh-6.5rem)] flex-col overflow-hidden rounded-3xl animate-fade-in md:h-[calc(100dvh-8rem)]">
          <header className="flex shrink-0 items-center justify-between border-b border-border/50 px-4 py-3 md:px-6" style={{ boxShadow: "inset 0 1px 0 0 var(--glass-specular)" }}>
            <div className="flex items-center gap-2.5">
              <div className="relative">
                <img src={assistantLogo} alt="" className="h-9 w-9" />
                <span className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full border-2 border-card bg-emerald-500 shadow-[0_0_8px_rgb(16_185_129)]" aria-hidden />
              </div>
              <div>
                <p className="text-sm font-semibold leading-none">Coco</p>
                <p className="mt-1 text-[11px] text-muted-foreground">Online · AI Assistant</p>
              </div>
            </div>
          </header>
          <div className="min-h-0 flex-1">
            <Outlet />
          </div>
        </section>
      </div>
      </div>
    </div>
  );
}

export function useChatParams() {
  return useParams({ from: "/chat/$threadId" });
}
