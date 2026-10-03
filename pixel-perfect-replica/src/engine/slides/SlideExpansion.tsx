import { forwardRef } from "react";
import type { Wing } from "../lib/types";
import type { SlideExpansionContent } from "../lib/types";

const E = {
  panel: "#141210", dim: "#37322C",
  mist: "#6B6258", cream: "#F0EAE0", gold: "#C9A84C",
};

interface Props {
  wing: Wing;
  entryNum: number;
  slideNum: 3 | 4 | 5;
  content: SlideExpansionContent;
}

export const SlideExpansion = forwardRef<HTMLDivElement, Props>(
  ({ wing, entryNum, slideNum, content }, ref) => {
    const entryStr = String(entryNum).padStart(3, "0");
    const titleLines = content.title.split("\n");
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
          backgroundSize: "40px 40px",
          opacity: 0.15,
        }} />

        {/* Accent glow — top-right */}
        <div style={{
          position: "absolute", top: -30, right: -30, width: 260, height: 260,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${wing.accentColor}33 0%, transparent 70%)`,
          filter: "blur(65px)",
          pointerEvents: "none",
        }} />

        {/* Gold glow — bottom-left */}
        <div style={{
          position: "absolute", bottom: -20, left: -20, width: 220, height: 220,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(201,168,76,0.12) 0%, transparent 70%)",
          filter: "blur(55px)",
          pointerEvents: "none",
        }} />

        {/* Ghost slide number */}
        <div style={{
          position: "absolute", top: 40, right: 48,
          fontSize: 200, fontFamily: "'Cormorant Garamond', serif",
          color: E.gold, opacity: 0.08, fontWeight: 300, lineHeight: 1,
          pointerEvents: "none", userSelect: "none",
        }}>
          {slideNum}
        </div>

        {/* Header */}
        <div style={{ position: "absolute", top: 48, left: 52, fontSize: 20, color: E.gold, letterSpacing: "0.12em", textTransform: "uppercase" }}>
          {wing.name.toUpperCase()} // {entryStr} / 100
        </div>
        <div style={{ position: "absolute", top: 48, right: 52, fontSize: 20, color: E.mist, letterSpacing: "0.1em", textTransform: "uppercase" }}>
          @the_infinite_archive
        </div>

        {/* Full-width divider */}
        <div style={{ position: "absolute", top: 90, left: 0, right: 0, height: 1, background: E.gold, opacity: 0.3 }} />

        {/* Content */}
        <div style={{ position: "absolute", top: 120, left: 52, right: 52, bottom: 120 }}>
          {/* Label */}
          <div style={{
            fontSize: 22, color: wing.accentColor, opacity: 0.9,
            letterSpacing: "0.14em", textTransform: "uppercase", fontWeight: 700,
          }}>
            {content.label}
          </div>
          <div style={{ width: 50, height: 1, background: E.gold, margin: "16px 0" }} />

          {/* Title */}
          <div style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontStyle: "italic", fontSize: 52, color: E.cream, fontWeight: 300,
            lineHeight: 1.18, marginBottom: 32,
          }}>
            {titleLines.map((line, i) => <div key={i}>{line}</div>)}
          </div>

          {/* Paragraphs */}
          <div style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 30, color: E.cream, opacity: 0.72,
            lineHeight: 1.7, marginBottom: 24,
          }}>
            {content.para1}
          </div>
          <div style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 30, color: E.cream, opacity: 0.72,
            lineHeight: 1.7,
          }}>
            {content.para2}
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
SlideExpansion.displayName = "SlideExpansion";
