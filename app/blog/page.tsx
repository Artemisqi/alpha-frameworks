"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CategoryIcon from "@/components/CategoryIcon";
import { CategoryDot } from "@/components/CategoryIcon";
import { getPosts, getDefaultPosts, Post } from "@/lib/posts";

export default function BlogPage() {
  const [posts, setPosts] = useState<Post[]>(getDefaultPosts());
  const [activeCategory, setActiveCategory] = useState<string>("All");

  useEffect(() => {
    setPosts(getPosts().filter((p) => p.published));
  }, []);

  const categories = ["All", ...Array.from(new Set(posts.map((p) => p.category)))];
  const filtered = activeCategory === "All" ? posts : posts.filter((p) => p.category === activeCategory);

  return (
    <>
      <Navbar />
      <main style={{ minHeight: "100vh", background: "#000", color: "#f5f5f7" }}>
        <div style={{ maxWidth: 980, margin: "0 auto", padding: "80px 22px" }}>
          {/* Header */}
          <div style={{ textAlign: "center" as const, marginBottom: 64 }}>
            <h1
              style={{
                fontSize: 48,
                fontWeight: 700,
                lineHeight: 1.08,
                letterSpacing: "-0.035em",
                margin: 0,
              }}
            >
              Blog
            </h1>
            <p
              style={{
                marginTop: 16,
                fontSize: 19,
                lineHeight: 1.5,
                color: "#86868b",
                maxWidth: 500,
                margin: "16px auto 0",
              }}
            >
              Essays, research, and working notes on markets, AI, and long-term thinking.
            </p>
          </div>

          {/* Category Filter */}
          <div
            style={{
              display: "flex",
              gap: 8,
              flexWrap: "wrap" as const,
              justifyContent: "center" as const,
              marginBottom: 48,
            }}
          >
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                style={{
                  background: activeCategory === cat ? "rgba(255, 255, 255, 0.12)" : "rgba(255, 255, 255, 0.04)",
                  color: activeCategory === cat ? "#f5f5f7" : "#86868b",
                  border: "1px solid",
                  borderColor: activeCategory === cat ? "rgba(255, 255, 255, 0.15)" : "rgba(255, 255, 255, 0.06)",
                  borderRadius: 980,
                  padding: "8px 18px",
                  fontSize: 13,
                  fontWeight: 500,
                  cursor: "pointer",
                  fontFamily: "inherit",
                  transition: "all 0.2s ease",
                }}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Post Grid */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
              gap: 20,
            }}
          >
            {filtered.map((post) => (
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
                    transition: "transform 0.3s ease, border-color 0.3s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "scale(1.02)";
                    e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "scale(1)";
                    e.currentTarget.style.borderColor = "rgba(255,255,255,0.06)";
                  }}
                >
                  {post.coverImage && (
                    <div
                      style={{
                        width: "100%",
                        height: 200,
                        backgroundImage: `url(${post.coverImage})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                      }}
                    />
                  )}
                  <div style={{ padding: "20px 24px 24px" }}>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 8,
                        marginBottom: 12,
                      }}
                    >
                      <CategoryIcon category={post.category} size={24} />
                      <span style={{ fontSize: 12, color: "#6e6e73", fontWeight: 500 }}>
                        {post.category}
                      </span>
                    </div>

                    <h2
                      style={{
                        fontSize: 20,
                        fontWeight: 600,
                        lineHeight: 1.25,
                        letterSpacing: "-0.015em",
                        margin: 0,
                      }}
                    >
                      {post.title}
                    </h2>

                    <p
                      style={{
                        marginTop: 8,
                        fontSize: 14,
                        lineHeight: 1.55,
                        color: "#86868b",
                        display: "-webkit-box",
                        WebkitLineClamp: 3,
                        WebkitBoxOrient: "vertical" as const,
                        overflow: "hidden",
                      }}
                    >
                      {post.summary}
                    </p>

                    {/* Tags */}
                    {post.tags && (
                      <div style={{ marginTop: 16, display: "flex", gap: 6, flexWrap: "wrap" as const }}>
                        {post.tags.slice(0, 3).map((tag) => (
                          <span
                            key={tag}
                            style={{
                              fontSize: 11,
                              color: "#6e6e73",
                              background: "rgba(255,255,255,0.04)",
                              padding: "3px 10px",
                              borderRadius: 980,
                              border: "1px solid rgba(255,255,255,0.06)",
                            }}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}

                    <div
                      style={{
                        marginTop: 16,
                        paddingTop: 16,
                        borderTop: "1px solid rgba(255,255,255,0.04)",
                        fontSize: 12,
                        color: "#424245",
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <span>{post.date}</span>
                      <span>{post.readTime}</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
