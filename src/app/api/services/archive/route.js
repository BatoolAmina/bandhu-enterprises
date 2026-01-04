import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";

export async function PATCH(req) {
  try {
    const client = await clientPromise;
    const db = client.db("bandhu_db");
    const { id, isArchived } = await req.json();

    await db.collection("services").updateOne(
      { _id: new ObjectId(id) },
      { $set: { isArchived: isArchived } }
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Archive status update failed" }, { status: 500 });
  }
}