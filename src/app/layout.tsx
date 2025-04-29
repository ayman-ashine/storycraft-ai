import type { Metadata } from "next";
import { Orbitron, Tajawal } from "next/font/google";
import "./globals.css";
import Head from "next/head";

const arabicFont = Tajawal({
  subsets: ["latin", "latin"],
  weight: ["400", "700", "900"],
});
const orbitron = Orbitron({
  variable: "--font-orbitron",
  weight: ["900"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title:
    "StoryCraft AI | Generate Unique Stories with AI-Powered Writing Tools",
  description:
    "Create captivating stories effortlessly with StoryCraft AI! Our advanced AI storytelling tool helps writers, students, and content creators generate custom narratives in seconds. Boost your creativity with customizable plots, characters, and genres.",
  keywords: [
    "AI story generator",
    "AI-powered storytelling tool",
    "custom genre-based story creator",
    "interactive fiction generator",
    "creative writing assistant",
    "story generator for all age groups",
    "generate stories by tone and perspective",
    "AI story builder for kids and adults",
    "multi-language story writing AI",
    "fantasy and sci-fi story maker",
    "AI-driven thriller and mystery stories",
    "automated historical and dystopian fiction",
    "epic and dark fantasy generator",
    "romantic and dramatic story assistant",
    "custom story plot generator",
    "AI short and long story creator",
    "AI narrative style selector",
    "automated time travel and space opera writing",
    "personalized AI fiction writing tool",
  ],
  authors: [
    {
      name: "Ayman Ashine",
      url: "https://github.com/ayman-ashine",
    },
  ],
  robots: "index, follow", // Better crawlability
  openGraph: {
    type: "website",
    url: "https://storycraft-ai-beta.vercel.app/",
    title: "StoryCraft AI | AI-Powered Story Generator",
    description:
      "Generate unique stories in seconds with our AI writing assistant.",
    images: [{ url: "/icons/og-image.png" }], // Add an engaging OpenGraph image
  },
  twitter: {
    card: "summary_large_image",
    site: "@StoryCraftAI",
    creator: "@StoryCraftAI",
    images: "/icons/og-image.png",
  },
  icons: [
    { rel: "icon", url: "/icons/favicon.ico" },
    { rel: "apple-touch-icon", url: "/icons/apple-touch-icon.png" },
  ],
  manifest: "/site.webmanifest",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "SoftwareApplication",
              name: "StoryCraft AI",
              alternateName: "AI Story Generator",
              url: "https://storycraft-ai.com",
              logo: "https://storycraft-ai.com/logo.png",
              description:
                "Generate unique, customizable stories in seconds with AI. Perfect for writers, students, educators, and content creators.",
              operatingSystem: "Web, iOS, Android", // Broader compatibility
              applicationCategory: "CreativeWritingApp",
              offers: {
                "@type": "Offer",
                price: "0", // Free tier (adjust if paid)
                priceCurrency: "USD",
                availability: "https://schema.org/InStock",
              },
              aggregateRating: {
                "@type": "AggregateRating",
                ratingValue: "4.9", // Example (replace with real data)
                reviewCount: "150",
              },
              creator: {
                "@type": "Organization",
                name: "StoryCraft AI",
                url: "https://storycraft-ai.com",
              },
              keywords: [
                "AI story generator",
                "creative writing tool",
                "fiction writing assistant",
              ],
              featureList: [
                "Customizable plots",
                "Genre-specific templates",
                "AI-powered character creation",
              ],
            }),
          }}
        />
      </Head>
      <body
        className={`${arabicFont.className} ${orbitron.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
