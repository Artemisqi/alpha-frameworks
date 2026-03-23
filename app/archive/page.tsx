import Link from "next/link";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
export default function ArchivePage() {
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
          Archive
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
          A timeline of thinking.
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
          按时间查看文章与想法的沉淀过程。一个好的 archive，不只是归档，而是能看见判断如何演进。
        </p>

        <div style={{ marginTop: "40px", display: "grid", gap: "24px" }}>
          <div
            style={{
              border: "1px solid #27272a",
              borderRadius: "24px",
              padding: "24px",
              background: "#18181b",
            }}
          >
            <h2 style={{ margin: 0, fontSize: "28px" }}>2026</h2>
            <div style={{ marginTop: "20px", display: "grid", gap: "12px" }}>
              <Link href="/posts/agent-team" style={{ textDecoration: "none", color: "inherit" }}>
                <div style={{ padding: "14px 16px", border: "1px solid #3f3f46", borderRadius: "16px", cursor: "pointer" }}>
                  Agent Team：从单一模型走向委员会式决策
                </div>
              </Link>
              <div style={{ padding: "14px 16px", border: "1px solid #3f3f46", borderRadius: "16px" }}>
                伊朗冲突的市场传导：油价、通胀与风格切换
              </div>
              <div style={{ padding: "14px 16px", border: "1px solid #3f3f46", borderRadius: "16px" }}>
                Datadog：从 observability 到 AI-native workflow 的跃迁
              </div>
            </div>
          </div>

          <div
            style={{
              border: "1px solid #27272a",
              borderRadius: "24px",
              padding: "24px",
              background: "#18181b",
            }}
          >
            <h2 style={{ margin: 0, fontSize: "28px" }}>2025</h2>
            <div style={{ marginTop: "20px", display: "grid", gap: "12px" }}>
              <div style={{ padding: "14px 16px", border: "1px solid #3f3f46", borderRadius: "16px" }}>
                全球化 AI 的价值分工会如何重构
              </div>
              <div style={{ padding: "14px 16px", border: "1px solid #3f3f46", borderRadius: "16px" }}>
                关于判断力：留下过程，而不是只留下结论
              </div>
            </div>
          </div>
        </div>
      </div>
       </main>
       <Footer />
    </>
  );
}