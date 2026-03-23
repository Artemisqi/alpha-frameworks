import Link from "next/link";

export default function Navbar() {
  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 1000,
        background: "rgba(0, 0, 0, 0.8)",
        backdropFilter: "saturate(180%) blur(20px)",
        WebkitBackdropFilter: "saturate(180%) blur(20px)",
        borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
      }}
    >
      <div
        style={{
          maxWidth: 980,
          margin: "0 auto",
          padding: "0 22px",
          height: 52,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Link
          href="/"
          style={{
            textDecoration: "none",
            color: "#f5f5f7",
            fontSize: 17,
            fontWeight: 600,
            letterSpacing: "-0.01em",
          }}
        >
          A&F
        </Link>

        <nav
          style={{
            display: "flex",
            alignItems: "center",
            gap: 28,
          }}
        >
          {[
            { href: "/blog", label: "Blog" },
            { href: "/about", label: "About" },
            { href: "/archive", label: "Archive" },
          ].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              style={{
                textDecoration: "none",
                color: "#86868b",
                fontSize: 14,
                fontWeight: 400,
                letterSpacing: "0.005em",
              }}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
