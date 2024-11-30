import React from "react";
import WordRotate from "./ui/WordRotate";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Spacer,
} from "@nextui-org/react";
import Image from "next/image";
import { Headset, ScanQrCode } from "lucide-react";

export default function Main({
  coke,
  words,
}: {
  coke: number;
  words: string[];
}) {
  return (
    <div className="flex justify-center min-h-[80vh]">
      <div className="container flex flex-col mx-8 mt-10 ">
        <WordRotate className="text-2xl font-black font-line" words={words} />
        <Card className="py-4 shadow-2xl">
          <CardHeader className="pb-0 pt-2 px-4 flex-col items-end flex font-line">
            <p className="text-tiny uppercase font-bold">Daily Mix</p>
            <small className="text-default-500 font-line font-bold">
              25 c ํ
            </small>
            <h4 className="font-bold text-large">Coke Radio</h4>
          </CardHeader>
          <CardBody className="overflow-visible flex flex-row justify-center p-7">
            {Array.from({ length: coke }).map((_, i) => (
              <Image
                key={i}
                src={`/img/coke${i + 1}.png`}
                alt="logo"
                width={100}
                height={100}
                className="drop-shadow-2xl"
              />
            ))}
          </CardBody>
        </Card>
      <div className="flex flex-col space-y-5 mt-16 px-10">
        <Button
          startContent={<ScanQrCode />}
          size="lg"
          className="bg-secondary text-primary-foreground font-black shadow-large drop-shadow-lg"
        >
          Get one
        </Button>
        <Popover placement="top-start" offset={20} showArrow>
          <PopoverTrigger>
            <Button
              startContent={<Headset />}
              size="lg"
              className="bg-primary text-primary-foreground font-black shadow-large drop-shadow-lg"
            >
              Contact us
            </Button>
          </PopoverTrigger>
          <PopoverContent className="bg-primary text-primary-foreground font-black shadow-large drop-shadow-lg">
            <div className="px-1 py-2">
              <div className="text-small font-bold">Instagram</div>
              <div className="text-tiny">nont.nii</div>
              <Spacer y={1} />
              <div className="text-small font-bold">Nisit Id</div>
              <div className="text-tiny">6633118721</div>
            </div>
          </PopoverContent>
        </Popover>
      </div>
      </div>
    </div>
  );
}
