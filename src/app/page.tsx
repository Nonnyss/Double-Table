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
  const [user, setUser] = useState();
  interface Event {
    operationType: "insert" | "delete" | "update";
    fullDocument?: any;
  }

  const [events, setEvents] = useState<Event | null>(null);
  interface Temper {
    temperature: number;
    humidity: number;
  }
  const [temper, setTemper] = useState<Temper | null>(null);
  const [count, setCount] = useState(0);
  const [clientSecret, setClientSecret] = useState<string | null>(null); // Set state variables

  const app = new Realm.App({ id: "application-0-fcqvnjd" });

  useEffect(() => {
    const login = async () => {
      const user = await app.logIn(Realm.Credentials.anonymous());
      const mongodb = app.currentUser?.mongoClient("mongodb-atlas");
      const collection = mongodb?.db("test").collection("items");
      const count = await collection?.count();
      setCount(count!);
      if (collection) {
        for await (const change of collection.watch()) {
          setEvents(change as any);
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

  useEffect(() => {
    console.log(events);
    if (events) {
      if (events.operationType === "insert") {
        setCount(count + 1);
      }
      if (events.operationType === "delete") {
        setCount(count - 1);
      }
    }
  }, [events]);

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
            <div className="text-5xl font-bold">{count}</div>
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
      <div className="mt-20">
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
            onPress={handleStartCheckout}
          >
            Get one
          </Button>
        )}
      </div>
    </div>
  );
}
