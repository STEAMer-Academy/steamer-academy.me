import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { NewsletterSubscriptions } from "@/lib/schema";
import { eq } from "drizzle-orm";

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

    // Validate the email input
    if (!email || typeof email !== "string" || !email.includes("@")) {
      return NextResponse.json(
        { message: "Invalid email address." },
        { status: 400 },
      );
    }

    // Verify reCAPTCHA token
    const isHuman = await verifyRecaptcha(recaptchaToken);
    if (!isHuman) {
      return NextResponse.json(
        { message: "reCAPTCHA verification failed. Please try again." },
        { status: 400 },
      );
    }

    // Check if the email is already subscribed
    const existingSubscription = await db
      .select()
      .from(NewsletterSubscriptions)
      .where(eq(NewsletterSubscriptions.email, email));

    if (existingSubscription.length > 0) {
      return NextResponse.json(
        { message: "This email is already subscribed to the newsletter." },
        { status: 409 },
      );
    }

    const result = await db
      .insert(NewsletterSubscriptions)
      .values({
        email,
      })
      .returning({ id: NewsletterSubscriptions.id });

    const insertId = result[0]?.id || null;

    return NextResponse.json({
      message: "Subscription successful",
      id: insertId,
    });
  } catch (error) {
    console.error("Error subscribing to newsletter:", error);

    return NextResponse.json(
      { message: "Error subscribing to newsletter. Please try again later." },
      { status: 500 },
    );
  }
}
