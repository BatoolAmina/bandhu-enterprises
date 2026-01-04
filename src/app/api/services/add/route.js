import clientPromise from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const client = await clientPromise;
    const db = client.db("bandhu_db");
    const data = await req.json();

    const result = await db.collection("services").insertOne({
      ...data,
      createdAt: new Date(),
      isArchived: data.isArchived || false
    });

    return NextResponse.json({ success: true, id: result.insertedId });
  } catch (error) {
    return NextResponse.json({ error: "Failed to add service" }, { status: 500 });
  }
}