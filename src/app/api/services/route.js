import clientPromise from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const includeArchived = searchParams.get("all") === "true";

    const client = await clientPromise;
    const db = client.db("bandhu_db");

    const query = includeArchived ? {} : { isArchived: { $ne: true } };

    const services = await db.collection("services")
      .find(query)
      .sort({ createdAt: -1 })
      .toArray();

    return NextResponse.json(services);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch services" }, { status: 500 });
  }
}