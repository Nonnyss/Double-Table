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
import { Button } from "@nextui-org/button";
import { signIn, useSession } from "next-auth/react";
import ShimmerButton from "./ui/Shimmer";
export default function Navbar() {
  const { data: session } = useSession();

  return (
    <div className="flex justify-center bg-primary  text-primary-foreground font-line font-bold">
      <BoxReveal boxColor={"#CA304E"}>
        <div className="px-10 flex justify-between gap-2 py-5 items-center">
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
                <DrawerTitle className="font-line font-black text-center">
                  Menu
                </DrawerTitle>
              </DrawerHeader>
              <div className="flex justify-evenly">
                {session ? (
                  <>
                    <Link href={"/"}>
                      <Button
                        isIconOnly
                        className="bg-primary text-primary-foreground"
                      >
                        <Milk strokeWidth={3} />
                      </Button>
                    </Link>
                    <Link href={"/transaction-dashboard"}>
                      <Button
                        isIconOnly
                        className="bg-primary text-primary-foreground"
                      >
                        <ArchiveIcon strokeWidth={3} />
                      </Button>
                    </Link>
                    <Link href={"/information"}>
                      <Button
                        isIconOnly
                        className="bg-primary text-primary-foreground"
                      >
                        <CircleUserRound strokeWidth={3} />
                      </Button>
                    </Link>
                  </>
                ) : (
                  <ShimmerButton
                    className="font-line font-black"
                    onClick={() => signIn()}
                  >
                    Sign In
                  </ShimmerButton>
                )}
              </div>
              <DrawerFooter></DrawerFooter>
            </DrawerContent>
          </Drawer>
        </div>
      </BoxReveal>
    </div>
  );
}
