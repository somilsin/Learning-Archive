import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useParams } from "wouter";
import { wings } from "@/data/wings";
import { CustomCursor } from "@/components/CustomCursor";
import { ScrollProgress } from "@/components/ScrollProgress";
import { Footer } from "@/components/Footer";
import { Reveal } from "@/components/Reveal";

const NOTIFY_ENDPOINT = "";

function NotifyForm({ wingTitle }: { wingTitle: string }) {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.includes("@")) { setError("Please enter a valid email."); return; }
    setError("");
    setSubmitting(true);
    try {
      if (NOTIFY_ENDPOINT) {
        await fetch(NOTIFY_ENDPOINT, {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify({ email, wing: wingTitle }),
        });
      }
      setSubmitted(true);
    } catch {
      setError("Something went wrong. Try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <AnimatePresence mode="wait">
      {submitted ? (
        <motion.div
          key="success"
          initial={{ opacity: 0, y: 8, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          style={{ textAlign: "center" }}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              width: 40,
              height: 40,
              border: "1px solid var(--gold)",
              color: "var(--gold)",
              fontSize: 18,
              marginBottom: 16,
            }}
          >
            ✓
          </motion.div>
          <div className="label-mono" style={{ color: "var(--gold)", letterSpacing: "0.1em" }}>
            YOU&apos;RE ON THE LIST
          </div>
          <p style={{ color: "var(--mist)", fontSize: 13, marginTop: 8 }}>
            We&apos;ll notify you when this vault opens.
          </p>
        </motion.div>
      ) : (
        <motion.form
          key="form"
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 12,
            width: "100%",
            maxWidth: 380,
            margin: "0 auto",
          }}
        >
          <div className="label-mono" style={{ color: "var(--mist)", letterSpacing: "0.1em", marginBottom: 4 }}>
            NOTIFY ME WHEN THIS VAULT OPENS
          </div>
          <div style={{ display: "flex", width: "100%", gap: 0 }}>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              required
              style={{
                flex: 1,
                background: "transparent",
                border: "1px solid var(--rule)",
                borderRight: "none",
                color: "var(--cream)",
                padding: "12px 16px",
                fontSize: 13,
                fontFamily: "var(--font-mono)",
                outline: "none",
                letterSpacing: "0.04em",
              }}
              onFocus={(e) => (e.target.style.borderColor = "var(--gold)")}
              onBlur={(e) => (e.target.style.borderColor = "var(--rule)")}
            />
            <motion.button
              type="submit"
              disabled={submitting}
              whileHover={{ backgroundColor: "var(--gold)", color: "var(--ink)" }}
              whileTap={{ scale: 0.97 }}
              transition={{ duration: 0.2 }}
              className="label-mono"
              style={{
                background: "transparent",
                border: "1px solid var(--gold)",
                color: "var(--gold)",
                padding: "12px 20px",
                cursor: "pointer",
                letterSpacing: "0.1em",
                whiteSpace: "nowrap",
                transition: "background-color 0.2s ease, color 0.2s ease",
              }}
            >
              {submitting ? "..." : "NOTIFY ME"}
            </motion.button>
          </div>
          {error && (
            <p className="label-mono" style={{ color: "var(--danger)", letterSpacing: "0.08em" }}>
              {error}
            </p>
          )}
        </motion.form>
      )}
    </AnimatePresence>
  );
}

