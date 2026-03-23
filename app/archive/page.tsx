"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { CategoryDot } from "@/components/CategoryIcon";
import { getPosts, getDefaultPosts, Post } from "@/lib/posts";

export default function ArchivePage() {
  const [posts, setPosts] = useState<Post[]>(getDefaultPosts());

  useEffect(() => {
    setPosts(getPosts().filter((p) => p.published));
  }, []);

  const grouped = posts.reduce<Record<number, Post[]>>((acc, post) => {
    if (!acc[post.year]) acc[post.year] = [];
    acc[post.year].push(post);
    return acc;
  }, {});

  const years = Object.keys(grouped)
    .map(Number)
    .sort((a, b) => b - a);

  return (
    <>
      <Navbar />
      <main style={{ minHeight: "100vh", background: "#000", color: "#f5f5f7" }}>
        <div style={{ maxWidth: 720, margin: "0 auto", padding: "100px 22px" }}>
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
              Archive
            </h1>
            <p
              style={{
                marginTop: 16,
                fontSize: 19,
                lineHeight: 1.5,
                color: "#86868b",
                maxWidth: 480,
                margin: "16px auto 0",
              }}
            >
              按时间查看文章与想法的沉淀过程。一个好的 archive，不只是归档，而是能看见判断如何演进。
            </p>
          </div>

          {/* Timeline */}
          <div style={{ display: "grid", gap: 48 }}>
            {years.map((year) => (
              <div key={year}>
                <h2
                  style={{
                    fontSize: 14,
                    fontWeight: 600,
                    color: "#6e6e73",
                    letterSpacing: "0.04em",
                    textTransform: "uppercase" as const,
                    marginBottom: 20,
                    paddingBottom: 12,
                    borderBottom: "1px solid rgba(255,255,255,0.06)",
                  }}
                >
                  {year}
                </h2>

                <div style={{ display: "grid", gap: 4 }}>
                  {grouped[year].map((post) => (
                    <Link
                      key={post.slug}
                      href={`/posts/${post.slug}`}
                      style={{
                        textDecoration: "none",
                        color: "inherit",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        gap: 16,
                        padding: "14px 16px",
                        borderRadius: 12,
                        transition: "background 0.2s ease",
                      }}
                      onMouseEnter={(e) => {
                        (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.04)";
                      }}
                      onMouseLeave={(e) => {
                        (e.currentTarget as HTMLElement).style.background = "transparent";
                      }}
                    >
                      <div style={{ display: "flex", alignItems: "center", gap: 4, minWidth: 0 }}>
                        <CategoryDot category={post.category} />
                        <span
                          style={{
                            fontSize: 16,
                            fontWeight: 500,
                            letterSpacing: "-0.01em",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap" as const,
                          }}
                        >
                          {post.title}
                        </span>
                      </div>
                      <span
                        style={{
                          fontSize: 13,
                          color: "#424245",
                          flexShrink: 0,
                          fontVariantNumeric: "tabular-nums",
                        }}
                      >
                        {post.date}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
