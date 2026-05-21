import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "GRN Automation – Smart Goods Receipt Processing",
  description:
    "Automate your Goods Receipt Note processing with intelligent document scanning and field extraction. Fast, accurate, and built for Indian supply chains.",
  keywords: ["GRN", "Goods Receipt Note", "Document Scanning", "Automation", "Supply Chain"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="min-h-screen flex flex-col bg-mesh">{children}</body>
    </html>
  );
}
