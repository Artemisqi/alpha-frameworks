"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import CategoryIcon from "../components/CategoryIcon";
import { getPosts, getDefaultPosts, Post } from "@/lib/posts";

const focusAreas = [
  {
    title: "AI Infrastructure",
    desc: "Agent systems, multi-model orchestration, and the control layer.",
    category: "AI / Systems",
  },
  {
    title: "Markets & Macro",
    desc: "Transmission mechanisms, geopolitics, and structural shifts.",
    category: "Macro / Geopolitics",
  },
  {
    title: "Semiconductors",
    desc: "Memory, compute bottlenecks, and AI hardware economics.",
    category: "Semis / Research",
  },
  {
    title: "Decision Frameworks",
    desc: "Building systems for better judgment over time.",
    category: "Thinking / Meta",
  },
];

export default function HomePage() {
  const [posts, setPosts] = useState<Post[]>(getDefaultPosts());

  useEffect(() => {
    setPosts(getPosts().filter((p) => p.published));
  }, []);

  const latestPosts = posts.slice(0, 3);
  const featured = posts[0];

  return (
    <>
      <Navbar />
      <main style={{ background: "#000", color: "#f5f5f7", minHeight: "100vh" }}>
        {/* Hero */}
        <section
          style={{
            maxWidth: 980,
            margin: "0 auto",
            padding: "120px 22px 80px",
          }}
        >
          <div
            style={{
              fontSize: 56,
              fontWeight: 700,
              lineHeight: 1.05,
              letterSpacing: "-0.035em",
              maxWidth: 720,
            }}
          >
            Think in
            <br />
            <span
              style={{
                background: "linear-gradient(90deg, #2997ff, #5ac8fa, #bf5af2)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              frameworks.
            </span>
          </div>
          <p
            style={{
              marginTop: 24,
              fontSize: 21,
              lineHeight: 1.5,
              color: "#86868b",
              maxWidth: 600,
              fontWeight: 400,
            }}
          >
            一个长期复利的思考空间。沉淀市场、AI、科技、宏观与决策框架——留下判断过程，而不只是结论。
          </p>

          <div style={{ marginTop: 40, display: "flex", gap: 16 }}>
            <Link
              href="/blog"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
                background: "#2997ff",
                color: "#fff",
                border: "none",
                borderRadius: 980,
                padding: "12px 24px",
                fontSize: 15,
                fontWeight: 500,
                cursor: "pointer",
                textDecoration: "none",
                letterSpacing: "-0.01em",
              }}
            >
              Start reading
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
            <Link
              href="/about"
              style={{
                display: "inline-flex",
                alignItems: "center",
                background: "transparent",
                color: "#2997ff",
                border: "none",
                borderRadius: 980,
                padding: "12px 24px",
                fontSize: 15,
                fontWeight: 500,
                cursor: "pointer",
                textDecoration: "none",
                letterSpacing: "-0.01em",
              }}
            >
              Learn more &gt;
            </Link>
          </div>
        </section>

        {/* Featured Post */}
        {featured && (
          <section
            style={{
              maxWidth: 980,
              margin: "0 auto",
              padding: "0 22px 80px",
            }}
          >
            <Link
              href={`/posts/${featured.slug}`}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <div
                style={{
                  borderRadius: 24,
                  overflow: "hidden",
                  background: "#111113",
                  border: "1px solid rgba(255,255,255,0.06)",
                }}
              >
                {featured.coverImage && (
                  <div
                    style={{
                      width: "100%",
                      height: 400,
                      backgroundImage: `linear-gradient(to bottom, transparent 50%, #111113), url(${featured.coverImage})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }}
                  />
                )}
                <div style={{ padding: "32px 40px 40px" }}>
                  <div
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 8,
                      fontSize: 12,
                      fontWeight: 500,
                      color: "#2997ff",
                      textTransform: "uppercase" as const,
                      letterSpacing: "0.06em",
                      marginBottom: 16,
                    }}
                  >
                    <CategoryIcon category={featured.category} size={20} />
                    {featured.category}
                    {featured.mood && <span style={{ fontSize: 16 }}>{featured.mood}</span>}
                  </div>
                  <h2
                    style={{
                      fontSize: 36,
                      fontWeight: 700,
                      lineHeight: 1.15,
                      letterSpacing: "-0.03em",
                      margin: 0,
                    }}
                  >
                    {featured.title}
                  </h2>
                  <p
                    style={{
                      marginTop: 12,
                      fontSize: 17,
                      lineHeight: 1.6,
                      color: "#86868b",
                    }}
                  >
                    {featured.summary}
                  </p>
                  <div
                    style={{
                      marginTop: 20,
                      fontSize: 13,
                      color: "#6e6e73",
                    }}
                  >
                    {featured.date} &middot; {featured.readTime}
                  </div>
                </div>
              </div>
            </Link>
          </section>
        )}

        {/* Focus Areas */}
        <section
          style={{
            maxWidth: 980,
            margin: "0 auto",
            padding: "0 22px 80px",
          }}
        >
          <h2
            style={{
              fontSize: 32,
              fontWeight: 700,
              letterSpacing: "-0.025em",
              marginBottom: 40,
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
            {focusAreas.map((area) => (
              <div
                key={area.title}
                style={{
                  padding: 24,
                  borderRadius: 20,
                  background: "#111113",
                  border: "1px solid rgba(255, 255, 255, 0.06)",
                }}
              >
                <CategoryIcon category={area.category} size={44} />
                <h3
                  style={{
                    marginTop: 16,
                    marginBottom: 0,
                    fontSize: 17,
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
                    lineHeight: 1.5,
                    color: "#86868b",
                  }}
                >
                  {area.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Latest Posts */}
        <section
          style={{
            maxWidth: 980,
            margin: "0 auto",
            padding: "0 22px 100px",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "baseline",
              marginBottom: 32,
            }}
          >
            <h2
              style={{
                fontSize: 32,
                fontWeight: 700,
                letterSpacing: "-0.025em",
                margin: 0,
              }}
            >
              Latest
            </h2>
            <Link
              href="/blog"
              style={{
                color: "#2997ff",
                textDecoration: "none",
                fontSize: 15,
                fontWeight: 500,
              }}
            >
              View all &gt;
            </Link>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(290px, 1fr))",
              gap: 16,
            }}
          >
            {latestPosts.slice(0, 3).map((post) => (
              <Link
                key={post.slug}
                href={`/posts/${post.slug}`}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <div
                  style={{
                    borderRadius: 20,
                    overflow: "hidden",
                    background: "#111113",
                    border: "1px solid rgba(255, 255, 255, 0.06)",
                    height: "100%",
                  }}
                >
                  {post.coverImage && (
                    <div
                      style={{
                        width: "100%",
                        height: 180,
                        backgroundImage: `url(${post.coverImage})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                      }}
                    />
                  )}
                  <div style={{ padding: 20 }}>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 6,
                        fontSize: 12,
                        color: "#6e6e73",
                        marginBottom: 10,
                      }}
                    >
                      <CategoryIcon category={post.category} size={16} />
                      {post.category}
                    </div>
                    <h3
                      style={{
                        fontSize: 17,
                        fontWeight: 600,
                        lineHeight: 1.3,
                        letterSpacing: "-0.01em",
                        margin: 0,
                      }}
                    >
                      {post.title}
                    </h3>
                    <p
                      style={{
                        marginTop: 8,
                        fontSize: 14,
                        lineHeight: 1.5,
                        color: "#86868b",
                        display: "-webkit-box",
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical" as const,
                        overflow: "hidden",
                      }}
                    >
                      {post.summary}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
