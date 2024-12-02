"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@nextui-org/button";
import {
  EmbeddedCheckout,
  EmbeddedCheckoutProvider,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import { Droplets, Milk, ScanQrCode, Thermometer } from "lucide-react";
import { useEffect, useState } from "react";
import * as Realm from "realm-web";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

export default function Dashboard() {
  const [events, setEvents] = useState<any>(null);
  const [temper, setTemper] = useState<any>(null);
  const [count, setCount] = useState(0);
  const [clientSecret, setClientSecret] = useState<string | null>(null); // Set state variables

  const app = new Realm.App({ id: "application-0-fcqvnjd" });

  useEffect(() => {
    const login = async () => {
      const user = await app.logIn(Realm.Credentials.anonymous());
      const mongodb = app.currentUser?.mongoClient("mongodb-atlas");
      const collection = mongodb?.db("test").collection("items");
      const lastDocument = await collection?.findOne({}, { sort: { _id: -1 } });
      const resultArray = Object.keys(lastDocument)
        .filter((key) => !isNaN(Number(key))) // Filter numeric keys
        .map((key) => lastDocument[key]); // Map to their respective values
      console.log(resultArray);
      setEvents(resultArray);
      if (collection) {
        for await (const change of collection.watch()) {
          // console.log(change.fullDocument);
          const resultArray = Object.keys((change as any).fullDocument)
            .filter((key) => !isNaN(Number(key))) // Filter numeric keys
            .map((key) => (change as any).fullDocument[key]); // Map to their respective values
          setEvents(resultArray);
        }
      }
    };
    login();
  }, []);

  useEffect(() => {
    const login = async () => {
      const user = await app.logIn(Realm.Credentials.anonymous());
      const mongodb = app.currentUser?.mongoClient("mongodb-atlas");
      const temperCollection = mongodb?.db("test").collection("temper");
      const lastTemperDocument = await temperCollection?.findOne(
        {},
        { sort: { _id: -1 } }
      );
      setTemper(lastTemperDocument);
      if (temperCollection) {
        for await (const change of temperCollection.watch()) {
          setTemper((change as any).fullDocument);
        }
      }
    };
    login();
  }, []);

  const handleStartCheckout = async () => {
    try {
      const { data } = await axios.post("/api/checkout-sessions");
      setClientSecret(data.clientSecret);
    } catch (error) {
      console.error("Error fetching client secret:", error);
    }
  };

  return (
    <div className="container mx-auto p-8 ">
      <header className="flex gap-2 items-center mb-6">
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTBVDAMe0FYVZI9xqoa5aasfcRV4Lz7cBg2J8343yWtWdASkXaYxVQaDUGwwUSFhzz62jE&usqp=CAU"
          className="rounded-2xl w-12"
          alt=""
        />
        <h1 className="text-3xl font-bold">Dashboard</h1>
        {/* <Button>
          <RefreshCcw className="mr-2 h-4 w-4" /> Refresh
        </Button> */}
      </header>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
            <CardTitle className=" font-medium">Coca-Cola Cans</CardTitle>
            <Milk className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-5xl font-bold">{events && events.length}</div>
            <p className="text-xs text-muted-foreground">can amounts</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
            <CardTitle className=" font-medium">Temperature</CardTitle>
            <Thermometer className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-5xl font-bold">
              {temper && temper.temperature}°C
            </div>
            <p className="text-xs text-muted-foreground">current temperature</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
            <CardTitle className=" font-medium">Humidity</CardTitle>
            <Droplets className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-5xl font-bold">
              {temper && temper.humidity}%
            </div>
            <p className="text-xs text-muted-foreground">current humidity</p>
          </CardContent>
        </Card>
      </div>
      <div className="mt-10">
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
            color="danger"
            className="w-full"
            onPress={handleStartCheckout}
          >
            Get one
          </Button>
        )}
      </div>
    </div>
  );
}
