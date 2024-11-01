import { NextResponse } from "next/server";
import { createClient } from "@libsql/client";

const client = createClient({
  url: process.env.TURSO_DATABASE_URL as string,
  authToken: process.env.TURSO_AUTH_TOKEN as string,
});

export async function POST(request: Request) {
  try {
    const { FirstName, LastName, Email, Message } = await request.json();

    const result = await client.execute({
      sql: "INSERT INTO ContactSubmissions (firstName, lastName, email, message) VALUES (?, ?, ?, ?)",
      args: [FirstName, LastName, Email, Message],
    });

    const insertId = result.lastInsertRowid
      ? result.lastInsertRowid.toString()
      : null;

    return NextResponse.json({
      message: "Form submitted successfully",
      id: insertId,
    });
  } catch (error) {
    console.error("Error submitting contact form:", error);

    if (
      error instanceof Error &&
      error.message.includes("UNIQUE constraint failed")
    ) {
      return NextResponse.json(
        { message: "This email has already submitted a contact form." },
        { status: 409 },
      );
    }

    return NextResponse.json(
      { message: "Error submitting form. Please try again later." },
      { status: 500 },
    );
  }
}
