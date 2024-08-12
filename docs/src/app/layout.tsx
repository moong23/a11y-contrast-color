import type { Metadata } from "next";

import "./globals.css";

export const metadata: Metadata = {
  title: "A11y Contrast Color Playground",
  description: "A playground for the a11y-contrast-color library",
  icons: {
    icon: "favicon.png",
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
