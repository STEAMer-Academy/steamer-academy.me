import { NextResponse } from 'next/server';
import { createClient } from '@libsql/client';

const client = createClient({
  url: process.env.TURSO_DATABASE_URL as string,
  authToken: process.env.TURSO_AUTH_TOKEN as string,
});

export async function POST(request: Request) {
  try {
    const { Email } = await request.json();

    const result = await client.execute({
      sql: 'INSERT INTO NewsletterSubscriptions (email) VALUES (?)',
      args: [Email]
    });

    const insertId = result.lastInsertRowid ? result.lastInsertRowid.toString() : null;

    return NextResponse.json({ message: 'Subscription successful', id: insertId });
  } catch (error) {
    console.error('Error subscribing to newsletter:', error);
    
    if (error instanceof Error && error.message.includes('UNIQUE constraint failed')) {
      return NextResponse.json({ message: 'This email is already subscribed to the newsletter.' }, { status: 409 });
    }
    
    return NextResponse.json({ message: 'Error subscribing to newsletter. Please try again later.' }, { status: 500 });
  }
}
