import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Props {
  wingRoman?: string;
  total?: number;
}

export function ScrollProgress({ wingRoman, total = 100 }: Props) {
  const barRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const [pct, setPct] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      const scrollTotal = h.scrollHeight - h.clientHeight;
      const p = scrollTotal > 0 ? (h.scrollTop / scrollTotal) * 100 : 0;

      // Direct DOM manipulation — no React re-render per scroll tick, buttery smooth
      if (barRef.current) barRef.current.style.width = p + "%";
      if (glowRef.current) glowRef.current.style.opacity = p > 1 ? "1" : "0";

      // React state only for the label (batched, low-frequency)
      setPct(Math.round(p));
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const estimatedEntry = Math.max(1, Math.min(total, Math.round((pct / 100) * total)));
  const showChip = pct >= 6 && !!wingRoman;

  return (
    <>
      {/* 2px horizontal track */}
      <div
        aria-hidden
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          height: 2,
          background: "rgba(58,53,48,0.55)",
          zIndex: 60,
          pointerEvents: "none",
        }}
      >
        {/* Gold fill — width driven by direct DOM ref for zero-jank scrolling */}
        <div
          ref={barRef}
          style={{
            height: "100%",
            width: "0%",
            background:
              "linear-gradient(90deg, var(--gold) 0%, color-mix(in oklab, var(--gold) 70%, var(--cream)) 100%)",
          }}
        />

        {/* Trailing glow at the leading edge of the fill */}
        <div
          ref={glowRef}
          style={{
            position: "absolute",
            top: 0,
            right: `${100 - pct}%`,
            width: 40,
            height: "100%",
            background:
              "linear-gradient(90deg, transparent, rgba(201,168,76,0.7))",
            filter: "blur(3px)",
            opacity: 0,
            transition: "opacity 0.3s ease",
            pointerEvents: "none",
          }}
        />
      </div>

      {/* Floating wing / entry counter — slides down from the bar after 6% scroll */}
      <AnimatePresence>
        {showChip && (
          <motion.div
            key="wing-chip"
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            aria-hidden
            style={{
              position: "fixed",
              top: 10,
              right: 16,
              zIndex: 61,
              pointerEvents: "none",
            }}
          >
            <div
              className="label-mono"
              style={{
                background: "rgba(10,9,7,0.88)",
                border: "1px solid var(--rule)",
                padding: "5px 12px",
                letterSpacing: "0.08em",
                color: "var(--mist)",
                backdropFilter: "blur(10px)",
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
              }}
            >
              WING&nbsp;{wingRoman}
              <span style={{ color: "var(--rule)", margin: "0 2px" }}>—</span>
              ENTRY&nbsp;
              <span style={{ color: "var(--gold)", fontVariantNumeric: "tabular-nums" }}>
                {String(estimatedEntry).padStart(3, "0")}
              </span>
              <span style={{ color: "var(--stone)" }}>&nbsp;/&nbsp;{String(total).padStart(3, "0")}</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
