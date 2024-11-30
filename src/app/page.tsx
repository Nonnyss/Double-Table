"use client";
import { useState } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Image,
  Button,
  Popover,
  PopoverTrigger,
  PopoverContent,
  Spacer,
} from "@nextui-org/react";
import WordRotate from "@/components/ui/WordRotate";
import { Headset, Scan, ScanQrCode } from "lucide-react";
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
