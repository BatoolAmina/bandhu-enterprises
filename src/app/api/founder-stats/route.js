import clientPromise from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("bandhu_db");
    
    const stats = await db.collection("settings").findOne({ type: "founder_stats" });

    if (!stats) {
      return NextResponse.json(
        { years: "15", projects: "300" },
        { status: 200 }
      );
    }

    return NextResponse.json(stats);
  } catch (e) {
    return NextResponse.json(
      { error: "Failed to fetch stats" },
      { status: 500 }
    );
  }
}

export async function POST(req) {
  try {
    const { years, projects } = await req.json();
    const client = await clientPromise;
    const db = client.db("bandhu_db");

    const result = await db.collection("settings").updateOne(
      { type: "founder_stats" },
      { 
        $set: { 
          years: years, 
          projects: projects,
          updatedAt: new Date() 
        } 
      },
      { upsert: true }
    );

    return NextResponse.json({ success: true, result });
  } catch (e) {
    return NextResponse.json(
      { error: "Failed to update stats" },
      { status: 500 }
    );
  }
}