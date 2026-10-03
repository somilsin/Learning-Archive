import { forwardRef } from "react";
import type { Wing } from "../lib/types";
import type { Source } from "../lib/types";

const E = {
  panel: "#141210", dim: "#37322C",
  mist: "#6B6258", cream: "#F0EAE0", gold: "#C9A84C",
};

interface Props {
  wing: Wing;
  entryNum: number;
  sources: Source[];
}

export const Slide6Sources = forwardRef<HTMLDivElement, Props>(
  ({ wing, entryNum, sources }, ref) => {
    const entryStr = String(entryNum).padStart(3, "0");
    const nextEntry = String(entryNum + 1).padStart(3, "0");
    const remaining = 100 - entryNum;
    return (
      <div ref={ref} data-slide-root style={{
        position: "relative", width: 1080, height: 1080, overflow: "hidden",
        background: E.panel,
        fontFamily: "'JetBrains Mono', monospace",
      }}>
        {/* Grid overlay */}
        <div style={{
          position: "absolute", inset: 0, pointerEvents: "none",
          backgroundImage: `linear-gradient(${E.dim} 1px, transparent 1px), linear-gradient(90deg, ${E.dim} 1px, transparent 1px)`,
          backgroundSize: "40px 40px", opacity: 0.15,
        }} />

        {/* Accent glow top-right */}
        <div style={{
          position: "absolute", top: -30, right: -30, width: 260, height: 260,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${wing.accentColor}33 0%, transparent 70%)`,
          filter: "blur(65px)", pointerEvents: "none",
        }} />

        {/* Ghost "6" */}
        <div style={{
          position: "absolute", top: 40, right: 48, fontSize: 200,
          fontFamily: "'Cormorant Garamond', serif", color: E.gold, opacity: 0.08,
          fontWeight: 300, lineHeight: 1, pointerEvents: "none", userSelect: "none",
        }}>6</div>

        {/* Header */}
        <div style={{ position: "absolute", top: 48, left: 52, fontSize: 20, color: E.gold, letterSpacing: "0.12em", textTransform: "uppercase" }}>
          {wing.name.toUpperCase()} // {entryStr} / 100
        </div>
        <div style={{ position: "absolute", top: 48, right: 52, fontSize: 20, color: E.mist, letterSpacing: "0.1em", textTransform: "uppercase" }}>
          @the_infinite_archive
        </div>

        {/* Divider */}
        <div style={{ position: "absolute", top: 90, left: 0, right: 0, height: 1, background: E.gold, opacity: 0.3 }} />

        {/* Content */}
        <div style={{ position: "absolute", top: 120, left: 52, right: 52 }}>
          {/* Closing title */}
          <div style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontStyle: "italic", fontSize: 52, color: E.gold, fontWeight: 300,
            lineHeight: 1.2, marginBottom: 28,
          }}>
            <div>Entry {nextEntry} opens</div>
            <div>tomorrow at 19:00 IST.</div>
          </div>

          {/* Divider */}
          <div style={{ width: "100%", height: 1, background: E.gold, opacity: 0.25, marginBottom: 36 }} />

          {/* Sources */}
          <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
            {sources.map((s, i) => (
              <div key={i}>
                <div style={{ fontSize: 22, color: E.gold, letterSpacing: "0.12em", textTransform: "uppercase", fontWeight: 700, marginBottom: 6 }}>
                  {s.label}
                </div>
                <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 30, color: E.mist, lineHeight: 1.4 }}>
                  {s.detail}
                </div>
              </div>
            ))}
          </div>

          {/* Divider */}
          <div style={{ width: "100%", height: 1, background: E.gold, opacity: 0.2, margin: "32px 0 24px" }} />

          {/* Closing lines */}
          <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 30, color: E.cream, lineHeight: 1.6, marginBottom: 12 }}>
            The full archive is open on the grid.
          </div>
          <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 30, color: E.mist, lineHeight: 1.5 }}>
            Wing {wing.roman} has {remaining} entries remaining.
          </div>
          <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 30, color: E.mist, lineHeight: 1.5, marginTop: 8 }}>
            The chapter does not close until 100.
          </div>
        </div>

        {/* Bottom rule */}
        <div style={{ position: "absolute", bottom: 110, left: 52, right: 52, height: 1, background: E.gold, opacity: 0.25 }} />

        {/* Watermark */}
        <div style={{
          position: "absolute", bottom: 44, left: 0, right: 0, textAlign: "center",
          fontSize: 17, color: E.dim, letterSpacing: "0.08em", textTransform: "uppercase",
        }}>
          @the_infinite_archive — THE MUSEUM OF PRIMAL KNOWLEDGE
        </div>
      </div>
    );
  }
);
Slide6Sources.displayName = "Slide6Sources";
