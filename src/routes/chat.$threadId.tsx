import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport, type UIMessage } from "ai";
import { useEffect, useMemo, useRef, useState } from "react";
import { z } from "zod";
import { Send, Square, Copy, Check, RotateCcw, ThumbsUp, ThumbsDown } from "lucide-react";
import {
  Conversation,
  ConversationContent,
  ConversationScrollButton,
  ConversationEmptyState,
} from "@/components/ai-elements/conversation";
import {
  Message,
  MessageContent,
  MessageResponse,
} from "@/components/ai-elements/message";
import { Shimmer } from "@/components/ai-elements/shimmer";
import { useChatThreads } from "@/lib/chat-storage";
import assistantLogo from "@/assets/assistant-logo.png";
import { cn } from "@/lib/utils";

const searchSchema = z.object({ q: z.string().optional() });

export const Route = createFileRoute("/chat/$threadId")({
  validateSearch: (search) => searchSchema.parse(search),
  component: ChatThreadPage,
});

const SUGGESTIONS = [
  "Show pricing plans",
  "See portfolio",
  "What's included?",
  "Timeline estimate",
];

function ChatThreadPage() {
  const { threadId } = Route.useParams();
  const { q } = Route.useSearch();
  const navigate = useNavigate();
  const { getThread, ensureThread, updateThread } = useChatThreads();

  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const initialMessages = useMemo<UIMessage[]>(
    () => (mounted ? getThread(threadId).messages : []),
    [getThread, threadId, mounted],
  );

  useEffect(() => {
    if (mounted) ensureThread(threadId);
  }, [ensureThread, threadId, mounted]);

  const { messages, sendMessage, status, error, stop, regenerate } = useChat({
    id: threadId,
    messages: initialMessages,
    transport: new DefaultChatTransport({ api: "/api/chat" }),
  });

  useEffect(() => {
    if (messages.length === 0) return;
    updateThread(threadId, messages);
  }, [messages, threadId, updateThread]);

  // One-shot suggested prompt
  const sentInitialRef = useRef(false);
  useEffect(() => {
    if (sentInitialRef.current) return;
    if (q && messages.length === 0) {
      sentInitialRef.current = true;
      void sendMessage({ text: q });
      navigate({ to: "/chat/$threadId", params: { threadId }, search: {}, replace: true });
    }
  }, [q, messages.length, sendMessage, navigate, threadId]);

  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [input, setInput] = useState("");

  useEffect(() => {
    textareaRef.current?.focus();
  }, [threadId]);
  useEffect(() => {
    if (status === "ready") textareaRef.current?.focus();
  }, [status]);

  // Auto-resize textarea
  useEffect(() => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = `${Math.min(el.scrollHeight, 200)}px`;
  }, [input]);

  const isBusy = status === "submitted" || status === "streaming";

  function submit(text?: string) {
    const value = (text ?? input).trim();
    if (!value || isBusy) return;
    void sendMessage({ text: value });
    setInput("");
  }

  // Scroll new assistant message into view from the top
  const lastAssistantId = [...messages].reverse().find((m) => m.role === "assistant")?.id;
  useEffect(() => {
    if (!lastAssistantId) return;
    const el = document.getElementById(`msg-${lastAssistantId}`);
    el?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [lastAssistantId]);

  return (
    <div className="flex h-[70vh] flex-col">
      <Conversation className="flex-1" initial={false as never} resize={false as never}>
        <ConversationContent className="space-y-4">
          {messages.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center gap-4 py-8 text-center">
              <ConversationEmptyState
                icon={<img src={assistantLogo} alt="" className="h-12 w-12" />}
                title="Say hi to Coco"
                description="Ask about our services, pricing approach, or get help scoping a project."
              />
              <div className="grid w-full max-w-md gap-2 sm:grid-cols-2">
                {SUGGESTIONS.map((s) => (
                  <button
                    key={s}
                    onClick={() => submit(s)}
                    className="rounded-xl border border-border bg-card/50 px-3 py-2 text-left text-xs text-muted-foreground transition-all hover:border-brand/60 hover:text-foreground hover:shadow-sm"
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            messages.map((message, idx) => {
              const isLast = idx === messages.length - 1;
              const text = message.parts.map((p) => (p.type === "text" ? p.text : "")).join("");
              return (
                <div key={message.id} className="flex flex-col gap-1">
                  <Message id={`msg-${message.id}`} from={message.role}>
                    <MessageContent>
                      {message.parts.map((part, i) => {
                        if (part.type === "text") {
                          return message.role === "assistant" ? (
                            <MessageResponse key={i}>{part.text}</MessageResponse>
                          ) : (
                            <span key={i} className="whitespace-pre-wrap">{part.text}</span>
                          );
                        }
                        return null;
                      })}
                    </MessageContent>
                  </Message>
                  {message.role === "assistant" && !isBusy && (
                    <AssistantActions
                      text={text}
                      canRegenerate={isLast}
                      onRegenerate={() => regenerate()}
                    />
                  )}
                </div>
              );
            })
          )}
          {status === "submitted" && (
            <Message from="assistant">
              <MessageContent>
                <TypingDots />
              </MessageContent>
            </Message>
          )}
          {error && (
            <div className="mx-4 rounded-lg border border-destructive/40 bg-destructive/10 p-3 text-sm text-destructive">
              {error.message || "Something went wrong. Please try again."}
            </div>
          )}
        </ConversationContent>
        <ConversationScrollButton />
      </Conversation>

      <div className="border-t border-border p-3">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            submit();
          }}
          className="group relative flex items-end gap-2 rounded-2xl border border-border bg-background/80 px-3 py-2 shadow-sm backdrop-blur transition-all focus-within:border-brand/60 focus-within:shadow-[0_0_0_3px_color-mix(in_oklab,var(--brand,theme(colors.primary.DEFAULT))_18%,transparent)]"
        >
          <textarea
            ref={textareaRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                submit();
              }
            }}
            rows={1}
            placeholder="Message Coco..."
            className="max-h-[200px] min-h-[28px] flex-1 resize-none bg-transparent py-1.5 text-sm leading-relaxed outline-none placeholder:text-muted-foreground"
          />
          {isBusy ? (
            <button
              type="button"
              onClick={stop}
              aria-label="Stop"
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-secondary text-foreground shadow-sm transition-all hover:bg-secondary/80 active:scale-90"
            >
              <Square size={14} fill="currentColor" />
            </button>
          ) : (
            <button
              type="submit"
              disabled={!input.trim()}
              aria-label="Send message"
              className={cn(
                "flex h-9 w-9 shrink-0 items-center justify-center rounded-xl shadow-md transition-all duration-150 ease-out",
                "bg-gradient-brand text-primary-foreground hover:shadow-glow hover:-translate-y-0.5 active:translate-y-0 active:scale-90",
                "disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:shadow-sm",
              )}
            >
              <Send size={15} className="-rotate-0 translate-x-[1px]" />
            </button>
          )}
        </form>
        <p className="mt-1.5 px-1 text-[10px] text-muted-foreground">
          Coco can make mistakes. Verify important details with our team.
        </p>
      </div>
    </div>
  );
}

