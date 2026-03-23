"use client";

import { useState } from "react";

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
