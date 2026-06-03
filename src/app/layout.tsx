import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "THE VOID — Portfolio | Enter the Upside Down",
  description:
    "A classified portfolio from the other side. Explore projects, experience, and transmissions from the void.",
  keywords: [
    "portfolio",
    "developer",
    "stranger things",
    "the void",
    "web developer",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Epilogue:wght@100..900&family=Source+Sans+3:wght@200..900&family=Space+Mono:wght@400;700&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0"
          rel="stylesheet"
        />
      </head>
      <body className="bg-background text-on-background font-body min-h-screen monitor-flicker">
        {/* VHS Grain Overlay */}
        <div className="grain-overlay" aria-hidden="true" />
        {/* Scanline Overlay */}
        <div className="global-scanline-overlay" aria-hidden="true" />
        {/* VHS Static Noise */}
        <div className="vhs-overlay" aria-hidden="true">
          <div className="vhs-static" />
        </div>
        {children}
      </body>
    </html>
  );
}
