import { Krona_One } from "next/font/google";
import localFont from "next/font/local";

export const lineSeed = localFont({
  src: [
    { path: "./LineSeed/LINESeedSansTH_W_Th.woff", weight: "100" },
    { path: "./LineSeed/LINESeedSansTH_W_Rg.woff", weight: "400" },
    { path: "./LineSeed/LINESeedSansTH_W_Bd.woff", weight: "700" },
    { path: "./LineSeed/LINESeedSansTH_W_XBd.woff", weight: "800" },
    { path: "./LineSeed/LINESeedSansTH_W_He.woff", weight: "900" },
  ],
  variable: "--font-line-seed",
  display: "swap",
});

export const kronaOne = Krona_One({
  subsets: ["latin"],
  variable: "--font-krona-one",
  weight: "400",
  display: "swap",
});
