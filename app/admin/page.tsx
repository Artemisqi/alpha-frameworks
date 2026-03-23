"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import { getPosts, savePosts, Post } from "@/lib/posts";

const ADMIN_PASSWORD = "alpha2026";
const AUTH_KEY = "admin-auth";

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 60);
}

export default function AdminPage() {
  const [authed, setAuthed] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [posts, setPosts] = useState<Post[]>([]);
  const [editing, setEditing] = useState<Post | null>(null);
  const [isNew, setIsNew] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem(AUTH_KEY) === "true") {
      setAuthed(true);
    }
  }, []);

  useEffect(() => {
    if (authed) {
      setPosts(getPosts());
    }
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
      category: "",
      date: new Date().toISOString().slice(0, 7),
      year: new Date().getFullYear(),
      summary: "",
      body: "",
      readTime: "5 min read",
      published: true,
    });
    setIsNew(true);
  };

  const handleSave = () => {
    if (!editing) return;
    if (!editing.title.trim()) {
      alert("标题不能为空");
      return;
    }
    const post = {
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

  if (!authed) {
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
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <form
            onSubmit={handleLogin}
            style={{
              background: "#18181b",
              border: "1px solid #27272a",
              borderRadius: "24px",
              padding: "40px",
              width: "100%",
              maxWidth: "400px",
            }}
          >
            <h1 style={{ margin: "0 0 8px", fontSize: "28px" }}>Admin</h1>
            <p style={{ color: "#71717a", fontSize: "14px", margin: "0 0 24px" }}>
              请输入管理员密码
            </p>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              style={{
                width: "100%",
                padding: "12px 16px",
                background: "#09090b",
                border: "1px solid #3f3f46",
                borderRadius: "12px",
                color: "#f4f4f5",
                fontSize: "16px",
                outline: "none",
                boxSizing: "border-box",
              }}
            />
            {error && (
              <p style={{ color: "#ef4444", fontSize: "14px", marginTop: "8px" }}>
                {error}
              </p>
            )}
            <button
              type="submit"
              style={{
                width: "100%",
                marginTop: "16px",
                padding: "12px",
                background: "#ffffff",
                color: "#09090b",
                border: "none",
                borderRadius: "12px",
                fontSize: "16px",
                fontWeight: 600,
                cursor: "pointer",
              }}
            >
              登录
            </button>
          </form>
        </main>
      </>
    );
  }

  if (editing) {
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
            <h1 style={{ fontSize: "32px", marginBottom: "24px" }}>
              {isNew ? "新建文章" : "编辑文章"}
            </h1>

            <div
              style={{
                background: "#18181b",
                border: "1px solid #27272a",
                borderRadius: "24px",
                padding: "32px",
                display: "grid",
                gap: "20px",
              }}
            >
              <Field
                label="标题"
                value={editing.title}
                onChange={(v) => setEditing({ ...editing, title: v })}
              />
              <Field
                label="Slug"
                value={editing.slug || slugify(editing.title)}
                onChange={(v) => setEditing({ ...editing, slug: v })}
                disabled={!isNew}
              />
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "16px" }}>
                <Field
                  label="分类"
                  value={editing.category}
                  onChange={(v) => setEditing({ ...editing, category: v })}
                />
                <Field
                  label="日期 (YYYY-MM)"
                  value={editing.date}
                  onChange={(v) => setEditing({ ...editing, date: v })}
                />
                <Field
                  label="阅读时间"
                  value={editing.readTime}
                  onChange={(v) => setEditing({ ...editing, readTime: v })}
                />
              </div>
              <FieldArea
                label="摘要"
                value={editing.summary}
                onChange={(v) => setEditing({ ...editing, summary: v })}
                rows={3}
              />
              <FieldArea
                label="正文 (HTML)"
                value={editing.body}
                onChange={(v) => setEditing({ ...editing, body: v })}
                rows={15}
              />
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <input
                  type="checkbox"
                  checked={editing.published}
                  onChange={(e) =>
                    setEditing({ ...editing, published: e.target.checked })
                  }
                  style={{ width: "18px", height: "18px" }}
                />
                <label style={{ color: "#a1a1aa", fontSize: "14px" }}>
                  已发布
                </label>
              </div>

              <div style={{ display: "flex", gap: "12px", marginTop: "8px" }}>
                <button
                  onClick={handleSave}
                  style={{
                    padding: "12px 24px",
                    background: "#ffffff",
                    color: "#09090b",
                    border: "none",
                    borderRadius: "12px",
                    fontSize: "16px",
                    fontWeight: 600,
                    cursor: "pointer",
                  }}
                >
                  保存
                </button>
                <button
                  onClick={() => setEditing(null)}
                  style={{
                    padding: "12px 24px",
                    background: "transparent",
                    color: "#a1a1aa",
                    border: "1px solid #3f3f46",
                    borderRadius: "12px",
                    fontSize: "16px",
                    cursor: "pointer",
                  }}
                >
                  取消
                </button>
              </div>
            </div>
          </div>
        </main>
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
        <div style={{ maxWidth: "900px", margin: "0 auto" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "32px",
              flexWrap: "wrap",
              gap: "12px",
            }}
          >
            <h1 style={{ fontSize: "32px", margin: 0 }}>文章管理</h1>
            <div style={{ display: "flex", gap: "12px" }}>
              <button
                onClick={handleNew}
                style={{
                  padding: "10px 20px",
                  background: "#ffffff",
                  color: "#09090b",
                  border: "none",
                  borderRadius: "12px",
                  fontSize: "14px",
                  fontWeight: 600,
                  cursor: "pointer",
                }}
              >
                + 新建文章
              </button>
              <button
                onClick={handleLogout}
                style={{
                  padding: "10px 20px",
                  background: "transparent",
                  color: "#a1a1aa",
                  border: "1px solid #3f3f46",
                  borderRadius: "12px",
                  fontSize: "14px",
                  cursor: "pointer",
                }}
              >
                退出
              </button>
            </div>
          </div>

          <div style={{ display: "grid", gap: "12px" }}>
            {posts.map((post) => (
              <div
                key={post.slug}
                style={{
                  background: "#18181b",
                  border: "1px solid #27272a",
                  borderRadius: "16px",
                  padding: "20px 24px",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  gap: "16px",
                  flexWrap: "wrap",
                }}
              >
                <div style={{ flex: 1, minWidth: "200px" }}>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                      flexWrap: "wrap",
                    }}
                  >
                    <span style={{ fontSize: "16px", fontWeight: 600 }}>
                      {post.title}
                    </span>
                    <span
                      style={{
                        fontSize: "11px",
                        padding: "2px 8px",
                        borderRadius: "6px",
                        background: post.published ? "#166534" : "#7f1d1d",
                        color: post.published ? "#86efac" : "#fca5a5",
                      }}
                    >
                      {post.published ? "已发布" : "草稿"}
                    </span>
                  </div>
                  <div
                    style={{
                      fontSize: "13px",
                      color: "#71717a",
                      marginTop: "4px",
                    }}
                  >
                    {post.category} · {post.date}
                  </div>
                </div>

                <div style={{ display: "flex", gap: "8px", flexShrink: 0 }}>
                  <button
                    onClick={() => handleTogglePublish(post.slug)}
                    style={{
                      padding: "6px 14px",
                      background: "transparent",
                      color: "#a1a1aa",
                      border: "1px solid #3f3f46",
                      borderRadius: "8px",
                      fontSize: "13px",
                      cursor: "pointer",
                    }}
                  >
                    {post.published ? "取消发布" : "发布"}
                  </button>
                  <button
                    onClick={() => handleEdit(post)}
                    style={{
                      padding: "6px 14px",
                      background: "transparent",
                      color: "#60a5fa",
                      border: "1px solid #1e3a5f",
                      borderRadius: "8px",
                      fontSize: "13px",
                      cursor: "pointer",
                    }}
                  >
                    编辑
                  </button>
                  <button
                    onClick={() => handleDelete(post.slug)}
                    style={{
                      padding: "6px 14px",
                      background: "transparent",
                      color: "#f87171",
                      border: "1px solid #7f1d1d",
                      borderRadius: "8px",
                      fontSize: "13px",
                      cursor: "pointer",
                    }}
                  >
                    删除
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </>
  );
}

function Field({
  label,
  value,
  onChange,
  disabled,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  disabled?: boolean;
}) {
  return (
    <div>
      <label
        style={{ display: "block", color: "#71717a", fontSize: "13px", marginBottom: "6px" }}
      >
        {label}
      </label>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        style={{
          width: "100%",
          padding: "10px 14px",
          background: "#09090b",
          border: "1px solid #3f3f46",
          borderRadius: "10px",
          color: disabled ? "#71717a" : "#f4f4f5",
          fontSize: "15px",
          outline: "none",
          boxSizing: "border-box",
        }}
      />
    </div>
  );
}

function FieldArea({
  label,
  value,
  onChange,
  rows,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  rows: number;
}) {
  return (
    <div>
      <label
        style={{ display: "block", color: "#71717a", fontSize: "13px", marginBottom: "6px" }}
      >
        {label}
      </label>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={rows}
        style={{
          width: "100%",
          padding: "10px 14px",
          background: "#09090b",
          border: "1px solid #3f3f46",
          borderRadius: "10px",
          color: "#f4f4f5",
          fontSize: "15px",
          outline: "none",
          resize: "vertical",
          fontFamily: "monospace",
          boxSizing: "border-box",
        }}
      />
    </div>
  );
}
