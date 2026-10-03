import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { entries } from "@/data/entries";
import { Reveal } from "./Reveal";

export function PhoneMockup() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((v) => (v + 1) % entries.length), 4000);
    return () => clearInterval(t);
  }, []);
  const e = entries[i];

  return (
    <section style={{ padding: "120px 24px", background: "var(--ink)" }}>
      <div style={{ maxWidth: 1080, margin: "0 auto", textAlign: "center" }}>
        <Reveal>
          <div className="label-mono" style={{ color: "var(--mist)" }}>FROM THE ACTIVE EXHIBIT</div>
        </Reveal>
        <Reveal delay={0.08}>
          <h2 className="font-display" style={{ fontSize: 44, fontStyle: "italic", margin: "16px 0 56px", fontWeight: 400, color: "var(--cream)" }}>
            Entry 001 — <span style={{ color: "var(--gold)" }}>currently open.</span>
          </h2>
        </Reveal>

        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 24, flexWrap: "wrap" }}>
          <button
            data-cursor="hover"
            onClick={() => setI((v) => (v - 1 + entries.length) % entries.length)}
            aria-label="Previous"
            style={{ background: "transparent", border: "1px solid var(--rule)", color: "var(--gold)", padding: 10, borderRadius: 999 }}
          >
            <ChevronLeft size={18} />
          </button>

          <div
            style={{
              position: "relative",
              width: "min(390px, 90vw)",
              height: "min(720px, 80vh)",
              background: "var(--panel)",
              borderRadius: 44,
              border: "1px solid var(--rule)",
              overflow: "hidden",
              boxShadow: "0 40px 120px rgba(0,0,0,0.6)",
            }}
          >
            <div
              aria-hidden
              style={{
                position: "absolute",
                inset: 0,
                background:
                  "radial-gradient(120% 70% at 50% 0%, rgba(201,168,76,0.06), transparent 60%), linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.6) 100%)",
              }}
            />
            <AnimatePresence mode="wait">
              <motion.div
                key={e.number}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                style={{
                  position: "absolute",
                  inset: 0,
                  padding: "48px 28px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "space-between",
                  textAlign: "center",
                }}
              >
                <div className="label-mono" style={{ color: "var(--gold)" }}>
                  THE HUMAN MIND // ENTRY {String(e.number).padStart(3, "0")} / {e.total}
                </div>
                <p className="font-display" style={{ fontSize: 22, lineHeight: 1.4, color: "var(--cream)", fontWeight: 400 }}>
                  &ldquo;{e.fact}&rdquo;
                </p>
                <div className="font-mono" style={{ fontSize: 9, letterSpacing: "0.14em", color: "var(--mist)" }}>
                  @the_infinite_archives — THE MUSEUM OF PRIMAL KNOWLEDGE
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <button
            data-cursor="hover"
            onClick={() => setI((v) => (v + 1) % entries.length)}
            aria-label="Next"
            style={{ background: "transparent", border: "1px solid var(--rule)", color: "var(--gold)", padding: 10, borderRadius: 999 }}
          >
            <ChevronRight size={18} />
          </button>
        </div>

        <Reveal delay={0.1}>
          <a
            href="https://instagram.com/the_infinite_archives"
            target="_blank"
            rel="noreferrer"
            data-cursor="hover"
            className="label-mono"
            style={{
              display: "inline-block",
              marginTop: 56,
              padding: "16px 28px",
              border: "1px solid var(--gold)",
              color: "var(--gold)",
              transition: "all 0.2s ease",
            }}
            onMouseEnter={(ev) => {
              const t = ev.currentTarget;
              t.style.background = "var(--gold)";
              t.style.color = "var(--ink)";
            }}
            onMouseLeave={(ev) => {
              const t = ev.currentTarget;
              t.style.background = "transparent";
              t.style.color = "var(--gold)";
            }}
          >
            FOLLOW THE ARCHIVE ON INSTAGRAM →
          </a>
        </Reveal>
      </div>
    </section>
  );
}
