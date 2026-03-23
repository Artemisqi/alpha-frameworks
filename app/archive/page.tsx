"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
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
            按时间查看文章与想法的沉淀过程。一个好的
            archive，不只是归档，而是能看见判断如何演进。
          </p>

          <div style={{ marginTop: "40px", display: "grid", gap: "24px" }}>
            {years.map((year) => (
              <div
                key={year}
                style={{
                  border: "1px solid #27272a",
                  borderRadius: "24px",
                  padding: "24px",
                  background: "#18181b",
                }}
              >
                <h2 style={{ margin: 0, fontSize: "28px" }}>{year}</h2>
                <div
                  style={{ marginTop: "20px", display: "grid", gap: "12px" }}
                >
                  {grouped[year].map((post) => (
                    <Link
                      key={post.slug}
                      href={`/posts/${post.slug}`}
                      style={{ textDecoration: "none", color: "inherit" }}
                    >
                      <div
                        style={{
                          padding: "14px 16px",
                          border: "1px solid #3f3f46",
                          borderRadius: "16px",
                          cursor: "pointer",
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        <span>{post.title}</span>
                        <span
                          style={{
                            fontSize: "12px",
                            color: "#71717a",
                            flexShrink: 0,
                            marginLeft: "12px",
                          }}
                        >
                          {post.date}
                        </span>
                      </div>
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
