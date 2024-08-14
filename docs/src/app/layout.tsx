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
    url: "https://a11y-contrast-color.vercel.app",
    type: "website",
    siteName: "A11y Contrast Color Playground",
    images: [
      {
        url: "og-image.jpg",
        width: 1200,
        height: 630,
        alt: "ACC Logo",
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
      <body className="flex flex-col items-center justify-center w-full h-full overflow-x-hidden bg-slate-100">
        {children}
      </body>
    </html>
  );
}
