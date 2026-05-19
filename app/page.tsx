import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Footer from "./components/layout/footer";
import Topka from "./components/layout/topka";
import Script from "next/script";
import Rodzic from "./components/home/rodzic";
import RodzicOstatnieRecenzje from "./components/home/ostatnierecenzje";
import MostHated from "./components/home/mosthated";
import BestGames from "./components/home/bestgames";
import Banner from "./components/home/banner";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Strona główna - LudosRatings.pl",   
  description: "Platforma z recenzjami gier, ocenami youtuberów i danymi ze Steam.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>

      </head>

      <div className="min-h-full max-w-6xl mx-auto flex flex-col">
   
      <Banner />
       <Rodzic />
      <RodzicOstatnieRecenzje />
      <MostHated />
      <BestGames />
      </div>
    </html>
  );
}