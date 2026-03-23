"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CategoryIcon from "@/components/CategoryIcon";
import { CopyLinkButton, ShareToXButton } from "@/components/ShareButtons";
import { getPosts, getPostBySlug, Post } from "@/lib/posts";

export default function PostPage() {
  const params = useParams();
  const slug = params.slug as string;
  const [post, setPost] = useState<Post | null>(null);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    const posts = getPosts();
    const found = getPostBySlug(slug, posts);
    if (found && found.published) {
      setPost(found);
    } else {
      setNotFound(true);
    }
  }, [slug]);

  if (notFound) {
    return (
      <>
        <Navbar />
        <main
          style={{
            minHeight: "100vh",
            background: "#000",
            color: "#f5f5f7",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column" as const,
          }}
        >
          <h1 style={{ fontSize: 72, fontWeight: 700, letterSpacing: "-0.04em", margin: 0 }}>
            404
          </h1>
          <p style={{ color: "#86868b", fontSize: 19, marginTop: 12 }}>
            This page doesn&apos;t exist.
          </p>
          <Link
            href="/blog"
            style={{
              marginTop: 24,
              color: "#2997ff",
              textDecoration: "none",
              fontSize: 15,
            }}
          >
            Back to Blog &gt;
          </Link>
        </main>
        <Footer />
      </>
    );
  }

  if (!post) {
    return (
      <>
        <Navbar />
        <main style={{ minHeight: "100vh", background: "#000" }} />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main style={{ minHeight: "100vh", background: "#000", color: "#f5f5f7" }}>
        {/* Cover Image */}
        {post.coverImage && (
          <div
            style={{
              width: "100%",
              maxWidth: 980,
              margin: "0 auto",
              padding: "0 22px",
            }}
          >
            <div
              style={{
                width: "100%",
                height: 420,
                borderRadius: 20,
                overflow: "hidden",
                marginTop: 40,
                backgroundImage: `url(${post.coverImage})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            />
          </div>
        )}

        <article
          style={{
            maxWidth: 720,
            margin: "0 auto",
            padding: post.coverImage ? "48px 22px 100px" : "100px 22px",
          }}
        >
          {/* Category & Meta */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              marginBottom: 20,
            }}
          >
            <CategoryIcon category={post.category} size={28} />
            <span
              style={{
                fontSize: 13,
                fontWeight: 500,
                color: "#2997ff",
                letterSpacing: "0.02em",
              }}
            >
              {post.category}
            </span>
          </div>

          {/* Title */}
          <h1
            style={{
              fontSize: 48,
              lineHeight: 1.08,
              margin: 0,
              fontWeight: 700,
              letterSpacing: "-0.035em",
            }}
          >
            {post.title}
          </h1>

          {/* Meta bar */}
          <div
            style={{
              marginTop: 24,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexWrap: "wrap" as const,
              gap: 12,
              paddingBottom: 24,
              borderBottom: "1px solid rgba(255,255,255,0.06)",
            }}
          >
            <div style={{ fontSize: 14, color: "#6e6e73" }}>
              {post.date} &middot; {post.readTime}
            </div>
            <div style={{ display: "flex", gap: 8 }}>
              <CopyLinkButton />
              <ShareToXButton />
            </div>
          </div>

          {/* Summary */}
          <p
            style={{
              marginTop: 40,
              fontSize: 21,
              lineHeight: 1.6,
              color: "#d2d2d7",
              fontWeight: 400,
            }}
          >
            {post.summary}
          </p>

          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div style={{ marginTop: 24, display: "flex", gap: 8, flexWrap: "wrap" as const }}>
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  style={{
                    fontSize: 12,
                    color: "#86868b",
                    background: "rgba(255,255,255,0.04)",
                    padding: "5px 14px",
                    borderRadius: 980,
                    border: "1px solid rgba(255,255,255,0.06)",
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* Body */}
          <div
            style={{
              marginTop: 48,
              fontSize: 17,
              lineHeight: 1.8,
              color: "#86868b",
              letterSpacing: "0.004em",
            }}
            dangerouslySetInnerHTML={{ __html: post.body }}
          />

          {/* Back link */}
          <div
            style={{
              marginTop: 64,
              paddingTop: 32,
              borderTop: "1px solid rgba(255,255,255,0.06)",
            }}
          >
            <Link
              href="/blog"
              style={{
                color: "#2997ff",
                textDecoration: "none",
                fontSize: 15,
                fontWeight: 500,
              }}
            >
              &larr; Back to all posts
            </Link>
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
