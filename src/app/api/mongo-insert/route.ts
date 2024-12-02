import clientPromise from "@/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const req = await request.json();
    const client = await clientPromise;
    const db = client.db("test");
    const collection = db.collection("items");

    const newItem = req;
    const count = await collection.countDocuments();
    const result = await collection.insertOne({ count: count + 1, ...newItem });
    return NextResponse.json(
      { message: "Item added", result: result },
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
