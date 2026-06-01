"use client";

import { cn } from "@/lib/utils";
import { memo } from "react";

export interface TextShimmerProps {
  children?: React.ReactNode;
  className?: string;
}

/**
 * Lightweight loading indicator used while the assistant is "thinking".
 *
 * Note: the previous implementation used `motion` + `bg-clip-text text-transparent`
 * with a continuously animated gradient background. On some GPUs (notably mobile
 * Chromium) that combined with rapid sibling re-renders during token streaming
 * to produce chromatic sub-pixel artifacts ("rainbow noise") over the streamed
 * text. A simple opacity pulse + dots avoids the text-clip compositing path
 * entirely and renders cleanly across themes.
 */
const ShimmerComponent = ({ children, className }: TextShimmerProps) => (
  <span className={cn("inline-flex items-center gap-2 text-muted-foreground", className)}>
    <span className="opacity-80">{children}</span>
    <span className="inline-flex gap-1" aria-hidden>
      <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-muted-foreground [animation-delay:-0.3s]" />
      <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-muted-foreground [animation-delay:-0.15s]" />
      <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-muted-foreground" />
    </span>
  </span>
);

export const Shimmer = memo(ShimmerComponent);
