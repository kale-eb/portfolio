import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.calebjune.com"),
  title: "Caleb Pong — Founder & CTO @ Vyra",
  description:
    "Avid builder, highly invested in the agentic future and obsessed with seamless user experiences in consumer products. Currently building Vyra — the agentic video editor.",
  openGraph: {
    title: "Caleb Pong — Founder & CTO @ Vyra",
    description:
      "Avid builder, invested in the agentic future. Currently building Vyra — the agentic video editor.",
    url: "https://www.calebjune.com",
    siteName: "Caleb Pong",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Caleb Pong — Founder & CTO @ Vyra",
    description:
      "Avid builder, invested in the agentic future. Currently building Vyra — the agentic video editor.",
  },
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
