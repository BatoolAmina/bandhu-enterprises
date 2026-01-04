import { serialize } from 'cookie';
import { NextResponse } from 'next/server';

export async function POST() {
  const cookie = serialize('AdminToken', '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    path: '/',
    expires: new Date(0),
    maxAge: -1,
  });

  const response = NextResponse.json(
    { success: true, message: "Session terminated" },
    { status: 200 }
  );

  response.headers.set('Set-Cookie', cookie);

  return response;
}