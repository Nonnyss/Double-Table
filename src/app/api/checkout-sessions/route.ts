import Stripe from "stripe";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["promptpay"],
      ui_mode: "embedded",
      line_items: [
        {
          price: "price_1QQxLXE0zZsPsNM0lYdrsKI1",
          quantity: 1,
        },
      ],
      mode: "payment",
      return_url: `${request.headers.get("origin")}/return?session_id={CHECKOUT_SESSION_ID}`,
    });

    return NextResponse.json(
      {
        clientSecret: session.client_secret,
      },
      { status: 200 }
    );
  } catch (err) {
    return NextResponse.json(err, { status: 500 });
  }
}
