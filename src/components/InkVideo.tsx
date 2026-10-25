import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Play } from "lucide-react";
import { Button } from "@/components/ui/button";

/**
 * Explicitly starts muted playback and recovers from mobile autoplay blocks.
 * Reduced motion stays still until the visitor chooses to play.
 */
export function InkVideo({ src, fallbackSrc, poster, className }: { src: string; fallbackSrc?: string; poster?: string; className?: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [needsPlay, setNeedsPlay] = useState(false);
  const reducedMotion = useRef(false);
  const userRequestedPlay = useRef(false);

  function startPlayback(explicit = false) {
    if (explicit) userRequestedPlay.current = true;
    const video = videoRef.current;
    if (!video || document.hidden) return;
    if (reducedMotion.current && !userRequestedPlay.current) {
      setNeedsPlay(true);
      return;
    }
    video.muted = true;
    video.defaultMuted = true;
    video.playsInline = true;
    void video.play().then(() => setNeedsPlay(false)).catch(() => setNeedsPlay(true));
  }

  useEffect(() => {
    reducedMotion.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    startPlayback();
    const resume = () => startPlayback();
    document.addEventListener("visibilitychange", resume);
    document.addEventListener("pointerdown", resume);
    document.addEventListener("touchend", resume);
    document.addEventListener("keydown", resume);
    const retry = window.setInterval(() => {
      if (videoRef.current?.paused) startPlayback();
    }, 2000);
    return () => {
      document.removeEventListener("visibilitychange", resume);
      document.removeEventListener("pointerdown", resume);
      document.removeEventListener("touchend", resume);
      document.removeEventListener("keydown", resume);
      window.clearInterval(retry);
    };
  }, []);

  return (
    <div className={className}>
        <video
          ref={videoRef}
          poster={poster}
          loop
          muted
          playsInline
          preload="auto"
          onLoadedData={() => startPlayback()}
          onCanPlay={() => startPlayback()}
          onPlaying={() => setNeedsPlay(false)}
          onPause={() => setNeedsPlay(true)}
          aria-hidden
          className="absolute inset-0 h-full w-full object-cover"
        >
          {fallbackSrc && <source src={fallbackSrc} type="video/webm" />}
          <source src={src} type="video/mp4" />
        </video>
      {needsPlay && createPortal(
        <Button
          type="button"
          variant="secondary"
          size="icon"
          className="pointer-events-auto fixed bottom-4 left-4 z-50"
          aria-label="Play live wallpaper"
          title="Play live wallpaper"
          onClick={() => startPlayback(true)}
        >
          <Play />
        </Button>, document.body
      )}
    </div>
  );
}
