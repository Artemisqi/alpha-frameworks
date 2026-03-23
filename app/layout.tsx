import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Alpha & Frameworks",
  description: "Notes on markets, AI, systems, and long-term thinking.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
