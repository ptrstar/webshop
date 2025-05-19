import type { Metadata } from "next";
import { Providers } from "./providers";
import "./globals.css";

import { primary_font } from "@/util/fonts";

export const metadata: Metadata = {
  title: "Webshop",
  description: "Done with advantage on Kinesis",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`antialiased ${primary_font.className}`}>
        <Providers>
            <main className="mt-8 w-full max-w-4xl">{children}</main>
        </Providers>
      </body>
    </html>
  );
}