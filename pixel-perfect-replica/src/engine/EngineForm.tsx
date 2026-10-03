import type { Wing } from "./lib/types";
import { WINGS } from "./lib/wings";

interface Props {
  wing: Wing;
  entryNum: number;
  factIdea: string;
  onWingChange: (w: Wing) => void;
  onEntryChange: (n: number) => void;
  onFactChange: (s: string) => void;
  onSubmit: () => void;
  disabled: boolean;
}

const inp: React.CSSProperties = {
  background: "#141210",
  border: "1px solid #37322C",
  color: "#F0EAE0",
  fontFamily: "'JetBrains Mono', monospace",
  fontSize: 14,
  padding: "10px 14px",
  outline: "none",
  letterSpacing: "0.04em",
  transition: "border-color 200ms ease",
};

const label: React.CSSProperties = {
  fontFamily: "'JetBrains Mono', monospace",
  fontSize: 11,
  color: "#6B6258",
  letterSpacing: "0.12em",
  textTransform: "uppercase",
  marginBottom: 6,
  display: "block",
};

export function EngineForm({
  wing, entryNum, factIdea, onWingChange, onEntryChange, onFactChange, onSubmit, disabled,
}: Props) {
  return (
    <form
      onSubmit={(e) => { e.preventDefault(); onSubmit(); }}
      style={{ display: "flex", flexDirection: "column", gap: 16 }}
    >
      <div style={{ display: "grid", gridTemplateColumns: "1fr 140px", gap: 12 }}>
        {/* Wing dropdown */}
        <div>
          <label style={label}>Wing Name</label>
          <select
            style={{ ...inp, width: "100%", cursor: "pointer" }}
            value={wing.id}
            onChange={(e) => {
              const found = WINGS.find((w) => w.id === Number(e.target.value));
              if (found) onWingChange(found);
            }}
            disabled={disabled}
          >
            {WINGS.map((w) => (
              <option key={w.id} value={w.id}>
                WING {w.roman} — {w.name}
              </option>
            ))}
          </select>
        </div>

        {/* Entry number */}
        <div>
          <label style={label}>Entry #</label>
          <input
            type="number"
            min={1}
            max={100}
            style={{ ...inp, width: "100%" }}
            value={entryNum}
            onChange={(e) => onEntryChange(Math.max(1, Math.min(100, Number(e.target.value))))}
            disabled={disabled}
          />
        </div>
      </div>

      {/* Fact idea */}
      <div>
        <label style={label}>Fact Idea — one sentence</label>
        <textarea
          style={{ ...inp, width: "100%", height: 64, resize: "vertical", boxSizing: "border-box" }}
          placeholder="e.g. Your brain lives 80ms in the past"
          value={factIdea}
          onChange={(e) => onFactChange(e.target.value)}
          disabled={disabled}
        />
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={disabled || factIdea.trim().length < 8}
        style={{
          alignSelf: "flex-end",
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: 13,
          letterSpacing: "0.14em",
          textTransform: "uppercase",
          padding: "12px 32px",
          background: disabled || factIdea.trim().length < 8 ? "#37322C" : "#C9A84C",
          color: disabled || factIdea.trim().length < 8 ? "#6B6258" : "#0A0806",
          border: "none",
          cursor: disabled || factIdea.trim().length < 8 ? "not-allowed" : "pointer",
          transition: "background 200ms ease, color 200ms ease",
        }}
      >
        GENERATE POST →
      </button>
    </form>
  );
}