export function WingPage() {
  const { id } = useParams<{ id: string }>();
  const wing = wings.find((w) => w.id === id);

  if (!wing) {
    return (
      <div
        style={{
          minHeight: "100vh",
          background: "var(--ink)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          padding: 24,
        }}
      >
        <div className="label-mono" style={{ color: "var(--danger)" }}>WING CLOSED</div>
        <h1 className="font-display" style={{ fontSize: 48, margin: "16px 0", color: "var(--cream)", fontWeight: 300 }}>
          This wing does not exist.
        </h1>
        <Link href="/" className="label-mono" style={{ color: "var(--gold)" }}>
          ← RETURN TO THE ARCHIVE
        </Link>
      </div>
    );
  }

  return (
    <>
      <CustomCursor />
      <ScrollProgress wingRoman={wing.roman} total={wing.total} />

      <motion.header
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        style={{
          padding: "28px 40px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          borderBottom: "1px solid var(--rule)",
        }}
      >
        <motion.div whileHover={{ x: -4 }} transition={{ duration: 0.2 }}>
          <Link href="/" className="label-mono" data-cursor="hover" style={{ color: "var(--gold)" }}>
            ← THE ARCHIVE
          </Link>
        </motion.div>
        <span className="label-mono" style={{ color: "var(--mist)", letterSpacing: "0.1em" }}>
          WING {wing.roman}
        </span>
      </motion.header>

      <section style={{ position: "relative", padding: "120px 24px 80px", overflow: "hidden" }}>
        <span
          aria-hidden
          className="font-display"
          style={{
            position: "absolute",
            top: "10%",
            left: "50%",
            transform: "translateX(-50%)",
            fontSize: "30vw",
            color: "var(--gold)",
            opacity: 0.06,
            lineHeight: 1,
            fontWeight: 300,
            pointerEvents: "none",
            userSelect: "none",
          }}
        >
          {wing.roman}
        </span>
        <div style={{ position: "relative", maxWidth: 980, margin: "0 auto", textAlign: "center" }}>
          <Reveal>
            <div className="label-mono" style={{ color: "var(--mist)", letterSpacing: "0.1em" }}>
              EXHIBIT {wing.roman}
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <h1
              className="font-display"
              style={{
                fontSize: "clamp(40px, 7vw, 64px)",
                fontWeight: 300,
                letterSpacing: "-0.03em",
                color: "var(--cream)",
                margin: "20px 0",
              }}
            >
              {wing.title}
            </h1>
          </Reveal>
          <Reveal delay={0.2}>
            <div
              className="font-mono"
              style={{
                display: "inline-block",
                marginTop: 12,
                padding: "8px 14px",
                fontSize: 10,
                letterSpacing: "0.1em",
                border: `1px solid ${wing.status === "open" ? "var(--gold)" : wing.status === "archived" ? "#4f6e4a" : "var(--rule)"}`,
                color: wing.status === "open" ? "var(--gold)" : wing.status === "archived" ? "#9fbf99" : "var(--mist)",
              }}
            >
              {wing.status === "open"
                ? `WING OPEN — ENTRY ${String(wing.entry).padStart(3, "0")} / ${wing.total}`
                : wing.status === "archived"
                ? `ARCHIVED — ${wing.total}/${wing.total}`
                : "QUEUED — OPENS SOON"}
            </div>
          </Reveal>
          <Reveal delay={0.3}>
            <p
              style={{
                marginTop: 32,
                color: "var(--mist)",
                fontSize: 16,
                lineHeight: 1.7,
                maxWidth: 640,
                margin: "32px auto 0",
              }}
            >
              {wing.description}
            </p>
          </Reveal>
        </div>
      </section>

      {/* Vault — all wings show Coming Soon + email notify */}
      <section style={{ padding: "0 24px 140px" }}>
        <div style={{ maxWidth: 1080, margin: "0 auto" }}>
          <Reveal>
            <div
              style={{
                position: "relative",
                textAlign: "center",
                padding: "100px 24px",
                border: "1px solid var(--rule)",
                overflow: "hidden",
              }}
            >
              <span
                aria-hidden
                className="font-display"
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  fontSize: "20vw",
                  color: "var(--gold)",
                  opacity: 0.04,
                  fontWeight: 300,
                  pointerEvents: "none",
                  userSelect: "none",
                  lineHeight: 1,
                  whiteSpace: "nowrap",
                }}
              >
                {wing.roman}
              </span>

              <motion.div
                className="label-mono"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.2 }}
                style={{ color: "var(--mist)", letterSpacing: "0.12em" }}
              >
                THE VAULT
              </motion.div>

              <motion.h2
                className="font-display"
                initial={{ opacity: 0, y: 16, filter: "blur(12px)" }}
                whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  fontSize: "clamp(32px, 5vw, 52px)",
                  fontWeight: 300,
                  letterSpacing: "-0.02em",
                  color: "var(--cream)",
                  margin: "24px 0 0",
                }}
              >
                Coming&nbsp;
                <span style={{ color: "var(--gold)", fontStyle: "italic" }}>soon.</span>
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, filter: "blur(6px)" }}
                whileInView={{ opacity: 1, filter: "blur(0px)" }}
                viewport={{ once: true }}
                transition={{ duration: 0.9, delay: 0.55 }}
                style={{
                  color: "var(--mist)",
                  fontSize: 14,
                  lineHeight: 1.7,
                  marginTop: 20,
                  maxWidth: 400,
                  margin: "20px auto 0",
                }}
              >
                The entries for this wing are being catalogued.
              </motion.p>

              <motion.div
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  width: 60,
                  height: 1,
                  background: "var(--gold)",
                  margin: "40px auto 32px",
                  transformOrigin: "center",
                  opacity: 0.5,
                }}
              />

              <motion.div
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.7 }}
              >
                <NotifyForm wingTitle={wing.title} />
              </motion.div>

              <motion.a
                href="https://instagram.com/the_infinite_archives"
                target="_blank"
                rel="noreferrer"
                data-cursor="hover"
                className="label-mono"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.9 }}
                whileHover={{ color: "var(--cream)" }}
                style={{
                  display: "inline-block",
                  marginTop: 24,
                  color: "var(--mist)",
                  letterSpacing: "0.1em",
                  textDecoration: "none",
                  fontSize: 10,
                }}
              >
                OR FOLLOW ON INSTAGRAM ↗
              </motion.a>
            </div>
          </Reveal>
        </div>
      </section>

      <Footer />
    </>
  );
}
