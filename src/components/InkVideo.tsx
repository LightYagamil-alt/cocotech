import { useEffect, useRef, useState } from "react";

/**
 * Loads the ink-cloud loop only when it scrolls into view.
 * Always renders the video so the flagship background is never missing —
 * playback only pauses when the user prefers reduced motion.
 */
export function InkVideo({ src, fallbackSrc, poster, className }: { src: string; fallbackSrc?: string; poster?: string; className?: string }) {
  const holder = useRef<HTMLDivElement>(null);
  const [show, setShow] = useState(false);
  const reducedMotion = useRef(false);

  useEffect(() => {
    reducedMotion.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const el = holder.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setShow(true);
          io.disconnect();
        }
      },
      { rootMargin: "400px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={holder} className={className} aria-hidden>
      {poster && <img src={poster} alt="" className="absolute inset-0 h-full w-full object-cover" />}
      {show && (
        <video
          poster={poster}
          autoPlay={!reducedMotion.current}
          loop
          muted
          playsInline
          preload="auto"
          aria-hidden
          className="absolute inset-0 h-full w-full object-cover"
        >
          {fallbackSrc && <source src={fallbackSrc} type="video/webm" />}
          <source src={src} type="video/mp4" />
        </video>
      )}
    </div>
  );
}
