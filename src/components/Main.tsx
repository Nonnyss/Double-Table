import React, { useState } from "react";
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
import {
  EmbeddedCheckout,
  EmbeddedCheckoutProvider,
} from "@stripe/react-stripe-js";
import axios from "axios";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

export default function Main({
  coke,
  words,
}: {
  coke: number;
  words: string[];
}) {
  const [clientSecret, setClientSecret] = useState<string | null>(null);

  const handleStartCheckout = async () => {
    try {
      const { data } = await axios.post("/api/checkout-sessions");
      setClientSecret(data.clientSecret);
    } catch (error) {
      console.error("Error fetching client secret:", error);
    }
  };
  return (
    <div className="flex justify-center min-h-[80vh]">
      <div className="container flex flex-col mx-8 mt-10 ">
        <WordRotate className="text-4xl font-black font-line" words={words} />
        <Card className="py-4 shadow-2xl bg-primary drop-shadow-2xl text-primary-foreground">
          <CardHeader className="pb-0 pt-2 px-4 flex-col items-end flex font-line">
            <p className="text-tiny uppercase font-bold">Daily Mix</p>
            <small className="font-line font-bold">
              25 c ํ
            </small>
            <h4 className="font-bold text-large">Coke Radio</h4>
          </CardHeader>
          <CardBody className="overflow-visible flex flex-row justify-center p-7">
            {Array.from({ length: coke }).map((_, i) => (
              <Image
                key={i}
                src={`/img/coke${i + 1}.svg`}
                alt="logo"
                width={100}
                height={100}
              />
            ))}
          </CardBody>
        </Card>
        <div className="flex flex-col space-y-5 mt-16 px-10">
          {clientSecret ? (
            <EmbeddedCheckoutProvider
              stripe={stripePromise}
              options={{ clientSecret }}
            >
              <EmbeddedCheckout />
            </EmbeddedCheckoutProvider>
          ) : (
            <Button
              startContent={<ScanQrCode />}
              size="lg"
              className="bg-secondary text-primary-foreground font-black shadow-large drop-shadow-lg"
              onPress={handleStartCheckout}
            >
              Get one
            </Button>
          )}

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
