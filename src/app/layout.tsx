import { Providers } from "@/components/providers";
import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "../styles/globals.css";

const inter = Inter({
  variable: "--font-var-inter",
  subsets: ["latin"],
})

const jet = JetBrains_Mono({
  variable: "--font-var-jet-mono",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "Atlas",
  description: "Next.js App router example.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="antialiased">
      <body className="pointer-events-auto">
        <Providers>
          <div className={`${inter.variable} ${jet.variable}`}>
            {children}
          </div>
        </Providers>
      </body>
    </html>
  );
}