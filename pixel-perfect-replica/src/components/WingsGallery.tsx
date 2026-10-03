import { wings } from "@/data/wings";
import { WingCard } from "./WingCard";
import { Reveal } from "./Reveal";

export function WingsGallery() {
  return (
    <section style={{
      position: "relative",
      padding: "120px 24px 80px",
      background: "linear-gradient(180deg, #0E0C09 0%, #120F0A 45%, #100D09 60%, #0E0C09 100%)",
      overflow: "hidden",
    }}>
      {/* Ambient warm corridor glow — like gallery track-lighting on the wall */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          top: "10%",
          left: "50%",
          transform: "translateX(-50%)",
          width: "80%",
          height: "50%",
          background:
            "radial-gradient(ellipse 70% 60% at 50% 30%, rgba(201,168,76,0.045) 0%, transparent 70%)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />
      {/* Subtle left-wall ambient */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "30%",
          height: "100%",
          background:
            "radial-gradient(ellipse 80% 50% at 0% 50%, rgba(201,168,76,0.022) 0%, transparent 100%)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      <div style={{ maxWidth: 1280, margin: "0 auto", position: "relative", zIndex: 1 }}>
        <Reveal>
          <div className="label-mono" style={{ color: "var(--mist)" }}>THE MUSEUM WINGS</div>
        </Reveal>
        <Reveal delay={0.08}>
          <h2 className="font-display" style={{ fontSize: 48, fontStyle: "italic", margin: "16px 0 0", fontWeight: 400 }}>
            <span style={{ color: "var(--cream)" }}>Six wings.</span>{" "}
            <span style={{ color: "var(--gold)" }}>One hundred facts each.</span>
          </h2>
        </Reveal>

        <div
          className="wings-scroll"
          style={{
            marginTop: 56,
            display: "flex",
            gap: 24,
            overflowX: "auto",
            paddingBottom: 24,
            scrollSnapType: "x mandatory",
          }}
        >
          {wings.map((w, i) => (
            <Reveal key={w.id} delay={i * 0.08}>
              <div style={{ scrollSnapAlign: "start" }}>
                <WingCard wing={w} />
              </div>
            </Reveal>
          ))}
        </div>
      </div>
      <style>{`@media (max-width: 768px){.wings-scroll{flex-direction:column;overflow-x:visible;}}`}</style>
    </section>
  );
}
