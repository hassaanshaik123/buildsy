import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Caveat } from "next/font/google";
import "./globals.css";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["400", "500", "600", "700", "800"],
});

const caveat = Caveat({
  subsets: ["latin"],
  variable: "--font-handwriting",
  weight: ["400", "600", "700"],
});

export const metadata: Metadata = {
  title: "Buildsy. — Turn your idea into a clear, affordable build plan.",
  description:
    "Buildsy helps solo founders and small teams turn a raw product idea into a concrete, budget-disciplined build plan — before they spend money or time on the wrong tools.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${plusJakarta.variable} ${caveat.variable}`}>
      <body className="antialiased">{children}</body>
    </html>
  );
}
