"use client";

import { useEffect, useState } from "react";
import Loading from "@/components/loading/Loading";

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return <Loading></Loading>;
  }

  return (
    <html lang="en">
      <body className={`antialiased`}>{children}</body>
    </html>
  );
}
