import { NextResponse } from "next/server";
import prisma from "@/lib/formdb";

async function verifyRecaptcha(token: string) {
  const secretKey = process.env.RECAPTCHA_SECRET_KEY;
  const verificationUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${token}`;

  const response = await fetch(verificationUrl, { method: "POST" });
  const data = await response.json();
  return data.success;
}

export async function POST(request: Request) {
  try {
    const { email, recaptchaToken } = await request.json();

    if (!email || typeof email !== "string") {
      return NextResponse.json(
        { message: "Invalid email address." },
        { status: 400 },
      );
    }

    const isHuman = await verifyRecaptcha(recaptchaToken);
    if (!isHuman) {
      return NextResponse.json(
        { message: "reCAPTCHA verification failed. Please try again." },
        { status: 400 },
      );
    }

    const subscription = await prisma.newsletterSubscription.create({
      data: { email },
    });

    return NextResponse.json({
      message: "Subscription successful",
      id: subscription.id,
    });
  } catch (error) {
    console.error("Error subscribing to newsletter:", error);

    if (
      error instanceof Error &&
      error.message.includes("Unique constraint failed")
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
