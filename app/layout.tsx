import type { Metadata } from "next";
import { Providers } from "./providers";
import "./globals.css";

import { primary_font } from "@/util/fonts";
// import ThemeSwitcher from "./components/themeswitcher";

export const metadata: Metadata = {
  title: "Richi - Das Kartenspiel",
  description: "Memekartenspiel bestellen",
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
            {/* <ThemeSwitcher /> */}
            <main className="mt-8 w-full">{children}</main>
        </Providers>
      </body>
    </html>
  );
}