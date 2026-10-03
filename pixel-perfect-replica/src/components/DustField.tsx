import { useEffect, useRef } from "react";

type Dot = {
  x: number;
  y: number;
  r: number;
  vy: number;
  vx: number;
  opacity: number;
  parallax: number;
};

// Three depth layers — each has its own size, opacity, drift speed, and parallax factor.
// Near  (layer 0): large, bright, drifts fastest, shifts most on scroll → feels closest.
// Mid   (layer 1): medium.
// Far   (layer 2): tiny, dim, barely moves on scroll → feels very distant.
const LAYERS = [
  { count: 14, rMin: 1.4, rMax: 2.4, opacity: 0.15, vyScale: 0.22, parallax: 0.18 },
  { count: 22, rMin: 0.7, rMax: 1.4, opacity: 0.08, vyScale: 0.13, parallax: 0.07 },
  { count: 24, rMin: 0.3, rMax: 0.75, opacity: 0.04, vyScale: 0.06, parallax: 0.022 },
];

export function DustField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const scrollRef = useRef(0);

  useEffect(() => {
    const c = canvasRef.current;
    if (!c) return;
    const ctx = c.getContext("2d");
    if (!ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const dpr = window.devicePixelRatio || 1;

    let w = (c.width = c.offsetWidth * dpr);
    let h = (c.height = c.offsetHeight * dpr);

    const dots: Dot[] = [];
    for (const layer of LAYERS) {
      for (let i = 0; i < layer.count; i++) {
        dots.push({
          x: Math.random() * w,
          y: Math.random() * h,
          r: (Math.random() * (layer.rMax - layer.rMin) + layer.rMin) * dpr,
          vy: -(Math.random() * layer.vyScale + 0.03) * dpr,
          vx: (Math.random() - 0.5) * 0.045 * dpr,
          opacity: layer.opacity,
          parallax: layer.parallax,
        });
      }
    }

    let raf = 0;

    const draw = () => {
      ctx.clearRect(0, 0, w, h);

      const scrollOffset = scrollRef.current;

      for (const d of dots) {
        // advance position
        d.x += d.vx;
        d.y += d.vy;

        // wrap vertically
        if (d.y < -2 * dpr) { d.y = h + 2 * dpr; d.x = Math.random() * w; }
        // wrap horizontally
        if (d.x < -2 * dpr) d.x = w + 2 * dpr;
        else if (d.x > w + 2 * dpr) d.x = -2 * dpr;

        // parallax: near particles shift up more than far ones as user scrolls down
        const drawY = d.y - scrollOffset * d.parallax * dpr;

        ctx.globalAlpha = d.opacity;
        ctx.fillStyle = "rgb(201,168,76)";
        ctx.beginPath();
        ctx.arc(d.x, drawY, d.r, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.globalAlpha = 1;

      if (!reduce) raf = requestAnimationFrame(draw);
    };

    draw();

    const onScroll = () => { scrollRef.current = window.scrollY; };
    const onResize = () => {
      w = c.width = c.offsetWidth * dpr;
      h = c.height = c.offsetHeight * dpr;
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
      }}
    />
  );
}
