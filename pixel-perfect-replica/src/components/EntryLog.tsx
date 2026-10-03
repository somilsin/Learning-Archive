import { motion } from "framer-motion";
import { Link } from "wouter";
import { entries } from "@/data/entries";
import { EntryCard } from "./EntryCard";
import { Reveal } from "./Reveal";

export function EntryLog() {
  return (
    <section style={{
      position: "relative",
      padding: "120px 24px",
      background: "linear-gradient(180deg, #0E0C09 0%, #0A0C11 45%, #0C0E12 60%, #0E0C09 100%)",
      overflow: "hidden",
    }}>
      {/* Cool deep-blue ambient — like a glass vitrine exhibit case */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          top: "20%",
          right: "0",
          width: "50%",
          height: "60%",
          background:
            "radial-gradient(ellipse 80% 60% at 100% 50%, rgba(80,100,160,0.04) 0%, transparent 100%)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      <div style={{ maxWidth: 1180, margin: "0 auto", position: "relative", zIndex: 1 }}>
        <Reveal>
          <Link
            href="/wing/the-human-mind"
            data-cursor="hover"
            className="label-mono"
            style={{ color: "var(--mist)", textDecoration: "none" }}
          >
            WING I — THE HUMAN MIND ↗
          </Link>
        </Reveal>
        <Reveal delay={0.08}>
          <h2 className="font-display" style={{ fontSize: 44, fontStyle: "italic", margin: "16px 0 0", fontWeight: 400 }}>
            <span style={{ color: "var(--cream)" }}>Entries 001–003</span>{" "}
            <span style={{ color: "var(--gold)" }}>now open.</span>
          </h2>
        </Reveal>

        <div
          style={{
            marginTop: 56,
            display: "grid",
            gap: 24,
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          }}
        >
          {entries.map((e, i) => (
            <Reveal key={e.number} delay={i * 0.08}>
              <EntryCard entry={e} />
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.15}>
          <div style={{ marginTop: 56, display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 16, borderTop: "1px solid var(--rule)", paddingTop: 32 }}>
            <div className="label-mono" style={{ color: "var(--mist)" }}>
              WING I CONTINUES ON INSTAGRAM. 97 ENTRIES REMAIN.
            </div>
            <motion.div whileHover={{ x: 4 }} transition={{ duration: 0.2 }}>
              <Link
                href="/wing/the-human-mind"
                data-cursor="hover"
                className="label-mono"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  padding: "12px 20px",
                  border: "1px solid var(--gold)",
                  color: "var(--gold)",
                  textDecoration: "none",
                }}
              >
                ENTER WING I →
              </Link>
            </motion.div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
