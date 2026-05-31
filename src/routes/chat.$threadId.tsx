import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport, type UIMessage } from "ai";
import { useEffect, useMemo, useRef } from "react";
import { z } from "zod";
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
import {
  PromptInput,
  PromptInputTextarea,
  PromptInputFooter,
  PromptInputSubmit,
} from "@/components/ai-elements/prompt-input";
import { Shimmer } from "@/components/ai-elements/shimmer";
import { useChatThreads } from "@/lib/chat-storage";
import assistantLogo from "@/assets/assistant-logo.png";

const searchSchema = z.object({ q: z.string().optional() });

export const Route = createFileRoute("/chat/$threadId")({
  validateSearch: (search) => searchSchema.parse(search),
  component: ChatThreadPage,
});

function ChatThreadPage() {
  const { threadId } = Route.useParams();
  const { q } = Route.useSearch();
  const navigate = useNavigate();
  const { getThread, ensureThread, updateThread } = useChatThreads();

  const initialMessages = useMemo<UIMessage[]>(() => getThread(threadId).messages, [getThread, threadId]);

  useEffect(() => {
    ensureThread(threadId);
  }, [ensureThread, threadId]);

  const { messages, sendMessage, status, error, stop } = useChat({
    id: threadId,
    messages: initialMessages,
    transport: new DefaultChatTransport({ api: "/api/chat" }),
  });

  // Persist on every change (skip empty initial state to avoid no-op writes)
  useEffect(() => {
    if (messages.length === 0) return;
    updateThread(threadId, messages);
  }, [messages, threadId, updateThread]);

  // Handle suggested prompt from search param (one-shot)
  const sentInitialRef = useRef(false);
  useEffect(() => {
    if (sentInitialRef.current) return;
    if (q && messages.length === 0) {
      sentInitialRef.current = true;
      void sendMessage({ text: q });
      navigate({ to: "/chat/$threadId", params: { threadId }, search: {}, replace: true });
    }
  }, [q, messages.length, sendMessage, navigate, threadId]);

  // Focus textarea on mount/thread change
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  useEffect(() => {
    textareaRef.current?.focus();
  }, [threadId]);
  useEffect(() => {
    if (status === "ready") textareaRef.current?.focus();
  }, [status]);

  function handleSubmit(message: { text?: string }) {
    const text = (message.text ?? "").trim();
    if (!text || status === "submitted" || status === "streaming") return;
    void sendMessage({ text });
  }

  const isBusy = status === "submitted" || status === "streaming";

  return (
    <div className="flex h-[70vh] flex-col">
      <Conversation className="flex-1">
        <ConversationContent>
          {messages.length === 0 ? (
            <ConversationEmptyState
              icon={<img src={assistantLogo} alt="" className="h-12 w-12" />}
              title="Say hi to Coco"
              description="Ask about our services, pricing approach, or get help scoping a project."
            />
          ) : (
            messages.map((message) => (
              <Message key={message.id} from={message.role}>
                <MessageContent>
                  {message.parts.map((part, i) => {
                    if (part.type === "text") {
                      return message.role === "assistant" ? (
                        <MessageResponse key={i}>{part.text}</MessageResponse>
                      ) : (
                        <span key={i}>{part.text}</span>
                      );
                    }
                    return null;
                  })}
                </MessageContent>
              </Message>
            ))
          )}
          {status === "submitted" && (
            <Message from="assistant">
              <MessageContent>
                <Shimmer>Thinking...</Shimmer>
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
        <PromptInput onSubmit={handleSubmit}>
          <PromptInputTextarea
            ref={textareaRef}
            placeholder="Ask Coco anything..."
          />
          <PromptInputFooter className="justify-end">
            <PromptInputSubmit status={status} disabled={isBusy} onStop={stop} />
          </PromptInputFooter>
        </PromptInput>
      </div>
    </div>
  );
}
