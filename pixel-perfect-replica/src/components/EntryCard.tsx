import { motion } from "framer-motion";
import { Link } from "wouter";
import type { Entry } from "@/data/entries";

export function EntryCard({ entry }: { entry: Entry }) {
  return (
    <motion.article
      whileHover={{ y: -3, borderColor: "rgba(201,168,76,0.35)" }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      style={{
        position: "relative",
        background: "linear-gradient(170deg, #1E1B16 0%, #1A1712 50%, #141109 100%)",
        padding: "32px 28px",
        display: "flex",
        flexDirection: "column",
        height: "100%",
        border: "1px solid transparent",
        overflow: "hidden",
      }}
    >
      {/* Subtle inner ambient — a barely-visible warm glow at top-left corner */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "60%",
          height: "40%",
          background:
            "radial-gradient(ellipse at 0% 0%, rgba(201,168,76,0.04) 0%, transparent 100%)",
          pointerEvents: "none",
        }}
      />

      <div className="label-mono" style={{ color: "var(--gold)", position: "relative" }}>
        ENTRY {String(entry.number).padStart(3, "0")} / {entry.total}
      </div>
      <p className="font-display" style={{ marginTop: 20, fontSize: 20, lineHeight: 1.4, color: "var(--cream)", fontWeight: 400, flex: 1, position: "relative" }}>
        &ldquo;{entry.fact}&rdquo;
      </p>
      <p style={{ marginTop: 16, fontSize: 13, color: "var(--mist)", lineHeight: 1.7, position: "relative" }}>
        {entry.expansion}
      </p>
      <div style={{ height: 1, background: "var(--gold)", opacity: 0.4, marginTop: 24 }} />
      <div style={{ marginTop: 16, display: "flex", gap: 20, alignItems: "center", flexWrap: "wrap" }}>
        <Link
          href={`/wing/${entry.wingId}`}
          data-cursor="hover"
          className="label-mono"
          style={{ color: "var(--gold)", textDecoration: "none" }}
        >
          VIEW IN ARCHIVE →
        </Link>
        <a
          href="https://instagram.com/the_infinite_archives"
          target="_blank"
          rel="noreferrer"
          className="label-mono"
          data-cursor="hover"
          style={{ color: "var(--mist)", textDecoration: "none" }}
        >
          INSTAGRAM ↗
        </a>
      </div>
    </motion.article>
  );
}
