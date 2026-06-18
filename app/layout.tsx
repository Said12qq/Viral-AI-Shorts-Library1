import React from "react";
import "../src/index.css";
export const metadata = {
  title: "Viral AI Shorts Library",
  description: "Elite 4K short-form video sequences",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-black text-white">{children}</body>
    </html>
  );
}
