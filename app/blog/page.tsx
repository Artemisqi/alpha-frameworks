import Link from "next/link";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
export default function BlogPage() {
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
          Blog
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
          Essays, research, and working notes.
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
          这里收纳更完整的文章：包括市场研究、AI 基础设施、公司分析，以及那些还在形成中的长期判断。
        </p>

        <div style={{ marginTop: "40px", display: "grid", gap: "20px" }}>
          <Link
            href="/posts/agent-team"
            style={{
              textDecoration: "none",
              color: "inherit",
            }}
          >
            <div
              style={{
                border: "1px solid #27272a",
                borderRadius: "24px",
                padding: "24px",
                background: "#18181b",
                cursor: "pointer",
              }}
            >
              <div style={{ fontSize: "12px", color: "#71717a" }}>
                AI / Systems · Mar 2026
              </div>
              <h2 style={{ marginTop: "16px", fontSize: "26px" }}>
                Agent Team：从单一模型走向委员会式决策
              </h2>
              <p style={{ color: "#a1a1aa", lineHeight: 1.8 }}>
                当 Agent Flow 进入多模型协同阶段，真正的 alpha 不在单个模型能力，而在委员会规则、共识形成和分工结构。
              </p>
            </div>
          </Link>

          <div
            style={{
              border: "1px solid #27272a",
              borderRadius: "24px",
              padding: "24px",
              background: "#18181b",
            }}
          >
            <div style={{ fontSize: "12px", color: "#71717a" }}>
              Semis / Research · Feb 2026
            </div>
            <h2 style={{ marginTop: "16px", fontSize: "26px" }}>
              存储不是周期，而是 AI 基础设施的第二引擎
            </h2>
            <p style={{ color: "#a1a1aa", lineHeight: 1.8 }}>
              HBM、封装、带宽与推理成本共同决定了新一轮价值分配。真正值得研究的是瓶颈如何迁移，而不是只看传统 DRAM 周期。
            </p>
          </div>
        </div>
      </div>
       </main>
       <Footer />
    </>
  );
}