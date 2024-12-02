import Stripe from "stripe";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { session_id } = await request.json();
    const session = await stripe.checkout.sessions.retrieve(session_id);
    return NextResponse.json(
      {
        status: session.status,
        customer_email: session.customer_details?.email,
      },
      { status: 200 }
    );
  } catch (err) {
    if (err instanceof Error) {
      return NextResponse.json(err.message, { status: 500 });
    }
    return NextResponse.json("An unknown error occurred", { status: 500 });
  }
}
