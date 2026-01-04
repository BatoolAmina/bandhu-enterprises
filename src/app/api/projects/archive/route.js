import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";

export async function PATCH(req) {
  try {
    const { id, isArchived } = await req.json();

    if (!id) {
      return NextResponse.json({ error: "Project ID is required" }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db("bandhu_db");

    const result = await db.collection("projects").updateOne(
      { _id: new ObjectId(id) },
      { $set: { isArchived: isArchived } }
    );

    if (result.modifiedCount === 0) {
      return NextResponse.json({ error: "No changes made" }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: "Project status updated" });
  } catch (err) {
    console.error("Archive Error:", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}