import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import CategoryIcon from "../../components/CategoryIcon";

const areas = [
  {
    title: "AI Infrastructure & Agent Systems",
    desc: "Multi-model orchestration, decision protocols, and the emerging control layer for AI workflows.",
    category: "AI / Systems",
  },
  {
    title: "Markets, Macro & Transmission",
    desc: "How geopolitical events, interest rates, and structural shifts transmit through markets.",
    category: "Macro / Geopolitics",
  },
  {
    title: "Semiconductors & Compute",
    desc: "HBM, advanced packaging, and the hardware bottlenecks shaping AI economics.",
    category: "Semis / Research",
  },
  {
    title: "Judgment & Decision Frameworks",
    desc: "Systems for recording, reviewing, and improving the quality of decisions over time.",
    category: "Thinking / Meta",
  },
];

const principles = [
  { title: "Process over conclusions", desc: "Record how you think, not just what you think." },
  { title: "Frameworks over opinions", desc: "Build reusable mental models, not one-time takes." },
  { title: "Long-term compounding", desc: "Small improvements in thinking compound over years." },
  { title: "Signal over noise", desc: "Less content, more depth. Quality over frequency." },
];

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main style={{ minHeight: "100vh", background: "#000", color: "#f5f5f7" }}>
        {/* Hero */}
        <section style={{ maxWidth: 980, margin: "0 auto", padding: "100px 22px 80px" }}>
          <div style={{ textAlign: "center" as const }}>
            <h1
              style={{
                fontSize: 48,
                fontWeight: 700,
                lineHeight: 1.08,
                letterSpacing: "-0.035em",
                margin: 0,
              }}
            >
              A personal operating
              <br />
              system for ideas.
            </h1>
            <p
              style={{
                marginTop: 20,
                fontSize: 19,
                lineHeight: 1.55,
                color: "#86868b",
                maxWidth: 560,
                margin: "20px auto 0",
              }}
            >
              Alpha & Frameworks 是一个记录长期问题的网站：AI 如何改写价值链？
              市场如何定价不确定性？哪些判断值得被追踪、复盘、修正与强化？
            </p>
          </div>
        </section>

        {/* Focus Areas */}
        <section style={{ maxWidth: 980, margin: "0 auto", padding: "0 22px 80px" }}>
          <h2
            style={{
              fontSize: 28,
              fontWeight: 700,
              letterSpacing: "-0.02em",
              marginBottom: 32,
              textAlign: "center" as const,
            }}
          >
            Focus Areas
          </h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
              gap: 16,
            }}
          >
            {areas.map((area) => (
              <div
                key={area.title}
                style={{
                  padding: 24,
                  borderRadius: 20,
                  background: "#111113",
                  border: "1px solid rgba(255,255,255,0.06)",
                  textAlign: "center" as const,
                }}
              >
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <CategoryIcon category={area.category} size={48} />
                </div>
                <h3
                  style={{
                    marginTop: 16,
                    marginBottom: 0,
                    fontSize: 16,
                    fontWeight: 600,
                    letterSpacing: "-0.01em",
                  }}
                >
                  {area.title}
                </h3>
                <p
                  style={{
                    marginTop: 8,
                    fontSize: 14,
                    lineHeight: 1.55,
                    color: "#86868b",
                  }}
                >
                  {area.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Principles */}
        <section
          style={{
            maxWidth: 980,
            margin: "0 auto",
            padding: "0 22px 100px",
          }}
        >
          <h2
            style={{
              fontSize: 28,
              fontWeight: 700,
              letterSpacing: "-0.02em",
              marginBottom: 32,
              textAlign: "center" as const,
            }}
          >
            Principles
          </h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
              gap: 16,
            }}
          >
            {principles.map((p) => (
              <div
                key={p.title}
                style={{
                  padding: 24,
                  borderRadius: 20,
                  background: "#111113",
                  border: "1px solid rgba(255, 255, 255, 0.06)",
                }}
              >
                <h3
                  style={{
                    margin: 0,
                    fontSize: 16,
                    fontWeight: 600,
                    letterSpacing: "-0.01em",
                  }}
                >
                  {p.title}
                </h3>
                <p
                  style={{
                    marginTop: 8,
                    fontSize: 14,
                    lineHeight: 1.55,
                    color: "#86868b",
                  }}
                >
                  {p.desc}
                </p>
              </div>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
