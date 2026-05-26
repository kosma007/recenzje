import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Footer from "./components/layout/footer";
import Topka from "./components/layout/topka";
import { Analytics } from "@vercel/analytics/next"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "LudosRatings.pl",
  description: "Platforma z ocenami gier i danymi ze Steam.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
     <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>

      </head>

      <body className="min-h-full flex flex-col">
        <Topka />
<Analytics/>
        <main className="flex-1">{children}</main>

        <Footer />
      </body>
    </html>
  );
}
