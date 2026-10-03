import { forwardRef } from "react";
import { WingIllustration } from "./WingIllustrations";
import type { Wing } from "../lib/types";

const E = {
  ink: "#0A0806", panel: "#141210", dim: "#37322C",
  mist: "#6B6258", cream: "#F0EAE0", gold: "#C9A84C",
};

function Stars() {
  return (
    <>
      {Array.from({ length: 200 }, (_, i) => {
        const x = (i * 1234567 + 987654) % 1080;
        const y = (i * 765432 + 123456) % 1080;
        const op = ((i * 543210) % 70 + 10) / 100;
        const r = ((i * 321098) % 10 + 5) / 10;
        return (
          <div key={i} style={{
            position: "absolute", left: x, top: y,
            width: r * 2, height: r * 2, borderRadius: "50%",
            background: "white", opacity: op,
          }} />
        );
      })}
    </>
  );
}

function CornerBracket({ pos }: { pos: { top?: number; bottom?: number; left?: number; right?: number } }) {
  const isRight = pos.right !== undefined;
  const isBottom = pos.bottom !== undefined;
  const size = 20;
  return (
    <div style={{
      position: "absolute", ...pos,
      width: size, height: size,
      borderTop: isBottom ? "none" : `1px solid ${E.gold}`,
      borderBottom: isBottom ? `1px solid ${E.gold}` : "none",
      borderLeft: isRight ? "none" : `1px solid ${E.gold}`,
      borderRight: isRight ? `1px solid ${E.gold}` : "none",
      opacity: 0.35,
    }} />
  );
}

interface Props {
  wing: Wing;
  entryNum: number;
}

export const Slide1Cover = forwardRef<HTMLDivElement, Props>(({ wing, entryNum }, ref) => {
  const entryStr = String(entryNum).padStart(3, "0");
  return (
    <div ref={ref} data-slide-root style={{
      position: "relative", width: 1080, height: 1080, overflow: "hidden",
      background: "radial-gradient(ellipse 80% 80% at 50% 50%, #060512 0%, #020208 100%)",
      fontFamily: "'JetBrains Mono', monospace",
    }}>
      <Stars />

      {/* Corner brackets */}
      <CornerBracket pos={{ top: 32, left: 32 }} />
      <CornerBracket pos={{ top: 32, right: 32 }} />
      <CornerBracket pos={{ bottom: 32, left: 32 }} />
      <CornerBracket pos={{ bottom: 32, right: 32 }} />

      {/* Header */}
      <div style={{ position: "absolute", top: 52, left: 52, fontSize: 18, color: E.gold, opacity: 0.7, letterSpacing: "0.12em", textTransform: "uppercase" }}>
        THE INFINITE ARCHIVE
      </div>
      <div style={{ position: "absolute", top: 52, right: 52, fontSize: 18, color: E.mist, opacity: 0.6, letterSpacing: "0.1em", textTransform: "uppercase" }}>
        @the_infinite_archive
      </div>

      {/* Ghost entry number */}
      <div style={{
        position: "absolute", top: 60, left: 52,
        fontSize: 280, fontFamily: "'Cormorant Garamond', serif",
        color: E.gold, opacity: 0.08, fontWeight: 300, lineHeight: 1,
        letterSpacing: "-0.04em", pointerEvents: "none", userSelect: "none",
      }}>
        {entryStr}
      </div>

      {/* Wing illustration + outer ring */}
      <div style={{ position: "absolute", top: 300, left: "50%", transform: "translateX(-50%)" }}>
        <WingIllustration bgType={wing.bgType} />
      </div>

      {/* Bottom section */}
      <div style={{
        position: "absolute", bottom: 100, left: 0, right: 0,
        display: "flex", flexDirection: "column", alignItems: "center", gap: 0,
      }}>
        <div style={{ fontSize: 22, color: E.gold, letterSpacing: "0.14em", textTransform: "uppercase" }}>
          WING {wing.roman} — EXHIBIT {entryStr} / 100
        </div>
        <div style={{ width: 100, height: 1, background: E.gold, margin: "20px 0" }} />
        <div style={{
          fontSize: 58, fontFamily: "'Cormorant Garamond', serif",
          fontStyle: "italic", color: E.cream, fontWeight: 300,
          letterSpacing: "-0.02em", lineHeight: 1.1,
        }}>
          {wing.name}
        </div>
        <div style={{ marginTop: 20, fontSize: 18, color: E.mist, letterSpacing: "0.16em", textTransform: "uppercase" }}>
          100 FACTS · ZERO FILLER · NO SKIPPING
        </div>
      </div>

      {/* Footer */}
      <div style={{
        position: "absolute", bottom: 44, left: 0, right: 0, textAlign: "center",
        fontSize: 17, color: E.dim, letterSpacing: "0.08em", textTransform: "uppercase",
      }}>
        @the_infinite_archive — THE MUSEUM OF PRIMAL KNOWLEDGE
      </div>
    </div>
  );
});
Slide1Cover.displayName = "Slide1Cover";
