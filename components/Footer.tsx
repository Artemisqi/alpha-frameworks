import Link from "next/link";

export default function Footer() {
  return (
    <footer
      style={{
        borderTop: "1px solid rgba(255, 255, 255, 0.06)",
        marginTop: 80,
        background: "#000",
      }}
    >
      <div
        style={{
          maxWidth: 980,
          margin: "0 auto",
          padding: "40px 22px",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            gap: 40,
            flexWrap: "wrap",
          }}
        >
          <div>
            <div
              style={{
                fontSize: 15,
                fontWeight: 600,
                color: "#f5f5f7",
                marginBottom: 8,
              }}
            >
              Alpha & Frameworks
            </div>
            <div style={{ fontSize: 13, color: "#6e6e73", lineHeight: 1.6 }}>
              A long-term thinking space for markets,
              <br />
              AI, systems, and decision frameworks.
            </div>
          </div>

          <div style={{ display: "flex", gap: 32 }}>
            {[
              { href: "/blog", label: "Blog" },
              { href: "/about", label: "About" },
              { href: "/archive", label: "Archive" },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                style={{
                  color: "#86868b",
                  textDecoration: "none",
                  fontSize: 13,
                }}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>

        <div
          style={{
            marginTop: 32,
            paddingTop: 20,
            borderTop: "1px solid rgba(255, 255, 255, 0.04)",
            fontSize: 12,
            color: "#424245",
          }}
        >
          &copy; 2026 Alpha & Frameworks. Built for long-term thinking.
        </div>
      </div>
    </footer>
  );
}
