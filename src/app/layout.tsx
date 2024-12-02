import { kronaOne, lineSeed } from "@/fonts";
import "@/styles/globals.css";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import { Providers } from "../providers/NextUiProvider";
/* import { NextAuthProvider } from "@/providers/NextAuthProvider"; */
export const metadata: Metadata = {
  title: "TOHKHU's",
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
        // style={{ backgroundImage: "url('/img/bg.svg')" }}
      >
        <Providers>
          <Navbar />
          <div className="bg-white bg-opacity-70">{children}</div>
        </Providers>
      </body>
    </html>
  );
}
