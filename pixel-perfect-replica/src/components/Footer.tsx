import { motion } from "framer-motion";
import { Link } from "wouter";
import { wings } from "@/data/wings";
import { Reveal } from "./Reveal";

function InstagramBlock() {
  return (
    <div>
      <motion.div
        className="font-display"
        initial={{ opacity: 0, y: 16, filter: "blur(8px)" }}
        whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        style={{ fontSize: 32, color: "var(--cream)", fontWeight: 400 }}
      >
        🏛 The Infinite Archive
      </motion.div>

      <motion.a
        href="https://instagram.com/the_infinite_archives"
        target="_blank"
        rel="noreferrer"
        data-cursor="hover"
        className="label-mono"
        initial={{ opacity: 0, x: -10 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
        whileHover="hover"
        style={{
          display: "inline-flex",
          flexDirection: "column",
          alignItems: "flex-start",
          marginTop: 20,
          color: "var(--gold)",
          textDecoration: "none",
          letterSpacing: "0.1em",
        }}
      >
        <motion.span variants={{ hover: { color: "var(--cream)" } }}>
          @the_infinite_archives ↗
        </motion.span>
        <motion.span
          variants={{ hover: { scaleX: 1 } }}
          initial={{ scaleX: 0 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          style={{
            display: "block",
            height: 1,
            background: "var(--gold)",
            width: "100%",
            transformOrigin: "left",
          }}
        />
      </motion.a>
    </div>
  );
}

export function Footer() {
  return (
    <footer style={{
      position: "relative",
      background: "linear-gradient(180deg, #0E0C09 0%, #0B0907 100%)",
      borderTop: "1px solid var(--rule)",
      padding: "80px 24px 40px",
      overflow: "hidden",
    }}>
      {/* Warm ambient glow at top of footer — like dim gallery exit lighting */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          top: 0,
          left: "50%",
          transform: "translateX(-50%)",
          width: "60%",
          height: "50%",
          background:
            "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(201,168,76,0.035) 0%, transparent 100%)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      <div
        style={{
          maxWidth: 1280,
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
          gap: 48,
          position: "relative",
          zIndex: 1,
        }}
      >
        <InstagramBlock />

        {/* Wing navigation — each link navigates to the wing page */}
        <Reveal delay={0.1}>
          <nav style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            <div className="label-mono" style={{ color: "var(--mist)", letterSpacing: "0.14em", marginBottom: 4 }}>
              MUSEUM WINGS
            </div>
            {wings.map((w, i) => (
              <motion.div
                key={w.id}
                initial={{ opacity: 0, x: -8 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.06, ease: "easeOut" }}
              >
                <motion.a
                  href={`/wing/${w.id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    window.location.href = `/wing/${w.id}`;
                  }}
                  data-cursor="hover"
                  className="label-mono footer-wing-link"
                  whileHover="hover"
                  initial="rest"
                  animate="rest"
                  style={{
                    display: "inline-flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                    color: "var(--mist)",
                    textDecoration: "none",
                    letterSpacing: "0.08em",
                  }}
                >
                  <motion.span
                    variants={{ rest: { color: "var(--mist)" }, hover: { color: "var(--cream)" } }}
                    transition={{ duration: 0.2 }}
                    style={{ display: "inline-flex", alignItems: "center", gap: 6 }}
                  >
                    <span style={{ color: "var(--gold)", opacity: 0.7 }}>{w.roman}</span>
                    {" — "}
                    {w.title.toUpperCase()}
                  </motion.span>
                  <motion.span
                    variants={{ rest: { scaleX: 0 }, hover: { scaleX: 1 } }}
                    transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    style={{
                      display: "block",
                      height: 1,
                      background: "currentColor",
                      width: "100%",
                      transformOrigin: "left",
                    }}
                  />
                </motion.a>
              </motion.div>
            ))}
          </nav>
        </Reveal>

        <Reveal delay={0.2}>
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <motion.div
              className="font-display"
              whileHover={{ color: "var(--cream)" }}
              transition={{ duration: 0.3 }}
              style={{ fontSize: 24, fontStyle: "italic", color: "var(--gold)", lineHeight: 1.4 }}
            >
              The archive is always open.
            </motion.div>
            <div className="label-mono" style={{ color: "var(--mist)", letterSpacing: "0.08em" }}>
              100 FACTS. ONE TOPIC.
              <br />
              NO SKIPPING.
            </div>
          </div>
        </Reveal>
      </div>

      <Reveal delay={0.15}>
        <div
          style={{
            maxWidth: 1280,
            margin: "64px auto 0",
            borderTop: "1px solid var(--rule)",
            paddingTop: 24,
            position: "relative",
            zIndex: 1,
          }}
        >
          <div
            className="label-mono"
            style={{ color: "var(--mist)", textAlign: "center", letterSpacing: "0.08em" }}
          >
            THE MUSEUM OF PRIMAL KNOWLEDGE // 100 FACTS. ONE TOPIC. NO SKIPPING. // EXHIBIT 000 / ∞
          </div>
        </div>
      </Reveal>
    </footer>
  );
}
