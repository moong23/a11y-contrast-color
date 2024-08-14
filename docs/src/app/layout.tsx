import type { Metadata } from "next";

import "./globals.css";

export const metadata: Metadata = {
  title: "A11y Contrast Color Playground",
  description: "Playground for the a11y-contrast-color library",
  icons: {
    icon: "favicon.png",
  },
  openGraph: {
    images: [
      {
        url: "favicon.png",
        width: 100,
        height: 100,
        alt: "ACC Logo",
      },
    ],
  },
  twitter: {
    images: [
      {
        url: "favicon.png",
        width: 100,
        height: 100,
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
