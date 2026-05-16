import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Caleb Pong — AI-first builder",
  description: "Brown CS '27. I build AI-first products end-to-end — models, agents, interfaces. Currently building Vyra and the Agentic Web Agency.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="grain bg-cream-50">{children}</body>
    </html>
  );
}
