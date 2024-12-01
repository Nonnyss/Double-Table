const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

import { NextRequest, NextResponse } from "next/server";

export async function POST(
  request: NextRequest
): Promise<NextResponse<TransactionListResponse>> {
  try {
    const { limit } = await request.json();
    const transactions: TransactionList =
      await stripe.issuing.transactions.list({
        limit: limit,
      });

    return NextResponse.json<TransactionListResponse>(
      {
        message: "Successfully fetched transactions",
        data: transactions.data,
      },
      { status: 200 }
    );
  } catch (err) {
    return NextResponse.json(
      {
        message: err,
        data: null,
      },
      { status: 500 }
    );
  }
}
