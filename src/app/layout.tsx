import { kronaOne, lineSeed } from "@/fonts";
import "@/styles/globals.css";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import { Providers } from "./provider";
export const metadata: Metadata = {
  title: "Next.js 15 Starter Template",
  description: "A starter template for Next.js 15",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`antialiased ${kronaOne.variable} ${lineSeed.variable}`}
    >
      <body
        className="bg-cover bg-center"
        style={{ backgroundImage: "url('/img/bg.svg')" }}
      >
        <Providers>
          <Navbar />
          <div className="bg-white bg-opacity-70">{children}</div>
        </Providers>
      </body>
    </html>
  );
}
