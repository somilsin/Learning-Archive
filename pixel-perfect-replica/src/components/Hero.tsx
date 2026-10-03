import { motion } from "framer-motion";
import { DustField } from "./DustField";

function LetterStagger({
  text,
  delay = 0,
  color,
  italic = false,
}: {
  text: string;
  delay?: number;
  color: string;
  italic?: boolean;
}) {
  return (
    <span style={{ display: "inline-block", fontStyle: italic ? "italic" : "normal" }}>
      {text.split("").map((char, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 28, filter: "blur(14px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{
            duration: 0.9,
            ease: [0.16, 1, 0.3, 1],
            delay: delay + i * 0.038,
          }}
          style={{
            display: "inline-block",
            color,
            whiteSpace: char === " " ? "pre" : "normal",
          }}
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </span>
  );
}

export function Hero() {
  return (
    <section
      style={{ position: "relative", minHeight: "100vh", background: "var(--ink)", overflow: "hidden" }}
    >
      <DustField />

      {/* Ceiling spotlight — warm amber radial from top-centre, like a museum exhibit lamp */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          top: 0,
          left: "50%",
          transform: "translateX(-50%)",
          width: "70%",
          height: "75%",
          background:
            "radial-gradient(ellipse 60% 80% at 50% 0%, rgba(201,168,76,0.09) 0%, rgba(201,168,76,0.03) 40%, transparent 70%)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      {/* Vignette — edges darker than centre, classic exhibition lighting */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse 90% 90% at 50% 50%, transparent 35%, rgba(6,5,3,0.55) 100%)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      {/* Ambient floor warmth — very faint warm blush at the very bottom */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: "30%",
          background:
            "linear-gradient(to top, rgba(201,168,76,0.025) 0%, transparent 100%)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      {/* Primary gold sweep */}
      <motion.div
        aria-hidden
        initial={{ y: "-110%" }}
        animate={{ y: "110%" }}
        transition={{ duration: 3.2, ease: [0.7, 0, 0.3, 1], delay: 0.05 }}
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(to bottom, transparent 0%, transparent 40%, color-mix(in oklab, var(--gold) 28%, transparent) 50%, transparent 60%, transparent 100%)",
          pointerEvents: "none",
          zIndex: 1,
          mixBlendMode: "screen",
        }}
      />
      {/* Secondary narrower sweep, slightly delayed */}
      <motion.div
        aria-hidden
        initial={{ y: "-110%" }}
        animate={{ y: "110%" }}
        transition={{ duration: 2.4, ease: [0.7, 0, 0.3, 1], delay: 0.5 }}
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(to bottom, transparent 0%, transparent 46%, color-mix(in oklab, var(--gold) 10%, transparent) 50%, transparent 54%, transparent 100%)",
          pointerEvents: "none",
          zIndex: 1,
          mixBlendMode: "screen",
        }}
      />

      {/* Top nav bar */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          padding: "28px 40px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          pointerEvents: "none",
          zIndex: 3,
        }}
      >
        <motion.span
          className="label-mono"
          initial={{ opacity: 0, x: -16, filter: "blur(6px)" }}
          animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
          transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
          style={{ letterSpacing: "0.1em" }}
        >
          THE INFINITE ARCHIVE
        </motion.span>

        <motion.a
          href="https://instagram.com/the_infinite_archives"
          target="_blank"
          rel="noreferrer"
          className="label-mono"
          initial={{ opacity: 0, x: 16, filter: "blur(6px)" }}
          animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
          transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1], delay: 0.5 }}
          whileHover={{ color: "var(--cream)", letterSpacing: "0.16em" }}
          style={{
            letterSpacing: "0.1em",
            pointerEvents: "auto",
            position: "relative",
            display: "inline-flex",
            flexDirection: "column",
            alignItems: "flex-end",
            transition: "letter-spacing 0.4s ease",
          }}
        >
          @the_infinite_archives
          <motion.span
            style={{
              display: "block",
              height: 1,
              background: "var(--gold)",
              width: "100%",
              transformOrigin: "left",
            }}
            initial={{ scaleX: 0 }}
            whileHover={{ scaleX: 1 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          />
        </motion.a>
      </div>

      {/* Hero copy */}
      <div
        style={{
          position: "relative",
          zIndex: 2,
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          padding: "0 24px",
        }}
      >
        <h1
          className="font-display"
          style={{
            fontWeight: 300,
            letterSpacing: "-0.03em",
            lineHeight: 1.0,
            margin: 0,
            fontSize: "clamp(52px, 9vw, 96px)",
          }}
        >
          <div>
            <LetterStagger text="The Museum" delay={0.25} color="var(--cream)" />
          </div>
          <div>
            <LetterStagger text="of Everything" delay={0.65} color="var(--stone)" />
          </div>
          <div>
            <LetterStagger text="Primal." delay={1.1} color="var(--gold)" italic />
          </div>
        </h1>

        {/* Glow pulse behind "Primal." */}
        <motion.div
          aria-hidden
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.18, 0.08, 0.22, 0.1] }}
          transition={{ duration: 2.5, delay: 1.5, times: [0, 0.3, 0.5, 0.7, 1] }}
          style={{
            position: "absolute",
            width: 360,
            height: 80,
            background: "radial-gradient(ellipse, var(--gold) 0%, transparent 72%)",
            borderRadius: "50%",
            pointerEvents: "none",
            filter: "blur(24px)",
            marginTop: 80,
          }}
        />

        <motion.p
          initial={{ opacity: 0, y: 12, filter: "blur(10px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 1.2, delay: 2.1, ease: [0.16, 1, 0.3, 1] }}
          style={{
            marginTop: 40,
            color: "var(--mist)",
            fontSize: 14,
            maxWidth: 480,
            letterSpacing: "0.02em",
            lineHeight: 1.7,
          }}
        >
          Archiving the raw, unfiltered facts of human civilisation and the natural world.
        </motion.p>

        {/* Animated divider */}
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ duration: 1.4, delay: 2.5, ease: [0.16, 1, 0.3, 1] }}
          style={{ width: 100, height: 1, background: "var(--gold)", marginTop: 36, transformOrigin: "center" }}
        />

        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: [0, 0.9, 0.5, 1], y: 0 }}
          transition={{ duration: 2.0, delay: 2.9, times: [0, 0.4, 0.65, 1] }}
          className="label-mono"
          style={{ marginTop: 24, letterSpacing: "0.1em" }}
        >
          SCROLL TO ENTER THE ARCHIVE ↓
        </motion.div>
      </div>
    </section>
  );
}
