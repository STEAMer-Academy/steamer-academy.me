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

    const submission = await prisma.contactSubmission.create({
      data: { firstName, lastName, email, message },
    });

    return NextResponse.json({
      message: "Form submitted successfully",
      id: submission.id,
    });
  } catch (error) {
    console.error("Error submitting contact form:", error);

    return NextResponse.json(
      { message: "Error submitting form. Please try again later." },
      { status: 500 },
    );
  }
}
