import "./globals.css";
// import "@unocss/reset/tailwind.css";
// import "uno.css";

import React from "react";

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

// const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Texas ACM",
  description: "Welcome to the UT Austin chapter of the Association for Computing Machinery.",
  keywords: "utcs, acm, association-for-computing-machinery, texasacm",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="bg-zinc-800" before="content-empty bg-white fixed w-full h-1/2vh top-0 -z-1">
      <body className="min-h-screen bg-zinc-800">
        <div className="min-h-screen flex flex-col bg-white pt-14.5 font-sans">
          <Header />
          <main className="w-full flex-grow bg-white text-zinc-800">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
