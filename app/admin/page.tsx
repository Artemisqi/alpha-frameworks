"use client";

import { useEffect, useState, useRef } from "react";
import Navbar from "@/components/Navbar";
import CategoryIcon from "@/components/CategoryIcon";
import { getPosts, savePosts, Post } from "@/lib/posts";

const ADMIN_PASSWORD = "alpha2026";
const AUTH_KEY = "admin-auth";

const MOODS = ["🔥", "🧠", "⚡", "💡", "✨", "🌍", "🎯", "📈", "📉", "🤔", "💎", "🚀", "⚠️", "🔮", "❄️", "☀️"];

const CATEGORIES = [
  "AI / Systems",
  "Semis / Research",
  "Macro / Geopolitics",
  "Company / SaaS",
  "Macro / AI",
  "Thinking / Meta",
];

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 60);
}

/* ── Shared Styles ── */
const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "10px 14px",
  background: "rgba(255,255,255,0.04)",
  border: "1px solid rgba(255,255,255,0.1)",
  borderRadius: 12,
  color: "#f5f5f7",
  fontSize: 15,
  outline: "none",
  boxSizing: "border-box",
  fontFamily: "inherit",
  transition: "border-color 0.2s",
};

const labelStyle: React.CSSProperties = {
  display: "block",
  color: "#6e6e73",
  fontSize: 13,
  fontWeight: 500,
  marginBottom: 6,
};

const btnPrimary: React.CSSProperties = {
  padding: "10px 22px",
  background: "#2997ff",
  color: "#fff",
  border: "none",
  borderRadius: 980,
  fontSize: 14,
  fontWeight: 500,
  cursor: "pointer",
  fontFamily: "inherit",
  transition: "all 0.2s",
};

const btnSecondary: React.CSSProperties = {
  padding: "10px 22px",
  background: "rgba(255,255,255,0.06)",
  color: "#86868b",
  border: "1px solid rgba(255,255,255,0.1)",
  borderRadius: 980,
  fontSize: 14,
  fontWeight: 500,
  cursor: "pointer",
  fontFamily: "inherit",
  transition: "all 0.2s",
};

const btnDanger: React.CSSProperties = {
  padding: "6px 14px",
  background: "transparent",
  color: "#ff453a",
  border: "1px solid rgba(255, 69, 58, 0.25)",
  borderRadius: 980,
  fontSize: 13,
  cursor: "pointer",
  fontFamily: "inherit",
  transition: "all 0.2s",
};

