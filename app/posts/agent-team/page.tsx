"use client";

import { useState } from "react";
import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";

function CopyLinkButton() {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(window.location.href).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <button
      onClick={handleCopy}
      style={{
        background: "transparent",
        color: "#a1a1aa",
        border: "1px solid #3f3f46",
        borderRadius: "12px",
        padding: "8px 16px",
        fontSize: "14px",
        cursor: "pointer",
      }}
    >
      {copied ? "Copied!" : "Copy link"}
    </button>
  );
}

function ShareToXButton() {
  const handleShare = () => {
    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent(document.title);
    window.open(
      `https://x.com/intent/tweet?url=${url}&text=${text}`,
      "_blank",
      "noopener,noreferrer"
    );
  };

  return (
    <button
      onClick={handleShare}
      style={{
        background: "transparent",
        color: "#a1a1aa",
        border: "1px solid #3f3f46",
        borderRadius: "12px",
        padding: "8px 16px",
        fontSize: "14px",
        cursor: "pointer",
      }}
    >
      Share on X
    </button>
  );
}

export default function AgentTeamPostPage() {
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
            AI / Systems
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
            Agent Team：从单一模型走向委员会式决策
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
            <span>Mar 2026 · 8 min read</span>
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
            当 Agent Flow 进入多模型协同阶段，真正的 alpha 不在单个模型能力，而在委员会规则、共识形成和分工结构。
          </p>

          <div
            style={{
              marginTop: "40px",
              fontSize: "18px",
              lineHeight: 1.9,
              color: "#a1a1aa",
            }}
          >
            <p>
              过去一个阶段，市场对 AI 的理解更多停留在单模型能力的提升。但真正有意思的变化，可能发生在多模型协同与流程设计层。
            </p>

            <p>
              当 GPT、Claude、Gemini、Qwen 这类模型被放入同一个工作流，它们不再只是替代关系，而可以形成互相审查、互相补充、彼此纠错的委员会结构。
            </p>

            <p>
              这意味着未来的产品护城河，可能并不只是模型参数本身，而是 decision protocol、routing、consensus 与 exception handling。
            </p>

            <h2
              style={{
                marginTop: "48px",
                marginBottom: "16px",
                fontSize: "32px",
                color: "#f4f4f5",
              }}
            >
              为什么这件事重要
            </h2>

            <p>
              如果一个复杂任务从“问一个模型”变成“多个模型互相评审后再由一个仲裁者做最终决策”，那么 AI 的可靠性会明显提升。
            </p>

            <p>
              对企业来说，这意味着在高价值、高风险场景中，AI 的可用性会更强；对投资来说，这意味着价值捕获不一定只在底层模型，也可能在 orchestration、workflow、control layer。
            </p>

            <h2
              style={{
                marginTop: "48px",
                marginBottom: "16px",
                fontSize: "32px",
                color: "#f4f4f5",
              }}
            >
              投资上的含义
            </h2>

            <p>
              如果这个方向成立，那么市场未来会越来越关注：
            </p>

            <ul style={{ paddingLeft: "24px", lineHeight: 2 }}>
              <li>AI orchestration</li>
              <li>observability</li>
              <li>workflow infrastructure</li>
              <li>enterprise control layer</li>
            </ul>

            <p>
              也就是说，真正的 alpha 可能来自“AI 如何被组织起来”，而不只是“AI 本身有多强”。
            </p>
          </div>
        </article>
      </main>

      <Footer />
    </>
  );
}