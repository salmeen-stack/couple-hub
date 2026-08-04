import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/contexts/AuthContext";
import { SocketProvider } from "@/contexts/SocketContext";
import { WebRTCProvider } from "@/contexts/WebRTCContext";
import BackgroundMusic from "@/components/BackgroundMusic";
import LayoutWrapper from "@/components/LayoutWrapper";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Couple Hub - Play, Connect, Grow Together",
  description: "A private web application for couples to play games, answer meaningful questions, and create lasting memories together.",
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
      <body className="min-h-full flex flex-col">
        <SocketProvider>
          <AuthProvider>
            <WebRTCProvider>
              <LayoutWrapper>
                {children}
              </LayoutWrapper>
              <BackgroundMusic />
            </WebRTCProvider>
          </AuthProvider>
        </SocketProvider>
      </body>
    </html>
  );
}
