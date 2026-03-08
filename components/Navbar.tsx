import Link from "next/link";

export default function Navbar() {
  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 1000,
        background: "rgba(9, 9, 11, 0.9)",
        backdropFilter: "blur(12px)",
        borderBottom: "1px solid #27272a",
      }}
    >
      <div
        style={{
          maxWidth: "1100px",
          margin: "0 auto",
          padding: "18px 24px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "20px",
          flexWrap: "wrap",
        }}
      >
        <Link
          href="/"
          style={{
            textDecoration: "none",
            color: "#f4f4f5",
          }}
        >
          <div style={{ fontSize: "18px", fontWeight: 700 }}>
            Alpha & Frameworks
          </div>
          <div style={{ fontSize: "13px", color: "#a1a1aa", marginTop: "4px" }}>
            Notes on markets, AI, systems, and long-term thinking.
          </div>
        </Link>

        <nav
          style={{
            display: "flex",
            gap: "10px",
            flexWrap: "wrap",
          }}
        >
          <Link
            href="/"
            style={{
              padding: "10px 14px",
              borderRadius: "999px",
              textDecoration: "none",
              color: "#d4d4d8",
              fontSize: "14px",
            }}
          >
            Home
          </Link>

          <Link
            href="/blog"
            style={{
              padding: "10px 14px",
              borderRadius: "999px",
              textDecoration: "none",
              color: "#d4d4d8",
              fontSize: "14px",
            }}
          >
            Blog
          </Link>

          <Link
            href="/about"
            style={{
              padding: "10px 14px",
              borderRadius: "999px",
              textDecoration: "none",
              color: "#d4d4d8",
              fontSize: "14px",
            }}
          >
            About
          </Link>

          <Link
            href="/archive"
            style={{
              padding: "10px 14px",
              borderRadius: "999px",
              textDecoration: "none",
              color: "#d4d4d8",
              fontSize: "14px",
            }}
          >
            Archive
          </Link>
        </nav>
      </div>
    </header>
  );
}