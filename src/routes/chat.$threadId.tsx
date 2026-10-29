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
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const searchSchema = z.object({ q: z.string().optional() });

export const Route = createFileRoute("/chat/$threadId")({
  validateSearch: (search) => searchSchema.parse(search),
  head: () => ({
    meta: [
      { title: "Your Conversation with Coco | Coco Tech" },
      { name: "description", content: "Continue your conversation with Coco, the Coco Tech AI assistant for creative projects." },
      { property: "og:title", content: "Your Conversation with Coco | Coco Tech" },
      { property: "og:description", content: "Continue your conversation with Coco, the Coco Tech AI assistant for creative projects." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ChatThreadPage,
});

const SUGGESTIONS = ["Website pricing", "Plan a project", "Explore the portfolio"];

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
    el.style.height = `${Math.min(el.scrollHeight, 144)}px`;
  }, [input]);

  // Autofocus on mount and after thread change
  useEffect(() => {
    if (window.matchMedia("(pointer: fine)").matches) textareaRef.current?.focus();
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
      <div className="relative min-h-0 flex-1">
        <Conversation className="chat-scroll h-full">
          <ConversationContent className="mx-auto w-full max-w-3xl gap-6 px-4 py-6 sm:px-7 md:px-10 md:py-8 lg:max-w-4xl">
            {messages.length === 0 ? (
              <div className="flex flex-col items-center justify-center gap-4 py-6 text-center">
                <ConversationEmptyState
                  icon={
                    <img
                      src={assistantLogo}
                      alt="Coco AI"
                      className="h-16 w-16 object-contain"
                    />
                  }
                  title="Say hi to Coco"
                  description="Ask about our services, pricing approach, or get help scoping a project."
                />
                <div className="flex w-full max-w-2xl flex-wrap justify-center gap-2">
                  {SUGGESTIONS.map((s) => (
                    <Button variant="ghost"
                      key={s}
                      onClick={() => submit(s)}
                      className="h-auto whitespace-normal rounded-md border border-border px-3 py-2 text-left text-xs text-muted-foreground hover:text-foreground"
                    >
                      {s}
                    </Button>
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
                        "animate-fade-in",
                      )}
                    >
                      <MessageContent className="px-4 py-3 text-base leading-relaxed">
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
      <div className="chat-composer shrink-0">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            submit();
          }}
          className={cn(
            "group relative mx-auto flex w-full max-w-3xl items-end gap-2 rounded-md border border-border bg-background px-3 py-2 lg:max-w-4xl",
            "focus-within:border-brand",
          )}
        >
          <textarea
            ref={textareaRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey && !e.nativeEvent.isComposing) {
                e.preventDefault();
                submit();
              }
            }}
            rows={1}
            aria-label="Message Coco"
            placeholder="Message Coco…"
            className="min-w-0 flex-1 resize-none bg-transparent px-1 py-2 text-base leading-relaxed outline-none placeholder:text-muted-foreground"
          />
          {isBusy ? (
            <Button variant="ghost"
              type="button"
              onClick={stop}
              aria-label="Stop generating"
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-secondary text-foreground shadow-sm transition-all hover:bg-secondary/80 active:scale-95"
            >
              <Square size={18} fill="currentColor" />
            </Button>
          ) : (
            <Button variant="ghost"
              type="submit"
              disabled={!input.trim()}
              aria-label="Send message"
              className={cn(
                "flex h-10 w-10 shrink-0 items-center justify-center rounded-md shadow-none transition-all duration-150 ease-out",
                "bg-primary text-primary-foreground hover:-translate-y-0.5 hover:shadow-glow active:translate-y-0 active:scale-95",
                "disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:translate-y-0 disabled:shadow-sm",
              )}
            >
              <ArrowUp size={22} strokeWidth={2.5} />
            </Button>
          )}
        </form>
        <p className="mt-2 text-center text-[10px] text-muted-foreground">Coco can make mistakes. Confirm important details with our team.</p>
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
    <Button variant="ghost"
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
    </Button>
  );
}
