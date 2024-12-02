"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function Return() {
  const router = useRouter();

  useEffect(() => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const sessionId = urlParams.get("session_id");

    if (sessionId) {
      handleGetStatus(sessionId);
    }
  }, []);

  const handleGetStatus = async (sessionId: string) => {
    try {
      const response = await axios.post(`/api/get-checkout`, {
        session_id: sessionId,
      });
      const checkoutStatus = response.data.status;

      if (checkoutStatus === "open") {
        router.push("/");
      }

      if (checkoutStatus === "complete") {
        await axios.post(
          `https://tokkhu-discord.vercel.app/`,
          {
            message: "# ขอให้อร่อยคับ",
            imageUrl:
              "https://im.indiatimes.in/content/2024/May/DALLE-2024-05-31-184412---A-black-dog-walking-with-a-red-Coca-Cola-band-wrapped-around-its-body-The-dog-is-a-medium-sized-breed-with-a-happy-expression-walking-outdoors-on-_6659cd5941894.jpg?w=640&h=640&cc=1&webp=1&q=75",
          }
        );
        router.push("/");
      }
    } catch (error) {
      console.error("Error fetching checkout status:", error);
    }
  };
}
