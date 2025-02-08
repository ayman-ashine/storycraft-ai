import type { Metadata } from "next";
import { Orbitron, Tajawal } from "next/font/google";
import "./globals.css";

const arabicFont = Tajawal({ subsets: ["latin", "latin" ], weight: ["400", "700", "900"] });
const orbitron = Orbitron({
  variable: "--font-orbitron",
  weight: ["900"],
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "StoryCraft AI",
  description: "StoryCraft AI is an intuitive AI tools that helps you generate stories effortlessly, offering customizable options to tailor the narrative with ease. Use various tools to enhance your creative process and produce unique stories in no time.",
  keywords: "story generation, AI-powered storytelling, creative writing, customizable stories, writing tools, AI tools, story creation",
  authors: [{ name: "Ayman Ashine" }],
  icons: ["/logo.svg"]
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${arabicFont.className} ${orbitron.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
