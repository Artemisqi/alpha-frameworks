"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getPosts, getDefaultPosts, Post } from "@/lib/posts";

export default function BlogPage() {
  const [posts, setPosts] = useState<Post[]>(getDefaultPosts());

  useEffect(() => {
    setPosts(getPosts().filter((p) => p.published));
  }, []);

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
            这里收纳更完整的文章：包括市场研究、AI
            基础设施、公司分析，以及那些还在形成中的长期判断。
          </p>

          <div style={{ marginTop: "40px", display: "grid", gap: "20px" }}>
            {posts.map((post) => (
              <Link
                key={post.slug}
                href={`/posts/${post.slug}`}
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
                    {post.category} · {post.date}
                  </div>
                  <h2 style={{ marginTop: "16px", fontSize: "26px" }}>
                    {post.title}
                  </h2>
                  <p style={{ color: "#a1a1aa", lineHeight: 1.8 }}>
                    {post.summary}
                  </p>
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
