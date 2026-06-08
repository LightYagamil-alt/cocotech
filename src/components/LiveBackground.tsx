import { useEffect, useRef } from "react";

/**
 * Animated live background — flowing gradient orbs + grid mesh.
 * Lightweight canvas, no deps. Auto-pauses on reduced motion.
 */
export function LiveBackground({ className = "", variant = "default" }: { className?: string; variant?: "default" | "mesh" }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    let w = 0, h = 0;
    let raf = 0;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      w = rect.width; h = rect.height;
      canvas.width = w * dpr; canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    const orbs = Array.from({ length: 5 }, (_, i) => ({
      x: Math.random(), y: Math.random(),
      vx: (Math.random() - 0.5) * 0.0008,
      vy: (Math.random() - 0.5) * 0.0008,
      r: 0.25 + Math.random() * 0.25,
      hue: [275, 200, 320, 245, 190][i],
    }));

    const draw = (t: number) => {
      ctx.clearRect(0, 0, w, h);

      // Soft base wash
      const base = ctx.createLinearGradient(0, 0, w, h);
      base.addColorStop(0, "rgba(99, 102, 241, 0.05)");
      base.addColorStop(1, "rgba(236, 72, 153, 0.05)");
      ctx.fillStyle = base;
      ctx.fillRect(0, 0, w, h);

      // Grid mesh
      ctx.strokeStyle = "rgba(148, 163, 184, 0.08)";
      ctx.lineWidth = 1;
      const step = 56;
      const offset = (t * 0.01) % step;
      for (let x = -offset; x < w; x += step) {
        ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, h); ctx.stroke();
      }
      for (let y = -offset; y < h; y += step) {
        ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(w, y); ctx.stroke();
      }

      // Floating orbs
      for (const o of orbs) {
        o.x += o.vx; o.y += o.vy;
        if (o.x < 0 || o.x > 1) o.vx *= -1;
        if (o.y < 0 || o.y > 1) o.vy *= -1;
        const cx = o.x * w, cy = o.y * h, rad = o.r * Math.max(w, h);
        const grd = ctx.createRadialGradient(cx, cy, 0, cx, cy, rad);
        grd.addColorStop(0, `hsla(${o.hue}, 90%, 65%, 0.55)`);
        grd.addColorStop(1, `hsla(${o.hue}, 90%, 65%, 0)`);
        ctx.fillStyle = grd;
        ctx.fillRect(cx - rad, cy - rad, rad * 2, rad * 2);
      }
    };

    if (reduce) { draw(0); }
    else {
      const loop = (t: number) => { draw(t); raf = requestAnimationFrame(loop); };
      raf = requestAnimationFrame(loop);
    }

    return () => { cancelAnimationFrame(raf); ro.disconnect(); };
  }, [variant]);

  return (
    <canvas
      ref={ref}
      aria-hidden
      className={`pointer-events-none absolute inset-0 h-full w-full ${className}`}
    />
  );
}