function TypingDots() {
  return (
    <div className="flex items-center gap-1.5 py-0.5" aria-label="Coco is typing">
      <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-muted-foreground/70 [animation-delay:-0.3s]" />
      <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-muted-foreground/70 [animation-delay:-0.15s]" />
      <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-muted-foreground/70" />
    </div>
  );
}

function AssistantActions({
  text,
  canRegenerate,
  onRegenerate,
}: {
  text: string;
  canRegenerate: boolean;
  onRegenerate: () => void;
}) {
  const [copied, setCopied] = useState(false);
  const [feedback, setFeedback] = useState<"up" | "down" | null>(null);

  async function copy() {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      /* ignore */
    }
  }

  return (
    <div className="ml-1 flex items-center gap-0.5 opacity-60 transition-opacity hover:opacity-100">
      <ActionBtn label={copied ? "Copied" : "Copy"} onClick={copy}>
        {copied ? <Check size={13} /> : <Copy size={13} />}
      </ActionBtn>
      {canRegenerate && (
        <ActionBtn label="Regenerate" onClick={onRegenerate}>
          <RotateCcw size={13} />
        </ActionBtn>
      )}
      <ActionBtn
        label="Good response"
        onClick={() => setFeedback(feedback === "up" ? null : "up")}
        active={feedback === "up"}
      >
        <ThumbsUp size={13} />
      </ActionBtn>
      <ActionBtn
        label="Bad response"
        onClick={() => setFeedback(feedback === "down" ? null : "down")}
        active={feedback === "down"}
      >
        <ThumbsDown size={13} />
      </ActionBtn>
    </div>
  );
}

function ActionBtn({
  children,
  label,
  onClick,
  active,
}: {
  children: React.ReactNode;
  label: string;
  onClick: () => void;
  active?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      title={label}
      className={cn(
        "flex h-7 w-7 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground active:scale-90",
        active && "bg-secondary text-brand",
      )}
    >
      {children}
    </button>
  );
}
