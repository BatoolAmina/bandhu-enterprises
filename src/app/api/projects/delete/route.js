import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";

export async function DELETE(req) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "Project ID is required" }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db("bandhu_db");

    const result = await db.collection("projects").deleteOne({
      _id: new ObjectId(id),
    });

    if (result.deletedCount === 1) {
      return NextResponse.json({ success: true, message: "Project deleted" });
    } else {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }
  } catch (e) {
    console.error("Delete Error:", e);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}