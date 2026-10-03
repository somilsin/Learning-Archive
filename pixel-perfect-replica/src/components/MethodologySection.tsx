import { Reveal } from "./Reveal";

const items = [
  { n: "01", title: "COMPLETION BIAS", body: "A viewer who finds Entry 61/100 asks: what were the first 60? They visit the grid. Profile visits convert to followers at the highest rate of any Instagram action." },
  { n: "02", title: "THE DOUBLE LOOP", body: "Every reel is 5 seconds. The text takes 8 seconds to read. The viewer cannot finish before the loop restarts. Instagram registers this as 200% completion." },
  { n: "03", title: "THE ARCHIVE EFFECT", body: "A fully stocked museum of 300+ entries becomes a destination, not a feed. New visitors spend 20–40 minutes inside the grid." },
  { n: "04", title: "THE INSTITUTION", body: "This is not content creation. This is curation. The museum frames every fact as a permanent record, not a post. That distinction changes how people engage with it." },
];

export function MethodologySection() {
  return (
    <section style={{ padding: "120px 24px", background: "var(--stone)" }}>
      <div style={{ maxWidth: 1180, margin: "0 auto" }}>
        <Reveal>
          <h2 className="font-display" style={{ fontSize: 48, fontStyle: "italic", margin: 0, fontWeight: 400 }}>
            <span style={{ color: "var(--cream)" }}>The system.</span>{" "}
            <span style={{ color: "var(--gold)" }}>One hundred facts. One topic. No skipping.</span>
          </h2>
        </Reveal>

        <div
          style={{
            marginTop: 64,
            display: "grid",
            gap: 1,
            background: "var(--rule)",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
          }}
        >
          {items.map((it, i) => (
            <Reveal key={it.n} delay={i * 0.08}>
              <div style={{ background: "var(--panel)", padding: "40px 32px", height: "100%" }}>
                <div className="label-mono" style={{ color: "var(--gold)" }}>{it.n} — {it.title}</div>
                <p style={{ color: "var(--cream)", fontSize: 15, lineHeight: 1.7, marginTop: 20 }}>{it.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
