import { useEffect, useState } from "react";

const STEPS = [
  "Initialising the archive...",
  "Generating reel text...",
  "Writing expansion slides...",
  "Composing caption...",
  "Sourcing video brief...",
];

interface Props {
  visible: boolean;
  error: string | null;
  onRetry: () => void;
}

export function LoadingOverlay({ visible, error, onRetry }: Props) {
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (!visible || error) return;
    setStep(0);
    const timers = [900, 1800, 2700, 3600].map((delay, i) =>
      setTimeout(() => setStep(i + 1), delay)
    );
    return () => timers.forEach(clearTimeout);
  }, [visible, error]);

  if (!visible) return null;

  return (
    <div style={{
      position: "fixed", inset: 0, zIndex: 200,
      background: "rgba(10,8,6,0.97)",
      display: "flex", alignItems: "center", justifyContent: "center",
      fontFamily: "'JetBrains Mono', monospace",
    }}>
      <div style={{ width: 480, display: "flex", flexDirection: "column", gap: 0 }}>
        {error ? (
          <>
            <div style={{ fontSize: 13, color: "#885050", letterSpacing: "0.16em", textTransform: "uppercase", marginBottom: 20 }}>
              ARCHIVE UNAVAILABLE
            </div>
            <div style={{ fontSize: 14, color: "#6B6258", marginBottom: 32, lineHeight: 1.6 }}>
              {error}
            </div>
            <div style={{ fontSize: 12, color: "#37322C", marginBottom: 24, letterSpacing: "0.08em" }}>
              The system will retry in 10 seconds.
            </div>
            <button
              onClick={onRetry}
              style={{
                alignSelf: "flex-start",
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 12, letterSpacing: "0.12em", textTransform: "uppercase",
                padding: "10px 24px",
                background: "transparent", color: "#C9A84C",
                border: "1px solid #37322C", cursor: "pointer",
              }}
            >
              RETRY NOW
            </button>
          </>
        ) : (
          <>
            <div style={{ fontSize: 13, color: "#C9A84C", letterSpacing: "0.16em", textTransform: "uppercase", marginBottom: 24 }}>
              INITIALISING THE ARCHIVE...
            </div>

            {/* Progress bar */}
            <div style={{ width: "100%", height: 2, background: "#1E1B16", marginBottom: 32, position: "relative", overflow: "hidden" }}>
              <div style={{
                position: "absolute", top: 0, left: 0, height: "100%",
                background: "#C9A84C",
                width: `${Math.min(95, (step / (STEPS.length - 1)) * 100)}%`,
                transition: "width 0.8s ease",
              }} />
            </div>

            {/* Steps */}
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              {STEPS.slice(1).map((s, i) => {
                const done = step > i;
                const active = step === i;
                return (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <div style={{
                      width: 16, height: 16, flexShrink: 0,
                      border: `1px solid ${done ? "#C9A84C" : "#37322C"}`,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontSize: 10, color: "#C9A84C",
                    }}>
                      {done ? "✓" : ""}
                    </div>
                    <div style={{
                      fontSize: 13, letterSpacing: "0.08em",
                      color: done ? "#F0EAE0" : active ? "#C9A84C" : "#37322C",
                      transition: "color 200ms ease",
                    }}>
                      {s}
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
