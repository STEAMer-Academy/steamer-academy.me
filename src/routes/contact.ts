import { Context } from "hono";
import { env } from "hono/adapter";
import { ContactSubmissions } from "../db/schema";
import { eq } from "drizzle-orm";
import { Pool } from "pg";
import { drizzle } from "drizzle-orm/node-postgres";

interface RecaptchaResponse {
  success: boolean;
}

const contact = async (c: Context) => {
  c.header("Access-Control-Allow-Origin", "https://www.steameracademy.me, http://localhost:3000");
  c.header("Access-Control-Allow-Methods", "POST, OPTIONS");
  c.header("Access-Control-Allow-Headers", "Content-Type");
  c.header("Access-Control-Allow-Credentials", "true");

  // Handle preflight request
  if (c.req.method === "OPTIONS") {
    return c.text("", 204);
  }

  const pool = new Pool({
    connectionString: env<{ DATABASE_URL: string }>(c).DATABASE_URL,
    ssl: { rejectUnauthorized: false },
    max: 3,
  });

  const db = drizzle(pool);
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
    const { firstName, lastName, email, message, recaptchaToken } =
      await c.req.json();

    // Input validation
    if (!firstName || !lastName || !email || !message || !recaptchaToken) {
      return c.json({ message: "All fields are required." }, { status: 400 });
    }

    // Verify reCAPTCHA
    const isHuman = await verifyRecaptcha(recaptchaToken);
    if (!isHuman) {
      return c.json(
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
      return c.json(
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
    return c.json({
      message: "Form submitted successfully",
      id: insertId,
    });
  } catch (error) {
    console.error("Error submitting contact form:", error);
    return c.json(
      { message: "Error submitting form. Please try again later." },
      { status: 500 },
    );
  } finally {
    await pool.end();
  }
};

export default contact;
