"use client";
import { useState } from "react";
import Main from "@/components/Main";

export default function Home() {
  const [coke, setCoke] = useState<number>(3);
  const words: string[] = [
    "THOKHU's",
    "TIWBUN's",
    "COKEZA's",
    "SUIGUI's",
    "KODTUI's",
  ];
  return (
    <main>
      <Main coke={coke} words={words} />
    </main>
  );
}
