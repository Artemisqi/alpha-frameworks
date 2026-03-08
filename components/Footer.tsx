import Link from "next/link";

export default function Footer() {
  return (
    <footer
      style={{
        borderTop: "1px solid #27272a",
        marginTop: "60px",
      }}
    >
      <div
        style={{
          maxWidth: "1100px",
          margin: "0 auto",
          padding: "32px 24px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: "16px",
          flexWrap: "wrap",
          color: "#a1a1aa",
          fontSize: "14px",
        }}
      >
        <div>© 2026 Alpha & Frameworks. Built for long-term thinking.</div>

        <div
          style={{
            display: "flex",
            gap: "18px",
            flexWrap: "wrap",
          }}
        >
          <Link
            href="/blog"
            style={{
              color: "#a1a1aa",
              textDecoration: "none",
            }}
          >
            Blog
          </Link>

          <Link
            href="/about"
            style={{
              color: "#a1a1aa",
              textDecoration: "none",
            }}
          >
            About
          </Link>

          <Link
            href="/archive"
            style={{
              color: "#a1a1aa",
              textDecoration: "none",
            }}
          >
            Archive
          </Link>
        </div>
      </div>
    </footer>
  );
}