"use client";

const iconMap: Record<string, { icon: string; gradient: [string, string] }> = {
  "AI / Systems": {
    icon: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z",
    gradient: ["#2997ff", "#5ac8fa"],
  },
  "Semis / Research": {
    icon: "M20 2H4c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM9 18H7v-6h2v6zm4 0h-2V6h2v12zm4 0h-2v-8h2v8z",
    gradient: ["#bf5af2", "#da8fff"],
  },
  "Macro / Geopolitics": {
    icon: "M3.5 18.49l6-6.01 4 4L22 6.92l-1.41-1.41-7.09 7.97-4-4L2 16.99z",
    gradient: ["#ff6482", "#ff9f0a"],
  },
  "Company / SaaS": {
    icon: "M12 7V3H2v18h20V7H12zM6 19H4v-2h2v2zm0-4H4v-2h2v2zm0-4H4V9h2v2zm0-4H4V5h2v2zm4 12H8v-2h2v2zm0-4H8v-2h2v2zm0-4H8V9h2v2zm0-4H8V5h2v2zm10 12h-8v-2h2v-2h-2v-2h2v-2h-2V9h8v10zm-2-8h-2v2h2v-2zm0 4h-2v2h2v-2z",
    gradient: ["#30d158", "#63e6be"],
  },
  "Macro / AI": {
    icon: "M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z",
    gradient: ["#ff9f0a", "#ffd60a"],
  },
  "Thinking / Meta": {
    icon: "M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0l4.6-4.6-4.6-4.6L16 6l6 6-6 6-1.4-1.4z",
    gradient: ["#5e5ce6", "#bf5af2"],
  },
};

const defaultIcon = {
  icon: "M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z",
  gradient: ["#86868b", "#a1a1a6"] as [string, string],
};

export default function CategoryIcon({
  category,
  size = 40,
}: {
  category: string;
  size?: number;
}) {
  const config = iconMap[category] || defaultIcon;
  const gradientId = `grad-${category.replace(/[^a-z]/gi, "")}`;

  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: size * 0.25,
        background: `linear-gradient(135deg, ${config.gradient[0]}, ${config.gradient[1]})`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
      }}
    >
      <svg
        width={size * 0.55}
        height={size * 0.55}
        viewBox="0 0 24 24"
        fill="white"
      >
        <defs>
          <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="white" />
            <stop offset="100%" stopColor="rgba(255,255,255,0.85)" />
          </linearGradient>
        </defs>
        <path d={config.icon} fill={`url(#${gradientId})`} />
      </svg>
    </div>
  );
}

export function CategoryDot({ category }: { category: string }) {
  const config = iconMap[category] || defaultIcon;
  return (
    <span
      style={{
        display: "inline-block",
        width: 8,
        height: 8,
        borderRadius: "50%",
        background: `linear-gradient(135deg, ${config.gradient[0]}, ${config.gradient[1]})`,
        marginRight: 8,
        flexShrink: 0,
      }}
    />
  );
}
