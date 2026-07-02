import { useCallback, useEffect, useState } from "react";
import type { UIMessage } from "ai";

const STORAGE_KEY = "cocotech.chat.threads.v1";
const CHANGE_EVENT = "cocotech.chat.threads.changed";

export type ChatThread = {
  id: string;
  title: string;
  updatedAt: number;
  messages: UIMessage[];
};

function readThreads(): ChatThread[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as ChatThread[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function writeThreads(threads: ChatThread[]) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(threads));
    window.dispatchEvent(new Event(CHANGE_EVENT));
  } catch {
    // Storage can fail in private mode or if the browser quota is full.
    // Keep the chat UI responsive even if persistence is unavailable.
  }
}

export function createThreadId() {
  return `t_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`;
}

export function useChatThreads() {
  // Start empty on both server and client to avoid hydration mismatch; hydrate from
  // localStorage after mount.
  const [threads, setThreads] = useState<ChatThread[]>([]);

  useEffect(() => {
    setThreads(readThreads());
    function onStorage(e: StorageEvent) {
      if (e.key === STORAGE_KEY) setThreads(readThreads());
    }
    function onLocalChange() {
      setThreads(readThreads());
    }
    window.addEventListener("storage", onStorage);
    window.addEventListener(CHANGE_EVENT, onLocalChange);
    return () => {
      window.removeEventListener("storage", onStorage);
      window.removeEventListener(CHANGE_EVENT, onLocalChange);
    };
  }, []);

  const persist = useCallback((next: ChatThread[]) => {
    const sorted = [...next].sort((a, b) => b.updatedAt - a.updatedAt);
    writeThreads(sorted);
    setThreads(sorted);
  }, []);

  // Pure read — safe to call during render. Does NOT setState.
  const getThread = useCallback((id: string): ChatThread => {
    const current = readThreads();
    const existing = current.find((t) => t.id === id);
    if (existing) return existing;
    return { id, title: "New chat", updatedAt: Date.now(), messages: [] };
  }, []);

  // Effectful — creates the thread on disk + state if missing. Call in useEffect.
  const ensureThread = useCallback(
    (id: string) => {
      const current = readThreads();
      if (current.some((t) => t.id === id)) return;
      const fresh: ChatThread = { id, title: "New chat", updatedAt: Date.now(), messages: [] };
      persist([fresh, ...current]);
    },
    [persist],
  );

  const updateThread = useCallback(
    (id: string, messages: UIMessage[]) => {
      const current = readThreads();
      const idx = current.findIndex((t) => t.id === id);
      const firstUser = messages.find((m) => m.role === "user");
      const titleText = firstUser
        ? firstUser.parts
            .map((p) => (p.type === "text" ? p.text : ""))
            .join(" ")
            .trim()
            .slice(0, 48) || "New chat"
        : "New chat";
      if (idx >= 0) {
        const next = [...current];
        const currentTitle = next[idx].title;
        const title = currentTitle && currentTitle !== "New chat" && currentTitle !== titleText
          ? currentTitle
          : titleText;
        next[idx] = { ...next[idx], messages, title, updatedAt: Date.now() };
        persist(next);
      } else {
        persist([{ id, title: titleText, updatedAt: Date.now(), messages }, ...current]);
      }
    },
    [persist],
  );

  const deleteThread = useCallback(
    (id: string) => {
      persist(readThreads().filter((t) => t.id !== id));
    },
    [persist],
  );

  const clearThreads = useCallback(() => {
    persist([]);
  }, [persist]);

  const renameThread = useCallback(
    (id: string, title: string) => {
      const current = readThreads();
      const idx = current.findIndex((t) => t.id === id);
      if (idx < 0) return;
      const next = [...current];
      next[idx] = { ...next[idx], title: title.trim() || "New chat", updatedAt: Date.now() };
      persist(next);
    },
    [persist],
  );

  return { threads, getThread, ensureThread, updateThread, deleteThread, renameThread, clearThreads };
}