/* ── Main Component ── */
export default function AdminPage() {
  const [authed, setAuthed] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [posts, setPosts] = useState<Post[]>([]);
  const [editing, setEditing] = useState<Post | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [showImageModal, setShowImageModal] = useState(false);
  const bodyRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (sessionStorage.getItem(AUTH_KEY) === "true") setAuthed(true);
  }, []);

  useEffect(() => {
    if (authed) setPosts(getPosts());
  }, [authed]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      sessionStorage.setItem(AUTH_KEY, "true");
      setAuthed(true);
      setError("");
    } else {
      setError("密码错误");
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem(AUTH_KEY);
    setAuthed(false);
  };

  const handleDelete = (slug: string) => {
    if (!confirm("确定删除这篇文章？")) return;
    const updated = posts.filter((p) => p.slug !== slug);
    setPosts(updated);
    savePosts(updated);
  };

  const handleEdit = (post: Post) => {
    setEditing({ ...post });
    setIsNew(false);
  };

  const handleNew = () => {
    setEditing({
      slug: "",
      title: "",
      category: CATEGORIES[0],
      date: new Date().toISOString().slice(0, 7),
      year: new Date().getFullYear(),
      summary: "",
      body: "",
      readTime: "5 min read",
      published: true,
      mood: "",
      coverImage: "",
      tags: [],
      images: [],
    });
    setIsNew(true);
  };

  const handleSave = () => {
    if (!editing) return;
    if (!editing.title.trim()) {
      alert("标题不能为空");
      return;
    }
    const post: Post = {
      ...editing,
      slug: editing.slug || slugify(editing.title),
      year: parseInt(editing.date.slice(0, 4)) || new Date().getFullYear(),
    };

    let updated: Post[];
    if (isNew) {
      if (posts.some((p) => p.slug === post.slug)) {
        alert("Slug 已存在，请修改标题或 slug");
        return;
      }
      updated = [post, ...posts];
    } else {
      updated = posts.map((p) => (p.slug === post.slug ? post : p));
    }
    setPosts(updated);
    savePosts(updated);
    setEditing(null);
  };

  const handleTogglePublish = (slug: string) => {
    const updated = posts.map((p) =>
      p.slug === slug ? { ...p, published: !p.published } : p
    );
    setPosts(updated);
    savePosts(updated);
  };

  const insertImageToBody = () => {
    if (!imageUrl.trim() || !editing) return;
    const imgTag = `<img src="${imageUrl.trim()}" alt="" style="width:100%;border-radius:12px;margin:24px 0" />`;
    const textarea = bodyRef.current;
    if (textarea) {
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      const newBody =
        editing.body.slice(0, start) + imgTag + editing.body.slice(end);
      setEditing({
        ...editing,
        body: newBody,
        images: [...(editing.images || []), imageUrl.trim()],
      });
    } else {
      setEditing({
        ...editing,
        body: editing.body + "\n" + imgTag,
        images: [...(editing.images || []), imageUrl.trim()],
      });
    }
    setImageUrl("");
    setShowImageModal(false);
  };

  /* ── Login Screen ── */
  if (!authed) {
    return (
      <>
        <Navbar />
        <main
          style={{
            minHeight: "100vh",
            background: "#000",
            color: "#f5f5f7",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: 24,
          }}
        >
          <form
            onSubmit={handleLogin}
            style={{
              background: "#111113",
              border: "1px solid rgba(255,255,255,0.06)",
              borderRadius: 20,
              padding: 40,
              width: "100%",
              maxWidth: 380,
            }}
          >
            <div style={{ textAlign: "center", marginBottom: 32 }}>
              <div
                style={{
                  width: 56,
                  height: 56,
                  borderRadius: 16,
                  background: "linear-gradient(135deg, #2997ff, #5ac8fa)",
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: 16,
                }}
              >
                <svg width="28" height="28" viewBox="0 0 24 24" fill="white">
                  <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z" />
                </svg>
              </div>
              <h1 style={{ fontSize: 24, fontWeight: 700, letterSpacing: "-0.02em", margin: 0 }}>
                Admin
              </h1>
              <p style={{ color: "#6e6e73", fontSize: 14, marginTop: 6 }}>
                请输入管理员密码
              </p>
            </div>

            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              style={{ ...inputStyle, textAlign: "center", fontSize: 16 }}
            />

            {error && (
              <p style={{ color: "#ff453a", fontSize: 14, marginTop: 8, textAlign: "center" }}>
                {error}
              </p>
            )}

            <button type="submit" style={{ ...btnPrimary, width: "100%", marginTop: 16, padding: "12px 24px" }}>
              登录
            </button>
          </form>
        </main>
      </>
    );
  }

  /* ── Editor Screen ── */
  if (editing) {
    return (
      <>
        <Navbar />
        <main style={{ minHeight: "100vh", background: "#000", color: "#f5f5f7" }}>
          <div style={{ maxWidth: 860, margin: "0 auto", padding: "80px 22px" }}>
            {/* Header */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 32 }}>
              <h1 style={{ fontSize: 28, fontWeight: 700, letterSpacing: "-0.02em", margin: 0 }}>
                {isNew ? "新建文章" : "编辑文章"}
              </h1>
              <div style={{ display: "flex", gap: 8 }}>
                <button onClick={() => setEditing(null)} style={btnSecondary}>取消</button>
                <button onClick={handleSave} style={btnPrimary}>保存</button>
              </div>
            </div>

            <div
              style={{
                background: "#111113",
                border: "1px solid rgba(255,255,255,0.06)",
                borderRadius: 20,
                padding: 32,
                display: "grid",
                gap: 24,
              }}
            >
              {/* Title */}
              <div>
                <label style={labelStyle}>标题</label>
                <input
                  value={editing.title}
                  onChange={(e) => setEditing({ ...editing, title: e.target.value })}
                  style={{ ...inputStyle, fontSize: 20, fontWeight: 600, padding: "14px 18px" }}
                  placeholder="文章标题..."
                />
              </div>

              {/* Slug */}
              <div>
                <label style={labelStyle}>Slug</label>
                <input
                  value={editing.slug || slugify(editing.title)}
                  onChange={(e) => setEditing({ ...editing, slug: e.target.value })}
                  disabled={!isNew}
                  style={{ ...inputStyle, color: isNew ? "#f5f5f7" : "#424245" }}
                />
              </div>

              {/* Category + Date + ReadTime row */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16 }}>
                <div>
                  <label style={labelStyle}>分类</label>
                  <select
                    value={editing.category}
                    onChange={(e) => setEditing({ ...editing, category: e.target.value })}
                    style={{
                      ...inputStyle,
                      appearance: "none" as const,
                      backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='%2386868b'%3E%3Cpath d='M7 10l5 5 5-5z'/%3E%3C/svg%3E")`,
                      backgroundRepeat: "no-repeat",
                      backgroundPosition: "right 12px center",
                      paddingRight: 32,
                    }}
                  >
                    {CATEGORIES.map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label style={labelStyle}>日期 (YYYY-MM)</label>
                  <input
                    value={editing.date}
                    onChange={(e) => setEditing({ ...editing, date: e.target.value })}
                    style={inputStyle}
                    placeholder="2026-03"
                  />
                </div>
                <div>
                  <label style={labelStyle}>阅读时间</label>
                  <input
                    value={editing.readTime}
                    onChange={(e) => setEditing({ ...editing, readTime: e.target.value })}
                    style={inputStyle}
                    placeholder="5 min read"
                  />
                </div>
              </div>

              {/* Cover Image */}
              <div>
                <label style={labelStyle}>封面图片 URL</label>
                <input
                  value={editing.coverImage || ""}
                  onChange={(e) => setEditing({ ...editing, coverImage: e.target.value })}
                  style={inputStyle}
                  placeholder="https://images.unsplash.com/..."
                />
                {editing.coverImage && (
                  <div
                    style={{
                      marginTop: 12,
                      height: 180,
                      borderRadius: 12,
                      overflow: "hidden",
                      backgroundImage: `url(${editing.coverImage})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      border: "1px solid rgba(255,255,255,0.06)",
                    }}
                  />
                )}
              </div>

              {/* Mood Picker */}
              <div>
                <label style={labelStyle}>心情</label>
                <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                  <button
                    onClick={() => setEditing({ ...editing, mood: "" })}
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: 10,
                      border: !editing.mood ? "2px solid #2997ff" : "1px solid rgba(255,255,255,0.1)",
                      background: !editing.mood ? "rgba(41,151,255,0.1)" : "rgba(255,255,255,0.04)",
                      cursor: "pointer",
                      fontSize: 13,
                      color: "#6e6e73",
                      fontFamily: "inherit",
                    }}
                  >
                    无
                  </button>
                  {MOODS.map((m) => (
                    <button
                      key={m}
                      onClick={() => setEditing({ ...editing, mood: m })}
                      style={{
                        width: 40,
                        height: 40,
                        borderRadius: 10,
                        border: editing.mood === m ? "2px solid #2997ff" : "1px solid rgba(255,255,255,0.1)",
                        background: editing.mood === m ? "rgba(41,151,255,0.1)" : "rgba(255,255,255,0.04)",
                        cursor: "pointer",
                        fontSize: 20,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        transition: "all 0.15s",
                      }}
                    >
                      {m}
                    </button>
                  ))}
                </div>
              </div>

              {/* Tags */}
              <div>
                <label style={labelStyle}>标签（逗号分隔）</label>
                <input
                  value={(editing.tags || []).join(", ")}
                  onChange={(e) =>
                    setEditing({
                      ...editing,
                      tags: e.target.value.split(",").map((t) => t.trim()).filter(Boolean),
                    })
                  }
                  style={inputStyle}
                  placeholder="AI, Agent, Markets"
                />
                {editing.tags && editing.tags.length > 0 && (
                  <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginTop: 10 }}>
                    {editing.tags.map((tag) => (
                      <span
                        key={tag}
                        style={{
                          fontSize: 12,
                          color: "#86868b",
                          background: "rgba(255,255,255,0.04)",
                          padding: "4px 12px",
                          borderRadius: 980,
                          border: "1px solid rgba(255,255,255,0.06)",
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Summary */}
              <div>
                <label style={labelStyle}>摘要</label>
                <textarea
                  value={editing.summary}
                  onChange={(e) => setEditing({ ...editing, summary: e.target.value })}
                  rows={3}
                  style={{ ...inputStyle, resize: "vertical" as const }}
                  placeholder="一两句话描述这篇文章..."
                />
              </div>

              {/* Body with toolbar */}
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
                  <label style={{ ...labelStyle, marginBottom: 0 }}>正文 (HTML)</label>
                  <div style={{ display: "flex", gap: 6 }}>
                    <button
                      onClick={() => setShowImageModal(true)}
                      style={{
                        ...btnSecondary,
                        padding: "6px 14px",
                        fontSize: 13,
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 5,
                      }}
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                        <circle cx="8.5" cy="8.5" r="1.5" />
                        <polyline points="21 15 16 10 5 21" />
                      </svg>
                      插入图片
                    </button>
                    <button
                      onClick={() => {
                        if (!editing || !bodyRef.current) return;
                        const ta = bodyRef.current;
                        const s = ta.selectionStart;
                        const e = ta.selectionEnd;
                        const selected = editing.body.slice(s, e);
                        const wrapped = `<h2>${selected || "标题"}</h2>`;
                        setEditing({
                          ...editing,
                          body: editing.body.slice(0, s) + wrapped + editing.body.slice(e),
                        });
                      }}
                      style={{ ...btnSecondary, padding: "6px 14px", fontSize: 13 }}
                    >
                      H2
                    </button>
                    <button
                      onClick={() => {
                        if (!editing || !bodyRef.current) return;
                        const ta = bodyRef.current;
                        const s = ta.selectionStart;
                        const e = ta.selectionEnd;
                        const selected = editing.body.slice(s, e);
                        const wrapped = `<p>${selected || ""}</p>`;
                        setEditing({
                          ...editing,
                          body: editing.body.slice(0, s) + wrapped + editing.body.slice(e),
                        });
                      }}
                      style={{ ...btnSecondary, padding: "6px 14px", fontSize: 13 }}
                    >
                      P
                    </button>
                  </div>
                </div>
                <textarea
                  ref={bodyRef}
                  value={editing.body}
                  onChange={(e) => setEditing({ ...editing, body: e.target.value })}
                  rows={18}
                  style={{
                    ...inputStyle,
                    resize: "vertical" as const,
                    fontFamily: "'SF Mono', SFMono-Regular, Menlo, Consolas, monospace",
                    fontSize: 13,
                    lineHeight: 1.7,
                  }}
                />
              </div>

              {/* Published toggle */}
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <button
                  onClick={() => setEditing({ ...editing, published: !editing.published })}
                  style={{
                    width: 44,
                    height: 24,
                    borderRadius: 12,
                    border: "none",
                    background: editing.published ? "#30d158" : "rgba(255,255,255,0.15)",
                    cursor: "pointer",
                    position: "relative" as const,
                    transition: "background 0.2s",
                    flexShrink: 0,
                  }}
                >
                  <div
                    style={{
                      width: 20,
                      height: 20,
                      borderRadius: 10,
                      background: "#fff",
                      position: "absolute",
                      top: 2,
                      left: editing.published ? 22 : 2,
                      transition: "left 0.2s",
                    }}
                  />
                </button>
                <span style={{ color: "#86868b", fontSize: 14 }}>
                  {editing.published ? "已发布" : "草稿"}
                </span>
              </div>
            </div>

            {/* Image Insert Modal */}
            {showImageModal && (
              <div
                style={{
                  position: "fixed",
                  inset: 0,
                  background: "rgba(0,0,0,0.7)",
                  backdropFilter: "blur(8px)",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  zIndex: 9999,
                  padding: 24,
                }}
                onClick={() => setShowImageModal(false)}
              >
                <div
                  onClick={(e) => e.stopPropagation()}
                  style={{
                    background: "#1d1d1f",
                    border: "1px solid rgba(255,255,255,0.1)",
                    borderRadius: 20,
                    padding: 32,
                    width: "100%",
                    maxWidth: 480,
                  }}
                >
                  <h3 style={{ fontSize: 20, fontWeight: 700, marginTop: 0, marginBottom: 4 }}>
                    插入图片
                  </h3>
                  <p style={{ color: "#6e6e73", fontSize: 14, marginBottom: 20 }}>
                    输入图片 URL，将在光标位置插入
                  </p>
                  <input
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                    style={inputStyle}
                    placeholder="https://images.unsplash.com/..."
                    autoFocus
                    onKeyDown={(e) => {
                      if (e.key === "Enter") insertImageToBody();
                    }}
                  />
                  {imageUrl && (
                    <div
                      style={{
                        marginTop: 12,
                        height: 160,
                        borderRadius: 12,
                        overflow: "hidden",
                        backgroundImage: `url(${imageUrl})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        border: "1px solid rgba(255,255,255,0.06)",
                      }}
                    />
                  )}
                  <div style={{ display: "flex", gap: 8, justifyContent: "flex-end", marginTop: 20 }}>
                    <button onClick={() => setShowImageModal(false)} style={btnSecondary}>
                      取消
                    </button>
                    <button onClick={insertImageToBody} style={btnPrimary}>
                      插入
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </main>
      </>
    );
  }

  /* ── Post List Screen ── */
  return (
    <>
      <Navbar />
      <main style={{ minHeight: "100vh", background: "#000", color: "#f5f5f7" }}>
        <div style={{ maxWidth: 860, margin: "0 auto", padding: "80px 22px" }}>
          {/* Header */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 40,
              flexWrap: "wrap",
              gap: 12,
            }}
          >
            <div>
              <h1 style={{ fontSize: 28, fontWeight: 700, letterSpacing: "-0.02em", margin: 0 }}>
                文章管理
              </h1>
              <p style={{ color: "#6e6e73", fontSize: 14, marginTop: 4 }}>
                {posts.length} 篇文章 &middot; {posts.filter((p) => p.published).length} 已发布
              </p>
            </div>
            <div style={{ display: "flex", gap: 8 }}>
              <button onClick={handleNew} style={btnPrimary}>
                + 新建文章
              </button>
              <button onClick={handleLogout} style={btnSecondary}>
                退出
              </button>
            </div>
          </div>

          {/* Post Cards */}
          <div style={{ display: "grid", gap: 12 }}>
            {posts.map((post) => (
              <div
                key={post.slug}
                style={{
                  background: "#111113",
                  border: "1px solid rgba(255,255,255,0.06)",
                  borderRadius: 16,
                  overflow: "hidden",
                  display: "flex",
                  transition: "border-color 0.2s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "rgba(255,255,255,0.06)";
                }}
              >
                {/* Thumbnail */}
                {post.coverImage && (
                  <div
                    style={{
                      width: 120,
                      minHeight: "100%",
                      backgroundImage: `url(${post.coverImage})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      flexShrink: 0,
                    }}
                  />
                )}

                <div
                  style={{
                    flex: 1,
                    padding: "16px 20px",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    gap: 16,
                    flexWrap: "wrap",
                  }}
                >
                  <div style={{ flex: 1, minWidth: 200 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
                      {post.mood && <span style={{ fontSize: 18 }}>{post.mood}</span>}
                      <span style={{ fontSize: 16, fontWeight: 600, letterSpacing: "-0.01em" }}>
                        {post.title}
                      </span>
                      <span
                        style={{
                          fontSize: 11,
                          padding: "2px 10px",
                          borderRadius: 980,
                          fontWeight: 500,
                          background: post.published ? "rgba(48, 209, 88, 0.12)" : "rgba(255, 69, 58, 0.12)",
                          color: post.published ? "#30d158" : "#ff453a",
                        }}
                      >
                        {post.published ? "已发布" : "草稿"}
                      </span>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 6 }}>
                      <CategoryIcon category={post.category} size={16} />
                      <span style={{ fontSize: 13, color: "#6e6e73" }}>
                        {post.category} &middot; {post.date}
                      </span>
                    </div>
                  </div>

                  <div style={{ display: "flex", gap: 6, flexShrink: 0 }}>
                    <button
                      onClick={() => handleTogglePublish(post.slug)}
                      style={btnSecondary}
                    >
                      {post.published ? "取消发布" : "发布"}
                    </button>
                    <button
                      onClick={() => handleEdit(post)}
                      style={{ ...btnSecondary, color: "#2997ff", borderColor: "rgba(41,151,255,0.25)" }}
                    >
                      编辑
                    </button>
                    <button onClick={() => handleDelete(post.slug)} style={btnDanger}>
                      删除
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </>
  );
}
