import type { Metadata } from "next";
import { Geist, Geist_Mono, Instrument_Serif } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  preload: false, // only used for small labels, so keep it off the critical path
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: "400",
  style: ["italic"], // the serif is only ever used in italic
});

export const metadata: Metadata = {
  title: "Ethixweb India | Websites, AI & growth for Indian businesses",
  description:
    "Ethixweb India builds premium websites, AI automation and growth systems for Indian businesses.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${instrumentSerif.variable} dark h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-background">{children}</body>
    </html>
  );
}
