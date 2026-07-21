import type { Metadata } from "next";
import { AuthProvider } from "@/context/AuthContext";
import SmoothScroll from "@/components/ui/SmoothScroll";
import "./globals.css";

export const metadata: Metadata = {
  title: "CodeVerse — The Complete Developer Ecosystem",
  description:
    "Learn, Practice, Build, Collaborate, Showcase & Get Hired. CodeVerse is the AI-powered platform that takes you from beginner to professional developer.",
  keywords: [
    "coding",
    "programming",
    "AI tutor",
    "developer platform",
    "learn to code",
    "competitive programming",
    "portfolio builder",
    "interview preparation",
    "open source",
    "code editor",
  ],
  openGraph: {
    title: "CodeVerse — The Complete Developer Ecosystem",
    description:
      "Learn, Practice, Build, Collaborate, Showcase & Get Hired with AI-powered guidance.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <SmoothScroll>
          <AuthProvider>{children}</AuthProvider>
        </SmoothScroll>
      </body>
    </html>
  );
}
