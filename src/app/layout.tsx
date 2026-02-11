import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import ReduxProvider from "@/providers/ReduxProvider";
import { PHProvider } from "@/providers/PHProvider";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Nexaflow | Next-Gen Business Automation",
  description: "Scale your revenue with AI-driven lead capture and seamless workflow orchestration.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ReduxProvider>
          <PHProvider>
            <Navbar />
            <main>{children}</main>
            <Footer />
          </PHProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
