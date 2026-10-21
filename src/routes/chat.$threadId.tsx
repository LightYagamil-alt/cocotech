import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport, type UIMessage } from "ai";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { z } from "zod";
import { ArrowUp, Square, Copy, Check, RotateCcw, ThumbsUp, ThumbsDown } from "lucide-react";
import {
  Conversation,
  ConversationContent,
  ConversationEmptyState,
  ConversationScrollButton,
} from "@/components/ai-elements/conversation";
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
  "How much does a website cost?",
  "Start my project",
  "Show your portfolio",
  "Build a mobile app",
  "Branding packages",
  "Hosting & domains",
  "SEO services",
  "Website maintenance",
  "Talk to a human",
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

  // Auto-resize textarea (up to ~8 lines)
  useEffect(() => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = `${Math.min(el.scrollHeight, 240)}px`;
  }, [input]);

  // Autofocus on mount and after thread change
  useEffect(() => {
    textareaRef.current?.focus();
  }, [threadId]);

  const isBusy = status === "submitted" || status === "streaming";

  function submit(text?: string) {
    const value = (text ?? input).trim();
    if (!value || isBusy) return;
    clearError();
    void sendMessage({ text: value });
    setInput("");
    // Refocus after send
    requestAnimationFrame(() => textareaRef.current?.focus());
  }

  return (
    <div className="flex h-full flex-col">
      {/* Scroll region with soft fade masks top & bottom */}
      <div
        className="relative min-h-0 flex-1"
        style={{
          WebkitMaskImage:
            "linear-gradient(to bottom, transparent 0, black 28px, black calc(100% - 28px), transparent 100%)",
          maskImage:
            "linear-gradient(to bottom, transparent 0, black 28px, black calc(100% - 28px), transparent 100%)",
        }}
      >
        <Conversation className="h-full">
          <ConversationContent className="mx-auto w-full max-w-3xl gap-8 px-4 py-7 sm:px-7 md:px-10 md:py-10 lg:max-w-4xl">
            {messages.length === 0 ? (
              <div className="flex h-full min-h-[50vh] flex-col items-center justify-center gap-8 py-10 text-center">
                <ConversationEmptyState
                  icon={
                    <img
                      src={assistantLogo}
                      alt="Coco AI"
                      className="h-28 w-28 object-contain drop-shadow-[0_10px_30px_rgba(168,85,247,0.45)]"
                    />
                  }
                  title="Say hi to Coco"
                  description="Ask about our services, pricing approach, or get help scoping a project."
                />
                <div className="grid w-full max-w-2xl grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3">
                  {SUGGESTIONS.map((s) => (
                    <button
                      key={s}
                      onClick={() => submit(s)}
                      className="glass-chip rounded-2xl px-4 py-3.5 text-left text-sm font-medium text-muted-foreground transition-all hover:-translate-y-0.5 hover:border-brand/50 hover:text-foreground active:scale-[0.99]"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              messages.map((message, idx) => {
                const isLast = idx === messages.length - 1;
                const text = message.parts
                  .map((p) => (p.type === "text" ? p.text : ""))
                  .join("");
                return (
                  <div
                    key={message.id}
                    className={cn(
                      "flex flex-col gap-2",
                      message.role === "user" ? "items-end" : "items-start",
                    )}
                    style={{ contentVisibility: "auto", containIntrinsicSize: "auto 140px" }}
                  >
                    <Message
                      id={`msg-${message.id}`}
                      from={message.role}
                      className={cn(
                        "max-w-[92%] sm:max-w-[88%]",
                        message.role === "user" ? "animate-slide-in-right" : "animate-slide-in-left",
                      )}
                    >
                      <MessageContent className="px-5 py-3.5 text-[15px] leading-relaxed">
                        {message.parts.map((part, i) => {
                          if (part.type === "text") {
                            return message.role === "assistant" ? (
                              <MessageResponse key={i}>{part.text}</MessageResponse>
                            ) : (
                              <span key={i} className="whitespace-pre-wrap">
                                {part.text}
                              </span>
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
              <Message from="assistant" className="animate-slide-in-left">
                <MessageContent className="px-5 py-3.5 text-[15px]">
                  <TypingDots />
                </MessageContent>
              </Message>
            )}
            {error && (
              <div
                role="alert"
                className="mx-auto w-full max-w-3xl rounded-xl border border-destructive/40 bg-destructive/10 p-4 text-sm text-destructive lg:max-w-4xl"
              >
                {error.message || "Something went wrong. Please try again."}
              </div>
            )}
          </ConversationContent>
          <ConversationScrollButton />
        </Conversation>
      </div>

      {/* Sticky composer */}
      <div className="shrink-0 border-t border-border/50 px-4 pb-5 pt-4 sm:px-6 md:px-8 md:pb-6 md:pt-5" style={{ background: "var(--glass-surface-faint)", backdropFilter: "blur(20px) saturate(150%)" }}>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            submit();
          }}
          className={cn(
            "glass-panel-strong group relative mx-auto flex w-full max-w-3xl items-end gap-3 rounded-[2rem] px-5 py-4 transition-all duration-200 lg:max-w-4xl",
            "focus-within:border-brand/50 focus-within:shadow-glow focus-within:ring-1 focus-within:ring-brand/20",
          )}
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
            aria-label="Message Coco"
            placeholder="Message Coco…"
            className="max-h-[280px] min-h-[92px] flex-1 resize-none bg-transparent px-1 py-2 text-base leading-relaxed outline-none placeholder:text-muted-foreground md:text-[17px]"
          />
          {isBusy ? (
            <button
              type="button"
              onClick={stop}
              aria-label="Stop generating"
              className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-secondary text-foreground shadow-sm transition-all hover:bg-secondary/80 active:scale-95"
            >
              <Square size={18} fill="currentColor" />
            </button>
          ) : (
            <button
              type="submit"
              disabled={!input.trim()}
              aria-label="Send message"
              className={cn(
                "flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl shadow-lg transition-all duration-150 ease-out",
                "bg-gradient-brand text-primary-foreground hover:-translate-y-0.5 hover:shadow-glow active:translate-y-0 active:scale-95",
                "disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:translate-y-0 disabled:shadow-sm",
              )}
            >
              <ArrowUp size={22} strokeWidth={2.5} />
            </button>
          )}
        </form>
        <p className="mx-auto mt-3 hidden max-w-3xl px-2 text-center text-[11px] text-muted-foreground md:block lg:max-w-4xl">
          Shift + Enter for a new line · Coco can make mistakes, verify important details with our team.
        </p>
        <p className="mx-auto mt-3 max-w-3xl px-2 text-center text-[11px] text-muted-foreground md:hidden">
          Coco can make mistakes.
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
