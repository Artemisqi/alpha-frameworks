import Link from "next/link";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
export default function HomePage() {
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
            display: "inline-block",
            padding: "6px 12px",
            border: "1px solid #27272a",
            borderRadius: "999px",
            fontSize: "12px",
            color: "#a1a1aa",
            marginBottom: "24px",
          }}
        >
          Alpha & Frameworks
        </div>

        <h1
          style={{
            fontSize: "56px",
            lineHeight: 1.05,
            margin: 0,
            fontWeight: 700,
            letterSpacing: "-0.03em",
          }}
        >
          Alpha, ideas, and frameworks
          <span style={{ color: "#a1a1aa" }}>
            {" "}
            for thinking through complex systems.
          </span>
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
          这里不是信息流，而是一个长期复利的思考空间。
          用来沉淀市场、AI、科技、宏观与决策框架，留下判断过程，而不只是结论。
        </p>

        <div
          style={{
            marginTop: "40px",
            display: "flex",
            gap: "12px",
            flexWrap: "wrap",
          }}
        >
          <Link
            href="/blog"
            style={{
              background: "#ffffff",
              color: "#09090b",
              border: "none",
              borderRadius: "16px",
              padding: "14px 20px",
              fontWeight: 600,
              cursor: "pointer",
              textDecoration: "none",
            }}
          >
            Read latest posts
          </Link>

          <Link
            href="/archive"
            style={{
              background: "transparent",
              color: "#f4f4f5",
              border: "1px solid #3f3f46",
              borderRadius: "16px",
              padding: "14px 20px",
              fontWeight: 600,
              cursor: "pointer",
              textDecoration: "none",
            }}
          >
            Explore archive
          </Link>
        </div>

        <div style={{ marginTop: "48px", display: "flex", gap: "20px", flexWrap: "wrap" }}>
          <Link href="/about" style={{ color: "#a1a1aa", textDecoration: "none" }}>
            About
          </Link>
          <Link href="/blog" style={{ color: "#a1a1aa", textDecoration: "none" }}>
            Blog
          </Link>
          <Link href="/archive" style={{ color: "#a1a1aa", textDecoration: "none" }}>
            Archive
          </Link>
        </div>
      </div>
    </main>
    <Footer />
    </>
  );
}