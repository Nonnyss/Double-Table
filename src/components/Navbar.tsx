"use client";
import React from "react";
import { ArchiveIcon, CircleUserRound, MenuIcon, Milk } from "lucide-react";
import {
  Drawer,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "./ui/Drawer";
import Link from "next/link";
import BoxReveal from "./ui/BoxReveal";

export default function Navbar() {
  return (
    <div className="flex justify-center bg-primary  text-primary-foreground font-line font-bold">
      <BoxReveal boxColor={"#CA304E"}>
        <div className="px-10 flex justify-between gap-2 py-5">
          <div className="flex gap-3">
            <Milk strokeWidth={3} />
            <span className="text-white text-xl font-black">TOKKHU's</span>
          </div>
          <Drawer direction="right">
            <DrawerTrigger>
              <MenuIcon strokeWidth={3} />
            </DrawerTrigger>
            <DrawerContent className="justify-between">
              <DrawerHeader>
                <DrawerTitle className="font-line font-black">Menu</DrawerTitle>
              </DrawerHeader>
              <div className="flex justify-evenly">
                <Link href={"/"}>
                  <Milk strokeWidth={3} />
                </Link>
                <Link href={"/transaction-dashboard"}>
                  <ArchiveIcon strokeWidth={3} />
                </Link>
                <Link href={"/infomation"}>
                  <CircleUserRound strokeWidth={3} />
                </Link>
              </div>
              <DrawerFooter></DrawerFooter>
            </DrawerContent>
          </Drawer>
        </div>
      </BoxReveal>
    </div>
  );
}
