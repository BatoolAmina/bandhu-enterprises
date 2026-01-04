import clientPromise from "@/lib/mongodb";
import { SignJWT } from 'jose';
import { serialize } from 'cookie';
import { NextResponse } from 'next/server';
import bcrypt from 'bcrypt';

export async function GET() {
  return NextResponse.json({ status: "Security Gateway Active" }, { status: 200 });
}

export async function POST(req) {
  try {
    const { email, password, action } = await req.json();

    if (!email || !password) {
      return NextResponse.json({ error: "Credentials required" }, { status: 400 });
    }

    if (!process.env.JWT_SECRET) {
      return NextResponse.json({ error: "System Configuration Error" }, { status: 500 });
    }

    const client = await clientPromise;
    const db = client.db("bandhu_db");
    const usersCollection = db.collection("users");

    if (action === "signup") {
      const adminCount = await usersCollection.countDocuments({ role: "admin" });
      if (adminCount >= 1) {
        return NextResponse.json({ error: "Access Denied" }, { status: 403 });
      }

      const hashedPassword = await bcrypt.hash(password, 12);
      await usersCollection.insertOne({ 
        email, 
        password: hashedPassword, 
        role: "admin",
        failedAttempts: 0,
        lockoutUntil: null,
        createdAt: new Date()
      });
      return NextResponse.json({ success: true });
    }

    const user = await usersCollection.findOne({ email });
    if (!user) {
      return NextResponse.json({ error: "Invalid Credentials" }, { status: 401 });
    }

    const now = new Date();
    if (user.lockoutUntil && user.lockoutUntil > now) {
      return NextResponse.json({ error: "Account locked. Try again later." }, { status: 429 });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      const attempts = (user.failedAttempts || 0) + 1;
      let updateData = { failedAttempts: attempts };
      
      if (attempts >= 5) {
        updateData.lockoutUntil = new Date(now.getTime() + 60 * 60 * 1000); 
        updateData.failedAttempts = 0;
      }
      
      await usersCollection.updateOne({ email }, { $set: updateData });
      return NextResponse.json({ error: "Invalid Credentials" }, { status: 401 });
    }

    await usersCollection.updateOne({ email }, { $set: { failedAttempts: 0, lockoutUntil: null } });

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

    const response = NextResponse.json({ success: true, role: user.role });
    response.headers.set('Set-Cookie', cookie);
    return response;

  } catch (err) {
    return NextResponse.json({ error: "Server Error" }, { status: 500 });
  }
}