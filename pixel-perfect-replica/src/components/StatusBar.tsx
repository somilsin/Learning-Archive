import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export function StatusBar() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > window.innerHeight * 0.8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        height: 44,
        background: "var(--panel)",
        borderBottom: "1px solid var(--rule)",
        display: "flex",
        alignItems: "center",
        padding: "0 28px",
        zIndex: 40,
        transform: show ? "translateY(0)" : "translateY(-100%)",
        transition: "transform 0.45s cubic-bezier(0.16, 1, 0.3, 1)",
      }}
    >
      <div
        className="label-mono"
        style={{ color: "var(--cream)", flex: 1, letterSpacing: "0.1em" }}
      >
        <span style={{ color: "var(--gold)" }}>🏛</span>&nbsp;THE ARCHIVE
      </div>
      <div
        className="label-mono"
        style={{ color: "var(--mist)", textAlign: "center", flex: 2, letterSpacing: "0.08em" }}
      >
        EXHIBIT I — THE HUMAN MIND&nbsp;&nbsp;//&nbsp;&nbsp;
        ENTRY 003 / 100&nbsp;&nbsp;//&nbsp;&nbsp;
        <span style={{ color: "var(--gold)" }}>WING OPEN</span>
      </div>
      <motion.a
        href="https://instagram.com/the_infinite_archives"
        target="_blank"
        rel="noreferrer"
        className="label-mono"
        whileHover={{ color: "var(--cream)" }}
        transition={{ duration: 0.2 }}
        style={{
          color: "var(--gold)",
          flex: 1,
          textAlign: "right",
          letterSpacing: "0.1em",
          textDecoration: "none",
        }}
      >
        @the_infinite_archives ↗
      </motion.a>
    </div>
  );
}
