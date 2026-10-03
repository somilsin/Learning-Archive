import { useState } from "react";
import { Link } from "wouter";
import { WINGS } from "@/engine/lib/wings";
import type { Wing, PostOutput, GenerationStatus } from "@/engine/lib/types";
import { generatePost } from "@/engine/lib/claudeApi";
import { EngineForm } from "@/engine/EngineForm";
import { LoadingOverlay } from "@/engine/LoadingOverlay";
import { SlideViewer } from "@/engine/SlideViewer";
import { OutputPanel } from "@/engine/OutputPanel";

const E = {
  ink: "#0A0806", panel: "#141210", mist: "#6B6258",
  cream: "#F0EAE0", gold: "#C9A84C", dim: "#37322C",
};

interface HistoryEntry { entryNum: number; wing: Wing; factIdea: string }

export function PostEngine() {
  const [wing, setWing] = useState<Wing>(WINGS[0]);
  const [entryNum, setEntryNum] = useState(1);
  const [factIdea, setFactIdea] = useState("");
  const [status, setStatus] = useState<GenerationStatus>("idle");
  const [output, setOutput] = useState<PostOutput | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [lastWing, setLastWing] = useState<Wing>(WINGS[0]);
  const [lastEntry, setLastEntry] = useState(1);

  const run = async () => {
    setStatus("loading");
    setError(null);
    setOutput(null);
    setLastWing(wing);
    setLastEntry(entryNum);
    try {
      const result = await generatePost(wing, entryNum, factIdea);
      setOutput(result);
      setStatus("done");
      setHistory((h) => [{ entryNum, wing, factIdea }, ...h].slice(0, 5));
      setEntryNum((n) => n + 1);
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
      setStatus("error");
    }
  };

  return (
    <div style={{ minHeight: "100vh", background: E.ink, color: E.cream, fontFamily: "'JetBrains Mono', monospace" }}>
      <LoadingOverlay
        visible={status === "loading" || status === "error"}
        error={status === "error" ? error : null}
        onRetry={() => { setStatus("idle"); setError(null); }}
      />

      {/* Header */}
      <header style={{
        borderBottom: `1px solid ${E.dim}`, padding: "20px 40px",
        display: "flex", alignItems: "center", justifyContent: "space-between",
      }}>
        <div>
          <div style={{ fontSize: 11, color: E.gold, letterSpacing: "0.16em", textTransform: "uppercase", marginBottom: 4 }}>
            🏛 THE INFINITE ARCHIVE
          </div>
          <div style={{ fontSize: 20, color: E.cream, letterSpacing: "0.08em", textTransform: "uppercase" }}>
            Post Engine
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
          <span style={{ fontSize: 11, color: E.mist, letterSpacing: "0.1em" }}>
            @the_infinite_archive
          </span>
          <Link href="/" style={{ fontSize: 11, color: E.gold, textDecoration: "none", letterSpacing: "0.1em" }}>
            ← THE ARCHIVE
          </Link>
        </div>
      </header>

      {/* Main */}
      <main style={{ maxWidth: 900, margin: "0 auto", padding: "40px 24px" }}>
        {/* Form */}
        <section style={{ background: E.panel, border: `1px solid ${E.dim}`, padding: "28px 32px", marginBottom: 32 }}>
          <EngineForm
            wing={wing}
            entryNum={entryNum}
            factIdea={factIdea}
            onWingChange={setWing}
            onEntryChange={setEntryNum}
            onFactChange={setFactIdea}
            onSubmit={run}
            disabled={status === "loading"}
          />
        </section>

        {/* Results */}
        {output && (
          <>
            <div style={{ height: 1, background: E.dim, marginBottom: 32 }} />

            {/* Slide viewer */}
            <section style={{ marginBottom: 32 }}>
              <div style={{ fontSize: 11, color: E.gold, letterSpacing: "0.14em", textTransform: "uppercase", marginBottom: 20 }}>
                Slide Preview
              </div>
              <SlideViewer wing={lastWing} entryNum={lastEntry} output={output} />
            </section>

            <div style={{ height: 1, background: E.dim, marginBottom: 32 }} />

            {/* Output panel */}
            <section style={{ marginBottom: 40 }}>
              <div style={{ fontSize: 11, color: E.gold, letterSpacing: "0.14em", textTransform: "uppercase", marginBottom: 20 }}>
                Post Assets
              </div>
              <OutputPanel wing={lastWing} entryNum={lastEntry} output={output} />
            </section>
          </>
        )}

        {/* History */}
        {history.length > 0 && (
          <>
            <div style={{ height: 1, background: E.dim, marginBottom: 32 }} />
            <section>
              <div style={{ fontSize: 11, color: E.mist, letterSpacing: "0.14em", textTransform: "uppercase", marginBottom: 16 }}>
                Post History
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 1 }}>
                {history.map((h, i) => (
                  <div
                    key={i}
                    style={{
                      display: "flex", alignItems: "center", justifyContent: "space-between",
                      background: E.panel, padding: "12px 16px", gap: 16,
                    }}
                  >
                    <div style={{ display: "flex", gap: 16, alignItems: "baseline", flex: 1, minWidth: 0 }}>
                      <span style={{ fontSize: 11, color: E.gold, flexShrink: 0 }}>
                        WING {h.wing.roman} — {String(h.entryNum).padStart(3, "0")}
                      </span>
                      <span style={{ fontSize: 13, color: E.mist, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", fontFamily: "'Cormorant Garamond', serif" }}>
                        {h.factIdea}
                      </span>
                    </div>
                    <button
                      onClick={() => {
                        setWing(h.wing);
                        setEntryNum(h.entryNum);
                        setFactIdea(h.factIdea);
                      }}
                      style={{
                        fontFamily: "'JetBrains Mono', monospace",
                        fontSize: 10, letterSpacing: "0.1em", textTransform: "uppercase",
                        padding: "5px 10px", background: "transparent",
                        color: E.mist, border: `1px solid ${E.dim}`, cursor: "pointer", flexShrink: 0,
                      }}
                    >
                      USE
                    </button>
                  </div>
                ))}
              </div>
            </section>
          </>
        )}
      </main>
    </div>
  );
}
