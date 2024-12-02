import { NextRequest, NextResponse } from "next/server";

import Stripe from "stripe";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);
export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const req = await request.json();
    const transactions = await stripe.issuing.transactions.list({
      limit: 3,
    });
    return NextResponse.json(
      { message: "GET Transactions", transactions: transactions.data },
      { status: 200 }
    );
  } catch (err) {
    return NextResponse.json(
      {
        message: { error: "Error adding item", err: (err as Error).message },
        data: null,
      },
      { status: 500 }
    );
  }
}
