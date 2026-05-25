import { createFileRoute, Link, Outlet, useNavigate, useParams, useRouterState } from "@tanstack/react-router";
import { Plus, MessageSquare, Trash2 } from "lucide-react";
import { useChatThreads, createThreadId } from "@/lib/chat-storage";
import assistantLogo from "@/assets/assistant-logo.png";

export const Route = createFileRoute("/chat")({
  head: () => ({
    meta: [
      { title: "Chat with Coco — AI Assistant | Coco Tech" },
      { name: "description", content: "Chat with Coco, the AI assistant for Coco Tech. Get instant answers about our website, social and video services." },
    ],
  }),
  component: ChatLayout,
});

function ChatLayout() {
  const navigate = useNavigate();
  const { threads, deleteThread } = useChatThreads();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const activeId = pathname.startsWith("/chat/") ? pathname.split("/chat/")[1] : undefined;

  function newChat() {
    const id = createThreadId();
    navigate({ to: "/chat/$threadId", params: { threadId: id } });
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 md:px-6 md:py-12">
      <div className="grid gap-6 md:grid-cols-[260px_1fr]">
        <aside className="rounded-2xl border border-border bg-card/60 p-3">
          <div className="flex items-center gap-2 px-2 pb-3">
            <img src={assistantLogo} alt="" className="h-8 w-8" />
            <div>
              <p className="text-sm font-semibold leading-none">Coco</p>
              <p className="text-xs text-muted-foreground">AI Assistant</p>
            </div>
          </div>
          <button
            onClick={newChat}
            className="mb-3 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-brand px-3 py-2 text-sm font-semibold text-primary-foreground shadow-glow transition-transform hover:scale-[1.02]"
          >
            <Plus size={14} /> New chat
          </button>
          <div className="max-h-[60vh] space-y-1 overflow-y-auto">
            {threads.length === 0 && (
              <p className="px-2 py-4 text-xs text-muted-foreground">No conversations yet. Start one above.</p>
            )}
            {threads.map((t) => {
              const isActive = t.id === activeId;
              return (
                <div
                  key={t.id}
                  className={`group flex items-center gap-1 rounded-lg pr-1 transition-colors ${
                    isActive ? "bg-secondary" : "hover:bg-secondary/60"
                  }`}
                >
                  <Link
                    to="/chat/$threadId"
                    params={{ threadId: t.id }}
                    className="flex min-w-0 flex-1 items-center gap-2 px-2 py-2 text-left text-sm"
                  >
                    <MessageSquare size={14} className="shrink-0 text-muted-foreground" />
                    <span className="truncate">{t.title || "New chat"}</span>
                  </Link>
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      deleteThread(t.id);
                      if (isActive) navigate({ to: "/chat" });
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
        </aside>

        <section className="min-h-[70vh] rounded-2xl border border-border bg-card/60">
          <Outlet />
        </section>
      </div>
    </div>
  );
}

export function useChatParams() {
  return useParams({ from: "/chat/$threadId" });
}
