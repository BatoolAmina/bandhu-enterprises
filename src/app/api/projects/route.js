import clientPromise from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("bandhu_db");

    const projects = await db
      .collection("projects")
      .find({})
      .sort({ _id: -1 })
      .toArray();

    return NextResponse.json(projects);
  } catch (e) {
    console.error("Database Error:", e);
    return NextResponse.json(
      { error: "Failed to retrieve portfolio entries" }, 
      { status: 500 }
    );
  }
}