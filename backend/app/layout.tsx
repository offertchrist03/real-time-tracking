import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Tracking-APP",
  description: "APP that generate random movement of users",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`antialiased`}>{children}</body>
    </html>
  );
}
