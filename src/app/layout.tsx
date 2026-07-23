import { Providers } from "@/components/providers";
import type { Metadata } from "next";
import { Geist, Montserrat } from "next/font/google";
import "../styles/globals.css";

const montserrat = Montserrat({
  variable: "--font-var-montserrat",
  subsets: ["latin"],
})

const geist = Geist({
  variable: "--font-var-geist",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "AI Corp.",
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
          <div className={`${montserrat.variable} ${geist.variable}`}>
            {children}
          </div>
        </Providers>
      </body>
    </html>
  );
}