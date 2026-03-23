"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
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
            background: "#09090b",
            color: "#f4f4f5",
            padding: "80px 24px",
            fontFamily: "Arial, sans-serif",
            textAlign: "center",
          }}
        >
          <h1 style={{ fontSize: "48px", marginBottom: "16px" }}>404</h1>
          <p style={{ color: "#a1a1aa", fontSize: "18px" }}>
            Post not found.
          </p>
        </main>
        <Footer />
      </>
    );
  }

  if (!post) {
    return (
      <>
        <Navbar />
        <main
          style={{
            minHeight: "100vh",
            background: "#09090b",
            color: "#f4f4f5",
            padding: "80px 24px",
          }}
        />
      </>
    );
  }

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
        <article style={{ maxWidth: "800px", margin: "0 auto" }}>
          <div
            style={{
              fontSize: "12px",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "#71717a",
              marginBottom: "16px",
            }}
          >
            {post.category}
          </div>

          <h1
            style={{
              fontSize: "52px",
              lineHeight: 1.1,
              margin: 0,
              fontWeight: 700,
              letterSpacing: "-0.03em",
            }}
          >
            {post.title}
          </h1>

          <div
            style={{
              marginTop: "20px",
              color: "#71717a",
              fontSize: "14px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: "12px",
            }}
          >
            <span>
              {post.date} · {post.readTime}
            </span>
            <div style={{ display: "flex", gap: "8px" }}>
              <CopyLinkButton />
              <ShareToXButton />
            </div>
          </div>

          <p
            style={{
              marginTop: "32px",
              fontSize: "22px",
              lineHeight: 1.8,
              color: "#d4d4d8",
            }}
          >
            {post.summary}
          </p>

          <div
            style={{
              marginTop: "40px",
              fontSize: "18px",
              lineHeight: 1.9,
              color: "#a1a1aa",
            }}
            dangerouslySetInnerHTML={{ __html: post.body }}
          />
        </article>
      </main>
      <Footer />
    </>
  );
}
