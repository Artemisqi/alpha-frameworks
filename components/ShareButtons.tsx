"use client";

import { useState } from "react";

const buttonStyle = {
  background: "rgba(255, 255, 255, 0.06)",
  color: "#86868b",
  border: "1px solid rgba(255, 255, 255, 0.1)",
  borderRadius: 980,
  padding: "7px 16px",
  fontSize: 13,
  fontWeight: 400 as const,
  cursor: "pointer" as const,
  display: "inline-flex" as const,
  alignItems: "center" as const,
  gap: 6,
  transition: "all 0.2s ease",
  fontFamily: "inherit",
};

export function CopyLinkButton() {
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
        ...buttonStyle,
        ...(copied ? { color: "#30d158", borderColor: "rgba(48, 209, 88, 0.3)" } : {}),
      }}
    >
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
        <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" />
      </svg>
      {copied ? "Copied" : "Copy link"}
    </button>
  );
}

export function ShareToXButton() {
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
    <button onClick={handleShare} style={buttonStyle}>
      <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
      Share
    </button>
  );
}
