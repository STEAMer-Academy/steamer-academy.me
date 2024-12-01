import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { ContactSubmissions } from "@/lib/schema";
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
    const { firstName, lastName, email, message, recaptchaToken } =
      await request.json();

    // Verify reCAPTCHA
    const isHuman = await verifyRecaptcha(recaptchaToken);
    if (!isHuman) {
      return NextResponse.json(
        { message: "reCAPTCHA verification failed. Please try again." },
        { status: 400 },
      );
    }

    // Check if email already exists
    const existingSubmission = await db
      .select()
      .from(ContactSubmissions)
      .where(eq(ContactSubmissions.email, email));

    if (existingSubmission.length > 0) {
      return NextResponse.json(
        { message: "This email has already submitted a contact form." },
        { status: 409 },
      );
    }

    const result = await db
      .insert(ContactSubmissions)
      .values({
        firstName,
        lastName,
        email,
        message,
      })
      .returning({ id: ContactSubmissions.id });

    const insertId = result[0]?.id || null;
    return NextResponse.json({
      message: "Form submitted successfully",
      id: insertId,
    });
  } catch (error) {
    console.error("Error submitting contact form:", error);
    return NextResponse.json(
      { message: "Error submitting form. Please try again later." },
      { status: 500 },
    );
  }
}
