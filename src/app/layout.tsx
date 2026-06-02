import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "CloudResume — ATS-Friendly Resume Builder for Cloud Engineers",
  description: "Build professional, ATS-optimized resumes tailored for cloud engineering roles. Download in PDF or DOC format.",
  keywords: ["resume builder", "ATS resume", "cloud engineer", "tech resume", "PDF resume", "DOC resume"],
  authors: [{ name: "CloudResume" }],
  openGraph: {
    title: "CloudResume — ATS-Friendly Resume Builder",
    description: "Professional resume builder optimized for cloud engineers and ATS systems.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
