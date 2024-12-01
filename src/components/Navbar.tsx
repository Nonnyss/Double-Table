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

export default function Navbar() {
  return (
    <div className="flex justify-center bg-primary">
      <div className="container px-10 flex justify-between py-5 text-primary-foreground font-line font-bold">
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
              <Link href={"infomation"}>
                <CircleUserRound strokeWidth={3} />
              </Link>
            </div>
            <DrawerFooter></DrawerFooter>
          </DrawerContent>
        </Drawer>
      </div>
    </div>
  );
}
