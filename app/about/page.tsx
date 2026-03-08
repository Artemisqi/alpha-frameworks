import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main
      style={{
        minHeight: "100vh",
        background: "#09090b",
        color: "#f4f4f5",
        padding: "80px 24px",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <div style={{ maxWidth: "900px", margin: "0 auto" }}>
        <div
          style={{
            fontSize: "12px",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: "#71717a",
            marginBottom: "16px",
          }}
        >
          About
        </div>

        <h1
          style={{
            fontSize: "48px",
            lineHeight: 1.1,
            margin: 0,
            fontWeight: 700,
            letterSpacing: "-0.03em",
          }}
        >
          A personal operating system for ideas.
        </h1>

        <p
          style={{
            marginTop: "24px",
            fontSize: "18px",
            lineHeight: 1.8,
            color: "#a1a1aa",
            maxWidth: "760px",
          }}
        >
          Alpha & Frameworks 是一个记录长期问题的网站：AI 如何改写价值链？市场如何定价不确定性？哪些判断值得被追踪、复盘、修正与强化？
        </p>

        <p
          style={{
            marginTop: "20px",
            fontSize: "18px",
            lineHeight: 1.8,
            color: "#a1a1aa",
            maxWidth: "760px",
          }}
        >
          这里既放研究，也放尚未成熟的思考。目标不是追逐噪音，而是建立能反复使用的框架。
        </p>

        <div
          style={{
            marginTop: "40px",
            border: "1px solid #27272a",
            borderRadius: "24px",
            padding: "24px",
            background: "#18181b",
          }}
        >
          <div style={{ color: "#71717a", fontSize: "14px", marginBottom: "16px" }}>
            Focus Areas
          </div>

          <ul style={{ color: "#d4d4d8", lineHeight: 2 }}>
            <li>AI infrastructure & agent systems</li>
            <li>Markets, macro, and transmission mechanisms</li>
            <li>Semiconductors, memory, and compute bottlenecks</li>
            <li>Frameworks for judgment and decision-making</li>
          </ul>
        </div>
      </div>
       </main>
       <Footer />
    </>
  );
}