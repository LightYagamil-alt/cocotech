import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport, type UIMessage } from "ai";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { z } from "zod";
import { Send, Square, Copy, Check, RotateCcw, ThumbsUp, ThumbsDown } from "lucide-react";
import { ConversationEmptyState } from "@/components/ai-elements/conversation";
import {
  Message,
  MessageContent,
  MessageResponse,
} from "@/components/ai-elements/message";
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

  useEffect(() => {
    if (mounted) ensureThread(threadId);
  }, [ensureThread, threadId, mounted]);

  const { messages, setMessages, sendMessage, status, error, stop, regenerate, clearError } = useChat({
    id: threadId,
    messages: [],
    experimental_throttle: 80,
    transport: new DefaultChatTransport({ api: "/api/chat" }),
  });

  const loadedThreadRef = useRef<string | null>(null);
  const justLoadedThreadRef = useRef<string | null>(null);
  const latestMessagesRef = useRef<UIMessage[]>([]);
  const saveTimerRef = useRef<number | null>(null);
  useEffect(() => {
    if (!mounted || loadedThreadRef.current === threadId) return;
    const storedMessages = getThread(threadId).messages;
    setMessages(storedMessages);
    latestMessagesRef.current = storedMessages;
    loadedThreadRef.current = threadId;
    justLoadedThreadRef.current = threadId;
  }, [getThread, mounted, setMessages, threadId]);

  useEffect(() => {
    if (loadedThreadRef.current !== threadId) return;
    if (justLoadedThreadRef.current === threadId) {
      justLoadedThreadRef.current = null;
      return;
    }
    latestMessagesRef.current = messages;
    if (messages.length === 0) return;

    if (saveTimerRef.current) window.clearTimeout(saveTimerRef.current);

    const save = () => updateThread(threadId, latestMessagesRef.current);
    if (status === "streaming" || status === "submitted") {
      saveTimerRef.current = window.setTimeout(save, 900);
      return;
    }

    save();
  }, [messages, status, threadId, updateThread]);

  useEffect(() => {
    return () => {
      if (saveTimerRef.current) window.clearTimeout(saveTimerRef.current);
      if (latestMessagesRef.current.length > 0) updateThread(threadId, latestMessagesRef.current);
    };
  }, [threadId, updateThread]);

  // One-shot suggested prompt
  const sentInitialRef = useRef(false);
  useEffect(() => {
    sentInitialRef.current = false;
  }, [threadId]);
  useEffect(() => {
    if (sentInitialRef.current) return;
    if (!mounted || loadedThreadRef.current !== threadId) return;
    if (q && messages.length === 0 && getThread(threadId).messages.length === 0) {
      sentInitialRef.current = true;
      void sendMessage({ text: q });
      navigate({ to: "/chat/$threadId", params: { threadId }, search: {}, replace: true });
    }
  }, [q, messages.length, sendMessage, navigate, threadId, mounted, getThread]);

  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [input, setInput] = useState("");

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
    clearError();
    void sendMessage({ text: value });
    setInput("");
  }

  return (
    <div className="flex h-[70vh] flex-col md:h-[72vh]">
      <div className="relative flex-1 overflow-y-auto overscroll-contain">
        <div className="flex min-h-full flex-col gap-8 space-y-4 p-4">
          {messages.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center gap-4 py-8 text-center">
              <ConversationEmptyState
                icon={<img src={assistantLogo} alt="Coco AI" className="h-24 w-24 object-contain drop-shadow-[0_8px_24px_rgba(168,85,247,0.45)]" />}
                title="Say hi to Coco"
                description="Ask about our services, pricing approach, or get help scoping a project."
              />
              <div className="grid w-full max-w-md gap-2 sm:grid-cols-2">
                {SUGGESTIONS.map((s) => (
                  <button
                    key={s}
                    onClick={() => submit(s)}
                    className="rounded-xl border border-border bg-card/70 px-3 py-2 text-left text-xs text-muted-foreground transition-colors hover:border-brand/60 hover:text-foreground active:scale-[0.99]"
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
        </div>
      </div>

      <div className="border-t border-border bg-card/80 p-3 backdrop-blur-sm">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            submit();
          }}
          className="group relative flex items-end gap-2 rounded-2xl border border-border bg-background/90 px-3 py-2 shadow-sm backdrop-blur transition-colors focus-within:border-brand/60"
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
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-secondary text-foreground shadow-sm transition-colors hover:bg-secondary/80 active:scale-95"
            >
              <Square size={14} fill="currentColor" />
            </button>
          ) : (
            <button
              type="submit"
              disabled={!input.trim()}
              aria-label="Send message"
              className={cn(
                "flex h-9 w-9 shrink-0 items-center justify-center rounded-xl shadow-md transition-transform duration-100 ease-out",
                "bg-gradient-brand text-primary-foreground hover:shadow-glow hover:-translate-y-0.5 active:translate-y-0 active:scale-95",
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
  children: ReactNode;
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
