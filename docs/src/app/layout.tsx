import type { Metadata } from "next";

import "./globals.css";

export const metadata: Metadata = {
  title: "A11y Contrast Color Playground",
  description:
    "Best utility library  to find contrast colors to ensure web accessibility.",
  icons: {
    icon: "favicon.png",
  },
  openGraph: {
    images: [
      {
        url: "og-image.jpg",
        width: 1200,
        height: 630,
        alt: "ACC Logo",
      },
    ],
  },
  twitter: {
    images: [
      {
        url: "og-image.jpg",
        width: 1200,
        height: 630,
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="flex flex-col items-center justify-center w-full h-full bg-slate-100">
        {children}
      </body>
    </html>
  );
}
