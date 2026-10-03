import { useState } from "react";
import type { Wing } from "./lib/types";
import type { PostOutput } from "./lib/types";
import { buildCalendarLink } from "./lib/calendarLink";

const E = { mist: "#6B6258", cream: "#F0EAE0", gold: "#C9A84C", dim: "#37322C", panel: "#141210" };

const panelStyle: React.CSSProperties = {
  background: E.panel,
  border: "1px solid #1E1B16",
  padding: "20px 24px",
};

const panelLabel: React.CSSProperties = {
  fontFamily: "'JetBrains Mono', monospace",
  fontSize: 11, letterSpacing: "0.14em", textTransform: "uppercase",
  color: E.gold, marginBottom: 14, display: "block",
};

const btn: React.CSSProperties = {
  fontFamily: "'JetBrains Mono', monospace",
  fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase",
  padding: "7px 14px", background: "transparent",
  color: E.gold, border: "1px solid #37322C", cursor: "pointer",
};

function CaptionBox({ caption }: { caption: string }) {
  const [copied, setCopied] = useState(false);
  const copy = () => {
    navigator.clipboard.writeText(caption);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <div style={panelStyle}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
        <span style={panelLabel}>Instagram Caption — Copy This</span>
        <button style={btn} onClick={copy}>{copied ? "COPIED ✓" : "COPY"}</button>
      </div>
      <pre style={{
        fontFamily: "'JetBrains Mono', monospace",
        fontSize: 13, color: E.cream, lineHeight: 1.7,
        whiteSpace: "pre-wrap", wordBreak: "break-word", margin: 0,
      }}>
        {caption}
      </pre>
    </div>
  );
}

function VideoSection({ pexelsQuery }: { pexelsQuery: string }) {
  const encoded = encodeURIComponent(pexelsQuery);
  const hyphenated = pexelsQuery.replace(/ /g, "-");
  return (
    <div style={panelStyle}>
      <span style={panelLabel}>Video Brief</span>
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        <div>
          <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: E.mist, letterSpacing: "0.08em", marginRight: 12 }}>PEXELS SEARCH</span>
          <a href={`https://www.pexels.com/search/videos/${encoded}/`} target="_blank" rel="noreferrer"
            style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 18, color: E.gold, textDecoration: "none" }}>
            {pexelsQuery} ↗
          </a>
        </div>
        <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: E.dim, letterSpacing: "0.06em" }}>
          ALSO TRY:{" "}
          <a href={`https://mixkit.co/free-stock-video/${hyphenated}/`} target="_blank" rel="noreferrer" style={{ color: E.mist, textDecoration: "none" }}>Mixkit</a>
          {" · "}
          <a href={`https://coverr.co/s?q=${encoded}`} target="_blank" rel="noreferrer" style={{ color: E.mist, textDecoration: "none" }}>Coverr</a>
        </div>
      </div>
    </div>
  );
}

function AudioSection({ brief }: { brief: string }) {
  return (
    <div style={panelStyle}>
      <span style={panelLabel}>Audio Brief</span>
      <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 20, color: E.cream, lineHeight: 1.6, margin: "0 0 12px" }}>
        {brief}
      </p>
      <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: E.mist, letterSpacing: "0.06em", margin: 0 }}>
        Search this description in CapCut's built-in audio library.
      </p>
    </div>
  );
}

function CalendarSection({ entryNum, wing, caption }: { entryNum: number; wing: Wing; caption: string }) {
  const link = buildCalendarLink(entryNum, wing.name, caption);
  return (
    <div style={panelStyle}>
      <span style={panelLabel}>Schedule</span>
      <a
        href={link}
        target="_blank"
        rel="noreferrer"
        style={{
          display: "inline-block",
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: 12, letterSpacing: "0.14em", textTransform: "uppercase",
          padding: "12px 28px", background: "#C9A84C", color: "#0A0806",
          textDecoration: "none",
        }}
      >
        ADD TO GOOGLE CALENDAR ↗
      </a>
      <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: E.mist, letterSpacing: "0.06em", margin: "12px 0 0" }}>
        Pre-filled for tomorrow at 19:00 IST
      </p>
    </div>
  );
}

interface Props {
  wing: Wing;
  entryNum: number;
  output: PostOutput;
}

export function OutputPanel({ wing, entryNum, output }: Props) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      <CaptionBox caption={output.caption} />
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
        <VideoSection pexelsQuery={output.pexelsQuery} />
        <AudioSection brief={output.capCutBrief} />
      </div>
      <CalendarSection entryNum={entryNum} wing={wing} caption={output.caption} />
    </div>
  );
}
