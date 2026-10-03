import { forwardRef } from "react";
import type { Wing } from "../lib/types";

const E = {
  ink: "#0A0806", dim: "#37322C",
  mist: "#6B6258", cream: "#F0EAE0", gold: "#C9A84C",
};

function parseReelText(raw: string): { text: string; gold: boolean }[] {
  const parts: { text: string; gold: boolean }[] = [];
  let remaining = raw;
  while (remaining.length > 0) {
    const start = remaining.indexOf("[GOLD]");
    if (start === -1) { parts.push({ text: remaining, gold: false }); break; }
    if (start > 0) parts.push({ text: remaining.slice(0, start), gold: false });
    const end = remaining.indexOf("[/GOLD]", start);
    if (end === -1) { parts.push({ text: remaining.slice(start + 6), gold: true }); break; }
    parts.push({ text: remaining.slice(start + 6, end), gold: true });
    remaining = remaining.slice(end + 7);
  }
  return parts;
}

interface Props {
  wing: Wing;
  entryNum: number;
  reelText: string;
  pexelsQuery: string;
  capCutBrief: string;
}

export const Slide2Reel = forwardRef<HTMLDivElement, Props>(
  ({ wing, entryNum, reelText, pexelsQuery, capCutBrief }, ref) => {
    const entryStr = String(entryNum).padStart(3, "0");
    const parts = parseReelText(reelText);
    return (
      <div ref={ref} data-slide-root style={{
        position: "relative", width: 1080, height: 1080, overflow: "hidden",
        background: "#080712",
        fontFamily: "'JetBrains Mono', monospace",
      }}>
        {/* Scanline texture */}
        <div style={{
          position: "absolute", inset: 0, pointerEvents: "none",
          backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 6px, rgba(255,255,255,0.018) 7px)",
        }} />

        {/* Sparse stars */}
        {Array.from({ length: 60 }, (_, i) => {
          const x = (i * 2345678 + 111111) % 1080;
          const y = (i * 876543 + 222222) % 1080;
          return <div key={i} style={{ position: "absolute", left: x, top: y, width: 1, height: 1, background: "white", opacity: ((i * 54321) % 50 + 15) / 100 }} />;
        })}

        {/* Header */}
        <div style={{ position: "absolute", top: 52, left: 52, fontSize: 22, color: E.gold, letterSpacing: "0.12em", textTransform: "uppercase" }}>
          REEL // ENTRY {entryStr}
        </div>
        <div style={{ position: "absolute", top: 52, right: 52, fontSize: 22, color: E.mist, letterSpacing: "0.1em", textTransform: "uppercase" }}>
          5–6 SEC LOOP
        </div>

        {/* Centre block */}
        <div style={{
          position: "absolute", top: "50%", left: "50%",
          transform: "translate(-50%, -50%)",
          width: 900, textAlign: "center",
          display: "flex", flexDirection: "column", alignItems: "center", gap: 0,
        }}>
          <div style={{ fontSize: 24, color: E.gold, letterSpacing: "0.12em", textTransform: "uppercase" }}>
            {wing.name.toUpperCase()} // ENTRY {entryStr} / 100
          </div>
          <div style={{ width: 60, height: 1, background: E.gold, margin: "24px 0" }} />
          <div style={{
            fontSize: 48, fontFamily: "'Cormorant Garamond', serif",
            fontStyle: "italic", lineHeight: 1.55, color: E.cream,
          }}>
            {parts.map((p, i) => (
              <span key={i} style={{ color: p.gold ? E.gold : E.cream }}>{p.text}</span>
            ))}
          </div>
          <div style={{ width: 60, height: 1, background: E.gold, margin: "24px 0" }} />
        </div>

        {/* Bottom notes */}
        <div style={{ position: "absolute", bottom: 110, left: 52, right: 52 }}>
          <div style={{ fontSize: 18, color: E.mist, opacity: 0.5, letterSpacing: "0.06em", marginBottom: 8 }}>
            VIDEO: Pexels → &quot;{pexelsQuery}&quot;
          </div>
          <div style={{ fontSize: 18, color: E.mist, opacity: 0.5, letterSpacing: "0.06em" }}>
            AUDIO: {capCutBrief.slice(0, 80)}...
          </div>
        </div>

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
Slide2Reel.displayName = "Slide2Reel";
