import { NextResponse } from "next/server";
import client from "@/lib/formdb";
import arcjet, { tokenBucket } from "@arcjet/next";

const aj = arcjet({
  key: process.env.ARCJET_KEY!,
  characteristics: ["ip.src"], // track requests by IP address
  rules: [
    tokenBucket({
      mode: "LIVE", // will block requests. Use "DRY_RUN" to log only
      refillRate: 10, // refill 10 tokens per interval
      interval: 60, // 60 second interval
      capacity: 100, // bucket maximum capacity of 100 tokens
    }),
  ],
});

export async function POST(request: Request) {
  try {
    const decision = await aj.protect(request, { requested: 1 });

    if (decision.isDenied()) {
      return NextResponse.json(
        { error: "Too Many Requests", reason: decision.reason },

        { status: 429 },
      );
    }

    const { email } = await request.json();

    if (!email || typeof email !== "string") {
      return NextResponse.json(
        { message: "Invalid email address." },
        { status: 400 },
      );
    }

    const result = await client.execute({
      sql: "INSERT INTO NewsletterSubscriptions (email) VALUES (?)",
      args: [email],
    });

    const insertId = result.lastInsertRowid
      ? result.lastInsertRowid.toString()
      : null;

    return NextResponse.json({
      message: "Subscription successful",
      id: insertId,
    });
  } catch (error) {
    console.error("Error subscribing to newsletter:", error);

    if (
      error instanceof Error &&
      error.message.includes("UNIQUE constraint failed")
    ) {
      return NextResponse.json(
        { message: "This email is already subscribed to the newsletter." },
        { status: 409 },
      );
    }

    return NextResponse.json(
      { message: "Error subscribing to newsletter. Please try again later." },
      { status: 500 },
    );
  }
}
