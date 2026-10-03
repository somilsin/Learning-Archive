import { useRef, useState } from "react";
import type { Wing } from "./lib/types";
import type { PostOutput } from "./lib/types";
import { downloadSlide, downloadAllSlides } from "./lib/slideDownload";
import { Slide1Cover } from "./slides/Slide1Cover";
import { Slide2Reel } from "./slides/Slide2Reel";
import { SlideExpansion } from "./slides/SlideExpansion";
import { Slide6Sources } from "./slides/Slide6Sources";

const PREVIEW_SIZE = 480;
const SCALE = PREVIEW_SIZE / 1080;

interface Props {
  wing: Wing;
  entryNum: number;
  output: PostOutput;
}

const btn: React.CSSProperties = {
  fontFamily: "'JetBrains Mono', monospace",
  fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase",
  padding: "8px 16px",
  background: "transparent", color: "#C9A84C",
  border: "1px solid #37322C", cursor: "pointer",
  transition: "border-color 200ms ease",
};

export function SlideViewer({ wing, entryNum, output }: Props) {
  const [active, setActive] = useState(0);
  const [dlAll, setDlAll] = useState(false);
  const refs = [useRef<HTMLDivElement>(null), useRef<HTMLDivElement>(null), useRef<HTMLDivElement>(null), useRef<HTMLDivElement>(null), useRef<HTMLDivElement>(null), useRef<HTMLDivElement>(null)];
  const entryStr = String(entryNum).padStart(3, "0");

  const slideLabels = ["COVER", "REEL", "MECHANISM", "EVIDENCE", "IMPLICATION", "SOURCES"];

  const handleDownloadAll = async () => {
    setDlAll(true);
    await downloadAllSlides(refs, entryNum, wing.roman);
    setDlAll(false);
  };

  const sharedProps = { wing, entryNum };

  return (
    <div>
      {/* Off-screen full-size slides for html2canvas capture */}
      <div aria-hidden style={{ position: "fixed", left: -1200, top: 0, pointerEvents: "none", zIndex: -1 }}>
        <div ref={refs[0]}><Slide1Cover {...sharedProps} /></div>
        <div ref={refs[1]}><Slide2Reel {...sharedProps} reelText={output.reelText} pexelsQuery={output.pexelsQuery} capCutBrief={output.capCutBrief} /></div>
        <div ref={refs[2]}><SlideExpansion {...sharedProps} slideNum={3} content={output.slides.slide3} /></div>
        <div ref={refs[3]}><SlideExpansion {...sharedProps} slideNum={4} content={output.slides.slide4} /></div>
        <div ref={refs[4]}><SlideExpansion {...sharedProps} slideNum={5} content={output.slides.slide5} /></div>
        <div ref={refs[5]}><Slide6Sources {...sharedProps} sources={output.slides.slide6.sources} /></div>
      </div>

      {/* Nav row */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <button onClick={() => setActive((a) => (a - 1 + 6) % 6)} style={{ ...btn, padding: "8px 12px" }}>←</button>
          <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, color: "#6B6258", letterSpacing: "0.1em" }}>
            SLIDE {active + 1} / 6 — {slideLabels[active]}
          </span>
          <button onClick={() => setActive((a) => (a + 1) % 6)} style={{ ...btn, padding: "8px 12px" }}>→</button>
        </div>
        <button
          style={btn}
          onClick={() => downloadSlide(refs[active], `archive-wing${wing.roman}-entry${entryStr}-slide${active + 1}.png`)}
        >
          ↓ DOWNLOAD SLIDE {active + 1}
        </button>
      </div>

      {/* Preview */}
      <div style={{
        width: PREVIEW_SIZE, height: PREVIEW_SIZE,
        overflow: "hidden", position: "relative",
        border: "1px solid #1E1B16",
      }}>
        <div style={{ width: 1080, height: 1080, transform: `scale(${SCALE})`, transformOrigin: "top left" }}>
          {active === 0 && <Slide1Cover {...sharedProps} />}
          {active === 1 && <Slide2Reel {...sharedProps} reelText={output.reelText} pexelsQuery={output.pexelsQuery} capCutBrief={output.capCutBrief} />}
          {active === 2 && <SlideExpansion {...sharedProps} slideNum={3} content={output.slides.slide3} />}
          {active === 3 && <SlideExpansion {...sharedProps} slideNum={4} content={output.slides.slide4} />}
          {active === 4 && <SlideExpansion {...sharedProps} slideNum={5} content={output.slides.slide5} />}
          {active === 5 && <Slide6Sources {...sharedProps} sources={output.slides.slide6.sources} />}
        </div>
      </div>

      {/* Slide tabs + Download All */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 12 }}>
        <div style={{ display: "flex", gap: 6 }}>
          {slideLabels.map((label, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              style={{
                ...btn,
                padding: "6px 10px",
                fontSize: 10,
                borderColor: active === i ? "#C9A84C" : "#1E1B16",
                color: active === i ? "#C9A84C" : "#6B6258",
              }}
            >
              {i + 1}
            </button>
          ))}
        </div>
        <button
          style={{ ...btn, color: dlAll ? "#6B6258" : "#C9A84C" }}
          onClick={handleDownloadAll}
          disabled={dlAll}
        >
          {dlAll ? "DOWNLOADING..." : "↓ DOWNLOAD ALL 6"}
        </button>
      </div>
    </div>
  );
}
