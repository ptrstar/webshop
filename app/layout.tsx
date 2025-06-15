import type { Metadata } from "next";
import { Providers } from "./providers";
import "./globals.css";

import { primary_font } from "@/util/fonts";
// import ThemeSwitcher from "./components/themeswitcher";

export const metadata: Metadata = {
  title: "Richi - Das Kartenspiel",
  description: "Meme Kartenspiel kaufen: Rette Richi, denn er fällt jeden Moment vom Bagger auf den Boden! Verhindere dies, indem du geschickt spielst und gleichzeitig  den anderen das Leben schwer machst. Wer als Erstes keine Leben mehr hat, verliert - der mit den meisten, gewinnt.",
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