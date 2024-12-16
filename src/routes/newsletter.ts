import { Context } from "hono";
import { env } from "hono/adapter";
import { NewsletterSubscriptions } from "../db/schema";
import { eq } from "drizzle-orm";
import { getDb } from "../db/db";

interface RecaptchaResponse {
  success: boolean;
}

const newsletter = async (c: Context) => {
  const db = getDb(c);
  async function verifyRecaptcha(token: string) {
    const secretKey = env<{ RECAPTCHA_SECRET_KEY: string }>(
      c,
    ).RECAPTCHA_SECRET_KEY;
    const verificationUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${token}`;

    const response = await fetch(verificationUrl, { method: "POST" });
    const data: RecaptchaResponse = await response.json();
    return data.success;
  }

  try {
    const { email, recaptchaToken } = await c.req.json();

    // Validate the email input
    if (!email || typeof email !== "string" || !email.includes("@")) {
      return c.json({ message: "Invalid email address." }, { status: 400 });
    }

    // Verify reCAPTCHA token
    const isHuman = await verifyRecaptcha(recaptchaToken);
    if (!isHuman) {
      return c.json(
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
      return c.json(
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

    return c.json({
      message: "Subscription successful",
      id: insertId,
    });
  } catch (error) {
    console.error("Error subscribing to newsletter:", error);

    if (error instanceof Error) {
      return c.json({ message: `Error: ${error.message}` }, { status: 500 });
    }

    return c.json(
      { message: "An unexpected error occurred. Please try again later." },
      { status: 500 },
    );
  }
};

export default newsletter;
