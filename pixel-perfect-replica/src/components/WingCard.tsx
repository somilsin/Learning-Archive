import { Link } from "wouter";
import type { Wing } from "@/data/wings";

export function WingCard({ wing }: { wing: Wing }) {
  const statusStyle =
    wing.status === "open"
      ? { border: "1px solid var(--gold)", color: "var(--gold)" }
      : wing.status === "archived"
      ? { border: "1px solid #4f6e4a", color: "#9fbf99" }
      : { border: "1px solid var(--rule)", color: "var(--mist)" };

  const statusText =
    wing.status === "open"
      ? `WING OPEN — ENTRY ${String(wing.entry).padStart(3, "0")} / ${wing.total}`
      : wing.status === "archived"
      ? `ARCHIVED — ${wing.total}/${wing.total}`
      : "QUEUED";

  return (
    <Link
      href={`/wing/${wing.id}`}
      data-cursor="hover"
      style={{
        position: "relative",
        flex: "0 0 320px",
        width: 320,
        height: 440,
        /* Subtle gradient: slightly lighter warm top, slightly darker bottom */
        background: "linear-gradient(160deg, #201D18 0%, #1A1712 55%, #131109 100%)",
        padding: "28px 24px",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        textDecoration: "none",
        color: "inherit",
        border: "1px solid transparent",
        transition: "transform 0.25s ease, border-color 0.25s ease, box-shadow 0.25s ease",
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget as HTMLElement;
        el.style.transform = "translateY(-4px)";
        el.style.borderColor = "rgba(201,168,76,0.28)";
        el.style.boxShadow = "0 8px 40px rgba(201,168,76,0.07), 0 2px 12px rgba(0,0,0,0.6)";
        const num = el.querySelector<HTMLElement>("[data-roman]");
        if (num) num.style.opacity = "0.25";
        const shimmer = el.querySelector<HTMLElement>("[data-shimmer]");
        if (shimmer) shimmer.style.opacity = "1";
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget as HTMLElement;
        el.style.transform = "translateY(0)";
        el.style.borderColor = "transparent";
        el.style.boxShadow = "none";
        const num = el.querySelector<HTMLElement>("[data-roman]");
        if (num) num.style.opacity = "0.15";
        const shimmer = el.querySelector<HTMLElement>("[data-shimmer]");
        if (shimmer) shimmer.style.opacity = "0";
      }}
    >
      {/* Top-edge gold shimmer line — becomes visible on hover */}
      <span
        data-shimmer
        aria-hidden
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 1,
          background: "linear-gradient(90deg, transparent 0%, rgba(201,168,76,0.6) 50%, transparent 100%)",
          opacity: 0,
          transition: "opacity 0.3s ease",
          pointerEvents: "none",
        }}
      />

      <span
        data-roman
        className="font-display"
        style={{
          position: "absolute",
          top: -28,
          right: 16,
          fontSize: 140,
          fontWeight: 300,
          color: "var(--gold)",
          opacity: 0.15,
          lineHeight: 1,
          transition: "opacity 0.2s ease",
          pointerEvents: "none",
        }}
      >
        {wing.roman}
      </span>
      <div className="label-mono" style={{ color: "var(--mist)" }}>WING {wing.roman}</div>
      <h3
        className="font-display"
        style={{ fontSize: 28, fontWeight: 400, color: "var(--cream)", marginTop: 16, lineHeight: 1.15 }}
      >
        {wing.title}
      </h3>
      <div
        className="font-mono"
        style={{
          marginTop: 16,
          fontSize: 10,
          letterSpacing: "0.14em",
          padding: "6px 10px",
          alignSelf: "flex-start",
          ...statusStyle,
        }}
      >
        {statusText}
      </div>
      <p style={{ marginTop: 20, color: "var(--mist)", fontSize: 14, lineHeight: 1.6, flex: 1 }}>
        {wing.description}
      </p>
      <div className="label-mono" style={{ marginTop: 16, color: "var(--gold)" }}>ENTER WING →</div>
    </Link>
  );
}
