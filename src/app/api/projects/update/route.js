import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";

export async function PUT(req) {
  try {
    const { id, ...updateData } = await req.json();

    if (!id) {
      return NextResponse.json({ error: "Project ID required" }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db("bandhu_db");

    delete updateData._id;

    const result = await db.collection("projects").updateOne(
      { _id: new ObjectId(id) },
      { $set: updateData }
    );

    if (result.matchedCount === 0) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Database Update Error:", err);
    return NextResponse.json({ error: "Update failed" }, { status: 500 });
  }
}