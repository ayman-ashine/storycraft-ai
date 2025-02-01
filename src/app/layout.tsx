import type { Metadata } from "next";
import { Figtree } from "next/font/google";
import "./globals.css";

const roboto = Figtree({
  variable: "--font-roboto",
  weight:["400", "600", "900"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "StoryCraft AI",
  description: "StoryCraft AI",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${roboto.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
