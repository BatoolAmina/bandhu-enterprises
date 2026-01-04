import clientPromise from "@/lib/mongodb";
import { SignJWT } from 'jose';
import { serialize } from 'cookie';
import { NextResponse } from 'next/server';
import bcrypt from 'bcrypt';

export async function GET() {
  return NextResponse.json({ status: "Authentication endpoint active" }, { status: 200 });
}

export async function POST(req) {
  try {
    const { email, password, action } = await req.json();

    if (!email || !password) {
      return NextResponse.json({ error: "Missing credentials" }, { status: 400 });
    }

    if (!process.env.JWT_SECRET) {
      return NextResponse.json({ error: "Server Configuration Error" }, { status: 500 });
    }

    const client = await clientPromise;
    const db = client.db("bandhu_db");
    const usersCollection = db.collection("users");

    if (action === "signup") {
      const adminCount = await usersCollection.countDocuments({ role: "admin" });
      if (adminCount >= 1) {
        return NextResponse.json({ error: "Registration disabled" }, { status: 403 });
      }

      const hashedPassword = await bcrypt.hash(password, 12);
      await usersCollection.insertOne({ 
        email, 
        password: hashedPassword, 
        role: "admin",
        createdAt: new Date()
      });
      return NextResponse.json({ success: true });
    }

    const user = await usersCollection.findOne({ email });
    if (!user) {
      return NextResponse.json({ error: "Invalid Credentials" }, { status: 401 });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return NextResponse.json({ error: "Invalid Credentials" }, { status: 401 });
    }

    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    
    const token = await new SignJWT({ 
        email: user.email, 
        role: user.role,
        pk: user.password.substring(0, 10)
      })
      .setProtectedHeader({ alg: 'HS256' })
      .setIssuedAt()
      .setExpirationTime('24h')
      .sign(secret);

    const cookie = serialize('AdminToken', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 24,
      path: '/',
    });

    const response = NextResponse.json({ success: true });
    response.headers.set('Set-Cookie', cookie);
    return response;

  } catch (err) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}