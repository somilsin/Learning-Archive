import { motion } from "framer-motion";
import { Reveal } from "./Reveal";

const FOLLOWER_TARGET = 1000;
const FOLLOWER_CURRENT = 0;
const pct = Math.min((FOLLOWER_CURRENT / FOLLOWER_TARGET) * 100, 100);

export function MerchTeaser() {
  return (
    <section
      style={{
        position: "relative",
        padding: "100px 24px",
        background: "linear-gradient(180deg, #0E0C09 0%, #110E0A 50%, #0E0C09 100%)",
        borderTop: "1px solid var(--rule)",
        overflow: "hidden",
      }}
    >
      {/* Ambient warm glow behind the box — like a single display case lit from within */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "60%",
          height: "70%",
          background:
            "radial-gradient(ellipse at 50% 50%, rgba(201,168,76,0.055) 0%, transparent 70%)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      <div style={{ maxWidth: 860, margin: "0 auto", position: "relative", zIndex: 1 }}>
        <Reveal>
          <div
            style={{
              position: "relative",
              border: "1px solid var(--rule)",
              padding: "64px 48px",
              textAlign: "center",
              overflow: "hidden",
              background: "linear-gradient(160deg, #131109 0%, #0E0C09 50%, #111009 100%)",
            }}
          >
            {/* Decorative corner marks */}
            {[
              { top: 12, left: 12 },
              { top: 12, right: 12 },
              { bottom: 12, left: 12 },
              { bottom: 12, right: 12 },
            ].map((pos, i) => (
              <span
                key={i}
                aria-hidden
                style={{
                  position: "absolute",
                  width: 8,
                  height: 8,
                  border: "1px solid var(--gold)",
                  opacity: 0.5,
                  ...pos,
                }}
              />
            ))}

            {/* Background glyph */}
            <span
              aria-hidden
              className="font-display"
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                fontSize: "18vw",
                color: "var(--gold)",
                opacity: 0.035,
                fontWeight: 300,
                pointerEvents: "none",
                userSelect: "none",
                lineHeight: 1,
                whiteSpace: "nowrap",
              }}
            >
              ∞
            </span>

            <motion.div
              className="label-mono"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              style={{ color: "var(--gold)", letterSpacing: "0.14em" }}
            >
              ARCHIVE STORE — COMING SOON
            </motion.div>

            <motion.h2
              className="font-display"
              initial={{ opacity: 0, y: 16, filter: "blur(10px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              style={{
                fontSize: "clamp(28px, 4.5vw, 46px)",
                fontWeight: 300,
                letterSpacing: "-0.02em",
                margin: "24px 0 0",
                lineHeight: 1.2,
              }}
            >
              <span style={{ color: "var(--cream)" }}>Exclusive archive pieces.</span>
              <br />
              <span style={{ color: "var(--gold)", fontStyle: "italic" }}>
                Unlocked at 1,000 followers.
              </span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
              style={{
                color: "var(--mist)",
                fontSize: 14,
                lineHeight: 1.7,
                marginTop: 20,
                maxWidth: 440,
                margin: "20px auto 0",
              }}
            >
              When the archive reaches 1,000 followers, a small run of exclusive merch drops — designed around the archive aesthetic. No restocks. No waitlist. First there, first served.
            </motion.p>

            {/* Milestone progress bar */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.5 }}
              style={{ marginTop: 40, maxWidth: 360, margin: "40px auto 0" }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: 10,
                }}
              >
                <div className="label-mono" style={{ color: "var(--mist)", letterSpacing: "0.1em" }}>
                  FOLLOWERS
                </div>
                <div className="label-mono" style={{ color: "var(--gold)", letterSpacing: "0.1em" }}>
                  {FOLLOWER_CURRENT.toLocaleString()} / {FOLLOWER_TARGET.toLocaleString()}
                </div>
              </div>

              {/* Track */}
              <div
                style={{
                  height: 2,
                  background: "var(--rule)",
                  width: "100%",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                <motion.div
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: pct / 100 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.4, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    background: "var(--gold)",
                    transformOrigin: "left",
                  }}
                />
              </div>

              <div className="label-mono" style={{ color: "var(--mist)", marginTop: 10, fontSize: 9, letterSpacing: "0.1em" }}>
                {pct < 1 ? "MILESTONE NOT YET REACHED" : `${Math.round(pct)}% TO UNLOCK`}
              </div>
            </motion.div>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.7 }}
              style={{ marginTop: 40 }}
            >
              <motion.a
                href="https://instagram.com/the_infinite_archives"
                target="_blank"
                rel="noreferrer"
                data-cursor="hover"
                className="label-mono"
                whileHover={{ backgroundColor: "var(--gold)", color: "var(--ink)" }}
                transition={{ duration: 0.2 }}
                style={{
                  display: "inline-block",
                  padding: "14px 28px",
                  border: "1px solid var(--gold)",
                  color: "var(--gold)",
                  textDecoration: "none",
                  letterSpacing: "0.1em",
                }}
              >
                FOLLOW TO UNLOCK THE STORE ↗
              </motion.a>
            </motion.div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
